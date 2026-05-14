"use client";
import React, { useState } from "react";
import Image from "next/image";
import GlassSurface from "../components/ui/LiquidGlass";
import SlidingNav from "../components/ui/SlidingNav/SlidingNav";

export default function LiquidGlassDemo() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        <GlassSurface
          width="76.5vw"
          height={61.2}
          borderRadius={20.4}
          className="shadow-lg"
          style={{ margin: "12px auto", maxWidth: 765 }}
          onHamburgerClick={() => setNavOpen(true)}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "flex-start",
            width: "100%",
          }}>
            <Image
              src="/menulogo.png"
              alt="Menu Logo"
              width={48}
              height={48}
              style={{ marginRight: 18, marginLeft: 0, objectFit: "contain" }}
            />
          </div>
        </GlassSurface>
      </div>
      <SlidingNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />
    </>
  );
}
