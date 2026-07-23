"use client";

import React, { useRef } from "react";
import servicesData from "@/lib/servicesData.json";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { CaretLeft } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function ServicesScene2Carousel() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const nonHeroServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');
  nonHeroServices.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  useGSAP(() => {
    // Intro elements
    gsap.set(".s2-intro-tag", { opacity: 0, y: -30 });
    gsap.set(".s2-intro-title", { opacity: 0, y: -30 });
    gsap.set(".s2-intro-desc", { opacity: 0, y: 30 });
    gsap.set(".s2-intro-swipe", { opacity: 0, y: 30 });

    const playIntro = () => {
      const tl = gsap.timeline();
      tl.to(".s2-intro-tag", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.5);
      tl.to(".s2-intro-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.6);
      tl.to(".s2-intro-desc", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.7);
      tl.to(".s2-intro-swipe", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.8);
    };

    const resetIntro = () => {
      gsap.set(".s2-intro-tag", { opacity: 0, y: -30 });
      gsap.set(".s2-intro-title", { opacity: 0, y: -30 });
      gsap.set(".s2-intro-desc", { opacity: 0, y: 30 });
      gsap.set(".s2-intro-swipe", { opacity: 0, y: 30 });
    };

    let isFullPage = false;
    const handleIndex = (e: Event) => {
      isFullPage = true;
      const customEvent = e as CustomEvent;
      const mySection = containerRef.current?.closest('main > div');
      if (mySection && mySection.parentElement) {
        const myIndex = Array.from(mySection.parentElement.children).indexOf(mySection);
        if (customEvent.detail.index === myIndex) {
          playIntro();
        } else {
          setTimeout(() => { resetIntro(); }, 1000);
        }
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);

    const observer = new IntersectionObserver((entries) => {
      if (isFullPage) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playIntro();
        } else {
          setTimeout(() => { resetIntro(); }, 1000);
        }
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) observer.observe(containerRef.current);

    // Outro elements triggered by horizontal scroll
    if (carouselRef.current) {
      gsap.from(".s2-outro-element", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".s2-outro-slide",
          scroller: carouselRef.current,
          horizontal: true,
          start: "right 80%", // Because RTL, right edge enters from the left
          toggleActions: "play none none none"
        }
      });
    }

    return () => {
      window.removeEventListener("sectionIndexChanged", handleIndex);
      observer.disconnect();
    };
  }, { scope: containerRef });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !carouselRef.current) return;
    isDown.current = true;
    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.style.scrollSnapType = "none";
    startX.current = e.pageX;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !carouselRef.current) return;
    isDown.current = false;
    carouselRef.current.style.cursor = "grab";
    setTimeout(() => {
      if (carouselRef.current) carouselRef.current.style.scrollSnapType = "x mandatory";
    }, 500);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !carouselRef.current) return;
    isDown.current = false;
    carouselRef.current.style.cursor = "grab";
    setTimeout(() => {
      if (carouselRef.current) carouselRef.current.style.scrollSnapType = "x mandatory";
    }, 500);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDown.current || e.pointerType !== 'mouse' || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (startX.current - x) * 1.5;
    
    // Smooth GSAP animation for professional dragging
    gsap.to(carouselRef.current, {
      scrollLeft: scrollLeft.current + walk,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <section ref={containerRef} className="relative bg-[var(--page-bg)] w-full h-[100dvh] overflow-hidden flex flex-col justify-center">
      <LazyVideo src="/services-section-2.original.mp4" poster="/services-section-2-poster.jpg" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
      <div 
        ref={carouselRef}
        className="horizontal-carousel-container relative z-10 w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-center gap-0 px-0 scrollbar-hide md:cursor-grab active:md:cursor-grabbing" 
        dir="rtl"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        {/* INTRO SLIDE */}
        <div className="snap-center shrink-0 w-[100vw] md:w-[600px] h-full">
          <div className="w-full h-full flex flex-col justify-between items-center text-center relative z-20 pt-32 pb-20 px-6">
            
            <div className="flex flex-col items-center gap-4 mt-0 md:mt-12">
              <div className="s2-intro-tag inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-full backdrop-blur-md shadow-[0_0_20px_var(--border-subtle)]">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-[11px] font-sans font-bold tracking-widest uppercase pt-[1px]">تقنيات متقدمة</span>
              </div>
              <h2 className="s2-intro-title text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)] dark:drop-shadow-[0_0_30px_var(--text-glow)]">
                حلول متكاملة
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6 mb-0 md:mb-4">
              <div className="s2-intro-desc flex flex-col items-center w-[95%] max-w-[380px]">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-6" />
                <p className="text-[var(--text-tertiary)] font-sans text-[18px] md:text-xl leading-relaxed font-light dark:drop-shadow-md">
                  استكشف أحدث <span className="text-[var(--text-primary)] font-medium">التقنيات والخدمات الطبية</span> التي نقدمها لضمان أفضل نتائج العلاج
                </p>
              </div>

              <div className="s2-intro-swipe flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-500/30 backdrop-blur-sm">
                <span className="font-sans text-base tracking-widest uppercase">اسحب لليسار</span>
                <div className="flex -space-x-2 space-x-reverse animate-[pulse_2s_ease-in-out_infinite]">
                  <CaretLeft size={20} weight="bold" className="text-blue-600 dark:text-blue-400" />
                  <CaretLeft size={20} weight="bold" className="text-blue-400 dark:text-blue-500 opacity-50" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {nonHeroServices.map((service, idx) => (
          <div key={service.id} className="snap-center shrink-0 w-[100vw] md:w-[100dvh] h-full">
            <div className="w-full h-full flex items-center justify-center">
              <ServiceCard id={service.id} title={service.title} image={service.image} description={service.description} benefits={service.benefits} featured={service.featured} index={idx} />
            </div>
          </div>
        ))}
        
        {/* OUTRO SLIDE */}
        <div className="s2-outro-slide snap-center shrink-0 w-[100vw] md:w-[600px] h-full">
          <div className="w-full h-full flex flex-col justify-between items-center text-center relative z-20 pt-32 pb-20 px-6">
            
            <div className="s2-outro-element flex flex-col items-center gap-6 md:gap-8 max-w-2xl px-6 mt-0 md:mt-12">
              <h2 className="font-heading text-4xl md:text-6xl leading-[1.3] md:leading-tight font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)] dark:drop-shadow-[0_0_30px_var(--text-glow)]">
                لم تجدوا الخدمة<br />التي تبحثون عنها؟
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6 max-w-2xl px-6 mb-0 md:mb-4">
              <div className="s2-outro-element w-12 h-px bg-gradient-to-r from-transparent via-[#0094FE]/50 to-transparent" />

              <p className="s2-outro-element font-sans text-[18px] md:text-xl font-light text-[var(--text-secondary)] dark:drop-shadow-lg leading-relaxed w-[95%] max-w-[380px]">
                دعونا نناقش <span className="text-[#0094FE] font-medium">حالتكم الخاصة</span> لتحديد خطة العلاج الأنسب.
              </p>
              
              <a
                href="https://wa.me/967781878443"
                target="_blank"
                rel="noopener noreferrer"
                className="s2-outro-element group relative inline-flex items-center justify-center gap-3 py-4 px-10 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all duration-300 overflow-hidden w-full max-w-[320px]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite] skew-x-12" />
                <span className="relative z-10 font-sans font-bold text-base md:text-lg text-[var(--text-primary)] tracking-widest uppercase">
                  تواصل عبر الواتساب
                </span>
                <CaretLeft weight="bold" className="relative z-10 w-5 h-5 text-[var(--text-primary)] group-hover:-translate-x-1 transition-transform duration-300" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
