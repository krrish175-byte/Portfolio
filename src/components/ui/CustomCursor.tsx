"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show on desktop devices with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for highly optimized rendering without framerate drops
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    
    const xRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  // Separate effect for handling hover states on interactive elements
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    const handleHoverStart = () => {
      setIsHovering(true);
      gsap.to(ring, { 
        scale: 1.5, 
        borderColor: "#FF5A1F", 
        backgroundColor: "rgba(255, 90, 31, 0.1)", 
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      gsap.to(ring, { 
        scale: 1, 
        borderColor: "rgba(235, 229, 220, 0.5)", 
        backgroundColor: "transparent", 
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
    };

    const addListeners = (node: Element) => {
      node.addEventListener("mouseenter", handleHoverStart);
      node.addEventListener("mouseleave", handleHoverEnd);
    };

    const removeListeners = (node: Element) => {
      node.removeEventListener("mouseenter", handleHoverStart);
      node.removeEventListener("mouseleave", handleHoverEnd);
    };

    // Initial query
    const interactiveSelectors = "a, button, input, textarea, select, [role='button']";
    const interactiveElements = document.querySelectorAll(interactiveSelectors);
    interactiveElements.forEach(addListeners);

    // Mutation observer for dynamically added elements (like GSAP pinned sections)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const elements = node.querySelectorAll(interactiveSelectors);
              elements.forEach(addListeners);
              if (node.matches(interactiveSelectors)) {
                addListeners(node);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      interactiveElements.forEach(removeListeners);
      observer.disconnect();
    };
  }, []);

  // Use a class to hide default cursor when our custom one is active
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("custom-cursor-active");
    return () => document.body.classList.remove("custom-cursor-active");
  }, []);

  return (
    <>
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#EBE5DC]/50 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transformOrigin: "center center" }}
      />
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#FF5A1F] pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transformOrigin: "center center" }}
      />
    </>
  );
}
