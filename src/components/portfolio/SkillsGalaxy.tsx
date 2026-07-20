import { Suspense, useMemo, useState } from "react";
import GalaxyScene from "./GalaxyScene";
import SkillModal from "./SkillModal";

export type SkillCategory =
  | "All"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Programming"
  | "Tools"
  | "AI";

export type SkillOrb = {
  name: string;
  label: string;
  category: SkillCategory;
  level: "Expert" | "Advanced" | "Proficient";
  description: string;
  color: string;
  accent: string;
  ecosystem: string[];
  projects: string[];
  position: [number, number, number];
  scale: number;
  orbitRadius: number;
  orbitSpeed: number;
  type:
    | "planet"
    | "cube"
    | "crystal"
    | "orb"
    | "ring"
    | "terminal"
    | "moon"
    | "satellite";
};

export const defaultSkills: SkillOrb[] = [
  // Frontend (Orbit Radius 2.6)
  {
    name: "React",
    label: "React.js",
    category: "Frontend",
    level: "Expert",
    description: "Declarative component arch with Virtual DOM, custom hooks, and concurrent features.",
    color: "#38bdf8",
    accent: "#0284c7",
    ecosystem: ["JSX", "Redux", "Zustand", "Next.js"],
    projects: ["Nomad E-Commerce", "Portfolio Universe"],
    position: [2.6, 0.4, 0.2],
    scale: 1.15,
    orbitRadius: 2.6,
    orbitSpeed: 0.18,
    type: "planet",
  },
  {
    name: "JavaScript",
    label: "JavaScript",
    category: "Frontend",
    level: "Expert",
    description: "Modern ES6+ engine, async event loops, DOM performance, and Web APIs.",
    color: "#facc15",
    accent: "#eab308",
    ecosystem: ["ES6+", "Async/Await", "Promises", "V8 Engine"],
    projects: ["Interactive UX Engine", "AI Response Optimizer"],
    position: [1.3, -0.3, 2.2],
    scale: 1.1,
    orbitRadius: 2.6,
    orbitSpeed: -0.2,
    type: "orb",
  },
  {
    name: "Tailwind CSS",
    label: "Tailwind",
    category: "Frontend",
    level: "Expert",
    description: "Utility-first CSS framework with dynamic theme tokens and responsive layouts.",
    color: "#22d3ee",
    accent: "#06b6d4",
    ecosystem: ["JIT Compiler", "Autoprefixer", "PostCSS"],
    projects: ["Nomad E-Commerce", "Portfolio Theme"],
    position: [-1.3, 0.5, 2.2],
    scale: 1.05,
    orbitRadius: 2.6,
    orbitSpeed: 0.16,
    type: "ring",
  },
  {
    name: "HTML5",
    label: "HTML5",
    category: "Frontend",
    level: "Expert",
    description: "Semantic structure, Canvas 2D/3D API, accessibility standards, and SEO tags.",
    color: "#f97316",
    accent: "#ea580c",
    ecosystem: ["Semantic HTML", "WAI-ARIA", "DOM API"],
    projects: ["Portfolio Vault", "Web Apps"],
    position: [-2.6, -0.4, 0.0],
    scale: 0.95,
    orbitRadius: 2.6,
    orbitSpeed: -0.17,
    type: "orb",
  },
  {
    name: "CSS3",
    label: "CSS3",
    category: "Frontend",
    level: "Expert",
    description: "Advanced animations, Flexbox/Grid systems, glassmorphism, and responsive design.",
    color: "#3b82f6",
    accent: "#1d4ed8",
    ecosystem: ["CSS Grid", "Keyframes", "Custom Properties"],
    projects: ["Modern Web Layouts"],
    position: [-1.3, 0.3, -2.2],
    scale: 0.95,
    orbitRadius: 2.6,
    orbitSpeed: 0.19,
    type: "ring",
  },
  {
    name: "Bootstrap",
    label: "Bootstrap",
    category: "Frontend",
    level: "Advanced",
    description: "Rapid UI prototyping with responsive grid systems and component libraries.",
    color: "#a855f7",
    accent: "#7e22ce",
    ecosystem: ["Sass", "Bootstrap Grid", "UI Kits"],
    projects: ["Dashboard Templates"],
    position: [1.3, -0.5, -2.2],
    scale: 0.9,
    orbitRadius: 2.6,
    orbitSpeed: -0.15,
    type: "cube",
  },

  // Backend (Orbit Radius 3.6)
  {
    name: "Node.js",
    label: "Node.js",
    category: "Backend",
    level: "Advanced",
    description: "Event-driven, non-blocking I/O runtime powering scalable server architectures.",
    color: "#22c55e",
    accent: "#16a34a",
    ecosystem: ["V8", "NPM", "Streams", "Event Loop"],
    projects: ["Nomad E-Commerce API", "Realtime Server"],
    position: [3.1, 0.6, 1.8],
    scale: 1.1,
    orbitRadius: 3.6,
    orbitSpeed: 0.14,
    type: "cube",
  },
  {
    name: "Express.js",
    label: "Express",
    category: "Backend",
    level: "Advanced",
    description: "Fast minimalist RESTful web framework for Node.js API development.",
    color: "#a7f3d0",
    accent: "#34d399",
    ecosystem: ["Middleware", "Router", "JWT Auth"],
    projects: ["Nomad E-Commerce Backend"],
    position: [-1.8, -0.5, 3.1],
    scale: 1.0,
    orbitRadius: 3.6,
    orbitSpeed: -0.13,
    type: "satellite",
  },
  {
    name: "REST API",
    label: "REST API",
    category: "Backend",
    level: "Expert",
    description: "Standardized HTTP API architecture, JSON contracts, rate limiting, and status codes.",
    color: "#f43f5e",
    accent: "#e11d48",
    ecosystem: ["JSON", "HTTP/2", "Swagger", "Postman"],
    projects: ["Emergency Response Optimizer", "Cloud APIs"],
    position: [-3.1, 0.4, -1.8],
    scale: 1.05,
    orbitRadius: 3.6,
    orbitSpeed: 0.15,
    type: "terminal",
  },
  {
    name: "Authentication",
    label: "Auth & Security",
    category: "Backend",
    level: "Advanced",
    description: "JWT, OAuth 2.0, bcrypt hashing, session cookies, and CORS security headers.",
    color: "#eab308",
    accent: "#ca8a04",
    ecosystem: ["JWT", "OAuth", "Bcrypt", "HTTPS"],
    projects: ["User Auth Gateway"],
    position: [1.8, -0.6, -3.1],
    scale: 0.95,
    orbitRadius: 3.6,
    orbitSpeed: -0.12,
    type: "cube",
  },

  // Database (Orbit Radius 4.6)
  {
    name: "MongoDB",
    label: "MongoDB",
    category: "Database",
    level: "Advanced",
    description: "NoSQL document store with aggregation pipelines and flexible JSON schemas.",
    color: "#10b981",
    accent: "#059669",
    ecosystem: ["Mongoose", "Compass", "Atlas", "BSON"],
    projects: ["Nomad E-Commerce", "Analytics Engine"],
    position: [1.2, 0.8, 4.4],
    scale: 1.05,
    orbitRadius: 4.6,
    orbitSpeed: 0.11,
    type: "crystal",
  },
  {
    name: "MySQL",
    label: "MySQL",
    category: "Database",
    level: "Advanced",
    description: "Relational database management with ACID transactions, indexing, and complex SQL JOINs.",
    color: "#0284c7",
    accent: "#0369a1",
    ecosystem: ["SQL", "Workbench", "Relational Schemas"],
    projects: ["Sales Analytics Pipeline"],
    position: [-1.2, -0.8, -4.4],
    scale: 1.0,
    orbitRadius: 4.6,
    orbitSpeed: -0.1,
    type: "orb",
  },

  // Programming (Orbit Radius 5.6)
  {
    name: "Python",
    label: "Python",
    category: "Programming",
    level: "Advanced",
    description: "Data processing, machine learning models, scripting automation, and analytics.",
    color: "#38bdf8",
    accent: "#facc15",
    ecosystem: ["Pandas", "NumPy", "Scikit-Learn", "FastAPI"],
    projects: ["AI Emergency Optimizer", "Data Pipeline"],
    position: [3.9, 0.7, 3.9],
    scale: 1.1,
    orbitRadius: 5.6,
    orbitSpeed: 0.09,
    type: "ring",
  },
  {
    name: "C++",
    label: "C++",
    category: "Programming",
    level: "Advanced",
    description: "High-performance object-oriented programming, memory management, and pointers.",
    color: "#6366f1",
    accent: "#4f46e5",
    ecosystem: ["STL", "Pointers", "OOP", "Memory Allocation"],
    projects: ["Algorithmic Problem Solving"],
    position: [-5.4, -0.6, 1.4],
    scale: 1.0,
    orbitRadius: 5.6,
    orbitSpeed: -0.08,
    type: "crystal",
  },
  {
    name: "C",
    label: "C Language",
    category: "Programming",
    level: "Proficient",
    description: "Low-level procedural programming, hardware interaction, and memory structures.",
    color: "#818cf8",
    accent: "#4338ca",
    ecosystem: ["Pointers", "Data Structures", "GCC"],
    projects: ["Core Computer Science Fundamentals"],
    position: [1.4, 0.5, -5.4],
    scale: 0.95,
    orbitRadius: 5.6,
    orbitSpeed: 0.1,
    type: "orb",
  },

  // Tools (Orbit Radius 6.6)
  {
    name: "Git",
    label: "Git",
    category: "Tools",
    level: "Advanced",
    description: "Distributed version control system, branching strategies, rebasing, and merge resolution.",
    color: "#f97316",
    accent: "#c2410c",
    ecosystem: ["Branching", "Rebase", "Merge", "CLI"],
    projects: ["All Project Repositories"],
    position: [6.3, -0.5, 1.7],
    scale: 1.0,
    orbitRadius: 6.6,
    orbitSpeed: 0.08,
    type: "terminal",
  },
  {
    name: "GitHub",
    label: "GitHub",
    category: "Tools",
    level: "Advanced",
    description: "Collaborative code hosting, Actions CI/CD pipelines, PR code reviews, and releases.",
    color: "#cbd5e1",
    accent: "#64748b",
    ecosystem: ["GitHub Actions", "Pull Requests", "Pages"],
    projects: ["Open Source Portfolio"],
    position: [-1.7, 0.8, 6.3],
    scale: 1.05,
    orbitRadius: 6.6,
    orbitSpeed: -0.07,
    type: "moon",
  },
  {
    name: "VS Code",
    label: "VS Code",
    category: "Tools",
    level: "Expert",
    description: "Primary development workspace, extension ecosystem, and debugging tools.",
    color: "#0284c7",
    accent: "#0369a1",
    ecosystem: ["Extensions", "Debugger", "IntelliSense"],
    projects: ["Daily Engineering Workflow"],
    position: [-6.3, -0.6, -1.7],
    scale: 0.95,
    orbitRadius: 6.6,
    orbitSpeed: 0.085,
    type: "cube",
  },
  {
    name: "Postman",
    label: "Postman",
    category: "Tools",
    level: "Advanced",
    description: "API testing, automated request suites, mock servers, and environment profiles.",
    color: "#f97316",
    accent: "#ea580c",
    ecosystem: ["API Testing", "Collections", "Mock Servers"],
    projects: ["API Integration Suite"],
    position: [1.7, 0.5, -6.3],
    scale: 0.95,
    orbitRadius: 6.6,
    orbitSpeed: -0.075,
    type: "satellite",
  },

  // AI (Orbit Radius 7.6)
  {
    name: "ChatGPT",
    label: "ChatGPT & GPT-4o",
    category: "AI",
    level: "Expert",
    description: "Prompt engineering, architectural brainstorming, code debugging, and automation.",
    color: "#10b981",
    accent: "#047857",
    ecosystem: ["GPT-4o", "Prompt Engineering", "APIs"],
    projects: ["AI Emergency Assistant", "Automated Workflows"],
    position: [4.8, 0.8, 5.8],
    scale: 1.1,
    orbitRadius: 7.6,
    orbitSpeed: 0.06,
    type: "orb",
  },
  {
    name: "Claude",
    label: "Claude 3.5 Sonnet",
    category: "AI",
    level: "Expert",
    description: "Deep code analysis, complex refactoring, technical writing, and logic verification.",
    color: "#d97706",
    accent: "#b45309",
    ecosystem: ["Anthropic API", "Code Synthesis", "Reasoning"],
    projects: ["Full-Stack Code Generation"],
    position: [-5.8, -0.6, 4.8],
    scale: 1.1,
    orbitRadius: 7.6,
    orbitSpeed: -0.055,
    type: "crystal",
  },
  {
    name: "GitHub Copilot",
    label: "Copilot",
    category: "AI",
    level: "Expert",
    description: "Real-time AI autocompletion, context-aware code suggestions, and unit test generation.",
    color: "#a855f7",
    accent: "#7e22ce",
    ecosystem: ["AI Inline Completion", "Copilot Chat"],
    projects: ["Accelerated Feature Velocity"],
    position: [-4.8, 0.7, -5.8],
    scale: 1.0,
    orbitRadius: 7.6,
    orbitSpeed: 0.065,
    type: "satellite",
  },
  {
    name: "Antigravity IDE",
    label: "Antigravity IDE",
    category: "AI",
    level: "Expert",
    description: "Advanced Agentic Coding assistant for full-stack system architecture and automated pair programming.",
    color: "#ec4899",
    accent: "#be185d",
    ecosystem: ["Agentic AI", "Subagents", "Custom Skills"],
    projects: ["Engineer Digi Vault Portfolio"],
    position: [5.8, -0.8, -4.8],
    scale: 1.15,
    orbitRadius: 7.6,
    orbitSpeed: -0.06,
    type: "planet",
  },
];

