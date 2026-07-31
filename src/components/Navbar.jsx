import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              navigate('/');
            }}
            className="flex items-center gap-2 focus:outline-none hover:opacity-90 transition duration-150"
          >
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Analyze Resume AI
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}