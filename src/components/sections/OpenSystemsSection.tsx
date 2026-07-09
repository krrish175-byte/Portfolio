"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const contributions = [
  {
    src: "minder.png",
    leftMeta: ["ARTIFACT / 06550", "TYPE / PULL REQUEST", "LANGUAGE / GOLANG"],
    rightMeta: ["REPOSITORY / MINDER", "STATE / MERGED", "SYSTEM / RULETEST"],
    archive: { x: "-25vw", y: "-10vh", z: -500, rotate: -5, scale: 0.6 }
  },
  {
    src: "llm4s.png",
    leftMeta: ["ARTIFACT / 06551", "TYPE / PULL REQUEST", "LANGUAGE / SCALA"],
    rightMeta: ["REPOSITORY / LLM4S", "STATE / MERGED", "SYSTEM / CORE"],
    archive: { x: "25vw", y: "-5vh", z: -600, rotate: 8, scale: 0.55 }
  },
  {
    src: "bloop-maven-plugin.png",
    leftMeta: ["ARTIFACT / 06552", "TYPE / PULL REQUEST", "LANGUAGE / SCALA"],
    rightMeta: ["REPOSITORY / BLOOP", "STATE / MERGED", "SYSTEM / PLUGIN"],
    archive: { x: "-30vw", y: "15vh", z: -800, rotate: -12, scale: 0.5 }
  },
  {
    src: "scalacentre.png",
    leftMeta: ["ARTIFACT / 06553", "TYPE / PULL REQUEST", "LANGUAGE / SCALA"],
    rightMeta: ["REPOSITORY / SCALACENTER", "STATE / MERGED", "SYSTEM / TOOLING"],
    archive: { x: "30vw", y: "10vh", z: -700, rotate: 4, scale: 0.5 }
  },
  {
    src: "fossology.png",
    leftMeta: ["ARTIFACT / 06554", "TYPE / PULL REQUEST", "LANGUAGE / PHP"],
    rightMeta: ["REPOSITORY / FOSSOLOGY", "STATE / MERGED", "SYSTEM / SCANNER"],
    archive: { x: "-20vw", y: "-25vh", z: -900, rotate: -8, scale: 0.45 }
  },
  {
    src: "code_diff.png",
    leftMeta: ["ARTIFACT / 06555", "TYPE / METRIC", "LANGUAGE / MULTIPLE"],
    rightMeta: ["REPOSITORY / MINDER", "STATE / 1000+ LINES", "SYSTEM / CORE"],
    archive: { x: "20vw", y: "-20vh", z: -1000, rotate: 10, scale: 0.4 }
  },
  {
    src: "conversation.png",
    leftMeta: ["ARTIFACT / 06556", "TYPE / DISCUSSION", "LANGUAGE / ENGLISH"],
    rightMeta: ["REPOSITORY / MINDER", "STATE / RECOGNITION", "SYSTEM / COMMUNITY"],
    archive: { x: "-35vw", y: "5vh", z: -1100, rotate: -6, scale: 0.4 }
  },
  {
    src: "invitation.png",
    leftMeta: ["ARTIFACT / 06557", "TYPE / INVITATION", "LANGUAGE / N/A"],
    rightMeta: ["REPOSITORY / MINDER", "STATE / ACCEPTED", "SYSTEM / ORG"],
    archive: { x: "35vw", y: "20vh", z: -1200, rotate: 7, scale: 0.35 }
  },
  {
    src: "maintainer.png",
    leftMeta: ["ARTIFACT / 06558", "TYPE / MILESTONE", "LANGUAGE / N/A"],
    rightMeta: ["REPOSITORY / MINDER", "STATE / MAINTAINER", "SYSTEM / ORG"],
    archive: { x: "-15vw", y: "25vh", z: -1300, rotate: -4, scale: 0.35 }
  },
  {
    src: "organizations.png",
    leftMeta: ["ARTIFACT / 06559", "TYPE / ECOSYSTEM", "LANGUAGE / N/A"],
    rightMeta: ["REPOSITORY / MULTIPLE", "STATE / ACTIVE", "SYSTEM / GLOBAL"],
    archive: { x: "15vw", y: "-30vh", z: -1400, rotate: 15, scale: 0.3 }
  }
];

const milestones = ["MERGED / 07", "MERGED / 19", "MERGED / 44", "MERGED / 61", "MERGED / 88"];

