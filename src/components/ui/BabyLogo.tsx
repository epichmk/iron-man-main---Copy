"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export function BabyLogo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Spring physics for buttery smooth "expensive" feeling
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map mouse position to 3D rotation (subtle tilts)
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  // Map mouse position to dynamic glare/sheen
  const glareX = useTransform(springX, [0, 1], [-100, 200]);
  const glareY = useTransform(springY, [0, 1], [-100, 200]);

  // Idle floating animation
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate normalized position (0 to 1)
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to center smoothly
    x.set(0.5);
    y.set(0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      className={`relative flex items-center justify-center [perspective:1200px] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        ref={ref}
        className="relative h-full w-full max-w-[500px] max-h-[700px] cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          !isHovered && isMounted
            ? {
                y: [0, -12, 0],
              }
            : {
                y: 0,
              }
        }
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Dynamic Hologram / Glass shadow under the image */}
        <motion.div
          className="absolute -inset-4 z-0 rounded-full bg-accent/20 blur-3xl"
          style={{
            opacity: useTransform(springY, [0, 1], [0.3, 0.7]),
            scale: useTransform(springY, [0, 1], [0.95, 1.05]),
          }}
        />

        {/* The Actual Image */}
        <div className="relative z-10 h-full w-full drop-shadow-2xl">
          <Image
            src="/baby.png"
            alt="NMC Industries Baby Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 400px, 600px"
          />
        </div>

        {/* Expensive dynamic glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden mix-blend-overlay"
          style={{
            maskImage: "url(/baby.png)",
            maskSize: "contain",
            maskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url(/baby.png)",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-40"
            style={{
              x: glareX,
              y: glareY,
              scale: 2,
              rotate: "45deg",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
