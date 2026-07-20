import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  label?: string;
};

const sizeMap = {
  sm: {
    mark: "h-10 w-10 text-lg",
  },
  md: {
    mark: "h-12 w-12 text-xl",
  },
  lg: {
    mark: "h-16 w-16 text-2xl",
  },
} as const;

const Logo = ({
  size = "md",
  className,
  href = "#",
  label = "Diwakar Kumar portfolio home",
}: LogoProps) => {
  const sizes = sizeMap[size];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });
  const tiltX = useTransform(springX, [-10, 10], [-5, 5]);
  const tiltY = useTransform(springY, [-10, 10], [5, -5]);

  return (
    <motion.a
      href={href}
      aria-label={label}
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) * 0.12);
        y.set((event.clientY - centerY) * 0.12);
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
      }}
      className={cn("inline-flex items-center gap-3 select-none", className)}
    >
      <motion.div
        style={{
          rotateX: tiltY,
          rotateY: tiltX,
          boxShadow: isHovered
            ? "0 0 34px rgba(34, 211, 238, 0.42)"
            : "0 0 22px rgba(34, 211, 238, 0.24)",
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)] [transform-style:preserve-3d]",
          sizes.mark
        )}
      >
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-4 bg-cyan-400/10 blur-2xl opacity-80"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.24),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
        <div className="absolute inset-[1px] rounded-2xl border border-cyan-300/10" />
        <motion.span
          style={{ x: springX, y: springY }}
          className="absolute inset-0 flex items-center justify-center font-black tracking-[-0.08em] text-transparent bg-clip-text bg-[linear-gradient(135deg,#f8fdff_0%,#e2f8ff_38%,#2dd4bf_72%,#38bdf8_100%)] drop-shadow-[0_0_12px_rgba(34,211,238,0.42)]"
        >
          D
        </motion.span>
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-2 bottom-2 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
        />
      </motion.div>
    </motion.a>
  );
};

export default Logo;