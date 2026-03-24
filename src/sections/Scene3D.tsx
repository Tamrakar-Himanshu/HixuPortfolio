"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, Html, useProgress } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Planet } from "../component/Planet";
import { Suspense, memo } from "react";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 min-w-[200px]">
        <div className="w-full h-px bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-white/30 text-[8px] font-mono tracking-[0.3em] uppercase">
            Initializing
          </span>
          <span className="text-white/50 text-[10px] font-mono tracking-widest">
            {progress.toFixed(0)}%
          </span>
        </div>
      </div>
    </Html>
  );
};

// Memoize the scene to prevent unnecessary re-renders
const Scene = memo(({ isMobile }: { isMobile: boolean }) => (
  <>
    <Suspense fallback={<Loader />}>
      <ambientLight intensity={4.5} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Planet scale={isMobile ? 0.4 : 1} />
      </Float>
    </Suspense>
    
    <Environment resolution={128}>
      <group rotation={[-Math.PI / 3, 4, 1]}>
        <Lightformer form="circle" intensity={2} position={[0, 5, -9]} scale={10} />
        <Lightformer form="circle" intensity={2} position={[0, 3, 1]} scale={10} />
        <Lightformer form="circle" intensity={5} position={[10, 1, 0]} scale={2} />
      </group>
    </Environment>
  </>
));

Scene.displayName = "Scene";

export default function Scene3D() {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <Canvas
      shadows={!isMobile}
      // Adaptive DPR: 1 for mobile, max 2 for desktop to save GPU
      dpr={isMobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }}
      // Performance-critical GL properties
      gl={{ 
        powerPreference: "high-performance",
        antialias: !isMobile,
        stencil: false,
        depth: true,
        alpha: false // Faster rendering on most browsers
      }}
    >
      <Scene isMobile={isMobile} />
    </Canvas>
  );
}
