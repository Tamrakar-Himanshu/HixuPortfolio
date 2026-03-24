"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // GSAP quickTo for ultra-smooth 120fps following
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 1.5, duration: 0.2 });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, { 
        scale: 2.5, 
        backgroundColor: "rgba(0, 0, 0, 0.05)", 
        borderColor: "rgba(0, 0, 0, 0.1)",
        duration: 0.4 
      });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, { 
        scale: 1, 
        backgroundColor: "transparent", 
        borderColor: "rgba(0, 0, 0, 0.15)",
        duration: 0.4 
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Dynamic selection of interactive elements
    const links = document.querySelectorAll("a, button, [role='button'], .cursor-pointer");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-110 hidden md:block">
      {/* Outer Viewfinder Ring (Using Mix-Blend for Color Inversion) */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-20"
        style={{ backgroundColor: "white" }}
      />

      {/* Center Precision Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-30"
      />
    </div>
  );
}
