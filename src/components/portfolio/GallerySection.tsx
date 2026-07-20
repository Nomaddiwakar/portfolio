import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, TrendingUp, X, Sparkles } from "lucide-react";

import progressFirstCodeImg from "@/assets/progress-first-code.png";
import progressCommitsImg from "@/assets/progress-commits.png";
import progressLaunchImg from "@/assets/progress-launch.png";
import personalHackathonImg from "@/assets/personal-hackathon.png";

type GalleryTab = "personal" | "progress";

interface GalleryItem {
  id: number;
  tab: GalleryTab;
  caption: string;
  subtitle: string;
  image: string;
  tag: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    tab: "personal",
    caption: "National Tech Hackathon 2024",
    subtitle: "Collaborating with team members on full-stack AI prototypes.",
    image: personalHackathonImg,
    tag: "Event",
  },
  {
    id: 2,
    tab: "personal",
    caption: "Developer Meetup & Tech Talk",
    subtitle: "Networking with engineering leads and discussing scalable cloud architecture.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    tag: "Community",
  },
  {
    id: 3,
    tab: "personal",
    caption: "Open Source Engineering Workshop",
    subtitle: "Demonstrating modern React & WebSockets integration techniques.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    tag: "Workshop",
  },
  {
    id: 4,
    tab: "progress",
    caption: "First Line of Code & Hello World",
    subtitle: "The journey began with curiosity, HTML/CSS foundations, and early terminal scripts.",
    image: progressFirstCodeImg,
    tag: "Milestone",
  },
  {
    id: 5,
    tab: "progress",
    caption: "1,000+ GitHub Commits Milestone",
    subtitle: "Consistent daily coding, building open-source tools, and mastering full-stack algorithms.",
    image: progressCommitsImg,
    tag: "Achievement",
  },
  {
    id: 6,
    tab: "progress",
    caption: "Production Application Launch Day",
    subtitle: "Deploying production-ready MERN & AI applications with 99.9% uptime SLA.",
    image: progressLaunchImg,
    tag: "Production",
  },
];

const tabs: { key: GalleryTab; label: string; icon: typeof Camera }[] = [
  { key: "personal", label: "Personal Highlights", icon: Camera },
  { key: "progress", label: "Developer Progress", icon: TrendingUp },
];

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState<GalleryTab>("progress");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filtered = galleryItems.filter((item) => item.tab === activeTab);

  return (
    <section id="gallery" className="relative py-24 dark:bg-[#02040c] bg-slate-50 text-foreground transition-colors duration-300 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.08),transparent_60%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>Developer Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight dark:text-white text-slate-900 mb-3"
          >
            Photo & <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Progress Gallery</span>
          </motion.h2>

          <p className="dark:text-slate-300 text-slate-600 text-sm md:text-base font-sans">
            A visual timeline of developer milestones, coding achievements, and community events.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex justify-center gap-3 mb-10">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-wider border transition-all duration-300 backdrop-blur-xl ${
                activeTab === key
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-105 font-bold"
                  : "dark:bg-slate-950/60 bg-white/90 dark:text-slate-400 text-slate-600 dark:border-white/10 border-slate-200/80 hover:border-cyan-400/50 hover:text-cyan-400"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl border dark:border-white/10 border-slate-200/80 dark:bg-slate-950/70 bg-white/90 overflow-hidden cursor-pointer hover:border-cyan-400/50 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 backdrop-blur-xl shadow-md"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80" />

                  <span className="absolute top-3 right-3 rounded-full border border-white/15 bg-slate-950/80 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>

                {/* Content Banner */}
                <div className="p-4">
                  <h3 className="text-base font-bold dark:text-white text-slate-900 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
                    {item.caption}
                  </h3>
                  <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-slate-950/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-slate-950 p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-white hover:bg-white/15 transition-all"
              >
                <X size={18} />
              </button>

              <div className="overflow-hidden rounded-2xl border border-white/10 max-h-[60vh] mb-4 bg-slate-900">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.caption}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300 mb-2 inline-block">
                  {selectedImage.tag}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedImage.caption}
                </h3>
                <p className="text-slate-300 text-sm">
                  {selectedImage.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
