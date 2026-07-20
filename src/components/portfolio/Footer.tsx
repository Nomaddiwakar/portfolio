import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowUp
} from "lucide-react";

import { useState, useEffect } from "react";
import VisitorCounter from "@/components/portfolio/VisitorCounter";

const socials = [
  {
    icon: Github,
    href: "https://github.com/Nomaddiwakar",
    label: "GitHub",
  },
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
  {
    icon: Mail,
    href: "mailto:diwakarkr9294@gmail.com",
    label: "Email",
  },
];

const Footer = () => {
  const [showTop, setShowTop] =
    useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="border-t border-border py-10 relative bg-[#050505]">

      <div className="section-container flex flex-col items-center gap-6">

        {/* Realtime Live Visitor Counter */}
        <VisitorCounter />

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socials.map(
            ({
              icon: Icon,
              href,
              label,
            }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  y: -3,
                  color:
                    "hsl(175 70% 50%)",
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="text-muted-foreground transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            )
          )}
        </div>

        {/* Footer Text */}
        <p className="font-mono text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary">
            Diwakar Kumar
          </span>
          . Built with ❤️ & React.
        </p>
      </div>

      {/* Scroll To Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 16,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              y: 16,
            }}
            transition={{
              duration: 0.3,
            }}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.93,
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="fixed bottom-8 right-8 w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center z-40"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;