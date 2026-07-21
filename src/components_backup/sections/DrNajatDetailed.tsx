"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";

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
// UX COMPONENTS: Cursor, Magnetic, Reveals
// ─────────────────────────────────────────────



function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, className, delay = 0, yOffset = 30 }: { children: React.ReactNode; className?: string; delay?: number, yOffset?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CurtainReveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number, className?: string }) {
  return (
    <div className={`relative overflow-hidden w-full h-full rounded-lg md:rounded-none ${className || ''}`}>
      <motion.div
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay }}
        style={{ originY: 1 }}
        className="absolute inset-0 bg-[#000814] z-10"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// CONFERENCE GALLERY
// ─────────────────────────────────────────────
function ConferenceGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollLeft = document.dir === "rtl" ? -(el.scrollWidth / 3) : el.scrollWidth / 3;
    }
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setDragged(false); setStartX(e.pageX - scrollRef.current!.offsetLeft); setScrollLeft(scrollRef.current!.scrollLeft); };
  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; e.preventDefault(); setDragged(true); const x = e.pageX - scrollRef.current!.offsetLeft; scrollRef.current!.scrollLeft = scrollLeft - (x - startX) * 2; };

  const handleClick = (src: string) => { if (!dragged) setSelectedImg(src); };
  const closeLightbox = () => setSelectedImg(null);
  const navigateLightbox = (dir: "next" | "prev", e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImg) return;
    const ci = LIGHTBOX_IMAGES.indexOf(selectedImg);
    setSelectedImg(dir === "next" ? LIGHTBOX_IMAGES[(ci + 1) % LIGHTBOX_IMAGES.length] : LIGHTBOX_IMAGES[(ci - 1 + LIGHTBOX_IMAGES.length) % LIGHTBOX_IMAGES.length]);
  };

  useEffect(() => {
    if (!selectedImg) return;
    const h = () => setSelectedImg(null);
    window.addEventListener("wheel", h, { passive: true });
    window.addEventListener("touchmove", h, { passive: true });
    return () => { window.removeEventListener("wheel", h); window.removeEventListener("touchmove", h); };
  }, [selectedImg]);

  return (
    <div className="relative w-full group py-4">
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#000814]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12" onClick={closeLightbox}>
            <button type="button" className="interactive fixed top-6 right-6 md:top-8 md:right-8 z-[9999] w-14 h-14 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} aria-label="Close">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative w-full max-w-[1000px] h-[70vh] lg:h-[85vh] flex items-center justify-center pointer-events-none">
              <button className="interactive absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/40 hover:text-accent transition-colors pointer-events-auto" onClick={(e) => navigateLightbox("prev", e)}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" /></svg>
              </button>
              <button className="interactive absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/40 hover:text-accent transition-colors pointer-events-auto" onClick={(e) => navigateLightbox("next", e)}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" /></svg>
              </button>
              <motion.div key={selectedImg} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative w-full h-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <Image src={selectedImg} alt="Expanded View" fill className="object-contain" quality={100} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <div ref={scrollRef} className={`interactive flex flex-row overflow-x-auto overflow-y-hidden gap-6 px-[10vw] pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          {LOOPED_ITEMS.map((item, idx) => (
            <div key={idx} className="relative flex-none w-[85vw] md:w-[450px] lg:w-[500px] aspect-[4/3] group/card rounded-lg overflow-hidden card-surface pointer-events-auto" onClick={() => handleClick(item.src!)}>
              <Image src={item.src!} alt="مشاركة علمية" fill className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover/card:scale-110 pointer-events-none opacity-80" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/90 via-transparent to-transparent pointer-events-none opacity-80 transition-opacity duration-700 group-hover/card:opacity-40" />
              <div className="absolute bottom-4 left-4 right-4 text-right pointer-events-none">
                <span className="font-mono text-[10px] tracking-widest text-foreground opacity-90 transition-opacity duration-700 group-hover/card:opacity-100">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// KIDS EDITORIAL GALLERY (SUCCESS STORIES)
// ─────────────────────────────────────────────
function KidsEditorialGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-32 flex flex-col gap-8 md:gap-16 z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-[10vw] mb-12 flex flex-col items-start w-full">
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <div className="w-12 h-[2px] bg-accent shadow-[0_0_10px_rgba(212,230,22,0.5)]" />
            <h2 className="text-4xl md:text-6xl font-black text-foreground font-heading">
              السبب وراء كل هذا
            </h2>
          </div>
        </Reveal>
      </div>

      <div dir="ltr" className="w-full overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-8 md:gap-16 w-max"
        >
          {LOOPED_KIDS.map((item, idx) => (
            item.type === "logo" ? (
              <div key={idx} className="relative w-[70vw] md:w-[500px] lg:w-[600px] aspect-[4/3] flex items-center justify-center group/kid shrink-0">
                <Image src={item.src} alt="NMC Logo" width={200} height={200} className="opacity-80 group-hover/kid:opacity-100 transition-opacity duration-[1.5s]" />
              </div>
            ) : (
              <div key={idx} className="relative w-[70vw] md:w-[500px] lg:w-[600px] aspect-[4/3] overflow-hidden group/kid bg-black/40 shrink-0">
                <Image 
                  src={item.src} 
                  alt="قصة نجاح" 
                  fill 
                  sizes="(max-width: 768px) 60vw, 500px"
                  className="object-cover opacity-100 group-hover/kid:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]" 
                />
              </div>
            )
          ))}
        </motion.div>
      </div>

      <div dir="ltr" className="w-full overflow-hidden">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }} 
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="flex gap-8 md:gap-16 w-max"
        >
          {[...LOOPED_KIDS].reverse().map((item, idx) => (
            item.type === "logo" ? (
              <div key={idx} className="relative w-[60vw] md:w-[400px] lg:w-[500px] aspect-[4/3] flex items-center justify-center group/kid shrink-0">
                <Image src={item.src} alt="NMC Logo" width={150} height={150} className="opacity-80 group-hover/kid:opacity-100 transition-opacity duration-[1.5s]" />
              </div>
            ) : (
              <div key={idx} className="relative w-[60vw] md:w-[400px] lg:w-[500px] aspect-[4/3] overflow-hidden group/kid bg-black/40 shrink-0">
                <Image 
                  src={item.src} 
                  alt="قصة نجاح" 
                  fill 
                  sizes="(max-width: 768px) 50vw, 400px"
                  className="object-cover opacity-100 group-hover/kid:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]" 
                />
              </div>
            )
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function DrNajatDetailed() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax refs
  const heroRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);

  // Hero Parallax
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothHero = useSpring(heroScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const textY = useTransform(smoothHero, [0, 1], [0, -250]);
  const portraitY = useTransform(smoothHero, [0, 1], [0, -120]);

  // Journey Image Parallax
  const { scrollYProgress: journeyScroll } = useScroll({ target: journeyRef, offset: ["start end", "end start"] });
  const smoothJourney = useSpring(journeyScroll, { stiffness: 100, damping: 30 });
  const imageY = useTransform(smoothJourney, [0, 1], [-80, 80]);

  // Quote Parallax
  const { scrollYProgress: quoteScroll } = useScroll({ target: quoteRef, offset: ["start end", "end start"] });
  const smoothQuote = useSpring(quoteScroll, { stiffness: 100, damping: 30 });
  const quoteMarkY = useTransform(smoothQuote, [0, 1], [150, -150]);
  const quoteMarkRotate = useTransform(smoothQuote, [0, 1], [-10, 10]);

  // Office Parallax
  const officeRef = useRef<HTMLElement>(null);
  const { scrollYProgress: officeScroll } = useScroll({ target: officeRef, offset: ["start end", "end start"] });
  const smoothOffice = useSpring(officeScroll, { stiffness: 100, damping: 30 });
  const officeY = useTransform(smoothOffice, [0, 1], [-60, 60]);
  const officeScale = useTransform(smoothOffice, [0, 1], [1.1, 1]);

  return (
    <div ref={containerRef} className="relative w-full overflow-clip text-foreground font-sans" dir="rtl">
      
      {/* High Quality Deep Background Image (Sonar Service Page Style) */}
      <div className="fixed inset-0 z-[-1] bg-[#00050d] overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: [1, 0.85, 1], scale: [1, 1.05, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image src="/studio_spotlight_bg.png" alt="Luxury Dark Background" fill sizes="100vw" className="object-cover opacity-80 saturate-150" priority />
          <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[100px] pointer-events-none" />
        </motion.div>
      </div>


      {/* Film Grain Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      {/* SECTION 1: HERO */}
      <section ref={heroRef} className="relative w-full h-screen bg-transparent overflow-hidden z-10">
        
        {/* Ambient Lights */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#002140]/60 blur-[100px] pointer-events-none" />

        <motion.div 
          style={{ y: portraitY }}
          className="absolute right-[-10vw] md:right-[0vw] bottom-0 w-[120vw] md:w-[55vw] h-[95vh] opacity-100 z-10 pointer-events-none"
        >
          <motion.div 
            initial={{ opacity: 0, filter: "blur(20px)" }} 
            animate={{ opacity: 1, filter: "blur(0px)" }} 
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative flex items-end justify-center overflow-visible"
          >
            <Image
              src="/doctor.png"
              alt="Dr. Najat"
              fill
              className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10"
              priority
              quality={100}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ y: textY }}
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 md:right-auto md:left-[8vw] w-full px-6 md:px-0 md:max-w-[550px] z-20"
        >
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
              visible: { 
                opacity: 1, 
                x: 0, 
                filter: "blur(0px)",
                transition: { 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                } 
              }
            }}
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 0.8, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="block font-mono text-[11px] tracking-[0.2em] text-accent mb-3 uppercase">Medical Director</motion.span>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }} className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground font-heading leading-tight tracking-[-0.03em] mb-8 drop-shadow-[0_0_80px_rgba(212,230,22,0.15)]">
              د. نجاة<br />الملس
            </motion.h1>
            
            <motion.div variants={{ hidden: { width: 0, opacity: 0 }, visible: { width: 64, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="h-px bg-white/20 mb-8" />
            
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }} className="text-lg md:text-xl font-light text-foreground/90 mb-10 leading-[1.8]">
              أول طبيبة في مجال الحقن المجهري (IVF) في اليمن. استشارية أمراض النساء والتوليد بخبرة تزيد عن 30 عاماً في تقديم الرعاية الطبية والإنجابية.
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="flex items-center gap-4 text-foreground/60 text-sm md:text-base font-light">
              <span className="text-foreground font-medium tracking-wider">Arab Board</span>
              <span className="text-accent/50">·</span>
              <span>+30 سنة</span>
              <span className="text-accent/50">·</span>
              <span>أول مركز IVF باليمن</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-16 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        </motion.div>
      </section>

      {/* SECTION 2: SINGULAR STATEMENT */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] bg-transparent flex flex-col items-center justify-center py-32 px-6 overflow-hidden z-10">
        {/* Massive Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
           <span className="text-[40vw] font-black text-white leading-none font-sans dark:drop-shadow-2xl">2014</span>
        </div>
        
        <div className="w-full max-w-[1200px] mx-auto text-center relative z-10">
          <Reveal yOffset={40}>
            <div className="flex items-center justify-center gap-6 mb-12">
               <div className="w-16 md:w-32 h-[1px] bg-gradient-to-l from-accent to-transparent" />
               <span className="text-accent font-mono tracking-widest text-xs md:text-sm uppercase font-bold">The Turning Point</span>
               <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-accent to-transparent" />
            </div>
          </Reveal>
          
          <Reveal delay={0.2} yOffset={40}>
            <h2 className="text-xl md:text-3xl text-foreground/80 font-light leading-[1.8] md:leading-[2] text-balance mb-8 md:mb-12 max-w-[800px] mx-auto">
              بعد سنوات من العمل كأول استشارية إخصاب، رأت الحاجة الماسة لمركز متكامل بمعايير عالمية.
            </h2>
          </Reveal>
          
          <Reveal delay={0.4} yOffset={40}>
            <p className="text-4xl md:text-7xl lg:text-8xl text-white font-black leading-[1.2] md:leading-[1.3] tracking-tight dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              في عام <span className="text-accent dark:drop-shadow-[0_0_40px_rgba(212,230,22,0.4)]">2014</span>،<br/>
              أسست <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">صرحها الخاص.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3: THE JOURNEY */}
      <section ref={journeyRef} className="relative w-full bg-transparent py-24 px-6 md:px-[10vw] z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-start">
          
          {/* Parallax Curtain Image */}
          <div className="w-full md:w-[45%] h-[600px] relative overflow-hidden rounded-lg md:rounded-none">
             <CurtainReveal>
                <motion.div 
                  style={{ 
                    y: imageY, 
                    scale: 1.1,
                    maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)'
                  }} 
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/staff/dr-najat-early-days.jpg" 
                    alt="د. نجاة الملس في بدايات مسيرتها" 
                    fill 
                    className="object-cover opacity-90 transition-all duration-[2s] ease-[0.16,1,0.3,1]"
                  />
                </motion.div>
             </CurtainReveal>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[-30px] right-0 font-mono text-[11px] tracking-[0.15em] text-foreground/50"
            >
              مع المعلم د. سلام جبريل
            </motion.p>
          </div>

          <div className="w-full md:w-[55%] flex flex-col justify-center pt-8 md:pt-16">
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl text-foreground/90 font-light leading-[2] mb-10">
                بعد تخرجها من كلية الطب بجامعة صنعاء عام 1990 وعملها كطبيبة في مستشفى الثورة، أدركت د. نجاة أهمية التخصص الدقيق في طب الإنجاب، فحصلت على الدبلوم العالي ثم شهادة البورد العربي في أمراض النساء والتوليد من دمشق.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border-r-[3px] border-accent pr-6 my-12 bg-accent/[0.03] py-6 rounded-l-xl backdrop-blur-sm">
                <p className="text-2xl md:text-3xl text-accent font-heading italic font-light leading-relaxed">
                  لم تكتفِ بالمعرفة المحلية، بل سعت لاكتساب خبرات عالمية من رواد الإخصاب في أوروبا والشرق الأوسط.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-lg md:text-xl text-foreground/90 font-light leading-[2]">
                شاركت في أبرز مؤتمرات جمعية الشرق الأوسط للخصوبة (MEFS)، وتدربت في مستشفى لويس باستور بفرنسا وإديث كافيل ببلجيكا. وبعد أن عملت كأول استشارية لتقنيات الإخصاب (ART) في اليمن منذ 2001، أسست في عام 2014 مركزها الخاص (NMC) ليكون منارة متكاملة للأمل.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE WHY (PERSONAL HISTORY) */}
      <section className="relative w-full bg-transparent py-32 px-6 md:px-[10vw] z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-center">
          <div className="w-full md:w-1/2 relative h-[500px] md:h-[700px]">
             <CurtainReveal>
                <div className="w-full h-full relative group/story">
                  <Image 
                    src="/staff/dr-najat-personal-second-quote.jpg" 
                    alt="قصة د. نجاة الشخصية" 
                    fill 
                    className="object-cover opacity-90 transition-all duration-[2s] ease-in-out scale-105 group-hover/story:scale-100" 
                  />
                </div>
             </CurtainReveal>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <Reveal yOffset={40}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-black leading-[1.4] font-heading mb-10 dark:drop-shadow-xl text-right">
                القصة التي لم تُروَ
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="border-r-[3px] border-accent pr-6 mb-8 text-right">
                <p className="text-xl md:text-2xl text-foreground/90 font-light leading-[1.8]">
                  بدأت مسيرتها المهنية عام 1977 كممرضة في قسم رعاية الأمومة والطفولة. قبل أن تصبح رائدة الحقن المجهري، لامست عن قرب معاناة العائلات.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-lg md:text-xl text-foreground/70 font-light leading-[2.2] text-right">
                رحلتها الاستثنائية من ممرضة في تعز، إلى رئيسة تدريب للقابلات، ثم إلى طبيبة، تعكس شغفاً لا يلين. لم تختر الطب الإنجابي من باب الشغف الأكاديمي البحت؛ بل لأنها رأت وفهمت تماماً معنى أن تفقد العائلة الأمل ثم تعاود المحاولة بقلبٍ يرتجف. في عيادتها، لا توجد "حالات طبية معقدة"، بل عائلات تقف على الحافة، تقاتل من أجل حلمهم كأنه حلمها الشخصي.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: CREDENTIALS STRIP */}
      <section className="relative w-full bg-transparent py-20 mt-16 overflow-hidden z-10">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
            <Reveal className="flex-1 text-center md:border-l border-white/10 md:last:border-0 pb-10 md:pb-0 border-b md:border-b-0 group">
              <span className="block text-3xl font-bold text-foreground mb-3 font-heading transition-colors group-hover:text-accent">البورد العربي</span>
              <span className="block text-sm text-foreground/60 font-light tracking-wide">في أمراض النساء والتوليد</span>
            </Reveal>

            <Reveal delay={0.1} className="flex-1 text-center md:border-l border-white/10 md:last:border-0 pb-10 md:pb-0 border-b md:border-b-0 group">
              <span className="block text-3xl font-bold text-foreground mb-3 font-heading transition-colors group-hover:text-accent">تأسيس مركز NMC</span>
              <span className="block text-sm text-foreground/60 font-light tracking-wide">في عام 2014</span>
            </Reveal>

            <Reveal delay={0.2} className="flex-1 text-center group">
              <span className="block text-3xl font-bold text-foreground mb-3 font-heading transition-colors group-hover:text-accent">+30 سنة خبرة</span>
              <span className="block text-sm text-foreground/60 font-light tracking-wide">في تقديم الرعاية الطبية والإنجابية</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 6: TIMELINE */}
      <section className="relative w-full bg-transparent py-32 px-6 z-10">
        <div className="max-w-[700px] ml-auto mr-auto md:mr-[15vw]">
          {MILESTONES.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1} yOffset={20}>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-10 group">
                <span className={`font-mono font-bold shrink-0 transition-all duration-500 ${item.year === "2014" ? "text-4xl text-accent dark:drop-shadow-[0_0_15px_rgba(212,230,22,0.5)]" : "text-xl text-accent/60 group-hover:text-accent"}`}>
                  {item.year}
                </span>
                <motion.div 
                  initial={{ scaleX: 0 }} 
                  whileInView={{ scaleX: 1 }} 
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: (idx * 0.1) + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "right" }}
                  className={`hidden md:block h-px shrink-0 relative transition-colors duration-500 ${item.year === "2014" ? "w-16 bg-accent" : "w-8 bg-white/20 group-hover:w-12 group-hover:bg-accent/50"}`} 
                />
                <span className={`font-light leading-[1.8] transition-colors duration-500 ${item.year === "2014" ? "text-2xl text-foreground font-medium" : "text-lg text-foreground/60 group-hover:text-foreground"}`}>
                  {item.text}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 7: THE OFFICE / PHILOSOPHY */}
      <section ref={officeRef} className="relative w-full min-h-[80vh] bg-transparent flex items-center justify-end py-24 px-6 md:px-[10vw] z-10 overflow-hidden">
        <motion.div style={{ y: officeY, scale: officeScale }} className="absolute inset-0 z-0">
          <Image 
            src="/staff/dr-najat-office-quote.jpg" 
            alt="Dr. Najat in her office" 
            fill 
            className="object-cover object-right-top" 
          />
          {/* Fade to Chartreuse (Accent) ONLY on the left 70% (where the text will be), leaving the right 30% completely bright */}
          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-accent via-accent/95 to-transparent" />
          {/* Blend top and bottom into the global dark background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00050d] via-transparent to-[#00050d] pointer-events-none opacity-80" />
        </motion.div>
        
        {/* Content on the left side (justify-end in RTL puts it on the left) */}
        <Reveal className="max-w-[700px] text-right relative z-10" yOffset={40}>
          <svg className="w-12 h-12 md:w-16 md:h-16 text-[#00050d] mb-8 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p className="text-3xl md:text-5xl lg:text-5xl text-[#00050d] font-black leading-[1.6] mb-12 font-heading text-balance dark:drop-shadow-sm">
            لا نتعامل مع أرقام. نحن نستقبل أحلاماً مؤجلة. ومهمتي هي أن أمنح هذه الأحلام أفضل فرصة علمية ممكنة لترى النور.
          </p>
          <div className="w-12 h-[3px] bg-[#00050d] shadow-sm" />
        </Reveal>
      </section>

      {/* SECTION 8: KIDS EDITORIAL GALLERY (The Reason) */}
      <KidsEditorialGallery />

      {/* SECTION 9: THE QUOTE (God Mode Parallax) */}
      <section ref={quoteRef} className="relative w-full min-h-screen bg-transparent flex items-center justify-center px-6 py-20 overflow-hidden z-10">
        <motion.span 
          style={{ y: quoteMarkY, rotate: quoteMarkRotate }}
          className="absolute right-[10%] text-[25rem] leading-none text-white/[0.015] font-heading select-none pointer-events-none"
        >
          "
        </motion.span>
        
        <Reveal className="max-w-[900px] text-center relative z-10" yOffset={40}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-light leading-[1.5] mb-12 font-heading text-balance mix-blend-difference dark:drop-shadow-2xl">
            أؤمن أن كل امرأة<br />تستحق أن تعيش<br />تجربة الأمومة.
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-[2px] bg-accent" />
            <span className="block text-sm font-mono tracking-widest text-foreground/60 uppercase">
              د. نجاة الملس
            </span>
          </div>
        </Reveal>
      </section>

      {/* SECTION 10: CONFERENCE GALLERY & TRAINING */}
      <section className="relative w-full bg-transparent py-24 overflow-hidden z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[10vw] mb-24 flex flex-col items-end text-right">
          <Reveal>
            <div className="flex flex-col items-end gap-4">
              <div className="w-12 h-[2px] bg-accent mb-2 shadow-[0_0_10px_rgba(212,230,22,0.5)]" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-heading mb-6 tracking-tight">المشاركات العلمية والتدريب</h2>
            </div>
            <p className="text-xl text-foreground/60 font-light leading-[1.8] max-w-[800px] mb-12">
              حرصت د. نجاة على المشاركة الفعالة في المؤتمرات العلمية الدولية والتدريب المستمر لمواكبة أحدث تقنيات الإخصاب المساعد:
            </p>
          </Reveal>

          <Reveal delay={0.2} className="w-full">
            <div className="flex flex-col w-full border-t border-white/10">
              {[
                {
                  num: "01",
                  title: "جمعية الشرق الأوسط للخصوبة (MEFS)",
                  desc: "مشاركة فاعلة في المؤتمرات العلمية السنوية لمواكبة أحدث بروتوكولات الإخصاب الإقليمية والعالمية.",
                  location: "بيروت / الأردن"
                },
                {
                  num: "02",
                  title: "جامعة لويس باستور",
                  desc: "تدريب متقدم في مركز الطب التناسلي تحت إشراف رواد العقم في أوروبا، البروفيسور كورين رونجير وك. بتاهر.",
                  location: "ستراسبورغ، فرنسا"
                },
                {
                  num: "03",
                  title: "مستشفى إديث كافيل وأليكس سيدني",
                  desc: "تدريب سريري مكثف في مراكز الإخصاب الرائدة لتعزيز دقة تقنيات الحقن المجهري.",
                  location: "بروكسل / الإسكندرية"
                }
              ].map((t, i) => (
                <div key={i} className="group relative border-b border-white/10 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden cursor-default transition-all duration-500 hover:bg-accent/[0.02]">
                  {/* Hover background slide */}
                  <div className="absolute top-0 right-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                  
                  {/* Title & Number */}
                  <div className="relative z-10 flex flex-row-reverse items-center gap-6 md:gap-12 w-full md:w-[50%] mb-6 md:mb-0">
                    <span className="text-5xl md:text-7xl font-black text-white/5 group-hover:text-accent/20 transition-colors font-mono tracking-tighter">
                      {t.num}
                    </span>
                    <div className="flex flex-col gap-2 text-right w-full">
                      <h3 className="text-2xl md:text-3xl font-heading text-foreground group-hover:text-accent transition-colors">
                        {t.title}
                      </h3>
                      <span className="text-sm font-mono tracking-widest text-foreground/40 uppercase">
                        {t.location}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="relative z-10 w-full md:w-[45%] text-right">
                    <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed group-hover:text-foreground/90 transition-colors">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        
        <Reveal>
          <ConferenceGallery />
        </Reveal>
      </section>

      {/* SECTION 11: CTA */}
      <section className="relative w-full py-32 md:py-48 px-6 overflow-hidden z-10">

        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
          <Reveal className="w-full md:max-w-[600px] text-center md:text-right mb-12 md:mb-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.2] mb-6 font-heading">
              رحلتك تبدأ<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-accent to-accent/60">باستشارة واحدة.</span>
            </h2>
            <p className="text-xl text-foreground/60 font-light">
              الخطوة الأولى نحو تحقيق حلمك تبدأ بمحادثة.
            </p>
          </Reveal>
          
          <Reveal delay={0.2} className="w-full md:w-auto flex flex-col items-center md:items-end">
            <Magnetic>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/967781878443?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%A1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%B9%20%D8%AF.%20%D9%86%D8%AC%D8%A7%D8%A9%20%D8%A7%D9%84%D9%85%D9%84%D8%B3"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive inline-flex items-center justify-center gap-4 w-full md:w-auto bg-accent text-background rounded-full px-10 py-6 font-bold text-xl hover:bg-white hover:text-background transition-colors duration-300 shadow-[0_0_40px_rgba(212,230,22,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل عبر الواتساب
              </motion.a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

