import { motion } from "framer-motion";
import {
  Code2,
  Database,
  BarChart3,
  Rocket,
  MapPin,
  BookOpen,
  TerminalSquare,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import profilePortraitImg from "@/assets/profile-portrait.jpg";
import { useSpotifyTrack } from "@/lib/spotify";

const SpotifyMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-[#1DB954]">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.55c-.19.31-.59.4-.9.21-2.47-1.5-5.58-1.84-9.25-1.01-.35.08-.69-.14-.77-.49a.64.64 0 0 1 .49-.77c4.02-.92 7.43-.52 10.12 1.11.31.18.41.59.31.95zm1.29-2.87c-.24.39-.75.51-1.14.27-2.86-1.76-7.2-2.27-10.53-1.26-.44.13-.9-.11-1.03-.55a.75.75 0 0 1 .55-1.03c3.8-1.15 8.54-.59 11.87 1.46.39.23.51.74.28 1.11zm.11-3.05c-3.46-2.05-9.17-2.24-12.47-1.24-.5.15-1.02-.13-1.17-.63a.85.85 0 0 1 .63-1.17c3.8-1.15 10.08-.93 14.09 1.45.45.26.6.84.34 1.28a.86.86 0 0 1-1.42.31z" />
  </svg>
);

const EqualizerBars = () => (
  <div className="flex items-end gap-0.5 h-3">
    <span className="w-0.5 bg-[#1DB954] animate-[bounce_1s_infinite_100ms] h-full rounded-full" />
    <span className="w-0.5 bg-[#1DB954] animate-[bounce_1s_infinite_300ms] h-2 rounded-full" />
    <span className="w-0.5 bg-[#1DB954] animate-[bounce_1s_infinite_200ms] h-2.5 rounded-full" />
  </div>
);

const highlights = [
  { icon: Code2, label: "Full Stack Development" },
  { icon: Database, label: "Database Design" },
  { icon: BarChart3, label: "Data Analytics" },
  { icon: Rocket, label: "Problem Solving" },
];

const AboutSection = () => {
  const spotifyTrack = useSpotifyTrack();

  const statusCards = [
    {
      icon: MapPin,
      title: "India",
      subtitle: "UTC+5:30",
    },
    {
      title: spotifyTrack.title,
      subtitle: spotifyTrack.isPlaying ? "NOW PLAYING" : "LAST PLAYED",
      artist: spotifyTrack.artist,
      accent: true,
      href: spotifyTrack.songUrl,
      logo: SpotifyMark,
      isSpotify: true,
    },
    {
      icon: TerminalSquare,
      title: "0 hrs yesterday",
      subtitle: "Coded",
    },
    {
      icon: BookOpen,
      title: "Automation & AI",
      subtitle: "Currently learning",
    },
  ];

  return (
    <section id="about" className="py-20 dark:bg-[#02040c] bg-slate-50/70 text-foreground relative overflow-hidden transition-colors duration-300">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-14 h-1 bg-primary rounded-full mb-8" />

          {/* Integrated Layout with Photo on Right */}
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate software engineer with expertise in both full-stack
                  development and data analytics. I love building robust web
                  applications and uncovering insights from data.
                </p>
                <p>
                  With a strong foundation in modern web technologies and data
                  tools, I bring ideas to life through clean code and meaningful
                  visualizations. I'm always eager to learn, collaborate, and
                  take on new challenges.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {highlights.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass-card p-4 flex flex-col items-center text-center gap-2.5 dark:bg-slate-950/60 bg-white/80 dark:border-white/10 border-slate-200/80 hover:glow-border transition-shadow duration-300 shadow-sm"
                  >
                    <Icon size={22} className="text-primary" />
                    <span className="text-xs md:text-sm font-medium text-foreground">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Borderless High-Quality Profile Image */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative group w-full max-w-sm"
              >
                {/* Subtle Ambient Glow Effect Behind Photo */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Borderless Image Wrapper */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] dark:bg-slate-950 bg-slate-900 shadow-2xl">
                  <img
                    src={profilePortraitImg}
                    alt="Developer Portrait"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center contrast-[1.04] brightness-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Soft subtle bottom gradient for text contrast only */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Floating Software Engineer Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3.5 py-1.5 font-mono text-xs text-cyan-300 backdrop-blur-md shadow-lg border border-cyan-500/20">
                      <Sparkles size={13} className="text-cyan-400" /> Software Engineer
                    </span>
                  </div>

                  {/* Floating Bottom Info Pill */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl bg-slate-950/85 p-3.5 backdrop-blur-xl shadow-xl border border-white/10">
                    <p className="font-bold text-sm text-white">Full Stack & Data Analyst</p>
                    <p className="text-xs text-cyan-300 font-mono mt-0.5">Building products with precision</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Status Bar Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-10 rounded-[22px] border dark:border-border/45 border-slate-200/80 dark:bg-background/35 bg-white/80 backdrop-blur-md shadow-sm overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/35">
              {statusCards.map(({ icon: Icon, title, subtitle, artist, accent, href, logo: LogoIcon, isSpotify }, i) => {
                const CardContent = (
                  <>
                    {accent && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(29,185,84,0.15),transparent_45%)]" />
                    )}

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-primary shadow-md">
                      {LogoIcon ? <LogoIcon /> : Icon && <Icon size={18} />}
                    </div>

                    <div className="relative z-10 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80 flex items-center gap-1">
                          {subtitle}
                        </p>
                        {isSpotify && <EqualizerBars />}
                      </div>

                      <div className="mt-0.5 flex items-center gap-1.5 min-w-0">
                        <p className="truncate text-sm font-bold text-foreground">
                          {title}
                        </p>
                        {href && <ExternalLink size={12} className="shrink-0 text-muted-foreground" />}
                      </div>

                      {artist && (
                        <p className="truncate text-[11px] text-[#1DB954] font-medium">
                          {artist}
                        </p>
                      )}
                    </div>
                  </>
                );

                const cardClassName = `group flex items-center gap-3 p-4 md:p-5 ${i === 1 ? "relative" : ""} ${
                  href ? "transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer" : ""
                }`;

                return href ? (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={title}
                    className={cardClassName}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div key={title} className={cardClassName}>
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
