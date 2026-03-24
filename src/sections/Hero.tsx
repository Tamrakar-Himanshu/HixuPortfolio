"use client";

import dynamic from "next/dynamic";
import HeroAnimated from "../component/HeroAnimated";

// Dynamically import the 3D scene with SSR disabled.
// This splits the heavy Three.js bundle from the main chunk.
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const Hero: React.FC = () => {
  const text: string = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section
      id="home"
      className="relative flex flex-col justify-end min-h-screen bg-primary"
    >
      <div className="relative z-10">
        <HeroAnimated
          subTitle="STATUS: 200 Ready To GO"
          title="DevHIXU"
          text={text}
          textColor="text-gray-700"
        />
      </div>
      <figure className="absolute inset-x-0 -top-[15%] h-[130vh] z-0 pointer-events-none">
        <Scene3D />
      </figure>
    </section>
  );
};

export default Hero;
