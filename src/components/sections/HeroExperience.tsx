"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const NARRATIVE_TIMESTAMPS = [
  { time: 1.5, text: "TWO SIDES OF THE SAME PROCESS" },
  { time: 3.5, text: "DESIGNED TO CONVERGE" },
  { time: 5.5, text: "THE INTERESTING PART IS THE SPACE BETWEEN." }
];

export default function HeroExperience() {
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);
  const narrativeContainerRef = useRef<HTMLDivElement>(null);
  const identityContainerRef = useRef<HTMLDivElement>(null);
  const textSideLeftRef = useRef<HTMLDivElement>(null);
  const textSideRightRef = useRef<HTMLDivElement>(null);

  const [activeNarrativeIndex, setActiveNarrativeIndex] = useState(-1);
  const [isIdentityRevealed, setIsIdentityRevealed] = useState(false);
  const [sideTextsVisible, setSideTextsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState<"forward" | "reverse">("forward");

  const previousIndexRef = useRef(-1);
  const hasRevealedIdentityRef = useRef(false);
  const isTransitioningRef = useRef(false);

  // Force autoplay on mount to handle browser autoplay policies
  useEffect(() => {
    const fwd = forwardVideoRef.current;
    const rev = reverseVideoRef.current;
    
    if (fwd) {
      fwd.defaultMuted = true;
      fwd.muted = true;
      fwd.playbackRate = 1.25;
      fwd.play().catch(e => console.log("Autoplay prevented by browser", e));
    }
    if (rev) {
      rev.defaultMuted = true;
      rev.muted = true;
      rev.playbackRate = 1.25;
    }
  }, []);

  // Ping-Pong Video Logic
  useEffect(() => {
    const fwdVideo = forwardVideoRef.current;
    const revVideo = reverseVideoRef.current;
    if (!fwdVideo || !revVideo) return;

    const handleFwdEnded = () => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      
      setActiveVideo("reverse");
      revVideo.play().catch(e => console.log("Play prevented", e));
      isTransitioningRef.current = false;
      
      // Safely reset forward video ONLY after React has rendered it invisible
      setTimeout(() => {
        if (fwdVideo) fwdVideo.currentTime = 0;
      }, 150);
    };

    const handleRevEnded = () => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      
      setActiveVideo("forward");
      fwdVideo.play().catch(e => console.log("Play prevented", e));
      isTransitioningRef.current = false;

      // Safely reset reverse video ONLY after it is fully invisible
      setTimeout(() => {
        if (revVideo) revVideo.currentTime = 0;
      }, 150);
    };

    fwdVideo.addEventListener("ended", handleFwdEnded);
    revVideo.addEventListener("ended", handleRevEnded);

    return () => {
      fwdVideo.removeEventListener("ended", handleFwdEnded);
      revVideo.removeEventListener("ended", handleRevEnded);
    };
  }, []);

  // Reduced motion
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleTimeUpdate = () => {
    if (!forwardVideoRef.current) return;
    const currentTime = forwardVideoRef.current.currentTime;
    const duration = forwardVideoRef.current.duration;

    // Narrative logic based on video playback progress
    let newIndex = -1;
    for (let i = NARRATIVE_TIMESTAMPS.length - 1; i >= 0; i--) {
      if (currentTime >= NARRATIVE_TIMESTAMPS[i].time) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== previousIndexRef.current) {
      previousIndexRef.current = newIndex;
      setActiveNarrativeIndex(newIndex);
    }

    if (currentTime >= 0.5 && !sideTextsVisible) {
      setSideTextsVisible(true);
    }

    // Trigger identity reveal near the end of the first forward loop
    if (duration && currentTime >= duration - 0.5 && !hasRevealedIdentityRef.current) {
      hasRevealedIdentityRef.current = true;
      setIsIdentityRevealed(true);
    }
  };



  // GSAP animation for narrative reel
  useEffect(() => {
    if (activeNarrativeIndex < 0 || !narrativeContainerRef.current || isReducedMotion) return;
    
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".narrative-text");
      
      elements.forEach((el, index) => {
        if (index === activeNarrativeIndex) {
          // Incoming
          gsap.fromTo(el, 
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.8, ease: "power3.inOut" }
          );
        } else if (index === previousIndexRef.current - 1 && previousIndexRef.current !== -1) {
          // Outgoing (the one we just left)
          gsap.to(el, 
            { y: "-100%", opacity: 0, duration: 0.7, ease: "power3.inOut" }
          );
        } else if (index !== activeNarrativeIndex) {
          // Any other inactive text should just sit hidden
          gsap.set(el, { opacity: 0, y: "100%" });
        }
      });
    }, narrativeContainerRef);

    return () => ctx.revert();
  }, [activeNarrativeIndex, isReducedMotion]);

  // GSAP animation for side texts (AI/Human)
  useEffect(() => {
    if (!sideTextsVisible || isReducedMotion || !textSideLeftRef.current || !textSideRightRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(textSideLeftRef.current, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
      gsap.to(textSideRightRef.current, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    });

    return () => ctx.revert();
  }, [sideTextsVisible, isReducedMotion]);

  // GSAP animation for final identity reveal
  useEffect(() => {
    if (!isIdentityRevealed || isReducedMotion || !identityContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(".identity-line", 
        { opacity: 0, scale: 1.05, letterSpacing: "0.3em" }, 
        { opacity: 1, scale: 1, letterSpacing: "-0.025em", duration: 2.5, ease: "power3.out" }
      )
      .fromTo(".identity-sub", 
        { opacity: 0, y: 10, filter: "blur(4px)" }, 
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }, 
        "-=0.6"
      )
      .fromTo(".identity-scroll", 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 
        "-=0.4"
      );
    }, identityContainerRef);

    return () => ctx.revert();
  }, [isIdentityRevealed, isReducedMotion]);

  // For reduced motion, immediately reveal identity and disable choreography
  useEffect(() => {
    if (isReducedMotion) {
      setIsIdentityRevealed(true);
      setActiveNarrativeIndex(-1);
    }
  }, [isReducedMotion]);

  return (
    <section className="relative w-full h-[100vh] bg-[#080706] flex items-center justify-center overflow-hidden font-sans">
      
      {/* Subtle Radial Gradient */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[#FF5A1F] opacity-[0.015] rounded-full blur-[100px]" />
      </div>

      {/* Editorial Metadata (Corners) */}
      <div className="absolute inset-0 z-10 p-6 md:p-10 pointer-events-none flex flex-col justify-between">
        <div className="flex justify-between w-full text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-[#EBE5DC]/55">
          <span>KRRISH BISWAS</span>
          <span>PORTFOLIO / 2026</span>
        </div>
        <div className="hidden md:flex justify-between w-full text-xs font-mono tracking-[0.2em] uppercase text-[#EBE5DC]/55">
          <span>CREATIVE ENGINEERING</span>
          <span>01 / HUMAN × MACHINE</span>
        </div>
      </div>

      {/* Main Content Wrapper - Elite Cinematic Setup */}
      <div className="absolute inset-0 z-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#080706]">
        
        {/* Opacity container prevents 0.8 + 0.8 stacking issues */}
        <div className="absolute inset-0 w-full h-full opacity-80 bg-black">
          {/* Fullscreen Video - Forward */}
          <video
            ref={forwardVideoRef}
            src="/assets/hero/Hero.mp4"
            className="absolute inset-0 w-full h-full object-cover contrast-[1.15] saturate-[1.10] brightness-[0.95]"
            style={{ opacity: activeVideo === "forward" ? 1 : 0, zIndex: activeVideo === "forward" ? 2 : 1 }}
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            disablePictureInPicture
          />

          {/* Fullscreen Video - Reverse */}
          <video
            ref={reverseVideoRef}
            src="/assets/hero/Hero_reverse.mp4"
            className="absolute inset-0 w-full h-full object-cover contrast-[1.15] saturate-[1.10] brightness-[0.95]"
            style={{ opacity: activeVideo === "reverse" ? 1 : 0, zIndex: activeVideo === "reverse" ? 2 : 1 }}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          />
        </div>

        {/* Deep Vignette Overlay (Hides blurry edges and draws eye to center) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(8,7,6,0.7)_80%,rgba(8,7,6,1)_100%)]" />

        {/* Film Grain Noise Overlay (Hides AI artifacts and adds cinematic texture) */}
        <div 
          className="absolute inset-0 z-10 opacity-50 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* Aggressive Vignette & Edge Fades (Swallows the logo and frames the focus) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_10%,#080706_90%)] opacity-90" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#080706] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-[#080706] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#080706] via-[#080706]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#080706] to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full max-h-full pointer-events-none">
        
        {/* Phase B: Elite Side Texts */}
        <div className="absolute inset-x-0 top-[20%] md:top-[50%] md:-translate-y-1/2 flex items-center justify-between px-8 md:px-16 overflow-hidden">
          <div ref={textSideLeftRef} className="flex flex-col gap-3 opacity-0 translate-x-[-40px]">
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#FF5A1F]">01</span>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#F5F5F2] uppercase">Machine / System</span>
            <div className="w-12 h-[1px] bg-white/20 mt-1"></div>
          </div>
          <div ref={textSideRightRef} className="flex flex-col items-end gap-3 opacity-0 translate-x-[40px]">
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#FF5A1F]">02</span>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#F5F5F2] uppercase">Human / Intent</span>
            <div className="w-12 h-[1px] bg-white/20 mt-1"></div>
          </div>
        </div>

        {/* Synchronized Narrative Text */}
        {!isReducedMotion && !isIdentityRevealed && (
          <div ref={narrativeContainerRef} className="absolute bottom-[12vh] md:bottom-[8vh] overflow-hidden h-[24px] md:h-[30px] flex items-center justify-center pointer-events-none">
            {NARRATIVE_TIMESTAMPS.map((item, index) => (
              <div 
                key={index}
                className="narrative-text absolute text-[#EBE5DC]/80 text-[10px] md:text-sm font-mono tracking-[0.2em] uppercase whitespace-nowrap opacity-0"
              >
                {item.text}
              </div>
            ))}
          </div>
        )}

        {/* Final Identity Reveal */}
        <div 
          ref={identityContainerRef}
          className={`absolute bottom-[8vh] md:bottom-[5vh] flex flex-col items-center pointer-events-none ${isIdentityRevealed ? 'block' : 'hidden'}`}
        >
          <div className="overflow-hidden mb-2 md:mb-4 px-4 text-center">
            <h1 className="identity-line text-[#F5F5F2] text-[clamp(1.5rem,4vw,3.5rem)] font-sans font-bold uppercase leading-none">
              I BUILD IN THE SPACE BETWEEN.
            </h1>
          </div>
          <div className="identity-sub text-[#EBE5DC]/70 text-[11px] md:text-sm font-sans tracking-wide mb-6 md:mb-8 text-center px-4">
            Software systems, intelligent tools, and experiments by Krrish Biswas.
          </div>
          <div className="identity-scroll text-[#EBE5DC]/40 text-[9px] md:text-xs font-mono tracking-[0.2em] uppercase animate-[pulse_2s_ease-in-out_infinite]">
            SCROLL TO EXPLORE ↓
          </div>
        </div>

      </div>

    </section>
  );
}
