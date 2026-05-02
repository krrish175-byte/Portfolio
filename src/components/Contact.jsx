import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Github, Linkedin, Mail } from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "krrishbiswas175@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-sm font-mono text-accent mb-6 tracking-widest uppercase">Contact</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-highlight mb-8 tracking-tighter">Let's talk.</h3>
          <p className="text-xl text-text-secondary mb-12">
            I'm open to internships, collaborations, and interesting problems.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              onClick={copyToClipboard}
              className="group flex items-center space-x-3 px-8 py-4 bg-surface border border-border rounded-xl hover:border-accent transition-all relative overflow-hidden"
            >
              <Mail className="text-accent" size={20} />
              <span className="font-bold text-text-primary">{email}</span>
              {copied ? (
                <Check className="text-accent" size={18} />
              ) : (
                <Copy className="text-text-secondary group-hover:text-accent transition-colors" size={18} />
              )}
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-background text-xs font-bold px-3 py-1 rounded"
                >
                  Copied!
                </motion.div>
              )}
            </button>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/krrish175-byte"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface border border-border rounded-xl hover:border-accent text-text-secondary hover:text-accent transition-all"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/krrish-biswas-797420380/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface border border-border rounded-xl hover:border-accent text-text-secondary hover:text-accent transition-all"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
