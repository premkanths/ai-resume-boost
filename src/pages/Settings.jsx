import { useState, useEffect } from "react";
import { Sun, Moon, Info, Monitor } from "lucide-react";

export default function Settings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen">
      <main className="p-6 md:p-10 max-w-4xl mx-auto w-full">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">
            Configure application preferences and appearance settings.
          </p>
        </div>

        {/* SETTINGS CARD CONTAINER */}
        <div className="space-y-6">
          {/* THEME SELECTION CARD */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors duration-200">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              Appearance
            </h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
              Customize how the interface looks on your device.
            </p>

            {/* THEME SELECTORS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Day Theme */}
              <button
                onClick={() => changeTheme("light")}
                className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none ${
                  theme === "light"
                    ? "border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-zinc-800/40"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === "light" ? "bg-indigo-100 text-indigo-600" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                    <Sun size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Day Theme</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Light background and clean text</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === "light" ? "border-indigo-600 dark:border-indigo-400" : "border-zinc-300 dark:border-zinc-700"}`}>
                  {theme === "light" && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                </div>
              </button>

              {/* Night Theme */}
              <button
                onClick={() => changeTheme("dark")}
                className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none ${
                  theme === "dark"
                    ? "border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-zinc-800/40"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-indigo-900/50 text-indigo-400" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                    <Moon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Night Theme</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Dark background tailored for eyes</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === "dark" ? "border-indigo-600 dark:border-indigo-400" : "border-zinc-300 dark:border-zinc-700"}`}>
                  {theme === "dark" && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                </div>
              </button>
            </div>
          </div>

          {/* APPLICATION DETAILS CARD */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors duration-200">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              System Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
              Current version and system configuration metrics.
            </p>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
              <div className="py-3 flex justify-between">
                <span className="text-gray-500 dark:text-zinc-400">Application Version</span>
                <span className="font-semibold">v1.0.0 (Production ready)</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500 dark:text-zinc-400">AI Model</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Gemini 2.5 Flash</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500 dark:text-zinc-400">OCR Engine</span>
                <span className="font-semibold">Tesseract OCR (eng)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