const categories: SkillCategory[] = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Programming",
  "Tools",
  "AI",
];

const SkillsGalaxy = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("All");
  const [activeSkill, setActiveSkill] = useState<SkillOrb | null>(null);
  const [pointer, setPointer] = useState<[number, number]>([0, 0]);

  const skills = useMemo(() => defaultSkills, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    setPointer([x, y]);
  };

  return (
    <div className="relative w-full">
      {/* Category Filter Controls */}
      <div className="mb-6 flex overflow-x-auto scrollbar-none flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-2 md:gap-3 z-30 relative px-2 py-1 max-w-full">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-mono tracking-wider transition-all duration-300 backdrop-blur-xl border ${
                isActive
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105 font-bold"
                  : "dark:border-white/10 border-slate-200/80 dark:bg-slate-950/60 bg-white/90 dark:text-slate-400 text-slate-600 hover:border-cyan-400/50 hover:text-cyan-400"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3D Canvas Container */}
      <div
        className="relative h-[55vh] sm:h-[65vh] md:h-[70vh] min-h-[360px] sm:min-h-[460px] max-h-[800px] w-full rounded-[1.8rem] sm:rounded-[2.5rem] border border-white/15 bg-[#030712]/90 shadow-[0_50px_140px_rgba(0,0,0,0.7)] backdrop-blur-3xl flex flex-col justify-between"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setPointer([0, 0])}
      >
        {/* Deep Cyberpunk Aurora Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.15),transparent_35%),radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.15),transparent_40%),radial-gradient(circle_at_center,_rgba(6,182,212,0.08),transparent_55%)] pointer-events-none" />

        {/* 3D R3F Galaxy Scene */}
        <div className="relative h-full w-full">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center font-mono text-cyan-400 text-sm">
                <span className="animate-pulse">Loading 3D Tech Universe...</span>
              </div>
            }
          >
            <GalaxyScene
              skills={skills}
              onSelect={setActiveSkill}
              activeSkill={activeSkill}
              pointer={pointer}
              selectedCategory={selectedCategory}
            />
          </Suspense>
        </div>

        {/* Cyberpunk Status Overlay Footnote */}
        <div className="relative z-20 pointer-events-none flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-mono gap-2 border-t border-white/10 px-6 py-3 bg-slate-950/40 backdrop-blur-md rounded-b-[2.5rem]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Interactive 3D Orbit • Hover & Click Planets</span>
          </div>
          <div className="text-cyan-300/80">
            {skills.length} Tech Nodes Active Across {categories.length - 1} Specializations
          </div>
        </div>
      </div>

      {/* Glassmorphism Detail Modal */}
      <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />
    </div>
  );
};

export default SkillsGalaxy;
