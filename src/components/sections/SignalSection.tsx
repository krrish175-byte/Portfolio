"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const scrambleText = (el: HTMLElement, finalString: string, duration: number) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: 1,
    duration,
    ease: "none",
    onUpdate: () => {
      const progress = obj.value;
      const length = finalString.length;
      const revealCount = Math.floor(progress * length);
      let newStr = "";
      for (let i = 0; i < length; i++) {
        if (i < revealCount) {
          newStr += finalString[i];
        } else if (finalString[i] === " ") {
          newStr += " ";
        } else {
          newStr += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.innerText = newStr;
    }
  });
};

const Fragment = ({ top, right, bottom, left, src, elRef }: any) => (
  <div ref={elRef} className="absolute inset-0 opacity-0">
    <div className="absolute inset-0" style={{ clipPath: `inset(${top} ${right} ${bottom} ${left})` }}>
       <Image src={src} alt="Fragment" fill className="object-contain grayscale-[0.8] contrast-125" />
       <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(255,90,31,0.1),transparent)] opacity-50" />
    </div>
    <div className="absolute border border-[#FF5A1F]/50 z-20 pointer-events-none bg-[#FF5A1F]/5 backdrop-blur-[1px]" style={{ top, right, bottom, left }}>
       <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF5A1F] animate-[pulse_1.5s_ease-in-out_infinite]" />
       <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF5A1F] animate-[pulse_1.5s_ease-in-out_infinite]" />
       <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF5A1F] animate-[pulse_1.5s_ease-in-out_infinite]" />
       <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF5A1F] animate-[pulse_1.5s_ease-in-out_infinite]" />
    </div>
  </div>
);

