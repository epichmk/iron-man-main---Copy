"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CaretDown } from "@phosphor-icons/react";
import { LazyVideo } from "@/components/ui/LazyVideo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

// Extract styles outside for cleaner JSX
const textTrailStyle = { color: "transparent", WebkitTextStroke: "1px var(--border-strong)" };
const desktopTrailStyle = { color: "transparent", WebkitTextStroke: "2px var(--border-medium)" };

export function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // 1. Initial State
    gsap.set(".hero-element", { y: 60, opacity: 0, scale: 0.9 });
    gsap.set(".hero-massive", { opacity: 0, scale: 1.1 });
    gsap.set(".hero-arrow", { opacity: 0, y: 20 });

    const playEntrance = () => {
      const tl = gsap.timeline();
      
      // Step 1: "بإذن" (Both Mobile & Desktop)
      tl.to(".hero-bithn", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power4.out"
      }, 0);

      // Step 2: "الله" (Mobile Layout)
      tl.to(".hero-allah-mobile", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power4.out"
      }, 0.5);

      // Step 2: "الله" (Desktop Layout - Massive Background)
      tl.to(".hero-massive", {
        opacity: 0.7,
        scale: 1,
        duration: 3.5,
        ease: "power3.out"
      }, 0.5);

      // Step 3: "نجاة حلم الحمل" (Both Mobile & Desktop)
      tl.to(".hero-najat", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power4.out"
      }, 1.8);

      // Arrow drops in and loops
      tl.to(".hero-arrow", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(".hero-arrow", {
            y: 10,
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        }
      }, 3.2);
    };

    const resetState = () => {
      gsap.killTweensOf(".hero-arrow");
      gsap.set(".hero-element", { y: 60, opacity: 0, scale: 0.9 });
      gsap.set(".hero-massive", { opacity: 0, scale: 1.1 });
      gsap.set(".hero-arrow", { opacity: 0, y: 20 });
    };

    let isFullPage = false;
    const handleIndex = (e: Event) => {
      isFullPage = true;
      const customEvent = e as CustomEvent;
      const mySection = containerRef.current?.closest('main > div');
      if (mySection && mySection.parentElement) {
        const myIndex = Array.from(mySection.parentElement.children).indexOf(mySection);
        if (customEvent.detail.index === myIndex) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      }
    };

    // Play on initial mount since Hero is index 0
    playEntrance();

    window.addEventListener("sectionIndexChanged", handleIndex);

    const observer = new IntersectionObserver((entries) => {
      if (isFullPage) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("sectionIndexChanged", handleIndex);
      observer.disconnect();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--page-bg)] h-[100dvh]">
      <div className="relative top-0 w-full h-[100dvh] overflow-hidden" dir="rtl">
        <LazyVideo
          src="/cinematic-banner.original.mp4" poster="/cinematic-banner-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-[var(--theme-bg-img-opacity)]"
        />

        {/* Heavy Vignette for Pitch Black Edges */}
        {/* Unified Cinematic Edge Fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)] pointer-events-none z-10" />
        
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden parallax-layer">
          
          {/* --- MOBILE LAYOUT --- */}
          {/* LAYER 2: GHOST TRAIL */}
          <div className="absolute inset-0 flex-col items-center justify-start pt-[25vh] origin-center flex md:hidden saturate-200">
            <div className="relative flex flex-col items-center justify-center text-center w-full max-w-3xl px-4" dir="rtl">
              <div className="flex items-center justify-center gap-2 mb-[-0.5rem] relative z-20">
                <span className="hero-element hero-bithn text-[var(--text-primary)] text-sm font-light tracking-[0.2em] uppercase opacity-90 dark:[text-shadow:_0_0_30px_var(--text-muted-light)]" style={textTrailStyle}>بإذن</span>
                <h1 className="hero-element hero-allah-mobile text-[2.75rem] sm:text-[3.75rem] font-black leading-none tracking-tighter text-[var(--text-primary)] dark:drop-shadow-[0_0_30px_var(--border-strong)] dark:[text-shadow:_0_0_30px_var(--text-muted-light)]" style={textTrailStyle}>الله</h1>
              </div>
              <div className="relative w-full flex justify-center items-center z-10 mt-1">
                <h2 className="hero-element hero-najat text-lg sm:text-2xl font-black leading-none tracking-tight text-[var(--text-primary)] dark:drop-shadow-[0_0_20px_var(--border-medium)] dark:[text-shadow:_0_0_30px_var(--text-muted-light)]" style={textTrailStyle}>نجاة حلم الحمل</h2>
              </div>
            </div>
          </div>

          {/* LAYER 1: CORE TEXT */}
          <div className="absolute inset-0 flex-col items-center justify-start pt-[25vh] origin-center flex md:hidden">
            <div className="relative flex flex-col items-center justify-center text-center w-full max-w-3xl px-4" dir="rtl">
              <div className="flex items-center justify-center gap-2 mb-[-0.5rem] relative z-20">
                <span className="hero-element hero-bithn text-[var(--text-primary)] text-sm font-light tracking-[0.2em] uppercase opacity-90">بإذن</span>
                <h1 className="hero-element hero-allah-mobile text-[2.75rem] sm:text-[3.75rem] font-black leading-none tracking-tighter text-[var(--text-primary)] dark:drop-shadow-[0_0_30px_var(--border-strong)]">الله</h1>
              </div>
              <div className="relative w-full flex justify-center items-center z-10 mt-1">
                <h2 className="hero-element hero-najat text-lg sm:text-2xl font-black leading-none tracking-tight text-[var(--text-primary)] dark:drop-shadow-[0_0_20px_var(--border-medium)]">نجاة حلم الحمل</h2>
              </div>
            </div>
          </div>


          {/* --- DESKTOP LAYOUT --- */}
          {/* LAYER 2: GHOST TRAIL */}
          <div className="absolute inset-0 flex-col items-center justify-start pt-[20vh] origin-center hidden md:flex saturate-200">
            <div className="relative flex flex-col items-center justify-center text-center w-full px-4" dir="rtl">
              <div className="relative flex justify-center items-center w-full">
                <div className="absolute flex justify-center items-center w-full pointer-events-none" style={{ transform: "scaleY(1.1) translateY(-10%)" }}>
                  <h1 className="hero-massive text-[10rem] lg:text-[20rem] font-black leading-none tracking-tighter text-transparent opacity-50 lg:opacity-70 dark:[text-shadow:_0_0_50px_var(--border-strong)]" style={desktopTrailStyle}>الله</h1>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center mt-[6rem] lg:mt-[12rem]">
                  <span className="hero-element hero-bithn text-[var(--text-primary)] text-xl lg:text-3xl font-light tracking-[0.4em] lg:tracking-[0.8em] uppercase opacity-90 mb-4 lg:mb-6 dark:[text-shadow:_0_0_50px_var(--border-strong)]" style={{ ...desktopTrailStyle, WebkitTextStroke: "0", color: "transparent" }}>بإذن</span>
                  <h2 className="hero-element hero-najat text-[3.5rem] lg:text-[6rem] font-black leading-none tracking-tight text-[var(--text-primary)] dark:drop-shadow-[0_0_40px_var(--text-glow)] dark:[text-shadow:_0_0_50px_var(--border-strong)]" style={{ ...desktopTrailStyle, WebkitTextStroke: "0", color: "transparent" }}>نجاة حلم الحمل</h2>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 1: CORE TEXT */}
          <div className="absolute inset-0 flex-col items-center justify-start pt-[20vh] origin-center hidden md:flex">
            <div className="relative flex flex-col items-center justify-center text-center w-full px-4" dir="rtl">
              <div className="relative flex justify-center items-center w-full">
                <div className="absolute flex justify-center items-center w-full pointer-events-none" style={{ transform: "scaleY(1.1) translateY(-10%)" }}>
                  <h1 className="hero-massive text-[10rem] lg:text-[20rem] font-black leading-none tracking-tighter text-transparent opacity-50 lg:opacity-70" style={{ WebkitTextStroke: "2px var(--text-primary)" }}>الله</h1>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center mt-[6rem] lg:mt-[12rem]">
                  <span className="hero-element hero-bithn text-[var(--text-primary)] text-xl lg:text-3xl font-light tracking-[0.4em] lg:tracking-[0.8em] uppercase opacity-90 mb-4 lg:mb-6">بإذن</span>
                  <h2 className="hero-element hero-najat text-[3.5rem] lg:text-[6rem] font-black leading-none tracking-tight text-[var(--text-primary)] dark:drop-shadow-[0_0_40px_var(--text-glow)]">نجاة حلم الحمل</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="hero-arrow absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("nextSection"));
          }}
        >
          <CaretDown size={40} weight="light" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors drop-shadow-md" />
        </div>
      </div>
    </section>
  );
}

