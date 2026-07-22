"use client";
import React, { useState, useEffect, useRef } from "react";

export function ReelHero() {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const rootEl = document.getElementById("mobile-main-scroll-v2");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { root: rootEl, threshold: 0.6 } // 60% of the section must be visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Play/Pause video based on isActive
  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] snap-start overflow-hidden bg-[var(--page-bg)]" dir="rtl">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[var(--page-bg)]">
        <video
          ref={videoRef}
          src="/cinematic-banner.original.mp4" poster="/cinematic-banner-poster.jpg"
          loop
          muted
          playsInline
          poster="/0001.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)]" />

      {/* Active Content Overlay */}
      <div 
        className={`absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 pt-[10vh] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-105 pointer-events-none'}`}
      >
        <div className="relative flex justify-center items-center w-full">
          {/* BACKGROUND MASSIVE OUTLINE: ALLAH */}
          <h1 
            className="text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter text-transparent absolute opacity-50"
            style={{ WebkitTextStroke: "1px var(--text-primary)", transform: "scaleY(1.1) translateY(-10%)" }}
          >
            الله
          </h1>

          {/* FOREGROUND SOLID TEXT */}
          <div className="relative z-10 flex flex-col items-center justify-center mt-[4rem] sm:mt-[6rem]">
            <span className="text-[var(--text-primary)] text-lg sm:text-xl font-light tracking-[0.4em] uppercase opacity-90 mb-3">
              بإذن
            </span>
            <h2 className="text-[2.5rem] sm:text-[3.5rem] font-black leading-none tracking-tight text-[var(--text-primary)] dark:drop-shadow-[0_0_40px_var(--text-muted-light)]">
              نجاة حلم الحمل
            </h2>
          </div>
        </div>
      </div>
      
      {/* Scroll Hint (Only visible when active) */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center transition-opacity duration-1000 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-1 h-12 bg-gradient-to-b from-white/50 to-transparent rounded-full animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mt-2 font-mono">اسحب للأسفل</span>
      </div>
    </section>
  );
}
