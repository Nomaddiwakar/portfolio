import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, FileText, Code2, BarChart3 } from "lucide-react";
import ProjectCaseStudyModal, { type ProjectCaseStudy } from "./ProjectCaseStudyModal";
import nomadEcommerceImg from "@/assets/nomad-ecommerce.png";
import aiEmergencyImg from "@/assets/ai-emergency.png";
import nimbusTaskImg from "@/assets/nimbus-task.png";

interface CompactProject extends ProjectCaseStudy {
  id: string;
}

const fullStackProjects: CompactProject[] = [
  {
    id: "nomad-ecommerce",
    title: "Nomad E-Commerce Shopping Website",
    category: "Full Stack Development",
    status: "Live / Featured",
    timeline: "2024 • 3 Mos",
    description:
      "A modern online shopping website featuring secure multi-channel payment systems, automated cart checkout, and seamless Shopify Storefront integration.",
    problem:
      "Online shoppers required a frictionless, highly secure payment gateway connected with Shopify catalog sync to prevent cart abandonment.",
    solution:
      "Engineered a responsive React shopping interface connected to Shopify Storefront API and Stripe PCI-compliant webhooks for secure one-click checkout.",
    highlights: [
      "Shopify Storefront API catalog & inventory sync",
      "Secure PCI-compliant Stripe & Shopify payment gateways",
      "Real-time cart management & order tracking",
      "Encrypted customer auth & JWT session security",
    ],
    metrics: [
      { label: "Checkout Speed", value: "<1.2s" },
      { label: "Payment Security", value: "PCI-DSS" },
    ],
    tech: ["React", "Node.js", "Shopify API", "Stripe", "MongoDB"],
    github: "https://github.com/Nomaddiwakar/NomadE-com",
    live: "https://github.com/Nomaddiwakar/NomadE-com",
    image: nomadEcommerceImg,
  },
  {
    id: "ai-emergency",
    title: "AI Emergency Response Optimizer",
    category: "Full Stack Development",
    status: "Featured",
    timeline: "2025 • 4 Mos",
    description:
      "Smart dispatch platform using ML severity predictions and live GIS routing to optimize ambulance response.",
    problem:
      "Call centers faced bottlenecks in prioritizing concurrent calls and routing emergency vehicles.",
    solution:
      "Combined a Python ML severity classifier with a real-time React GIS map dispatch dashboard.",
    highlights: [
      "ML NLP classifier predicting call urgency",
      "Real-time GIS routing traffic telemetry",
      "WebSocket live broadcast for unit dispatch",
      "Historical response heatmaps & analytics",
    ],
    metrics: [
      { label: "Dispatch Latency", value: "-35%" },
      { label: "ML Accuracy", value: "93.4%" },
    ],
    tech: ["React", "Python", "WebSocket", "MongoDB"],
    github: "https://github.com/Nomaddiwakar/Ai-based-emrgency-optimzer",
    live: "https://github.com/Nomaddiwakar/Ai-based-emrgency-optimzer",
    image: aiEmergencyImg,
  },
  {
    id: "nimbus-task",
    title: "Nimbus – Smart Task Manager",
    category: "Full Stack Development",
    status: "Completed",
    timeline: "2024 • 2 Mos",
    description:
      "Nimbus is a modern full-stack task management application that helps users organize projects, manage daily tasks, set priorities, and boost productivity through an intuitive and responsive interface.",
    problem:
      "Users needed a clean, Notion and Linear inspired SaaS tool to manage tasks, set priorities, and track productivity without clutter.",
    solution:
      "Built a MERN-stack task management suite with JWT authentication, priority tagging, Kanban boards, and responsive state synchronization.",
    highlights: [
      "Notion & Linear inspired modern SaaS task interface",
      "Kanban board & drag-and-drop workflow management",
      "Priority tagging, due dates & checklist tracking",
      "JWT secure user authentication & MongoDB storage",
    ],
    metrics: [
      { label: "Sync Latency", value: "<45ms" },
      { label: "Productivity", value: "+35%" },
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    github: "https://github.com/Nomaddiwakar/Nimbus-todo",
    live: "https://github.com/Nomaddiwakar/Nimbus-todo",
    image: nimbusTaskImg,
  },
  {
    id: "hospital-system",
    title: "Smart Hospital Management",
    category: "Full Stack Development",
    status: "Enterprise",
    timeline: "2024 • 3 Mos",
    description:
      "Enterprise medical portal for encrypted patient EHR records, doctor scheduling, and ICU bed telemetry.",
    problem:
      "Manual hospital intake logs caused admission bottlenecks and bed allocation errors.",
    solution:
      "Developed a HIPAA-conscious full-stack platform with role-based access control and bed analytics.",
    highlights: [
      "Encrypted patient record management",
      "Real-time ICU & bed occupancy tracker",
      "Automated appointment booking calendar",
    ],
    metrics: [
      { label: "Intake Speed", value: "3x Faster" },
      { label: "Data Security", value: "100%" },
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    github: "https://github.com/Nomaddiwakar",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
];

const dataAnalystProjects: CompactProject[] = [
  {
    id: "sales-analytics",
    title: "Sales & Financial Analytics",
    category: "Data Analyst",
    status: "Completed",
    timeline: "2024 • 2 Mos",
    description:
      "Automated Python ETL pipeline processing 1M+ sales records into interactive forecasting charts and PDF reports.",
    problem:
      "Raw multi-region sales data lacked unified visualization for customer churn and revenue tracking.",
    solution:
      "Built a Python Pandas ETL pipeline connected to Power BI dashboards and predictive ML models.",
    highlights: [
      "Automated ETL data ingestion pipeline",
      "Interactive KPI dashboards with filters",
      "Predictive revenue time-series models",
    ],
    metrics: [
      { label: "Data Rows", value: "1M+" },
      { label: "Report Speed", value: "+90%" },
    ],
    tech: ["Python", "Pandas", "Power BI", "SQL"],
    github: "https://github.com/Nomaddiwakar",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "customer-churn",
    title: "Customer Churn & Segmentation",
    category: "Data Analyst",
    status: "Completed",
    timeline: "2024 • 2 Mos",
    description:
      "Machine learning clustering model classifying customer behavior and predicting churn probabilities.",
    problem:
      "E-commerce teams could not identify high-risk churn customers prior to subscription cancellation.",
    solution:
      "Trained a Scikit-Learn Random Forest & K-Means model on user engagement features.",
    highlights: [
      "K-Means customer behavioral clustering",
      "Churn probability scoring model",
      "Feature importance visualizations",
    ],
    metrics: [
      { label: "Model F1", value: "0.91" },
      { label: "Retention", value: "+22%" },
    ],
    tech: ["Python", "Scikit-Learn", "Matplotlib", "Jupyter"],
    github: "https://github.com/Nomaddiwakar",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "weather-radar",
    title: "Meteorological Weather Analytics",
    category: "Data Analyst",
    status: "Live",
    timeline: "2025 • 1 Mo",
    description:
      "Atmospheric telemetry dashboard visualizing live meteorological radar maps and storm trend forecasts.",
    problem:
      "Standard weather applications lack granular meteorological telemetry and interactive spatial charts.",
    solution:
      "Combined OpenWeather API telemetry with dynamic atmospheric trend charts.",
    highlights: [
      "Live meteorological API telemetry integration",
      "Severe weather alert triggers",
      "7-day atmospheric trend analytics",
    ],
    metrics: [
      { label: "Refresh Rate", value: "Realtime" },
      { label: "Latency", value: "<150ms" },
    ],
    tech: ["Python", "OpenWeather API", "Recharts", "SQL"],
    github: "https://github.com/Nomaddiwakar",
    live: "https://github.com/Nomaddiwakar",
    image:
      "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=800&q=80",
  },
];

const CompactProjectCard = ({
  project,
  onOpenCaseStudy,
}: {
  project: CompactProject;
  onOpenCaseStudy: (p: ProjectCaseStudy) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative min-h-[360px] h-full flex flex-col justify-between rounded-2xl border dark:border-white/10 border-slate-200/80 dark:bg-slate-950/70 bg-white/90 p-4 shadow-md backdrop-blur-xl hover:border-cyan-400/40 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300 overflow-hidden"
    >
      {/* Top 35% Image Banner */}
      <div className="relative h-36 w-full overflow-hidden rounded-xl bg-slate-900 shrink-0">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <span className="absolute top-2.5 right-2.5 rounded-full border border-white/15 bg-slate-950/85 px-2.5 py-0.5 font-mono text-[10px] font-medium text-cyan-300 backdrop-blur-md">
          {project.status}
        </span>
      </div>

      {/* Content Body */}
      <div className="flex-1 flex flex-col justify-between py-3">
        <div>
          <h3 className="font-bold text-base dark:text-white text-slate-900 tracking-tight group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {project.title}
          </h3>
          <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed line-clamp-2 mb-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-100 px-2 py-0.5 font-mono text-[10px] dark:text-slate-300 text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action Suite */}
      <div className="flex items-center justify-between pt-2.5 border-t dark:border-white/10 border-slate-200/80 shrink-0">
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono dark:text-slate-300 text-slate-700 hover:text-cyan-400 transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
        </div>

        <button
          onClick={() => onOpenCaseStudy(project)}
          className="flex items-center gap-1 text-[11px] font-mono dark:text-purple-300 text-purple-600 hover:text-purple-400 transition-colors"
        >
          <FileText size={13} /> Case Study
        </button>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" className="relative py-20 md:py-28 dark:bg-[#02040c] bg-slate-50 text-foreground transition-colors duration-300 overflow-hidden">
      {/* Cyberpunk Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.1),transparent_45%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.1),transparent_50%)] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Main Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight dark:text-white text-slate-900 mb-3">
            Featured <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-14 h-1 bg-cyan-400 rounded-full mb-4 mx-auto" />
          <p className="dark:text-slate-300 text-slate-600 text-sm md:text-base font-sans">
            Compact overview of full-stack web applications and data analytics solutions.
          </p>
        </div>

        {/* Category 1: Full Stack Development */}
        <div className="mb-16">
          <div className="mb-6 border-b dark:border-white/10 border-slate-200 pb-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900 flex items-center gap-2">
                <Code2 className="text-cyan-400" size={22} /> 💻 Full Stack Development
              </h3>
              <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1">
                Modern web applications built with MERN Stack and scalable backend technologies.
              </p>
            </div>
            <span className="font-mono text-xs dark:text-cyan-300/80 text-cyan-600 font-semibold">
              {fullStackProjects.length} Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullStackProjects.map((p) => (
              <CompactProjectCard
                key={p.id}
                project={p}
                onOpenCaseStudy={setSelectedCaseStudy}
              />
            ))}
          </div>
        </div>

        {/* Category 2: Data Analyst */}
        <div>
          <div className="mb-6 border-b dark:border-white/10 border-slate-200 pb-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900 flex items-center gap-2">
                <BarChart3 className="text-purple-400" size={22} /> 📊 Data Analyst
              </h3>
              <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1">
                Data-driven solutions using Python, SQL, Excel, Power BI, and Machine Learning.
              </p>
            </div>
            <span className="font-mono text-xs dark:text-purple-300/80 text-purple-600 font-semibold">
              {dataAnalystProjects.length} Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataAnalystProjects.map((p) => (
              <CompactProjectCard
                key={p.id}
                project={p}
                onOpenCaseStudy={setSelectedCaseStudy}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <ProjectCaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};

export default ProjectsSection;
