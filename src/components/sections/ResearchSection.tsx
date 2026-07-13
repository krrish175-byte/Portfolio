"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const papers = [
  {
    title: "Optimizing Large Language Model Inference with Adaptive KV Caching",
    venue: "NeurIPS",
    date: "Dec 2024",
    abstract: "This paper introduces a novel dynamic caching mechanism for Key-Value pairs during autoregressive generation, significantly reducing memory footprint and accelerating inference times across massive architectures.",
    link: "#",
  },
  {
    title: "Decentralized Consensus Mechanisms for High-Throughput Micro-Rollups",
    venue: "IEEE Symposium on Security and Privacy",
    date: "May 2025",
    abstract: "We propose a high-throughput consensus layer tailored for application-specific micro-rollups, maintaining cryptographic security guarantees while achieving near-instant finality for localized transaction sets.",
    link: "#",
  }
];

export default function ResearchSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          }
        }
      );

      // Cards stagger reveal
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#080706] py-32 px-6 md:px-12 lg:px-24 border-t border-[#EBE5DC]/10 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-20">
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-[#EBE5DC] tracking-tight mb-4">
            Research & Publications
          </h2>
          <div className="w-12 h-[2px] bg-[#FF5A1F]"></div>
        </div>

        <div className="flex flex-col gap-8">
          {papers.map((paper, i) => (
            <div 
              key={i}
              ref={el => { if (el) cardsRef.current[i] = el; }}
              className="group flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 md:p-12 rounded-xl border border-[#EBE5DC]/10 bg-[#0A0908] hover:bg-[#0C0B0A] transition-colors duration-500"
            >
              <div className="flex flex-col max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-[#FF5A1F]">
                    {paper.venue}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#EBE5DC]/30"></span>
                  <span className="font-mono text-xs tracking-widest text-[#EBE5DC]/50">
                    {paper.date}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-xl md:text-3xl text-[#EBE5DC] tracking-tight mb-4 group-hover:text-[#FF5A1F] transition-colors duration-300">
                  {paper.title}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-[#EBE5DC]/70">
                  {paper.abstract}
                </p>
              </div>

              <div className="mt-8 lg:mt-0 lg:ml-8 shrink-0">
                <a 
                  href={paper.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-[#EBE5DC] group-hover:text-[#FF5A1F] transition-colors duration-300"
                >
                  Read Paper
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
