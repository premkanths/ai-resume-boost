# 🚀 Resumate AI — Intelligent Resume Analysis & Interactive Builder Platform

Resumate AI is a next-generation SaaS evaluation portal that parses, scores, and optimizes candidate profiles. It combines automated OCR document parsing with Gemini-powered ATS keyword evaluation, structured career learning pathways, and a Canva-style freestyle resume editor.

---

## 📋 Table of Contents
* [✨ Features](#-features)
* [🏗️ System Architecture](#️-system-architecture)
* [🛠️ Tech Stack](#️-tech-stack)
* [📄 Resume Parsing & AI Flow](#-resume-parsing--ai-flow)
* [🎨 Canva-Style Resume Builder](#-canva-style-resume-builder)
* [💡 Placement & Course Pathway Recommendations](#-placement--course-pathway-recommendations)
* [⚙️ API Endpoints](#️-api-endpoints)
* [🚀 Installation Guide](#-installation-guide)
* [🐧 Linux Setup](#-linux-setup)
* [🪟 Windows Setup](#-windows-setup)
* [🌐 NGINX Production Deployment](#-production-deployment-nginx)

---

## ✨ Features

* **📄 Multi-layer Resume Parsing Pipeline:** Combines direct text extraction with mammoth/pdfjs and automatic Tesseract OCR fallback for scanned resumes.
* **🔍 AI-Powered ATS Analysis:** Evaluates keyword density, metrics alignment, and content formatting relative to target job descriptions using Gemini.
* **🎨 Canva-Style Freestyle Resume Editor:** Drag, drop, and resize blocks on an A4 sheet. Includes font customizers, margin settings, and background shape elements.
* **✍️ Floating Rich Text Toolbar:** Highlight text blocks to apply Bold, Italic, and Underline formatting dynamically without losing focus.
* **🔄 One-Click Resume Migration:** Instantly convert your parsed profile (name, contact details, experiences, and education) into canvas editor blocks.
* **💾 O(1) Memory Compression:** Downscales uploaded avatar images in the browser to ~15KB (releasing 99.5% of storage space) to prevent LocalStorage quota limits.
* **🔐 Account-Isolated Drafts:** Stores draft layouts under unique session keys (`editorResumeData_${username}`) to protect multi-user data.
* **📈 Interactive Course Pathways:** Features a fully functional pathway tree mapping courses (e.g. Java Developer roadmap) and recommended portfolio projects to bridge career skill gaps.

---

## 🏗️ System Architecture

```text
       Frontend (React)  ←─── [Freestyle Builder & Results Page]
              ↓
     NGINX Reverse Proxy
              ↓
  Backend (Node.js + Express)
        ├── SQLite DB (Save scan histories)
        └── Resume Parsing Engine
              ├── Mammoth (.docx)
              ├── pdfjs-dist / pdf-text-extract (.pdf)
              └── Tesseract OCR (Scanned Fallback)
```

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 18, Vite, React Router DOM
* **Styling:** Tailwind CSS, Vanilla CSS
* **Icons:** Lucide React

### Backend
* **Server:** Node.js, Express
* **Database:** SQLite3

### Parsing & OCR
* `pdfjs-dist` (Fast PDF extraction)
* `mammoth` (DOCX parsing)
* `Tesseract OCR` (Scanned image OCR)
* `file-type` (Buffer MIME validation)

---

## 📄 Resume Parsing & AI Flow

```text
PDF/DOCX Upload  ──>  MIME Check  ──>  Mammoth/pdfjs  ──>  Text Clean
                                           │ (fallback)
                                           └──> OCR (Tesseract) ──> Text Clean
                                                                        │
                                   Gemini Analysis & Profile Parser <───┘
```

The AI returns a unified response containing:
1. **ATS Score:** Evaluated out of 100 based on keyword density.
2. **Missing Keywords:** Technical gaps to bridge.
3. **Parsed Profile:** Extracted candidate details (Name, Contact, Experience, Education) to pre-populate the resume builder.

---

## 🎨 Canva-Style Resume Builder

A fully functional, Canva-identical drag-and-drop workspace built on vanilla layouts:
* **Drag-and-Drop:** Move text elements, background blocks, and avatars anywhere on the A4 canvas.
* **Proportional Crop & Pan:** Double-click image avatars to zoom (0.5x to 3.0x) and pan details using mouse gestures and sliders.
* **Formatting Strip:** A floating text format bar allows dynamic inline styling (`B`, `I`, `U`).
* **50-Step Undo Engine:** Press `Ctrl + Z` or click Undo to restore snapshots of modifications.
* **Template Blueprints:** 9 visual layouts available to quickly initialize your resume structure.

---

## 💡 Placement & Course Pathway Recommendations

Bridge technical skills gaps identified in the resume analysis:
* **Learning Pathways:** Connects users directly to `/roadmaps` offering interactive milestone guides (like the 5-level **Java Developer Roadmap**).
* **Suggested Portfolio Projects:** Offers practical development instructions (e.g., telemetry dashboards, REST APIs) for CV inclusion.

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/resumes` | Upload a PDF/DOCX and start background parsing |
| **GET** | `/api/resumes/:jobId/status` | Poll parsing status and analysis output |
| **GET** | `/api/resumes/history` | Retrieve user profile scan history |
| **POST** | `/api/auth/register` | Register a candidate account |
| **POST** | `/api/auth/login` | Login to candidate dashboard |

---

## 🚀 Installation Guide

### Prerequisites
* Node.js v18+
* npm v9+
* Git

---

### 🐧 Linux Setup

#### 1. Install System Dependencies
```bash
sudo apt update
sudo apt install -y poppler-utils tesseract-ocr tesseract-ocr-eng
```

#### 2. Install Node Packages
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

#### 3. Setup Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
VITE_API_URL=http://localhost:5000/api
```

#### 4. Run Development Servers
```bash
# Start Backend (from backend directory)
npm run dev

# Start Frontend (from frontend directory)
npm run dev
```

---

### 🪟 Windows Setup

On Windows, standard poppler utilities are loaded via node packages.
```bash
# Install parsing modules
npm install pdf-poppler uuid tesseract.js mammoth pdfjs-dist
```

Ensure your `.env` variables contain your `GEMINI_API_KEY` in the backend folder, and run:
```bash
# Backend
node server.js

# Frontend
npm run dev
```

---

## 🌐 NGINX Production Deployment

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /home/ubuntu/resumate-ai/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

---

## 📜 License
Copyright (c) 2026 @premkanth. All Rights Reserved.
