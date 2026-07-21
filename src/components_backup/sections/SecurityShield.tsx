"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function SecurityShield() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20% 0px -20% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Blast doors closing effect
  const leftDoorX = useTransform(scrollYProgress, [0.2, 0.5], ["-100%", "0%"]);
  const rightDoorX = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);
  
  // Shield Opacity
  const shieldOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] bg-black overflow-hidden flex items-center justify-center py-32" dir="rtl">
      
      {/* The Animated Mechanical Blast Doors */}
      <motion.div 
        style={{ x: leftDoorX }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#000814] border-r-4 border-blue-900/50 z-0 flex items-center justify-end overflow-hidden"
      >
        <div className="w-full h-[20%] border-y border-white/5 opacity-20 absolute top-[20%]" />
        <div className="w-full h-[20%] border-y border-white/5 opacity-20 absolute bottom-[20%]" />
        {/* Warning stripes */}
        <div className="absolute right-0 top-0 w-2 h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(34,211,238,0.2)_10px,rgba(34,211,238,0.2)_20px)]" />
      </motion.div>

      <motion.div 
        style={{ x: rightDoorX }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#000814] border-l-4 border-blue-900/50 z-0 flex items-center justify-start overflow-hidden"
      >
        <div className="w-full h-[20%] border-y border-white/5 opacity-20 absolute top-[20%]" />
        <div className="w-full h-[20%] border-y border-white/5 opacity-20 absolute bottom-[20%]" />
        {/* Warning stripes */}
        <div className="absolute left-0 top-0 w-2 h-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(34,211,238,0.2)_10px,rgba(34,211,238,0.2)_20px)]" />
      </motion.div>

      {/* The Energy Shield overlay */}
      <motion.div 
        style={{ opacity: shieldOpacity }}
        className="absolute inset-0 z-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGFwYXRoIGQ9Ik0yMCAwTDIwIDQwTTAgMjBMODAgMjAiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMikiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] mix-blend-screen"
      >
        {/* Glowing center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.1)_0%,transparent_70%)] blur-2xl" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 flex flex-col items-center">
        
        {/* Content Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="bg-black/60 backdrop-blur-xl  p-10 md:p-16 rounded-3xl text-center max-w-4xl w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400" />
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400" />

          {/* Lock Icon SVG */}
          <div className="mx-auto w-16 h-16 mb-8 relative">
            <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-blue-400 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <span className="text-blue-400 font-mono text-sm tracking-[0.4em] uppercase block mb-6 px-4 py-1  bg-blue-400/10 inline-block">
            Zero-Error Protocol
          </span>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            ����� ����� �������� ��������
          </h2>
          
          <p className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            �� ���� ����� ������. ���� ���� ���� �������� ����� (RFID) ���� ������ ������ ����� ������� ����� ������� �������� ����� 100%. ������ ������ ����� ����� ���� ������� ��� ���� ��������.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3 bg-black/50  px-6 py-3 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white font-mono text-sm tracking-widest">RFID_TRACKING: SECURE</span>
            </div>
            <div className="flex items-center gap-3 bg-black/50  px-6 py-3 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-white font-mono text-sm tracking-widest">ENCRYPTION: 256-BIT</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

