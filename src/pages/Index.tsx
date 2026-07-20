import { lazy, Suspense } from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import GallerySection from "@/components/portfolio/GallerySection";
import ResumeSection from "@/components/portfolio/ResumeSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import Footer from "@/components/portfolio/Footer";

const SkillsSection = lazy(() => import("@/components/portfolio/SkillsSection"));

const SkillsFallback = () => (
  <div id="skills" className="w-full min-h-[500px] flex items-center justify-center py-20 bg-slate-50 dark:bg-[#02050e]">
    <div className="flex flex-col items-center gap-3 font-mono text-cyan-400 text-sm">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      <span className="animate-pulse">Loading Interactive 3D Skill Matrix...</span>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white transition-all duration-300">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <Suspense fallback={<SkillsFallback />}>
        <SkillsSection />
      </Suspense>
      <ProjectsSection />
      <CertificationsSection />
      <GallerySection />
      <ResumeSection />
      <Footer />
    </div>
  );
};

export default Index;
