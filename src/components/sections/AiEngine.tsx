"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function AiEngine() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20% 0px -20% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-180, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] bg-[var(--body-bg)] overflow-hidden flex items-center justify-center py-32" dir="rtl">
      
      {/* Background Matrix/Data Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
        {/* Animated Scanning Lines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_20px_rgba(34,211,238,1)] animate-[scanline_3s_linear_infinite]" />
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-blue-500/10 to-transparent animate-[scanline_3s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded  bg-blue-500/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-xs text-blue-400 tracking-[0.3em] uppercase">
              J.A.R.V.I.S. Core AI
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-6xl md:text-8xl font-black text-[var(--text-primary)] tracking-tighter mb-8"
          >
            نظام <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-blue-600">J.A.R.V.I.S</span> لتحليل الأجنة
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xl md:text-2xl text-[var(--text-tertiary)] font-light leading-relaxed"
          >
            أول ذكاء اصطناعي من نوعه في المنطقة، يقوم بتحليل أكثر من <span className="text-blue-400 font-bold">100,000</span> نقطة بيانات لكل جنين لضمان اختيار الجنين المثالي بدقة رياضية لا تقبل الخطأ.
          </motion.p>
        </div>

        {/* The Holographic Brain / Embryo Interactive Center */}
        <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
          
          {/* Circular Rings */}
          <div className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-12  rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          <div className="absolute inset-32 border-4 border-blue-500/10 rounded-full" />
          
          {/* Targetting UI Brackets */}
          <motion.div 
            initial={{ scale: 1.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <div className="absolute top-1/4 left-1/4 w-12 h-12 border-t-2 border-l-2 border-blue-400" />
            <div className="absolute top-1/4 right-1/4 w-12 h-12 border-t-2 border-r-2 border-blue-400" />
            <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border-b-2 border-l-2 border-blue-400" />
            <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border-b-2 border-r-2 border-blue-400" />
          </motion.div>

          {/* Central Rotating Hologram (Representing the AI Core / Embryo) */}
          <motion.div 
            style={{ rotateY, scale }}
            className="relative z-10 w-64 h-64 md:w-96 md:h-96 transform-gpu preserve-3d"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-blue-600/20 rounded-full blur-3xl" />
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(34,211,238,1)]">
               {/* Complex Geometric Wireframe representing an embryo dividing/AI brain */}
               <path d="M50 10 A40 40 0 1 1 49.9 10" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5" />
               <path d="M50 20 A30 30 0 1 1 49.9 20" fill="none" stroke="rgba(34,211,238,0.6)" strokeWidth="1" strokeDasharray="2,4" />
               <path d="M50 30 A20 20 0 1 1 49.9 30" fill="none" stroke="rgba(34,211,238,0.8)" strokeWidth="1.5" />
               
               {/* Connecting nodes */}
               <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" />
               <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" />
               <line x1="22" y1="22" x2="78" y2="78" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" />
               <line x1="22" y1="78" x2="78" y2="22" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" />
               
               {/* Pulsing Core */}
               <circle cx="50" cy="50" r="8" fill="rgba(34,211,238,1)" className="animate-pulse" />
               <circle cx="50" cy="50" r="4" fill="white" />
            </svg>

            {/* Floating Data Points */}
            {isInView && (
              <>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: -100 }} transition={{ delay: 0.5, duration: 0.5 }} className="absolute top-[20%] left-0 font-mono text-xs text-blue-400 bg-[var(--body-bg)]/80 px-2 py-1  whitespace-nowrap">
                  CELL_DIV_RATE: OPTIMAL
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 100 }} transition={{ delay: 0.7, duration: 0.5 }} className="absolute bottom-[30%] right-0 font-mono text-xs text-blue-400 bg-[var(--body-bg)]/80 px-2 py-1  whitespace-nowrap">
                  GEN_INTEGRITY: 99.9%
                </motion.div>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: -60 }} transition={{ delay: 0.9, duration: 0.5 }} className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-xs text-blue-400 bg-[var(--body-bg)]/80 px-2 py-1  whitespace-nowrap">
                  TARGET_LOCK_ACQUIRED
                </motion.div>
              </>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}


