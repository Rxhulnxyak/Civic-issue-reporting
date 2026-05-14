"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

type CrowdCanvasProps = {
  height?: number; // CSS pixels height of the canvas area
  className?: string;
  spriteUrl?: string; // optional override, otherwise uses env var
  topCrop?: number; // pixels to shift the crowd upward to remove top white space
  bottomPush?: number; // pixels to push the crowd downward to remove bottom gap
};

// Default config
const CONFIG = {
  rows: 15,
  cols: 7,
};

// Utils
const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
const randomIndex = <T,>(array: T[]): number => (randomRange(0, array.length) | 0) as number;
const removeFromArray = <T,>(array: T[], i: number): T => array.splice(i, 1)[0];
const removeItemFromArray = <T,>(array: T[], item: T): T => removeFromArray(array, array.indexOf(item));
const removeRandomFromArray = <T,>(array: T[]): T => removeFromArray(array, randomIndex(array));
const getRandomFromArray = <T,>(array: T[]): T => array[randomIndex(array) | 0];

// Types
type Stage = { width: number; height: number };

type PeepRect = [number, number, number, number];

class Peep {
  image: HTMLImageElement;
  rect: PeepRect = [0, 0, 0, 0];
  width: number = 0;
  height: number = 0;
  // sx, sy, sWidth, sHeight
  sx: number = 0;
  sy: number = 0;
  sWidth: number = 0;
  sHeight: number = 0;
  x: number = 0;
  y: number = 0;
  anchorY: number = 0;
  scaleX: number = 1;
  walk: gsap.core.Timeline | null = null;

  constructor({ image, rect }: { image: HTMLImageElement; rect: PeepRect }) {
    this.image = image;
    this.setRect(rect);
  }

  setRect(rect: PeepRect) {
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];
    this.sx = rect[0];
    this.sy = rect[1];
    this.sWidth = rect[2];
    this.sHeight = rect[3];
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, 1);
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, 0, 0, this.width, this.height);
    ctx.restore();
  }
}

function CrowdCanvas({ height = 260, className = "", spriteUrl, topCrop = 0, bottomPush = 0 }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use env var or prop
    const url =
      spriteUrl ||
      process.env.NEXT_PUBLIC_CROWD_PEEPS_SPRITE_URL ||
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    const stage: Stage = { width: 0, height: 0 };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    let rafRenderAdded = false;

    const resetPeep = ({ stage, peep }: { stage: Stage; peep: Peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const power2in = gsap.parseEase("power2.in") as (n: number) => number;
      const offsetY = 100 - 250 * power2in(Math.random());
      const startY = stage.height - peep.height - topCrop + bottomPush + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }: { peep: Peep; props: { startX: number; startY: number; endX: number } }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0
      );
      return tl;
    };

    const walks = [normalWalk];

    function createPeeps() {
      const { rows, cols } = CONFIG;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          new Peep({
            image: img,
            rect: [((i % rows) * rectWidth) | 0, (((i / rows) | 0) * rectHeight) | 0, rectWidth | 0, rectHeight | 0],
          })
        );
      }
    }

    function resize() {
      if (!canvas || !container) return;
      const dpr = window.devicePixelRatio || 1;
      stage.width = container.clientWidth;
      stage.height = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(stage.width * dpr));
      canvas.height = Math.max(1, Math.floor(stage.height * dpr));

      // clear existing timelines
      crowd.forEach((peep) => {
        peep.walk?.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    }

    function initCrowd() {
      while (availablePeeps.length) {
        const p = addPeepToCrowd();
        if (p.walk) {
          p.walk.progress(Math.random());
        }
      }
    }

    function addPeepToCrowd() {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    }

    function removePeepFromCrowd(peep: Peep) {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    }

    function render() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      // clear canvas efficiently
      canvas.width = canvas.width;
      ctx.save();
      ctx.scale(dpr, dpr);
      crowd.forEach((peep) => peep.render(ctx));
      ctx.restore();
    }

    function addTicker() {
      if (rafRenderAdded) return;
      gsap.ticker.add(render);
      rafRenderAdded = true;
    }

    function removeTicker() {
      if (!rafRenderAdded) return;
      gsap.ticker.remove(render);
      rafRenderAdded = false;
    }

    // Init after image load
    img.onload = () => {
      createPeeps();
      resize();
      addTicker();
    };
    img.src = url;

    // Resize handling
    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup
      removeTicker();
      window.removeEventListener("resize", handleResize);
      crowd.forEach((p) => p.walk?.kill());
    };
  }, [spriteUrl, topCrop, bottomPush, height, className]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height }}
      aria-label="Crowd walking animation"
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

export default CrowdCanvas;
