"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Plus } from "@phosphor-icons/react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import servicesData from "@/lib/servicesData.json";
import { blogData } from "@/lib/blogData";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { BaseGraphic, targetAudienceIcons } from "@/components/icons/TargetAudienceGraphics";
import { AdvantagesGraphicWrapper, advantagesIconsMap } from "@/components/icons/AdvantagesGraphics";

export function EditorialServicePage({ serviceId }: { serviceId: string }) {
  const service = servicesData.find((s) => s.id === serviceId);
  
  if (!service || !service.editorial) {
    return <div className="text-[var(--text-primary)]">Service or editorial data not found.</div>;
  }

  const ci = servicesData.findIndex((s) => s.id === service.id);
  const next = servicesData[(ci + 1) % servicesData.length];
  const prev = servicesData[(ci - 1 + servicesData.length) % servicesData.length];
  const quickLinks = [servicesData[(ci + 2) % servicesData.length], servicesData[(ci + 3) % servicesData.length], servicesData[(ci + 4) % servicesData.length]];
  const blogs = blogData.filter((p) => p.relatedServices.includes(service.id)).slice(0, 3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroImageSrc = service.id === 'ix73-icsi-imsi' ? '/ix73_wide_expanded.png' : service.image;
  const heroImageLightSrc = service.id === 'ix73-icsi-imsi' ? '/services/lightmode/ix73_wide_light.jpg' : `/services/lightmode/${service.id}_light.jpg`;

  const squareImageSrc = service.image;
  const squareImageLightSrc = service.id === 'ix73-icsi-imsi' ? '/services/lightmode/ix73-icsi-imsi_light.jpg' : `/services/lightmode/${service.id}_light.jpg`;

  // Default WhatsApp message if not specifically mapped
  const WA = `مرحباً، أود الاستفسار عن خدمة: ${service.title}`;

  // Progress
  const { scrollYProgress } = useScroll();
  const pw = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 80, damping: 30 });

  // Hero parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothHeroProgress = useSpring(heroProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroImgY = useTransform(smoothHeroProgress, [0, 1], ["0%", "30%"]);
  const heroImgScale = useTransform(smoothHeroProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(smoothHeroProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(smoothHeroProgress, [0, 0.6], [1, 0]);

  // Section 2 parallax
  const s2Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full selection:bg-[var(--border-strong)] selection:text-[var(--text-primary)]" dir="rtl">
      {/* High Quality Deep Background Image */}
      <motion.div 
        animate={{ opacity: [1, 0.85, 1], scale: [1, 1.05, 1] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 z-[-1] bg-[var(--page-bg)] overflow-hidden"
      >
        <Image src="/studio_spotlight_bg.png" alt="Luxury Dark Background" fill sizes="100vw" className="object-cover opacity-[var(--theme-bg-img-opacity)] saturate-150 hide-in-light" priority />
        <div className="absolute inset-0 bg-[var(--surface-elevated)] backdrop-blur-[100px] pointer-events-none hide-in-light" />
      </motion.div>      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-right" style={{ width: pw }}>
        <div className="w-full h-full bg-white" />
      </motion.div>



      {/* ══════════════════════════════════════════════════════════
          S1 — HERO: Split-screen. Image left, massive text right.
          ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero-section" className="relative w-full h-screen overflow-hidden">
        {/* Full BG image with parallax and CSS mask for seamless blending */}
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{ 
            y: heroImgY, 
            scale: heroImgScale,
            maskImage: 'linear-gradient(to top, transparent 0%, black 30%), linear-gradient(to right, transparent 0%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%), linear-gradient(to right, transparent 0%, black 50%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect'
          }}
        >
          <Image src={heroImageSrc} alt={service.title} fill sizes="100vw" className={`hide-in-light object-cover ${service.imagePosition || 'object-[center_80%]'}`} quality={100} priority />
          <Image src={heroImageLightSrc} alt={service.title} fill sizes="100vw" className={`hide-in-dark object-cover ${service.imagePosition || 'object-[center_80%]'}`} quality={100} priority />
        </motion.div>
        
        {/* Deepening overlay for text readability, tailored for mobile vs desktop */}
        <div className="hide-in-light absolute inset-0 z-[1] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#000814]/40 md:to-[#000814]/80 pointer-events-none" />
        <div className="hide-in-dark absolute inset-0 z-[1] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#ffffff]/40 md:to-[#ffffff]/80 pointer-events-none" />

        {/* Content */}
        <motion.div className="relative z-10 h-full flex flex-col justify-end md:justify-center pt-20 pb-32 md:pb-24 px-10 md:px-20 lg:px-32 max-w-[1400px] mx-auto" style={{ y: heroTextY, opacity: heroOpacity }}>
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-4 md:mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 md:w-12 h-[1px] bg-[var(--text-primary)]" />
              <span className="text-[var(--text-primary)] font-mono text-xs md:text-base font-bold tracking-widest uppercase">{service.editorial.eyebrow}</span>
            </div>
          </motion.div>

          {/* Title — massive, editorial */}
          <motion.h1
            initial={{ opacity: 0, y: 80, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: "1000px" }}
            className="text-[2.25rem] sm:text-5xl md:text-[clamp(3rem,5vw,4.5rem)] font-black text-[var(--text-primary)] leading-[1.2] md:leading-[1.1] tracking-tight mb-6 md:mb-8 max-w-[800px]"
          >
            {service.editorial.heroTitleLine1}
            <span className="text-[var(--text-primary)]"> {service.editorial.heroTitleHighlight1}</span>
            <br />
            {service.editorial.heroTitleLine2}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--text-primary)] to-[var(--text-secondary)]">{service.editorial.heroTitleHighlight2}</span>
          </motion.h1>

          {/* Subtitle ONLY */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
          >
            <p className="text-[var(--text-secondary)] text-base sm:text-lg md:text-2xl font-light max-w-[500px] leading-[1.8] text-justify [text-justify:kashida]">
              {service.editorial.subtitle}
            </p>
          </motion.div>

          {/* CTA row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }} className="mt-10 flex flex-col md:flex-row md:items-center gap-6">
            <a
              href={getWhatsAppLink(WA)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full p-[2px] inline-block"
            >
              {/* Animated Border Gradient */}
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d4e616_0%,transparent_50%,#d4e616_100%)]" />
              
              {/* Button Core */}
              <div className="relative flex items-center justify-between gap-4 bg-[#0094FE] px-6 py-3 md:py-4 rounded-full h-full transition-all duration-500">
                <span className="text-sm md:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
                  احجز استشارتك الآن عبر واتساب
                </span>
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(212,230,22,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <a href="#story" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] text-sm md:text-base font-mono tracking-wider transition-colors">↓ القصة الكاملة</a>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S1.5 — STATS STRIP (Cinematic Typography)
          ══════════════════════════════════════════════════════════ */}
      {service.stats && service.stats.length > 0 && (
        <section className="relative w-full z-20 bg-transparent py-6 md:py-8 overflow-hidden border-t border-b border-[var(--border-subtle)]">
          
          {/* Cinematic Background Ambient Light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--brand-chartreuse)]/5 via-[var(--page-bg)]/80 to-[var(--page-bg)] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 divide-y divide-[var(--border-subtle)] md:divide-y-0 md:divide-x md:divide-x-reverse md:divide-[var(--border-subtle)]">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[؀-ۿ]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className="relative w-full py-4 md:py-6 flex flex-col items-center justify-center gap-4 group cursor-default overflow-hidden"
                  >
                    {/* Cinematic Hover Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--brand-chartreuse)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl -z-10 pointer-events-none" />
                    
                    {/* Value */}
                    <span 
                      className="font-black text-xl md:text-2xl lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-tertiary)] dark:drop-shadow-[0_10px_20px_var(--shadow-color)] group-hover:scale-105 group-hover:from-[var(--text-primary)] group-hover:via-[var(--brand-chartreuse)] group-hover:to-[var(--brand-chartreuse)]/50 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                      dir={hasArabic ? "rtl" : "ltr"}
                    >
                      {s.value}
                    </span>
                    
                    {/* Divider Accent */}
                    <div className="w-1 h-1 rounded-full bg-[var(--surface-hover)] group-hover:bg-[var(--brand-chartreuse)] group-hover:shadow-[0_0_15px_var(--brand-chartreuse)] group-hover:scale-150 transition-all duration-1000" />
                    
                    {/* Label */}
                    <span className="text-[var(--brand-chartreuse)]/60 font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-center group-hover:text-[var(--brand-chartreuse)] group-hover:tracking-[0.4em] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">
                      {s.label}
                    </span>
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </section>
      )}
      {/* ══════════════════════════════════════════════════════════
          S2 — THE COUPLE'S STORY: Asymmetric editorial.
          Big quote left, their journey right.
          ══════════════════════════════════════════════════════════ */}
      <section id="story" ref={s2Ref} className="relative w-full min-h-screen py-4 md:py-6 md:py-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10">

          {/* Layout for Quote and Image */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-8 md:mb-16 w-full">
            
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full lg:w-1/2"
            >
              <div className="relative flex flex-col items-start text-right w-full" dir="rtl">
                  {/* Cinematic Glowing background orb */}
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#0094FE]/15 via-transparent to-transparent blur-[60px] pointer-events-none -z-10" />

                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-[2px] bg-[#0094FE]" />
                    <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase">قصتكم تبدأ هنا</span>
                  </div>

                  <div className="relative pr-6 md:pr-10 border-r-[3px] border-[var(--border-subtle)] hover:border-[#0094FE]/50 transition-colors duration-1000 group">
                    {/* Massive Watermark Quote Mark */}
                    <span className="absolute -top-16 -right-12 text-[#0094FE]/5 text-[12rem] md:text-[18rem] leading-none font-serif select-none group-hover:text-[#0094FE]/10 transition-colors duration-1000">
                      &rdquo;
                    </span>
                    
                    <blockquote className="relative z-10 text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-black leading-[1.3] md:leading-[1.4] max-w-[850px] text-right text-balance text-[var(--text-primary)]">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-tertiary)] dark:drop-shadow-xl transition-all duration-1000">
                        {service.editorial.quote}
                      </span>
                      <br />
                      <span className="inline-block mt-4 text-transparent bg-clip-text bg-gradient-to-l from-[#0094FE] to-[var(--brand-chartreuse)] dark:drop-shadow-[0_0_15px_rgba(0,148,254,0.4)]">
                        {service.editorial.quoteHighlight}
                      </span>
                    </blockquote>
                  </div>
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 relative aspect-square rounded-[2rem] overflow-hidden bg-transparent flex-shrink-0 shadow-[0_30px_60px_var(--shadow-color)] border border-[var(--border-subtle)]"
            >
              <Image src={squareImageSrc} alt={service.title} fill className="hide-in-light object-contain" />
              <Image src={squareImageLightSrc} alt={service.title} fill className="hide-in-dark object-contain" />
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10">
          {/* 3-column emotional journey — no cards, pure text */}
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-[var(--border-subtle)] pt-12 mt-16">
            {service.editorial.journeyColumns.map((col: {num: string; title: string; color: string; body: string}, i: number) => (
              <AnimatedItem
                key={i}
                className="flex flex-col items-center text-center"
              >
                <span className="font-mono text-sm md:text-base font-bold tracking-widest uppercase block mb-3" style={{ color: col.color }}>{col.num}</span>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-4" style={{ color: col.color }}>{col.title}</h3>
                <p className="text-[var(--text-secondary)] leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px] text-justify [text-justify:kashida] w-full">{col.body}</p>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S3 — THE NUMBER: One massive stat, full viewport.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-10 md:px-20"
        >
          <span className="text-[clamp(3rem,8vw,6rem)] font-black text-[var(--text-primary)] font-mono leading-none block" dir="ltr">
            {service.editorial.massiveNumberPart1}
            <span className="text-[var(--text-primary)]">{service.editorial.massiveNumberHighlight1}</span>
            {service.editorial.massiveNumberPart2}
            <span className="text-[var(--text-primary)]">{service.editorial.massiveNumberHighlight2}</span>
          </span>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-8 h-[1px] bg-[var(--border-strong)]" />
            <span className="text-[var(--text-secondary)] font-mono text-xs tracking-wider uppercase">{service.editorial.massiveNumberSub}</span>
            <div className="w-8 h-[1px] bg-[var(--border-strong)]" />
          </div>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl font-light mt-6 max-w-lg mx-auto text-justify [text-justify:kashida]">
            {service.editorial.massiveNumberDesc}
          </p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S4 — TECHNOLOGY: Minimal list, no cards.
          ══════════════════════════════════════════════════════════ */}
      {(service.technologyUsed || []).length > 0 && (
        <section className="relative w-full py-4 md:py-6 md:py-12 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-10">
                <AnimatedItem>
                <div>
                <span className="text-[#0094FE] text-sm md:text-base font-bold tracking-widest uppercase block mb-6">/ الأنظمة</span>
                <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-[1.2]">ما نستخدمه<br /><span className="text-[#0094FE]/60">لا يتواجد إلا هنا</span></h2>
              </div>
              <p className="text-[var(--text-secondary)] text-base md:text-lg font-light max-w-md leading-relaxed pb-2 text-justify [text-justify:kashida]">كل أداة مُصممة لغرض واحد — تقديم رعاية طبية لا تضاهى لتأمين حلمك.</p>
                </AnimatedItem>
              </AnimatedSection>

            <AnimatedSection className="flex flex-col w-full">
            {(service.technologyUsed || []).map((t: {name: string; description: string}, i: number) => (
              <AnimatedItem
                key={i}
                className="group border-t border-[var(--border-subtle)]  transition-colors duration-500 w-full"
              >
                <div className="flex items-center justify-between py-6 md:py-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <span className="text-[#0094FE] font-mono text-xl md:text-2xl mt-1 md:mt-0" dir="ltr">0{i + 1}</span>
                    <div className="flex flex-col gap-2">
                      <span className="text-[#0094FE]/70 font-mono text-sm tracking-widest uppercase block" dir="ltr">{t.name}</span>
                      <p className="text-[var(--text-primary)] font-bold text-xl md:text-2xl leading-[1.4] max-w-2xl transition-colors duration-500 text-justify [text-justify:kashida]">{t.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            ))}
            </AnimatedSection>
            <div className="border-t border-[var(--border-subtle)]" />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          ADVANTAGES
          ══════════════════════════════════════════════════════════ */}
      {((service as any).visualFeatures?.advantages) && (
        <section className="relative w-full py-12 md:py-24 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-16 md:mb-24 text-center">
              <span className="text-[#0094FE] text-sm md:text-base font-bold tracking-widest uppercase block mb-4">/ المزايا</span>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">{(service as any).visualFeatures.advantages.title}</h2>
            </motion.div>
            
            <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {((service as any).visualFeatures.advantages.items).map((item: any, i: number) => {
                const icon = advantagesIconsMap[item.en];
                
                return (
                  <AnimatedItem key={i} className="group py-6 px-2 flex flex-col items-center text-center relative">
                    {icon ? (
                      <>
                        <div className="relative z-10 mb-1 transition-transform duration-700 group-hover:-translate-y-2 scale-110 md:scale-125">
                          <AdvantagesGraphicWrapper>
                            {icon}
                          </AdvantagesGraphicWrapper>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                          <span className="text-[#0094FE]/70 font-mono text-[10px] tracking-widest uppercase mb-2 block">{item.en}</span>
                          <h3 className="text-base md:text-lg font-black text-[var(--text-primary)] mb-2 tracking-wide group-hover:text-[#0094FE] transition-colors">{item.title}</h3>
                          <p className="text-[var(--text-secondary)] text-xs md:text-sm font-light leading-snug max-w-[130px] mx-auto text-justify [text-justify:kashida]">{item.desc}</p>
                        </div>
                      </>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center">
                        <span className="text-[#0094FE]/70 font-mono text-[10px] tracking-widest uppercase mb-2 block">{item.en}</span>
                        <h3 className="text-base md:text-lg font-black text-[var(--text-primary)] mb-2 group-hover:text-[#0094FE] transition-colors">{item.title}</h3>
                        <p className="text-[var(--text-secondary)] text-xs md:text-sm font-light leading-snug max-w-[130px] mx-auto text-justify [text-justify:kashida]">{item.desc}</p>
                      </div>
                    )}
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          S5 — CLIENT JOURNEY: Vertical timeline, ultra-clean
          ══════════════════════════════════════════════════════════ */}
      {(service.clientJourney || []).length > 0 && (
        <section className="relative w-full py-4 md:py-6 md:py-12 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-10 relative">
              
              <span className="text-accent text-sm md:text-base font-bold tracking-widest uppercase block mb-6">/ رحلتكم</span>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">من الأمل<br /><span className="text-[#0094FE]/60">إلى الحقيقة</span></h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-0 bottom-0 right-[23px] md:right-[31px] w-[1px] bg-gradient-to-b from-white/40 via-[#d4e616]/10 to-transparent" />

              <AnimatedSection className="w-full flex flex-col relative">
              {(service.clientJourney || []).map((step: {step: number; title: string; description: string}, i: number) => (
                <AnimatedItem
                  key={i}
                  className="relative flex items-start gap-6 md:gap-10 mb-8 last:mb-0 group w-full"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0094FE]  group- flex items-center justify-center transition-colors duration-500">
                    <span className="text-[var(--text-primary)] font-mono font-black text-sm md:text-base">{String(step.step || i + 1).padStart(2, "0")}</span>
                  </div>

                  {/* Content */}
                  <div className="pt-2 md:pt-4 flex-1 max-w-2xl text-right">
                    <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] mb-3 group-hover:text-[var(--text-primary)] transition-colors duration-500">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-snug font-light text-lg md:text-xl tracking-normal max-w-2xl group-hover:text-[var(--text-secondary)] transition-colors duration-500 text-justify [text-justify:kashida] w-full">{step.description}</p>
                  </div>
                </AnimatedItem>
              ))}
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          S6 — BENEFITS: Editorial list. Dramatic hover.
          ══════════════════════════════════════════════════════════ */}
      {(service.benefits || []).length > 0 && (
        <section className="relative w-full py-4 md:py-6 md:py-12 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-10 relative">
              
              <span className="text-accent text-sm md:text-base font-bold tracking-widest uppercase block mb-6">/ المزايا</span>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">ما يميّز<br /><span className="text-[#0094FE]/60">هذا البروتوكول</span></h2>
            </motion.div>

            <AnimatedSection className="w-full flex flex-col">
            {(service.benefits || []).map((b: {label: string; value: string}, i: number) => (
              <AnimatedItem
                key={i}
                className="group border-t border-[var(--border-subtle)]  transition-colors duration-700 py-6 md:py-4 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-default relative overflow-hidden w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000 -z-10" />
                <div className="flex-1">
                  <span className="text-[var(--text-secondary)] text-sm md:text-base font-bold tracking-wide uppercase block mb-2 group-hover:text-[var(--text-secondary)] transition-colors">{b.label}</span>
                  <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] leading-[1.4] max-w-2xl group-hover:text-[var(--text-primary)] transition-colors duration-500 text-right">{b.value}</h3>
                </div>
                <span className="text-[#0094FE] font-mono text-5xl font-black group-hover:text-[var(--text-muted-light)] transition-colors duration-700 hidden md:block" dir="ltr">0{i + 1}</span>
              </AnimatedItem>
            ))}
            </AnimatedSection>
            <div className="border-t border-[var(--border-subtle)]" />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          S7 — DEEP TECH: Scrolling text blocks. Sticky CTA.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-4 md:py-6 md:py-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Sticky sidebar */}
            <div className="lg:w-[35%] lg:sticky lg:top-32 lg:self-start">
              
              <span className="text-[#0094FE] text-sm md:text-base font-bold tracking-widest uppercase block mb-4">/ المنهجية الطبية</span>
              <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-6 leading-[1.3] whitespace-pre-line">
                {service.editorial.deepTechTitle}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-[1.8] mb-8 text-justify [text-justify:kashida] w-full">{service.editorial.deepTechDesc}</p>

              {/* CTA */}
              <motion.div 
                animate={{ scale: [1, 1.03, 1] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8"
              >
              <a
                href={getWhatsAppLink(WA)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl p-[2px] w-full block"
              >
                {/* Animated Border Gradient */}
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d4e616_0%,transparent_50%,#d4e616_100%)]" />
                
                {/* Button Core */}
                <div className="relative flex items-center justify-between w-full p-5 bg-[#0094FE] rounded-xl h-full transition-all duration-500">
                  <div>
                    <span className="text-[var(--text-primary)] font-bold text-sm block group-hover:text-[var(--text-primary)] transition-colors">جاهزون للخطوة الأولى؟</span>
                    <span className="text-[var(--text-secondary)] text-sm md:text-base mt-1 block">تواصلوا عبر الواتساب</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(212,230,22,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                </div>
              </a>
              </motion.div>
            </div>

            {/* Scrolling content blocks */}
            <div className="lg:w-[65%]">
              <AnimatedSection className="columns-1 md:columns-2 gap-10 text-right md:text-justify space-y-8 md:space-y-0">
                {service.editorial.deepTechParagraphs.map((text: string, i: number) => (
                  <AnimatedItem
                    key={i}
                    className="break-inside-avoid border-r-2 border-[var(--border-subtle)] pr-6 mb-8 transition-colors duration-700 w-full"
                  >
                    <p className="text-[var(--text-primary)] text-lg md:text-xl leading-snug font-light tracking-tight text-justify [text-justify:kashida]">{text}</p>
                  </AnimatedItem>
                ))}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S7.5 — VISUAL FEATURES
          ══════════════════════════════════════════════════════════ */}
      {(service as any).visualFeatures && (
        <section className="relative w-full py-12 md:py-24 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 flex flex-col gap-24">
            
            {/* Target Audience */}
            {((service as any).visualFeatures?.targetAudience) && (
              <div className="flex flex-col items-center">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-16 md:mb-24 text-center max-w-3xl">
                  <span className="text-[#0094FE] text-sm md:text-base font-bold tracking-widest block mb-4">/ الفئة المستهدفة</span>
                  <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-tight">{(service as any).visualFeatures.targetAudience.title}</h2>
                </motion.div>
                
                <AnimatedSection className="flex flex-col w-full max-w-6xl mx-auto gap-12 md:gap-24 relative">
                  {((service as any).visualFeatures.targetAudience.points).map((point: string, i: number) => {
                    const isCosmeticUltrasound = service.id === 'cosmetic-ultrasound';
                    const isEven = i % 2 === 0;
                    
                    return (
                      <AnimatedItem key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {isCosmeticUltrasound && targetAudienceIcons[i] ? (
                          <motion.div 
                            animate={{ y: [0, -12, 0] }} 
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                            className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,102,255,0.1)] group"
                          >
                            <div className="absolute inset-0 rounded-full bg-[#0094FE]/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                            <BaseGraphic number={`0${i + 1}`}>
                              {targetAudienceIcons[i]}
                            </BaseGraphic>
                          </motion.div>
                        ) : (
                          <motion.div 
                            animate={{ y: [0, -12, 0] }} 
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                            className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-[#0094FE]/10 flex items-center justify-center"
                          >
                            <span className="text-[#0094FE] font-mono text-5xl md:text-6xl font-black opacity-50">0{i + 1}</span>
                          </motion.div>
                        )}
                        
                        <div className={`flex-1 w-full text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          <span className="text-[#0094FE] font-mono text-xl md:text-2xl font-black block mb-4">0{i + 1} //</span>
                          <p className="text-[var(--text-primary)] text-xl md:text-3xl leading-[1.6] md:leading-[1.5] font-bold tracking-tight text-justify [text-justify:kashida] w-full">{point}</p>
                        </div>
                      </AnimatedItem>
                    );
                  })}
                </AnimatedSection>
              </div>
            )}

            {/* Mechanism */}
            {((service as any).visualFeatures.mechanism) && (
              <div className="border-t border-[var(--border-subtle)] pt-24">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-12">
                  <span className="text-[#0094FE] text-sm md:text-base font-bold tracking-widest uppercase block mb-4">/ التقنية</span>
                  <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">{(service as any).visualFeatures.mechanism.title}</h2>
                </motion.div>

                <div className="flex flex-col gap-8 md:gap-16">
                  {((service as any).visualFeatures.mechanism.effects).map((eff: any, i: number) => (
                    <AnimatedSection key={i} className="w-full">
                      <AnimatedItem className="group relative w-full rounded-[40px] overflow-hidden">
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} className="w-full h-full">
                          {eff.image && (
                            <div className="relative w-full aspect-[21/16] md:aspect-[21/8] overflow-hidden">
                              <Image src={eff.image} alt={eff.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
                              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
                            </div>
                          )}
                          <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col ${i % 2 === 0 ? 'items-start text-right' : 'items-end text-left md:text-right'} z-10 drop-shadow-[0_4px_4px_var(--shadow-color)]`}>
                            <span className="font-mono text-sm tracking-widest uppercase mb-4 block dark:drop-shadow-md" style={{ color: eff.color }}>{eff.en}</span>
                            <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6 leading-tight max-w-2xl text-balance dark:drop-shadow-lg" style={{ color: eff.color }}>{eff.name}</h3>
                            
                            <div className={`flex flex-col md:flex-row items-center gap-6 mb-2 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                              <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light dark:drop-shadow-md">{eff.action}</p>
                              <ArrowLeft className={`w-5 h-5 text-[var(--text-primary)] hidden md:block drop-shadow-md ${i % 2 === 0 ? '' : 'rotate-180'}`} />
                              <p className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:drop-shadow-md">{eff.result}</p>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatedItem>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}



          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          S8 — FAQ
          ══════════════════════════════════════════════════════════ */}
      {(service.faq || []).length > 0 && (
        <section className="relative w-full py-4 md:py-6 md:py-12 overflow-hidden">
          <div className="max-w-[900px] mx-auto px-10 md:px-20">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-10">
              <span className="text-accent text-sm md:text-base font-bold tracking-widest uppercase block mb-6">/ أسئلة شائعة</span>
              <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight">إجابات<br /><span className="text-[#0094FE]/60">تطمئنكم</span></h2>
            </motion.div>

            {(service.faq || []).map((q: {q: string; a: string}, i: number) => (
              <div key={i} className={`border-t transition-colors duration-500 ${openFaq === i ? "border-[var(--border-strong)]" : "border-[var(--border-subtle)] "}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-right py-4 md:py-6 flex items-center justify-between outline-none gap-6">
                  <h4 className={`text-lg md:text-xl font-bold transition-colors duration-300 text-right ${openFaq === i ? "text-[var(--text-primary)]" : "text-[var(--text-primary)]"}`}>{q.q}</h4>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? "border-[var(--border-strong)] text-[var(--text-primary)]" : "border-[var(--border-subtle)] text-[#0094FE]"}`}>
                    <Plus size={14} weight="bold" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="pb-6 text-[var(--text-secondary)] text-lg md:text-xl leading-snug tracking-normal max-w-3xl font-light text-justify [text-justify:kashida] w-full">{q.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="border-t border-[var(--border-subtle)]" />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          S9 — BLOG
          ══════════════════════════════════════════════════════════ */}
      {blogs.length > 0 && (
        <section className="relative w-full py-12 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-widest uppercase block mb-4">/ مقالات</span>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight">قراءات ذات صلة</h2>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <Link href={`/blog/${post.id}`} className="group block  rounded-xl p-6  hover:bg-[var(--surface-elevated)] transition-all duration-500">
                    <span className="text-[var(--text-secondary)] font-mono text-sm md:text-base font-bold tracking-widest tracking-wider uppercase">{post.category}</span>
                    <h3 className="text-[var(--text-primary)] font-bold text-base mt-2 mb-3 group-hover:text-[var(--text-primary)] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-[var(--text-tertiary)] text-base md:text-lg line-clamp-2 leading-relaxed text-justify [text-justify:kashida]">{post.excerpt}</p>
                    <div className="flex gap-4 mt-4 text-[var(--text-secondary)] text-sm">
                      
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          S10 — NAVIGATION
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-20 overflow-hidden" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-8 border-t border-[var(--border-subtle)] pt-16">
            <Link href={`/services/${prev.id}`} className="group flex items-center gap-6 w-full md:w-1/2">
              <div className="w-14 h-14 rounded-full  flex items-center justify-center group- transition-colors"><ArrowRight className="w-5 h-5 text-[#0094FE] group-hover:text-[var(--text-primary)] transition-colors" /></div>
              <div>
                <span className="text-[var(--text-secondary)] font-mono text-sm md:text-base font-bold tracking-widest uppercase block mb-1">السابقة</span>
                <span className="text-[var(--text-primary)] font-bold text-lg group-hover:text-[var(--text-primary)] transition-colors">{prev.title}</span>
              </div>
            </Link>
            <Link href={`/services/${next.id}`} className="group flex items-center gap-6 w-full md:w-1/2 justify-end text-left">
              <div>
                <span className="text-[var(--text-secondary)] font-mono text-sm md:text-base font-bold tracking-widest uppercase block mb-1 text-left">التالية</span>
                <span className="text-[var(--text-primary)] font-bold text-lg group-hover:text-[var(--text-primary)] transition-colors">{next.title}</span>
              </div>
              <div className="w-14 h-14 rounded-full  flex items-center justify-center group- transition-colors"><ArrowLeft className="w-5 h-5 text-[#0094FE] group-hover:text-[var(--text-primary)] transition-colors" /></div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[var(--border-subtle)] pt-10">
            {quickLinks.map((l) => (
              <Link key={l.id} href={`/services/${l.id}`} className="group  p-5 rounded-xl  hover:bg-[var(--surface-elevated)] transition-all duration-500">
                <span className="text-[var(--text-secondary)] font-mono text-sm md:text-base font-bold tracking-widest tracking-wider uppercase block mb-2 group-hover:text-[var(--text-secondary)]">استكشف</span>
                <h4 className="text-[var(--text-primary)] font-bold text-sm">{l.title}</h4>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Bottom fader to perfectly blend into the black footer */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[var(--page-bg)] pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
}


