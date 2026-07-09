"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !leftHandRef.current || !rightHandRef.current) return;

    // Parallax effect: Hands move apart as user scrolls
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(leftHandRef.current, { x: "-20vw", ease: "none" }, 0)
      .to(rightHandRef.current, { 
        x: "20vw", 
        scale: 1.5, 
        rotation: 15, // Human hand rotating and scaling toward camera
        ease: "none" 
      }, 0);

  }, { scope: containerRef });

  return { containerRef, leftHandRef, rightHandRef };
}

export function useIdentityRevealAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);
  const svgPolygonRef = useRef<SVGPolygonElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !colorLayerRef.current || !svgPolygonRef.current) return;

    // Expand the triangle mask
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Pin for 200vh
        scrub: 0.5,
        pin: true,
      },
    });

    // The starting polygon is set in CSS. 
    // We animate to a full screen polygon
    const fullPolygon = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    
    tl.to(colorLayerRef.current, {
      clipPath: fullPolygon,
      ease: "power1.inOut"
    }, 0).to(svgPolygonRef.current, {
      attr: { points: "0,0 100,0 100,100 0,100" },
      ease: "power1.inOut",
      opacity: 0, // Fade out the glowing line as it becomes full screen
    }, 0);

    // Text slide in animation
    gsap.fromTo(".cyber-text-left", 
      { x: "-100%", opacity: 0 },
      {
        x: "0%", 
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      }
    );

    gsap.fromTo(".cyber-text-right", 
      { x: "100%", opacity: 0 },
      {
        x: "0%", 
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      }
    );

  }, { scope: containerRef });

  return { containerRef, colorLayerRef, svgPolygonRef };
}


