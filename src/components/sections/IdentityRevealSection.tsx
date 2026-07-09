"use client";

import { useIdentityRevealAnimation } from "@/hooks/useScrollAnimations";

export default function IdentityRevealSection() {
  const { containerRef, colorLayerRef, svgPolygonRef } = useIdentityRevealAnimation();

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100vh] bg-[#0A0A0A] overflow-hidden"
    >
      {/* Base Layer: Grayscale and darkened */}
      <div className="absolute inset-0 grayscale brightness-50 bg-slate-900 flex items-center justify-center">
        <span className="text-white/20 font-mono text-2xl tracking-[0.5em] text-center px-4">
          AWAITING_IDENTITY_CONFIRMATION
        </span>
      </div>

      {/* Color Layer: Animated Clip Path */}
      <div 
        ref={colorLayerRef}
        className="absolute inset-0 bg-slate-800 flex items-center justify-center"
        style={{
          // Initial small triangle in the center
          clipPath: "polygon(50% 30%, 35% 60%, 65% 60%)"
        }}
      >
        <span className="text-white font-mono text-3xl font-bold tracking-[0.5em] text-center px-4 mix-blend-overlay">
          IDENTITY_CONFIRMED
        </span>
      </div>

      {/* Glowing SVG Polygon Overlay */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <polygon 
          ref={svgPolygonRef}
          points="50,30 35,60 65,60"
          fill="none"
          stroke="#00FFFF"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Cyberpunk Typography Overlays */}
      <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-10">
        <div className="cyber-text-left flex flex-col gap-2 font-mono text-[#00FFFF]">
          <div className="border border-[#00FFFF]/30 p-4 bg-black/50 backdrop-blur-sm">
            <p className="text-xs opacity-70 mb-1">TARGET_LOCKED</p>
            <p className="text-2xl font-bold tracking-widest">krrish175-byte</p>
          </div>
          <div className="w-16 h-[1px] bg-[#00FFFF]/50"></div>
          <p className="text-[10px] tracking-widest opacity-50">BIOMETRIC_SCAN: MATCH</p>
        </div>

        <div className="cyber-text-right flex flex-col gap-2 font-mono text-white items-end text-right">
          <div className="border border-white/30 p-4 bg-black/50 backdrop-blur-sm">
            <p className="text-xs text-[#00FFFF] mb-1">ROLE</p>
            <p className="text-xl tracking-widest">CREATIVE</p>
            <p className="text-xl tracking-widest">FRONTEND</p>
            <p className="text-xl tracking-widest">ENGINEER</p>
          </div>
        </div>
      </div>
    </section>
  );
}