export default function SignalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Intro
  const introSignalRef = useRef<HTMLDivElement>(null);
  const introStatementRef = useRef<HTMLDivElement>(null);

  // Parallax Targets
  const gsocParallaxRef = useRef<HTMLDivElement>(null);
  const lfxParallaxRef = useRef<HTMLDivElement>(null);

  // GSoC
  const gsocContainerRef = useRef<HTMLDivElement>(null);
  const gsocFullImageRef = useRef<HTMLDivElement>(null);
  const gsocFrag1Ref = useRef<HTMLDivElement>(null);
  const gsocFrag2Ref = useRef<HTMLDivElement>(null);
  const gsocFrag3Ref = useRef<HTMLDivElement>(null);
  const gsocTelemetryRef = useRef<HTMLDivElement>(null);

  // LFX
  const signal02Ref = useRef<HTMLDivElement>(null);
  const lfxContainerRef = useRef<HTMLDivElement>(null);
  const lfxFullImageRef = useRef<HTMLDivElement>(null);
  const lfxFrag1Ref = useRef<HTMLDivElement>(null);
  const lfxFrag2Ref = useRef<HTMLDivElement>(null);
  const lfxFrag3Ref = useRef<HTMLDivElement>(null);
  const lfxTelemetryRef = useRef<HTMLDivElement>(null);

  // Synthesis
  const svgLineRef = useRef<SVGLineElement>(null);
  const svgDotRef = useRef<SVGCircleElement>(null);
  const textTwoRef = useRef<HTMLDivElement>(null);
  const textOneRef = useRef<HTMLDivElement>(null);
  const textOutputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15; // Max 7.5 deg
      const y = (e.clientY / window.innerHeight - 0.5) * -15;
      
      gsap.to([gsocParallaxRef.current, lfxParallaxRef.current], {
        rotationY: x,
        rotationX: y,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Reset initial states manually to avoid flashes before JS runs
    gsap.set(gsocContainerRef.current, { x: 0, z: 0, rotationY: 0, opacity: 1, filter: "blur(0px)" });
    gsap.set(lfxContainerRef.current, { x: 0, z: 0, rotationY: 0, opacity: 1, filter: "blur(0px)" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=30000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // 1. Intro
      tl.to(introSignalRef.current, { opacity: 1, duration: 1 })
        .to(introSignalRef.current, { opacity: 0, duration: 1 }, "+=1")
        .fromTo(introStatementRef.current, { opacity: 0, scale: 0.95 }, { 
          opacity: 1, 
          scale: 1, 
          duration: 2,
          onStart: () => {
            if (introStatementRef.current) scrambleText(introStatementRef.current, "THE WORK LEFT A SIGNAL.", 1.5);
          }
        })
        .to(introStatementRef.current, { opacity: 0, scale: 1.05, duration: 2 }, "+=2");

      // 2. GSoC Reveal
      tl.to(gsocFrag1Ref.current, { opacity: 1, duration: 1 })
        .to(gsocFrag2Ref.current, { opacity: 1, duration: 1 }, "-=0.5")
        .to(gsocFrag3Ref.current, { opacity: 1, duration: 1 }, "-=0.5")
        .addLabel("gsoc_fragments_held", "+=2")
        // Resolve fragments to full image with Glitch
        .to([gsocFrag1Ref.current, gsocFrag2Ref.current, gsocFrag3Ref.current], { opacity: 0, duration: 0.1 }, "gsoc_fragments_held")
        .to(gsocFullImageRef.current, { opacity: 1, duration: 0.1 }, "gsoc_fragments_held")
        .to(gsocTelemetryRef.current, { opacity: 1, duration: 1 }, "gsoc_fragments_held")
        .to(gsocFullImageRef.current, { x: -10, filter: "hue-rotate(90deg) contrast(200%)", duration: 0.05 }, "gsoc_fragments_held")
        .to(gsocFullImageRef.current, { x: 10, filter: "hue-rotate(-90deg) contrast(200%)", duration: 0.05 }, "gsoc_fragments_held+=0.05")
        .to(gsocFullImageRef.current, { x: -5, filter: "brightness(1.5)", duration: 0.05 }, "gsoc_fragments_held+=0.1")
        .to(gsocFullImageRef.current, { x: 0, filter: "none", duration: 0.05 }, "gsoc_fragments_held+=0.15");

      // 3. GSoC Recedes
      tl.addLabel("gsoc_recede", "+=3")
        .to(gsocTelemetryRef.current, { opacity: 0, duration: 1 }, "gsoc_recede")
        .to(gsocContainerRef.current, { 
          x: "-25vw", 
          z: -800, 
          rotationY: 15,
          opacity: 0.4, 
          filter: "grayscale(100%) blur(4px)",
          duration: 3, 
          ease: "power2.inOut" 
        }, "gsoc_recede");

      // 4. LFX Reveal
      tl.to(signal02Ref.current, { opacity: 1, duration: 1 }, "-=1")
        .to(signal02Ref.current, { opacity: 0, duration: 1 }, "+=1")
        .to(lfxFrag1Ref.current, { opacity: 1, duration: 1 })
        .to(lfxFrag2Ref.current, { opacity: 1, duration: 1 }, "-=0.5")
        .to(lfxFrag3Ref.current, { opacity: 1, duration: 1 }, "-=0.5")
        .addLabel("lfx_fragments_held", "+=2")
        // Resolve with Glitch
        .to([lfxFrag1Ref.current, lfxFrag2Ref.current, lfxFrag3Ref.current], { opacity: 0, duration: 0.1 }, "lfx_fragments_held")
        .to(lfxFullImageRef.current, { opacity: 1, duration: 0.1 }, "lfx_fragments_held")
        .to(lfxTelemetryRef.current, { opacity: 1, duration: 1 }, "lfx_fragments_held")
        .to(lfxFullImageRef.current, { x: 10, filter: "hue-rotate(90deg) contrast(200%)", duration: 0.05 }, "lfx_fragments_held")
        .to(lfxFullImageRef.current, { x: -10, filter: "hue-rotate(-90deg) contrast(200%)", duration: 0.05 }, "lfx_fragments_held+=0.05")
        .to(lfxFullImageRef.current, { x: 5, filter: "brightness(1.5)", duration: 0.05 }, "lfx_fragments_held+=0.1")
        .to(lfxFullImageRef.current, { x: 0, filter: "none", duration: 0.05 }, "lfx_fragments_held+=0.15");

      // 5. Synthesis (LFX recedes to right)
      tl.addLabel("lfx_recede", "+=3")
        .to(lfxTelemetryRef.current, { opacity: 0, duration: 1 }, "lfx_recede")
        .to(lfxContainerRef.current, {
          x: "25vw",
          z: -800,
          rotationY: -15,
          opacity: 0.4,
          filter: "grayscale(100%) blur(4px)",
          duration: 3,
          ease: "power2.inOut"
        }, "lfx_recede");

      // 6. Connecting Line & Data Packet
      tl.to(svgLineRef.current, { strokeDashoffset: 0, duration: 2 }, "-=1")
        .to(svgDotRef.current, { opacity: 1, duration: 0.1 }, "-=2")
        .to(svgDotRef.current, { attr: { cx: "75%" }, duration: 2, ease: "power1.inOut" }, "-=2")
        .to(svgDotRef.current, { opacity: 0, duration: 0.2 }, "-=0.2") // Fade dot at end
        .to(textTwoRef.current, { 
          opacity: 1, y: 0, duration: 1,
          onStart: () => {
            if (textTwoRef.current) scrambleText(textTwoRef.current, "TWO PROGRAMS.", 1);
          }
        }, "+=0.5")
        .to(textOneRef.current, { 
          opacity: 1, y: 0, duration: 1,
          onStart: () => {
            if (textOneRef.current) scrambleText(textOneRef.current, "ONE YEAR.", 1);
          }
        }, "+=1")
        .to([gsocContainerRef.current, lfxContainerRef.current, svgLineRef.current, textTwoRef.current, textOneRef.current], {
          opacity: 0, duration: 2
        }, "+=3");

      // 7. The Output Came First
      tl.to(textOutputRef.current, { 
          opacity: 1, duration: 2,
          onStart: () => {
            if (textOutputRef.current) scrambleText(textOutputRef.current, "THE OUTPUT CAME FIRST.", 1.5);
          }
        }, "+=1")
        .to(textOutputRef.current, { opacity: 0, duration: 2 }, "+=2");

    }, containerRef);
    
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#080706] overflow-hidden flex items-center justify-center font-sans text-[#EBE5DC]" style={{ perspective: "1500px" }}>
      
      {/* Intro */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div ref={introSignalRef} className="absolute font-mono text-xs md:text-sm tracking-[0.3em] text-[#FF5A1F] opacity-0">SIGNAL / DETECTED</div>
        <div ref={introStatementRef} className="absolute text-2xl md:text-5xl font-bold tracking-tight opacity-0 text-center px-4 w-full h-12 flex items-center justify-center"></div>
        <div ref={signal02Ref} className="absolute font-mono text-xs md:text-sm tracking-[0.3em] text-[#FF5A1F] opacity-0">SIGNAL / 02</div>
      </div>

      {/* GSoC Document */}
      <div ref={gsocContainerRef} className="absolute w-[85vw] max-w-3xl h-[70vh] md:h-[80vh] z-20 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        <div ref={gsocParallaxRef} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {/* Fragments masked with CSS clip-path */}
          <Fragment elRef={gsocFrag1Ref} src="/assets/hero/Letters/gsoc.png" top="10%" right="10%" bottom="70%" left="10%" />
          <Fragment elRef={gsocFrag2Ref} src="/assets/hero/Letters/gsoc.png" top="40%" right="20%" bottom="40%" left="10%" />
          <Fragment elRef={gsocFrag3Ref} src="/assets/hero/Letters/gsoc.png" top="70%" right="10%" bottom="15%" left="30%" />
          
          <div ref={gsocFullImageRef} className="absolute inset-0 opacity-0 border border-[#EBE5DC]/10 shadow-[0_0_30px_rgba(255,90,31,0.05)] bg-[#080706]">
            <Image src="/assets/hero/Letters/gsoc.png" alt="GSoC Acceptance" fill className="object-contain grayscale-[0.5] contrast-110" />
          </div>

          <div ref={gsocTelemetryRef} className="absolute left-4 bottom-4 md:bottom-auto md:left-auto md:right-full md:mr-8 lg:mr-12 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2 opacity-0 font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#FF5A1F] pointer-events-none drop-shadow-md whitespace-nowrap text-left md:text-right items-start md:items-end z-30">
          <div>PROGRAM / 01</div>
          <div className="text-[#EBE5DC]/70">GOOGLE SUMMER OF CODE</div>
          <div className="text-[#EBE5DC]/70">FOSSOLOGY / 2026</div>
          <div className="mt-4 border border-[#FF5A1F]/50 px-2 py-1 inline-block w-max bg-[#080706]/80 backdrop-blur-sm">STATUS / SELECTED</div>
        </div>
        </div>
      </div>

      {/* LFX Document */}
      <div ref={lfxContainerRef} className="absolute w-[85vw] max-w-3xl h-[70vh] md:h-[80vh] z-20 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        <div ref={lfxParallaxRef} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          <Fragment elRef={lfxFrag1Ref} src="/assets/hero/Letters/lfx.png" top="15%" right="10%" bottom="65%" left="20%" />
          <Fragment elRef={lfxFrag2Ref} src="/assets/hero/Letters/lfx.png" top="45%" right="20%" bottom="35%" left="10%" />
          <Fragment elRef={lfxFrag3Ref} src="/assets/hero/Letters/lfx.png" top="75%" right="10%" bottom="10%" left="30%" />
          
          <div ref={lfxFullImageRef} className="absolute inset-0 opacity-0 border border-[#EBE5DC]/10 shadow-[0_0_30px_rgba(255,90,31,0.05)] bg-[#080706]">
            <Image src="/assets/hero/Letters/lfx.png" alt="LFX Acceptance" fill className="object-contain grayscale-[0.5] contrast-110" />
          </div>

          <div ref={lfxTelemetryRef} className="absolute right-4 bottom-4 md:bottom-auto md:right-auto md:left-full md:ml-8 lg:ml-12 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2 opacity-0 font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#FF5A1F] pointer-events-none drop-shadow-md whitespace-nowrap text-right md:text-left items-end md:items-start z-30">
          <div>PROGRAM / 02</div>
          <div className="text-[#EBE5DC]/70">LFX MENTORSHIP</div>
          <div className="text-[#EBE5DC]/70">MINDER / 2026</div>
          <div className="mt-4 border border-[#FF5A1F]/50 px-2 py-1 inline-block w-max bg-[#080706]/80 backdrop-blur-sm">STATUS / SELECTED</div>
        </div>
        </div>
      </div>

      {/* Synthesis */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <svg className="absolute w-full h-full" preserveAspectRatio="none">
          <line
            ref={svgLineRef}
            x1="25%" y1="50%" x2="75%" y2="50%"
            stroke="#FF5A1F"
            strokeWidth="1"
            strokeDasharray="2000"
            strokeDashoffset="2000"
            className="opacity-50"
          />
          {/* Animated data packet traveling along the line */}
          <circle
            ref={svgDotRef}
            cx="25%"
            cy="50%"
            r="4"
            fill="#FF5A1F"
            className="opacity-0 drop-shadow-[0_0_8px_rgba(255,90,31,0.8)]"
          />
        </svg>
        
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div ref={textTwoRef} className="font-sans font-bold text-3xl md:text-5xl opacity-0 translate-y-4 text-[#EBE5DC] h-12 w-full flex items-center justify-center"></div>
          <div ref={textOneRef} className="font-sans font-bold text-3xl md:text-5xl opacity-0 translate-y-4 text-[#EBE5DC] h-12 w-full flex items-center justify-center"></div>
        </div>
      </div>

      {/* Outro */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div ref={textOutputRef} className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#EBE5DC]/60 opacity-0 h-8 w-full flex items-center justify-center"></div>
      </div>

    </section>
  );
}
