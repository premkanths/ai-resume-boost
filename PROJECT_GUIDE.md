# 🎓 Resumate AI — Master Placement & Interview Guide

This guide is designed to help you explain the technical architecture, core innovations, and engineering decisions of the **Resumate AI** project during your placement interviews.

---

## 1. Project Overview & Pitch
**Resumate AI** is an intelligent candidate optimization portal. It allows users to upload their resumes (PDF/DOCX) alongside optional Job Descriptions. The platform parses the document, runs a multi-layered AI analysis to compute an ATS score, highlights missing keywords, suggests improvements, and provides a **Canva-style freestyle resume editor** to instantly migrate and customize their resume layout.

---

## 2. Core Architecture & Tech Stack

```text
       [React Frontend] (Vite + CSS)
              ↓ (API Calls)
      [Node.js / Express Backend]
              ├── [SQLite DB] (Scan history & authentication)
              ├── [Mammoth & PDFJS] (Plain-text parsers)
              └── [Tesseract OCR + Poppler] (Scanned document fallback)
                      ↓ (Prompt engineering)
              [Gemini AI Engine] (ATS scoring & candidate profile extraction)
```

* **Frontend:** React 18, Vite (Fast build tool), Tailwind CSS + Vanilla CSS (for layout drag/drop precision), React Router DOM.
* **Backend:** Node.js, Express.js (REST API server), SQLite3 (Lightweight database for history logging and user accounts).
* **Parsing Engine:** `pdfjs-dist` (direct text extraction), `mammoth` (Word document parsing), `Tesseract.js` (OCR for scanned images), `pdf-poppler` (rendering PDF pages to images for OCR scanning).
* **AI Integration:** Google Gemini API (`gemini-2.5-flash` model).

---

## 3. Deep-Dive: Key Technical Implementations

### A. Multi-Layer Resume Parsing Pipeline
* **How it works:** Not all PDFs contain extractable text (e.g., scanned images of resumes). The backend implements a fallback strategy:
  1. The server reads the file buffer.
  2. If it is a DOCX, it runs **Mammoth** to convert XML to text.
  3. If it is a PDF, it attempts text extraction via **PDF.js**.
  4. If the extracted text is empty or too short, it falls back to **OCR**. It uses **Poppler** to convert PDF pages into high-resolution PNG images and feeds them to **Tesseract.js** to transcribe the text.
* **Interview Talking Point:** *"I designed a multi-layer fallback pipeline because raw text extraction fails on scanned documents. By introducing an automated OCR fallback using Tesseract, the system handles standard and scanned documents seamlessly."*

### B. O(1) Memory Compression on Upload
* **The Problem:** The Circular Avatar uploader supports base64 files. A standard phone camera photo is **3MB to 8MB**. Storing this directly in browser `localStorage` causes it to exceed the **5MB browser quota limit**, crash the app, and degrade rendering performance.
* **The Solution:** I implemented an **HTML5 Canvas image compressor** directly in the browser's upload callback. When a user uploads an image, the code loads it into a temporary memory Image, downscales it to a max resolution of `300px` (since the avatar is a `100px` circle), and converts it into a `0.7` quality JPEG.
* **The Result:** The base64 size drops from **~5MB to ~15KB** (a **99.5% reduction**), ensuring the app never hits browser quota limits or experiences rendering lags.
* **Interview Talking Point:** *"I solved a critical browser-level bottleneck. High-resolution images were hitting the 5MB localStorage quota. I implemented client-side HTML Canvas image compression, reducing memory overhead by 99% while maintaining crisp visual quality."*

### C. Canva-Style Freestyle Resume Editor
* **Absolute Coordinate Mapping:** All canvas elements (text, background shapes, avatars) are rendered as absolute-positioned divs (`left`, `top`, `width`, `height` in pixels).
* **Mouse Event Listeners:** Dragging and resizing are handled by dynamic window mouse event tracking. Capturing `clientX`/`clientY` on mouse down, calculating the displacement delta, and updating the block state allows smooth dragging.
* **50-Step Undo Engine:** Stores serialized JSON snapshots of the `blocks` array in an state stack on key changes. Pressing `Ctrl+Z` pops the last state and re-renders the canvas.
* **Floating Rich Text Format Strip:** Mounts formatting controls above focused text blocks. By calling `e.preventDefault()` in the formatting buttons' `onMouseDown`, we prevent the browser from stealing focus, allowing `document.execCommand("bold")` to target the highlighted text range directly.

### D. Direct Profile-to-Canvas Migration
* **How it works:** Instead of starting from placeholders, the Gemini AI returns a structured `parsedProfile` JSON. When the user clicks "Build Canvas Resume," the system maps the parsed candidate Name, Contact details, Education, and Work History directly into editor coordinate blocks, letting the user start customizing immediately.

---

## 4. Expected Interview Q&A

### Q1: Why did you use `app.use(cors())` instead of restrictive origins in production?
* **Answer:** *"During development, we used unrestricted CORS to allow the React local server (`localhost:5173`) and Express backend (`localhost:5000`) to communicate. In production, this allows Vercel's dynamic preview branches to fetch API endpoints cleanly. However, in an enterprise setup, I would restrict CORS origins exclusively to the production domain to prevent Cross-Origin Resource Sharing vulnerabilities."*

### Q2: What is the benefit of using `gemini-2.5-flash` instead of `gemini-2.5-pro`?
* **Answer:** *"For resume analysis, cost, throughput, and latency are key. `gemini-2.5-flash` provides a lightweight, highly responsive model with sub-second response times, which is essential for real-time progress bars, while keeping API token usage cost-effective."*

### Q3: How do you handle database security and connection pooling in SQLite?
* **Answer:** *"We use an asynchronous wrapper around SQLite3 for non-blocking I/O. For security, we use parametric queries (`db.run("INSERT ... VALUES (?, ?)", [val1, val2])`) to completely prevent SQL Injection attacks. When moving to scale, we can transition this to PostgreSQL or MySQL with connection pools."*

### Q4: Why did you choose `onMouseDown` instead of `onClick` for the floating editor?
* **Answer:** *"In HTML, clicking a button normally fires a focus change, which makes the text box lose focus and clear the user's cursor selection. By utilizing `onMouseDown` and calling `e.preventDefault()`, we tell the browser not to shift focus away from the text input, keeping the user's text selection active so the format command applies correctly."*

---

## 5. Summary of Achievements to Highlight
1. **Full-Stack Competency:** Integrated Express backend, SQLite3 DB, and React SPA.
2. **User Experience Focus:** Built interactive Canva-like drag/drop canvas, rich text editor, and progress tracking.
3. **Resource Efficiency:** Designed dynamic client-side image compression to prevent localStorage crashes.
4. **AI-driven Automation:** Structured LLM prompt models to output strict JSON schemas for automated profile migration.
