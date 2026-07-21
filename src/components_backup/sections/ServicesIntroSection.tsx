"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export function ServicesIntroSection() {
  const isMobile = useIsMobile();
  const noAnim = isMobile;
  return (
    <section 
      data-cinematic
      className="relative w-full h-screen bg-[#000814] overflow-hidden flex flex-col items-center justify-center snap-center"
      dir="rtl"
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        initial={noAnim ? { scale: 1, opacity: 0.5 } : { scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[150px] mix-blend-screen" />
      </motion.div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Medical Tech Orbs */}
      <motion.div 
        className="absolute top-1/3 right-[10%] w-32 h-32 rounded-full border border-blue-500/20 bg-gradient-to-tr from-blue-900/10 to-transparent backdrop-blur-xl flex items-center justify-center pointer-events-none z-10"
        initial={noAnim ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full border border-blue-400/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_15px_#3b82f6] absolute top-0" />
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-1/3 left-[15%] w-48 h-48 rounded-full border border-accent/10 bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-xl flex items-center justify-center pointer-events-none z-10 hidden md:flex"
        initial={noAnim ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_#d4e616] absolute bottom-0" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative w-full flex flex-col items-center justify-center px-6 z-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Top minimal badge */}
          <motion.div 
            initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-10 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#d4e616]" />
            <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-zinc-300 uppercase pt-1">
              مرحلة جديدة من الدقة
            </span>
          </motion.div>

          {/* Epic Typography */}
          <motion.h2 
            initial={noAnim ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: noAnim ? 0 : 0.2 }}
            className="font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 tracking-tight drop-shadow-[0_20px_40px_rgba(0,0,0,1)] mb-8"
          >
            حيث تلتقي الخبرة الإنسانية
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent dark:drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">مع أحدث تقنيات العصر.</span>
          </motion.h2>

          <motion.p 
            initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: noAnim ? 0 : 0.4 }}
            className="font-sans text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl text-balance"
          >
            في مركزنا، نجمع بين الكفاءة الطبية العالية والتكنولوجيا العالمية لنقدم لكم أعلى نسب النجاح في رحلة الإنجاب.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
