"use client";

import dynamic from "next/dynamic";
import HeroAnimated from "../component/HeroAnimated";

// Dynamically import the 3D scene with SSR disabled.
// This splits the heavy Three.js bundle from the main chunk.
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />,
});

const Hero: React.FC = () => {
  const text: string = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <HeroAnimated
        subTitle="500 Ready To GO"
        title="Dev HIXU"
        text={text}
        textColor="text-gray-500"
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "130vh" }}
      >
        <Scene3D />
      </figure>
    </section>
  );
};

export default Hero;
