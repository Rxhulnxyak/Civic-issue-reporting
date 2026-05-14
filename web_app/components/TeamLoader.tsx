"use client";
import React, { useEffect, useState } from "react";

type TeamLoaderProps = {
  onContinue: () => void;
};

export default function TeamLoader({ onContinue }: TeamLoaderProps) {
  const [showText, setShowText] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#111",
      }}
    >
      {isDesktop ? (
        <iframe
          src="https://my.spline.design/infinity-EPnzt1Ryey2NGwGztLISXVnP/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ border: "none", position: "absolute", top: 0, left: 0 }}
          title="OUR TEAM LOADER"
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            background:
              "linear-gradient(180deg, rgba(17,17,17,1) 0%, rgba(245,245,245,0.02) 100%)",
          }}
          aria-hidden
        />
      )}

      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "24px 0",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "1px",
          fontFamily: "'Montserrat', Arial, sans-serif",
          position: "absolute",
          bottom: showText ? 0 : "-60px",
          left: 0,
          pointerEvents: "none",
          zIndex: 2,
          opacity: showText ? 1 : 0,
          transition: "bottom 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s",
        }}
      >
        Click to continue
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 3,
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={onContinue}
        tabIndex={0}
        role="button"
      />
    </div>
  );
}
