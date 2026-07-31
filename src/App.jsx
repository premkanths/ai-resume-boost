import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Result from "./pages/Result";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import History from "./pages/History";
import Roadmaps from "./pages/Roadmaps";
import Templates from "./pages/Templates";
import CanvasEditor from "./pages/CanvasEditor";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAuth = localStorage.getItem("isAuthenticated") === "true";

  // Redirect to login if not authenticated and not on login page
  if (!isAuth && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  // If already authenticated and trying to access login, redirect to home/dashboard
  if (isAuth && isLoginPage) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex transition-colors duration-200 w-full">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 pl-64 min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/result" element={<Result />} />
            <Route path="/history" element={<History />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/editor" element={<CanvasEditor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}