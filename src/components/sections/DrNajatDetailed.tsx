"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const TITLES = [
  "المدير الطبي",
  "استشارية أمراض النساء والتوليد",
  "حاملة البورد العربي",
  "خبيرة الخصوبة والإنجاب",
  "أول إستشارية يمنية في الحقن المجهري",
];

const MILESTONES = [
  { year: "1977", text: "بداية الرحلة كممرضة في أقسام الأمومة" },
  { year: "1990", text: "التخرج من كلية الطب بجامعة صنعاء" },
  { year: "2001", text: "البورد العربي وتصدر مجال الـ IVF باليمن" },
  { year: "2004", text: "التدريب المتقدم في أوروبا (فرنسا وبلجيكا)" },
  { year: "2014", text: "تأسيس مركزها الخاص للحقن المجهري (NMC)" },
  { year: "2026", text: "أكثر من 30 عاماً من العطاء في المجال الطبي" },
];

const GALLERY_ITEMS = [
  { type: "image" as const, src: "/conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (1).jpg", label: "القاهرة 2024" },
  { type: "image" as const, src: "/conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (2).jpg", label: "القاهرة 2024" },
  { type: "image" as const, src: "/conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (3).jpg", label: "القاهرة 2024" },
  { type: "image" as const, src: "/conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (4).jpg", label: "القاهرة 2024" },
  { type: "image" as const, src: "/conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (5).jpg", label: "القاهرة 2024" },
  { type: "image" as const, src: "/conferences/hodaidah conference- 2026/hodaidah_conference (1).jpg", label: "الحديدة 2026" },
  { type: "image" as const, src: "/conferences/hodaidah conference- 2026/hodaidah_conference (2).jpg", label: "الحديدة 2026" },
  { type: "image" as const, src: "/conferences/hodaidah conference- 2026/hodaidah_conference (3).jpg", label: "الحديدة 2026" },
  { type: "image" as const, src: "/conferences/hodaidah conference- 2026/hodaidah_conference (4).jpg", label: "الحديدة 2026" },
];
const LOOPED_ITEMS = [...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS];
const LIGHTBOX_IMAGES = GALLERY_ITEMS.map((i) => i.src!);

const KIDS_IMAGES = Array.from({ length: 8 }).map((_, i) => `/staff/kids/kid_${i + 1}.svg`);
const KIDS_WITH_LOGO = [...KIDS_IMAGES.map(src => ({ type: "image", src })), { type: "logo", src: "/logo-break.png" }];
const LOOPED_KIDS = [...KIDS_WITH_LOGO, ...KIDS_WITH_LOGO, ...KIDS_WITH_LOGO, ...KIDS_WITH_LOGO, ...KIDS_WITH_LOGO, ...KIDS_WITH_LOGO, ...KIDS_WITH_LOGO, ...KIDS_WITH_LOGO];

// ─────────────────────────────────────────────
// UX COMPONENTS: Pure GSAP
// ─────────────────────────────────────────────

function GsapMagnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.2);
      yTo(y * 0.2);
    };

    const reset = () => { xTo(0); yTo(0); };

    el.addEventListener("mousemove", handleMouse);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", handleMouse); el.removeEventListener("mouseleave", reset); };
  }, []);

  return React.cloneElement(children as React.ReactElement<any>, { ref });
}

function GsapReveal({ children, className = "", delay = 0, yOffset = 30 }: { children: React.ReactNode; className?: string; delay?: number, yOffset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(ref.current, { y: yOffset, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay, scrollTrigger: { trigger: ref.current, start: "top 90%" } });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}

function GsapStaggerReveal({ children, className = "", delay = 0, stagger = 0.15, yOffset = 40 }: { children: React.ReactNode; className?: string; delay?: number, stagger?: number, yOffset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(ref.current!.children, { y: yOffset, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger, ease: "power3.out", delay, scrollTrigger: { trigger: ref.current, start: "top 90%" } });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}

function GsapEliteWordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  useGSAP(() => {
    gsap.fromTo('.gsap-word', { y: "120%", rotate: 5 }, { y: "0%", rotate: 0, duration: 1.2, stagger: 0.05, ease: "power3.out", delay, scrollTrigger: { trigger: ref.current, start: "top 90%" } });
  }, { scope: ref });

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-[0.2em] -mb-[0.2em]">
          <div className="gsap-word origin-top-left will-change-transform">{word}</div>
        </div>
      ))}
    </div>
  );
}

function GsapCurtainReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    tl.fromTo('.gsap-curtain-mask', { scaleY: 1 }, { scaleY: 0, duration: 1.2, ease: "power4.inOut", transformOrigin: "bottom" }, delay);
    tl.fromTo('.gsap-curtain-content', { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "power3.out" }, delay);
  }, { scope: ref });

  return (
    <div ref={ref} className={`relative overflow-hidden w-full h-full rounded-lg md:rounded-none ${className}`}>
      <div className="gsap-curtain-content w-full h-full">{children}</div>
      <div className="gsap-curtain-mask absolute inset-0 bg-[var(--page-bg)] z-10" />
    </div>
  );
}

function TimelineDrawingLine() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo('.gsap-timeline-line', { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top center", end: "bottom center", scrub: true } });
  }, { scope: ref });

  return (
    <div ref={ref} className="absolute right-[10px] md:right-[40px] top-0 bottom-0 w-[2px] bg-[var(--surface-hover)] origin-top">
      <div className="gsap-timeline-line w-full h-full bg-accent shadow-[0_0_20px_rgba(212,230,22,0.8)] origin-top will-change-transform" />
    </div>
  );
}

// ─────────────────────────────────────────────
// CONFERENCE GALLERY
// ─────────────────────────────────────────────
function ConferenceGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    
    let animationId: number;
    let lastTime = performance.now();
    
    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      
      if (!isDragging && !selectedImg) {
        const isRtl = document.dir === "rtl";
        const dir = isRtl ? -1 : 1;
        
        el.scrollLeft += dir * (dt * 0.06); // Speed multiplier
        
        if (isRtl && Math.abs(el.scrollLeft) >= (el.scrollWidth * 2/3)) {
             el.scrollLeft = -(el.scrollWidth / 3);
        } else if (!isRtl && el.scrollLeft >= (el.scrollWidth * 2/3)) {
             el.scrollLeft = (el.scrollWidth / 3);
        }
      }
      
      animationId = requestAnimationFrame(loop);
    };
    
    el.scrollLeft = document.dir === "rtl" ? -(el.scrollWidth / 3) : el.scrollWidth / 3;
    animationId = requestAnimationFrame(loop);
    
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, selectedImg]);

  useGSAP(() => {
    gsap.from('.gsap-gallery-card', {
      opacity: 0,
      y: 60,
      rotateX: 15,
      stagger: 0.05,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
      }
    });
  }, { scope: containerRef });

  const openLightbox = (src: string) => {
    if (dragged) return;
    setSelectedImg(src);
    setTimeout(() => {
      gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo('.gsap-lightbox-img', { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "power3.out" });
    }, 10);
  };

  const closeLightbox = () => {
    gsap.to(lightboxRef.current, { opacity: 0, duration: 0.4, onComplete: () => setSelectedImg(null) });
  };

  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setDragged(false); setStartX(e.pageX - scrollRef.current!.offsetLeft); setScrollLeft(scrollRef.current!.scrollLeft); };
  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; e.preventDefault(); setDragged(true); const x = e.pageX - scrollRef.current!.offsetLeft; scrollRef.current!.scrollLeft = scrollLeft - (x - startX) * 2; };

  const navigateLightbox = (dir: "next" | "prev", e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImg) return;
    const ci = LIGHTBOX_IMAGES.indexOf(selectedImg);
    setSelectedImg(dir === "next" ? LIGHTBOX_IMAGES[(ci + 1) % LIGHTBOX_IMAGES.length] : LIGHTBOX_IMAGES[(ci - 1 + LIGHTBOX_IMAGES.length) % LIGHTBOX_IMAGES.length]);
  };

  useEffect(() => {
    if (!selectedImg) return;
    const h = () => closeLightbox();
    window.addEventListener("wheel", h, { passive: true });
    return () => { window.removeEventListener("wheel", h); };
  }, [selectedImg]);

  return (
    <div ref={containerRef} className="relative w-full group py-4">
      {selectedImg && (
        <div ref={lightboxRef} className="fixed inset-0 z-[100] bg-[var(--page-bg)]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 opacity-0" onClick={closeLightbox}>
          <button type="button" className="interactive fixed top-6 right-6 md:top-8 md:right-8 z-[9999] w-14 h-14 flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} aria-label="Close">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="relative w-full max-w-[1000px] h-[70vh] lg:h-[85vh] flex items-center justify-center pointer-events-none">
            <button className="interactive absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-[var(--text-tertiary)] hover:text-accent transition-colors pointer-events-auto" onClick={(e) => navigateLightbox("prev", e)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" /></svg>
            </button>
            <button className="interactive absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-[var(--text-tertiary)] hover:text-accent transition-colors pointer-events-auto" onClick={(e) => navigateLightbox("next", e)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="gsap-lightbox-img relative w-full h-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <Image src={selectedImg} alt="Expanded View" fill className="object-contain" quality={100} />
            </div>
          </div>
        </div>
      )}

      <div style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <div ref={scrollRef} className={`interactive flex flex-row overflow-x-auto overflow-y-hidden gap-6 px-[10vw] pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          {LOOPED_ITEMS.map((item, idx) => (
            <div key={idx} className="gsap-gallery-card relative flex-none w-[85vw] md:w-[450px] lg:w-[500px] aspect-[4/3] group/card rounded-lg overflow-hidden card-surface pointer-events-auto" onClick={() => openLightbox(item.src!)}>
              <Image src={item.src!} alt="مشاركة علمية" fill quality={100} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover/card:scale-110 pointer-events-none" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--page-bg)]/90 via-transparent to-transparent pointer-events-none transition-opacity duration-700" />
              <div className="absolute bottom-4 left-4 right-4 text-right pointer-events-none">
                <span className="font-mono text-[10px] text-foreground opacity-90 transition-opacity duration-700 group-hover/card:opacity-100">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// KIDS EDITORIAL GALLERY (The Polaroid Stack)
// ─────────────────────────────────────────────
function KidsEditorialGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState(LOOPED_KIDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const topCard = newCards.shift();
        if (topCard) newCards.push(topCard);
        return newCards;
      });
    }, 2500); // Loops every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-20 bg-transparent font-sans overflow-hidden py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center justify-center px-6 md:px-[10vw]">
        
        <div className="w-full flex flex-col items-center justify-center gap-12 md:gap-24">
          
          {/* TITLE - Normal Document Flow with standard Reveal */}
          <GsapReveal className="w-full flex flex-col items-start gap-4 text-right z-50">
            <div className="w-12 h-[2px] bg-accent shadow-[0_0_10px_rgba(212,230,22,0.5)]" />
            <h2 className="text-4xl md:text-6xl font-black text-foreground font-heading dark:drop-shadow-[0_0_30px_var(--shadow-color)]">
              السبب وراء كل هذا
            </h2>
          </GsapReveal>

          {/* CARDS CONTAINER - Fixed Size, Framer Motion Loop */}
          <div className="relative w-[75vw] sm:w-[60vw] md:w-[35vw] aspect-[3/4] flex items-center justify-center pointer-events-none perspective-[1000px]">
            <AnimatePresence mode="popLayout">
              {cards.slice(0, 5).map((item, idx) => {
                return (
                  <motion.div 
                    key={item.src} 
                    layout
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ 
                      scale: 1 - idx * 0.05, 
                      y: idx * 20, 
                      opacity: 1 - idx * 0.15,
                      zIndex: 10 - idx,
                      rotate: idx === 0 ? 0 : idx % 2 === 0 ? idx * 2 : -idx * 2
                    }}
                    exit={{ y: -200, x: 100, opacity: 0, scale: 1.1, rotate: 15 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full bg-[#fdfdfd] p-3 pb-12 md:p-5 md:pb-24 rounded-sm shadow-[0_20px_50px_var(--shadow-color)] border border-gray-200"
                  >
                    <div className="relative w-full h-full overflow-hidden bg-[var(--page-bg)] rounded-sm shadow-inner">
                      {item.type === "logo" ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image src={item.src} alt="NMC" width={150} height={150} quality={100} className="opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
                        </div>
                      ) : (
                        <Image src={item.src} alt="قصة نجاح" fill quality={100} sizes="(max-width: 768px) 75vw, 35vw" className="object-cover" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function DrNajatDetailed() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const officeRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const conferenceRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to('.gsap-ambient-1', { opacity: 0.6, scale: 1.15, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to('.gsap-ambient-2', { opacity: 0.5, scale: 1.2, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
    gsap.to('.gsap-bg-pulse', { opacity: 0.85, scale: 1.05, duration: 15, yoyo: true, repeat: -1, ease: "sine.inOut" });

    const tl = gsap.timeline();
    tl.to('.gsap-hero-portrait', { opacity: 1, duration: 1.8, ease: "power3.out" });
    tl.to('.gsap-hero-text-item', { opacity: 1, y: 0, x: 0, stagger: 0.15, duration: 1.2, ease: "power3.out" }, "-=1.4");
    tl.to('.gsap-hero-line', { width: 64, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=1");
    tl.to('.gsap-scroll-indicator', { opacity: 1, duration: 1 }, "-=0.5");
    gsap.to('.gsap-scroll-line', { y: 10, duration: 1, yoyo: true, repeat: -1, ease: "power1.inOut" });

    gsap.to('.gsap-float-1', { y: -8, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to('.gsap-float-2', { y: -8, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
    gsap.to('.gsap-float-3', { y: -8, duration: 6.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });

    gsap.to('.gsap-hero-text-container', { y: -80, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to('.gsap-hero-portrait-container', { y: -30, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to('.gsap-ambient-1', { y: 100, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to('.gsap-ambient-2', { y: -100, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    
    gsap.to('.gsap-watermark', { y: -100, ease: "none", scrollTrigger: { trigger: watermarkRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to('.gsap-watermark-text', { y: -40, ease: "none", scrollTrigger: { trigger: watermarkRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    
    gsap.to('.gsap-journey-img', { y: 40, scale: 1.05, ease: "none", scrollTrigger: { trigger: journeyRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to('.gsap-journey-text', { y: -40, ease: "none", scrollTrigger: { trigger: journeyRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    
    gsap.to('.gsap-timeline-container', { y: -40, ease: "none", scrollTrigger: { trigger: timelineRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    
    gsap.to('.gsap-quote-mark', { y: -100, rotation: 5, ease: "none", scrollTrigger: { trigger: quoteRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to('.gsap-quote-text', { y: -40, ease: "none", scrollTrigger: { trigger: quoteRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    
    gsap.to('.gsap-office-img', { y: 50, scale: 1.02, ease: "none", scrollTrigger: { trigger: officeRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to('.gsap-office-text', { y: -60, ease: "none", scrollTrigger: { trigger: officeRef.current, start: "top bottom", end: "bottom top", scrub: true } });

    gsap.to('.gsap-conference-header', { y: -40, ease: "none", scrollTrigger: { trigger: conferenceRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to('.gsap-conference-list', { y: -20, ease: "none", scrollTrigger: { trigger: conferenceRef.current, start: "top bottom", end: "bottom top", scrub: true } });

    gsap.to('.gsap-cta-content', { y: -60, ease: "none", scrollTrigger: { trigger: ctaRef.current, start: "top bottom", end: "bottom top", scrub: true } });

    gsap.utils.toArray<HTMLElement>('.gsap-milestone').forEach((milestone) => {
      gsap.from(milestone.children, {
        opacity: 0,
        x: 50,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: milestone,
          start: "top 85%",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full overflow-clip text-foreground font-sans" dir="rtl">
      <div className="fixed inset-0 z-[-1] bg-[var(--page-bg)] overflow-hidden pointer-events-none">
      </div>
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <section ref={heroRef} className="relative w-full h-[100svh] bg-transparent overflow-hidden z-10">
        <div className="gsap-ambient-1 absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
        <div className="gsap-ambient-2 absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--surface-elevated)]/60 blur-[100px] pointer-events-none opacity-20" />
        <div className="gsap-hero-portrait-container absolute right-[-10vw] md:right-[0vw] bottom-0 w-[120vw] md:w-[55vw] h-[95svh] opacity-100 z-10 pointer-events-none will-change-transform">
          <div className="gsap-hero-portrait opacity-0 w-full h-full relative flex items-end justify-center overflow-visible">
            <Image src="/doctor.png" alt="Dr. Najat" fill className="object-contain object-bottom drop-shadow-[0_20px_40px_var(--shadow-color)] z-10" priority quality={100} />
          </div>
        </div>
        <div className="gsap-hero-text-container absolute top-[12svh] md:top-1/2 translate-y-0 md:-translate-y-1/2 left-0 right-0 md:right-auto md:left-[8vw] w-full px-6 md:px-0 md:max-w-[550px] z-20 will-change-transform">
          <div>
            <span className="gsap-hero-text-item block opacity-0 -translate-x-[40px] font-mono text-[11px] tracking-[0.2em] text-accent mb-3 uppercase">Medical Director</span>
            <h1 className="gsap-hero-text-item opacity-0 -translate-x-[40px] text-6xl md:text-7xl lg:text-8xl font-black text-foreground font-heading leading-tight mb-8 dark:drop-shadow-[0_0_80px_rgba(212,230,22,0.15)]">
              د. نجاة<br />الملس
            </h1>
            <div className="gsap-hero-line w-0 opacity-0 h-px bg-[var(--surface-hover)]" />
          </div>
        </div>
        <div className="gsap-scroll-indicator opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <div className="gsap-scroll-line w-px h-16 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        </div>
      </section>

      <section ref={watermarkRef} className="relative w-full md:min-h-[100svh] bg-transparent flex flex-col items-center justify-center pt-8 pb-6 md:py-24 px-6 overflow-hidden z-10">
        <div className="gsap-watermark absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] will-change-transform">
           <span className="text-[25vw] md:text-[40vw] font-black text-[var(--text-primary)] leading-none font-sans dark:drop-shadow-2xl">2014</span>
        </div>
        <div className="gsap-watermark-text w-full max-w-[1200px] mx-auto text-center relative z-10 will-change-transform">
          <GsapStaggerReveal yOffset={40} className="flex flex-col items-center justify-center gap-6 md:gap-12">
            <GsapEliteWordReveal text="أول استشارية يمنية في مجال الحقن المجهري في اليمن. استشارية أمراض النساء والتوليد بخبرة تزيد عن 30 عاماً في تقديم الرعاية الطبية والإنجابية." className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground/90 leading-[1.8] max-w-[900px] mx-auto text-balance justify-center" />
            <p className="text-4xl md:text-7xl lg:text-8xl text-[var(--text-primary)] font-black leading-[1.2] md:leading-[1.3] dark:drop-shadow-[0_0_40px_var(--border-subtle)]">
              في عام <span className="text-accent dark:drop-shadow-[0_0_40px_rgba(212,230,22,0.4)]">2014</span>،<br/>
              أسست <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">صرحها الخاص.</span>
            </p>
          </GsapStaggerReveal>
        </div>
      </section>

      <section ref={journeyRef} className="relative w-full md:min-h-[100svh] flex items-center bg-transparent pt-0 mt-0 pb-12 md:py-16 px-6 md:px-[10vw] z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-20 items-start">
          <div className="w-full md:w-[45%] aspect-[4/5] md:aspect-auto md:h-[600px] relative overflow-hidden rounded-lg md:rounded-none">
             <GsapCurtainReveal>
                <div style={{ maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)' }} className="gsap-journey-img w-full h-full relative will-change-transform">
                  <Image src="/staff/dr-najat-early-days.jpg" alt="د. نجاة الملس في بدايات مسيرتها" fill quality={100} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-90 transition-all duration-[2s] ease-[0.16,1,0.3,1]" />
                </div>
             </GsapCurtainReveal>
          </div>
          <GsapStaggerReveal className="gsap-journey-text w-full md:w-[55%] flex flex-col justify-center gap-8 pt-8 md:pt-16 will-change-transform">
            <GsapEliteWordReveal text="بعد تخرجها من كلية الطب بجامعة صنعاء عام 1990 وعملها كطبيبة في مستشفى الثورة، أدركت د. نجاة أهمية التخصص الدقيق في طب الإنجاب، فحصلت على الدبلوم العالي ثم شهادة البورد العربي في أمراض النساء والتوليد من دمشق." className="text-lg md:text-xl text-foreground/90 font-light leading-[2] text-justify" />
            
            <GsapEliteWordReveal text="وإلى جانب د. جبريل، جمعتهما رؤية مشتركة وشغف واحد؛ حيث عملا جنباً إلى جنب في بدايات مسيرتهما الطبية لتقديم الرعاية الشاملة والمتقدمة، وتذليل الصعاب أمام كل من يبحث عن الأمل في تحقيق حلم الأبوة والأمومة." className="text-lg md:text-xl text-foreground/90 font-light leading-[2] text-justify" />
          </GsapStaggerReveal>
        </div>
      </section>

      <section ref={timelineRef} className="relative w-full py-16 md:py-0 md:min-h-[100svh] flex flex-col justify-center bg-transparent px-6 z-10 overflow-hidden">
        <div className="max-w-[1000px] mx-auto relative flex flex-col justify-start w-full">
          
          <GsapStaggerReveal className="gsap-timeline-header text-center mb-16 md:mb-24 relative z-10 w-full flex flex-col items-center will-change-transform">
            <div className="w-12 h-[2px] bg-accent mb-4 shadow-[0_0_10px_rgba(212,230,22,0.5)]" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground font-heading">
              محطات <span className="text-transparent bg-clip-text bg-gradient-to-l from-accent to-accent/60">الأمل</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 font-light mt-4 text-center">
              مسيرة عطاء وتفانٍ تُتوج برسم الابتسامة على وجوه العائلات
            </p>
          </GsapStaggerReveal>

          <div className="relative flex justify-start gsap-timeline-container w-full will-change-transform">
            <TimelineDrawingLine />
            <div className="w-full flex flex-col gap-8 md:gap-16 relative z-10 py-6 md:py-10 pr-[40px] md:pr-[100px]">
            {MILESTONES.map((item, idx) => (
              <div key={idx} className="flex w-full justify-start">
                <div className="gsap-milestone w-full md:w-[80%] flex flex-col gap-4 text-right items-start relative">
                  <div className="absolute top-6 -right-[45px] md:-right-[65px] w-3 h-3 rounded-full bg-background border-[2px] border-accent shadow-[0_0_10px_rgba(212,230,22,0.5)] z-20" />
                  <span className="text-2xl md:text-6xl font-black font-heading tracking-widest text-accent dark:drop-shadow-[0_0_15px_rgba(212,230,22,0.3)]">{item.year}</span>
                  <p className="text-base md:text-2xl font-light text-foreground/90 leading-[1.6] md:leading-[1.8]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section ref={officeRef} className="relative w-full min-h-[80svh] md:min-h-[100svh] bg-transparent flex items-end md:items-center justify-end pb-12 pt-24 md:py-16 px-6 md:px-[10vw] z-10 overflow-hidden">
        <div className="gsap-office-img absolute inset-0 z-0 scale-[1.05] will-change-transform">
          <Image src="/staff/dr-najat-office-quote.jpg" alt="Dr. Najat in her office" fill quality={100} sizes="100vw" className="object-cover object-[90%_top] md:object-right-top" />
          <div className="absolute inset-x-0 bottom-0 h-[65%] md:h-full md:inset-y-0 md:left-0 md:right-auto md:w-[70%] bg-gradient-to-t md:bg-gradient-to-r from-accent via-accent/80 to-transparent opacity-95 md:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--page-bg)] via-transparent to-[var(--page-bg)] pointer-events-none opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
        </div>
        
        <GsapStaggerReveal yOffset={40} className="gsap-office-text relative z-10 w-full md:w-[60%] lg:w-[50%] flex flex-col gap-6 md:gap-8 will-change-transform">
          <div className="text-5xl md:text-7xl text-accent font-heading leading-none opacity-50">"</div>
          <p className="text-2xl md:text-3xl lg:text-4xl text-background font-light leading-[1.6] md:leading-[1.8] text-balance">
            رسالتي ليست مجرد تقديم علاج، بل هي رحلة أمل نبنيها معاً، خطوة بخطوة، حتى يتحقق حلم الأبوة والأمومة.
          </p>
          <div className="flex flex-col gap-2">
            <span className="text-xl md:text-2xl font-bold text-background font-heading">د. نجاة الملس</span>
            <span className="text-background/80 font-sans text-sm">المدير الطبي - إستشارية الحقن المجهري والمساعدة على الحمل</span>
          </div>
        </GsapStaggerReveal>
      </section>

      {/* SECTION 8: KIDS EDITORIAL GALLERY (The Polaroid Stack) */}
      <KidsEditorialGallery />

      {/* SECTION 9: THE QUOTE (God Mode Parallax) */}
      <section ref={quoteRef} className="relative w-full min-h-[60svh] md:min-h-[100svh] bg-transparent flex items-center justify-center px-6 py-12 md:py-16 overflow-hidden z-10">
        <div className="gsap-quote-mark absolute right-[10%] text-[15rem] md:text-[25rem] leading-none text-[var(--text-muted-light)] font-heading select-none pointer-events-none will-change-transform">
          "
        </div>
        
        <GsapReveal className="gsap-quote-text max-w-[900px] text-center relative z-10 will-change-transform" yOffset={40}>
          <GsapEliteWordReveal text="أؤمن أن كل زوجين يستحقان أن يعيشا تجربة الأبوة والأمومة." className="text-4xl md:text-5xl lg:text-6xl text-foreground font-light leading-[1.5] mb-12 font-heading text-balance mix-blend-difference drop-shadow-2xl justify-center" />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-[2px] bg-accent" />
            <span className="block text-sm font-mono text-foreground/60">
              د. نجاة الملس
            </span>
          </div>
        </GsapReveal>
      </section>

      {/* SECTION 10: CONFERENCE GALLERY & TRAINING */}
      <section ref={conferenceRef} className="relative w-full py-12 md:py-0 md:min-h-[100svh] flex flex-col justify-center bg-transparent overflow-hidden z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[10vw] mb-12 md:mb-16 flex flex-col items-end text-right">
          <GsapStaggerReveal className="gsap-conference-header flex flex-col items-end gap-4 w-full will-change-transform">
            <div className="w-12 h-[2px] bg-accent mb-2 shadow-[0_0_10px_rgba(212,230,22,0.5)]" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-heading mb-6">المشاركات العلمية والتدريب</h2>
            <p className="text-xl text-foreground/60 font-light leading-[1.8] max-w-[800px] mb-12">
              حرصت د. نجاة على المشاركة الفعالة في المؤتمرات العلمية الدولية والتدريب المستمر لمواكبة أحدث تقنيات الإخصاب المساعد:
            </p>
          </GsapStaggerReveal>

          <GsapStaggerReveal yOffset={60} className="gsap-conference-list w-full flex flex-col border-t border-[var(--border-subtle)] will-change-transform">
            {[
              { num: "01", title: "جمعية الشرق الأوسط للخصوبة (MEFS)", desc: "مشاركة فاعلة في المؤتمرات العلمية السنوية لمواكبة أحدث بروتوكولات الإخصاب الإقليمية والعالمية.", location: "بيروت / الأردن" },
              { num: "02", title: "جامعة لويس باستور", desc: "تدريب متقدم في مركز الطب التناسلي تحت إشراف رواد العقم في أوروبا، البروفيسور كورين رونجير وك. بتاهر.", location: "ستراسبورغ، فرنسا" },
              { num: "03", title: "مستشفى إديث كافيل وأليكس سيدني", desc: "تدريب سريري مكثف في مراكز الإخصاب الرائدة لتعزيز دقة تقنيات الحقن المجهري.", location: "بروكسل / الإسكندرية" }
            ].map((t, i) => (
              <div key={i} className="group relative border-b border-[var(--border-subtle)] py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden cursor-default transition-all duration-500 hover:bg-accent/[0.02]">
                <div className="absolute top-0 right-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                <div className="relative z-10 flex flex-row-reverse items-center gap-6 md:gap-12 w-full md:w-[50%] mb-6 md:mb-0">
                  <span className="text-5xl md:text-7xl font-black text-[var(--text-muted-light)] group-hover:text-accent/20 transition-colors font-mono tracking-tighter">{t.num}</span>
                  <div className="flex flex-col gap-2 text-right w-full">
                    <h3 className="text-2xl md:text-3xl font-heading text-foreground group-hover:text-accent transition-colors">{t.title}</h3>
                    <span className="text-sm font-mono text-foreground/60">{t.location}</span>
                  </div>
                </div>
                <div className="relative z-10 w-full md:w-[45%] text-right">
                  <p className="text-lg md:text-xl font-light text-foreground/80 leading-[1.8]">{t.desc}</p>
                </div>
              </div>
            ))}
          </GsapStaggerReveal>
        </div>
        
        <ConferenceGallery />
      </section>

      {/* FINAL CALL TO ACTION */}
      <section ref={ctaRef} className="relative w-full min-h-[60svh] md:min-h-[100svh] flex flex-col justify-center bg-transparent py-16 md:py-32 px-6 overflow-hidden z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <div className="gsap-cta-content max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 will-change-transform">
          <div className="w-full md:w-auto text-center md:text-right flex flex-col gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-foreground font-heading mb-4">
              ابدأوا رحلتكم <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-accent to-accent/60">باستشارة واحدة.</span>
            </h2>
            <p className="text-xl text-foreground/60 font-light">
              الخطوة الأولى نحو تحقيق حلمكم تبدأ بمحادثة.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col items-center md:items-end">
              <a 
                href="https://wa.me/967781878443?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%A1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%B9%20%D8%AF.%20%D9%86%D8%AC%D8%A7%D8%A9%20%D8%A7%D9%84%D9%85%D9%84%D8%B3"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive inline-flex items-center justify-center gap-4 w-full md:w-auto bg-accent text-background rounded-full px-10 py-6 font-bold text-xl hover:bg-white hover:text-background transition-colors duration-300 shadow-[0_0_40px_rgba(212,230,22,0.3)] hover:shadow-[0_0_60px_var(--text-muted-light)] hover:scale-105 active:scale-95"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل عبر الواتساب
              </a>
          </div>
        </div>
      </section>

    </div>
  );
}

