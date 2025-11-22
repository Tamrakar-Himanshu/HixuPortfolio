/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";

import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Observer);

interface MarqueeProps {
  items: string[];
  className?: string;
  icon?: string;
  iconClassName?: string;
  reverse?: boolean;
}

/** FIX: Explicit return type = gsap.core.Timeline */
function horizontalLoop(
  elements: HTMLElement[],
  config: Record<string, any>
): gsap.core.Timeline {
  const items = gsap.utils.toArray(elements) as HTMLElement[];
  config = config || {};

  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  const length = items.length;
  const startX = items[0].offsetLeft;

  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];

  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 200;

  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap(config.snap || 1);

  gsap.set(items, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as string
      ));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  const last = items[length - 1];
  const totalWidth =
    last.offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    last.offsetWidth +
    (parseFloat(config.paddingRight) || 0);

  items.forEach((item, i) => {
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop = distanceToStart + widths[i];

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    );

    tl.fromTo(
      item,
      {
        xPercent: snap(
          ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
        ),
      },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );

    times[i] = distanceToStart / pixelsPerSecond;
  });

  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }

  return tl;
}

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLSpanElement[]>([]);
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {

    if (isTouch) return;

    if (!itemsRef.current.length) return;

    const tl = horizontalLoop(itemsRef.current, {
      repeat: -1,
      paddingRight: 30,
      reversed: reverse,
    });

    const observer = Observer.create({
      onChangeY(self) {
        let factor = 1.5;
        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
          factor *= -1;
        }

        const anim = gsap.timeline();
        anim
          .to(tl, {
            timeScale: factor * 1.5,
            duration: 0.2,
            overwrite: true,
          })
          .to(tl, { timeScale: factor / 1.5, duration: 1 }, "+=0.3");
      },
    });

    return () => {
      tl.kill();
      observer.kill();
    };
  }, [items, reverse, isTouch]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center uppercase whitespace-nowrap ${className}`}
    >
      <div
        className={isTouch ? "marquee-track-wrapper w-full" : "flex"}
        style={isTouch ? { overflow: "hidden" } : undefined}
      >
        <div
          className={isTouch ? "marquee-track" : "flex"}
          // inline style to control duration + direction on mobile
          style={
            isTouch
              ? {
                  animationDuration: `${Math.max(8, items.length * 1.6)}s`,
                  animationDirection: reverse ? "reverse" : "normal",
                }
              : undefined
          }
        >
          {(isTouch ? [...items, ...items] : items).map((text, index) => (
            <span
              key={index}
              ref={!isTouch ? ((el: any) => el && (itemsRef.current[index] = el)) : undefined}
              className="flex items-center px-16 gap-x-32"
            >
              {text} <Icon icon={icon} className={iconClassName} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
