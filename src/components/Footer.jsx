import { useState } from "react";
import ReportModal from "./ReportModal";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-8 text-center text-sm text-gray-500 dark:text-zinc-400 transition-colors duration-200">
      
      <div className="flex justify-center gap-6 mb-2">
        <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150">
          Privacy Policy
        </Link>

        <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150">
          Terms & Conditions
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
        >
          Report an issue
        </button>
        {showModal && (
          <ReportModal onClose={() => setShowModal(false)} />
        )}
      </div>

      © 2026 Analyze Resume AI
    </footer>
    
  );
}