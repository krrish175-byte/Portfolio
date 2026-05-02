import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-text-secondary">
            <span className="font-bold text-text-primary">Krrish Biswas</span> · 2026
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/krrish175-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/krrish-biswas-797420380/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:krrishbiswas175@gmail.com"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="text-xs font-mono text-text-secondary">
            Built with React · Tailwind · Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
