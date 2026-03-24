"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, Html, useProgress } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Planet } from "../component/Planet";
import { Suspense } from "react";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 min-w-[150px]">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className="text-white/50 text-[10px] font-mono tracking-[0.2em] uppercase">
          Loading {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}

export default function Scene3D() {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? 1 : [1, 2]}
      camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={4.5} />
        <Float speed={1.5}>
          <Planet scale={isMobile ? 0.4 : 1} />
        </Float>
      </Suspense>
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
  );
}
