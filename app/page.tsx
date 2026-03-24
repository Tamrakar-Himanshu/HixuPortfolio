"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import Navbar from "@/src/sections/Navbar";
import Hero from "@/src/sections/Hero";
import ServiceSummary from "@/src/sections/ServiceSummary";
import Services from "@/src/sections/Services";
import About from "@/src/sections/About";
import Works from "@/src/sections/Works";
import ContactSummary from "@/src/sections/ContactSummary";
import Contact from "@/src/sections/Contact";
import Preloader from "@/src/component/Preloader";
import CustomCursor from "@/src/component/CustomCursor";

export default function Home() {
  // Lenis smooth scrolling
  useEffect(() => {
    // Ultimate Force-Hide Scrollbar via Script Injection
    const style = document.createElement("style");
    style.innerHTML = `
      *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
      * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
      html, body { overflow-x: hidden !important; }
    `;
    document.head.appendChild(style);

    // Only enable Lenis on desktop
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      {/* Preloader - High-end global loader */}
      <Preloader />

      {/* Modern Cursor System */}
      <CustomCursor />

      {/* Page Content */}
      <div className="opacity-100 relative z-10">
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </div>
  );
}
