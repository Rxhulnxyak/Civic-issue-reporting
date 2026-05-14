"use client";
import React, { useState, useEffect } from "react";
import TeamLoader from "../../components/TeamLoader";
import { Hero } from "../../components/ui/void-hero";
import LiquidGlassDemo from "../../demo/liquidglass-demo";
import CometCardDemo from "../../demo/comet-card-demo";
import TeamScrollSection from "../../components/TeamScrollSection";


export default function TeamPage() {
  const [showMain, setShowMain] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    if (!mq.matches) {
      
      setShowMain(true);
    }
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (!e.matches) {
        setShowMain(true);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);


  // While loader is active, show loader on all viewports.
  if (!showMain) {
    return <TeamLoader onContinue={() => setShowMain(true)} />;
  }

  // After loader, show the Hero as the hero section (visible on desktop and non-desktop)
  return (
    <>
      <Hero
        title="Where Ingenuity Meets Gravity"
        tagline="Building digital solutions for real-world challenges in Jharkhand"
        microStory={`In this orbit of ideas, We're a team of developers, designers, and problem-solvers working on innovative tech solutions for government services. From concept to deployment, we focus on creating tools that actually work for citizens.

`}
      />

      <LiquidGlassDemo />
      <CometCardDemo />
      {isDesktop && <TeamScrollSection />}
    </>
  );
}
