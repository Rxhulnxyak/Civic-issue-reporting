"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Users, CheckCircle } from "lucide-react";
import type React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// The main props for the HowItWorks component
// (removed empty interface, use type directly)

// The props for a single step card
interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

/**
 * A single step card within the "How It Works" section.
 * It displays an icon, title, description, and a list of benefits.
 */
const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-2xl border bg-card p-6 text-card-foreground transition-all duration-300 ease-in-out",
      "hover:scale-105 hover:shadow-lg hover:border-primary/50 hover:bg-muted"
    )}
  >
    {/* Icon */}
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
      {icon}
    </div>
    {/* Title and Description */}
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="mb-6 text-muted-foreground">{description}</p>
    {/* Benefits List */}
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
          <span className="text-muted-foreground">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * A responsive "How It Works" section that displays a 3-step process.
 * It is styled with shadcn/ui theme variables to support light and dark modes.
 */
export const HowItWorks: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const stepsData = [
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Report Civic Issues",
      description:
        "Easily report civic problems in your area with photos, location, and detailed descriptions.",
      benefits: [
        "GPS-based location detection",
        "Photo upload for better documentation",
        "Category-based issue classification",
      ],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Validation",
      description:
        "Community members validate and prioritize issues based on severity and impact.",
      benefits: [
        "Democratic voting system",
        "Crowdsourced verification",
        "Priority ranking by community needs",
      ],
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Track Resolution",
      description:
        "Monitor progress as authorities work on resolving the issues with real-time updates.",
      benefits: [
        "Real-time status updates",
        "Direct communication with authorities",
        "Completion verification system",
      ],
    },
  ];

  const howItWorksRef = useRef<HTMLSpanElement>(null);
  const qmRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let hasAnimated = false;
    const animate = () => {
      if (qmRef.current) {
        gsap.fromTo(
          qmRef.current,
          { opacity: 0, rotation: 0, scale: 1 },
          { opacity: 1, rotation: 360, duration: 0.7, ease: "power2.out" }
        );
      }
    };

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
            hasAnimated = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={cn("w-full bg-background py-8 sm:py-12", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <span ref={howItWorksRef} style={{ display: "inline-block" }}>
              <span className="how-it-works-text">How it works</span>
              <span ref={qmRef} className="question-mark" style={{ display: "inline-block", marginLeft: "4px" }}>
                ?
              </span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform connects citizens with authorities to efficiently report, validate, and resolve civic issues in communities
          </p>
        </div>

        {/* Step Indicators with Connecting Line */}
        <div className="relative mx-auto mb-8 w-full max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-border"
          ></div>
          {/* Use grid to align numbers with the card grid below */}
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                // Center the number within its grid column
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-muted font-semibold text-foreground ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
