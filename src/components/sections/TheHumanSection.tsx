"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const chars = "!<>-_\\\\/[]{}—=+*^?#________";

function scrambleText(element: HTMLElement, targetText: string, duration = 400) {
  const start = performance.now();
  let frame: number;

  const update = (time: number) => {
    const progress = Math.min((time - start) / duration, 1);
    
    if (progress >= 1) {
      element.innerText = targetText;
      return;
    }
    
    let result = "";
    for (let i = 0; i < targetText.length; i++) {
      if (targetText[i] === " ") {
        result += " ";
      } else if (progress > (i / targetText.length)) {
        // As progress moves forward, resolve characters from left to right roughly
        if (Math.random() < 0.2) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += targetText[i];
        }
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    element.innerText = result;
    frame = requestAnimationFrame(update);
  };
  
  frame = requestAnimationFrame(update);
  return () => cancelAnimationFrame(frame);
}

export default function TheHumanSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  
  const introLabelRef = useRef<HTMLDivElement>(null);
  
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const portraitMaskRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLDivElement>(null);
  const portraitZoomRef = useRef<HTMLDivElement>(null);
  const trackingBoxRef = useRef<HTMLDivElement>(null);
  const trackingBoxLines = useRef<HTMLDivElement[]>([]);
  const subjectLabelRef = useRef<HTMLDivElement>(null);
  
  const nameKrrishRef = useRef<HTMLHeadingElement>(null);
  const nameBiswasRef = useRef<HTMLHeadingElement>(null);
  const scrambleRef = useRef<HTMLDivElement>(null);
  
  const statementsRef = useRef<HTMLDivElement[]>([]);
  
  const exitOverlayRef = useRef<HTMLDivElement>(null);
  const exitText1Ref = useRef<HTMLDivElement>(null);
  const exitText2Ref = useRef<HTMLDivElement>(null);
  const blackoutRef = useRef<HTMLDivElement>(null);

  const leftLinesRef = useRef<HTMLDivElement[]>([]);
  const leftTextsRef = useRef<HTMLDivElement[]>([]);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (horizontalLineRef.current) {
        gsap.to(horizontalLineRef.current, {
          y: e.clientY - window.innerHeight / 2,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const signals = ["BUILDING", "EXPLORING", "PROBABLY OVERTHINKING", "SHIPPING ANYWAY"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % signals.length;
      if (signalRef.current) {
        scrambleText(signalRef.current, signals[currentIndex], 600);
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !pinnedRef.current) return;

    // Media query to disable on prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Continuous breathing zoom
      gsap.to(portraitZoomRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000", // Long scroll distance for the entire sequence
          scrub: 1,
          pin: pinnedRef.current,
          anticipatePin: 1,
          refreshPriority: 1,
        }
      });

      // --- 1. ENTRY ---
      // Transition from dark to reveal the section label
      tl.fromTo(introLabelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      .to(introLabelRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, "+=0.2");

      // --- 2. PORTRAIT REVEAL ---
      // Start with a narrow slice at the eyes (approx 45% to 55%)
      tl.fromTo(portraitMaskRef.current,
        { clipPath: "inset(48% 0 48% 0)" },
        { clipPath: "inset(0% 0 0% 0)", duration: 1.5, ease: "power3.inOut" }
      )
      .fromTo(portraitImageRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 1.5, ease: "power3.inOut" },
        "<"
      );

      // --- 2.5. LEFT SCANLINES REVEAL ---
      if (leftLinesRef.current.length > 0) {
        tl.fromTo(leftLinesRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=1.0" // Start while portrait is revealing
        )
        .fromTo(leftTextsRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.2 },
          "<"
        )
        .to([...leftLinesRef.current, ...leftTextsRef.current], {
          opacity: 0.15,
          duration: 1
        }, "+=0.2");
      }

      // --- 3. TRACKING BOX & LABEL ---
      // Draw the 4 lines of the tracking box
      if (trackingBoxLines.current.length === 4) {
        tl.fromTo(trackingBoxLines.current[0], { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.3 }, "-=0.5") // Top
          .fromTo(trackingBoxLines.current[1], { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.3 }, "<")   // Right
          .fromTo(trackingBoxLines.current[2], { scaleX: 0, transformOrigin: "right" }, { scaleX: 1, duration: 0.3 }, "<")  // Bottom
          .fromTo(trackingBoxLines.current[3], { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.3 }, "<"); // Left
      }
      tl.fromTo(subjectLabelRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.2");

      // --- 4. LARGE NAME REVEAL ---
      tl.fromTo(nameKrrishRef.current, 
        { y: "100%" }, 
        { y: "0%", duration: 0.8, ease: "power3.out" }, 
        "+=0.2"
      )
      .fromTo(nameBiswasRef.current, 
        { y: "100%" }, 
        { y: "0%", duration: 0.8, ease: "power3.out" }, 
        "-=0.6"
      );

      // --- 5. SCRAMBLE TEXT REVEAL ---
      tl.call(() => {
        if (scrambleRef.current) {
          scrambleText(scrambleRef.current, "CREATIVE ENGINEER / CS × AI", 400);
        }
      }, [], "+=0.1");
      tl.fromTo(scrambleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, "<");

      // --- 6. STATEMENTS SEQUENCE ---
      // Fade out names to make room
      tl.to([nameKrrishRef.current, nameBiswasRef.current, scrambleRef.current], { opacity: 0.1, duration: 0.5 }, "+=0.8");

      statementsRef.current.forEach((stmt) => {
        if (!stmt) return;
        tl.fromTo(stmt, 
          { opacity: 0, clipPath: "inset(0 100% 0 0)" }, 
          { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
        )
        .to(stmt, { opacity: 0, y: -10, duration: 0.5, ease: "power2.in" }, "+=0.8");
      });

      // --- 7. EXIT SEQUENCE ---
      // Darken everything else, expand the portrait container to full screen, and zoom the image
      tl.to(exitOverlayRef.current, { opacity: 1, duration: 1 }, "+=0.2")
        .to(portraitContainerRef.current, { maxWidth: "100vw", height: "100vh", duration: 1.5, ease: "power3.inOut" }, "<")
        .to(portraitMaskRef.current, { maxWidth: "100vw", duration: 1.5, ease: "power3.inOut" }, "<")
        .to(portraitImageRef.current, { scale: 1.2, filter: "blur(10px)", duration: 1.5, ease: "power3.inOut" }, "<");
      
      // Expand tracking box to viewport
      tl.to(trackingBoxRef.current, {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderWidth: "2px",
        duration: 1.5,
        ease: "power3.inOut"
      }, "<");
      
      tl.to(subjectLabelRef.current, { opacity: 0, duration: 0.3 }, "<");

      // Final texts
      tl.fromTo(exitText1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(exitText2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "+=0.5");

      // --- 8. CINEMATIC BLACKOUT TO NEXT SECTION ---
      // The screen gets sucked into the void
      tl.to(portraitImageRef.current, { scale: 2, filter: "blur(30px) brightness(0)", duration: 1.5, ease: "power2.in" }, "+=0.5")
        .to(trackingBoxRef.current, { scale: 1.5, opacity: 0, duration: 1.5, ease: "power2.in" }, "<")
        .to([exitText1Ref.current, exitText2Ref.current], { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 1 }, "<0.2")
        .to(blackoutRef.current, { opacity: 1, duration: 0.5 }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#080706]">
      {/* Pinned Viewport Container */}
      <div ref={pinnedRef} className="w-full h-screen overflow-hidden relative flex items-center justify-center font-sans text-[#EBE5DC]">
        
        {/* Background Crosshairs (Telemetry) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-[#EBE5DC] opacity-[0.03]" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2">
             <div ref={horizontalLineRef} className="w-full h-[1px] bg-[#EBE5DC] opacity-[0.05]" />
          </div>
        </div>

        {/* Telemetry Layer (Left & Right) - Hidden on Mobile */}
        <div className="absolute inset-0 z-30 pointer-events-none hidden md:flex justify-between items-center px-8 lg:px-16">
          
          {/* Left: Scanlines */}
          <div className="flex flex-col gap-12 w-32 lg:w-48 xl:w-64">
            {[
              "01 / OPEN SOURCE", 
              "02 / SYSTEMS", 
              "03 / CREATIVE CODE"
            ].map((text, i) => (
              <div key={i} className="flex flex-col gap-2 items-start">
                <div 
                  ref={el => { if (el) leftTextsRef.current[i] = el; }}
                  className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-[#EBE5DC] opacity-0"
                >
                  {text}
                </div>
                <div 
                  ref={el => { if (el) leftLinesRef.current[i] = el; }}
                  className="w-full h-[1px] bg-[#FF5A1F]"
                />
              </div>
            ))}
          </div>

          {/* Right: CURRENT SIGNAL Readout */}
          <div className="flex flex-col items-end w-32 lg:w-48 xl:w-64 opacity-40">
            <div className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] text-[#EBE5DC] mb-1">
              CURRENT SIGNAL
            </div>
            <div 
              ref={signalRef}
              className="font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FF5A1F] text-right"
            >
              BUILDING
            </div>
          </div>
          
        </div>

        {/* Intro Label */}
        <div ref={introLabelRef} className="absolute z-50 font-mono text-sm tracking-[0.3em] uppercase opacity-0 text-[#EBE5DC]/60">
          02 / The Human
        </div>

        {/* Global Metadata Corners */}
        <div className="absolute inset-0 z-40 p-6 md:p-10 pointer-events-none flex flex-col justify-between opacity-40 font-mono text-[9px] md:text-xs tracking-[0.2em] uppercase">
          <div className="flex justify-between w-full">
            <span>LOCATION / <span className="text-[#FF5A1F]">INDIA</span></span>
            <span>AGE / <span className="text-[#FF5A1F]">19</span></span>
          </div>
          <div className="flex justify-between w-full">
            <span>STATUS / <span className="text-[#FF5A1F]">BUILDING</span></span>
            <span>MODE / <span className="text-[#FF5A1F]">CURIOUS</span></span>
          </div>
        </div>

        {/* Portrait Composition */}
        <div ref={portraitContainerRef} className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center z-10">
          
          <div 
            ref={portraitMaskRef} 
            className="relative w-full h-full max-w-[500px] flex items-center justify-center mx-auto"
            style={{ clipPath: "inset(48% 0 48% 0)" }}
          >
            {/* The Image */}
            <div ref={portraitZoomRef} className="absolute inset-0 w-full h-full origin-center">
              <div ref={portraitImageRef} className="absolute inset-0 w-full h-full origin-center">
                <Image 
                  src="/assets/hero/Portrait/Portrait.png"
                  alt="Portrait of Krrish Biswas"
                  fill
                  className="object-cover object-center grayscale contrast-[1.1] brightness-[0.9]"
                  priority
                />
              </div>
            </div>

            {/* Face Tracking Box */}
            {/* Roughly positioned over the upper-middle of the portrait */}
            <div 
              ref={trackingBoxRef}
              className="absolute top-[20%] left-[25%] w-[50%] h-[40%] pointer-events-none z-20"
            >
              <div ref={el => { if (el) trackingBoxLines.current[0] = el; }} className="absolute top-0 left-0 w-full h-[1px] bg-[#FF5A1F]" />
              <div ref={el => { if (el) trackingBoxLines.current[1] = el; }} className="absolute top-0 right-0 w-[1px] h-full bg-[#FF5A1F]" />
              <div ref={el => { if (el) trackingBoxLines.current[2] = el; }} className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5A1F]" />
              <div ref={el => { if (el) trackingBoxLines.current[3] = el; }} className="absolute top-0 left-0 w-[1px] h-full bg-[#FF5A1F]" />
              
              <div 
                ref={subjectLabelRef}
                className="absolute -top-5 left-0 text-[#FF5A1F] font-mono text-[8px] tracking-widest opacity-0"
              >
                SUBJECT / KB-019
              </div>
            </div>
          </div>

          {/* Large Names */}
          <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-30 mix-blend-difference">
            <div className="overflow-hidden w-full flex justify-center -mb-4 md:-mb-10">
              <h1 ref={nameKrrishRef} className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter uppercase translate-y-full text-[#F5F5F2]">
                Krrish
              </h1>
            </div>
            <div className="overflow-hidden w-full flex justify-center">
              <h1 ref={nameBiswasRef} className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter uppercase translate-y-full text-[#F5F5F2]">
                Biswas
              </h1>
            </div>
            <div className="w-full flex justify-center mt-2 md:mt-4">
              <div ref={scrambleRef} className="font-mono text-[10px] md:text-sm tracking-[0.3em] uppercase text-[#FF5A1F] opacity-0">
                AWAITING_INPUT...
              </div>
            </div>
          </div>
          
        </div>

        {/* Sequential Statements */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none px-4">
          <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
            {[
              "01 / I ENTER SYSTEMS I DON'T UNDERSTAND.",
              "02 / I BREAK THEM APART UNTIL THEY MAKE SENSE.",
              "03 / THEN I BUILD SOMETHING OF MY OWN."
            ].map((text, i) => (
              <div 
                key={i}
                ref={el => { if (el) statementsRef.current[i] = el; }}
                className="absolute font-mono text-xs md:text-base tracking-[0.2em] text-[#EBE5DC] bg-[#080706]/80 px-4 py-2 backdrop-blur-sm border border-[#EBE5DC]/10 opacity-0 uppercase"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Exit Overlay */}
        <div ref={exitOverlayRef} className="absolute inset-0 z-10 bg-[#080706]/90 opacity-0 pointer-events-none" />
        
        {/* Exit Texts */}
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none gap-4">
          <div ref={exitText1Ref} className="font-sans font-bold text-xl md:text-4xl tracking-tight text-[#EBE5DC] opacity-0 text-center px-4">
            THE HUMAN IS ONLY HALF THE SYSTEM.
          </div>
          <div ref={exitText2Ref} className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#FF5A1F] opacity-0 text-center px-4">
            NOW, THE THINGS HE BUILDS.
          </div>
        </div>

        {/* Cinematic Blackout Overlay */}
        <div ref={blackoutRef} className="absolute inset-0 z-[60] bg-[#080706] opacity-0 pointer-events-none" />

      </div>
    </section>
  );
}
