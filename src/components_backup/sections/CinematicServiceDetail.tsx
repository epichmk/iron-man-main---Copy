"use client";

import { useRef, useState } from "react";
import { motion, useTransform, useMotionValue, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, ArrowRight, ArrowLeft } from "lucide-react";
import { WhatsappLogo, Plus, BookOpen, Clock } from "@phosphor-icons/react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import servicesData from "@/lib/servicesData.json";
import { blogData } from "@/lib/blogData";
import { getWhatsAppLink } from "@/lib/whatsappMessages";

const whatsappMessages: Record<string, string> = {
  'ix73-icsi-imsi':       'مرحباً، أود الاستفسار عن تقنية ICSI/IMSI بمجهر IX73',
  'gender-selection':    'مرحباً، أود الاستفسار عن فحص الجينات وتحديد الجنس PGT',
  'freezing-unit':       'مرحباً، أود الاستفسار عن وحدة تجميد الأجنة والبويضات',
  'incubators':          'مرحباً، أود الاستفسار عن حاضنات Time-Lapse الذكية',
  'cosmetic-ultrasound': 'مرحباً، أود الاستفسار عن خدمات السونار التجميلي',
  'andrology':           'مرحباً، أود الاستفسار عن قسم أمراض الذكورة',
  'male-infertility':    'مرحباً، أود الاستفسار عن علاج العقم عند الذكور',
  'laparoscopy':         'مرحباً، أود الاستفسار عن عمليات تنظير البطن',
  'iui':                 'مرحباً، أود الاستفسار عن التلقيح الصناعي IUI',
  'obgyn-clinic':        'مرحباً، أود الاستفسار عن عيادة النساء والتوليد',
  'octax':               'مرحباً، أود الاستفسار عن نظام ليزر OCTAX',
};

// ----------------------------------------------------------------------
// ULTRA-PREMIUM EDITORIAL LAYOUT
// ----------------------------------------------------------------------

// Reusable Continuous Scroll Reveal Component
function ScrollReveal({ children, className, direction = "up", offset = ["start 95%", "end 5%"] }: { children: React.ReactNode, className?: string, direction?: "up" | "down" | "left" | "right" | "none", offset?: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  
  const yOffset = direction === "up" ? 60 : direction === "down" ? -60 : 0;
  const xOffset = direction === "left" ? 60 : direction === "right" ? -60 : 0;
  
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [yOffset, 0, 0, -yOffset]);
  const x = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [xOffset, 0, 0, -xOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div ref={ref} style={{ opacity, y, x, scale }} className={className}>
      {children}
    </motion.div>
  );
}

function Immersive3DCard({ step, idx }: { step: { step: number; title: string; description: string }, idx: number }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <ScrollReveal className="relative flex-1 min-w-[200px] group">
      <motion.div 
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY }}
        className="w-full h-full relative transform-gpu preserve-3d cursor-default"
      >
        <div className="absolute inset-0 bg-[#001020]/80 backdrop-blur-2xl  shadow-[0_30px_60px_rgba(0,0,0,0.6)] group-#d4e616]/50 transition-all duration-700" style={{ transform: "translateZ(-30px)" }} />
        
        <div className="relative p-6 md:p-8 h-full flex flex-col justify-start transform-gpu transition-all duration-500" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <span className="text-[#d4e616] font-bold text-3xl dark:drop-shadow-[0_0_20px_rgba(212,230,22,0.4)] font-mono">0{step.step}</span>
            <span className="text-xs font-mono text-[#a1a1aa] tracking-[0.2em] uppercase">المرحلة {String(step.step).padStart(2, '0')}</span>
          </div>
          <motion.h3 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#d4e616] transition-colors duration-500">{step.title}</motion.h3>
          <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.3 }} className="text-zinc-400 text-sm leading-[1.8] font-light group-hover:text-zinc-200 transition-colors duration-500">{step.description}</motion.p>
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,230,22,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-40px)" }} />
      </motion.div>
    </ScrollReveal>
  );
}

