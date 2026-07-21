"use client";

import React from "react";
import { motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { useIsMobile } from "@/hooks/useIsMobile";

// Extract the typography content to duplicate it across animation layers
const HeroTextContent = ({ isTrail, skipAnim }: { isTrail: boolean; skipAnim?: boolean }) => {
  const textTrailStyle = { textShadow: "0 0 30px rgba(255,255,255,0.4)", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.3)" };

  return (
    <motion.div 
      initial={skipAnim ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.5, delay: skipAnim ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col items-center justify-center text-center w-full max-w-3xl px-4 ${isTrail ? 'saturate-200' : ''}`} dir="rtl"
    >
      
      {/* TOP: ALLAH */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-[-0.5rem] md:mb-[-1rem] relative z-20">
        <motion.span 
          className="text-white text-sm md:text-xl font-light tracking-[0.2em] md:tracking-[0.4em] uppercase opacity-90"
          style={isTrail ? textTrailStyle : {}}
        >
          بإذن
        </motion.span>
        <motion.h1 
          className="text-[2.75rem] sm:text-[3.75rem] md:text-[5rem] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          style={isTrail ? textTrailStyle : {}}
        >
          الله
        </motion.h1>
      </div>

      {/* SLOGAN: NAJAT PREGNANCY DREAM (Half Size) */}
      <div className="relative w-full flex justify-center items-center z-10 mt-1 md:mt-2">
        <motion.h2 
          className="text-lg sm:text-2xl md:text-[2.5rem] font-black leading-none tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={isTrail ? textTrailStyle : {}}
        >
          نجاة حلم الحمل
        </motion.h2>
      </div>
      
    </motion.div>
  );
};

// DESKTOP SPECIFIC LAYOUT: Massive Editorial Watermark
const DesktopHeroTextContent = ({ isTrail, skipAnim }: { isTrail: boolean; skipAnim?: boolean }) => {
  const textTrailStyle = { textShadow: "0 0 50px rgba(255,255,255,0.3)", color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.2)" };

  return (
    <motion.div 
      initial={skipAnim ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.5, delay: skipAnim ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col items-center justify-center text-center w-full px-4 ${isTrail ? 'saturate-200' : ''}`} dir="rtl"
    >
      
      <div className="relative flex justify-center items-center w-full">
        {/* BACKGROUND MASSIVE OUTLINE: ALLAH */}
        <h1 
          className="text-[10rem] lg:text-[20rem] font-black leading-none tracking-tighter text-transparent absolute opacity-50 lg:opacity-70"
          style={isTrail ? textTrailStyle : { WebkitTextStroke: "2px rgba(255,255,255,0.9)", transform: "scaleY(1.1) translateY(-10%)" }}
        >
          الله
        </h1>

        {/* FOREGROUND SOLID TEXT */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-[6rem] lg:mt-[12rem]">
          <span 
            className="text-white text-xl lg:text-3xl font-light tracking-[0.4em] lg:tracking-[0.8em] uppercase opacity-90 mb-4 lg:mb-6"
            style={isTrail ? { ...textTrailStyle, WebkitTextStroke: "0", color: "transparent" } : {}}
          >
            بإذن
          </span>
          <h2 
            className="text-[3.5rem] lg:text-[6rem] font-black leading-none tracking-tight text-white dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            style={isTrail ? { ...textTrailStyle, WebkitTextStroke: "0", color: "transparent" } : {}}
          >
            نجاة حلم الحمل
          </h2>
        </div>
      </div>
      
    </motion.div>
  );
};

export function HeroCinematic() {
  const isMobile = useIsMobile();

  return (
    <section className="relative w-full bg-[#000814] h-[100dvh]">
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden" dir="rtl">
        <LazyVideo
        src="/cinematic-banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Heavy Vignette for Pitch Black Edges */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-[#000814]/50 z-10 pointer-events-none" />
      
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {/* MOBILE ONLY LAYER 2: GHOST TRAIL */}
        <div className="absolute inset-0 flex-col items-center justify-start pt-[25vh] origin-center flex md:hidden">
            <HeroTextContent isTrail={true} skipAnim={isMobile} />
        </div>

        {/* MOBILE ONLY LAYER 1: CORE TEXT */}
        <div className="absolute inset-0 flex-col items-center justify-start pt-[25vh] origin-center flex md:hidden">
            <HeroTextContent isTrail={false} skipAnim={isMobile} />
        </div>

        {/* DESKTOP ONLY LAYER 2: GHOST TRAIL */}
        <div className="absolute inset-0 flex-col items-center justify-start pt-[20vh] origin-center hidden md:flex">
            <DesktopHeroTextContent isTrail={true} skipAnim={isMobile} />
        </div>

        {/* DESKTOP ONLY LAYER 1: CORE TEXT */}
        <div className="absolute inset-0 flex-col items-center justify-start pt-[20vh] origin-center hidden md:flex">
            <DesktopHeroTextContent isTrail={false} skipAnim={isMobile} />
        </div>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }}
      >
        <CaretDown size={40} weight="light" className="text-white/60 hover:text-white transition-colors drop-shadow-md" />
      </motion.div>
      </div>
    </section>
  );
}

