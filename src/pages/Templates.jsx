import { useNavigate } from "react-router-dom";
import { User, Award, Layout, FilePlus, ChevronRight, Briefcase, Terminal, Palette, BookOpen, Layers } from "lucide-react";

export default function Templates() {
  const navigate = useNavigate();

  const presets = [
    {
      id: "richard-sanchez",
      name: "Richard Sanchez (Marketing)",
      description: "Predefined Canva replica with a dark slate header banner, a light grey left sidebar, a circular avatar silhouette, and two-column grids.",
      badge: "Canva Popular",
      icon: User,
      color: "from-slate-700 to-slate-900",
      data: {
        isFreestyle: true,
        blocks: [
          // BACKGROUND SHAPES
          { id: "rs_s1", type: "shape", x: 0, y: 0, width: 794, height: 160, color: "bg-[#2f3542]" }, // Dark Slate Banner
          { id: "rs_s2", type: "shape", x: 0, y: 160, width: 260, height: 960, color: "bg-[#f1f2f6]" }, // Light Grey Sidebar
          { id: "rs_s3", type: "avatar", x: 60, y: 100, width: 140, height: 140 }, // Profile circle

          // HEADER TEXTS
          { id: "rs_name", type: "title", text: "RICHARD SANCHEZ", x: 280, y: 50, width: 480, textColor: "#ffffff" },
          { id: "rs_title", type: "subtitle", text: "MARKETING MANAGER", x: 280, y: 95, width: 480, textColor: "#a4b0be" },

          // LEFT COLUMN DETAILS (x: 25, width: 210)
          { id: "rs_l_contact_t", type: "heading", text: "CONTACT", x: 25, y: 270, width: 210, textColor: "#2f3542" },
          { id: "rs_l_contact_b", type: "paragraph", text: "📞 +123-456-7890\n✉ hello@reallygreatsite.com\n📍 123 Anywhere St., Any City\n🌐 www.reallygreatsite.com", x: 25, y: 295, width: 210 },
          
          { id: "rs_l_skills_t", type: "heading", text: "SKILLS", x: 25, y: 410, width: 210, textColor: "#2f3542" },
          { id: "rs_l_skills_b", type: "paragraph", text: "• Project Management\n• Public Relations\n• Teamwork\n• Time Management\n• Leadership\n• Effective Communication\n• Critical Thinking\n• Digital Marketing", x: 25, y: 435, width: 210 },

          { id: "rs_l_lang_t", type: "heading", text: "LANGUAGES", x: 25, y: 650, width: 210, textColor: "#2f3542" },
          { id: "rs_l_lang_b", type: "paragraph", text: "• English (Fluent)\n• French (Fluent)\n• German (Basic)\n• Spanish (Intermediate)", x: 25, y: 675, width: 210 },

          { id: "rs_l_ref_t", type: "heading", text: "REFERENCE", x: 25, y: 790, width: 210, textColor: "#2f3542" },
          { id: "rs_l_ref_b", type: "paragraph", text: "Estelle Darcy\nWardiere Inc. / CTO\nPhone: 123-456-7890\nEmail: hello@reallygreatsite.com", x: 25, y: 815, width: 210 },

          // RIGHT COLUMN DETAILS (x: 290, width: 470)
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
        ]
      }
    },
    {
      id: "estelle-darcy",
      name: "Estelle Darcy (Creative)",
      description: "An off-white minimalist blueprint featuring bold crimson typography and a right-aligned circle profile avatar.",
      badge: "Canva Editorial",
      icon: Award,
      color: "from-red-600 to-rose-700",
      data: {
        isFreestyle: true,
        blocks: [
          // PICTURE
          { id: "ed_pic", type: "avatar", x: 580, y: 40, width: 140, height: 140 },

          // HEADER TEXTS
          { id: "ed_name", type: "title", text: "ESTELLE DARCY", x: 50, y: 50, width: 500, textColor: "#dc2626" },
          { id: "ed_title", type: "subtitle", text: "GRAPHIC DESIGNER & CREATIVE DIRECTOR", x: 50, y: 95, width: 500, textColor: "#71717a" },
          { id: "ed_contacts", type: "paragraph", text: "📞 +123-456-7890   •   ✉ hello@reallygreatsite.com   •   📍 Bangalore, India", x: 50, y: 120, width: 500 },

          // PROFILE SUMMARY
          { id: "ed_prof_t", type: "heading", text: "PROFILE SUMMARY", x: 50, y: 210, width: 694, textColor: "#dc2626" },
          { id: "ed_prof_b", type: "paragraph", text: "Creative and detail-oriented Graphic Designer with 6+ years of expertise leading brand strategy, layout wireframes, and digital campaign aesthetics. Proven ability to translate product values into gorgeous visual designs.", x: 50, y: 235, width: 694 },

          // COLUMN 1: SKILLS (x: 50, width: 320)
          { id: "ed_c1_t", type: "heading", text: "TECHNICAL SKILLS", x: 50, y: 310, width: 320, textColor: "#dc2626" },
          { id: "ed_c1_b", type: "paragraph", text: "• Adobe Photoshop & Illustrator\n• Figma Design System Libraries\n• Color Theory & Typography Branding\n• Responsive Website Mockups\n• Printing Layout Coordination", x: 50, y: 335, width: 320 },

          // COLUMN 2: EDUCATION (x: 420, width: 320)
          { id: "ed_c2_t", type: "heading", text: "EDUCATION BACKGROUND", x: 420, y: 310, width: 320, textColor: "#dc2626" },
          { id: "ed_c2_b", type: "paragraph", text: "Master of Fine Arts (MFA)\nNational Academy of Art, Bangalore\nClass of 2020\n\nBachelor of Science in Multimedia\nUniversity of Visual Media\nClass of 2017", x: 420, y: 335, width: 320 },

          // EXPERIENCE SECTION
          { id: "ed_exp_t", type: "heading", text: "WORK EXPERIENCE", x: 50, y: 470, width: 694, textColor: "#dc2626" },
          
          { id: "ed_job1_h", type: "subheading", text: "Creative Lead — Studio Pixel Graphics (2023 - Present)", x: 50, y: 495, width: 694 },
          { id: "ed_job1_b", type: "paragraph", text: "• Designed layout templates for 4 international corporate accounts, elevating brand recognition metrics by 30%.\n• Coordinated interactive wireframe blueprints in Figma alongside front-end development engineers.", x: 50, y: 520, width: 694 },

          { id: "ed_job2_h", type: "subheading", text: "Junior Graphic Designer — Creative Lab Ltd (2020 - 2023)", x: 50, y: 590, width: 694 },
          { id: "ed_job2_b", type: "paragraph", text: "• Developed vector elements, marketing posters, email newsletters, and visual branding patterns.\n• Participated in weekly design critique sessions, adapting layouts to meet feedback specifications.", x: 50, y: 615, width: 694 }
        ]
      }
    },
    {
      id: "dani-martinez",
      name: "Dani Martinez (Stripe)",
      description: "Modern layout highlighting a vertical purple-to-indigo gradient stripe on the left margin and offset profile silhouette.",
      badge: "Canva Stripe",
      icon: Layout,
      color: "from-purple-600 to-indigo-650",
      data: {
        isFreestyle: true,
        blocks: [
          // LEFT STRIPE SHAPE
          { id: "dm_stripe", type: "shape", x: 0, y: 0, width: 80, height: 1120, color: "bg-gradient-to-b from-purple-600 to-indigo-750" },
          { id: "dm_pic", type: "avatar", x: 20, y: 60, width: 120, height: 120 },

          // HEADER TEXTS
          { id: "dm_name", type: "title", text: "DANI MARTINEZ", x: 180, y: 60, width: 560, textColor: "#4f46e5" },
          { id: "dm_title", type: "subtitle", text: "FREELANCE MARKETING CONSULTANT", x: 180, y: 105, width: 560, textColor: "#6b7280" },

          // DETAILS COLUMN 1 (x: 180, width: 250)
          { id: "dm_c1_prof_t", type: "heading", text: "ABOUT ME", x: 180, y: 180, width: 250, textColor: "#4f46e5" },
          { id: "dm_c1_prof_b", type: "paragraph", text: "Results-driven Digital Marketer specialized in paid campaigns, customer acquisition tunnels, and viral content management.", x: 180, y: 205, width: 250 },

          { id: "dm_c1_skills_t", type: "heading", text: "CORE SKILLS", x: 180, y: 310, width: 250, textColor: "#4f46e5" },
          { id: "dm_c1_skills_b", type: "paragraph", text: "• Google Ads / Meta Ads\n• Search Engine Optimization\n• Lead Generation funnels\n• Copywriting & Storytelling\n• Web analytics & dashboards", x: 180, y: 335, width: 250 },

          { id: "dm_c1_contact_t", type: "heading", text: "CONNECT DETAILS", x: 180, y: 480, width: 250, textColor: "#4f46e5" },
          { id: "dm_c1_contact_b", type: "paragraph", text: "✉ dani.mart@gmail.com\n📞 +91 95555 66666\n📍 Bangalore, India", x: 180, y: 505, width: 250 },

          // DETAILS COLUMN 2 (x: 460, width: 290)
          { id: "dm_c2_exp_t", type: "heading", text: "WORK EXPERIENCE", x: 460, y: 180, width: 290, textColor: "#4f46e5" },
          
          { id: "dm_c2_job1_h", type: "subheading", text: "Lead Marketer — BrandSutra Inc", x: 460, y: 205, width: 290 },
          { id: "dm_c2_job1_b", type: "paragraph", text: "2024 - Present\nManaged PPC advertising dashboards with a $15k monthly budget, increasing click conversions by 40%.", x: 460, y: 225, width: 290 },

          { id: "dm_c2_job2_h", type: "subheading", text: "Marketing Intern — ScaleMedia", x: 460, y: 320, width: 290 },
          { id: "dm_c2_job2_b", type: "paragraph", text: "2022 - 2024\nDrafted marketing copies, structured search keywords, and tracked user journey statistics.", x: 460, y: 340, width: 290 },

          { id: "dm_c2_edu_t", type: "heading", text: "EDUCATION", x: 460, y: 450, width: 290, textColor: "#4f46e5" },
          { id: "dm_c2_edu_h", type: "subheading", text: "Bachelor of Business Administration", x: 460, y: 475, width: 290 },
          { id: "dm_c2_edu_b", type: "paragraph", text: "Christ University, Bangalore\nClass of 2022", x: 460, y: 495, width: 290 }
        ]
      }
    },
    {
      id: "olivia-wilson",
      name: "Olivia Wilson (Executive)",
      description: "Clean, elegant corporate structure with horizontal accent dividers, dark charcoal headers, and elegant layouts.",
      badge: "Canva Minimalist",
      icon: Briefcase,
      color: "from-zinc-650 to-zinc-800",
      data: {
        isFreestyle: true,
        blocks: [
          // DIVIDER LINES
          { id: "ow_line1", type: "shape", x: 50, y: 150, width: 694, height: 2, color: "bg-zinc-300" },
          { id: "ow_line2", type: "shape", x: 50, y: 460, width: 694, height: 2, color: "bg-zinc-300" },

          // HEADER TEXTS
          { id: "ow_name", type: "title", text: "OLIVIA WILSON", x: 50, y: 50, width: 694, textColor: "#18181b" },
          { id: "ow_title", type: "subtitle", text: "SENIOR FINANCIAL ANALYST", x: 50, y: 95, width: 694, textColor: "#4f46e5" },
          { id: "ow_contacts", type: "paragraph", text: "✉ olivia.wilson@site.com  |  📞 +123 9999 0000  |  📍 London, UK", x: 50, y: 120, width: 694 },

          // SECTIONS
          { id: "ow_prof_h", type: "heading", text: "PROFESSIONAL PROFILE", x: 50, y: 170, width: 694, textColor: "#18181b" },
          { id: "ow_prof_b", type: "paragraph", text: "Highly analytic and detail-driven Senior Financial Analyst with 8+ years of expertise in budget forecasts, investment modeling, corporate portfolios, and financial statements checks.", x: 50, y: 200, width: 694 },

          { id: "ow_exp_h", type: "heading", text: "RELEVANT EXPERIENCE", x: 50, y: 290, width: 694, textColor: "#18181b" },
          { id: "ow_job1_h", type: "subheading", text: "Senior Analyst — Apex Investment Corp (2022 - Present)", x: 50, y: 320, width: 694 },
          { id: "ow_job1_b", type: "paragraph", text: "• Supervised the budget forecasting of 14 international accounts, optimizing annual allocations by 15%.\n• Drafted weekly market valuation summaries for the chief executive board.", x: 50, y: 340, width: 694 },

          { id: "ow_job2_h", type: "subheading", text: "Junior Analyst — Wardiere Financials (2018 - 2022)", x: 50, y: 395, width: 694 },
          { id: "ow_job2_b", type: "paragraph", text: "• Performed audit analytics, verified spreadsheet data formulas, and compiled financial reporting graphs.", x: 50, y: 415, width: 694 },

          // SKILLS & EDUCATION SIDE-BY-SIDE
          { id: "ow_skills_h", type: "heading", text: "CORE EXPERTISE", x: 50, y: 480, width: 320, textColor: "#18181b" },
          { id: "ow_skills_b", type: "paragraph", text: "• Financial Forecasting\n• Risk Assessment & Modeling\n• SQL Database Analytics\n• Corporate Tax compliance\n• Excel Macro VBA automations", x: 50, y: 510, width: 320 },

          { id: "ow_edu_h", type: "heading", text: "EDUCATION HISTORY", x: 420, y: 480, width: 320, textColor: "#18181b" },
          { id: "ow_edu_b", type: "paragraph", text: "M.Sc. in Quantitative Finance\nLondon School of Economics | Class of 2018\n\nB.Sc. in Financial Mathematics\nUniversity of Manchester | Class of 2015", x: 420, y: 510, width: 320 }
        ]
      }
    },
    {
      id: "liam-carter",
      name: "Liam Carter (Tech Mode)",
      description: "A gorgeous dark-mode software engineer blueprint with a deep navy canvas, neon cyan accents, and circular avatar.",
      badge: "Tech Dark Mode",
      icon: Terminal,
      color: "from-[#0f172a] to-[#1e293b]",
      data: {
        isFreestyle: true,
        blocks: [
          // DARK BACKGROUND SHAPE (covers whole page)
          { id: "lc_bg", type: "shape", x: 0, y: 0, width: 794, height: 1120, color: "bg-[#0f172a]" },
          { id: "lc_pic", type: "avatar", x: 600, y: 50, width: 130, height: 130 },

          // HEADER TEXTS
          { id: "lc_name", type: "title", text: "LIAM CARTER", x: 60, y: 60, width: 500, textColor: "#ffffff" },
          { id: "lc_title", type: "subtitle", text: "SENIOR FULL-STACK DEVELOPER", x: 60, y: 105, width: 500, textColor: "#22d3ee" },
          { id: "lc_contacts", type: "paragraph", text: "✉ liam.dev@carter.io  •  📞 +1-555-8888  •  🌐 github.com/liamcarter", x: 60, y: 130, width: 500, textColor: "#94a3b8" },

          // DUAL COLUMN SPLIT (Projects vs Skills)
          { id: "lc_proj_h", type: "heading", text: "FEATURED SOFTWARE PROJECTS", x: 60, y: 220, width: 440, textColor: "#22d3ee" },
          { id: "lc_proj1_h", type: "subheading", text: "1. CloudScale Dashboard (Next.js & Go)", x: 60, y: 250, width: 440, textColor: "#ffffff" },
          { id: "lc_proj1_b", type: "paragraph", text: "Architected a real-time cluster telemetry dashboard scaling to 10k messages per second. Implemented optimized WebSockets updates reducing latency by 40%.", x: 60, y: 275, width: 440, textColor: "#cbd5e1" },

          { id: "lc_proj2_h", type: "subheading", text: "2. FastORM Engine (Rust Crate)", x: 60, y: 350, width: 440, textColor: "#ffffff" },
          { id: "lc_proj2_b", type: "paragraph", text: "Developed an asynchronous object-relational mapper for PostgreSQL in Rust, reaching 1.2 million downloads. Reduced runtime query allocations down to zero.", x: 60, y: 375, width: 440, textColor: "#cbd5e1" },

          // SKILLS SIDEBAR (Right)
          { id: "lc_skills_h", type: "heading", text: "TECH SKILLS", x: 530, y: 220, width: 200, textColor: "#22d3ee" },
          { id: "lc_skills_b", type: "paragraph", text: "• React / Next.js\n• Node.js / Express\n• Rust / Go Systems\n• PostgreSQL / Redis\n• Docker / Kubernetes\n• AWS Cloud Architect\n• GitHub Actions CI/CD", x: 530, y: 250, width: 200, textColor: "#cbd5e1" },

          // EXPERIENCE LOWER SECTION
          { id: "lc_exp_h", type: "heading", text: "PROFESSIONAL CAREER HISTORY", x: 60, y: 480, width: 670, textColor: "#22d3ee" },
          { id: "lc_job1_h", type: "subheading", text: "Lead Engineer — TechCorp Solutions, Bangalore (2022 - Present)", x: 60, y: 510, width: 670, textColor: "#ffffff" },
          { id: "lc_job1_b", type: "paragraph", text: "• Leading a team of 6 engineers developing microservice APIs serving 500k monthly active users.\n• Redesigned DB indexes in Postgres, achieving a 30% reduction in query load overhead.", x: 60, y: 530, width: 670, textColor: "#cbd5e1" },

          { id: "lc_job2_h", type: "subheading", text: "Full Stack Developer — Delta Systems (2019 - 2022)", x: 60, y: 600, width: 670, textColor: "#ffffff" },
          { id: "lc_job2_b", type: "paragraph", text: "• Managed the front-end redesign using React 18, enhancing user retention metrics by 12%.", x: 60, y: 620, width: 670, textColor: "#cbd5e1" }
        ]
      }
    },
    {
      id: "sofia-flores",
      name: "Sofia Flores (Pastel Sage)",
      description: "A whimsical, artistic layout featuring a pastel peach canvas backdrop, soft sage left column, and circle avatar frame.",
      badge: "Canva Pastel",
      icon: Palette,
      color: "from-emerald-700/60 to-amber-700/50",
      data: {
        isFreestyle: true,
        blocks: [
          // BACKGROUND SHAPES
          { id: "sf_bg", type: "shape", x: 0, y: 0, width: 794, height: 1120, color: "bg-[#faf0e6]" }, // Pastel Peach Page
          { id: "sf_stripe", type: "shape", x: 0, y: 0, width: 250, height: 1120, color: "bg-[#e8f0e8]" }, // Sage Left Sidebar
          { id: "sf_pic", type: "avatar", x: 55, y: 60, width: 140, height: 140 },

          // HEADER TEXTS
          { id: "sf_name", type: "title", text: "SOFIA FLORES", x: 280, y: 60, width: 460, textColor: "#2e5a44" },
          { id: "sf_title", type: "subtitle", text: "LEAD ILLUSTRATOR & GRAPHIC DESIGNER", x: 280, y: 105, width: 460, textColor: "#556b2f" },

          // LEFT COLUMN INFO (x: 25, width: 200)
          { id: "sf_contact_h", type: "heading", text: "CONNECT", x: 25, y: 240, width: 200, textColor: "#2e5a44" },
          { id: "sf_contact_b", type: "paragraph", text: "✉ hello@sofiaflores.com\n📞 +91 99000 88888\n📍 Bangalore, India\n🎨 behance.net/sofiaf", x: 25, y: 265, width: 200, textColor: "#2e5a44" },

          { id: "sf_skills_h", type: "heading", text: "DESIGN TOOLS", x: 25, y: 400, width: 200, textColor: "#2e5a44" },
          { id: "sf_skills_b", type: "paragraph", text: "• Digital Illustration\n• Vector Art (Illustrator)\n• Matte Painting (Photoshop)\n• Procreate Drawing\n• Editorial Book Layouts\n• Branding & Packages", x: 25, y: 425, width: 200, textColor: "#2e5a44" },

          // RIGHT COLUMN INFO (x: 280, width: 460)
          { id: "sf_prof_h", type: "heading", text: "CREATIVE PROFILE", x: 280, y: 180, width: 460, textColor: "#2e5a44" },
          { id: "sf_prof_b", type: "paragraph", text: "Passionate and versatile illustrator with 5+ years of experience publishing children's books, digital editorials, and brand identity packages. Expert in building soft, curated color palettes that convey stories beautifully.", x: 280, y: 205, width: 460 },

          { id: "sf_exp_h", type: "heading", text: "RELEVANT CAREER", x: 280, y: 310, width: 460, textColor: "#2e5a44" },
          { id: "sf_job1_h", type: "subheading", text: "Lead Book Illustrator — Tulika Publishers (2022 - Present)", x: 280, y: 335, width: 460, textColor: "#556b2f" },
          { id: "sf_job1_b", type: "paragraph", text: "• Illustrated 6 children's storybooks, coordinating cover graphics, character palettes, and printer CMYK templates.\n• Designed viral digital posters for literary book fairs.", x: 280, y: 360, width: 460 },

          { id: "sf_job2_h", type: "subheading", text: "Freelance Designer — Sofia Flores Studio (2019 - 2022)", x: 280, y: 440, width: 460, textColor: "#556b2f" },
          { id: "sf_job2_b", type: "paragraph", text: "• Formulated corporate logos and brand kits for 12 localized startup businesses, focusing on organic cosmetics and coffee brands.", x: 280, y: 465, width: 460 }
        ]
      }
    },
    {
      id: "marcus-chen",
      name: "Marcus Chen (Academic)",
      description: "A formal research style featuring clean ivory styling, gold-leaf top header stripe, and elegant Serif typeface.",
      badge: "Canva Formal",
      icon: BookOpen,
      color: "from-amber-600 to-yellow-750",
      data: {
        isFreestyle: true,
        blocks: [
          // BACKGROUND SHAPES
          { id: "mc_bg", type: "shape", x: 0, y: 0, width: 794, height: 1120, color: "bg-[#fcfbf9]" }, // Ivory Page
          { id: "mc_stripe", type: "shape", x: 0, y: 0, width: 794, height: 12, color: "bg-[#c5a880]" }, // Gold Top Stripe

          // HEADER TEXTS
          { id: "mc_name", type: "title", text: "MARCUS CHEN, PHD", x: 50, y: 40, width: 694, textColor: "#1f2937" },
          { id: "mc_title", type: "subtitle", text: "PROFESSOR OF DATA SCIENCE & MACHINE LEARNING", x: 50, y: 85, width: 694, textColor: "#c5a880" },
          { id: "mc_contacts", type: "paragraph", text: "✉ marcus.chen@university.edu  •  📞 +91 98888 77777  •  📍 Bangalore, India", x: 50, y: 110, width: 694 },

          // DUAL COLUMN CONTENT
          { id: "mc_res_h", type: "heading", text: "RESEARCH FOCUS SUMMARY", x: 50, y: 160, width: 440, textColor: "#1f2937" },
          { id: "mc_res_b", type: "paragraph", text: "Dr. Chen conducts research at the intersection of deep neural networks, large language model alignment, and distributed database clustering. Published 20+ papers in high-impact journals.", x: 50, y: 185, width: 440 },

          // SIDEBAR (Right)
          { id: "mc_edu_h", type: "heading", text: "ACADEMIC BACKGROUND", x: 520, y: 160, width: 220, textColor: "#1f2937" },
          { id: "mc_edu_b", type: "paragraph", text: "• Ph.D. in Computer Science\n  Stanford University (2018)\n• M.Tech in Data Science\n  IISc Bangalore (2015)\n• B.Tech in CSE\n  IIT Bombay (2013)", x: 520, y: 185, width: 220 },

          // PUBLICATIONS SECTION
          { id: "mc_pub_h", type: "heading", text: "REPRESENTATIVE PUBLICATIONS", x: 50, y: 320, width: 690, textColor: "#1f2937" },
          { id: "mc_pub1_h", type: "subheading", text: "1. Scaling Parameters in Neural Transformers (IEEE 2024)", x: 50, y: 345, width: 690 },
          { id: "mc_pub1_b", type: "paragraph", text: "Marcus Chen & Allison Cooper. Evaluated tokenization bottlenecks across parameters ranging from 1B to 70B, showcasing a 12% memory overhead optimization.", x: 50, y: 365, width: 690 },

          { id: "mc_pub2_h", type: "subheading", text: "2. Distributed Storage in LLM Pipelines (ACM 2022)", x: 50, y: 440, width: 690 },
          { id: "mc_pub2_b", type: "paragraph", text: "Marcus Chen, Dev Sharma, & Sarah Jenkins. Formulated a parallel tensor loading protocol reducing file serialization latency down to 2ms.", x: 50, y: 460, width: 690 }
        ]
      }
    },
    {
      id: "emily-watson",
      name: "Emily Watson (Operations)",
      description: "Modern professional template featuring a deep navy left margin, overlapping circle profile avatar, and side grids.",
      badge: "Canva Modern",
      icon: Layers,
      color: "from-blue-800 to-indigo-900",
      data: {
        isFreestyle: true,
        blocks: [
          // BACKGROUND SHAPES
          { id: "ew_sidebar", type: "shape", x: 0, y: 0, width: 240, height: 1120, color: "bg-[#1e2530]" }, // Navy Left Sidebar
          { id: "ew_pic", type: "avatar", x: 170, y: 50, width: 140, height: 140 },

          // HEADER TEXTS
          { id: "ew_name", type: "title", text: "EMILY WATSON", x: 340, y: 60, width: 400, textColor: "#1e2530" },
          { id: "ew_title", type: "subtitle", text: "CHIEF OPERATIONS DIRECTOR", x: 340, y: 105, width: 400, textColor: "#4f46e5" },

          // LEFT COLUMN DETS (x: 20, width: 200, white text)
          { id: "ew_l_contact_t", type: "heading", text: "CONNECT", x: 20, y: 220, width: 200, textColor: "#ffffff" },
          { id: "ew_l_contact_b", type: "paragraph", text: "✉ emily@watsonops.com\n📞 +123-555-7777\n📍 New York, USA\n🌐 linkedin.com/in/emilyops", x: 20, y: 245, width: 200, textColor: "#ffffff" },

          { id: "ew_l_skills_t", type: "heading", text: "COMPETENCIES", x: 20, y: 390, width: 200, textColor: "#ffffff" },
          { id: "ew_l_skills_b", type: "paragraph", text: "• Executive Leadership\n• Supply Chain Strategy\n• Resource Allocation\n• Agile Scrum Ops\n• Cross-team Synergies\n• Budget Optimization", x: 20, y: 415, width: 200, textColor: "#ffffff" },

          // RIGHT COLUMN DETS (x: 270, width: 470)
          { id: "ew_r_prof_t", type: "heading", text: "EXECUTIVE SUMMARY", x: 270, y: 220, width: 470, textColor: "#1e2530" },
          { id: "ew_r_prof_b", type: "paragraph", text: "High-performing Operations Director with 10+ years of leadership optimizing enterprise logistics, streamlining SaaS product deployments, and managing $2M+ operating budgets.", x: 270, y: 245, width: 470 },

          { id: "ew_r_exp_t", type: "heading", text: "CAREER TIMELINE", x: 270, y: 350, width: 470, textColor: "#1e2530" },
          { id: "ew_r_job1_h", type: "subheading", text: "Operations Director — Vanguard Solutions (2021 - Present)", x: 270, y: 375, width: 470 },
          { id: "ew_r_job1_b", type: "paragraph", text: "• Supervised global supply lines spanning 4 hubs, slashing delivery overhead cost metrics by 18%.\n• Implemented automated resource dispatch platforms scaling cross-team product delivery speed.", x: 270, y: 400, width: 470 },

          { id: "ew_r_job2_h", type: "subheading", text: "Operations Manager — Delta Commerce Ltd (2015 - 2021)", x: 270, y: 480, width: 470 },
          { id: "ew_r_job2_b", type: "paragraph", text: "• Streamlined warehouse inventories and managed logistics audits, reducing errors down to zero.", x: 270, y: 505, width: 470 }
        ]
      }
    },
    {
      id: "blank-canvas",
      name: "Create Blank Canvas",
      description: "Start completely from scratch. Loads a minimal title/subtitle header template and lets you add custom text boxes freely.",
      badge: "Start from Scratch",
      icon: FilePlus,
      color: "from-zinc-400 to-zinc-650",
      data: {
        isFreestyle: true,
        blocks: [
          { id: "b1", type: "title", text: "YOUR NAME", x: 50, y: 50, width: 694 },
          { id: "b2", type: "subtitle", text: "Your Target Job Profession / Subtitle", x: 50, y: 95, width: 694 },
          { id: "b3", type: "paragraph", text: "Phone Number  •  Email Address  •  City, Country", x: 50, y: 120, width: 694 }
        ]
      }
    }
  ];

  const handleUseTemplate = (preset) => {
    localStorage.setItem("editorResumeData", JSON.stringify(preset.data));
    localStorage.setItem("selectedTemplateId", preset.id);
    navigate("/editor");
  };

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen">
      <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Builder
          </span>
          <h1 className="text-4xl font-bold tracking-tight mt-1 text-zinc-900 dark:text-white">
            Resume Blueprints
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">
            Select a starting template schema to load into the document editing canvas.
          </p>
        </div>

        {/* GRID OF PRESETS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
          {presets.map((preset) => {
            const Icon = preset.icon;
            return (
              <div
                key={preset.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col group"
              >
                {/* Accent Header */}
                <div className={`h-36 bg-gradient-to-tr ${preset.color} p-6 flex items-center justify-between relative`}>
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {preset.badge}
                  </div>
                  <Icon className="text-white opacity-20 absolute right-6 bottom-4 w-20 h-20 shrink-0" />
                  
                  <div className="mt-8 text-white">
                    <p className="font-extrabold text-lg leading-tight">{preset.name}</p>
                    <p className="text-white/80 text-[10px] mt-1">Ready for custom details</p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {preset.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => handleUseTemplate(preset)}
                      className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 rounded-xl text-xs font-semibold shadow-sm transition duration-150 flex items-center justify-center gap-1.5"
                    >
                      Use Template
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
