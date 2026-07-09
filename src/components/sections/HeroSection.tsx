"use client";

import { useHeroAnimations } from "@/hooks/useScrollAnimations";

export default function HeroSection() {
  const { containerRef, leftHandRef, rightHandRef } = useHeroAnimations();

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* 
        Placeholders for the "Creation of Adam" graphic.
        Left hand (Robot), Right hand (Human).
      */}
      <div 
        ref={leftHandRef}
        className="absolute left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-slate-200/50 rounded-full flex items-center justify-center blur-[2px]"
      >
        <span className="text-slate-500 font-mono text-xl tracking-widest">ROBOT_HAND_IMG</span>
      </div>

      <div 
        ref={rightHandRef}
        className="absolute right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-amber-100/50 rounded-full flex items-center justify-center blur-[2px]"
      >
        <span className="text-amber-700 font-mono text-xl tracking-widest">HUMAN_HAND_IMG</span>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
        <span className="text-sm tracking-[0.3em] uppercase mb-2">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-current animate-pulse" />
      </div>
    </section>
  );
}
