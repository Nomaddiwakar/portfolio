import cloudPdf from "@/assets/cloud-iot-edge-ml.pdf";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2024",
    link: "#",
  },
  {
    title: "Google Data Analytics",
    issuer: "Google / Coursera",
    date: "2024",
    link: "#",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta / Coursera",
    date: "2023",
    link: "#",
  },
  {
    title: "Foundation of Cloud IoT Edge ML",
    issuer: "IOT / NPTEL",
    date: "2025",
    link: cloudPdf,
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 bg-card/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">
              Certifications
            </span>
          </h2>

          <div className="w-16 h-1 bg-primary rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -20 : 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                }}
                className="glass-card p-6 flex items-start gap-4 hover:glow-border transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Award
                    size={24}
                    className="text-primary"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-foreground">
                    {cert.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>

                  <p className="text-xs text-text-dim font-mono mt-1">
                    {cert.date}
                  </p>
                </div>

                {/* Certificate Link */}
                <button
                  onClick={() =>
                    window.open(cert.link, "_blank")
                  }
                  className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                >
                  <ExternalLink size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;