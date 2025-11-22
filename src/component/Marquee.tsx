/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Icon } from "@iconify/react";
import { useMemo, useEffect, useState } from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
  icon?: string;
  iconClassName?: string;
  reverse?: boolean;
}

// Simplified CSS-only marquee: GSAP removed for clarity and performance.

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}: MarqueeProps) => {
  const containerRef = null;
  const [animate, setAnimate] = useState(true);
  // duplicate items for seamless CSS loop and memoize the list
  const duplicated = useMemo(() => [...items, ...items], [items]);
  const durationSeconds = Math.max(8, items.length * 1.6);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");

    const update = () => {
      // disable animation on mobile or when user prefers reduced motion
      setAnimate(!(mqReduce.matches || mqMobile.matches));
    };

    update();

    if (mqReduce.addEventListener) mqReduce.addEventListener("change", update);
    else mqReduce.addListener?.(update);

    if (mqMobile.addEventListener) mqMobile.addEventListener("change", update);
    else mqMobile.addListener?.(update);

    return () => {
      if (mqReduce.removeEventListener) mqReduce.removeEventListener("change", update);
      else mqReduce.removeListener?.(update);

      if (mqMobile.removeEventListener) mqMobile.removeEventListener("change", update);
      else mqMobile.removeListener?.(update);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center uppercase whitespace-nowrap ${className}`}
    >
      <div className="marquee-track-wrapper w-full">
        <div
          className="marquee-track"
          style={{
            animationDuration: `${durationSeconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
            // pause animation on mobile or when prefers-reduced-motion
            animationPlayState: animate ? "running" : "paused",
            // hint to browser to use compositing (GPU) for smoother animation
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {duplicated.map((text, index) => (
            <span key={index} className="flex items-center px-16 gap-x-32">
              {text} <Icon icon={icon} className={iconClassName} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
