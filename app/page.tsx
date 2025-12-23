"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { ReactLenis } from "@studio-freight/react-lenis";

import Navbar from "@/src/sections/Navbar";
import Hero from "@/src/sections/Hero";
import ServiceSummary from "@/src/sections/ServiceSummary";
import Services from "@/src/sections/Services";
import About from "@/src/sections/About";
import Works from "@/src/sections/Works";
import ContactSummary from "@/src/sections/ContactSummary";
import Contact from "@/src/sections/Contact";

export default function Home() {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis
      root
      className="relative w-screen min-h-screen overflow-x-hidden"
    >
      {/* Loader */}
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>

          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className={`transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"
          }`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
}