// ----------------------------------------------------------------------
// Scroll-Linked Benefit Row (Continuous Scroll Reaction Both Ways)
// ----------------------------------------------------------------------
function BenefitRow({ benefit, idx }: { benefit: { label: string; value: string }, idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 5%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [40, 0, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="group relative w-full border-t border-white/10 #d4e616] transition-colors duration-700 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-default overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-l from-[#d4e616]/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out -z-10" />

      <span className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 text-[5rem] md:text-[7rem] font-bold text-white/[0.02] group-hover:text-[#d4e616]/[0.05] transition-colors duration-1000 pointer-events-none -z-20 leading-none font-mono">
        0{idx + 1}
      </span>

      <div className="flex-1 max-w-4xl pr-0 md:pr-6 relative z-10">
        <span className="text-[#d4e616] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
          [ {benefit.label} ]
        </span>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-[1.3] group-hover:translate-x-4 transition-transform duration-700 ease-out text-balance">
          {benefit.value}
        </h3>
      </div>

      <div className="md:w-1/4 flex justify-start md:justify-end relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-12 h-12 rounded-full #d4e616] flex items-center justify-center bg-[#d4e616]/10">
           <ArrowUpLeft className="w-4 h-4 text-[#d4e616]" />
        </div>
      </div>
    </motion.div>
  );
}

function EditorialStats({ stats }: { stats: { label: string; value: string }[] }) {
  if (!stats || stats.length === 0) return null;
  return (
    <ScrollReveal direction="up" className="w-full relative py-8 mt-4 border-t border-white/5">
       <div className="flex flex-wrap items-center gap-10 md:gap-16 relative z-10">
         {stats.map((stat, idx) => (
           <div key={idx} className="flex flex-col relative group">
             <span className="text-xs text-[#d4e616]/70 font-mono tracking-[0.2em] uppercase mb-2 group-hover:text-[#d4e616] transition-colors">
               {stat.label}
             </span>
             <span className="text-2xl md:text-4xl font-bold text-white tracking-wide leading-none group-hover:dark:drop-shadow-[0_0_20px_rgba(212,230,22,0.4)] transition-all duration-500 font-mono inline-block" dir="ltr">
               {stat.value}
             </span>
             <div className="h-[2px] w-0 bg-[#d4e616] group-hover:w-full transition-all duration-500 mt-4 opacity-50" />
           </div>
         ))}
       </div>
    </ScrollReveal>
  );
}

function TechnologyShowcase({ tech }: { tech: { name: string; description: string }[] }) {
  if (!tech || tech.length === 0) return null;
  return (
    <ScrollReveal direction="up" className="w-full relative py-8 mt-4 border-t border-[#0066FF]/20">
       <span className="text-xs text-[#0066FF] font-mono tracking-[0.2em] uppercase mb-6 block dark:drop-shadow-[0_0_10px_rgba(0,102,255,0.4)]">
         / الأنظمة التقنية المستخدمة
       </span>
       <div className="flex flex-col gap-4">
         {tech.map((t, idx) => (
           <div key={idx} className="group relative flex items-center justify-between p-5 rounded-2xl  bg-white/[0.01] hover:bg-[#0066FF]/10 #0066FF]/40 transition-all duration-500 overflow-hidden shadow-lg">
             <div className="absolute inset-0 bg-gradient-to-l from-[#0066FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             <div className="relative z-10 flex flex-col pr-2">
               <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.2 }} className="text-xl font-bold text-white group-hover:text-[#0066FF] transition-colors mb-1 font-mono tracking-wide">{highlightKeywords(t.name)}</motion.span>
               <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.3 }} className="text-base text-zinc-400 group-hover:text-zinc-300 transition-colors">{highlightKeywords(t.description)}</motion.span>
             </div>
             <div className="relative z-10 w-12 h-12 rounded-full  flex items-center justify-center group-#0066FF]/50 group-hover:bg-[#0066FF]/20 transition-all duration-500 shadow-inner">
                <span className="text-white group-hover:text-[#0066FF] font-mono text-sm block" dir="ltr">0{idx+1}</span>
             </div>
           </div>
         ))}
       </div>
    </ScrollReveal>
  );
}

// Helper to highlight English tech words automatically
const highlightKeywords = (text: string) => {
  if (!text) return text;
  // Match any sequence of English letters/numbers/hyphens (like DNA, IX73, IMSI)
  const regex = /([a-zA-Z0-9\-]+)/g;
  const parts = text.split(regex);
  return parts.map((part, i) => 
    regex.test(part) ? <span key={i} className="text-[#0066FF] font-mono mx-1 dark:drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]" dir="ltr">{part}</span> : part
  );
};

