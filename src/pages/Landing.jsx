import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileUp, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "https://ai-resume-boost.onrender.com/api";

export default function Landing() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef();
  const navigate = useNavigate();

  // Handle file selection
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

  // Trigger analysis
  const startAnalysis = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(5); // Immediate visual feedback

    try {
      const username = localStorage.getItem("username") || "Guest";
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
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
          throw new Error("Analysis tracking lost. Server may have restarted.");
        }
        const data = await res.json();

        if (data.progress !== undefined && !isNaN(data.progress)) {
          setProgress((prev) => Math.max(prev, data.progress));
        }

        if (data.status === "completed") {
          clearInterval(interval);
          localStorage.setItem("analysis", JSON.stringify(data.result));
          
          if (data.result?.status === 0) {
            setProgress(0);
            setLoading(false);
            alert("AI Analysis failed, please try again...");
            return;
          }

          navigate("/result");
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
        
        {/* TOP LABEL & TITLE */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Analyze
          </span>
          <h1 className="text-4xl font-bold tracking-tight mt-1 text-zinc-900 dark:text-white">
            Resume analysis
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">
            Upload a PDF or DOCX. Gemini will score, extract skills, and surface gaps.
          </p>
        </div>

        {/* WORKSPACE CONTAINER */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-sm transition-colors duration-200">
          
          {/* UPLOAD ZONE */}
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

            {/* Upload Icon or File name */}
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 flex justify-center p-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 shadow-sm text-zinc-500 dark:text-zinc-400">
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

            {/* Progress Bar inside Upload Zone */}
            {loading && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-indigo-600 dark:text-indigo-400">
                  <span>Analyzing contents...</span>
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

          {/* JOB DESCRIPTION INPUT */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-2">
              Job Description (Optional)
            </label>
            <textarea
              placeholder="Paste the target job description here to calculate a specific match score and identify keyword gaps..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-zinc-900 transition duration-150 resize-y"
            />
          </div>

          {/* ERROR DISPLAY */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* ACTION BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={startAnalysis}
              disabled={!file || loading}
              className={`px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all duration-200 flex items-center gap-2 select-none ${
                loading
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed shadow-none"
                  : file
                    ? "bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed shadow-none"
              }`}
            >
              <Sparkles size={18} />
              {loading ? "Analyzing..." : "Analyze resume"}
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}