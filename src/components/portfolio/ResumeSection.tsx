import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeSection = () => {
  return (
    <section id="resume" className="py-24 bg-card/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="text-gradient">Resume</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8 mx-auto" />

          <div className="glass-card max-w-2xl mx-auto p-10 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-glow-pulse">
              <FileText size={40} className="text-primary" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Download My Resume</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Get a detailed overview of my experience, education, skills, and achievements.
                Available in PDF format.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                to="/resume"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground border border-border hover:border-primary/50 transition-all text-sm font-medium"
              >
                <Eye size={18} />
                View Resume
              </Link>
              <a
                href="/Diwakar_kumar_resume.pdf"
                download="Diwakar_kumar_resume.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground glow-border hover:opacity-90 transition-all text-sm font-medium"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
