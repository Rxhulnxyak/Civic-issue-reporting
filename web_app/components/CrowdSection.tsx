"use client";

import React from "react";
import CrowdCanvas from "./CrowdCanvas";


export default function CrowdSection() {
  
  const height = 630;
  const topCrop = 180; // shift crowd up to remove top whitespace
  const bottomPush = 130; // push crowd down slightly to remove bottom gap
  //tried to recreate this beautiful component ~ raj
  return (
    <section aria-label="Crowd banner" className="w-full overflow-hidden m-0 p-0">
      <CrowdCanvas height={height} topCrop={topCrop} bottomPush={bottomPush} />
    </section>
  );
}
