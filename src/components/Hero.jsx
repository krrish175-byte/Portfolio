import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import profilePic from "../assets/profile.jpg";

const Hero = () => {
  const [terminalText, setTerminalText] = useState("");
  const fullText = [
    "$ whoami",
    "krrish175-byte",
    "",
    "$ cat achievements.txt",
    "✓ GSoC 2026 : FOSSology",
    "✓ LFX 2026 : OpenSSF / Minder",
    "✓ mindersec org member",
    "✓ 60+ PRs across 15+ organizations",
    "✓ Smart India Hackathon finalist",
    "",
    "$ git log --oneline | wc -l",
    "60+",
    "",
    "$ echo \"available for internships\"",
    "available for internships"
  ].join("\n");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>Open to opportunities</span>
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-border shadow-2xl">
                <img 
                  src={profilePic} 
                  alt="Krrish Biswas" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-110"
                  onError={(e) => {
                    e.target.src = "https://github.com/krrish175-byte.png";
                  }}
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-6xl md:text-8xl font-bold mb-2 tracking-tighter">
                Krrish Biswas
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-accent mb-4 font-mono">
                Open-Source Engineer
              </h2>
            </div>
          </div>

          <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
            I build security tooling, CI infrastructure, and developer tools
            that actually get used. GSoC 2026 contributor at FOSSology.
            LFX 2026 mentee at OpenSSF building Minder's rule testing framework.
            60+ PRs merged across 15+ organizations since December 2024.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-all flex items-center group"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
            <a
              href="https://github.com/krrish175-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-border text-text-primary font-bold rounded-lg hover:bg-white/5 transition-all flex items-center"
            >
              <Github className="mr-2" size={18} />
              GitHub ↗
            </a>
          </div>
        </motion.div>

        {/* Right Side - Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-blue-500/50 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-surface border border-border rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-[#1a1a1a] px-4 py-3 border-b border-border flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <div className="flex-1 text-center text-xs text-text-secondary font-mono">
                zsh — 80x24
              </div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed min-h-[350px] whitespace-pre-wrap">
              <span className="text-text-primary">{terminalText}</span>
              <span className="terminal-cursor"></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
