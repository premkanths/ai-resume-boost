import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Trash2, CheckCircle } from "lucide-react";

const MoveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

// Default template presets block dictionary to restore cleaner defaults
const DEFAULT_PRESETS = {
  "richard-sanchez": [
    { id: "rs_s1", type: "shape", x: 0, y: 0, width: 794, height: 160, color: "bg-[#2f3542]" },
    { id: "rs_s2", type: "shape", x: 0, y: 160, width: 260, height: 960, color: "bg-[#f1f2f6]" },
    { id: "rs_s3", type: "avatar", x: 60, y: 100, width: 140, height: 140 },
    { id: "rs_name", type: "title", text: "RICHARD SANCHEZ", x: 280, y: 50, width: 480, textColor: "#ffffff" },
    { id: "rs_title", type: "subtitle", text: "MARKETING MANAGER", x: 280, y: 95, width: 480, textColor: "#a4b0be" },
    { id: "rs_l_contact_t", type: "heading", text: "CONTACT", x: 25, y: 270, width: 210, textColor: "#2f3542" },
    { id: "rs_l_contact_b", type: "paragraph", text: "📞 +123-456-7890\n✉ hello@reallygreatsite.com\n📍 123 Anywhere St., Any City\n🌐 www.reallygreatsite.com", x: 25, y: 295, width: 210 },
    { id: "rs_l_skills_t", type: "heading", text: "SKILLS", x: 25, y: 410, width: 210, textColor: "#2f3542" },
    { id: "rs_l_skills_b", type: "paragraph", text: "• Project Management\n• Public Relations\n• Teamwork\n• Time Management\n• Leadership\n• Effective Communication\n• Critical Thinking\n• Digital Marketing", x: 25, y: 435, width: 210 },
    { id: "rs_l_lang_t", type: "heading", text: "LANGUAGES", x: 25, y: 650, width: 210, textColor: "#2f3542" },
    { id: "rs_l_lang_b", type: "paragraph", text: "• English (Fluent)\n• French (Fluent)\n• German (Basic)\n• Spanish (Intermediate)", x: 25, y: 675, width: 210 },
    { id: "rs_l_ref_t", type: "heading", text: "REFERENCE", x: 25, y: 790, width: 210, textColor: "#2f3542" },
    { id: "rs_l_ref_b", type: "paragraph", text: "Estelle Darcy\nWardiere Inc. / CTO\nPhone: 123-456-7890\nEmail: hello@reallygreatsite.com", x: 25, y: 815, width: 210 },
    { id: "rs_r_prof_t", type: "heading", text: "PROFILE", x: 290, y: 190, width: 470, textColor: "#2f3542" },
    { id: "rs_r_prof_b", type: "paragraph", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.", x: 290, y: 215, width: 470 },
    { id: "rs_r_work_t", type: "heading", text: "WORK EXPERIENCE", x: 290, y: 340, width: 470, textColor: "#2f3542" },
    { id: "rs_r_job1_h", type: "subheading", text: "Borcelle Studio (2030 - PRESENT)", x: 290, y: 365, width: 470 },
    { id: "rs_r_job1_b", type: "paragraph", text: "Marketing Manager & Specialist\n• Develop and execute comprehensive marketing strategies and campaigns that align with the company's goals and objectives.\n• Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment.\n• Monitor brand consistency across marketing channels and materials.", x: 290, y: 385, width: 470 },
    { id: "rs_r_job2_h", type: "subheading", text: "Fauget Studio (2025 - 2029)", x: 290, y: 510, width: 470 },
    { id: "rs_r_job2_b", type: "paragraph", text: "Marketing Manager & Specialist\n• Create and manage the marketing budget, ensuring efficient allocation of resources and optimizing ROI.\n• Oversee market research to identify emerging trends, customer needs, and competitor strategies.", x: 290, y: 530, width: 470 },
    { id: "rs_r_job3_h", type: "subheading", text: "Studio Shodwe (2024 - 2025)", x: 290, y: 640, width: 470 },
    { id: "rs_r_job3_b", type: "paragraph", text: "Marketing Manager & Specialist\n• Develop and maintain strong relationships with partners, agencies, and vendors to support marketing initiatives.\n• Monitor and maintain brand consistency across all marketing channels and materials.", x: 290, y: 660, width: 470 },
    { id: "rs_r_edu_t", type: "heading", text: "EDUCATION", x: 290, y: 770, width: 470, textColor: "#2f3542" },
    { id: "rs_r_edu1_h", type: "subheading", text: "Master of Business Management (2020 - 2022)", x: 290, y: 795, width: 470 },
    { id: "rs_r_edu1_b", type: "paragraph", text: "School of Business | Wardiere University\nGPA: 3.8 / 4.0", x: 290, y: 815, width: 470 },
    { id: "rs_r_edu2_h", type: "subheading", text: "Bachelor of Business Management (2016 - 2020)", x: 290, y: 865, width: 470 },
    { id: "rs_r_edu2_b", type: "paragraph", text: "School of Business | Wardiere University\nGPA: 3.8 / 4.0", x: 290, y: 885, width: 470 }
  ],
  "estelle-darcy": [
    { id: "ed_pic", type: "avatar", x: 580, y: 40, width: 140, height: 140 },
    { id: "ed_name", type: "title", text: "ESTELLE DARCY", x: 50, y: 50, width: 500, textColor: "#dc2626" },
    { id: "ed_title", type: "subtitle", text: "GRAPHIC DESIGNER & CREATIVE DIRECTOR", x: 50, y: 95, width: 500, textColor: "#71717a" },
    { id: "ed_contacts", type: "paragraph", text: "📞 +123-456-7890   •   ✉ hello@reallygreatsite.com   •   📍 Bangalore, India", x: 50, y: 120, width: 500 },
    { id: "ed_prof_t", type: "heading", text: "PROFILE SUMMARY", x: 50, y: 210, width: 694, textColor: "#dc2626" },
    { id: "ed_prof_b", type: "paragraph", text: "Creative and detail-oriented Graphic Designer with 6+ years of expertise leading brand strategy, layout wireframes, and digital campaign aesthetics. Proven ability to translate product values into gorgeous visual designs.", x: 50, y: 235, width: 694 },
    { id: "ed_c1_t", type: "heading", text: "TECHNICAL SKILLS", x: 50, y: 310, width: 320, textColor: "#dc2626" },
    { id: "ed_c1_b", type: "paragraph", text: "• Adobe Photoshop & Illustrator\n• Figma Design System Libraries\n• Color Theory & Typography Branding\n• Responsive Website Mockups\n• Printing Layout Coordination", x: 50, y: 335, width: 320 },
    { id: "ed_c2_t", type: "heading", text: "EDUCATION BACKGROUND", x: 420, y: 310, width: 320, textColor: "#dc2626" },
    { id: "ed_c2_b", type: "paragraph", text: "Master of Fine Arts (MFA)\nNational Academy of Art, Bangalore\nClass of 2020\n\nBachelor of Science in Multimedia\nUniversity of Visual Media\nClass of 2017", x: 420, y: 335, width: 320 },
    { id: "ed_exp_t", type: "heading", text: "WORK EXPERIENCE", x: 50, y: 470, width: 694, textColor: "#dc2626" },
    { id: "ed_job1_h", type: "subheading", text: "Creative Lead — Studio Pixel Graphics (2023 - Present)", x: 50, y: 495, width: 694 },
    { id: "ed_job1_b", type: "paragraph", text: "• Designed layout templates for 4 international corporate accounts, elevating brand recognition metrics by 30%.\n• Coordinated interactive wireframe blueprints in Figma alongside front-end development engineers.", x: 50, y: 520, width: 694 },
    { id: "ed_job2_h", type: "subheading", text: "Junior Graphic Designer — Creative Lab Ltd (2020 - 2023)", x: 50, y: 590, width: 694 },
    { id: "ed_job2_b", type: "paragraph", text: "• Developed vector elements, marketing posters, email newsletters, and visual branding patterns.\n• Participated in weekly design critique sessions, adapting layouts to meet feedback specifications.", x: 50, y: 615, width: 694 }
  ],
  "dani-martinez": [
    { id: "dm_stripe", type: "shape", x: 0, y: 0, width: 80, height: 1120, color: "bg-gradient-to-b from-purple-600 to-indigo-750" },
    { id: "dm_pic", type: "avatar", x: 20, y: 60, width: 120, height: 120 },
    { id: "dm_name", type: "title", text: "DANI MARTINEZ", x: 180, y: 60, width: 560, textColor: "#4f46e5" },
    { id: "dm_title", type: "subtitle", text: "FREELANCE MARKETING CONSULTANT", x: 180, y: 105, width: 560, textColor: "#6b7280" },
    { id: "dm_c1_prof_t", type: "heading", text: "ABOUT ME", x: 180, y: 180, width: 250, textColor: "#4f46e5" },
    { id: "dm_c1_prof_b", type: "paragraph", text: "Results-driven Digital Marketer specialized in paid campaigns, customer acquisition tunnels, and viral content management.", x: 180, y: 205, width: 250 },
    { id: "dm_c1_skills_t", type: "heading", text: "CORE SKILLS", x: 180, y: 310, width: 250, textColor: "#4f46e5" },
    { id: "dm_c1_skills_b", type: "paragraph", text: "• Google Ads / Meta Ads\n• Search Engine Optimization\n• Lead Generation funnels\n• Copywriting & Storytelling\n• Web analytics & dashboards", x: 180, y: 335, width: 250 },
    { id: "dm_c1_contact_t", type: "heading", text: "CONNECT DETAILS", x: 180, y: 480, width: 250, textColor: "#4f46e5" },
    { id: "dm_c1_contact_b", type: "paragraph", text: "✉ dani.mart@gmail.com\n📞 +91 95555 66666\n📍 Bangalore, India", x: 180, y: 505, width: 250 },
    { id: "dm_c2_exp_t", type: "heading", text: "WORK EXPERIENCE", x: 460, y: 180, width: 290, textColor: "#4f46e5" },
    { id: "dm_c2_job1_h", type: "subheading", text: "Lead Marketer — BrandSutra Inc", x: 460, y: 205, width: 290 },
    { id: "dm_c2_job1_b", type: "paragraph", text: "2024 - Present\nManaged PPC advertising dashboards with a $15k monthly budget, increasing click conversions by 40%.", x: 460, y: 225, width: 290 },
    { id: "dm_c2_job2_h", type: "subheading", text: "Marketing Intern — ScaleMedia", x: 460, y: 320, width: 290 },
    { id: "dm_c2_job2_b", type: "paragraph", text: "2022 - 2024\nDrafted marketing copies, structured search keywords, and tracked user journey statistics.", x: 460, y: 340, width: 290 },
    { id: "dm_c2_edu_t", type: "heading", text: "EDUCATION", x: 460, y: 450, width: 290, textColor: "#4f46e5" },
    { id: "dm_c2_edu_h", type: "subheading", text: "Bachelor of Business Administration", x: 460, y: 475, width: 290 },
    { id: "dm_c2_edu_b", type: "paragraph", text: "Christ University, Bangalore\nClass of 2022", x: 460, y: 495, width: 290 }
  ],
  "olivia-wilson": [
    { id: "ow_line1", type: "shape", x: 50, y: 150, width: 694, height: 2, color: "bg-zinc-300" },
    { id: "ow_line2", type: "shape", x: 50, y: 460, width: 694, height: 2, color: "bg-zinc-300" },
    { id: "ow_name", type: "title", text: "OLIVIA WILSON", x: 50, y: 50, width: 694, textColor: "#18181b" },
    { id: "ow_title", type: "subtitle", text: "SENIOR FINANCIAL ANALYST", x: 50, y: 95, width: 694, textColor: "#4f46e5" },
    { id: "ow_contacts", type: "paragraph", text: "✉ olivia.wilson@site.com  |  📞 +123 9999 0000  |  📍 London, UK", x: 50, y: 120, width: 694 },
    { id: "ow_prof_h", type: "heading", text: "PROFESSIONAL PROFILE", x: 50, y: 170, width: 694, textColor: "#18181b" },
    { id: "ow_prof_b", type: "paragraph", text: "Highly analytic and detail-driven Senior Financial Analyst with 8+ years of expertise in budget forecasts, investment modeling, corporate portfolios, and financial statements checks.", x: 50, y: 200, width: 694 },
    { id: "ow_exp_h", type: "heading", text: "RELEVANT EXPERIENCE", x: 50, y: 290, width: 694, textColor: "#18181b" },
    { id: "ow_job1_h", type: "subheading", text: "Senior Analyst — Apex Investment Corp (2022 - Present)", x: 50, y: 320, width: 694 },
    { id: "ow_job1_b", type: "paragraph", text: "• Supervised the budget forecasting of 14 international accounts, optimizing annual allocations by 15%.\n• Drafted weekly market valuation summaries for the chief executive board.", x: 50, y: 340, width: 694 },
    { id: "ow_job2_h", type: "subheading", text: "Junior Analyst — Wardiere Financials (2018 - 2022)", x: 50, y: 395, width: 694 },
    { id: "ow_job2_b", type: "paragraph", text: "• Performed audit analytics, verified spreadsheet data formulas, and compiled financial reporting graphs.", x: 50, y: 415, width: 694 },
    { id: "ow_skills_h", type: "heading", text: "CORE EXPERTISE", x: 50, y: 480, width: 320, textColor: "#18181b" },
    { id: "ow_skills_b", type: "paragraph", text: "• Financial Forecasting\n• Risk Assessment & Modeling\n• SQL Database Analytics\n• Corporate Tax compliance\n• Excel Macro VBA automations", x: 50, y: 510, width: 320 },
    { id: "ow_edu_h", type: "heading", text: "EDUCATION HISTORY", x: 420, y: 480, width: 320, textColor: "#18181b" },
    { id: "ow_edu_b", type: "paragraph", text: "M.Sc. in Quantitative Finance\nLondon School of Economics | Class of 2018\n\nB.Sc. in Financial Mathematics\nUniversity of Manchester | Class of 2015", x: 420, y: 510, width: 320 }
  ],
  "liam-carter": [
    { id: "lc_bg", type: "shape", x: 0, y: 0, width: 794, height: 1120, color: "bg-[#0f172a]" },
    { id: "lc_pic", type: "avatar", x: 600, y: 50, width: 130, height: 130 },
    { id: "lc_name", type: "title", text: "LIAM CARTER", x: 60, y: 60, width: 500, textColor: "#ffffff" },
    { id: "lc_title", type: "subtitle", text: "SENIOR FULL-STACK DEVELOPER", x: 60, y: 105, width: 500, textColor: "#22d3ee" },
    { id: "lc_contacts", type: "paragraph", text: "✉ liam.dev@carter.io  •  📞 +1-555-8888  •  🌐 github.com/liamcarter", x: 60, y: 130, width: 500, textColor: "#94a3b8" },
    { id: "lc_proj_h", type: "heading", text: "FEATURED SOFTWARE PROJECTS", x: 60, y: 220, width: 440, textColor: "#22d3ee" },
    { id: "lc_proj1_h", type: "subheading", text: "1. CloudScale Dashboard (Next.js & Go)", x: 60, y: 250, width: 440, textColor: "#ffffff" },
    { id: "lc_proj1_b", type: "paragraph", text: "Architected a real-time cluster telemetry dashboard scaling to 10k messages per second. Implemented optimized WebSockets updates reducing latency by 40%.", x: 60, y: 275, width: 440, textColor: "#cbd5e1" },
    { id: "lc_proj2_h", type: "subheading", text: "2. FastORM Engine (Rust Crate)", x: 60, y: 350, width: 440, textColor: "#ffffff" },
    { id: "lc_proj2_b", type: "paragraph", text: "Developed an asynchronous object-relational mapper for PostgreSQL in Rust, reaching 1.2 million downloads. Reduced runtime query allocations down to zero.", x: 60, y: 375, width: 440, textColor: "#cbd5e1" },
    { id: "lc_skills_h", type: "heading", text: "TECH SKILLS", x: 530, y: 220, width: 200, textColor: "#22d3ee" },
    { id: "lc_skills_b", type: "paragraph", text: "• React / Next.js\n• Node.js / Express\n• Rust / Go Systems\n• PostgreSQL / Redis\n• Docker / Kubernetes\n• AWS Cloud Architect\n• GitHub Actions CI/CD", x: 530, y: 250, width: 200, textColor: "#cbd5e1" },
    { id: "lc_exp_h", type: "heading", text: "PROFESSIONAL CAREER HISTORY", x: 60, y: 480, width: 670, textColor: "#22d3ee" },
    { id: "lc_job1_h", type: "subheading", text: "Lead Engineer — TechCorp Solutions, Bangalore (2022 - Present)", x: 60, y: 510, width: 670, textColor: "#ffffff" },
    { id: "lc_job1_b", type: "paragraph", text: "• Leading a team of 6 engineers developing microservice APIs serving 500k monthly active users.\n• Redesigned DB indexes in Postgres, achieving a 30% reduction in query load overhead.", x: 60, y: 530, width: 670, textColor: "#cbd5e1" },
    { id: "lc_job2_h", type: "subheading", text: "Full Stack Developer — Delta Systems (2019 - 2022)", x: 60, y: 600, width: 670, textColor: "#ffffff" },
    { id: "lc_job2_b", type: "paragraph", text: "• Managed the front-end redesign using React 18, enhancing user retention metrics by 12%.", x: 60, y: 620, width: 670, textColor: "#cbd5e1" }
  ],
  "sofia-flores": [
    { id: "sf_bg", type: "shape", x: 0, y: 0, width: 794, height: 1120, color: "bg-[#faf0e6]" },
    { id: "sf_stripe", type: "shape", x: 0, y: 0, width: 250, height: 1120, color: "bg-[#e8f0e8]" },
    { id: "sf_pic", type: "avatar", x: 55, y: 60, width: 140, height: 140 },
    { id: "sf_name", type: "title", text: "SOFIA FLORES", x: 280, y: 60, width: 460, textColor: "#2e5a44" },
    { id: "sf_title", type: "subtitle", text: "LEAD ILLUSTRATOR & GRAPHIC DESIGNER", x: 280, y: 105, width: 460, textColor: "#556b2f" },
    { id: "sf_contact_h", type: "heading", text: "CONNECT", x: 25, y: 240, width: 200, textColor: "#2e5a44" },
    { id: "sf_contact_b", type: "paragraph", text: "✉ hello@sofiaflores.com\n📞 +91 99000 88888\n📍 Bangalore, India\n🎨 behance.net/sofiaf", x: 25, y: 265, width: 200, textColor: "#2e5a44" },
    { id: "sf_skills_h", type: "heading", text: "DESIGN TOOLS", x: 25, y: 400, width: 200, textColor: "#2e5a44" },
    { id: "sf_skills_b", type: "paragraph", text: "• Digital Illustration\n• Vector Art (Illustrator)\n• Matte Painting (Photoshop)\n• Procreate Drawing\n• Editorial Book Layouts\n• Branding & Packages", x: 25, y: 425, width: 200, textColor: "#2e5a44" },
    { id: "sf_prof_h", type: "heading", text: "CREATIVE PROFILE", x: 280, y: 180, width: 460, textColor: "#2e5a44" },
    { id: "sf_prof_b", type: "paragraph", text: "Passionate and versatile illustrator with 5+ years of experience publishing children's books, digital editorials, and brand identity packages. Expert in building soft, curated color palettes that convey stories beautifully.", x: 280, y: 205, width: 460 },
    { id: "sf_exp_h", type: "heading", text: "RELEVANT CAREER", x: 280, y: 310, width: 460, textColor: "#2e5a44" },
    { id: "sf_job1_h", type: "subheading", text: "Lead Book Illustrator — Tulika Publishers (2022 - Present)", x: 280, y: 335, width: 460, textColor: "#556b2f" },
    { id: "sf_job1_b", type: "paragraph", text: "• Illustrated 6 children's storybooks, coordinating cover graphics, character palettes, and printer CMYK templates.\n• Designed viral digital posters for literary book fairs.", x: 280, y: 360, width: 460 },
    { id: "sf_job2_h", type: "subheading", text: "Freelance Designer — Sofia Flores Studio (2019 - 2022)", x: 280, y: 440, width: 460, textColor: "#556b2f" },
    { id: "sf_job2_b", type: "paragraph", text: "• Formulated corporate logos and brand kits for 12 localized startup businesses, focusing on organic cosmetics and coffee brands.", x: 280, y: 465, width: 460 }
  ],
  "marcus-chen": [
    { id: "mc_bg", type: "shape", x: 0, y: 0, width: 794, height: 1120, color: "bg-[#fcfbf9]" },
    { id: "mc_stripe", type: "shape", x: 0, y: 0, width: 794, height: 12, color: "bg-[#c5a880]" },
    { id: "mc_name", type: "title", text: "MARCUS CHEN, PHD", x: 50, y: 40, width: 694, textColor: "#1f2937" },
    { id: "mc_title", type: "subtitle", text: "PROFESSOR OF DATA SCIENCE & MACHINE LEARNING", x: 50, y: 85, width: 694, textColor: "#c5a880" },
    { id: "mc_contacts", type: "paragraph", text: "✉ marcus.chen@university.edu  •  📞 +91 98888 77777  •  📍 Bangalore, India", x: 50, y: 110, width: 694 },
    { id: "mc_res_h", type: "heading", text: "RESEARCH FOCUS SUMMARY", x: 50, y: 160, width: 440, textColor: "#1f2937" },
    { id: "mc_res_b", type: "paragraph", text: "Dr. Chen conducts research at the intersection of deep neural networks, large language model alignment, and distributed database clustering. Published 20+ papers in high-impact journals.", x: 50, y: 185, width: 440 },
    { id: "mc_edu_h", type: "heading", text: "ACADEMIC BACKGROUND", x: 520, y: 160, width: 220, textColor: "#1f2937" },
    { id: "mc_edu_b", type: "paragraph", text: "• Ph.D. in Computer Science\n  Stanford University (2018)\n• M.Tech in Data Science\n  IISc Bangalore (2015)\n• B.Tech in CSE\n  IIT Bombay (2013)", x: 520, y: 185, width: 220 },
    { id: "mc_pub_h", type: "heading", text: "REPRESENTATIVE PUBLICATIONS", x: 50, y: 320, width: 690, textColor: "#1f2937" },
    { id: "mc_pub1_h", type: "subheading", text: "1. Scaling Parameters in Neural Transformers (IEEE 2024)", x: 50, y: 345, width: 690 },
    { id: "mc_pub1_b", type: "paragraph", text: "Marcus Chen & Allison Cooper. Evaluated tokenization bottlenecks across parameters ranging from 1B to 70B, showcasing a 12% memory overhead optimization.", x: 50, y: 365, width: 690 },
    { id: "mc_pub2_h", type: "subheading", text: "2. Distributed Storage in LLM Pipelines (ACM 2022)", x: 50, y: 440, width: 690 },
    { id: "mc_pub2_b", type: "paragraph", text: "Marcus Chen, Dev Sharma, & Sarah Jenkins. Formulated a parallel tensor loading protocol reducing file serialization latency down to 2ms.", x: 50, y: 460, width: 690 }
  ],
  "emily-watson": [
    { id: "ew_sidebar", type: "shape", x: 0, y: 0, width: 240, height: 1120, color: "bg-[#1e2530]" },
    { id: "ew_pic", type: "avatar", x: 170, y: 50, width: 140, height: 140 },
    { id: "ew_name", type: "title", text: "EMILY WATSON", x: 340, y: 60, width: 400, textColor: "#1e2530" },
    { id: "ew_title", type: "subtitle", text: "CHIEF OPERATIONS DIRECTOR", x: 340, y: 105, width: 400, textColor: "#4f46e5" },
    { id: "ew_l_contact_t", type: "heading", text: "CONNECT", x: 20, y: 220, width: 200, textColor: "#ffffff" },
    { id: "ew_l_contact_b", type: "paragraph", text: "✉ emily@watsonops.com\n📞 +123-555-7777\n📍 New York, USA\n🌐 linkedin.com/in/emilyops", x: 20, y: 245, width: 200, textColor: "#ffffff" },
    { id: "ew_l_skills_t", type: "heading", text: "COMPETENCIES", x: 20, y: 390, width: 200, textColor: "#ffffff" },
    { id: "ew_l_skills_b", type: "paragraph", text: "• Executive Leadership\n• Supply Chain Strategy\n• Resource Allocation\n• Agile Scrum Ops\n• Cross-team Synergies\n• Budget Optimization", x: 20, y: 415, width: 200, textColor: "#ffffff" },
    { id: "ew_r_prof_t", type: "heading", text: "EXECUTIVE SUMMARY", x: 270, y: 220, width: 470, textColor: "#1e2530" },
    { id: "ew_r_prof_b", type: "paragraph", text: "High-performing Operations Director with 10+ years of leadership optimizing enterprise logistics, streamlining SaaS product deployments, and managing $2M+ operating budgets.", x: 270, y: 245, width: 470 },
    { id: "ew_r_exp_t", type: "heading", text: "CAREER TIMELINE", x: 270, y: 350, width: 470, textColor: "#1e2530" },
    { id: "ew_r_job1_h", type: "subheading", text: "Operations Director — Vanguard Solutions (2021 - Present)", x: 270, y: 375, width: 470 },
    { id: "ew_r_job1_b", type: "paragraph", text: "• Supervised global supply lines spanning 4 hubs, slashing delivery overhead cost metrics by 18%.\n• Implemented automated resource dispatch platforms scaling cross-team product delivery speed.", x: 270, y: 400, width: 470 },
    { id: "ew_r_job2_h", type: "subheading", text: "Operations Manager — Delta Commerce Ltd (2015 - 2021)", x: 270, y: 480, width: 470 },
    { id: "ew_r_job2_b", type: "paragraph", text: "• Streamlined warehouse inventories and managed logistics audits, reducing errors down to zero.", x: 270, y: 505, width: 470 }
  ],
  "blank-canvas": [
    { id: "b1", type: "title", text: "YOUR NAME", x: 50, y: 50, width: 694 },
    { id: "b2", type: "subtitle", text: "Your Target Job Profession / Subtitle", x: 50, y: 95, width: 694 },
    { id: "b3", type: "paragraph", text: "Phone Number  •  Email Address  •  City, Country", x: 50, y: 120, width: 694 }
  ]
};

export default function CanvasEditor() {
  const navigate = useNavigate();
  const templateId = localStorage.getItem("selectedTemplateId") || "richard-sanchez";
  
  // Storage key isolated by user account
  const username = localStorage.getItem("username") || "Guest";
  const storageKey = `editorResumeData_${username}`;

  // Load initial blocks from localStorage
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.blocks || [];
      } catch {
        // Fallback
      }
    }
    return DEFAULT_PRESETS[templateId] || DEFAULT_PRESETS["blank-canvas"];
  });

  // Editor states
  const [fontFamily, setFontFamily] = useState("sans");
  const [pagePadding, setPagePadding] = useState("0px"); // Using 0px for precise absolute boundary mapping
  const [accentColor, setAccentColor] = useState("indigo");
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  
  // Image crop active block ID
  const [croppingAvatarId, setCroppingAvatarId] = useState(null);

  // Undo engine stacks
  const [undoStack, setUndoStack] = useState([]);
  const [isSavedVisual, setIsSavedVisual] = useState(false);

  // Sync blocks back to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ isFreestyle: true, blocks }));
  }, [blocks, storageKey]);

  // Global Keyboard listener for Ctrl+Z
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        setUndoStack((prev) => {
          if (prev.length === 0) return prev;
          const nextStack = [...prev];
          const previousStateStr = nextStack.pop();
          try {
            const previousBlocks = JSON.parse(previousStateStr);
            setBlocks(previousBlocks);
          } catch (err) {
            console.error(err);
          }
          return nextStack;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Snapshot pushes
  const pushToUndoStack = (currentBlocks) => {
    setUndoStack((prev) => {
      const newStack = [...prev, JSON.stringify(currentBlocks)];
      if (newStack.length > 50) newStack.shift();
      return newStack;
    });
  };

  // Handler helpers
  const handleBlockTextChange = (id, newText) => {
    // Only capture history if text actually changed
    const target = blocks.find(b => b.id === id);
    if (target && target.text !== newText) {
      pushToUndoStack(blocks);
      setBlocks((prevBlocks) =>
        prevBlocks.map((b) => (b.id === id ? { ...b, text: newText } : b))
      );
    }
  };

  const addBlock = (type) => {
    pushToUndoStack(blocks);
    let defaultText = "Click to edit text...";
    let w = 500;
    if (type === "title") { defaultText = "YOUR NAME"; w = 694; }
    else if (type === "subtitle") { defaultText = "Job Title / Profession"; w = 694; }
    else if (type === "heading") { defaultText = "Section Title"; w = 694; }
    else if (type === "subheading") { defaultText = "Institution / Job Role"; w = 694; }

    const newBlock = {
      id: `fb-${Date.now()}`,
      type,
      text: defaultText,
      x: 50,
      y: blocks.length > 0 ? Math.max(...blocks.map((b) => b.y || 0)) + 50 : 50,
      width: w,
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const addShapeBlock = () => {
    pushToUndoStack(blocks);
    const newBlock = {
      id: `fb-shape-${Date.now()}`,
      type: "shape",
      text: "",
      x: 50,
      y: blocks.length > 0 ? Math.max(...blocks.map((b) => b.y || 0)) + 50 : 50,
      width: 200,
      height: 150,
      color: "bg-slate-200/50", // Soft grey default
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const addAvatarBlock = () => {
    pushToUndoStack(blocks);
    const newBlock = {
      id: `fb-avatar-${Date.now()}`,
      type: "avatar",
      text: "",
      x: 80,
      y: blocks.length > 0 ? Math.max(...blocks.map((b) => b.y || 0)) + 50 : 50,
      width: 100,
      height: 100,
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (id) => {
    pushToUndoStack(blocks);
    setBlocks((prevBlocks) => prevBlocks.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
    if (croppingAvatarId === id) setCroppingAvatarId(null);
  };

  const getAccentHex = (color) => {
    switch (color) {
      case "indigo": return "#4f46e5";
      case "crimson": return "#dc2626";
      case "emerald": return "#059669";
      case "charcoal": return "#27272a";
      default: return "#4f46e5";
    }
  };

  // Window-Level Mouse Dragging (Canva Style)
  const handleBlockMouseDown = (e, block) => {
    // If they clicked on delete, resize handle, or upload overlay, don't drag
    if (e.target.closest(".no-drag-trigger")) return;

    // Check if they are already editing this text. If so, let them highlight text naturally.
    const editableElement = e.currentTarget.querySelector("[contenteditable='true']");
    if (editableElement && document.activeElement === editableElement) {
      return;
    }

    // Capture state for undo before starting drag
    pushToUndoStack(blocks);

    // IF AVATAR CROPPING IS ACTIVE: Drag pans the image *inside* the circle
    if (croppingAvatarId === block.id) {
      e.preventDefault();
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const initialImgX = block.imgX || 0;
      const initialImgY = block.imgY || 0;

      const onWindowMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        const currentScale = block.imgScale || 1.2;
        const blockW = block.width || 100;
        
        // Large boundaries to ensure users can center high aspect ratio photos freely
        // and avoid cutting off the top of heads/shoulders.
        const maxOffsetX = Math.max(100, blockW * currentScale * 1.5);
        const maxOffsetY = Math.max(150, blockW * currentScale * 2.2);

        setBlocks((prevBlocks) =>
          prevBlocks.map((b) =>
            b.id === block.id
              ? {
                  ...b,
                  imgX: Math.min(maxOffsetX, Math.max(-maxOffsetX, initialImgX + dx)),
                  imgY: Math.min(maxOffsetY, Math.max(-maxOffsetY, initialImgY + dy)),
                }
              : b
          )
        );
      };

      const onWindowMouseUp = () => {
        window.removeEventListener("mousemove", onWindowMouseMove);
        window.removeEventListener("mouseup", onWindowMouseUp);
      };

      window.addEventListener("mousemove", onWindowMouseMove);
      window.addEventListener("mouseup", onWindowMouseUp);
      return;
    }

    // Otherwise: Standard Block Dragging on Page coordinates
    e.preventDefault();
    e.stopPropagation();

    setSelectedBlockId(block.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialBlockX = block.x || 50;
    const initialBlockY = block.y || 50;
    let hasDragged = false;

    const onWindowMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      // Start drag threshold of 3 pixels
      if (!hasDragged && Math.sqrt(dx * dx + dy * dy) > 3) {
        hasDragged = true;
      }

      if (hasDragged) {
        setBlocks((prevBlocks) =>
          prevBlocks.map((b) =>
            b.id === block.id
              ? {
                  ...b,
                  x: Math.max(0, initialBlockX + dx),
                  y: Math.max(0, initialBlockY + dy),
                }
              : b
          )
        );
      }
    };

    const onWindowMouseUp = () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
  };

  // Window-Level Horizontal Width Resizing
  const handleResizeMouseDown = (e, block) => {
    e.stopPropagation();
    e.preventDefault();

    pushToUndoStack(blocks);

    const startX = e.clientX;
    const initialWidth = block.width || 694;

    const onWindowMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      setBlocks((prevBlocks) =>
        prevBlocks.map((b) =>
          b.id === block.id
            ? {
                ...b,
                width: Math.max(20, initialWidth + dx),
                height: b.type === "avatar" ? Math.max(20, initialWidth + dx) : b.height, // Keep avatar square
              }
            : b
        )
      );
    };

    const onWindowMouseUp = () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
  };

  // Window-Level Vertical Height Resizing (Shapes only)
  const handleHeightResizeMouseDown = (e, block) => {
    e.stopPropagation();
    e.preventDefault();

    pushToUndoStack(blocks);

    const startY = e.clientY;
    const initialHeight = block.height || 150;

    const onWindowMouseMove = (moveEvent) => {
      const dy = moveEvent.clientY - startY;
      setBlocks((prevBlocks) =>
        prevBlocks.map((b) =>
          b.id === block.id
            ? {
                ...b,
                height: Math.max(20, initialHeight + dy),
              }
            : b
        )
      );
    };

    const onWindowMouseUp = () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
  };

  // Double-Click Handler (Canva style: text focus vs photo crop mode)
  const handleBlockDoubleClick = (e, block) => {
    e.stopPropagation();
    e.preventDefault();

    if (block.type === "avatar") {
      // Toggle Image Crop Mode on double-click
      if (block.image) {
        setCroppingAvatarId(block.id);
      }
      return;
    }

    const editable = e.currentTarget.querySelector("[contenteditable='true']");
    if (editable) {
      editable.focus();

      // Highlight all text in editable container for rapid editing
      const range = document.createRange();
      range.selectNodeContents(editable);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const handleCanvasClick = () => {
    setSelectedBlockId(null);
  };

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen flex flex-col transition-colors duration-200">
      
      {/* ACTION TOPBAR */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 px-6 flex items-center justify-between z-10 no-print select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/templates")}
            className="p-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition duration-150"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="font-extrabold text-sm text-zinc-800 dark:text-zinc-205">Resume Canvas Editor</h1>
            <p className="text-[10px] text-zinc-500 capitalize">Active Theme: {templateId.replace("-", " ")}</p>
          </div>
        </div>

        {/* HEADER CONTROLS (Undo, Reset, Save, Download) */}
        <div className="flex items-center gap-2">
          
          {/* Undo Action (Ctrl + Z) */}
          <button
            onClick={() => {
              setUndoStack((prev) => {
                if (prev.length === 0) return prev;
                const nextStack = [...prev];
                const previousStateStr = nextStack.pop();
                try {
                  const previousBlocks = JSON.parse(previousStateStr);
                  setBlocks(previousBlocks);
                } catch {}
                return nextStack;
              });
            }}
            disabled={undoStack.length === 0}
            className={`px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5 ${
              undoStack.length === 0
                ? "opacity-40 cursor-not-allowed bg-zinc-50 dark:bg-zinc-900/50"
                : "bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-205"
            }`}
            title="Undo last action (Ctrl + Z)"
          >
            Undo ({undoStack.length})
          </button>

          {/* Reset Template Action */}
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset this canvas? This will clear all custom edits and uploaded photos to restore defaults and free browser storage space.")) {
                pushToUndoStack(blocks);
                const originalBlocks = DEFAULT_PRESETS[templateId] || DEFAULT_PRESETS["blank-canvas"];
                setBlocks(originalBlocks);
                setCroppingAvatarId(null);
                setSelectedBlockId(null);
              }
            }}
            className="px-3 py-2 border border-red-200 dark:border-red-900/30 bg-red-50/10 hover:bg-red-50/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
            title="Reset template structure to factory settings"
          >
            Reset Layout
          </button>

          {/* Save Action */}
          <button
            onClick={() => {
              localStorage.setItem(storageKey, JSON.stringify({ isFreestyle: true, blocks }));
              setIsSavedVisual(true);
              setTimeout(() => setIsSavedVisual(false), 2000);
            }}
            className="px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-850 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5 text-zinc-800 dark:text-zinc-205"
            title="Save your canvas blocks to browser state"
          >
            {isSavedVisual ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle size={13} className="animate-bounce" />
                Saved!
              </span>
            ) : (
              "Save Canvas"
            )}
          </button>

          {/* PDF Download */}
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition duration-150 flex items-center gap-1.5"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </header>

      {/* CANVAS EDITOR SPLIT PANE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL - EDIT CONTROLS */}
        <aside className="w-full md:w-[360px] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 overflow-y-auto p-6 space-y-6 no-print">
          <div className="space-y-6">
            
            {/* CANVAS TEXT BOXES */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Text & Elements Tools
              </h3>
              <div className="bg-zinc-50 dark:bg-zinc-900/30 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                <p className="text-[10px] text-zinc-500 leading-relaxed mb-2">
                  Click below to add blank elements to the canvas page, then drag, resize, and edit them.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addBlock("title")}
                    className="py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl text-[10px] font-bold transition"
                  >
                    Add Title Block
                  </button>
                  <button
                    onClick={() => addBlock("subtitle")}
                    className="py-2 border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 rounded-xl text-[10px] font-bold text-zinc-800 dark:text-zinc-300 transition"
                  >
                    Add Subheading
                  </button>
                  <button
                    onClick={() => addBlock("heading")}
                    className="py-2 border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 rounded-xl text-[10px] font-bold text-zinc-800 dark:text-zinc-300 transition"
                  >
                    Add Section Title
                  </button>
                  <button
                    onClick={() => addBlock("paragraph")}
                    className="py-2 border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 rounded-xl text-[10px] font-bold text-zinc-800 dark:text-zinc-300 transition"
                  >
                    Add Body Text
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-zinc-200/55 dark:border-zinc-800">
                  <button
                    onClick={addShapeBlock}
                    className="py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 rounded-xl text-[10px] font-bold transition"
                  >
                    Add Background Block
                  </button>
                  <button
                    onClick={addAvatarBlock}
                    className="py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 rounded-xl text-[10px] font-bold transition"
                  >
                    Add Profile Circle
                  </button>
                </div>
              </div>
            </div>

            {/* SELECTED TEXT CUSTOMIZER */}
            {selectedBlockId && ["title", "subtitle", "heading", "subheading", "paragraph"].includes(blocks.find((b) => b.id === selectedBlockId)?.type) && (
              <div className="space-y-4 pt-4 border-t border-zinc-150 dark:border-zinc-850">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Selected Text Settings
                </h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    Text Color
                  </label>
                  <div className="flex gap-2">
                    {[
                      { name: "Black", code: "#18181b" },
                      { name: "White", code: "#ffffff" },
                      { name: "Gray", code: "#71717a" },
                      { name: "Indigo", code: "#4f46e5" },
                      { name: "Crimson", code: "#dc2626" },
                      { name: "Emerald", code: "#059669" }
                    ].map((colOption) => (
                      <button
                        key={colOption.code}
                        onClick={() => {
                          pushToUndoStack(blocks);
                          setBlocks((prevBlocks) =>
                            prevBlocks.map((b) =>
                              b.id === selectedBlockId ? { ...b, textColor: colOption.code } : b
                            )
                          );
                        }}
                        className={`w-6 h-6 rounded border transition ${
                          (blocks.find((b) => b.id === selectedBlockId)?.textColor || "#18181b") === colOption.code
                            ? "border-zinc-800 dark:border-white scale-110"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: colOption.code }}
                        title={colOption.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SELECTED SHAPE CUSTOMIZER */}
            {selectedBlockId && blocks.find((b) => b.id === selectedBlockId)?.type === "shape" && (
              <div className="space-y-4 pt-4 border-t border-zinc-150 dark:border-zinc-850">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Selected Shape Settings
                </h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    Background Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Dark Slate", class: "bg-[#2f3542]" },
                      { name: "Light Slate", class: "bg-[#f1f2f6]" },
                      { name: "Slate Light", class: "bg-slate-200/50" },
                      { name: "Indigo Light", class: "bg-indigo-200/40" },
                      { name: "Emerald Light", class: "bg-emerald-200/40" },
                      { name: "Amber Light", class: "bg-amber-200/40" },
                      { name: "Charcoal Light", class: "bg-zinc-200/50" }
                    ].map((colOption) => (
                      <button
                        key={colOption.class}
                        onClick={() => {
                          pushToUndoStack(blocks);
                          setBlocks((prevBlocks) =>
                            prevBlocks.map((b) =>
                              b.id === selectedBlockId ? { ...b, color: colOption.class } : b
                            )
                          );
                        }}
                        className={`w-6 h-6 rounded border transition ${
                          blocks.find((b) => b.id === selectedBlockId)?.color === colOption.class
                            ? "border-zinc-800 dark:border-white scale-110"
                            : "border-transparent"
                        } ${colOption.class}`}
                        title={colOption.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DESIGN SETTINGS */}
            <div className="space-y-4 pt-4 border-t border-zinc-150 dark:border-zinc-850">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Canvas Layout Customizer
              </h3>
              
              {/* Font Family Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Typography (Font)
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs focus:outline-none focus:border-indigo-600 transition"
                >
                  <option value="sans">Inter (Modern Sans-Serif)</option>
                  <option value="serif">Georgia (Classic Serif)</option>
                  <option value="mono">Courier Prime (Technical Monospace)</option>
                </select>
              </div>

              {/* Accent Color picker */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Accent Color
                </label>
                <div className="flex gap-3">
                  {["indigo", "crimson", "emerald", "charcoal"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition ${
                        accentColor === color ? "border-zinc-800 dark:border-white scale-110 shadow-sm" : "border-transparent"
                      }`}
                      style={{ backgroundColor: getAccentHex(color) }}
                    />
                  ))}
                </div>
              </div>

              {/* Page Margins */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Page Spacing (Margins)
                </label>
                <select
                  value={pagePadding}
                  onChange={(e) => setPagePadding(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs focus:outline-none focus:border-indigo-600 transition"
                >
                  <option value="0px">None (Precise Absolute)</option>
                  <option value="15mm">15mm (Compact Padding)</option>
                  <option value="20mm">20mm (Normal Padding)</option>
                </select>
              </div>

            </div>

            {/* GUIDELINES */}
            <div className="bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-150 dark:border-indigo-900/30 p-4 rounded-2xl mt-4 font-sans text-xs">
              <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                <CheckCircle size={14} />
                Freestyle Guide
              </h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed space-y-1">
                • **Click-and-Hold** anywhere on a block to drag and move it.<br />
                • **Double Click** text to edit; **Double Click** photo avatar to pan/zoom.<br />
                • Drag **right border** to resize width; drag **bottom border** to resize shape height.<br />
                • **Ctrl + Z** to Undo. **Reset Layout** clears images and frees storage.
              </p>
            </div>

          </div>
        </aside>

        {/* RIGHT PANEL - LIVE DOCUMENT PREVIEW */}
        <main className="flex-1 overflow-y-auto p-8 flex justify-center bg-zinc-100/50 dark:bg-zinc-900/20 pt-10 select-text print-layout-adjust">
          
          {/* A4 PAPER SHEET */}
          <div
            className="printable-cv w-[210mm] min-h-[297mm] bg-white text-black shadow-lg border border-zinc-200/50 print:border-none print:shadow-none print:p-0 flex flex-col relative overflow-hidden"
            style={{
              padding: pagePadding,
            }}
            onClick={handleCanvasClick}
          >
            <div
              className="flex-1 relative"
              style={{
                fontFamily: fontFamily === "serif" ? "Georgia, serif" :
                            fontFamily === "mono" ? "Courier New, monospace" :
                            "Inter, sans-serif",
              }}
            >
              {blocks.map((block) => {
                const isShape = block.type === "shape";
                const isAvatar = block.type === "avatar";
                const isSelected = selectedBlockId === block.id;
                const isCropping = croppingAvatarId === block.id;

                if (isShape) {
                  return (
                    <div
                      key={block.id}
                      onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }}
                      onMouseDown={(e) => handleBlockMouseDown(e, block)}
                      onDoubleClick={(e) => handleBlockDoubleClick(e, block)}
                      className={`absolute group/block border ${
                        isSelected ? "border-indigo-500" : "border-transparent hover:border-zinc-350"
                      } rounded transition-all duration-100 cursor-move`}
                      style={{
                        left: `${block.x || 0}px`,
                        top: `${block.y || 0}px`,
                        width: `${block.width || 200}px`,
                        height: `${block.height || 150}px`,
                        zIndex: 0,
                      }}
                    >
                      {/* Delete button - no-print */}
                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="absolute -top-3.5 right-1.5 bg-red-600 text-white rounded p-0.5 shadow-sm opacity-0 group-hover/block:opacity-100 transition hover:bg-red-700 no-print no-drag-trigger z-20 flex items-center justify-center"
                        title="Delete shape"
                      >
                        <Trash2 size={10} />
                      </button>

                      {/* Vertical Resize Handle (bottom edge) - no-print */}
                      <div
                        onMouseDown={(e) => {
                          handleHeightResizeMouseDown(e, block);
                        }}
                        className="absolute left-0 right-0 bottom-0 h-1.5 hover:h-2 bg-indigo-500/0 hover:bg-indigo-500/50 cursor-row-resize opacity-0 group-hover/block:opacity-100 transition no-print no-drag-trigger z-20"
                        title="Drag to resize height"
                      />

                      {/* Horizontal Resize Handle (right edge) - no-print */}
                      <div
                        onMouseDown={(e) => {
                          handleResizeMouseDown(e, block);
                        }}
                        className="absolute right-0 top-0 bottom-0 w-1.5 hover:w-2 bg-indigo-500/0 hover:bg-indigo-500/50 cursor-col-resize opacity-0 group-hover/block:opacity-100 transition no-print no-drag-trigger z-20"
                        title="Drag to resize width"
                      />

                      {/* Colored Background Shape */}
                      <div
                        className={`w-full h-full rounded-2xl ${block.color || "bg-zinc-150"}`}
                        style={{
                          backgroundColor: block.color && !block.color.startsWith("bg-") ? block.color : undefined,
                        }}
                      />
                    </div>
                  );
                }

                if (isAvatar) {
                  return (
                    <div
                      key={block.id}
                      onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }}
                      onMouseDown={(e) => handleBlockMouseDown(e, block)}
                      onDoubleClick={(e) => handleBlockDoubleClick(e, block)}
                      className={`absolute group/block border ${
                        isSelected || isCropping ? "border-indigo-500" : "border-transparent hover:border-zinc-350"
                      } rounded transition-all duration-100 cursor-move`}
                      style={{
                        left: `${block.x || 50}px`,
                        top: `${block.y || 50}px`,
                        width: `${block.width || 100}px`,
                        height: `${block.width || 100}px`,
                        zIndex: 10,
                      }}
                    >
                      {/* Delete button - no-print */}
                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="absolute -top-3.5 right-1.5 bg-red-650 text-white rounded p-0.5 shadow-sm opacity-0 group-hover/block:opacity-100 transition hover:bg-red-700 no-print no-drag-trigger z-20 flex items-center justify-center"
                        title="Delete avatar"
                      >
                        <Trash2 size={10} />
                      </button>

                      {/* Proportional Resize Handle - no-print */}
                      <div
                        onMouseDown={(e) => {
                          handleResizeMouseDown(e, block);
                        }}
                        className="absolute right-0 bottom-0 w-3.5 h-3.5 bg-indigo-600 rounded-full border border-white opacity-0 group-hover/block:opacity-100 transition cursor-se-resize no-print no-drag-trigger z-20"
                        title="Drag to resize size"
                      />

                      {/* Hidden Image Input Dialog - no-drag-trigger */}
                      <input
                        type="file"
                        id={`avatar-upload-${block.id}`}
                        accept="image/*"
                        className="hidden no-drag-trigger"
                        onChange={(uploadEvent) => {
                          const file = uploadEvent.target.files?.[0];
                          if (file) {
                            pushToUndoStack(blocks);
                            const reader = new FileReader();
                            reader.onload = (readerEvent) => {
                              // Perform client-side HTML canvas compression to downscale the image size
                              // from several Megabytes to ~15 Kilobytes (O(1) memory complexity optimization).
                              const tempImg = new Image();
                              tempImg.onload = () => {
                                const canvas = document.createElement("canvas");
                                const ctx = canvas.getContext("2d");
                                const MAX_W = 300;
                                const MAX_H = 300;
                                let w = tempImg.width;
                                let h = tempImg.height;
                                if (w > h) {
                                  if (w > MAX_W) {
                                    h *= MAX_W / w;
                                    w = MAX_W;
                                  }
                                } else {
                                  if (h > MAX_H) {
                                    w *= MAX_H / h;
                                    h = MAX_H;
                                  }
                                }
                                canvas.width = w;
                                canvas.height = h;
                                ctx.drawImage(tempImg, 0, 0, w, h);
                                const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                                
                                setBlocks((prevBlocks) =>
                                  prevBlocks.map((b) =>
                                    b.id === block.id ? { ...b, image: compressedBase64, imgScale: 1.2, imgX: 0, imgY: 0 } : b
                                  )
                                );
                              };
                              tempImg.src = readerEvent.target.result;
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />

                      {/* Hover action overlay (only shown when not cropping) - no-print, no-drag-trigger */}
                      {!isCropping && (
                        <label
                          htmlFor={`avatar-upload-${block.id}`}
                          className="absolute inset-0 rounded-full bg-black/40 text-white text-[9px] font-bold flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover/block:opacity-100 transition no-print no-drag-trigger z-15 text-center px-1"
                        >
                          <span>{block.image ? "Change Photo" : "Upload Photo"}</span>
                          {block.image && <span className="text-[7px] text-zinc-300 font-normal mt-0.5">(Double Click to Crop)</span>}
                        </label>
                      )}

                      {/* FLOATING ZOOM CONTROL WIDGET OVERLAY (Only when cropping) - no-print, no-drag-trigger */}
                      {isCropping && (
                        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl shadow-lg flex items-center gap-2 z-30 no-print w-64 no-drag-trigger">
                          <span className="text-[9px] font-bold text-zinc-500">Zoom:</span>
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={block.imgScale || 1.2}
                            className="flex-1 accent-indigo-650 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer no-drag-trigger"
                            onMouseDown={() => pushToUndoStack(blocks)}
                            onChange={(sliderEvent) => {
                              const val = parseFloat(sliderEvent.target.value);
                              setBlocks((prevBlocks) =>
                                prevBlocks.map((b) =>
                                  b.id === block.id ? { ...b, imgScale: val } : b
                                )
                              );
                            }}
                          />
                          <button
                            onClick={(btnEvent) => {
                              btnEvent.stopPropagation();
                              setCroppingAvatarId(null);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-2 py-0.5 text-[9px] font-bold no-drag-trigger"
                          >
                            Done
                          </button>
                          <button
                            onClick={(btnEvent) => {
                              btnEvent.stopPropagation();
                              pushToUndoStack(blocks);
                              setBlocks((prevBlocks) =>
                                prevBlocks.map((b) =>
                                  b.id === block.id ? { ...b, image: null, imgScale: 1.2, imgX: 0, imgY: 0 } : b
                                )
                              );
                              setCroppingAvatarId(null);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-0.5 text-[9px] font-bold no-drag-trigger transition"
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      {/* Circle Frame using CSS background-image for smooth texture mapping (fixes browser object-cover pre-clipping) */}
                      <div className="w-full h-full rounded-full bg-zinc-200 border-4 border-white shadow overflow-hidden relative pointer-events-none">
                        {block.image ? (
                          <div
                            className="absolute inset-0 pointer-events-auto"
                            style={{
                              backgroundImage: `url(${block.image})`,
                              backgroundSize: `${(block.imgScale || 1.2) * 100}%`,
                              backgroundPosition: `calc(50% + ${block.imgX || 0}px) calc(50% + ${block.imgY || 0}px)`,
                              backgroundRepeat: "no-repeat",
                              cursor: isCropping ? "move" : "default",
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-1/2 h-1/2 text-zinc-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                // Regular Text Block (Z-Index: 10)
                return (
                  <div
                    key={block.id}
                    onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }}
                    onMouseDown={(e) => handleBlockMouseDown(e, block)}
                    onDoubleClick={(e) => handleBlockDoubleClick(e, block)}
                    className={`absolute group/block border ${
                      isSelected ? "border-indigo-500 bg-indigo-50/5" : "border-transparent hover:border-zinc-350 hover:bg-zinc-50/10"
                    } rounded transition-all duration-100 cursor-move`}
                    style={{
                      left: `${block.x || 50}px`,
                      top: `${block.y || 50}px`,
                      width: `${block.width || 694}px`,
                      zIndex: 10,
                    }}
                  >
                    {/* Floating Formatting Toolbar - no-print, no-drag-trigger */}
                    {isSelected && (
                      <div className="absolute -top-10 left-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-xl shadow-lg flex items-center gap-1.5 z-35 no-print no-drag-trigger text-zinc-855 dark:text-zinc-200">
                        <button
                          onMouseDown={(btnEvent) => {
                            btnEvent.preventDefault(); // Maintain text focus selection
                            document.execCommand("bold", false, null);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded font-bold text-xs w-6 h-6 flex items-center justify-center border border-zinc-150 dark:border-zinc-800 transition"
                          title="Bold (Ctrl + B)"
                        >
                          B
                        </button>
                        <button
                          onMouseDown={(btnEvent) => {
                            btnEvent.preventDefault();
                            document.execCommand("italic", false, null);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded italic text-xs w-6 h-6 flex items-center justify-center border border-zinc-150 dark:border-zinc-800 transition"
                          title="Italic (Ctrl + I)"
                        >
                          I
                        </button>
                        <button
                          onMouseDown={(btnEvent) => {
                            btnEvent.preventDefault();
                            document.execCommand("underline", false, null);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded underline text-xs w-6 h-6 flex items-center justify-center border border-zinc-150 dark:border-zinc-800 transition"
                          title="Underline (Ctrl + U)"
                        >
                          U
                        </button>
                        <button
                          onMouseDown={(btnEvent) => {
                            btnEvent.preventDefault();
                            document.execCommand("removeFormat", false, null);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-[9px] w-12 h-6 flex items-center justify-center border border-zinc-150 dark:border-zinc-800 font-semibold transition"
                          title="Clear Selection Formatting"
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    {/* Resize Handle - no-print */}
                    <div
                      onMouseDown={(e) => {
                        handleResizeMouseDown(e, block);
                      }}
                      className="absolute right-0 top-0 bottom-0 w-1.5 hover:w-2 bg-indigo-500/0 hover:bg-indigo-500/50 cursor-col-resize opacity-0 group-hover/block:opacity-100 transition no-print no-drag-trigger z-20"
                      title="Drag to resize width"
                    />

                    {/* Delete button - no-print */}
                    <button
                      onClick={() => deleteBlock(block.id)}
                      className="absolute -top-3.5 right-1.5 bg-red-650 text-white rounded p-0.5 shadow-sm opacity-0 group-hover/block:opacity-100 transition hover:bg-red-700 no-print no-drag-trigger z-20 flex items-center justify-center"
                      title="Delete block"
                    >
                      <Trash2 size={10} />
                    </button>
                    
                    <div
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleBlockTextChange(block.id, e.target.innerHTML)}
                      dangerouslySetInnerHTML={{ __html: block.text }}
                      className={`focus:outline-none rounded px-2.5 py-1 focus:cursor-text`}
                      style={{
                        fontFamily: fontFamily === "serif" ? "Georgia, serif" :
                                    fontFamily === "mono" ? "Courier New, monospace" :
                                    "Inter, sans-serif",
                        color: block.textColor || (block.type === "heading" ? getAccentHex(accentColor) : undefined),
                        borderColor: block.type === "heading" ? `${block.textColor || getAccentHex(accentColor)}40` : undefined,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
