"use client";

import CanvasSequence from "@/components/CanvasSequence";

// Helper to draw a dummy placeholder frame with a color that shifts based on the frame index
const createDrawFrame = (theme: "mobile" | "ecommerce" | "terminal") => {
  return (ctx: CanvasRenderingContext2D, frame: number, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    // Background
    if (theme === "terminal") {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "#00FF41";
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, width - 40, height - 40);
      
      ctx.fillStyle = "#00FF41";
      ctx.font = "16px monospace";
      ctx.fillText(`> Executing frame sequence... [${frame}/100]`, 40, 60);
      
      // Draw some random terminal "bars" based on frame
      for (let i = 0; i < 5; i++) {
        const barWidth = ((frame * (i + 1)) % 100) / 100 * (width - 100);
        ctx.fillRect(40, 100 + i * 30, barWidth, 10);
      }
    } else {
      const isMobile = theme === "mobile";
      const bgOffset = Math.sin(frame * 0.1) * 20;
      
      ctx.fillStyle = isMobile ? `hsl(210, 50%, ${15 + bgOffset}%)` : `hsl(280, 40%, ${20 + bgOffset}%)`;
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      const circleRadius = isMobile ? width * 0.2 : width * 0.3;
      ctx.beginPath();
      ctx.arc(width/2, height/2 + Math.cos(frame * 0.05) * 50, circleRadius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#fff";
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Sequence Frame ${frame}`, width/2, height/2);
    }
  };
};

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

              {/* Canvas Sequence Placeholder */}
              {/* We assign a unique ID so CanvasSequence can use it as a ScrollTrigger target */}
              <div 
                id={`canvas-container-${project.id}`} 
                className={`w-full aspect-video rounded-xl overflow-hidden relative ${
                  isTerminal ? "border border-[#00FF41]/30 shadow-[0_0_20px_rgba(0,255,65,0.1)]" : "bg-slate-900"
                }`}
              >
                <CanvasSequence 
                  frameCount={100} 
                  drawFrame={createDrawFrame(project.theme)}
                  triggerSelector={`#canvas-container-${project.id}`}
                  start="top bottom"
                  end="bottom top"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
