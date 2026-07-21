"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import servicesData from "@/lib/servicesData.json";

export function MobileIX3() {
  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[#000814]" dir="rtl">
      {/* Heavy Vignette for Pitch Black Edges */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-50">
        <video
          src="/services-section.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
      </div>

      {/* IX3 Image Center */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-start pt-16 justify-center scale-125 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="relative w-full h-[50vh] flex items-center justify-center p-0 min-h-[50vh]">
          {/* The Ethereal Halo Image - Full Bleed Blended */}
          <div 
            className="absolute inset-0 z-10 animate-pulse"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
            }}
          >
            <Image 
              src="/ix73_wide_expanded.png" 
              alt={servicesData.find(s => s.id === 'ix73-icsi-imsi')?.title || "IX3"} 
              fill 
              sizes="100vw"
              className="object-contain object-top opacity-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000814]/90 via-transparent to-[#000814]/90" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#000814] to-transparent" />
          </div>
        </div>
      </div>

      {/* Cinematic Bottom Gradient Fade for Text */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#000814] via-[#000814]/80 to-transparent pointer-events-none z-20" />

      {/* Content */}
      <div className="relative z-30 flex flex-col justify-end items-center text-center w-full px-6 pointer-events-auto mt-auto h-full pb-12">
        <div className="w-full drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] flex flex-col items-center">
          
          <div className="flex flex-col items-center w-full">
            <span className="text-blue-400 text-[13px] font-sans font-bold tracking-[0.3em] uppercase block dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-1">
              أحدث التقنيات
            </span>
            <h2 className="font-heading text-5xl sm:text-6xl leading-[1.05] font-black tracking-tight text-white mb-0 text-center">
              دقة.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 dark:drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">متناهية.</span>
            </h2>
          </div>
          
          <div className="max-w-sm relative mt-2 mx-auto">
            <p className="font-sans text-zinc-300 text-[15px] leading-snug font-light dark:drop-shadow-[0_0_15px_rgba(0,0,0,1)] px-2 text-center">
              يُعد نظام <strong className="text-white font-semibold tracking-wide">Olympus IX73 ICSI & IMSI</strong> قمة تكنولوجيا الإنجاب.
            </p>
          </div>

          <div className="w-full max-w-[280px] mt-4 mx-auto">
            <Link
              href="/services/ix73-icsi-imsi"
              className="group/btn relative w-full inline-flex items-center justify-center py-3.5 px-8 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500/15 via-blue-500/10 to-transparent border border-transparent text-accent hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-md overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] skew-x-12" />
              <span className="relative z-10 font-sans font-bold tracking-widest text-sm uppercase">اقرأ المزيد</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
