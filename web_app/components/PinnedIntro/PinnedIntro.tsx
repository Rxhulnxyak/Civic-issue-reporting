"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicaHands from "../MagicaHands";
import SihHero from "../SihHero";

export type PinnedIntroProps = {
  className?: string;
};

const PinnedIntro: React.FC<PinnedIntroProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const magicaRef = useRef<HTMLDivElement | null>(null);
  const sihRef = useRef<HTMLDivElement | null>(null);

  // Removed overlay text and cycling words for a clean Spline scene

  useEffect(() => {
    if (!containerRef.current || !magicaRef.current || !sihRef.current) return;

    // Register plugin in an effect to ensure client-side execution and proper typing
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Start SIH below the viewport
      gsap.set(sihRef.current, { yPercent: 100 });

      gsap.to(sihRef.current, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current!,
          start: "top top",
          end: "+=100%", // one viewport worth of scroll
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className={`relative w-full h-[100dvh] overflow-hidden ${className}`}>
      {/* Base layer: MagicaHands */}
      <div ref={magicaRef} className="absolute inset-0">
        <MagicaHands height="h-full" />
      </div>

      {/* Text overlay removed per request: keep Spline scene clean */}

      {/* Overlay: SIH Hero slides up to fully cover */}
      <div ref={sihRef} className="absolute inset-0 z-20">
        <SihHero />
      </div>
    </section>
  );
};

export default PinnedIntro;
