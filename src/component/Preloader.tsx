"use client";

import React, { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

const PHRASES = [
  "Awakening the System",
  "Tracing the Geometry",
  "Synthesizing Shaders",
  "Normalizing Normals",
  "Warping Reality",
  "Calibrating Flux",
  "Finalizing Experience"
];

export default function Preloader() {
  const { progress } = useProgress();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);

  // Cycle through phrases based on progress
  useEffect(() => {
    const nextIdx = Math.min(
      Math.floor((progress / 100) * PHRASES.length),
      PHRASES.length - 1
    );
    if (nextIdx !== phraseIdx) {
      gsap.to(phraseRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          setPhraseIdx(nextIdx);
          gsap.fromTo(phraseRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
        }
      });
    }
    
    if (progress === 100) {
      const timer = setTimeout(() => setIsFinished(true), 800);
      return () => clearTimeout(timer);
    }
  }, [progress, phraseIdx]);

  useEffect(() => {
    if (isFinished && containerRef.current) {
      const tl = gsap.timeline();
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => {
          document.body.style.overflow = "auto";
        }
      });
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isFinished]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-primary overflow-hidden"
    >
      {/* Giant Background Number for Depth */}
      <h3 className="absolute bottom-[-5%] right-[-5%] text-[40vw] font-bold text-black/5 select-none pointer-events-none leading-none tracking-tighter">
        {Math.round(progress)}
      </h3>

      <div className="relative flex flex-col items-start gap-8 px-10 max-w-4xl w-full">
        {/* Dynamic High-Tech Phrase */}
        <div className="h-[20px] overflow-hidden">
          <span 
            ref={phraseRef}
            className="text-black/40 text-[10px] uppercase tracking-[0.6em] font-mono block"
          >
            {PHRASES[phraseIdx]}
          </span>
        </div>

        {/* Main Percentage & Progress */}
        <div className="flex flex-col gap-2 w-full">
           <h2 className="text-[18vw] sm:text-[12vw] font-bold tracking-tighter leading-[0.8] text-black">
            {Math.round(progress)}%
          </h2>
          
          <div className="w-full h-px bg-black/5 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Branding Subtitle */}
        <p className="text-black/60 text-xs font-light max-w-[200px] leading-relaxed">
          Pioneering modern digital solutions with refined engineering.
        </p>
      </div>
    </div>
  );
}
