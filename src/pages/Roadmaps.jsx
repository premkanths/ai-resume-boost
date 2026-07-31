import { useState } from "react";
import { CheckCircle2, Circle, HelpCircle, MapPin, Award, BookOpen, ChevronRight, Lock } from "lucide-react";

export default function Roadmaps() {
  const [activeRoadmap, setActiveRoadmap] = useState("java");
  const [completedNodes, setCompletedNodes] = useState([]);

  const javaNodes = [
    {
      id: "fundamental",
      level: 1,
      title: "Java Basics & Setup",
      description: "Understand the JDK, JRE, and JVM architecture. Master core language syntax, primitive types, loops, and conditional statements.",
      topics: ["JDK vs JRE vs JVM", "Data Types & Variables", "Control Flow Statements", "Arrays & String Handling"],
    },
    {
      id: "oop",
      level: 2,
      title: "Object-Oriented Programming (OOP)",
      description: "Master the building blocks of Java. Implement core OOP pillars: Inheritance, Polymorphism, Encapsulation, and Abstraction.",
      topics: ["Classes & Objects", "Inheritance & Interfaces", "Polymorphism (Overriding/Overloading)", "Abstract Classes"],
    },
    {
      id: "collections",
      level: 3,
      title: "Collections & Exceptions",
      description: "Learn to handle lists, sets, and maps efficiently. Implement safe code execution blocks using Java Exception mechanisms.",
      topics: ["List, Set, Map interfaces", "ArrayList & HashMap internals", "Try-Catch Blocks", "Custom Exceptions"],
    },
    {
      id: "advanced",
      level: 4,
      title: "Advanced Core Concepts",
      description: "Dive into concurrency, multi-tasking, input/output streams, and Lambda functional programming introduced in Java 8+.",
      topics: ["Multithreading & Threads", "Runnable & Thread Pool", "Java Streams API", "Lambdas & Functional Interfaces"],
    },
    {
      id: "enterprise",
      level: 5,
      title: "Spring Boot & Backend Ecosystem",
      description: "Transition into enterprise development. Build RESTful APIs, manage databases with Hibernate/JPA, and configure Spring Boot.",
      topics: ["Spring Core & Dependency Injection", "Spring Boot REST Controller", "Spring Data JPA & Hibernate", "Maven/Gradle dependency management"],
    },
  ];

  const handleToggleNode = (nodeId) => {
    if (completedNodes.includes(nodeId)) {
      setCompletedNodes(completedNodes.filter((id) => id !== nodeId));
    } else {
      setCompletedNodes([...completedNodes, nodeId]);
    }
  };

  const progressPercentage = Math.round((completedNodes.length / javaNodes.length) * 100);

  return (
    <div className="bg-[#fcf8ff] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans min-h-screen">
      <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Pathways
          </span>
          <h1 className="text-4xl font-bold tracking-tight mt-1 text-zinc-900 dark:text-white">
            Skill Roadmaps
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">
            Target your missing career skills and follow structured interactive branch trees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SELECTOR SIDEBAR */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Available Paths
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => setActiveRoadmap("java")}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 text-left ${
                  activeRoadmap === "java"
                    ? "bg-white dark:bg-zinc-900 border-indigo-500 shadow-sm text-indigo-600 dark:text-indigo-400"
                    : "bg-white/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={20} />
                  <div>
                    <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Java Developer</p>
                    <p className="text-[10px] text-zinc-500">{javaNodes.length} Levels • Active</p>
                  </div>
                </div>
                <ChevronRight size={16} />
              </button>

              <div className="w-full flex items-center justify-between p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 text-left select-none opacity-60">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Lock size={20} />
                  <div>
                    <p className="font-bold text-sm">Full-Stack React Dev</p>
                    <p className="text-[10px]">6 Levels • Coming Soon</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 text-left select-none opacity-60">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Lock size={20} />
                  <div>
                    <p className="font-bold text-sm">Data Scientist</p>
                    <p className="text-[10px]">8 Levels • Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN ROADMAP AREA */}
          <div className="lg:col-span-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-sm">
            
            {/* PROGRESS HEADER */}
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <MapPin className="text-indigo-600 dark:text-indigo-400" size={20} />
                  Java Developer Roadmap Tree
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
                  Click a level milestone to mark it completed. Watch your progress grow!
                </p>
              </div>

              <div className="min-w-[180px]">
                <div className="flex items-center justify-between text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300">
                  <span>Completion Progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ROADMAP NODES FLOW (TOP TO BOTTOM) */}
            <div className="relative flex flex-col items-center">
              
              {/* Connector Spine Line */}
              <div className="absolute top-10 bottom-10 w-0.5 bg-zinc-200 dark:bg-zinc-800 -z-10"></div>

              <div className="w-full space-y-12 relative">
                {javaNodes.map((node, index) => {
                  const isCompleted = completedNodes.includes(node.id);
                  return (
                    <div
                      key={node.id}
                      className="flex flex-col md:flex-row items-start md:items-center gap-6 relative"
                    >
                      {/* LEVEL BADGE COUNTER */}
                      <div className="flex items-center justify-center md:mx-auto relative z-10 shrink-0">
                        <button
                          onClick={() => handleToggleNode(node.id)}
                          className={`w-14 h-14 rounded-full border-4 flex flex-col items-center justify-center font-bold text-xs shadow-md select-none transition-all duration-200 focus:outline-none ${
                            isCompleted
                              ? "bg-indigo-600 border-indigo-100 dark:border-indigo-950 text-white"
                              : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400"
                          }`}
                        >
                          <span>Lvl</span>
                          <span className="text-sm font-black">{node.level}</span>
                        </button>
                      </div>

                      {/* CARD CONTENT */}
                      <div
                        onClick={() => handleToggleNode(node.id)}
                        className={`flex-1 w-full bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-white dark:hover:bg-zinc-900 border rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm relative group ${
                          isCompleted
                            ? "border-indigo-500/50 bg-indigo-50/10 dark:bg-indigo-950/5"
                            : "border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        {/* Checkbox Trigger */}
                        <div className="absolute top-4 right-4 text-zinc-400 group-hover:text-indigo-500 transition duration-150">
                          {isCompleted ? (
                            <CheckCircle2 className="text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-950" size={20} />
                          ) : (
                            <Circle size={20} />
                          )}
                        </div>

                        <h3 className="font-extrabold text-base text-zinc-800 dark:text-zinc-200 leading-snug pr-8">
                          {node.title}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
                          {node.description}
                        </p>

                        {/* TOPIC TAGS */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {node.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ROADMAP COMPLETION CAPSTONE */}
              <div className="mt-12 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition duration-200 ${
                  progressPercentage === 100
                    ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-lg animate-bounce"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                }`}>
                  <Award size={22} />
                </div>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-2 tracking-wide uppercase">
                  Capstone Level
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
