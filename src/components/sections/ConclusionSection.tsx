"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { name: "GITHUB", url: "https://github.com" },
  { name: "LINKEDIN", url: "https://linkedin.com" },
  { name: "RESUME", url: "#" },
  { name: "EMAIL", url: "mailto:hello@example.com" }
];

export default function ConclusionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1.0"
      )
      .fromTo(
        linksRef.current?.children ? Array.from(linksRef.current.children) : [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.inOut" },
        "-=0.5"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#080706] pt-32 pb-12 px-6 md:px-12 lg:px-24 min-h-[80vh] flex flex-col justify-between relative z-20 overflow-hidden">
      
      {/* Background cinematic gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#FF5A1F]/5 via-[#080706] to-[#080706] pointer-events-none opacity-50"></div>

      <div className="flex-grow flex flex-col justify-center max-w-4xl mx-auto w-full relative z-10 text-center items-center">
        <h1 
          ref={headingRef}
          className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-[#EBE5DC] tracking-tighter mb-10 leading-none"
        >
          LET'S BUILD.
        </h1>
        
        <p 
          ref={textRef}
          className="font-mono text-sm md:text-base text-[#EBE5DC]/60 leading-relaxed max-w-2xl mb-16"
        >
          Dedicated to building useful technology, contributing deeply to open source ecosystems, and always learning. If you're working on something ambitious, I'd love to connect.
        </p>

        <div ref={linksRef} className="flex flex-wrap justify-center gap-8 md:gap-16">
          {links.map((link, i) => (
            <a 
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-mono text-xs md:text-sm tracking-[0.2em] text-[#EBE5DC] uppercase transition-colors duration-300 hover:text-[#FF5A1F]"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#FF5A1F] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>

      <div ref={footerRef} className="mt-24 pt-8 border-t border-[#EBE5DC]/10 flex justify-center w-full relative z-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#EBE5DC]/40">
          Still shipping.
        </p>
      </div>
    </section>
  );
}
