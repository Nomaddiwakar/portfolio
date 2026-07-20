import { motion } from "framer-motion";
import type { SkillOrb } from "./SkillsGalaxy";

interface SkillTooltipProps {
  skill: SkillOrb;
  onClose: () => void;
}

const barVariants = {
  hidden: { width: 0 },
  visible: { width: "100%" },
};

const SkillTooltip = ({ skill, onClose }: SkillTooltipProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pointer-events-auto absolute bottom-8 right-8 z-30 max-w-sm rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_40px_90px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80 mb-2">
            Hologram panel
          </p>
          <h3 className="text-2xl font-semibold text-white">{skill.label}</h3>
          <p className="mt-2 text-sm text-slate-300 leading-6">{skill.description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-11 w-11 rounded-3xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/10"
          aria-label="Close skill panel"
        >
          ×
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-3">Experience level</p>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={barVariants}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500"
              style={{ width: skill.level === "Expert" ? "96%" : skill.level === "Advanced" ? "74%" : "58%" }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-3">Related projects</p>
          <ul className="space-y-2 text-sm text-slate-200">
            {skill.projects.map((project) => (
              <li key={project} className="rounded-2xl bg-white/5 px-3 py-2">
                {project}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillTooltip;
