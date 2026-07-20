import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumeViewer = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-md px-3 py-2 bg-card/40 hover:bg-card/60 transition"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-2xl font-bold">Resume Preview</h2>
          </div>

          <div className="rounded-lg overflow-hidden border border-border/30 bg-background/60">
            <iframe
              title="Resume"
              src="/Diwakar_kumar_resume.pdf"
              className="w-full h-[70vh] md:h-[80vh]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeViewer;
