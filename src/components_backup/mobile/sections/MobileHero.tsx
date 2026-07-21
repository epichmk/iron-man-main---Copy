"use client";

import React, { useEffect, useState, useRef } from "react";

export function MobileHero({ isActive }: { isActive?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  return (
    <section className="relative w-full h-[100svh] snap-start overflow-hidden bg-[#000814]" dir="rtl">
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#000814] bg-[url('/0001.jpg')] bg-cover bg-center">
        <video
          src="/cinematic-banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/0001.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

      {/* Content */}
      <div 
        className={`relative z-20 flex flex-col justify-center items-center text-center h-full px-4 pt-[10vh] transition-all duration-[1200ms] ease-out transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      >
        <div className="relative flex justify-center items-center w-full">
          {/* BACKGROUND MASSIVE OUTLINE: ALLAH */}
          <h1 
            className="text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter text-transparent absolute opacity-50"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.9)", transform: "scaleY(1.1) translateY(-10%)" }}
          >
            الله
          </h1>

          {/* FOREGROUND SOLID TEXT */}
          <div className="relative z-10 flex flex-col items-center justify-center mt-[4rem] sm:mt-[6rem]">
            <span 
              className="text-white text-lg sm:text-xl font-light tracking-[0.4em] uppercase opacity-90 mb-3"
            >
              بإذن
            </span>
            <h2 
              className="text-[2.5rem] sm:text-[3.5rem] font-black leading-none tracking-tight text-white"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.4)" }}
            >
              نجاة حلم الحمل
            </h2>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <div className="w-1 h-12 bg-gradient-to-b from-white/50 to-transparent rounded-full animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-white/50 mt-2 font-mono">اسحب للأسفل</span>
      </div>
    </section>
  );
}
