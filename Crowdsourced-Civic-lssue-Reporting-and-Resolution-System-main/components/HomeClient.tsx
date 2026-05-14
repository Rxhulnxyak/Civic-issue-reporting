"use client";
import { useEffect, useState } from "react";
import FAQDemo from "../demo/faq-demo";
import { FeaturesSectionDemo } from "./ui/Grid-home";
import { HowItWorks } from "@/components/steps";
import PinnedIntro from "./PinnedIntro";
import SihHero from "./SihHero";
import OpenScDemo from "../demo/opensc-demo";
import LiquidGlassDemo from "../demo/liquidglass-demo";
import TestimonialDemo from "../demo/hovertesti-demo";
import HeroGallery from "./ui/hero-gallery";
import SplashScreen from "./splash/SplashScreen";
import CrowdSection from "./CrowdSection";

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <LiquidGlassDemo />
      {/* Show PinnedIntro only on desktop, SihHero only on non-desktop */}
      {isDesktop ? <PinnedIntro /> : <SihHero />}
      <section>
        <HeroGallery />
      </section>
      <section>
        <FeaturesSectionDemo />
      </section>
      <HowItWorks />
      <section>
        <OpenScDemo />
      </section>
      <section>
        <TestimonialDemo />
      </section>
      <section id="faq">
        <FAQDemo />
      </section>
      {/* Dedicated crowd banner section */}
      <CrowdSection />
    </>
  );
}
