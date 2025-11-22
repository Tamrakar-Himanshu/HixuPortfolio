"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import Marquee from "../component/Marquee";
import { socials } from "../constants/index";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const text = `Got a question, how or project Idea?
WE’D love to hear from you and discus further!`;

  const items = Array(5).fill("just imagine, I code");

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle="You Dream It, I Code it"
          title="Contact"
          text={text}
          textColor="text-white"
          withScrollTrigger
        />

        <div className="px-10 text-white uppercase font-light text-[26px] lg:text-[32px]">
          <div className="flex flex-col gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px bg-white/30 my-2" />
              <p className="text-xl lowercase tracking-wider md:text-2xl lg:text-3xl">
                DevHixu@gmail.com
              </p>
            </div>

            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px bg-white/30 my-2" />

              <div className="flex flex-wrap gap-2">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="text-xs md:text-sm uppercase hover:text-white/80 transition-colors"
                  >
                    {"{ "}
                    {s.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
