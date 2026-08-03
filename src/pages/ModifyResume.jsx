import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileUp, Sparkles, AlertCircle } from "lucide-react";

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

  // Trigger text extraction (Direct, no AI analysis)
  const startParsing = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(15);
    setError("");

    // Simulate progress ticks
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 120);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(`${API_BASE}/resumes/extract-text`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        throw new Error("Failed to extract text from resume");
      }

      const data = await res.json();
      setProgress(100);

      // Load text straight to canvas blocks
      handleMigrateToCanvas(data.text || "");

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to parse text. Please try again.");
      setProgress(0);
      setLoading(false);
    }
  };

  // Load the raw text directly onto canvas editor blocks without any AI manipulation
  const handleMigrateToCanvas = (rawText) => {
    const username = localStorage.getItem("username") || "Guest";
    const nameLabel = username.toUpperCase().replace(".", " ");

    // Clean and convert text newlines to HTML <br/> tags for canvas editor block rendering
    const formattedText = rawText
      .replace(/\r\n/g, "\n")
      .replace(/\n\n+/g, "\n\n")
      .replace(/\n/g, "<br/>")
      .trim();

    const migratedBlocks = [
      { id: "mod_name", type: "title", text: nameLabel, x: 50, y: 50, width: 694, textColor: "#4f46e5" },
      { id: "mod_subtitle", type: "subtitle", text: "MY IMPORTED RESUME", x: 50, y: 95, width: 694, textColor: "#71717a" },
      { id: "mod_text", type: "paragraph", text: formattedText || "Double-click to insert resume text details...", x: 50, y: 140, width: 694 }
    ];

    // Save and load directly on editor under username isolation key
    localStorage.setItem(`editorResumeData_${username}`, JSON.stringify({ isFreestyle: true, blocks: migratedBlocks }));
    localStorage.setItem("selectedTemplateId", "blank-canvas"); // Open Canvas directly
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
            Upload your existing PDF or DOCX file to open and modify its text details directly on our Canvas Editor.
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
                  <span>Importing resume details...</span>
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
                Open in Canvas Editor
              </button>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
