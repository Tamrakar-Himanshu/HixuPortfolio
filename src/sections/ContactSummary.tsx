"use client";

import { useRef } from "react";
import Marquee from "../component/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "contact us",
    "contact us",
    "contact us",
    "contact us",
    "contact us",
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    if (typeof window === "undefined") return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");

    // Skip heavy scroll pinning on mobile or when user prefers reduced motion
    if (mqReduce.matches || mqMobile.matches) {
      return;
    }

    const st = {
      trigger: containerRef.current,
      start: "center center",
      end: "+=800 center",
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
      markers: false,
    };

    const tween = gsap.to(containerRef.current, { scrollTrigger: st });

    return () => {
      const tt = tween as unknown as { scrollTrigger?: { kill: () => void } };
      if (tt.scrollTrigger) tt.scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
      <Marquee items={items} />

      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-gold">together</span> “
        </p>
      </div>

      <Marquee
        items={items2}
        reverse
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
