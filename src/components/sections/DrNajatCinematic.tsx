"use client";

import React, { useRef } from "react";
import { LazyVideo } from "@/components/ui/LazyVideo";
import Image from "next/image";
import { DIALOGUES } from "@/lib/hero";
import { HudFrame } from "@/components/ui/HudFrame";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function DrNajatCinematic() {
  const containerRef = useRef<HTMLElement>(null);
  const quotesContainerRef = useRef<HTMLDivElement>(null);
  const mobileQuotesContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initial State Setup
    gsap.set(".dr-portrait", { opacity: 0, y: 150, scale: 1.05 });
    gsap.set(".dr-text-block", { opacity: 0, x: -20 });
    gsap.set(".dr-text-block-reverse", { opacity: 0, x: 20 });
    gsap.set(".dr-name", { opacity: 0, scale: 0.9 });
    gsap.set(".dr-subtitle", { opacity: 0, y: 10 });
    gsap.set(".dr-quote", { opacity: 0, y: 20, scale: 0.98, display: "none" });

    let quotesTimeline: gsap.core.Timeline | null = null;

    const playQuotes = () => {
      if (quotesTimeline) quotesTimeline.kill();
      quotesTimeline = gsap.timeline({ repeat: -1 });
      
      const desktopQuotes = gsap.utils.toArray(".dr-quote-desktop");
      const mobileQuotes = gsap.utils.toArray(".dr-quote-mobile");
      
      // Loop through each quote and create a sequence
      for (let i = 0; i < desktopQuotes.length; i++) {
        const dQuote = desktopQuotes[i] as Element;
        const mQuote = mobileQuotes[i] as Element;
        
        // Ensure only the active one is displayed
        quotesTimeline.set([dQuote, mQuote], { display: "flex" });
        
        // Fade in
        quotesTimeline.to([dQuote, mQuote], {
          opacity: 1, y: 0, scale: 1,
          duration: 1.5, ease: "power3.out"
        });
        
        // Hold
        quotesTimeline.to([dQuote, mQuote], { opacity: 1, duration: 3 });
        
        // Fade out
        quotesTimeline.to([dQuote, mQuote], {
          opacity: 0, y: -20, scale: 1.02,
          duration: 1, ease: "power2.in"
        });
        
        // Hide
        quotesTimeline.set([dQuote, mQuote], { display: "none", y: 20, scale: 0.98 });
      }
    };

    const playEntrance = () => {
      const tl = gsap.timeline();
      
      // Portrait slides up
      tl.to(".dr-portrait", {
        opacity: 1, y: 0, scale: 1,
        duration: 2.5, ease: "power3.out"
      }, 0.2);

      // Name glows in
      tl.to(".dr-name", {
        opacity: 1, scale: 1,
        duration: 2, ease: "power3.out"
      }, 0.5);

      // Side texts slide in
      tl.to(".dr-text-block", {
        opacity: 1, x: 0,
        duration: 1.5, ease: "power3.out", stagger: 0.2
      }, 0.8);
      
      tl.to(".dr-text-block-reverse", {
        opacity: 1, x: 0,
        duration: 1.5, ease: "power3.out"
      }, 1.0);

      tl.to(".dr-subtitle", {
        opacity: 1, y: 0,
        duration: 1.5, ease: "power3.out"
      }, 1.2);

      // Start the looping quotes
      playQuotes();
    };

    const resetState = () => {
      if (quotesTimeline) quotesTimeline.kill();
      gsap.set(".dr-portrait", { opacity: 0, y: 150, scale: 1.05 });
      gsap.set(".dr-text-block", { opacity: 0, x: -20 });
      gsap.set(".dr-text-block-reverse", { opacity: 0, x: 20 });
      gsap.set(".dr-name", { opacity: 0, scale: 0.9 });
      gsap.set(".dr-subtitle", { opacity: 0, y: 10 });
      gsap.set(".dr-quote", { opacity: 0, y: 20, scale: 0.98, display: "none" });
    };

    const handleIndex = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.index === 1) { // Index 1 is DrNajatCinematic
        playEntrance();
      } else {
        setTimeout(() => { resetState(); }, 1000);
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);
    return () => window.removeEventListener("sectionIndexChanged", handleIndex);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--page-bg)] h-[100dvh] flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[var(--page-bg)]">
        <LazyVideo src="/dr-najat.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[var(--theme-bg-img-opacity)]" />
      </div>

      {/* Unified Cinematic Edge Fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)] pointer-events-none z-10" />

      {/* ========================================== */}
      {/* MOBILE ONLY LAYOUT                         */}
      {/* ========================================== */}
      <div className="md:hidden absolute inset-0 z-20 pointer-events-none">
        <div ref={mobileQuotesContainerRef} className="absolute top-[8vh] inset-x-0 h-[35vh] flex items-center justify-center px-6">
          {DIALOGUES.map((item, idx) => (
            <div key={idx} className="dr-quote dr-quote-mobile absolute inset-0 flex-col justify-center items-center text-center w-full" dir="rtl">
              <h3 className="text-2xl font-black text-[var(--text-primary)] leading-[1.4] tracking-tight mb-3">{item.quote.split('\n')[0]}</h3>
              <p className="text-[13px] text-[var(--text-secondary)] font-bold leading-[1.8] max-w-[90%] mx-auto">
                <span className="text-blue-400 font-serif text-2xl leading-none ml-1 opacity-80 relative top-1">"</span>
                {item.quote.split('\n').slice(1).join(' ')}
                <span className="text-blue-400 font-serif text-2xl leading-none mr-1 opacity-80 relative top-1">"</span>
              </p>
            </div>
          ))}
        </div>

        <div className="dr-portrait absolute inset-x-0 bottom-0 h-[50vh] origin-bottom z-10">
          <Image src="/doctor.png" alt="Dr Najat" fill sizes="(max-width: 768px) 100vw, 50vw" quality={100} className="object-contain object-bottom drop-shadow-[0_5px_15px_var(--shadow-color)]" />
          <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent pointer-events-none z-10" />
        </div>

        <div className="absolute bottom-[8vh] inset-x-0 z-30 flex flex-col items-center text-center px-4" dir="rtl">
          <div className="flex flex-col items-center w-full max-w-[340px]">
            <div className="dr-text-block w-full flex justify-end mb-2">
              <div className="flex flex-col items-end">
                <span className="text-[#d4e616] font-black text-3xl leading-none">+25 عاماً</span>
                <div className="flex items-center gap-2 mt-1"><span className="text-[#d4e616] font-bold text-sm tracking-widest uppercase opacity-90">خبرة</span></div>
              </div>
            </div>

            <div className="dr-name relative w-full" style={{ filter: "drop-shadow(0 10px 30px var(--shadow-color))" }}>
              <h2 className="text-[2.75rem] font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text pb-2 animate-[pulse_4s_ease-in-out_infinite]" style={{ backgroundImage: "linear-gradient(110deg, var(--text-primary) 30%, #00b4d8 50%, var(--text-primary) 70%)", backgroundSize: "200% auto" }}>
                د. نجاة الملس
              </h2>
            </div>

            <div className="dr-subtitle mt-1 w-full">
              <span className="text-[11px] font-bold tracking-[0.1em] text-zinc-200 inline-block">أول طبيبة استشارية يمنية للحقن المجهري في اليمن</span>
            </div>

            <div className="dr-text-block-reverse w-full flex justify-start mt-2">
              <div className="flex items-center gap-2"><span className="text-blue-400 font-bold text-[10px] tracking-widest">المدير الطبي</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* DESKTOP ONLY LAYOUT                        */}
      {/* ========================================== */}
      <div className="hidden md:block absolute inset-0 z-30 pointer-events-none">
        <div className="absolute inset-0 container mx-auto px-12 z-20 pointer-events-none">
          
          <div className="dr-portrait absolute right-0 bottom-0 h-[75vh] w-[45vw] flex flex-col items-center justify-end origin-bottom z-10 pointer-events-auto">
            <div className="relative w-full h-full">
              <Image src="/doctor.png" alt="Dr Najat" fill sizes="(max-width: 768px) 100vw, 50vw" quality={100} className="object-contain object-bottom drop-shadow-[0_5px_25px_var(--shadow-color)]" />
              <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent pointer-events-none z-20" />
            </div>
          </div>

          <div className="absolute top-[calc(50%+40px)] left-12 flex flex-col items-end z-30 pointer-events-auto" dir="rtl">
            <div className="flex flex-col items-start w-full max-w-[500px]">
              <div className="dr-text-block w-full flex justify-end mb-3">
                <div className="flex flex-col items-end">
                  <span className="text-[#d4e616] font-black text-5xl leading-none">+25 عاماً</span>
                  <div className="flex items-center gap-3 mt-2"><span className="text-[#d4e616] font-bold text-lg tracking-widest uppercase opacity-90">خبرة</span></div>
                </div>
              </div>

              <div className="dr-name relative w-full" style={{ filter: "drop-shadow(0 10px 40px rgba(0,0,0,1))" }}>
                <h2 className="text-6xl lg:text-[4rem] font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text pb-2 animate-[pulse_4s_ease-in-out_infinite]" style={{ backgroundImage: "linear-gradient(110deg, var(--text-primary) 30%, #00b4d8 50%, var(--text-primary) 70%)", backgroundSize: "200% auto" }}>
                  د. نجاة الملس
                </h2>
              </div>

              <div className="dr-subtitle mt-2 w-full">
                <span className="text-sm font-bold tracking-[0.1em] text-[var(--text-secondary)] inline-block">أول طبيبة استشارية يمنية للحقن المجهري في اليمن</span>
              </div>

              <div className="dr-text-block-reverse w-full flex justify-start mt-3">
                <div className="flex items-center gap-3"><span className="text-blue-400 font-bold text-xs tracking-widest">المدير الطبي</span></div>
              </div>
            </div>
          </div>

          <div ref={quotesContainerRef} className="absolute top-1/3 -translate-y-1/2 left-12 w-[450px] lg:w-[550px] pointer-events-auto">
            <div className="relative z-10 min-h-[300px] flex items-center">
              {DIALOGUES.map((item, idx) => (
                <div key={idx} className="dr-quote dr-quote-desktop absolute inset-0 flex-col justify-center items-end text-right" dir="rtl">
                  <h3 className="text-[2rem] font-black text-[var(--text-primary)] leading-[1.4] tracking-tight mb-3 w-full max-w-[450px]">{item.quote.split('\n')[0]}</h3>
                  <p className="text-base text-[var(--text-secondary)] font-bold leading-[1.8] w-full max-w-[450px]">
                    <span className="text-blue-400 font-serif text-3xl leading-none ml-2 opacity-80 relative top-1.5">"</span>
                    {item.quote.split('\n').slice(1).join(' ')}
                    <span className="text-blue-400 font-serif text-3xl leading-none mr-2 opacity-80 relative top-1.5">"</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-10 left-10 text-blue-500/30 hidden md:block z-0 pointer-events-none"><HudFrame corner="tl" size={24} /></div>
      <div className="absolute top-10 right-10 text-blue-500/30 hidden md:block z-0 pointer-events-none"><HudFrame corner="tr" size={24} /></div>

    </section>
  );
}
