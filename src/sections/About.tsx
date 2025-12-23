"use client";

import { useRef } from "react";
import Image from "next/image";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import { AnimatedTextLines } from "../component/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const text = `Developer obsessed with clean, scalable systems
  Turning ideas into fast, reliable experiences
  Focused on quality—every commit, every pixel`;

  const aboutText = `I’m a developer who believes great products come from clarity, speed, and thoughtful engineering.
Whether it’s designing smooth, pixel-perfect interfaces or building scalable backend architectures,
I love creating systems that feel effortless for users and maintainable for teams.

Most of my time goes into experimenting with modern stacks—optimizing performance, shaping better workflow automation,
and pushing clean, modular code that ages well. I enjoy solving the kind of problems where details matter
and small decisions make big differences.

When I'm off the keyboard:
⚡ Tinkering with side projects and open-source ideas
🧗 Climbing to challenge myself—problem solving but with gravity involved
🎵 Jamming on my guitar to recharge and reset

Every project I take on is built with one mindset:
Make it fast, make it smooth, make it meaningful.`;

  const imgRef = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    // Section scale animation
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    // Image reveal animation
    if (imgRef.current) {
      gsap.set(imgRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(imgRef.current, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power4.out",
        scrollTrigger: { trigger: imgRef.current },
      });
    }
  }, []);

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle="Crafting Code with Purpose. Building Systems that Scale."
        title="About"
        text={text}
        textColor="text-white"
        withScrollTrigger={true}
      />

      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        {/* NEXT IMAGE */}
        <Image
          ref={imgRef}
          src="/images/man.jpg"
          alt="man"
          width={450}
          height={600}
          className="rounded-3xl object-cover"
        />

        <AnimatedTextLines
          text={aboutText}
          className="w-full text-xs sm:text-[3vh]"
        />
      </div>
    </section>
  );
};

export default About;
