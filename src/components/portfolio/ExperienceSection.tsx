import { motion } from "framer-motion";
import { Dot, Building } from "lucide-react";

const internship = {
  role: "Frontend Developer Intern",
  company: "UNIBLU WEB PVT LTD",
  date: "May 2025 - Jul 2025 · 3 mos",
  description:
    "Worked as a Frontend Developer Intern, contributing to the development of responsive and user-friendly web interfaces. Built and improved UI components using HTML, CSS, JavaScript, and React.js. Collaborated with the development team to implement responsive layouts, fix UI issues, improve styling, and enhance the overall user experience. Gained practical experience with Git, GitHub, version control, and real-world frontend development workflows.",
  responsibilities: [
    "Developed responsive web pages using React.js.",
    "Designed and improved UI components with HTML, CSS, and JavaScript.",
    "Fixed layout, styling, and responsive design issues.",
    "Worked with reusable React components.",
    "Collaborated with developers using Git and GitHub.",
    "Improved website usability and cross-browser compatibility.",
  ],
  technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Git", "GitHub"],
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-8">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Experience
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-border/30 bg-white/6 backdrop-blur-md shadow-lg hover:shadow-2xl px-5 py-6 md:px-8 md:py-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-md">
                  <Building size={28} />
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {internship.role}
                  </h3>
                  <p className="mt-1 text-sm md:text-base font-semibold text-foreground/90">
                    {internship.company}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/75 md:pt-1">
                {internship.date}
              </p>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {internship.description}
            </p>

            <div className="mt-4 grid gap-2 md:gap-3 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground/90 mb-2">Responsibilities</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {internship.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <Dot size={12} className="mt-1 shrink-0 text-muted-foreground/70" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground/90 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {internship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-medium text-white"
                      style={{
                        background: tech === "React.js" ? "linear-gradient(90deg,#61dafb,#2b8cff)" : tech === "JavaScript" ? "linear-gradient(90deg,#f7df1e,#f0c419)" : tech === "HTML5" ? "linear-gradient(90deg,#e44d26,#f16529)" : tech === "CSS3" ? "linear-gradient(90deg,#264de4,#2965f1)" : "linear-gradient(90deg,#6ee7b7,#34d399)"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;