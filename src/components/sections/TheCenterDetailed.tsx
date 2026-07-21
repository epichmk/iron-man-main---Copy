"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { ArrowUpLeft } from "lucide-react";

// ─────────────────────────────────────────────
// PARALLAX WRAPPER
// ─────────────────────────────────────────────
function Parallax({
  children,
  offset = 50,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y = useTransform(smoothProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────
function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// UNIFIED ANIMATION VARIANTS
// ─────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};

// ─────────────────────────────────────────────
// FACILITY DATA
// ─────────────────────────────────────────────
const FACILITY_AREAS = [
  {
    id: "lab",
    title: "مختبر الأجنة",
    subtitle: "Embryology Lab",
    description: "مجهز بأحدث حاضنات الأجنة ثلاثية الغازات وأنظمة المراقبة المستمرة 24/7 لضمان أعلى معدلات تطور الأجنة.",
    images: [
      "/facility-images/lab/the lab (1).JPG",
      "/facility-images/lab/the lab (2).JPG",
      "/facility-images/lab/the lab (3).JPG",
      "/facility-images/lab/the lab (4).JPG",
      "/facility-images/lab/the lab (5).JPG",
      "/facility-images/lab/the lab (6).JPG",
    ],
    accent: "#d4e616",
    stat: "99.9%",
    statLabel: "تعقيم",
  },
  {
    id: "operation",
    title: "غرفة العمليات",
    subtitle: "Operation Theater",
    description: "غرفة مزودة بنظام تهوية HEPA وضغط إيجابي، مع أجهزة تخدير ومراقبة حيوية متطورة.",
    images: [
      "/facility-images/operation-room/operation room.JPG",
      "/facility-images/operation-room/operation room 2.JPG",
    ],
    accent: "#0066FF",
    stat: "ISO 7",
    statLabel: "معيار",
  },
  {
    id: "freezing",
    title: "وحدة التجميد",
    subtitle: "Cryopreservation",
    description: "تقنية Vitrification لحفظ الأجنة والبويضات بالنيتروجين السائل عند -196°C.",
    images: [
      "/facility-images/freezing-unit/freezing samples unit (1).JPG",
      "/facility-images/freezing-unit/freezing samples unit (2).JPG",
      "/facility-images/freezing-unit/freezing samples unit (3).JPG",
    ],
    accent: "#0066FF",
    stat: "-196°C",
    statLabel: "حفظ",
  },
  {
    id: "checkup",
    title: "غرف الفحص",
    subtitle: "Examination",
    description: "غرف خاصة مجهزة بأجهزة السونار رباعية الأبعاد لتصوير دقيق ومريح.",
    images: [
      "/facility-images/check up room/398A2601.JPG",
      "/facility-images/check up room/398A2798.JPG",
    ],
    accent: "#8B5CF6",
    stat: "4D",
    statLabel: "تصوير",
  },
  {
    id: "reception",
    title: "الاستقبال",
    subtitle: "Reception",
    description: "صالة فاخرة مصممة لتوفير بيئة هادئة تراعي خصوصية كل مريضة.",
    images: [
      "/facility-images/reception/reception (1).JPG",
      "/facility-images/reception/reception (2).JPG",
    ],
    accent: "#F59E0B",
    stat: "100%",
    statLabel: "خصوصية",
  },
  {
    id: "recovery",
    title: "غرفة الإفاقة",
    subtitle: "Recovery",
    description: "جناح إفاقة خاص مع مراقبة طبية مستمرة وطاقم تمريض متخصص.",
    images: [
      "/facility-images/recovery-room/recovery room.JPG",
    ],
    accent: "#EC4899",
    stat: "24/7",
    statLabel: "مراقبة",
  },
];

// ─────────────────────────────────────────────
// FACILITY GALLERY WITH LIGHTBOX
// ─────────────────────────────────────────────
function FacilityExplorer() {
  const [activeArea, setActiveArea] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const area = FACILITY_AREAS[activeArea];

  React.useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.children[activeArea] as HTMLElement;
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeArea]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Navigation Tabs (Vertical) */}
        <div ref={tabsRef} className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {FACILITY_AREAS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActiveArea(i)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-right transition-all duration-500 border whitespace-nowrap flex-shrink-0 ${
                i === activeArea
                  ? "bg-[var(--surface-elevated)] border-[var(--border-medium)] shadow-lg"
                  : "bg-transparent border-transparent hover:bg-[var(--surface-elevated)]"
              }`}
            >
              {i === activeArea && (
                <motion.div
                  layoutId="facilityActiveTab"
                  className="absolute inset-0 rounded-2xl border pointer-events-none"
                  style={{ borderColor: a.accent, borderWidth: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500"
                style={{ backgroundColor: i === activeArea ? a.accent : "var(--border-subtle)" }}
              />
              <div className="flex flex-col items-start relative z-10">
                <span className={`text-sm font-bold transition-colors duration-300 ${i === activeArea ? "text-[var(--text-primary)]" : "text-[var(--text-muted-light)]"}`}>
                  {a.title}
                </span>
                <span className="text-[9px] font-mono text-zinc-600 tracking-wider">{a.subtitle}</span>
              </div>
              {i === activeArea && (
                <div className="mr-auto flex items-center gap-1.5 relative z-10">
                  <span className="text-xs font-mono font-bold" style={{ color: a.accent }}>{a.stat}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right: Active Area Content */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -40) {
                  setActiveArea((prev) => Math.min(prev + 1, FACILITY_AREAS.length - 1));
                } else if (offset.x > 40) {
                  setActiveArea((prev) => Math.max(prev - 1, 0));
                }
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              {/* Description Bar */}
              <div className="flex items-center justify-between mb-5 p-4 bg-[var(--surface-elevated)]  rounded-2xl">
                <p className="text-sm text-[var(--text-tertiary)] font-light leading-relaxed flex-1 text-balance">{area.description}</p>
                <div className="flex-shrink-0 mr-4 flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: `${area.accent}10`, border: `1px solid ${area.accent}20` }}>
                  <span className="font-mono text-lg font-bold" style={{ color: area.accent }}>{area.stat}</span>
                  <span className="text-[10px] text-[var(--text-muted-light)] font-mono">{area.statLabel}</span>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {area.images.map((img, i) => (
                  <motion.div
                    key={img}
                    initial={
                      i === area.images.length - 1 && area.images.length > 3
                        ? { opacity: 0, scale: 0.85, y: 140 }
                        : { opacity: 0, scale: 0.9, y: 80 }
                    }
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: i * 0.15, 
                      duration: i === area.images.length - 1 && area.images.length > 3 ? 1.8 : 1.2, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    onClick={() => setLightboxImg(img)}
                    className={`relative rounded-2xl overflow-hidden  cursor-pointer group ${
                      i === 0 
                        ? "col-span-2 row-span-2 h-[260px] md:h-[360px]" 
                        : i === area.images.length - 1 && area.images.length > 3
                          ? "col-span-2 md:col-span-3 h-[180px] md:h-[240px]"
                          : "col-span-1 h-[130px] md:h-[175px]"
                    }`}
                  >
                    <motion.div 
                       animate={{ scale: [1.02, 1.08, 1.02], x: [0, -8, 8, 0], y: [0, 8, -8, 0] }} 
                       transition={{ duration: 20 + (i * 3), repeat: Infinity, ease: "linear" }}
                       className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                      <Image
                        src={img}
                        alt={area.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 pointer-events-auto"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <div className="absolute inset-0 border-2 border-transparent group- rounded-2xl transition-all duration-500 z-20" />
                    {/* Expand icon */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[var(--overlay-bg)] backdrop-blur-md  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 scale-75 group-hover:scale-100">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImg(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }}
              className="absolute top-6 left-6 z-50 w-12 h-12 rounded-full bg-[var(--surface-hover)]  flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxImg} alt="Facility" fill className="object-contain" sizes="90vw" quality={95} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function TheCenterDetailed() {
  // Force scroll to top on mount so the user ALWAYS lands on the hero banner
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
    return () => clearTimeout(t);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Hero Parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothHeroScroll = useSpring(heroScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroBgY = useTransform(smoothHeroScroll, [0, 1], [0, 500]);
  const heroContentY = useTransform(smoothHeroScroll, [0, 1], [0, -150]);
  const heroOpacity = useTransform(smoothHeroScroll, [0, 0.8], [1, 0]);
  const heroVideoScale = useTransform(smoothHeroScroll, [0, 1], [1, 1.25]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-transparent overflow-clip selection:bg-accent/30 selection:text-[var(--text-primary)]"
      dir="rtl"
    >
      {/* ──────── AMBIENT BACKGROUND ──────── */}
      <div className="fixed top-0 right-0 w-[70vw] h-[70vh] bg-[radial-gradient(ellipse_at_top_right,var(--surface-glass)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_bottom_left,rgba(212,230,22,0.03)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />



      {/* ═══════════════════════════════════════════
          SECTION 1: CINEMATIC VIDEO HERO
          ═══════════════════════════════════════════ */}
      <section
        id="the-center-hero"
        ref={heroRef}
        className="relative z-10 w-full h-[100svh] snap-start flex items-center justify-center overflow-hidden bg-transparent"
      >
        {/* Video Background with Parallax Scale */}
        <motion.div style={{ scale: heroVideoScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40" src="/cinematic-banner.mp4" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)]" />
        </motion.div>

        {/* Ghost Typography */}
        <motion.div style={{ y: heroBgY, opacity: heroOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]">
          <h1 className="text-[10rem] md:text-[16rem] lg:text-[22rem] font-bold text-[var(--text-primary)] whitespace-nowrap tracking-tighter opacity-[0.03]">
            NMC
          </h1>
        </motion.div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none z-[1]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-[1]" />

        {/* Hero Content */}
        <motion.div style={{ y: heroContentY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-[1000px]">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="flex flex-col items-center">
            {/* Logo */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-20 h-20 mb-8 relative">
              <Image src="/nmc-logo.png" alt="NMC Logo" fill className="object-contain logo-shadow" />
            </motion.div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-gradient-to-l from-[#d4e616] to-transparent" />
              <span className="text-accent font-mono tracking-[0.3em] uppercase text-[10px] font-bold">Najat Medical Center — Est. 2014</span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#d4e616] to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4 leading-tight text-balance">
              حيث يبدأ الحلم
            </h2>

            <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white font-light mb-3">
              مركز رائد ومتكامل للحقن المجهري وأطفال الأنابيب في اليمن
            </p>

            <p className="text-sm text-[var(--text-tertiary)]/80 leading-relaxed font-light max-w-xl mb-10 text-balance">
              نجمع بين أحدث تقنيات الإخصاب — ICSI, IMSI, PGT — والخبرة السريرية المتراكمة لأكثر من عقدين، لنقدم رعاية طبية بمعايير عالمية على أرض اليمن.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-1">
              {[
                { value: "2014", label: "سنة التأسيس", color: 'var(--accent)' },
                { value: "Arab Board", label: "البورد العربي", color: "#0066FF" },
                { value: "1000+", label: "حالة نجاح", color: "#0066FF" },
                { value: "6", label: "أقسام متخصصة", color: "#8B5CF6" },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.12, duration: 0.8 }} className="flex flex-col items-center gap-1 px-5 py-3 bg-[var(--surface-elevated)]  rounded-2xl min-w-[100px]">
                  <span className="text-xl md:text-2xl font-bold text-[var(--text-primary)] font-mono" dir="ltr">{stat.value}</span>
                  <span className="text-[10px] font-mono tracking-wide" style={{ color: stat.color }}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted-light)]">استكشف المركز</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-4 h-7 rounded-full  flex items-start justify-center p-1">
            <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1.5 bg-accent rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: THE FOUNDING STORY
          ═══════════════════════════════════════════ */}
      <section id="the-center-story" className="relative z-10 w-full min-h-[100svh] snap-start flex flex-col justify-center overflow-hidden py-20 md:py-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0066FF]/5 blur-[200px] rounded-full pointer-events-none" />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="w-full max-w-[1300px] mx-auto px-6 md:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Right: Story */}
            <Parallax offset={-40} className="flex flex-col relative z-10 order-1">
              <motion.div variants={fadeUp}>
                <span className="text-accent font-mono text-sm tracking-[0.3em] uppercase block mb-6">/ القصة</span>
                <span className="absolute -top-10 right-0 text-[8rem] text-[var(--text-muted-light)] font-serif leading-none select-none pointer-events-none">&quot;</span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-[1.4] mb-6 text-balance">
                  من حلم طبيبة إلى{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-[#0066FF]">صرح طبي رائد</span>
                </h2>

                <p className="text-base md:text-lg text-[var(--text-secondary)]/80 leading-[1.8] font-light mb-5 text-balance">
                  في عام 2014، قررت د. نجاة الملس — بعد سنوات من التدريب في بريطانيا ومصر — أن تنقل أحدث تقنيات الحقن المجهري إلى أرض الوطن بتأسيس مركز بمعايير عالمية.
                </p>
                <p className="text-base text-[var(--text-tertiary)]/70 leading-[1.8] font-light mb-8 text-balance">
                  اليوم، يقف مركز NMC شاهداً على تلك الرؤية: أكثر من 1000 حالة نجاح، وفريق من أكثر من 25 متخصصاً، وتجهيزات تضاهي أرقى المراكز الأوروبية.
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#d4e616] to-transparent" />
                  <span className="text-[var(--text-muted-light)] text-sm font-mono tracking-wider">— تأسس 2014، صنعاء</span>
                </div>
              </motion.div>
            </Parallax>

            {/* Left: Director Image */}
            <Parallax offset={60} className="relative z-10 flex flex-col w-full order-2">
              <motion.div variants={fadeUp} className="relative w-full aspect-[3/4] max-h-[520px] rounded-3xl overflow-hidden  group shadow-2xl">
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
                <Image src="/staff/medical director dr. najat al-malas 3.png" alt="د. نجاة الملس" fill className="object-cover object-top transition-all duration-700 scale-105 group-hover:scale-100" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute bottom-6 right-6 left-6 z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase">المؤسسة والمديرة الطبية</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">د. نجاة الملس</h3>
                  <p className="text-xs text-[var(--text-tertiary)] font-light mt-1">البورد العربي في أمراض النساء والتوليد</p>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div variants={fadeUp} className="absolute -bottom-4 -left-4 z-30 bg-[var(--page-bg)]  rounded-2xl p-4 shadow-2xl backdrop-blur-xl border border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-mono text-sm font-bold">30+</span>
                  </div>
                  <div>
                    <p className="text-[var(--text-primary)] text-sm font-bold">سنة خبرة</p>
                    <p className="text-[var(--text-muted-light)] text-[10px] font-mono">طب أسرة وإخصاب</p>
                  </div>
                </div>
              </motion.div>
            </Parallax>
          </div>
        </motion.div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTION 2.5: MISSION & VISION
          ═══════════════════════════════════════════ */}
      <section id="the-center-mission" className="relative z-10 w-full min-h-[100svh] snap-start flex flex-col justify-center overflow-hidden py-20 md:py-28">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#0066FF]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          <Parallax offset={-30}>
            {/* Removed Golden Thread */}

            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center w-full gap-16 lg:gap-20">
              
              {/* Primary Massive Staggered Heading */}
              <div className="flex flex-col items-center lg:items-end shrink-0">
                <motion.div variants={fadeUp} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mb-8 md:mb-12">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 opacity-90 hover:scale-110 transition-transform duration-500">
                    <Image src="/nmc-logo.png" alt="NMC Logo" fill className="object-contain logo-shadow" />
                  </div>
                  <div className="flex items-center gap-4 lg:gap-6">
                    <span className="text-accent font-mono tracking-[0.5em] uppercase text-xs md:text-sm">MISSION & VISION</span>
                  </div>
                </motion.div>
                
                <motion.h2 variants={fadeUp} className="text-center lg:text-right text-[clamp(4.5rem,10vw,9rem)] font-black font-heading leading-[0.85] tracking-tight w-full flex flex-col items-center lg:items-end">
                  <span className="block text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors duration-500">رسالتنا</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-600 lg:pr-24 hover:-translate-x-4 transition-transform duration-700">ورؤيتنا.</span>
                </motion.h2>
              </div>

              {/* Highly Structured Paragraph Blocks */}
              <div className="flex flex-col items-end gap-6 md:gap-8 mt-12 lg:mt-0 shrink-0">
                 <motion.div variants={fadeUp} className="border-r-4 border-[#d4e616] pr-6 md:pr-8 py-2 md:py-4 bg-gradient-to-l from-[#d4e616]/[0.02] to-transparent hover:from-[#d4e616]/[0.05] transition-colors duration-500">
                   <p className="text-[var(--text-secondary)] text-lg md:text-xl lg:text-2xl leading-[1.8] md:leading-[2] font-light text-right max-w-[30ch]" dir="rtl">
                     تتمثل رؤيتنا في ريادة مجال الحقن المجهري والمساعدة على الحمل وبناء مسارات متكاملة للأمل.
                   </p>
                 </motion.div>
                 <motion.div variants={fadeUp} className="border-r-4 border-blue-500 pr-6 md:pr-8 py-2 md:py-4 bg-gradient-to-l from-blue-500/[0.02] to-transparent hover:from-blue-500/[0.05] transition-colors duration-500">
                   <p className="text-[var(--text-secondary)] text-lg md:text-xl lg:text-2xl leading-[1.8] md:leading-[2] font-light text-right max-w-[30ch]" dir="rtl">
                     بينما ترتكز رسالتنا على دمج التكنولوجيا العالمية مع الرعاية الإنسانية الفائقة لضمان أعلى نسب النجاح في رحلتكم.
                   </p>
                 </motion.div>
              </div>

            </div>
          </Parallax>
        </motion.div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 3: FACILITY DEEP DIVE
          ═══════════════════════════════════════════ */}
      <section id="the-center-facility" className="relative z-10 w-full min-h-[100svh] snap-start flex flex-col justify-center overflow-hidden py-20 md:py-28 bg-gradient-to-b from-transparent via-[#000a1a]/50 to-transparent">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <Parallax offset={-25}>
            <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
              <span className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase block mb-4">/ جولة داخل المركز</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-[1.5] text-balance max-w-[800px] mx-auto">
                تجهيزات{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-[#0066FF]">عالمية المستوى</span>
                {" "}في قلب صنعاء
              </h2>
            </motion.div>
          </Parallax>

          <motion.div variants={fadeUp}>
            <FacilityExplorer />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: LEADERSHIP (AWARD WINNING REDESIGN)
          ═══════════════════════════════════════════ */}
      <section id="the-center-leadership" className="relative w-full py-32 md:py-48 bg-transparent overflow-hidden z-10">
        {/* Core Lighting */}
        <div className="absolute top-0 right-[20%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08)_0%,transparent_70%)] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,230,22,0.05)_0%,transparent_70%)] pointer-events-none mix-blend-screen" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          <div className="flex flex-col items-center justify-center mb-24 pb-12 text-center">
            <ScrollReveal className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-accent font-mono tracking-widest text-xs uppercase font-bold">Leadership</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] font-heading leading-tight tracking-tight">
                قيادة برؤية<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-zinc-500 to-zinc-300">استثنائية.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal className="max-w-2xl text-center mt-8">
              <p className="text-[var(--text-tertiary)] font-light leading-relaxed text-lg">
                يجمع مركز NMC بين الخبرة الطبية العريقة والكفاءة الإدارية الصارمة لتقديم رعاية متكاملة لا تساوم على الجودة.
              </p>
            </ScrollReveal>
          </div>

          {/* Leader 1: Dr. Najat */}
          <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
            <Parallax offset={40} className="w-full lg:w-6/12 relative">
              <div className="relative aspect-square rounded-tr-[80px] rounded-bl-[80px] overflow-hidden border border-[var(--border-subtle)] shadow-[0_0_50px_var(--shadow-color)] group mb-8">
                <Image src="/staff/medical director dr. najat al-malas 3.png" alt="د. نجاة الملس" fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
              </div>
              
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent font-mono text-sm md:text-base tracking-[0.1em] uppercase">المديرة الطبية</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-1">د. نجاة الملس</h3>
              </div>
              {/* Floating Stat */}
              <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="absolute -left-12 top-1/4 bg-[var(--page-bg)]/80 backdrop-blur-xl border border-[var(--border-subtle)] p-6 rounded-3xl hidden md:block">
                <p className="text-4xl font-black text-[var(--text-primary)] font-mono mb-1">30<span className="text-accent">+</span></p>
                <p className="text-xs text-[var(--text-muted-light)] font-mono tracking-widest uppercase">Years Experience</p>
              </motion.div>
            </Parallax>
            
            <ScrollReveal className="w-full lg:w-7/12 flex flex-col justify-center relative px-2 md:px-0">
              <span className="text-[15rem] leading-none absolute -top-20 -right-10 text-[var(--text-muted-light)] font-serif select-none pointer-events-none">1</span>
              <h4 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 font-heading relative z-10 text-right">أول استشارية يمنية في الإخصاب المساعد في اليمن</h4>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed mb-6 relative z-10 max-w-[60ch] text-justify" dir="rtl">
                حاملة البورد العربي في أمراض النساء والتوليد. أكثر من 30 عاماً من الخبرة السريرية في تقديم الرعاية الطبية والإنجابية وتطوير بروتوكولات الحقن المجهري.
              </p>
              <ul className="flex flex-col gap-3 mb-8 relative z-10">
                {['تأسيس مركز NMC بمعايير عالمية', 'إدخال تقنيتي ICSI و IMSI لليمن', 'آلاف حالات النجاح الموثقة'].map((item, i) => (
                  <li key={i} className="flex items-center justify-start gap-3 text-[var(--text-secondary)] text-base md:text-lg">
                    <span className="text-accent font-black shrink-0">•</span>
                    <span className="text-right">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="relative z-10">
                <Link href="/dr-najat" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--surface-elevated)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-full text-[var(--text-primary)] font-medium transition-all duration-300 w-fit group">
                  <span>الملف الكامل</span>
                  <ArrowUpLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Leader 2: Dr. Khaled */}
          <div className="relative flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <Parallax offset={-40} className="w-full lg:w-6/12 relative">
              <div className="relative aspect-square rounded-tl-[80px] rounded-br-[80px] overflow-hidden border border-[var(--border-subtle)] shadow-[0_0_50px_var(--shadow-color)] group mb-8">
                <Image src="/staff/dr-khaled-cv.png" alt="د. خالد علي الجنداري" fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
              </div>
              
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-400 font-mono text-sm md:text-base tracking-[0.1em] uppercase">مدير المركز</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-1">د. خالد علي الجنداري</h3>
              </div>
            </Parallax>
            
            <ScrollReveal className="w-full lg:w-7/12 flex flex-col justify-center relative px-2 md:px-0">
              <span className="text-[15rem] leading-none absolute -top-20 -left-10 text-[var(--text-muted-light)] font-serif select-none pointer-events-none">2</span>
              <h4 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 font-heading relative z-10 text-right">المدير العام واستشاري الصحة العامة</h4>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed mb-6 relative z-10 max-w-[60ch] text-justify" dir="rtl">
                يقود العمليات الإدارية والتشغيلية للمركز منذ تأسيسه، ليكون الداعم الأول للدكتورة نجاة في مسيرتها المهنية كزوج وشريك نجاح.
                <br /><br />
                إلى جانب قيادته للمركز، يحمل درجة الدكتوراه في علوم الصحة العامة والتغذية من جامعة الإسكندرية، ويعمل كأستاذ مساعد بجامعة صنعاء. بصفته خبيراً وطنياً واستشارياً لدى المنظمات الدولية، يسخر خبراته الطبية لضمان تقديم رعاية صحية وغذائية متكاملة تدعم نجاح رحلة العلاج.
              </p>
              <ul className="flex flex-col gap-3 mb-8 relative z-10">
                {[
                  'دكتوراه (Ph.D) في التغذية والصحة العامة - جامعة الإسكندرية', 
                  'أستاذ مساعد بكلية الطب والعلوم الصحية - جامعة صنعاء', 
                  'استشاري وخبير وطني للتغذية لدى المنظمات الدولية (UNICEF, WHO)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-start gap-3 text-[var(--text-secondary)] text-base md:text-lg">
                    <span className="text-accent font-black shrink-0">•</span>
                    <span className="text-right">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
          
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: WHY NMC — DIFFERENTIATORS (BENTO GRID REDESIGN)
          ═══════════════════════════════════════════ */}
      <section id="the-center-why" className="relative w-full py-32 md:py-48 bg-transparent overflow-hidden z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-50 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <ScrollReveal className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] font-heading leading-tight tracking-tight mb-6">
              لماذا <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4e616] to-[#a8c400]">NMC؟</span>
            </h2>
            <p className="text-xl text-[var(--text-tertiary)] font-light max-w-2xl mx-auto">
              بنينا هذا الصرح ليكون الوجهة الأولى والنهائية لكل عائلة تبحث عن الأمل، مدعوماً بالعلم والرعاية الفائقة.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)] md:auto-rows-[minmax(300px,auto)]">
            
            {/* Bento Box 1: Tech */}
            <ScrollReveal className="md:col-span-2 relative bg-[var(--page-bg)] rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-[var(--border-subtle)] group">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,102,255,0.2)_0%,transparent_60%)] transition-opacity duration-700 opacity-50 group-hover:opacity-100 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between gap-8">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-[#0066FF]/10 flex items-center justify-center backdrop-blur-md border border-[#0066FF]/20">
                    <span className="text-2xl font-black text-[#0066FF] font-mono">01</span>
                  </div>
                  <span className="text-[8rem] font-black text-[var(--text-muted-light)] absolute -top-10 -left-6 pointer-events-none select-none">TECH</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 font-heading">تقنيات الجيل المتقدم</h3>
                  <p className="text-base text-[var(--text-tertiary)] font-light leading-relaxed max-w-lg text-balance">
                    المركز الوحيد في اليمن الذي يوفر تقنيتي ICSI و IMSI معاً، بالإضافة إلى الفحص الجيني قبل الزرع (PGT) لتحقيق أعلى معدلات النجاح.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Box 2: Privacy */}
            <ScrollReveal className="relative bg-[var(--page-bg)] rounded-[2.5rem] p-10 overflow-hidden border border-[var(--border-subtle)] group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--border-subtle)_0%,transparent_100%)] transition-transform duration-1000 group-hover:scale-150 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between gap-8">
                <div className="w-14 h-14 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center backdrop-blur-md border border-[var(--border-subtle)]">
                  <span className="text-xl font-bold text-[var(--text-primary)] font-mono">02</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 font-heading">سرية وخصوصية مطلقة</h3>
                  <p className="text-base text-[var(--text-tertiary)] font-light leading-relaxed max-w-lg text-balance">
                    نظام ملفات مشفر، غرف استشارة معزولة، وإجراءات صارمة لحماية البيانات.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Box 3: Rates */}
            <ScrollReveal className="relative bg-[var(--page-bg)] rounded-[2.5rem] p-10 overflow-hidden border border-[var(--border-subtle)] group">
              <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#0066FF]/10 blur-[50px] group-hover:bg-[#0066FF]/20 transition-colors duration-700 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between gap-8">
                <div className="w-14 h-14 rounded-full bg-[#0066FF]/10 flex items-center justify-center backdrop-blur-md border border-[#0066FF]/20">
                  <span className="text-xl font-bold text-[#0066FF] font-mono">03</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 font-heading">معدلات نجاح تنافسية</h3>
                  <p className="text-base text-[var(--text-tertiary)] font-light leading-relaxed max-w-lg text-balance">
                    نحقق معدلات حمل تتوافق مع المعدلات الأوروبية بفضل البروتوكولات المحدّثة.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Box 4: Human Care */}
            <ScrollReveal className="md:col-span-2 relative bg-[var(--page-bg)] rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-[var(--border-subtle)] group">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 blur-[100px] group-hover:blur-[150px] transition-all duration-700 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between gap-8">
                <div className="flex justify-start">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center backdrop-blur-md border border-[#d4e616]/30">
                    <span className="text-2xl font-black text-accent font-mono">04</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 font-heading">رعاية إنسانية شاملة</h3>
                  <p className="text-base text-[var(--text-tertiary)] font-light leading-relaxed max-w-lg text-balance">
                    لا نعالج حالات فحسب — بل نرافق عائلات. نوفر دعماً نفسياً في كل مرحلة لأن الإنجاب يحتاج أكثر من مجرد تقنية.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: OUTRO CTA (Before Footer)
          ═══════════════════════════════════════════ */}
      <section
        id="the-center-cta"
        className="relative z-10 w-full h-[100svh] snap-start flex flex-col justify-center overflow-hidden"
      >
        {/* Ambient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#0066FF]/15 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />

        <div className="w-full max-w-[900px] mx-auto px-6 md:px-12 text-center relative z-10">
          <ScrollReveal>
            {/* Eyebrow */}
            <div className="mb-8 inline-flex items-center gap-3 #d4e616]/30 bg-accent/5 px-5 py-2.5 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#d4e616]" />
              <span className="text-xs text-accent font-mono tracking-[0.2em] uppercase">ابدأ رحلتك الآن</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-[1.2] tracking-tight text-balance">
              حلم الأمومة، واقعٌ ننسجه معاً
            </h2>

            <p className="text-base md:text-lg text-[var(--text-tertiary)] font-light mb-12 max-w-xl mx-auto text-balance leading-relaxed">
              بأدق التقنيات العالمية وأصدق الرعاية الطبية، نرافقكِ خطوة بخطوة في رحلتكِ نحو الأمل المنشود.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="https://wa.me/967781878443"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#d4e616] to-[#b8cc13] px-10 py-5 flex items-center gap-4 transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,230,22,0.4)] hover:scale-[1.03] w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <span className="relative z-10 text-lg font-bold text-black">تواصل عبر الواتساب</span>
                <div className="relative z-10 w-10 h-10 rounded-full bg-[var(--overlay-bg)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
              </a>

              <a
                href="tel:+967781878443"
                className="group relative overflow-hidden rounded-2xl  bg-[var(--surface-elevated)] px-10 py-5 flex items-center gap-4 transition-all duration-500  hover:bg-[var(--surface-elevated)] w-full sm:w-auto justify-center backdrop-blur-md"
              >
                <span className="text-lg font-bold text-[var(--text-primary)]">اتصل الآن</span>
                <div className="w-10 h-10 rounded-full  flex items-center justify-center group- transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
              </a>
            </div>

            {/* Working Hours + Address */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm text-[var(--text-muted-light)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>السبت — الخميس: 9:00 ص - 3:00 م</span>
              </div>
              <span className="text-zinc-700 hidden md:inline">•</span>
              <span>جولة فلسطين — صنعاء، اليمن</span>
              <span className="text-zinc-700 hidden md:inline">•</span>
              <span dir="ltr">+967 781 878 443</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}

