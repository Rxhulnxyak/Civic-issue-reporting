import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
          markers: false
        }
      })
      .to(".team-scroll-image", {
        scale: 2,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut"
      })
      .to(
        ".section.hero",
        {
          scale: 1.1,
          transformOrigin: "center center",
          ease: "power1.inOut"
        },
        "<"
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="team-scroll-wrapper"
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        zIndex: 1,
      }}
    >
      <div className="team-scroll-content" style={{ position: "relative", width: "100%", zIndex: 1, overflowX: "hidden" }}>
        <section
          className="section hero"
          style={{
            width: "100%",
            height: "100vh",
            backgroundImage:
              "url(https://happenings.lpu.in/wp-content/uploads/2022/10/LPU-campus.jpg)",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></section>
      </div>
      <div
        className="team-scroll-image-container"
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          perspective: "500px",
          overflow: "hidden",
        }}
      >
        <Image
          src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp"
          alt="image"
          fill
          className="team-scroll-image"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />
      </div>
    </div>
  );
}
