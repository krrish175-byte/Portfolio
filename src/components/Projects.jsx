import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ label, title, description, tags, github, external, badge, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    viewport={{ once: true }}
    className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all"
  >
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-wider">{label}</span>
          <h4 className="text-2xl font-bold mt-2 text-highlight group-hover:text-accent transition-colors">{title}</h4>
        </div>
        {badge && (
          <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] text-text-secondary rounded uppercase font-bold tracking-tighter">
            {badge}
          </span>
        )}
      </div>

      <p className="text-text-secondary mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map((tag) => (
          <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 bg-[#1a1a1a] border border-border text-text-secondary rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold text-text-primary hover:text-accent transition-colors">
            <Github size={16} className="mr-2" />
            GitHub ↗
          </a>
        )}
        {external && (
          <a href={external} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold text-text-primary hover:text-accent transition-colors">
            <ExternalLink size={16} className="mr-2" />
            Demo ↗
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      label: "CLI Tool · Go",
      title: "flake-report : Flaky Test Visualizer",
      description: "A standalone Go CLI tool that parses JUnit XML artifacts from GitHub Actions and generates an interactive HTML report ranking flaky tests by a recency-weighted exponential decay score: Σ(failures × 0.6^run_index). Built after identifying persistent CI flakiness in the mindersec/minder test suite. Greenlit by the OpenSSF maintainer himself.",
      tags: ["Go", "JUnit XML", "GitHub Actions", "HTML/JS"],
      github: "https://github.com/krrish175-byte/flake-report",
      badge: "Built for OpenSSF/Minder",
    },
    {
      label: "GitHub App · Node.js",
      title: "AI Slop Guardian",
      description: "A GitHub App that automatically detects and labels AI-generated content in pull requests, issues, and comments. Helps open-source maintainers enforce human-review quality standards and maintain signal-to-noise ratio in contributions.",
      tags: ["Node.js", "GitHub Apps API", "Machine Learning"],
      github: "https://github.com/krrish175-byte/ai-slop-guardian",
    },
    {
      label: "Mobile App · AI/ML",
      title: "AgriLens : Crop Disease Detection",
      description: "AI-driven mobile platform for real-time crop disease detection and nutrient deficiency analysis using deep learning and computer vision. Selected as a finalist for Smart India Hackathon : India's largest national hackathon with 50,000+ participating teams.",
      tags: ["TensorFlow", "OpenCV", "React Native", "Python"],
      badge: "SIH Finalist : 50,000+ teams",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-accent mb-4 tracking-widest uppercase">Projects</h2>
          <h3 className="text-4xl font-bold text-highlight">Things I built because I needed them to exist.</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <ProjectCard {...projects[0]} index={0} />
          </div>
          <ProjectCard {...projects[1]} index={1} />
          <ProjectCard {...projects[2]} index={2} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
