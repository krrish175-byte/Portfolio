"use client";


const projects = [
  {
    id: "agrilens",
    title: "AgriLens",
    description: "Machine learning crop-scanning diagnostics focused on mobile UI.",
    theme: "mobile" as const,
  },
  {
    id: "campus-thriftx",
    title: "Campus ThriftX",
    description: "Full-stack architecture & e-commerce UI.",
    theme: "ecommerce" as const,
  },
  {
    id: "fossology",
    title: "FOSSology (GSoC)",
    description: "Backend open-source contributions & terminal-style pull request readouts.",
    theme: "terminal" as const,
  },
  {
    id: "openssf",
    title: "OpenSSF Minder (LFX)",
    description: "Cloud-native security readouts.",
    theme: "terminal" as const,
  }
];

export default function EngineeringShowcaseSection() {
  return (
    <section className="relative z-20 w-full bg-[#0A0A0A] text-white pt-32 pb-64">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-32 tracking-tighter">ENGINEERING<br/>SHOWCASE</h2>
        
        {projects.map((project, index) => {
          const isTerminal = project.theme === "terminal";
          
          return (
            <div key={project.id} className="mb-64 relative">
              {/* Text Reveal Block */}
              <div className="mb-12 max-w-2xl">
                <h3 className={`text-3xl md:text-5xl font-bold mb-4 ${isTerminal ? "font-mono text-[#00FF41]" : ""}`}>
                  {isTerminal ? `> ${project.title}_` : project.title}
                </h3>
                <p className={`text-xl opacity-80 ${isTerminal ? "font-mono text-[#00FF41]/80" : ""}`}>
                  {project.description}
                </p>
              </div>


            </div>
          );
        })}
      </div>
    </section>
  );
}
