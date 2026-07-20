import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Layers, Sparkles, Code2 } from "lucide-react";
import type { SkillOrb } from "./SkillsGalaxy";

interface SkillModalProps {
  skill: SkillOrb | null;
  onClose: () => void;
}

const getLevelPercentage = (level: string) => {
  switch (level.toLowerCase()) {
    case "expert":
      return 95;
    case "advanced":
      return 85;
    case "proficient":
    default:
      return 75;
  }
};

const SkillModal = ({ skill, onClose }: SkillModalProps) => {
  if (!skill) return null;

  const percentage = getLevelPercentage(skill.level);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Cyberpunk Glass Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-950/80 p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          style={{
            boxShadow: `0 0 50px -10px ${skill.color}33, inset 0 0 20px -5px ${skill.color}22`,
          }}
        >
          {/* Neon Top Edge Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent, ${skill.color}, ${skill.accent}, transparent)`,
            }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 shadow-lg"
                style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
              >
                <Cpu size={24} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
                  {skill.category}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{skill.name}</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/15 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            {skill.description}
          </p>

          {/* Animated Progress Indicator */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles size={14} className="text-cyan-400" /> Mastery Level
              </span>
              <span className="font-mono text-xs font-semibold text-white">
                {skill.level} ({percentage}%)
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.accent})`,
                  boxShadow: `0 0 12px ${skill.color}`,
                }}
              />
            </div>
          </div>

          {/* Related Ecosystem Technologies */}
          {skill.ecosystem && skill.ecosystem.length > 0 && (
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-1.5">
                <Layers size={14} className="text-purple-400" /> Ecosystem & Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {skill.ecosystem.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {skill.projects && skill.projects.length > 0 && (
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-1.5">
                <Code2 size={14} className="text-emerald-400" /> Featured Implementations
              </span>
              <div className="flex flex-wrap gap-2">
                {skill.projects.map((proj) => (
                  <span
                    key={proj}
                    className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-300 font-medium"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SkillModal;
