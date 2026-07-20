import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Cpu, Layers } from "lucide-react";

export interface ProjectCaseStudy {
  title: string;
  category: string;
  status: string;
  timeline: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tech: string[];
  github?: string;
  live?: string;
  image: string;
}

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

const ProjectCaseStudyModal = ({ project, onClose }: ProjectCaseStudyModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 bg-slate-950/90 p-6 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl scrollbar-thin"
        >
          {/* Neon Header Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500" />

          {/* Close & Header Bar */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
                  {project.category}
                </span>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-xs text-purple-300">
                  {project.status}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {project.timeline}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:bg-white/15 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Banner Graphic */}
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 h-52 sm:h-64 bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                <Cpu size={14} /> Problem Statement
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Layers size={14} /> Engineering Solution
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Metrics Impact */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-400" /> Key Performance Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                      {m.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Highlights */}
          <div className="mb-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 block">
              Core Architectural Highlights
            </h3>
            <div className="space-y-2">
              {project.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 block">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 flex-wrap">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <ExternalLink size={16} /> Live Application
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition-all"
              >
                <Github size={16} /> View Repository
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectCaseStudyModal;
