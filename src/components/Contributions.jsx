import { motion } from "framer-motion";

const OrgCard = ({ org, repo, contributions, accent, index }) => {
  const accentColors = {
    green: "border-accent/30 group-hover:border-accent",
    blue: "border-blue-500/30 group-hover:border-blue-500",
    orange: "border-orange-500/30 group-hover:border-orange-500",
    purple: "border-purple-500/30 group-hover:border-purple-500",
    cyan: "border-cyan-500/30 group-hover:border-cyan-500",
    gray: "border-gray-500/30 group-hover:border-gray-500",
  };

  const dotColors = {
    green: "bg-accent",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
    gray: "bg-gray-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`bg-surface/50 border ${accentColors[accent]} p-6 rounded-xl group transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-highlight font-mono">{org}/{repo}</h4>
        <div className={`w-2 h-2 rounded-full ${dotColors[accent]} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}></div>
      </div>
      <ul className="space-y-3">
        {contributions.map((c, i) => (
          <li key={i} className="text-sm text-text-secondary flex items-start">
            <span className="text-accent mr-2">•</span>
            {c}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Heatmap = () => {
  // Mock contribution graph with more realistic clustering
  const rows = 7;
  const cols = 52; // Full year
  const cells = [];
  
  for (let c = 0; c < cols; c++) {
    const isWeekend = c % 4 === 0; // Randomly cluster activity
    for (let r = 0; r < rows; r++) {
      const intensity = Math.random();
      let color = "bg-[#161b22]"; // Empty
      
      // Clustering logic: more activity in "sprints"
      const sprintFactor = Math.sin(c / 2) > 0;
      if (sprintFactor && intensity > 0.3) {
        if (intensity > 0.85) color = "bg-[#39d353]"; 
        else if (intensity > 0.6) color = "bg-[#26a641]";
        else color = "bg-[#0e4429]";
      } else if (intensity > 0.95) {
        color = "bg-[#0e4429]";
      }
      
      cells.push(<div key={`${c}-${r}`} className={`w-2.5 h-2.5 rounded-sm ${color} transition-colors duration-500`}></div>);
    }
  }

  return (
    <div className="mt-20 p-8 bg-surface rounded-2xl border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm font-mono text-text-secondary">krrish175-byte / contributions</div>
        <div className="flex items-center space-x-2 text-[10px] text-text-secondary">
          <span>Less</span>
          <div className="w-2.5 h-2.5 bg-[#161b22] rounded-sm"></div>
          <div className="w-2.5 h-2.5 bg-[#0e4429] rounded-sm"></div>
          <div className="w-2.5 h-2.5 bg-[#26a641] rounded-sm"></div>
          <div className="w-2.5 h-2.5 bg-[#39d353] rounded-sm"></div>
          <span>More</span>
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4 custom-scrollbar">
        {cells}
      </div>
    </div>
  );
};

const Contributions = () => {
  const contributions = [
    {
      org: "mindersec",
      repo: "minder",
      accent: "green",
      contributions: [
        "GitHub API rate-limit handling with metrics",
        "Generalized OIDC : removed Keycloak dependency",
        "Refactored PR actions for multi-VCS support",
        "Fixed flaky TestGrpcConnection CI test using bufconn",
      ],
    },
    {
      org: "fossology",
      repo: "fossology",
      accent: "blue",
      contributions: [
        "SPDX3 API support",
        "License compliance workflow improvements",
        "Memory optimization for large scans",
        "UI navigation and documentation enhancements",
      ],
    },
    {
      org: "llm4s",
      repo: "llm4s",
      accent: "orange",
      contributions: [
        "Composable middleware pipeline",
        "Semantic caching + vector similarity search",
        "Multimodal support (image/audio/video)",
        "OpenTelemetry tracing integration",
      ],
    },
    {
      org: "scalameta",
      repo: "metals",
      accent: "purple",
      contributions: [
        "Memory leaks resolved via bounded caching",
        "LSP spec violations fixed",
        "Worksheet recompilation and environment handling",
      ],
    },
    {
      org: "kubeedge",
      repo: "ianvs",
      accent: "cyan",
      contributions: [
        "Parallel execution architecture : 5-6x speedup",
        "Dataset/config issue fixes",
        "Speculative decoding and cloud-edge LLM routing",
      ],
    },
    {
      org: "RISC-V",
      repo: "riscv-db",
      accent: "gray",
      contributions: [
        "ISA instruction parsing logic improvements",
        "Extension relationship mapping",
        "Database schema optimization for instructions",
      ],
    },
    {
      org: "scala",
      repo: "scala3",
      accent: "purple",
      contributions: [
        "Compiler error reporting enhancements",
        "Standard library documentation fixes",
        "TASTy inspector bug fixes",
      ],
    },
    {
      org: "scalacenter",
      repo: "bloop",
      accent: "orange",
      contributions: [
        "Build server protocol (BSP) fixes",
        "Tracing and observability improvements",
        "CI stabilization for macOS runners",
      ],
    },
    {
      org: "eclipse",
      repo: "sw360",
      accent: "blue",
      contributions: [
        "Vulnerability assessment workflow fixes",
        "REST API enhancement for SBOM import",
        "Frontend navigation improvements",
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-accent mb-4 tracking-widest uppercase">Open Source Contributions</h2>
          <h3 className="text-4xl font-bold text-highlight">60+ pull requests merged across 15+ organizations since December 2024.</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((c, i) => (
            <OrgCard key={i} {...c} index={i} />
          ))}
        </div>

        <Heatmap />
      </div>
    </section>
  );
};

export default Contributions;
