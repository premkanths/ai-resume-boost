import { logger } from "../utils/logger.js";

/* =========================
   SAFE JSON EXTRACTION
========================= */
const extractJSON = (text) => {
  try {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");

    if (first === -1 || last === -1) return null;

    const jsonString = text.slice(first, last + 1);
    
    // Attempt native JSON parse first. Since Gemini usually returns valid structural formatting,
    // this succeeds 99.9% of the time without altering valid control linebreaks or spacing.
    return JSON.parse(jsonString);
  } catch (err) {
    try {
      // Fallback: only sanitize control characters if native parsing fails.
      const first = text.indexOf("{");
      const last = text.lastIndexOf("}");
      let jsonString = text.slice(first, last + 1);
      
      // Clean ASCII control characters (0-31) except tabs and newlines
      // to resolve unescaped characters in string values safely.
      jsonString = jsonString.replace(/[\u0000-\u0009\u000B-\u000C\u000E-\u001F]+/g, "");
      
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }
};

/* =========================
   RESPONSE VALIDATION
========================= */
const validateResponse = (data) => {
  return (
    typeof data?.atsScore === "number" &&
    typeof data?.summary === "string" &&
    Array.isArray(data?.skills) &&
    Array.isArray(data?.missingSkills) &&
    Array.isArray(data?.strengths) &&
    Array.isArray(data?.keyHighlights) &&
    Array.isArray(data?.improvements)
  );
};

/* =========================
   TIMEOUT PROTECTION
========================= */
const withTimeout = (promise, ms = 60000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("AI_TIMEOUT")), ms)
    ),
  ]);
};

/* =========================
  AI analysis prompt
 ========================= */
const buildPrompt = (resumeText, jobDescription = "") => `
You are an expert resume analyzer, candidate profile extractor, and ATS (Applicant Tracking System) specialist.
${
  jobDescription
    ? `Your task is to evaluate the candidate's resume text relative to the provided Job Description and compute a Job Description Match Score (0-100) instead of a general score.`
    : `Your task is to analyze the provided resume text and return a general ATS score (0-100).`
}
Your output must be in strict JSON format only. Do not include extra text, explanations, or markdown formatting.
The output must be valid JSON that matches the schema below exactly.
{
  "atsScore": number,
  "summary": string,
  "skills": string[],
  "missingSkills": string[],
  "strengths": string[],
  "keyHighlights": string[],
  "improvements": string[],
  "parsedProfile": {
    "name": string,
    "title": string,
    "email": string,
    "phone": string,
    "location": string,
    "experience": string,
    "education": string
  }
}
Instructions:
1. atsScore : ${
  jobDescription
    ? `Calculate a matching percentage (0-100) based on keyword overlap, structural relevance, experience mapping, and qualification alignment against the Job Description.`
    : `Evaluate keyword density, section clarity (e.g., Work Experience, Skills), use of standard headings, and avoidance of graphics/tables (assume plain text). Penalize missing contact info, ambiguous dates, or irrelevant content.`
}

2. summary : ${
  jobDescription
    ? `Provide a professional evaluation of the candidate's fit for this specific job, summarizing major gaps and strong matches.`
    : `Be concise, factual, and professional. Mention overall strength, potential role fit, and atsScore interpretation (e.g., "Good ATS score but lacks specific tools").`
}

3. skills : Extract only skills explicitly mentioned (e.g., "Python", "Project Management", "Data Analysis"). Do not infer.

4. missingSkills : ${
  jobDescription
    ? `Identify key keywords, technical skills, tools, or qualifications specified in the Job Description that are absent in the candidate's resume.`
    : `Based on the resume's industry/role (e.g., data science → missing "SQL", "TensorFlow"; marketing → missing "SEO", "Google Analytics"). If role ambiguous, list common missing skills from similar resumes.`
}

5. strengths : Focus on quantifiable achievements, clear sectioning, keyword optimization, and relevant experience.

6. keyHighlights : Quote or paraphrase specific accomplishments (e.g., "Increased sales by 40% in 6 months"). Limit to 3-5 items.

