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

export default function Home() {
  // Lenis smooth scrolling
  useEffect(() => {
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
      {/* Page Content */}
      <div className="opacity-100">
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
