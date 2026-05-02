import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-mono text-accent mb-6 tracking-widest uppercase">About Me</h2>
            <div className="space-y-6 text-xl text-text-secondary leading-relaxed font-medium">
              <p>
                I started contributing to open source in December 2024 and haven't really stopped since. In a few months I went from my first pull request to 60+ merged across 15+ organizations, got selected for Google Summer of Code at FOSSology, and landed an LFX mentorship at OpenSSF — both in the same summer.
              </p>
              <p>
                I don't stick to one stack. I've worked across backend systems, security tooling, CI/CD pipelines, compilers, and AI infrastructure. I built AI Slop Guardian because I think open source deserves better signal-to-noise. I built flake-report because a maintainer asked if someone would, and I said yes.
              </p>
              <p>
                I'm a first-year CS student at Polaris School of Technology, Bengaluru. I care about building things that make other developers' lives less frustrating.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
