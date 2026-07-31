import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Eye, Calendar, Award, Info, SearchCode } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const username = localStorage.getItem("username") || "Guest";
        const res = await fetch(`${API_BASE}/resumes/history?userId=${username}`);
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError("Could not load history. Ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleViewReport = (record) => {
    localStorage.setItem("analysis", JSON.stringify(record.result));
    navigate("/result");
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen">
      <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Records
          </span>
          <h1 className="text-4xl font-bold tracking-tight mt-1 text-zinc-900 dark:text-white">
            Scan History
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">
            Retrieve past evaluations, resume ratings, and custom feedback reports.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
              Retrieving scan history...
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
            <Info size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && history.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-12 text-center shadow-sm">
            <div className="flex justify-center mb-4 text-zinc-400">
              <SearchCode size={48} />
            </div>
            <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">
              No Scan History Found
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto mt-2">
              You haven't optimized any resumes yet. Start uploading on the Analyze page to view your reports here.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl shadow-sm transition duration-150"
            >
              Analyze Resume Now
            </button>
          </div>
        )}

        {/* LIST TABLE */}
        {!loading && !error && history.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm transition-colors duration-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/40">
                    <th className="px-6 py-4">Resume Name</th>
                    <th className="px-6 py-4">ATS Match Score</th>
                    <th className="px-6 py-4">Scanned On</th>
                    <th className="px-6 py-4">Target Job</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                  {history.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition duration-150"
                    >
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                        <div className="flex items-center gap-3">
                          <FileText className="text-indigo-600 dark:text-indigo-400" size={18} />
                          <span className="truncate max-w-[200px] md:max-w-xs">{record.filename}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1">
                            <Award size={12} />
                            <span>{record.score}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-500 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <span>{formatDate(record.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                        <span className="truncate max-w-[150px] inline-block text-xs">
                          {record.jobDescription ? record.jobDescription : "General Analysis"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleViewReport(record)}
                          className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold transition duration-150 inline-flex items-center gap-1.5"
                        >
                          <Eye size={14} />
                          View Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
