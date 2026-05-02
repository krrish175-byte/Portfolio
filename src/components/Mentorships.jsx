import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const MentorshipCard = ({ badge, title, period, stack, description, highlight, link, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    viewport={{ once: true }}
    className="bg-surface border border-border p-8 rounded-2xl relative overflow-hidden group hover:border-accent/50 transition-colors"
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent">
        <ExternalLink size={20} />
      </a>
    </div>

    <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-bold rounded-md mb-4 uppercase tracking-tighter">
      {badge}
    </div>
    <h3 className="text-2xl font-bold mb-1 text-highlight">{title}</h3>
    <div className="text-text-secondary text-sm mb-6 font-medium">{period}</div>
    
    <div className="flex flex-wrap gap-2 mb-6">
      {stack.map((item) => (
        <span key={item} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-text-secondary rounded">
          {item}
        </span>
      ))}
    </div>

    <p className="text-text-secondary mb-8 leading-relaxed">
      {description}
    </p>

    {highlight && (
      <div className="p-4 bg-accent/5 border-l-2 border-accent text-sm text-text-primary italic rounded-r-lg">
        "{highlight}"
      </div>
    )}
  </motion.div>
);

const Mentorships = () => {
  const mentorships = [
    {
      badge: "LFX · OpenSSF",
      title: "Minder Rule Testing & CI Tooling",
      period: "Summer 2026",
      stack: ["Go", "Rego/OPA", "Shell", "GitHub Actions"],
      description: "Building a standalone minder ruletype test CLI command for hermetic, offline rule evaluation. Designed a custom http.RoundTripper mock layer intercepting REST v3 and GraphQL v4 at the HTTP boundary. Implemented a CI pipeline that auto-discovers *.test.yaml files and runs them as parallel matrix jobs on every PR.",
      highlight: "Nominated for mindersec GitHub org membership by mentor Evan Anderson (ex-Google SRE, 15 years) for contributions made before the mentorship even started.",
      link: "https://github.com/mindersec/minder"
    },
    {
      badge: "GSoC · FOSSology",
      title: "CycloneDX Spec 1.7 Upgrade : FOSSology",
      period: "Summer 2026",
      stack: ["PHP", "JSON", "XML", "PHPUnit", "Docker", "REST API"],
      description: "Upgrading FOSSology's CycloneDX agent from spec 1.4 to 1.7. Adding a formal evidence layer separating scanner findings from human clearing decisions. Implementing CycloneDX import support and full PHPUnit test coverage for software supply chain and SBOM tooling.",
      link: "https://github.com/fossology/fossology"
    }
  ];

  return (
    <section id="work" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-accent mb-4 tracking-widest uppercase">Mentorships & Fellowships</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-highlight">
            Selected for two of open source's most <br className="hidden md:block" /> competitive programs simultaneously.
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {mentorships.map((m, i) => (
            <MentorshipCard key={i} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentorships;
