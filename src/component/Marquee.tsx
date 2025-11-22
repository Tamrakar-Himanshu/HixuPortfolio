/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Icon } from "@iconify/react";
import { useMemo } from "react";

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
  // duplicate items for seamless CSS loop and memoize the list
  const duplicated = useMemo(() => [...items, ...items], [items]);
  const durationSeconds = Math.max(8, items.length * 1.6);

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
