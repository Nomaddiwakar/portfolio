import { motion } from "framer-motion";
import SkillsGalaxy from "@/components/portfolio/SkillsGalaxy";
import { Sparkles, Cpu, Globe2 } from "lucide-react";

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-20 md:py-28 dark:bg-[#02050e] bg-slate-50 text-foreground overflow-hidden w-full min-h-screen flex flex-col justify-center transition-colors duration-300">
      {/* Background Cyberpunk Grid & Aurora Blurs spanning 100% full section */}
      <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-purple-500/10 blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          {/* Cyberpunk Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>Interactive 3D Skill Matrix</span>
          </motion.div>

          {/* Futuristic Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight dark:text-white text-slate-900 mb-4"
          >
            Skills <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Beyond Code</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="dark:text-slate-300 text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Building scalable products with modern technologies and AI-powered development.
          </motion.p>

          {/* Feature Highlights Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 flex flex-wrap justify-center items-center gap-4 text-xs font-mono dark:text-slate-400 text-slate-600"
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border dark:border-white/10 border-slate-200/80 dark:bg-white/5 bg-white/90 shadow-sm">
              <Globe2 size={13} className="text-cyan-400" /> Orbiting 3D System
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border dark:border-white/10 border-slate-200/80 dark:bg-white/5 bg-white/90 shadow-sm">
              <Cpu size={13} className="text-purple-400" /> 21 Core Competencies
            </span>
          </motion.div>
        </div>

        {/* 3D Skills Galaxy Universe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-full flex justify-center"
        >
          <SkillsGalaxy />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
