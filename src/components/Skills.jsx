import { motion } from "framer-motion";

const SkillCategory = ({ title, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="mb-10"
  >
    <h4 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-6 flex items-center">
      <span className="w-8 h-[1px] bg-border mr-3"></span>
      {title}
    </h4>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <div
          key={skill}
          className="px-4 py-2 bg-surface border border-border rounded-lg font-mono text-sm text-text-primary hover:border-accent hover:text-accent transition-all cursor-default"
        >
          {skill}
        </div>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const categories = [
    {
      title: "Languages",
      skills: ["Go", "Python", "TypeScript", "PHP", "Scala", "C/C++", "Shell"],
    },
    {
      title: "Security & OSS",
      skills: ["Rego/OPA", "CycloneDX", "SPDX", "GitHub Apps", "Supply Chain"],
    },
    {
      title: "Infra & CI",
      skills: ["GitHub Actions", "Docker", "Kubernetes", "Linux", "Nginx"],
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    },
    {
      title: "AI / ML",
      skills: ["TensorFlow", "OpenCV", "NumPy", "Semantic Search", "Vector Embeddings"],
    },
  ];

  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-accent mb-4 tracking-widest uppercase">Technical Stack</h2>
          <h3 className="text-4xl font-bold text-highlight">Equipped for the entire software lifecycle.</h3>
        </div>

        <div className="max-w-4xl">
          {categories.map((cat, i) => (
            <SkillCategory key={i} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
