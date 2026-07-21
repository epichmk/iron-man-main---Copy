"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

function BabyModel({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/baby.png");

  // The aspect ratio of the image is critical so it's not stretched
  const image = texture.image as HTMLImageElement;
  const aspect = image.width / image.height;
  const height = 10;
  const width = height * aspect;

  useFrame((state) => {
    if (!meshRef.current) return;
    // Map progress (0 to 1) to rotation
    // We want it to slightly rotate as you scroll to show off the 3D depth
    const targetRotationY = (progress - 0.5) * Math.PI * 0.4; // swings from -0.2PI to 0.2PI
    const targetRotationX = (0.5 - progress) * Math.PI * 0.1;

    // Smooth interpolation
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      {/* High segment count for detailed displacement */}
      <planeGeometry args={[width, height, 512, 512]} />
      <meshStandardMaterial
        map={texture}
        displacementMap={texture}
        displacementScale={1.8}
        roughness={0.4}
        metalness={0.1}
        transparent={true}
        alphaTest={0.05} // Removes purely black/transparent areas if PNG has alpha
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function Baby3DSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const p = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="baby-3d-model"
      className="scroll-animation relative border-t border-[var(--border-subtle)] bg-background"
      style={{ height: "300vh", marginBottom: "-100dvh" }}
    >
      <div
        className="sticky top-0 min-h-screen w-full overflow-hidden bg-background flex items-center justify-center"
        style={{ height: "h-full", willChange: "transform", transform: "translateZ(0)" }}
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#4488ff" />
            <pointLight position={[10, -10, 10]} intensity={1} color="#ff4488" />
            <Suspense fallback={null}>
              <BabyModel progress={progress} />
            </Suspense>
          </Canvas>
        </div>

        <div className="pointer-events-none absolute right-6 top-28 z-10 flex max-w-[46ch] flex-col items-end gap-5 text-right md:right-12 md:top-32">
          <EyebrowBadge>PROJECT // HOMUNCULUS</EyebrowBadge>
          <div className="relative self-stretch">
            <h2 className="font-sans text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-6xl lg:text-7xl">
              Volumetric
              <br />
              <span className="text-accent">Reconstruction</span>
            </h2>
          </div>
          <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-[var(--text-tertiary)] md:text-base bg-background/50 p-2 rounded backdrop-blur-sm">
            Displacement map projection converting 2D archival data into a high-density 3D mesh.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted-light)] md:mx-10">
            <span>3D MESH // ACTIVE</span>
            <span>J.A.R.V.I.S. // RENDERING</span>
            <span>Scroll &darr;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

