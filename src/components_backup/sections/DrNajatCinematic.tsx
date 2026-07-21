"use client";

import React, { useState, useEffect } from "react";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DIALOGUES } from "@/lib/hero";
import { HudFrame } from "@/components/ui/HudFrame";
import { useIsMobile } from "@/hooks/useIsMobile";

export function DrNajatCinematic() {
  const isMobile = useIsMobile();
  const [activeQuote, setActiveQuote] = useState(0);
  const [mobileActiveQuote, setMobileActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileActiveQuote((prev) => (prev + 1) % DIALOGUES.length);
      setActiveQuote((prev) => (prev + 1) % DIALOGUES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-[#000814] h-[100dvh]">
      <div data-cinematic className="sticky top-0 w-full h-[100dvh] overflow-hidden" dir="rtl">
        
        {/* The Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <LazyVideo
            src="/dr-najat.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Heavy Vignette for Pitch Black Edges */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

        {/* ========================================== */}
        {/* DESKTOP ONLY LAYOUT                        */}
        {/* ========================================== */}
        <div className="hidden md:block absolute inset-0 z-30">
          
          <motion.div 
            className="absolute inset-0 container mx-auto px-12 z-20"
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Portrait Container (Right) */}
            <motion.div 
              className="absolute right-0 bottom-0 h-[65vh] w-[40vw] flex flex-col items-center justify-end origin-bottom"
              initial={isMobile ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src="/doctor.png"
                  alt="Dr Najat"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
                  unoptimized
                />
                <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
              </div>
            </motion.div>

            {/* Pure Text Manifesto (Center Left) */}
            <div className="absolute top-1/3 -translate-y-1/2 left-12 w-[450px] lg:w-[550px]">
              <div className="relative z-10 min-h-[300px] flex items-center">
                <AnimatePresence mode="wait">
                  {activeQuote !== -1 && (
                    <motion.div 
                      key={`quote-${activeQuote}`}
                      initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -80, scale: 1.1, filter: "blur(20px)" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex flex-col justify-center items-end text-right pointer-events-none"
                    >
                      <h3 className="text-[1.75rem] lg:text-[2.25rem] font-black text-white leading-[1.3] tracking-tight dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-4 max-w-[450px]">
                        <span className="text-blue-400 font-serif text-4xl leading-none mr-2">"</span>{DIALOGUES[activeQuote].quote.split('\n')[0]}
                      </h3>
                      <p className="text-sm lg:text-base text-zinc-300 font-bold leading-[1.8] dark:drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] max-w-[450px]">
                        {DIALOGUES[activeQuote].quote.split('\n').slice(1).join(' ')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* STUNNING Cinematic Header */}
            <div className="absolute top-[calc(50%+140px)] left-12 w-[450px] lg:w-[550px] flex flex-col items-end z-30 drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="#d4e616] rounded-full px-5 py-1.5 bg-black/40 backdrop-blur-md drop-shadow-[0_0_10px_rgba(212,255,0,0.2)]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-mono tracking-[0.4em] uppercase text-xs font-black text-blue-400 dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] pl-1">
                        المدير الطبي
                      </span>
                    </motion.div>

                    <motion.div 
                      className="flex items-center gap-4 bg-gradient-to-r from-black/60 to-transparent  rounded-full px-5 py-1.5 backdrop-blur-md drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                       <span className="text-blue-100 font-bold text-sm tracking-wide">خبرة تفوق 25 عاماً</span>
                       <div className="w-px h-5 bg-white/20" />
                       <div className="text-3xl font-black font-mono text-[#d4e616] drop-shadow-[0_0_10px_rgba(212,255,0,0.5)] leading-none"><span className="text-[#d4e616] text-lg relative -top-2">+</span>25</div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="relative" 
                    style={{ filter: "drop-shadow(0 10px 40px rgba(0,0,0,1))" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.h2 
                      className="text-4xl lg:text-[3.25rem] font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text" 
                      style={{ 
                        backgroundImage: "linear-gradient(110deg, #fff 30%, #00b4d8 50%, #fff 70%)",
                        backgroundSize: "200% auto",
                      }}
                      animate={{ backgroundPosition: ["200% center", "-200% center"] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    >
                      د. نجاة الملس
                    </motion.h2>
                  </motion.div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* ========================================== */}
        {/* MOBILE ONLY LAYOUT                         */}
        {/* ========================================== */}
        <div className="md:hidden absolute inset-0 z-30 flex flex-col pointer-events-none">
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none"
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Manifesto Quotes */}
            <div className="absolute top-[8vh] inset-x-0 h-[35vh] flex items-center justify-center pointer-events-none z-20 px-8">
              <div className="relative w-full max-w-[340px] h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
                {DIALOGUES.map((dialogue, index) => {
                  const getOffset = (i: number, active: number) => {
                    if (i === active) return 0;
                    if ((i === 0 && active === 2) || (i === active + 1)) return 1;
                    return -1;
                  };
                  
                  const offset = getOffset(index, mobileActiveQuote);
                  const isActive = offset === 0;

                  return (
                    <motion.div 
                      key={`mobile-quote-${index}`}
                      animate={{ 
                        y: offset * 115, 
                        z: isActive ? 0 : -60, // Push inactive text back
                        rotateX: offset * -15, // Subtle 3D tilt away
                        opacity: isActive ? 1 : 0.15, 
                        scale: isActive ? 1 : 0.85,
                        filter: isActive ? "blur(0px) brightness(1.1)" : "blur(3px) brightness(0.6)",
                        zIndex: isActive ? 10 : 5
                      }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Ultra-premium spring easing
                      className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none origin-center"
                    >
                      <h3 className="text-[1.35rem] font-black leading-[1.5] mb-3 flex items-start justify-center dark:drop-shadow-[0_8px_15px_rgba(0,0,0,1)]">
                        <span className="text-blue-400 font-serif text-3xl leading-none mr-2 opacity-80 translate-y-1">"</span>
                        <span className={isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-50 to-white" : "text-white"}>
                          {dialogue.quote.split('\n')[0]}
                        </span>
                        <span className="text-blue-400 font-serif text-3xl leading-none ml-2 opacity-80 translate-y-1">"</span>
                      </h3>
                      <p className="text-[11px] text-zinc-300 font-bold leading-[1.8] max-w-[280px] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                        {dialogue.quote.split('\n').slice(1).join(' ')}
                      </p>

                      {/* Premium elegant underline for the active quote */}
                      <motion.div 
                        animate={{ width: isActive ? "35px" : "0px", opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mt-4 shadow-[0_0_12px_#22d3ee]"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Portrait */}
            <motion.div 
              className="absolute inset-x-0 bottom-0 h-[50vh] origin-bottom flex flex-col justify-end"
              initial={isMobile ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="absolute bottom-[9vh] inset-x-0 h-[30vh] bg-gradient-to-t from-[#000814] via-[#000814]/60 to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-[8vh] inset-x-0 flex flex-col items-center text-center z-20 pb-4">
                <div className="flex flex-col items-center w-full px-4">
                  <div className="flex items-center justify-center gap-3 w-full relative z-10">
                    <motion.div 
                      className="#d4e616] rounded-full px-4 py-1 bg-black/40 backdrop-blur-md drop-shadow-[0_0_10px_rgba(212,255,0,0.2)]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-mono tracking-[0.4em] uppercase text-[10px] font-black text-blue-400 dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] pl-1 whitespace-nowrap">
                        المدير الطبي
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-center gap-2 bg-black/60  rounded-full px-3 py-1.5 backdrop-blur-md drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                       <span className="text-blue-100 font-bold text-[11px] tracking-wide dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">خبرة تفوق 25 عاماً</span>
                       <div className="w-px h-4 bg-white/20" />
                       <div className="text-2xl font-black font-mono text-[#d4e616] drop-shadow-[0_0_10px_rgba(212,255,0,0.5)] leading-none"><span className="text-[#d4e616] text-xs relative -top-2">+</span>25</div>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="mt-4 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-[11px] font-bold tracking-widest text-zinc-300 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                      أول طبيبة استشارية يمنية لأطفال الأنابيب في اليمن
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    className="relative w-full" 
                    style={{ filter: "drop-shadow(0 5px 15px rgba(0,0,0,1))" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.h2 
                      className="text-4xl font-black tracking-tighter text-transparent bg-clip-text" 
                      style={{ 
                        backgroundImage: "linear-gradient(110deg, #fff 30%, #00b4d8 50%, #fff 70%)",
                        backgroundSize: "200% auto",
                      }}
                      animate={{ backgroundPosition: ["200% center", "-200% center"] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    >
                      د. نجاة الملس
                    </motion.h2>
                  </motion.div>
                </div>
              </div>

              <div className="absolute inset-0 bottom-[10vh] z-0">
                <Image 
                  src="/doctor.png"
                  alt="Dr Najat"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Global Tactical UI Elements */}
        <div className="absolute top-10 left-10 text-blue-500/30 hidden md:block">
          <HudFrame corner="tl" size={24} />
        </div>
        <div className="absolute top-10 right-10 text-blue-500/30 hidden md:block">
          <HudFrame corner="tr" size={24} />
        </div>
      </div>
    </section>
  );
}

