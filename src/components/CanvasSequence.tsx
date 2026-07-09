"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface CanvasSequenceProps {
  frameCount: number;
  drawFrame: (
    ctx: CanvasRenderingContext2D,
    frame: number,
    width: number,
    height: number
  ) => void;
  triggerSelector?: string;
  start?: string;
  end?: string;
  className?: string;
}

export default function CanvasSequence({
  frameCount,
  drawFrame,
  triggerSelector,
  start = "top top",
  end = "+=100%",
  className = "",
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playhead = useRef({ frame: 0 });

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
      drawFrame(ctx, playhead.current.frame, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial draw

    const triggerElement = triggerSelector
      ? document.querySelector(triggerSelector)
      : canvas;

    if (!triggerElement) return;

    const st = ScrollTrigger.create({
      trigger: triggerElement,
      start,
      end,
      scrub: 0.5, // small amount of smoothing
      onUpdate: (self) => {
        // Map progress to frame index
        const targetFrame = Math.round(self.progress * (frameCount - 1));
        
        // Only redraw if frame changes
        if (playhead.current.frame !== targetFrame) {
          playhead.current.frame = targetFrame;
          // Use requestAnimationFrame for smooth drawing
          requestAnimationFrame(() => {
            if (canvasRef.current) {
               drawFrame(ctx, playhead.current.frame, canvas.width, canvas.height);
            }
          });
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      st.kill();
    };
  }, [frameCount, drawFrame, triggerSelector, start, end]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
