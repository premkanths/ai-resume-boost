import { useLocation, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Sparkles, History, Settings, FileText, LogOut, GitBranch, FileEdit } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const username = localStorage.getItem("username") || "Guest User";
  const role = localStorage.getItem("userRole") || "Free";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      disabled: false,
    },
    {
      name: "Analyze",
      path: "/",
      icon: FileText,
      disabled: false,
    },
    {
      name: "Create Resume",
      path: "/templates",
      icon: FileEdit,
      disabled: false,
    },
    {
      name: "History",
      path: "/history",
      icon: History,
      disabled: false,
    },
    {
      name: "Roadmaps",
      path: "/roadmaps",
      icon: GitBranch,
      disabled: false,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      disabled: false,
    },
  ];

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 flex flex-col z-30 transition-colors duration-200 no-print">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-900 gap-3">
        <div className="relative flex items-center justify-center flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-indigo-500/20 tracking-tighter">
            PK
          </div>
          <Sparkles className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400 animate-pulse" />
        </div>
        <div className="flex flex-col font-extrabold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
          <span>Analyze</span>
          <span className="pl-4">Resume</span>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded ml-auto">
          V1
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          if (item.disabled) {
            return (
              <div
                key={item.name}
                className="flex items-center justify-between px-4 py-2.5 text-zinc-400 dark:text-zinc-600 select-none cursor-not-allowed text-sm"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{item.name}</span>
                </div>
                <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded text-zinc-400">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition duration-150 ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Status / Footer */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-900">
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{username}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 truncate">{role} Mode</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition duration-150 ml-1.5 focus:outline-none"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
