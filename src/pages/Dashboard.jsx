import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Cpu, Brain, NotebookPen, TrendingUp, Award, Zap, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock stats data
  const stats = [
    {
      title: "Total Analyzed",
      value: "14",
      change: "+12% this week",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "Average ATS Score",
      value: "76%",
      change: "Top 20% average",
      icon: Award,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20",
    },
    {
      title: "Success Rate",
      value: "98.2%",
      change: "Stable parsing",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20",
    },
  ];

  const features = [
    {
      title: "ATS Compatibility",
      icon: Cpu,
      description: "See exactly how recruiter's tracking software views your resume and fix hidden formatting issues.",
    },
    {
      title: "Skill Gap Analysis",
      icon: Brain,
      description: "Automatically identify missing keywords based on the jobs you're actually targeting.",
    },
    {
      title: "Bullet Point Rewrite",
      icon: NotebookPen,
      description: "Transform weak sentences into impact-driven achievements with one click.",
    },
  ];

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen">
      <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Overview
            </span>
            <h1 className="text-4xl font-bold tracking-tight mt-1 text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-1">
              Welcome back! Check your resume optimization statistics below.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl transition duration-150 shadow-sm"
          >
            Analyze New Resume
          </button>
        </div>

        {/* METRIC STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm flex items-center justify-between transition-colors duration-200"
              >
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-extrabold mt-1 text-zinc-900 dark:text-white">
                    {stat.value}
                  </p>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
                    {stat.change}
                  </span>
                </div>
                <div className={`p-4 rounded-2xl ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            );
          })}
        </div>

        {/* CORE PILLARS / PREVIOUS FEATURES */}
        <div className="mb-10">
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Master Your Job Search
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 mt-1">
              Our AI engine works across three core pillars to transform your professional profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200 text-center md:text-left"
                >
                  <div className="mb-4 flex justify-center md:justify-start text-indigo-600 dark:text-indigo-400">
                    <div className="p-3 bg-indigo-50 dark:bg-zinc-800/50 rounded-xl">
                      <Icon size={32} />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold mb-2 text-zinc-850 dark:text-zinc-200">
                    {feat.title}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA PANEL */}
        <div className="bg-indigo-600 dark:bg-indigo-900/60 border border-transparent dark:border-indigo-800/30 text-white p-8 md:p-10 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Ready to land your dream job?
            </h2>
            <p className="text-indigo-100 text-sm md:text-base">
              Join 1,000+ users who have optimized their resumes for the future of hiring.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-white hover:bg-zinc-50 text-indigo-600 font-bold px-6 py-3 rounded-xl transition duration-150 shrink-0 shadow-sm"
          >
            Get Started
          </button>
        </div>

      </main>
    </div>
  );
}
