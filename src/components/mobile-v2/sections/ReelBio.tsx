"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DIALOGUES } from "@/lib/hero";

export function ReelBio() {
  const [isActive, setIsActive] = useState(false);
  const [activeQuote, setActiveQuote] = useState(0);
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

  // Quote Carousel
  useEffect(() => {
    if (!isActive) return; // Only rotate quotes if we are looking at them
    
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % DIALOGUES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] snap-start overflow-hidden bg-[var(--page-bg)]" dir="rtl">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[var(--page-bg)]">
        <video
          ref={videoRef}
          src="/dr-najat.original.mp4" poster="/dr-najat-poster.jpg"
          loop
          muted
          playsInline
          poster="/dr-najat-early-days.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)]" />

      {/* Portrait Container - Fades in softly */}
      <div className={`absolute inset-x-0 bottom-0 h-[60vh] flex flex-col items-center justify-end z-10 pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full h-full">
          <Image 
            src="/doctor.png"
            alt="Dr Najat"
            fill
            className="object-contain object-bottom drop-shadow-[0_5px_15px_var(--shadow-color)]"
            unoptimized
          />
          <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-[var(--page-bg)] via-black/80 to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* Content Overlay restricted to Top 55% */}
      <div 
        className={`absolute top-0 inset-x-0 h-[55%] z-20 flex flex-col justify-between pt-12 pb-4 px-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`} 
      >
        
        {/* Top Quotes */}
        <div className="flex flex-col items-center text-center gap-6 mt-2">
          <div className="relative z-10 min-h-[160px] flex items-center justify-center w-full">
            {DIALOGUES.map((dialogue, index) => {
              let diff = index - activeQuote;
              if (diff > DIALOGUES.length / 2) diff -= DIALOGUES.length;
              if (diff < -DIALOGUES.length / 2) diff += DIALOGUES.length;

              const isVisibleQuote = Math.abs(diff) <= 1;
              const yOffset = diff * 100;
              const opacity = diff === 0 ? 1 : 0.3;
              const scale = diff === 0 ? 1 : 0.85;
              const blur = diff === 0 ? "blur(0px)" : "blur(3px)";

              return (
                <div 
                  key={dialogue.id}
                  className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none w-full transition-all duration-700 ease-out"
                  style={{ 
                    transform: `translateY(${yOffset}px) scale(${scale})`, 
                    opacity: isVisibleQuote ? opacity : 0,
                    filter: blur
                  }}
                >
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] leading-[1.3] tracking-tight mb-2 dark:[text-shadow:_0_10px_20px_var(--shadow-color)]">
                    <span className="text-blue-400 font-serif text-3xl leading-none mr-1">"</span>
                    {dialogue.quote.split('\n')[0]}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-bold leading-[1.8] px-2 dark:[text-shadow:_0_5px_10px_var(--shadow-color)]">
                    {dialogue.quote.split('\n').slice(1).join(' ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Title & Stats */}
        <div className="flex flex-col items-center text-center z-30">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className={`transition-all duration-700 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} bg-[#d4e616]/10 border border-[#d4e616]/30 rounded-full px-5 py-1.5 backdrop-blur-md`}>
              <span className="font-mono tracking-[0.3em] uppercase text-[10px] font-black text-blue-400 pl-1">
                الدكتورة نجاة
              </span>
            </div>

            <div className={`transition-all duration-700 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex items-center gap-4 bg-[var(--overlay-bg)] rounded-full px-5 py-2 border border-[var(--border-subtle)] backdrop-blur-md`}>
               <span className="text-blue-100 font-bold text-xs tracking-wide">خبرة تفوق في المجال</span>
               <div className="w-px h-4 bg-[var(--surface-hover)]" />
               <div className="text-2xl font-black font-mono text-[#d4e616] leading-none">
                 <span className="text-[#d4e616] text-sm relative -top-1">+</span>25
               </div>
            </div>

            <div className={`mt-1 transition-all duration-700 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-[10px] font-bold tracking-widest text-[var(--text-secondary)] bg-[var(--overlay-bg)] px-4 py-1.5 rounded-full border border-[var(--border-subtle)] backdrop-blur-sm shadow-[0_5px_15px_var(--shadow-color)]">
                من أوائل الرائدات لعلاج العقم و أطفال الأنابيب في الكويت
              </span>
            </div>
          </div>
          
          <h2 className={`transition-all duration-1000 delay-400 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} text-5xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white`}>
            د. نجاة طعمة
          </h2>
        </div>
      </div>
    </section>
  );
}
