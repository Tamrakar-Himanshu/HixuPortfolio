/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Icon } from "@iconify/react";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState, MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface FrameworkItem {
  id: string | number;
  name: string;
}

interface ProjectItem {
  id: string | number;
  name: string;
  bgImage: string;
  image: string;
  frameworks: FrameworkItem[];
}

const Works = () => {
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);

  useGSAP(() => {
    if (!previewRef.current) return;

    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });

    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el || !previewRef.current) return;

    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el || !previewRef.current) return;

    gsap.killTweensOf(el);

    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;

    moveX.current?.(mouse.current.x);
    moveY.current?.(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle="Logic meets Aesthetics, Seamlessly"
        title="Works"
        text={text}
        textColor="text-black"
        withScrollTrigger={true}
      />

      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project: ProjectItem, index: number) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div
              ref={(el: HTMLDivElement | null) => { overlayRefs.current[index] = el; }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
            </div>

            <div className="w-full h-0.5 bg-black/80" />

            <div className="flex px-10 text-xs leading-loose uppercase duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((fw) => (
                <p
                  key={fw.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {fw.name}
                </p>
              ))}
            </div>

            <div className="relative flex items-center justify-center px-10 md:hidden h-[400px]">
              <Image
                src={project.bgImage}
                alt={`${project.name}-bg-image`}
                className="object-cover w-full h-full rounded-md brightness-50"
                width={450}
                height={400}
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <Image
                src={project.image}
                alt={`${project.name}-image`}
                className="absolute bg-center px-14 rounded-xl"
                width={450}
                height={400}
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>
        ))}

        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] hidden md:block opacity-0"
        >
          {currentIndex !== null && (
            <Image
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
              width={960}
              height={600}
              sizes="50vw"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
