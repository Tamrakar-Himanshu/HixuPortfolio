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
      <div className="flex flex-col items-center gap-2 min-w-[200px]">
        <div className="w-full h-px bg-black/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className="text-black/40 text-[9px] font-mono tracking-[0.3em] uppercase">
          {progress.toFixed(0)}%
        </span>
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
      dpr={isMobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }}
      // Disable R3F's internal event system so touch scroll is not blocked on mobile
      events={isMobile ? { enabled: false } as any : undefined}
      style={{ touchAction: "auto" }}
      gl={{ 
        powerPreference: "high-performance",
        antialias: !isMobile,
        stencil: false,
        depth: true,
        alpha: true
      }}
    >
      <Scene isMobile={isMobile} />
    </Canvas>
  );
}
