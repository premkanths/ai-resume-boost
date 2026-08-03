import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileUp, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "https://ai-resume-boost.onrender.com/api";

export default function ModifyResume() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef();
  const navigate = useNavigate();

  // Validate and set file
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF or DOCX files are allowed");
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      alert("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setError("");
    setProgress(0);
  };

  // Trigger Parsing
  const startParsing = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(5); // Immediate feedback

    try {
      const username = localStorage.getItem("username") || "Guest";
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", ""); // Empty since we're just modifying, not comparing
      formData.append("userId", username);

      const res = await fetch(`${API_BASE}/resumes`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const { jobId } = await res.json();
      pollStatus(jobId);

    } catch (err) {
      console.error(err);
      setError("Upload failed, please try again.");
      setLoading(false);
    }
  };

  // Poll status from backend
  const pollStatus = (jobId) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/resumes/${jobId}/status`);
        if (!res.ok) {
          throw new Error("Parsing tracking lost.");
        }
        const data = await res.json();

        if (data.progress !== undefined && !isNaN(data.progress)) {
          setProgress((prev) => Math.max(prev, data.progress));
        }

        if (data.status === "completed") {
          clearInterval(interval);
          
          if (data.result?.status === 0) {
            setProgress(0);
            setLoading(false);
            alert("AI Parsing failed, please try again...");
            return;
          }

          // Save the analysis globally in history/results as well
          localStorage.setItem("analysis", JSON.stringify(data.result));
          
          // Migrate straight to editor
          handleMigrateToCanvas(data.result);
        }

        if (data.status === "failed") {
          clearInterval(interval);
          if (data.error === "Unsupported File Type") {
            setError("Processing failed - Unsupported File Type!");
          } else {
            setError("Processing failed, please try again.");
          }
          setProgress(0);
          setLoading(false);
        }

      } catch (err) {
        clearInterval(interval);
        console.error(err);
        setError("Connection error or session timeout. Please try again.");
        setProgress(0);
        setLoading(false);
      }
    }, 800);
  };

  // Map parsed resume profile structure straight to canvas editor blocks
  const handleMigrateToCanvas = (resultData) => {
    const username = localStorage.getItem("username") || "Guest";
    const profile = resultData.parsedProfile || {};

    const nameLabel = profile.name || username.toUpperCase().replace(".", " ");
    const titleLabel = profile.title || "PROFESSIONAL CANDIDATE";
    const contactInfo = `${profile.phone || "+123-456-7890"}  •  ${profile.email || "email@site.com"}  •  ${profile.location || "City, Country"}`;
    
    // Auto populate parsed sections matching their uploaded resume text
    const migratedBlocks = [
      // Name header
      { id: "mig_name", type: "title", text: nameLabel, x: 50, y: 50, width: 694, textColor: "#4f46e5" },
      { id: "mig_title", type: "subtitle", text: titleLabel, x: 50, y: 95, width: 694, textColor: "#71717a" },
      { id: "mig_contact", type: "paragraph", text: contactInfo, x: 50, y: 120, width: 694 },
      
      // Professional Summary Section
      { id: "mig_sum_t", type: "heading", text: "PROFESSIONAL SUMMARY", x: 50, y: 165, width: 694, textColor: "#18181b" },
      { id: "mig_sum_b", type: "paragraph", text: profile.summary || resultData.summary || "Click to edit summary...", x: 50, y: 190, width: 694 },
      
      // Core Skills Section
      { id: "mig_skills_t", type: "heading", text: "CORE EXPERTISE & SKILLS", x: 50, y: 310, width: 330, textColor: "#18181b" },
      { id: "mig_skills_b", type: "paragraph", text: resultData.skills && resultData.skills.length > 0 
          ? resultData.skills.map(s => `• ${s}`).join("\n")
          : "• Project Architecture\n• Technical Engineering\n• Problem Solving", x: 50, y: 335, width: 330 },
      
      // Education Section
      { id: "mig_edu_t", type: "heading", text: "EDUCATION BACKGROUND", x: 420, y: 310, width: 320, textColor: "#18181b" },
      { id: "mig_edu_b", type: "paragraph", text: profile.education || "Bachelor of Science in Computer Science\nUniversity of Technology", x: 420, y: 335, width: 320 },
      
      // Work Experience Section
      { id: "mig_exp_t", type: "heading", text: "WORK EXPERIENCE HISTORY", x: 50, y: 510, width: 694, textColor: "#18181b" },
      { id: "mig_exp_b", type: "paragraph", text: profile.experience || "Senior Systems Engineer — Enterprise Corp (2022 - Present)\n• Designed scalable service architectures.\n• Streamlined deployments reducing latency.", x: 50, y: 535, width: 694 }
    ];

    // Save and load directly on editor under username isolation key
    localStorage.setItem(`editorResumeData_${username}`, JSON.stringify({ isFreestyle: true, blocks: migratedBlocks }));
    localStorage.setItem("selectedTemplateId", "blank-canvas"); // Load on blank canvas so it shows clean
    navigate("/editor");
  };

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    if (loading) return;
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen">
      <main className="p-6 md:p-10 max-w-4xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Modify
          </span>
          <h1 className="text-4xl font-bold tracking-tight mt-1 text-zinc-900 dark:text-white">
            Upload & Edit Resume
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">
            Upload a PDF or DOCX file. Our AI parser will extract the details and load them directly into our Canvas Editor.
          </p>
        </div>

        {/* UPLOAD CONTAINER */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-sm transition-colors duration-200">
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => {
              if (!loading) fileInputRef.current.click();
            }}
            className={`border-2 border-dashed rounded-xl p-10 md:p-12 text-center cursor-pointer transition-all duration-200 ${
              loading 
                ? "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 cursor-not-allowed" 
                : file 
                  ? "border-indigo-300 dark:border-indigo-500/30 bg-indigo-50/10 dark:bg-indigo-950/5"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/20"
            }`}
          >
            {/* Input Element */}
            <input
              type="file"
              accept=".pdf,.docx"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
              disabled={loading}
            />

            {/* Upload Icon */}
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 flex justify-center p-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 shadow-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-200">
                <FileUp size={28} />
              </div>

              {file ? (
                <div>
                  <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
                    {file.name}
                  </h3>
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-1">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Click to change
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">
                    Click to browse or drop resume here
                  </h3>
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-1">
                    PDF, DOCX • max 10MB
                  </p>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-indigo-600 dark:text-indigo-400">
                  <span>Extracting resume details...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Error Alerts */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl flex items-start gap-3 text-red-650 dark:text-red-400">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div className="text-xs font-semibold">{error}</div>
            </div>
          )}

          {/* Action Trigger button */}
          {file && !loading && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={startParsing}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/10 transition-all duration-200 flex items-center gap-2 group hover:scale-[1.01]"
              >
                <Sparkles size={16} className="text-indigo-200 group-hover:animate-pulse" />
                Parse & Open Editor
              </button>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