7. improvements : ${
  jobDescription
    ? `Suggest concrete modifications to the resume to align it better with the Job Description (e.g., adding specific missing keywords, rewriting achievements to match the job responsibilities).`
    : `Suggest concrete fixes: add a professional summary, quantify bullet points, include missing keywords, reformat dates, remove irrelevant experience, etc.`
}

8. parsedProfile : Extract candidate's raw profile details:
   - name: Extract full name of the candidate.
   - title: Extract or infer their current or target professional job title (e.g., "Software Engineer").
   - email: Candidate's email address.
   - phone: Candidate's contact phone number.
   - location: Candidate's city/country location.
   - experience: Extract work experience history blocks as a single structured multiline string.
   - education: Extract education degree details.

Important:
- Use double quotes for all strings and keys.
- Ensure arrays do not have trailing commas.
- If the resume is empty or invalid, return an empty skills/missingSkills array and set atsScore to 0 with a clear summary.
- Return ONLY ONE JSON object.
- Do NOT repeat the response.
- Do NOT generate multiple outputs.

${jobDescription ? `Target Job Description:\n${jobDescription}\n` : ""}
Now analyze the following resume:
${resumeText}
`;

/* =========================
   GEMINI API
 ========================= */
const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const primaryModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const models = [
    primaryModel,
    "gemini-flash-latest"
  ];
  
  // Deduplicate keeping priority order
  const uniqueModels = [...new Set(models)];
  let lastError = null;

  for (const model of uniqueModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GEMINI_API_ERROR for ${model}: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log("DEBUG: Gemini API Response payload:", JSON.stringify(data));
      const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (textOutput) {
        if (model !== primaryModel) {
          console.log(`[AI Fallback] ${primaryModel} failed. Successfully used fallback model: ${model}`);
        }
        return textOutput;
      }
    } catch (err) {
      console.warn(`[AI Fallback warning] Model ${model} failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("All Gemini models failed");
};

/* =========================
   MAIN FUNCTION
 ========================= */
export const analyzeResume = async (resumeText, fileMeta = {}, jobDescription = "") => {
  try {
    // Extend timeout to 45000 ms to handle higher latency when evaluating job descriptions
    const raw = await withTimeout(callGemini(buildPrompt(resumeText, jobDescription)), 45000);

    let parsed = extractJSON(raw);

    // Defensive parsing normalizer to fix minor variations in LLM JSON format outputs
    if (parsed) {
      // 1. Ensure atsScore is a valid number
      if (typeof parsed.atsScore === "string") {
        parsed.atsScore = parseInt(parsed.atsScore.replace(/[^0-9]/g, ""), 10) || 0;
      } else if (typeof parsed.atsScore !== "number") {
        parsed.atsScore = 0;
      }

      // 2. Ensure summary is a string
      if (typeof parsed.summary !== "string") {
        parsed.summary = String(parsed.summary || "");
      }

      // 3. Ensure array formats are standard lists of strings
      const ensureArray = (val) => {
        if (Array.isArray(val)) {
          return val.map(String);
        }
        if (typeof val === "string") {
          return val.split(/\n|,/).map(s => s.trim().replace(/^•\s*/, "")).filter(Boolean);
        }
        return [];
      };

      parsed.skills = ensureArray(parsed.skills);
      parsed.missingSkills = ensureArray(parsed.missingSkills);
      parsed.strengths = ensureArray(parsed.strengths);
      parsed.keyHighlights = ensureArray(parsed.keyHighlights);
      parsed.improvements = ensureArray(parsed.improvements);
    }

    if (!parsed || !validateResponse(parsed)) {
      console.error("DEBUG: Raw AI Response that failed validation:\n", raw);
      throw new Error("INVALID_AI_RESPONSE");
    }

    return parsed;
  } catch (err) {
    logger.error("AI_RESPONSE_ERROR", {
      message: err.message,
      file: fileMeta.file,
      savedAt: fileMeta.savedAt,
      mime: fileMeta.mime,
    });

    return {
      status: 0,
      atsScore: 0,
      summary: "AI analysis failed. Please try again.",
      skills: [],
      missingSkills: [],
      strengths: [],
      keyHighlights: [],
      improvements: [],
    };
  }
};
