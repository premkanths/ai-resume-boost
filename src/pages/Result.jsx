import Footer from "../components/Footer";
import ScoreCard from "../components/Result_Page/ScoreCard";
import Skills from "../components/Result_Page/Skills";
import MissingSkills from "../components/Result_Page/MissingSkills";
import Suggestions from "../components/Result_Page/Suggestions";
import Strenghts from "../components/Result_Page/Strengths";
import KeyHighlights from "../components/Result_Page/KeyHighlights";
import Summary from "../components/Result_Page/Summary";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Sparkles, BookOpen, Award, CheckCircle } from "lucide-react";

export default function Result() {
  const navigate = useNavigate();
  const analysis = JSON.parse(localStorage.getItem("analysis") || "{}");

  const handleMigrateToCanvas = () => {
    const username = localStorage.getItem("username") || "Guest";
    const profile = analysis.parsedProfile || {};

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
      { id: "mig_sum_b", type: "paragraph", text: profile.summary || analysis.summary || "Click to edit summary...", x: 50, y: 190, width: 694 },
      
      // Core Skills Section
      { id: "mig_skills_t", type: "heading", text: "CORE EXPERTISE & SKILLS", x: 50, y: 310, width: 330, textColor: "#18181b" },
      { id: "mig_skills_b", type: "paragraph", text: analysis.skills && analysis.skills.length > 0 
          ? analysis.skills.map(s => `• ${s}`).join("\n")
          : "• Project Architecture\n• Technical Engineering\n• Problem Solving", x: 50, y: 335, width: 330 },
      
      // Education Section
      { id: "mig_edu_t", type: "heading", text: "EDUCATION BACKGROUND", x: 420, y: 310, width: 320, textColor: "#18181b" },
      { id: "mig_edu_b", type: "paragraph", text: profile.education || "Bachelor of Science in Computer Science\nUniversity of Technology", x: 420, y: 335, width: 320 },
      
      // Work Experience Section
      { id: "mig_exp_t", type: "heading", text: "WORK EXPERIENCE HISTORY", x: 50, y: 510, width: 694, textColor: "#18181b" },
      { id: "mig_exp_b", type: "paragraph", text: profile.experience || "Senior Systems Engineer — Enterprise Corp (2022 - Present)\n• Designed scalable service architectures.\n• Streamlined deployments reducing latency.", x: 50, y: 535, width: 694 }
    ];

    localStorage.setItem(`editorResumeData_${username}`, JSON.stringify({ isFreestyle: true, blocks: migratedBlocks }));
    localStorage.setItem("selectedTemplateId", "blank-canvas"); // Load on blank canvas so it shows clean
    navigate("/editor");
  };

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen flex flex-col transition-colors duration-200">
      
      <div className="flex pt-6 flex-grow">
        
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">Analysis Results</h1>
              <p className="text-gray-500 dark:text-zinc-400">
                Resume Analysis • Just Now
              </p>
            </div>

            <div className="flex gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-xl transition duration-200 flex items-center gap-2 font-medium bg-white dark:bg-zinc-900"
              >
                <Download size={18} />
                Export PDF
              </button>

              <Link
                to="/"
                className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-xl transition duration-200 flex items-center gap-2 font-medium bg-white dark:bg-zinc-900"
              >
                <ArrowLeft size={18} />
                Analyze Another
              </Link>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* DIRECT PROFILE-TO-CANVAS MIGRATION CARD */}
            <div className="md:col-span-12 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-700/50">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-[10px] font-extrabold uppercase tracking-wider">
                  <Sparkles size={12} className="text-indigo-300 animate-pulse" />
                  One-Click Builder Sync
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Convert Profile Into Canvas Resume</h2>
                <p className="text-indigo-200/80 text-xs leading-relaxed">
                  We have parsed your professional details, qualifications, and core achievements. Click below to pre-populate them straight into our Canva Freestyle editor with one click!
                </p>
              </div>
              <button
                onClick={handleMigrateToCanvas}
                className="px-6 py-3.5 bg-white hover:bg-zinc-100 text-indigo-950 rounded-2xl text-xs font-bold shadow-md transition duration-150 flex items-center gap-2 shrink-0 select-none"
              >
                <Sparkles size={16} className="text-indigo-650" />
                Build Canvas Resume
              </button>
            </div>

            <ScoreCard score={analysis.atsScore} />

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
              <Skills skills={analysis.skills} />
            </div>

            {/* PLACEMENT PATHWAYS PANEL */}
            <div className="md:col-span-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-1.5 flex items-center gap-2">
                <Award className="text-indigo-600 dark:text-indigo-400" size={20} />
                Career Placement Recommendations
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-6">
                Targeted technical paths and coding projects suggested based on your profile checklist:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* COURSES CARD */}
                <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <BookOpen className="text-indigo-500" size={16} />
                    Recommended Learning Pathways
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                    Upgrade your skill sets and bridge gaps through our interactive capstone roadmaps:
                  </p>
                  <div className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-205">Java Developer Pathway</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Core JRE/JVM syntax, Spring Boot, JPA, & Hibernate REST controllers</p>
                    </div>
                    <Link
                      to="/roadmaps"
                      className="px-3.5 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 rounded-xl text-[10px] font-bold transition shrink-0"
                    >
                      Start Course
                    </Link>
                  </div>
                </div>

                {/* PROJECTS CARD */}
                <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <CheckCircle className="text-emerald-500" size={16} />
                    Recommended Practical Projects
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                    Incorporate these high-impact projects into your resume to attract recruiters:
                  </p>
                  <ul className="text-xs space-y-2 text-zinc-650 dark:text-zinc-400 list-disc pl-4 leading-relaxed">
                    <li><strong>Cluster Telemetry Dashboard:</strong> Build a real-time analytics client using Next.js & WebSockets (Go backend).</li>
                    <li><strong>Distributed REST API:</strong> Develop a secure database integration using Spring Boot, Hibernate, and PostgreSQL.</li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Strenghts strenghts={analysis.strengths} />
              <KeyHighlights keyHighlights={analysis.keyHighlights} />
            </div>

            <MissingSkills missingSkills={analysis.missingSkills} />
            <Suggestions suggestions={analysis.improvements} />

            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Summary summary={analysis.summary} />
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}