// src/components/HeroSection.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import ThemeToggle from "@/components/ui/ThemeToggle";

const socials = [
  { icon: Github, href: "https://github.com/Nomaddiwakar", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/nomaddiwakar/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/nomaddiwakar/",
    label: "Instagram",
  },
  { icon: Mail, href: "mailto:diwakarkr9294@gmail.com", label: "Email" },
];

const roles = [
  "Full Stack Developer",
  "Data Analyst",
  "Problem Solver",
  "UI Craftsman",
];

// Typewriter hook
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// Magnetic button component
const MagneticButton = ({
  children,
  className,
  href,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  label: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.92 }}
      className={className}
      aria-label={label}
    >
      {children}
    </motion.a>
  );
};

// Floating particle dots for depth (pure CSS hardware accelerated)
const particleData = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  size: (i % 3) * 1.5 + 2,
  left: `${(i * 8.3) % 100}%`,
  top: `${(i * 13 + 5) % 100}%`,
  delay: `${(i * 0.4).toFixed(1)}s`,
  duration: `${(4 + (i % 3) * 1.5).toFixed(1)}s`,
}));

const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {particleData.map((p) => (
      <span
        key={p.id}
        className="absolute rounded-full bg-primary/20 animate-float-particle"
        style={{
          width: p.size,
          height: p.size,
          left: p.left,
          top: p.top,
          animationDelay: p.delay,
          animationDuration: p.duration,
        }}
      />
    ))}
  </div>
);

// Stagger container
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const role = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,hsl(175_70%_50%/0.07),transparent)]" />
      </div>

      <Particles />

      <div className="section-container relative z-10 text-center py-20 sm:py-28 md:py-32">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Badge */}
          {/* Available For Work */}
          <motion.div
            variants={item}
            className="mb-5 w-full flex justify-center"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md hover:border-primary/30 transition-all duration-300">
              {/* Green Dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 shadow-[0_0_15px_#22c55e]"></span>
              </span>

              {/* Text */}
              <span className="text-sm md:text-base text-zinc-300 font-medium tracking-wide">
                Available for work
              </span>
            </div>
          </motion.div>
          <motion.p
            variants={item}
            className="font-mono text-primary text-xs sm:text-sm mb-4 tracking-widest uppercase inline-flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            <span className="text-gradient">Diwakar Kumar</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={item}
            className="h-10 mb-6 flex items-center justify-center"
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-mono">
              {role}
              <span className="inline-block w-0.5 h-6 bg-primary ml-0.5 animate-pulse align-middle" />
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Crafting digital experiences with clean code and meaningful
            insights. Building things that matter.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-4 mb-14"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <MagneticButton
                key={label}
                href={href}
                label={label}
                className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:glow-border border border-border transition-colors duration-200"
              >
                <Icon size={20} />
              </MagneticButton>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-4 mb-16 flex-wrap"
          >
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 28px -4px hsl(175 70% 50% / 0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-border transition-all"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl bg-secondary text-secondary-foreground border border-border hover:border-primary/60 font-semibold text-sm transition-all"
            >
              About Me
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.a
            variants={item}
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs font-mono tracking-widest uppercase opacity-60">
              scroll
            </span>
            <ArrowDown size={22} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