export function CinematicServiceDetail({ service }: { service: typeof servicesData[0] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handlePointerMove = (e: React.PointerEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    xSet((clientX / innerWidth) * 2 - 1);
    ySet((clientY / innerHeight) * 2 - 1);
  };
  
  const xSet = (val: number) => mouseX.set(val);
  const ySet = (val: number) => mouseY.set(val);

  const imageRotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const imageRotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

  // Navigation Logic
  const currentIndex = servicesData.findIndex((s) => s.id === service.id);
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];
  
  const quickLinks = [
    servicesData[(currentIndex + 2) % servicesData.length],
    servicesData[(currentIndex + 3) % servicesData.length],
    servicesData[(currentIndex + 4) % servicesData.length],
  ];

  // Dynamic Unique Animations based on Service ID
  const animationVariants = [
    { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } },
    { initial: { opacity: 0, scale: 1.1, filter: "blur(10px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } },
    { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } },
    { initial: { opacity: 0, rotateX: 20, y: 50 }, animate: { opacity: 1, rotateX: 0, y: 0 }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  ];
  const animIndex = service.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % 4;
  const currentAnim = animationVariants[animIndex];

  const isIx3 = service.id === 'ix73-icsi-imsi';

  // Parse Massive Text Content
  const descParagraphs = service.description ? service.description.split(/\n+/).map((p:string) => p.trim()).filter(Boolean) : [];
  const heroDesc = descParagraphs[0] || service.description;
  const extendedDesc = descParagraphs.slice(1);

  const techParagraphs = service.detailedInfo ? service.detailedInfo.split(/\n+/).map((p:string) => p.trim()).filter(Boolean) : [];
  const techLead = techParagraphs[0] || service.detailedInfo;
  const techExtended = techParagraphs.slice(1);

  const waMessage = whatsappMessages[service.id] || `مرحباً، أود الاستفسار عن خدمة: ${service.title}`;
  const relatedBlogs = blogData.filter(post => post.relatedServices.includes(service.id)).slice(0, 3);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#000814] overflow-clip selection:bg-[#d4e616]/30 selection:text-white pb-24"
      onPointerMove={handlePointerMove}
      dir="rtl" // STRICT RTL ROOT
    >
      <div className="fixed top-0 right-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_right,rgba(0,33,64,0.6)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_bottom_left,rgba(212,230,22,0.03)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />



      {/* ═══════════════════════════════════════════
          AWARD WINNING CINEMATIC HERO
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 w-full h-screen snap-start flex flex-col items-center justify-center overflow-hidden bg-[#000814]">
        {/* Full Screen Image Background with Parallax Scale */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 2, ease: "easeOut" }} 
          className="absolute inset-0 z-0"
        >
          <Image 
            src={service.image} 
            alt={service.title} 
            fill 
            sizes="100vw"
            className={`absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen ${service.imagePosition || 'object-center'}`}
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000814]/80 via-[#000814]/50 to-[#000814]" />
        </motion.div>

        {/* Ghost Typography (Like Claude's NMC) */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]">
          <h1 className="text-[10rem] md:text-[18rem] lg:text-[22rem] font-bold text-white whitespace-nowrap tracking-tighter opacity-[0.02]">
            NMC
          </h1>
        </motion.div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none z-[1]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4e616]/10 blur-[150px] rounded-full pointer-events-none z-[1]" />

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} 
          className="relative z-10 text-center px-6 max-w-[1200px] flex flex-col items-center mt-10 md:mt-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-gradient-to-l from-[#d4e616] to-transparent" />
            <span className="text-[#d4e616] font-mono tracking-[0.3em] uppercase text-[10px] font-bold">الخدمات التخصصية الدقيقة</span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#d4e616] to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 dark:drop-shadow-2xl leading-[1.2] text-balance tracking-tight">
            {service.title}
          </h2>

          <p className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-zinc-300 font-light mb-10 max-w-3xl leading-relaxed text-balance">
            {highlightKeywords(heroDesc)}
          </p>

          {/* Stats */}
          {service.stats && (
            <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl">
              {service.stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }} className="flex flex-col items-center gap-1 px-6 py-4 bg-white/[0.02]  rounded-2xl min-w-[140px] backdrop-blur-md shadow-2xl">
                  <span className="text-2xl md:text-3xl font-bold text-white font-mono" dir="ltr">{stat.value}</span>
                  <span className="text-[10px] font-mono tracking-wide text-[#d4e616]">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500">استكشف التفاصيل</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-4 h-7 rounded-full  flex items-start justify-center p-1">
            <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1.5 bg-[#d4e616] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-32 pt-10">

        {/* Technology Showcase (If applicable) */}
        {service.technologyUsed && (
           <div className="w-full mb-16">
             <TechnologyShowcase tech={service.technologyUsed} />
           </div>
        )}

        {/* Editorial Deep Dive (Sticky Scroll Sequence) */}
        {extendedDesc.length > 0 && (
          <div className="w-full relative py-20 mb-32 border-t border-[#0066FF]/20 mt-10">
            <div className="flex flex-col items-center mb-10 relative z-10 text-center">
              <span className="text-[#0066FF] font-mono text-xs tracking-[0.3em] uppercase mb-4 dark:drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]">/ النظرة الشاملة</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">فلسفة التقنية</h2>
            </div>
            
            <div className="relative max-w-4xl mx-auto min-h-[150vh]">
              {/* Sticky Background Element */}
              <div className="sticky top-1/3 w-full h-[30vh] flex items-center justify-center -z-10 opacity-40 pointer-events-none">
                <div className="w-[300px] h-[300px] bg-[#0066FF] rounded-full blur-[150px] animate-pulse" />
              </div>

              <div className="flex flex-col gap-[40vh] pb-[20vh] -mt-[30vh] relative z-10">
                {extendedDesc.map((p: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0.1, y: 100, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ amount: 0.6, once: false }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="p-8 md:p-14 bg-[#00040A]/60 backdrop-blur-2xl #0066FF]/20 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] text-center transform-gpu"
                  >
                    <p className="text-zinc-200 leading-[2] font-light text-2xl md:text-3xl text-balance">
                      {highlightKeywords(p)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3D Timeline (Compacted & Pulled up to be overlaid) */}
        {service.clientJourney && (
          <div className="w-full relative py-10 mx-auto mb-20 z-20">
            <ScrollReveal direction="up" className="mb-12 flex flex-col items-start relative z-40">
              <span className="text-[#d4e616] font-mono text-xs tracking-[0.3em] uppercase mb-3">/ هيكلة الرحلة الطبية</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">مراحل البروتوكول</h2>
            </ScrollReveal>

            <div className="relative w-full perspective-1200">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 hidden lg:block -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-20">
                {service.clientJourney.map((step: { step: number; title: string; description: string }, idx: number) => (
                  <Immersive3DCard key={idx} step={step} idx={idx} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technical Specifications (Asymmetric Editorial) */}
        <ScrollReveal direction="up" className="w-full relative py-16 mb-20 border-t border-white/10">
          <span className="absolute -top-12 right-0 text-[#d4e616]/5 text-[20rem] font-serif leading-none pointer-events-none">&quot;</span>
          <div className="relative z-10 flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
            <div className="md:w-1/3 shrink-0">
              <span className="text-[#d4e616] font-mono text-sm tracking-[0.3em] uppercase block mb-3">/ التفاصيل التقنية</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">المواصفات التقنية</h2>
              
              {techExtended.length > 0 && (
                <div className="mt-12">
                  <button 
                    onClick={() => setShowTechDetails(!showTechDetails)}
                    className="flex items-center gap-4 text-[#0066FF] font-mono text-sm tracking-widest uppercase hover:text-white transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-full #0066FF]/40 flex items-center justify-center group-hover:bg-[#0066FF]/20 transition-all shadow-[0_0_15px_rgba(0,102,255,0.2)]">
                      {showTechDetails ? '-' : '+'}
                    </span>
                    {showTechDetails ? 'إخفاء التفاصيل المعقدة' : 'استكشف التفاصيل التقنية'}
                  </button>

                  <AnimatePresence>
                    {showTechDetails && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-6 mt-8 p-8 bg-white/[0.02] #0066FF]/20 rounded-3xl shadow-[0_0_30px_rgba(0,102,255,0.1)] backdrop-blur-sm relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/20 blur-[50px]" />
                          {techExtended.map((p: string, idx: number) => (
                             <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.1 }} key={idx} className="text-zinc-400 text-base md:text-lg leading-[1.8] text-balance relative z-10">
                               {highlightKeywords(p)}
                             </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3">
              <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }} className="text-white text-2xl md:text-3xl lg:text-4xl leading-[1.6] md:leading-[1.9] font-light border-r-4 border-[#0066FF] pr-8 drop-shadow-2xl text-balance">
                {highlightKeywords(techLead)}
              </motion.p>
            </div>
          </div>
        </ScrollReveal>

        {/* Grid Layout: Benefits (Right) + Sticky Evaluation CTA (Left) */}
        <div className="w-full relative mt-20 mb-20 flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Right side: Benefits List */}
          <div className="w-full lg:w-3/5 flex flex-col">
            <ScrollReveal direction="up" className="mb-12 flex flex-col items-start">
              <span className="text-[#d4e616] font-mono text-xs tracking-[0.3em] uppercase mb-3">/ المخرجات الأساسية</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">المزايا والمخرجات</h2>
            </ScrollReveal>
            
            <div className="flex flex-col w-full relative z-10">
              {service.benefits.map((benefit: { label: string; value: string }, idx: number) => (
                <BenefitRow key={idx} benefit={benefit} idx={idx} />
              ))}
              <div className="w-full border-t border-white/10" />
            </div>
          </div>

          {/* Left side: Evaluation CTA (Surprise Premium Glass Card) */}
          {/* Left side: Evaluation CTA (Purple Zone / Sticky Glass Card) */}
          <div className="w-full lg:w-2/5 flex flex-col mt-20 lg:mt-0 relative perspective-1000 sticky top-40">
            <ScrollReveal direction="up" className="w-full">
              <div className="w-full rounded-3xl #0066FF]/20 bg-[#00040A]/80 backdrop-blur-3xl p-10 shadow-[0_40px_80px_rgba(0,102,255,0.15)] overflow-hidden group transform-gpu transition-all duration-700 hover:rotate-y-2 hover:-rotate-x-2">
                
                {/* Animated internal gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 via-[#0066FF]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* Moving neon blue effect (The "cool motion") */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,rgba(0,102,255,0.3)_50%,transparent_70%,transparent_100%)] animate-[spin_6s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-screen pointer-events-none" />
                
                {/* Top ambient blur */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/40 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.2] mb-6">
                      {service.title}
                    </h3>
                    <div className="relative">
                      <span className="absolute top-0 bottom-0 -right-[2px] w-[2px] bg-gradient-to-b from-[#0066FF] to-transparent shadow-[0_0_15px_#0066FF]" />
                      <motion.p initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: false }} transition={{ duration: 1, delay: 0.5 }} className="text-base text-zinc-300 font-light pr-4 leading-relaxed border-r-2 border-[#0066FF]/20 line-clamp-4 text-balance">
                        {heroDesc}
                      </motion.p>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-full p-[2px] w-full inline-block mt-4"
                  >
                    {/* Animated Border Gradient */}
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d4e616_0%,transparent_50%,#d4e616_100%)]" />
                    
                    {/* Button Core */}
                    <div className="relative flex items-center justify-between md:justify-center gap-4 bg-[#000814] px-6 py-4 rounded-full w-full h-full transition-all duration-500">
                      <span className="text-base md:text-lg font-bold text-white group-hover:text-[#d4e616] transition-colors whitespace-nowrap">
                        حجز استشارة عبر الواتساب
                      </span>
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#d4e616] flex items-center justify-center shadow-[0_0_20px_rgba(212,230,22,0.4)] group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ Section */}
        {service.faq && service.faq.length > 0 && (
          <ScrollReveal direction="up" className="w-full relative py-20 border-t border-white/10">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-[#d4e616] font-mono text-xs tracking-[0.3em] uppercase mb-4 px-6 py-1 #d4e616]/30 rounded-full">/ الأسئلة الشائعة</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">أسئلة متكررة حول الخدمة</h2>
            </div>
            <div className="max-w-4xl mx-auto flex flex-col">
              {service.faq.map((item: { q: string; a: string }, idx: number) => (
                <div key={idx} className={`group border-b transition-colors duration-500 overflow-hidden ${openFaq === idx ? 'border-[#d4e616]/30 bg-white/[0.02]' : 'border-white/10 #d4e616]/50'}`}>
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-right py-6 px-4 flex items-center justify-between outline-none">
                    <h4 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${openFaq === idx ? 'text-[#d4e616]' : 'text-white group-hover:text-blue-400'}`}>
                      {item.q}
                    </h4>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === idx ? 'border-[#d4e616] bg-[#d4e616]/10 text-[#d4e616]' : 'border-white/20 text-white/50 group- group-hover:text-blue-400'}`}>
                      <motion.div animate={{ rotate: openFaq === idx ? 45 : 0 }} transition={{ duration: 0.3 }}><Plus size={16} weight="bold" /></motion.div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="px-4 pb-8 text-zinc-400 text-lg leading-relaxed font-light">{item.a}</motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Related Blog Posts */}
        {relatedBlogs.length > 0 && (
          <ScrollReveal direction="up" className="w-full relative py-20 border-t border-white/10">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-[#0066FF] font-mono text-xs tracking-[0.3em] uppercase mb-4 px-6 py-1 #0066FF]/30 rounded-full">/ المعرفة الطبية</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">مقالات ذات صلة بالخدمة</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedBlogs.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group block bg-white/[0.02]  rounded-2xl overflow-hidden #d4e616]/50 hover:shadow-[0_0_30px_rgba(212,230,22,0.15)] transition-all duration-500 hover:-translate-y-2">
                  <div className="p-6">
                    <div className="bg-black/60 #d4e616]/30 text-[#d4e616] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4">{post.category}</div>
                    <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.1 }} className="font-heading text-xl text-white font-bold mb-3 group-hover:text-[#d4e616] transition-colors line-clamp-2">{post.title}</motion.h3>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.2 }} className="font-sans text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">{post.excerpt}</motion.p>
                    <div className="flex items-center gap-4 text-zinc-500 font-sans text-xs pt-4 border-t border-white/5">
                      
                      <div className="flex items-center gap-1.5"><Clock size={16} /><span>{post.readTime}</span></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Service Navigation (Restored Bottom Nav) */}
        <div dir="rtl">
          <ScrollReveal direction="up" className="w-full mt-20 mb-20 pt-16 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
            <Link href={`/services/${prevService.id}`} className="group flex items-center gap-6 w-full md:w-1/2 justify-start">
              <div className="w-16 h-16 rounded-full  flex items-center justify-center group-hover:bg-[#d4e616]/10 group-#d4e616] transition-all duration-300">
                <ArrowRight className="w-6 h-6 text-zinc-500 group-hover:text-[#d4e616] group-hover:translate-x-2 transition-all duration-300" />
              </div>
              <div>
                <span className="text-[#d4e616] font-mono text-xs tracking-widest uppercase block mb-1">الخدمة السابقة</span>
                <span className="text-white font-bold text-2xl group-hover:text-[#d4e616] transition-colors">{prevService.title}</span>
              </div>
            </Link>

            <Link href={`/services/${nextService.id}`} className="group flex items-center gap-6 w-full md:w-1/2 justify-end text-left">
              <div>
                <span className="text-[#d4e616] font-mono text-xs tracking-widest uppercase block mb-1 text-left">الخدمة التالية</span>
                <span className="text-white font-bold text-2xl group-hover:text-[#d4e616] transition-colors text-balance">{nextService.title}</span>
              </div>
              <div className="w-16 h-16 rounded-full  flex items-center justify-center group-hover:bg-[#d4e616]/10 group-#d4e616] transition-all duration-300">
                <ArrowLeft className="w-6 h-6 text-zinc-500 group-hover:text-[#d4e616] group-hover:-translate-x-2 transition-all duration-300" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/5">
            {quickLinks.map((link) => (
              <Link key={link.id} href={`/services/${link.id}`} className="group block  p-6 #d4e616]/30 bg-white/[0.01] hover:bg-[#d4e616]/5 transition-colors">
                <span className="text-zinc-500 font-mono text-xs tracking-wider uppercase block mb-3 group-hover:text-[#d4e616]">استكشف المزيد</span>
                <h4 className="text-white font-bold text-lg text-balance">{link.title}</h4>
              </Link>
            ))}
          </div>
        </ScrollReveal>
        </div>

      </main>

      <Footer />
    </div>
  );
}