export default function OpenSystemsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  // Intro Refs
  const introWrapperRef = useRef<HTMLDivElement>(null);
  const introLabelRef = useRef<HTMLDivElement>(null);
  const introLine1Ref = useRef<HTMLDivElement>(null);
  const introLine2Ref = useRef<HTMLDivElement>(null);

  // Cards
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const scanlineRefs = useRef<HTMLDivElement[]>([]);
  const mergedRefs = useRef<HTMLDivElement[]>([]);

  // Telemetry Refs
  const centerHudRef = useRef<HTMLDivElement>(null);
  const leftMetaRefs = useRef<HTMLDivElement[]>([]);
  const rightMetaRefs = useRef<HTMLDivElement[]>([]);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  // Outro Refs
  const outroWrapperRef = useRef<HTMLDivElement>(null);
  const outroHugeRef = useRef<HTMLDivElement>(null);
  const outroLabelRef = useRef<HTMLDivElement>(null);
  const outroLine1Ref = useRef<HTMLDivElement>(null);
  const outroLine2Ref = useRef<HTMLDivElement>(null);
  
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxWrapperRef.current) return;
      // Normalize mouse coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(parallaxWrapperRef.current, {
        rotationY: x * 8, // slight rotation on Y axis
        rotationX: -y * 8, // slight rotation on X axis
        x: x * 30, // slight translation
        y: y * 30,
        ease: "power2.out",
        duration: 0.5
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !pinnedRef.current || !parallaxWrapperRef.current) return;

    // Media query to disable on prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=30000",
          // A trackpad/Magic Mouse flick can dump a huge, uneven burst of wheel
          // delta at once. With scrub too tight, the timeline instantly snaps to
          // match that scroll position instead of playing through it, so cards
          // blow past and their MERGED/scanline effects never get to register.
          // A larger scrub value forces the playhead to catch up over time
          // instead of jumping, so scroll bursts still land smoothly.
          scrub: 1.5,
          pin: pinnedRef.current,
          anticipatePin: 1,
          refreshPriority: 1,
        }
      });

      // --- 1. INTRO ---
      tl.fromTo(introLabelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(introLine1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2")
        .fromTo(introLine2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2");

      tl.addLabel("introEnd", "+=1.0");

      // Hide intro text
      tl.to([introLabelRef.current, introLine1Ref.current, introLine2Ref.current], { opacity: 0, y: -20, duration: 0.8 }, "introEnd")
        .to(introWrapperRef.current, { opacity: 0, duration: 0.1 }, "introEnd");

      // --- 2. SHOW CENTER HUD ---
      tl.to(centerHudRef.current, { opacity: 1, duration: 0.5 }, "introEnd");

      // Initial states for cards and internal scanlines
      gsap.set(cardsRef.current, {
        x: "0vw",
        y: "50vh",        // Swoop up from slightly below
        z: -1500,         // Start deep in the background
        rotateX: 15,      // Slight tilt
        rotateZ: 0,
        scale: 0.5,
        opacity: 0,
        filter: "grayscale(100%) brightness(0) blur(10px)",
        clipPath: "inset(20% 0% 20% 0%)" // Slightly squashed
      });
      gsap.set(scanlineRefs.current, { top: "0%", opacity: 0 });

      const totalCards = cardsRef.current.length;

      // --- 3. 3D CARDS SEQUENCE ---
      cardsRef.current.forEach((card, i) => {
        // Pacing Acceleration logic:
        const isBurst = i >= totalCards - 4;
        const entryDuration = isBurst ? 0.3 : 1.2;
        const holdDuration = isBurst ? 0.8 : 3.0; // Solid hold duration
        const exitDuration = isBurst ? 0.3 : 1.0;

        // Perfectly calculate the overlap so the next card starts entering EXACTLY when the current card starts its exit
        const prevIsBurst = (i - 1) >= totalCards - 4;
        const prevExitDuration = prevIsBurst ? 0.3 : 1.0;
        const offsetNum = prevExitDuration;
        const positionOffset = i === 0 ? "introEnd" : `-=${offsetNum}`;
        
        const label = `card_${i}`;
        tl.addLabel(label, positionOffset);

        // Core 3D Motion - Entry
        tl.to(card, {
          x: "0vw",
          y: "0vh",
          z: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          filter: "grayscale(0%) brightness(1) blur(0px)",
          clipPath: "inset(0% 0% 0% 0%)",
          duration: entryDuration,
          ease: "power2.out",
        }, label);

        // perfectly calculate offset relative to the label (avoids invalid gsap string like label+=1.2+=3.0)
        const hitCenterOffset = entryDuration;
        const hitCenterTime = `${label}+=${hitCenterOffset}`;
        const archiveOffset = entryDuration + holdDuration;
        const archiveTime = `${label}+=${archiveOffset}`;

        // Localized Scanline sweep (top to bottom)
        tl.to(scanlineRefs.current[i], { opacity: 1, duration: 0.1 }, hitCenterTime)
          .to(scanlineRefs.current[i], { top: "100%", duration: holdDuration * 0.8, ease: "none" }, hitCenterTime)
          .to(scanlineRefs.current[i], { opacity: 0, duration: 0.1 }, `${label}+=${hitCenterOffset + holdDuration * 0.8}`);

        // MERGED text flash inside card
        tl.fromTo(mergedRefs.current[i],
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.2 },
          hitCenterTime
        )
          // Fade out as the card enters the archive
          .to(mergedRefs.current[i], { opacity: 0, duration: exitDuration }, archiveTime);

        // Telemetry Crossfade
        tl.to(leftMetaRefs.current[i], { opacity: 1, duration: 0.2 }, hitCenterTime)
          .to(rightMetaRefs.current[i], { opacity: 1, duration: 0.2 }, hitCenterTime);

        // Counter Milestone Crossfade
        const msIndex = Math.floor(i / 2);
        if (i % 2 === 0 && msIndex < milestones.length) {
          tl.to(counterRefs.current[msIndex], { opacity: 1, duration: 0.3 }, hitCenterTime);
          if (msIndex > 0) {
            tl.to(counterRefs.current[msIndex - 1], { opacity: 0, duration: 0.2 }, label); // fade old counter out as new card starts entering
          }
        }

        // Archival Exit - Card flies away and disappears completely
        tl.to(card, {
          y: "-50vh",
          z: -2000,
          scale: 0.1,
          opacity: 0,
          filter: "grayscale(100%) brightness(0) blur(20px)",
          duration: exitDuration,
          ease: "power2.in"
        }, archiveTime);

        // Fade out telemetry text
        tl.to(leftMetaRefs.current[i], { opacity: 0, duration: 0.2 }, archiveTime)
          .to(rightMetaRefs.current[i], { opacity: 0, duration: 0.2 }, archiveTime);
      });

      // --- 4. GRAND FINALE: THE PULL BACK ---
      const finaleTime = `+=0.5`;

      // Animate ALL cards backwards into the abyss simultaneously
      tl.to(cardsRef.current, {
        z: -3000,
        scale: 0.05,
        opacity: 0,
        filter: "blur(12px)",
        duration: 2.0,
        stagger: 0.05,
        ease: "power3.in"
      }, finaleTime);

      tl.to(centerHudRef.current, { opacity: 0, duration: 0.5 }, finaleTime);
      tl.to(counterRefs.current[milestones.length - 1], { opacity: 0, duration: 0.5 }, finaleTime);

      // --- 5. OUTRO SEQUENCE ---
      tl.to(outroWrapperRef.current, { opacity: 1, duration: 0.1 }, `${finaleTime}+=1.5`);

      tl.fromTo(outroHugeRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power4.out" }
      )
        .fromTo(outroLabelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(outroLine1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "+=0.4")
        .fromTo(outroLine2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "+=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-20 w-full bg-[#080706]">
      <div ref={pinnedRef} className="w-full h-screen overflow-hidden relative flex items-center justify-center font-sans text-[#EBE5DC]">

        {/* --- 1. INTRO WRAPPER --- */}
        <div ref={introWrapperRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div ref={introLabelRef} className="font-mono text-sm tracking-[0.3em] uppercase text-[#FF5A1F] opacity-0 mb-8">
            03 / Open Systems
          </div>
          <div ref={introLine1Ref} className="font-sans font-bold text-2xl md:text-5xl tracking-tight text-[#EBE5DC] opacity-0 mb-4 text-center px-4">
            I STARTED WITH ONE PULL REQUEST.
          </div>
          <div ref={introLine2Ref} className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#EBE5DC]/60 opacity-0 text-center px-4">
            THEN I KEPT SHIPPING.
          </div>
        </div>

        {/* --- 2. 3D ARCHIVE CAROUSEL --- */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" style={{ perspective: "1200px" }}>
          <div ref={parallaxWrapperRef} className="absolute inset-0 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            {contributions.map((c, i) => {
              const isTallImage = c.src === "organizations.png";
              const isWideImage = c.src === "code_diff.png";
              
              let widthClasses = 'w-[80vw] max-w-3xl';
              if (isTallImage) widthClasses = 'w-[85vw] max-w-sm lg:max-w-md';
              // Calculate exact safe area to prevent text overlap: 
              // lg padding is px-24 (96px) + text is ~150px = ~250px per side. 544px total (34rem) leaves a safe margin.
              if (isWideImage) widthClasses = 'w-[calc(100vw-2rem)] md:w-[calc(100vw-20rem)] lg:w-[calc(100vw-34rem)] max-w-7xl';

              return (
                <div
                  key={i}
                  ref={el => { if (el) cardsRef.current[i] = el; }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${widthClasses} h-auto rounded-xl overflow-hidden border border-[#EBE5DC]/10 shadow-2xl opacity-0 transform-gpu will-change-transform bg-[#080706]`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                {/* Localized Scanline */}
                <div 
                  ref={el => { if (el) scanlineRefs.current[i] = el; }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-[#FF5A1F] shadow-[0_0_15px_rgba(255,90,31,0.8)] opacity-0 z-20"
                />
                
                {/* Localized MERGED text */}
                <div
                  ref={el => { if (el) mergedRefs.current[i] = el; }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 font-mono text-xl md:text-3xl tracking-[0.4em] text-[#FF5A1F] font-bold opacity-0 drop-shadow-[0_0_10px_rgba(255,90,31,0.8)] bg-[#080706]/80 px-6 py-3 border border-[#FF5A1F]/30 backdrop-blur-sm"
                >
                  MERGED
                </div>

                <Image
                  src={`/assets/hero/Contributions/${c.src}`}
                  alt={`GitHub Contribution ${i}`}
                  width={isWideImage ? 1920 : 1200}
                  height={isWideImage ? 1080 : 800}
                  className={`w-full ${isTallImage ? 'max-h-[60vh] object-contain' : 'h-auto'} grayscale-[0.5] contrast-125 border border-[#EBE5DC]/5`}
                />
              </div>
            );
          })}
          </div>
        </div>

        <div ref={centerHudRef} className="absolute inset-0 z-30 pointer-events-none hidden md:block opacity-0">
          
          <div className="absolute top-12 right-12 flex flex-col items-end">
            <div className="relative w-32 h-6 flex justify-end">
              {milestones.map((ms, i) => (
                <span
                  key={i}
                  ref={el => { if (el) counterRefs.current[i] = el; }}
                  className="absolute right-0 top-0 font-mono text-sm tracking-[0.2em] text-[#FF5A1F] font-bold opacity-0"
                >
                  {ms}
                </span>
              ))}
            </div>
          </div>

          {/* Left / Right Metadata Telemetry */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between items-center px-12 lg:px-24">
            
            {/* Left side metadata */}
            <div className="relative w-64 h-24 flex flex-col justify-center">
              {contributions.map((c, i) => (
                <div
                  key={`left-${i}`}
                  ref={el => { if (el) leftMetaRefs.current[i] = el; }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0"
                >
                  {c.leftMeta.map((line, j) => (
                    <span key={j} className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-[#EBE5DC]/70">
                      {line}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Right side metadata */}
            <div className="relative w-64 h-24 flex flex-col justify-center items-end text-right">
              {contributions.map((c, i) => (
                <div
                  key={`right-${i}`}
                  ref={el => { if (el) rightMetaRefs.current[i] = el; }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0"
                >
                  {c.rightMeta.map((line, j) => (
                    <span key={j} className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-[#FF5A1F]">
                      {line}
                    </span>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* --- 4. OUTRO WRAPPER --- */}
        <div ref={outroWrapperRef} className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none opacity-0">
          <div className="flex flex-col items-center justify-center w-full">
            <div ref={outroHugeRef} className="text-[30vw] md:text-[20vw] leading-none font-bold tracking-tighter text-[#EBE5DC] opacity-0 mix-blend-difference select-none text-center">
              100+
            </div>
            <div ref={outroLabelRef} className="font-mono text-xs md:text-xl tracking-[0.3em] uppercase text-[#FF5A1F] opacity-0 md:-mt-8 text-center">
              PULL REQUESTS / MERGED
            </div>
          </div>

          <div className="absolute bottom-12 md:bottom-24 w-full flex flex-col items-center gap-3">
            <div ref={outroLine1Ref} className="font-sans font-bold text-lg md:text-3xl tracking-tight text-[#EBE5DC] opacity-0 text-center px-4">
              ACROSS SYSTEMS I DIDN'T OWN.
            </div>
            <div ref={outroLine2Ref} className="font-mono text-[10px] md:text-sm tracking-[0.2em] text-[#EBE5DC]/60 opacity-0 text-center px-4">
              UNTIL I LEARNED HOW TO CHANGE THEM.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

