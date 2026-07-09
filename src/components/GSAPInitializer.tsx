"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPInitializer() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Trackpads/Magic Mouse fire momentum wheel events with huge, uneven
    // deltas, which makes scrubbed ScrollTrigger timelines (pinned sections
    // like OpenSystemsSection) blow through their whole animation on a tiny
    // physical scroll. normalizeScroll intercepts input and drives the
    // scroll itself at a consistent rate, fixing that jumpiness.
    ScrollTrigger.normalizeScroll(true);

    // Global background transition from white to near black over 200vh
    gsap.to("body", {
      backgroundColor: "#0A0A0A",
      color: "#ededed", // transition text to light as well
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "200vh top", // ends when we've scrolled 200vh
        scrub: true,
      },
    });

    return () => {
      // Don't kill all scroll triggers on global component unmount in Next.js Dev, 
      // but if we do, make sure we only kill the background one.
      // Since this sits at root layout, it rarely unmounts anyway.
    };
  }, []);

  return null;
}
