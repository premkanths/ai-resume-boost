import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, KeyRound, Mail, User, ShieldAlert, ArrowRight } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const endpoint = isSignUp ? "/auth/register" : "/auth/login";

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      if (isSignUp) {
        setSuccess("Registration successful! Logging you in...");
        // Auto login after successful sign up
        setTimeout(async () => {
          try {
            const loginRes = await fetch(`${API_BASE}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });
            const loginData = await loginRes.json();
            if (loginRes.ok) {
              localStorage.setItem("isAuthenticated", "true");
              localStorage.setItem("userRole", loginData.user.role);
              localStorage.setItem("username", loginData.user.email.split("@")[0]);
              navigate("/dashboard");
            } else {
              setIsSignUp(false);
              setEmail(email);
              setPassword("");
              setSuccess("");
            }
          } catch {
            setIsSignUp(false);
          }
        }, 1500);
      } else {
        // Sign In success
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("username", data.user.email.split("@")[0]);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", "Guest");
    localStorage.setItem("username", "Guest User");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg relative overflow-hidden transition-colors duration-200">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl -z-10"></div>

        {/* LOGO SECTION */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-indigo-500/25 tracking-tighter">
              PK
            </div>
            <Sparkles className="absolute -top-1.5 -right-1.5 h-4.5 w-4.5 text-amber-500 fill-amber-500 animate-pulse" />
          </div>
          <h2 className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Analyze Resume AI
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
            {isSignUp ? "Create a premium candidate profile" : "SaaS Placement Evaluation Portal"}
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-5 p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs leading-relaxed">
            {success}
          </div>
        )}

        {/* ERROR BOX */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl flex items-start gap-2.5 text-red-600 dark:text-red-400 text-xs leading-relaxed">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
              <input
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-zinc-900 transition duration-150"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-zinc-900 transition duration-150"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm shadow-md transition duration-150 flex items-center justify-center gap-1.5"
            >
              {loading ? "Processing..." : isSignUp ? "Create Profile" : "Sign In"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </div>
        </form>

        {/* TOGGLE MODE LINK */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setSuccess("");
              setPassword("");
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            {isSignUp ? "Already have a profile? Sign In" : "Don't have a profile yet? Register here"}
          </button>
        </div>

        {/* OR DIVIDER */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          <span className="relative px-3 bg-white dark:bg-zinc-900 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
            OR
          </span>
        </div>

        {/* GUEST BUTTON */}
        <button
          onClick={handleGuestLogin}
          className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 font-semibold text-sm transition duration-150 flex items-center justify-center gap-2"
        >
          <User size={18} />
          Continue as Guest
        </button>

        {/* HINT */}
        {!isSignUp && (
          <div className="mt-6 text-center text-[10px] text-zinc-400 dark:text-zinc-500">
            For rapid evaluation, click <span className="font-semibold">Continue as Guest</span>
          </div>
        )}

      </div>
    </div>
  );
}
