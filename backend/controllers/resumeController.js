import { extractText } from "../utils/parser.js";
import { logger } from "../utils/logger.js";
import { analyzeResume } from "../services/aiService.js";
import { v4 as uuidv4 } from "uuid";
import { logUsage } from "../utils/usageLogger.js";
import { fileTypeFromBuffer } from "file-type";
import { run, all } from "../utils/db.js";

const jobs = new Map();

export const createResume = async (req, res) => {
  const file = req.file;
  const jobDescription = req.body.jobDescription;
  const userId = req.body.userId;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const jobId = uuidv4();

  // Initial job state
  jobs.set(jobId, {
    status: "uploading",
    progress: 10,
    result: null,
  });

  // RETURN STATUS IMMEDIATELY
  res.status(202).json({ jobId });

  //============ CHECK FILE TYPE USING file-type, IF FILE TYPE NOT SUPPORTED THEN EXIT FUNCTION ======================
  const filetype = await fileTypeFromBuffer(file.buffer);
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  if (!filetype || !allowedTypes.includes(filetype.mime)) {
    jobs.set(jobId, {
      status: "failed",
      progress: 0,
      error: "Unsupported File Type",
    });
    return;
  }
  //=====================================================================

  // BACKGROUND PROCESS (no await here)
  processResume(jobId, file, jobDescription, userId);
};

const processResume = async (jobId, file, jobDescription, userId) => {
  try {
    // Step 1 -> Parsing
    jobs.set(jobId, {
      status: "parsing",
      progress: 40,
    });

    const text = await extractText(file);

    // Step 2 -> AI Analysis
    jobs.set(jobId, {
      status: "analyzing",
      progress: 70,
    });

    const filePath = file.path;

    const analysis = await analyzeResume(text, {
      file: file.originalname,
      savedAt: filePath,
      mime: file.mimetype
    }, jobDescription);

    //after a successful analysis log the usage number
    logUsage({
      fileType: file.mimetype,
      size: file.size,
    });

    // Save scan to database
    try {
      await run(
        "INSERT INTO resumes (id, filename, job_description, score, result_json, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [
          jobId,
          file.originalname,
          jobDescription || "",
          analysis.atsScore || 0,
          JSON.stringify(analysis),
          userId || "Guest",
        ]
      );
      console.log(`[DB] Scan ${jobId} saved successfully for user ${userId || "Guest"}.`);
    } catch (dbErr) {
      console.error("[DB Error] Failed to save scan details:", dbErr.message);
    }

    // Step 3 -> Done
    jobs.set(jobId, {
      status: "completed",
      progress: 100,
      result: analysis,
    });

  } catch (err) {
    console.error("PROCESS ERROR:", err);

    logger.error({
      message: err.message,
      stack: err.stack,
    });

    jobs.set(jobId, {
      status: "failed",
      progress: 100,
      error: err.message,
    });
  }
};

export const getStatus = (req, res) => {
  const job = jobs.get(req.params.jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  res.json(job);
};

export const getHistory = async (req, res) => {
  const userId = req.query.userId || "Guest";
  try {
    const rows = await all(
      "SELECT id, filename, job_description as jobDescription, score, created_at as createdAt, result_json as resultJson FROM resumes WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    const history = rows.map((row) => ({
      id: row.id,
      filename: row.filename,
      jobDescription: row.jobDescription,
      score: row.score,
      createdAt: row.createdAt,
      result: JSON.parse(row.resultJson),
    }));

    res.json(history);
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};