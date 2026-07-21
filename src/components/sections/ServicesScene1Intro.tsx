"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function ServicesScene1Intro() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    gsap.set(".s1-image", { scale: 1, opacity: 0 });
    gsap.set(".s1-text-1", { opacity: 0, y: 30 });
    gsap.set(".s1-text-2", { opacity: 0, scale: 0.9 });
    gsap.set(".s1-text-3", { opacity: 0, x: 30 });
    gsap.set(".s1-btn", { opacity: 0, y: 30 });

    // Floating animation for the image
    const floatTween = gsap.to(".s1-image-float", {
      y: -10,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    const playEntrance = () => {
      const tl = gsap.timeline();
      
      tl.to(".s1-image", {
        scale: 1.15,
        opacity: 1,
        duration: 2.5,
        ease: "power3.out"
      }, 0);

      tl.to(".s1-text-1", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      }, 0.5);

      tl.to(".s1-text-2", {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }, 0.7);

      tl.to(".s1-text-3", {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out"
      }, 0.9);

      tl.to(".s1-btn", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      }, 1.1);
    };

    const resetState = () => {
      gsap.set(".s1-image", { scale: 1, opacity: 0 });
      gsap.set(".s1-text-1", { opacity: 0, y: 30 });
      gsap.set(".s1-text-2", { opacity: 0, scale: 0.9 });
      gsap.set(".s1-text-3", { opacity: 0, x: 30 });
      gsap.set(".s1-btn", { opacity: 0, y: 30 });
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
      floatTween.kill();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-[var(--page-bg)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)] pointer-events-none z-10 hidden dark:block" />
      <div className="relative z-10 w-full h-[100dvh] flex flex-col items-center justify-center px-0 pt-20 md:pt-0 pb-12 md:pb-0">

        <div className="s1-image absolute inset-0 z-10 pointer-events-none flex items-start md:items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-0 min-h-[50vh] md:min-h-[100dvh] overflow-hidden">
              
              <div className="s1-image-float absolute inset-0 w-full h-full origin-center">
                {/* Dark Mode Images */}
                <Image src="/services/services featured highlight/ix73_square.jpg" alt="Olympus IX73" fill sizes="100vw" quality={100} className="object-cover md:hidden opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
                <Image src="/ix73_wide_expanded.png" alt="Olympus IX73" fill sizes="100vw" quality={100} className="object-contain object-center hidden md:block opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
                
                {/* Light Mode Images */}
                <Image src="/services/lightmode/ix73-icsi-imsi_light.jpg" alt="Olympus IX73" fill sizes="100vw" quality={100} className="object-cover md:hidden opacity-100 hide-in-dark" />
                <Image src="/services/lightmode/ix73_wide_light.jpg" alt="Olympus IX73" fill sizes="100vw" quality={100} className="object-contain object-center hidden md:block opacity-100 hide-in-dark" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-[var(--page-bg)]/90 via-transparent to-[var(--page-bg)]/90 hidden dark:block" />
              <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent pointer-events-none z-10 hidden dark:block" />
              <div className="absolute inset-x-0 top-0 h-[15vh] bg-gradient-to-b from-[var(--page-bg)] via-[var(--page-bg)]/60 to-transparent pointer-events-none z-10 hidden dark:block" />
              
            </div>
          </div>
        </div>

        <div className="relative z-30 flex flex-col justify-end md:justify-center items-center md:items-start w-full px-6 md:px-0 md:absolute md:right-16 md:top-1/2 md:-translate-y-1/2 md:w-[450px] lg:w-[500px] pointer-events-auto text-center md:text-right h-full md:h-auto pb-8 md:pb-0" dir="rtl">
          <div className="w-full flex flex-col items-center md:items-start">
            
            <div className="flex flex-col items-center md:items-start w-full">
              <span className="s1-text-1 text-blue-400 text-[13px] md:text-sm font-sans font-bold tracking-[0.3em] uppercase block mb-1 md:mb-2">أحدث التقنيات</span>
              <h2 className="s1-text-2 font-heading text-6xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[1.05] font-black tracking-tight text-[var(--text-primary)] mb-0 md:mb-2 text-center md:text-right" style={{textShadow: 'none', filter: 'none'}}>دقة.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500" style={{textShadow: 'none', filter: 'none'}}>متناهية.</span></h2>
            </div>
            
            <div className="s1-text-3 max-w-sm relative mt-2 md:mt-4 mx-auto md:mx-0 w-full">
              <div className="absolute -right-6 top-1 bottom-1 w-[3px] bg-gradient-to-b from-blue-400 to-blue-900 rounded-full hidden md:block" />
              <p className="font-sans text-[var(--text-secondary)] text-[15px] md:text-xl leading-snug md:leading-normal font-light px-2 md:px-0 md:pr-2 text-center md:text-right">يُعد نظام <strong className="text-[var(--text-primary)] font-semibold tracking-wide">Olympus IX73 ICSI & IMSI</strong><br className="hidden md:block" /> قمة تكنولوجيا الإنجاب.</p>
            </div>

            <div className="s1-btn w-full max-w-[280px] md:max-w-sm mt-6 md:mt-8 mx-auto md:mx-0">
              <Link href="/services/ix73-icsi-imsi" className="group/btn relative w-full inline-flex items-center justify-center md:justify-between py-4 md:py-3 px-8 md:px-6 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent border border-blue-500/30 text-[var(--text-primary)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] skew-x-12" />
                <span className="relative z-10 font-sans font-bold tracking-widest text-sm md:text-base uppercase">اقرأ المزيد</span>
                <span className="relative z-10 transform transition-transform duration-300 group-hover/btn:-translate-x-2 font-mono ml-4 md:ml-0 md:mr-auto inline-block">←</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
