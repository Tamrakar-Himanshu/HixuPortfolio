"use client";
import { Canvas } from "@react-three/fiber";
import { Planet } from "../component/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import HeroAnimated from "../component/HeroAnimated";

const Hero: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

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
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={4.5} />
          <Float speed={1.5}>
            <Planet scale={isMobile ? 0.4 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form="circle"
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form="circle"
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form="circle"
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form="circle"
                intensity={5}
                position={[10, 1, 0]}
                scale={2}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
