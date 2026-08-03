import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { 
  FileUp, 
  Sparkles, 
  AlertCircle, 
  Save, 
  Download, 
  ArrowLeft, 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3, 
  Eraser, 
  Undo2, 
  Redo2,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "https://ai-resume-boost.onrender.com/api";

export default function ModifyResume() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editorActive, setEditorActive] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [hasDraft, setHasDraft] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const fileInputRef = useRef();
  const downloadMenuRef = useRef();

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Double-click to insert content here...</p>",
  });

  // Check if a saved draft exists
  useEffect(() => {
    const username = localStorage.getItem("username") || "Guest";
    const draft = localStorage.getItem(`savedModifiedResume_${username}`);
    if (draft) {
      setHasDraft(true);
    }
  }, []);

  // Handle outside click to close download dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // File validation
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

  // Upload and extract rich HTML content
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
        throw new Error("Failed to extract content from resume");
      }

      const data = await res.json();
      setProgress(100);

      if (editor && data.html) {
        editor.commands.setContent(data.html);
      }
      setEditorActive(true);

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to parse text. Please try again.");
      setProgress(0);
      setLoading(false);
    }
  };

  // Load draft from local storage
  const loadSavedDraft = () => {
    const username = localStorage.getItem("username") || "Guest";
    const draft = localStorage.getItem(`savedModifiedResume_${username}`);
    if (editor && draft) {
      editor.commands.setContent(draft);
      setEditorActive(true);
    }
  };

  // Save document HTML to local storage
  const handleSave = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const username = localStorage.getItem("username") || "Guest";
    localStorage.setItem(`savedModifiedResume_${username}`, html);
    setHasDraft(true);

    setSavedMessage("Draft saved successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  // Export actions
  const downloadHTML = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name?.replace(/\.[^/.]+$/, "") || "resume"}_modified.html`;
    a.click();
    URL.revokeObjectURL(url);
    setShowDownloadMenu(false);
  };

  const downloadTXT = () => {
    if (!editor) return;
    const text = editor.getText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name?.replace(/\.[^/.]+$/, "") || "resume"}_modified.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowDownloadMenu(false);
  };

  const exportPDF = () => {
    setShowDownloadMenu(false);
    window.print();
  };

  // Reset editor and file state
  const resetEditor = () => {
    if (window.confirm("Are you sure you want to go back? Unsaved changes will be lost.")) {
      setFile(null);
      setProgress(0);
      setLoading(false);
      setEditorActive(false);
      if (editor) {
        editor.commands.setContent("<p>Double-click to insert content here...</p>");
      }
    }
  };

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    if (loading) return;
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen no-print">
      
      {/* Dynamic CSS styles loaded for Tiptap rich editing formatting */}
      <style>{`
        .tiptap-editor-container .ProseMirror {
          outline: none;
          min-height: 550px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          padding: 40px;
        }
        .tiptap-editor-container .ProseMirror h1 {
          font-size: 1.8em;
          font-weight: 800;
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: inherit;
        }
        .tiptap-editor-container .ProseMirror h2 {
          font-size: 1.4em;
          font-weight: 700;
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: inherit;
        }
        .tiptap-editor-container .ProseMirror h3 {
          font-size: 1.15em;
          font-weight: 600;
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: inherit;
        }
        .tiptap-editor-container .ProseMirror p {
          margin-bottom: 0.8em;
        }
        .tiptap-editor-container .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.8em;
        }
        .tiptap-editor-container .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.8em;
        }
        .tiptap-editor-container .ProseMirror li {
          margin-bottom: 0.3em;
        }
        .tiptap-editor-container .ProseMirror blockquote {
          border-left: 4px solid #4f46e5;
          padding-left: 1rem;
          color: #6b7280;
          font-style: italic;
          margin-bottom: 0.8em;
        }
        .tiptap-editor-container .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }

        /* Styling printable area overrides */
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
          .print-area .ProseMirror {
            padding: 0 !important;
            min-height: auto !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* RENDER NORMAL VIEW */}
      {!editorActive ? (
        <main className="p-6 md:p-10 max-w-4xl mx-auto w-full no-print">
          {/* HEADER */}
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Modify
            </span>
            <h1 className="text-4xl font-bold tracking-tight mt-1 text-zinc-900 dark:text-white">
              Upload & Edit Resume
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-2">
              Upload your existing PDF or DOCX file to open and edit its rich formatting directly.
            </p>
          </div>

          {/* UPLOAD ZONE */}
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
              <input
                type="file"
                accept=".pdf,.docx"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
                disabled={loading}
              />

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

              {loading && (
                <div className="mt-8 max-w-md mx-auto">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-indigo-600 dark:text-indigo-400">
                    <span>Extracting resume layout...</span>
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

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl flex items-start gap-3 text-red-650 dark:text-red-400">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <div className="text-xs font-semibold">{error}</div>
              </div>
            )}

            {file && !loading && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={startParsing}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/10 transition-all duration-200 flex items-center gap-2 group hover:scale-[1.01]"
                >
                  <Sparkles size={16} className="text-indigo-200 group-hover:animate-pulse" />
                  Open in Rich Editor
                </button>
              </div>
            )}
          </div>

          {/* RESTORE DRAFT IF AVAILABLE */}
          {hasDraft && (
            <div className="mt-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm flex items-center justify-between transition-colors duration-200">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
                  Unfinished draft found
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  You have a previously modified resume saved in local browser storage.
                </p>
              </div>
              <button
                onClick={loadSavedDraft}
                className="px-4 py-2 bg-indigo-55 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200/20 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 rounded-xl text-xs font-bold transition duration-150"
              >
                Restore Draft
              </button>
            </div>
          )}
        </main>
      ) : (
        /* RENDER EDITOR WORKSPACE */
        <main className="p-6 md:p-10 max-w-5xl mx-auto w-full no-print">
          
          {/* HEADER ACTION BAR */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            <div className="flex items-center gap-3">
              <button
                onClick={resetEditor}
                className="p-2.5 border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl shadow-sm transition duration-150"
                title="Go Back to Upload"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Document Editor</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {file ? file.name : "Restored Draft"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto relative">
              
              {/* SAVED NOTIFICATION MESSAGE */}
              {savedMessage && (
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-pulse bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-250 dark:border-emerald-900/30">
                  <CheckCircle2 size={14} />
                  {savedMessage}
                </div>
              )}

              {/* SAVE BUTTON */}
              <button
                onClick={handleSave}
                className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-sm transition duration-150 flex items-center gap-2"
              >
                <Save size={14} />
                Save Draft
              </button>

              {/* DOWNLOAD DROPDOWN TRIGGER */}
              <div className="relative" ref={downloadMenuRef}>
                <button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className="px-4 py-2.5 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl shadow-sm text-xs font-bold transition duration-150 flex items-center gap-2"
                >
                  <Download size={14} />
                  Download
                  <ChevronDown size={12} />
                </button>

                {/* DROPDOWN MENU */}
                {showDownloadMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
                    <button
                      onClick={downloadHTML}
                      className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800"
                    >
                      Download as HTML (.html)
                    </button>
                    <button
                      onClick={downloadTXT}
                      className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800"
                    >
                      Download as Text (.txt)
                    </button>
                    <button
                      onClick={exportPDF}
                      className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Export to PDF / Print
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* EDITOR FORMATTING TOOLBAR */}
          {editor && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 mb-4 flex flex-wrap items-center gap-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("bold") 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Bold"
              >
                <Bold size={16} />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("italic") 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Italic"
              >
                <Italic size={16} />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("strike") 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Strikethrough"
              >
                <Strikethrough size={16} />
              </button>

              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("heading", { level: 1 }) 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Heading 1"
              >
                <Heading1 size={16} />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("heading", { level: 2 }) 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Heading 2"
              >
                <Heading2 size={16} />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("heading", { level: 3 }) 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Heading 3"
              >
                <Heading3 size={16} />
              </button>

              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("bulletList") 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Bullet List"
              >
                <List size={16} />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("orderedList") 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Ordered List"
              >
                <ListOrdered size={16} />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("blockquote") 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                title="Blockquote"
              >
                <Quote size={16} />
              </button>

              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                className="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition"
                title="Clear Formatting"
              >
                <Eraser size={16} />
              </button>

              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 ml-auto" />

              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-30 transition"
                title="Undo"
              >
                <Undo2 size={16} />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-30 transition"
                title="Redo"
              >
                <Redo2 size={16} />
              </button>
            </div>
          )}

          {/* EDITOR WRAPPER SHEET */}
          <div className="tiptap-editor-container bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl transition-all duration-200">
            <EditorContent editor={editor} />
          </div>

        </main>
      )}

      {/* HIDDEN PRINT-ONLY PORTION */}
      {editorActive && editor && (
        <div className="hidden print-area">
          <div 
            className="ProseMirror"
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
          />
        </div>
      )}

    </div>
  );
}
