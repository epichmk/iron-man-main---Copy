"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
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

const WA = "مرحباً، أود الاستفسار عن تقنية ICSI/IMSI بمجهر IX73";

export function IX73ServicePage() {
  const service = servicesData.find((s) => s.id === "ix73-icsi-imsi")!;
  const ci = servicesData.findIndex((s) => s.id === service.id);
  const next = servicesData[(ci + 1) % servicesData.length];
  const prev = servicesData[(ci - 1 + servicesData.length) % servicesData.length];
  const quickLinks = [servicesData[(ci + 2) % servicesData.length], servicesData[(ci + 3) % servicesData.length], servicesData[(ci + 4) % servicesData.length]];
  const blogs = blogData.filter((p) => p.relatedServices.includes("ix73-icsi-imsi")).slice(0, 3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Progress
  const { scrollYProgress } = useScroll();
  const pw = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 80, damping: 30 });

  // Hero parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroImgScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  // Section 2 parallax
  const s2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s2p } = useScroll({ target: s2Ref, offset: ["start end", "end start"] });
  const s2ImgY = useTransform(s2p, [0, 1], ["10%", "-10%"]);

  return (
    <div className="relative w-full bg-[var(--page-bg)] selection:bg-accent/30 selection:text-[var(--text-primary)]" dir="rtl">
      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-right" style={{ width: pw }}>
        <div className="w-full h-full bg-accent" />
      </motion.div>



      {/* ══════════════════════════════════════════════════════════
          S1 — HERO: Split-screen. Image left, massive text right.
          ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero-section" className="relative w-full h-screen overflow-hidden">
        {/* Full BG image with parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY, scale: heroImgScale }}>
          <Image src={service.image} alt="" fill sizes="100vw" className="object-cover hide-in-light" quality={100} priority />
          <Image src={`/services/lightmode/${service.id}_light.jpg`} alt="" fill sizes="100vw" className="object-cover hide-in-dark" quality={100} priority />
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-[var(--page-bg)]/70" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--page-bg)] via-transparent to-[var(--page-bg)]/40" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--page-bg)] via-[var(--page-bg)]/30 to-transparent" />

        {/* Content */}
        <motion.div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto" style={{ y: heroTextY, opacity: heroOpacity }}>
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase font-bold">IMSI · IX73 · Olympus</span>
            </div>
          </motion.div>

          {/* Title — massive, editorial */}
          <motion.h1
            initial={{ opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-black text-[var(--text-primary)] leading-[0.95] tracking-tight mb-8 max-w-[900px]"
          >
            نرى
            <span className="text-accent"> ما لا يُرى</span>
            <br />
            لنمنحكما
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#0066FF] to-white">ما لا يُمنح</span>
          </motion.h1>

          {/* Subtitle + Stats inline */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="text-[var(--text-tertiary)] text-base md:text-lg font-light max-w-[420px] leading-[1.8]">
              تكبير <span className="text-[var(--text-primary)] font-mono font-bold" dir="ltr">6000x</span> يكشف ما أخفته كل المحاولات السابقة. هذا ليس مجهراً — هذا فرصتكما الحقيقية.
            </p>
            <div className="flex items-end gap-10">
              {[{ n: "6000x", l: "تكبير" }, { n: "95%", l: "إخصاب" }, { n: "−40%", l: "إجهاض" }].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1, duration: 0.6 }} className="flex flex-col items-start">
                  <span className="text-[var(--text-primary)] font-mono font-black text-2xl md:text-3xl leading-none" dir="ltr">{s.n}</span>
                  <span className="text-zinc-600 font-mono text-[9px] tracking-[0.2em] uppercase mt-1">{s.l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }} className="mt-10 flex items-center gap-6">
            <a href={getWhatsAppLink(WA)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-accent text-black font-bold text-sm px-8 py-4 rounded-full hover:scale-[1.03] transition-transform duration-300">
              <span>ابدأ رحلتكما</span>
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="#story" className="text-[var(--text-muted-light)] hover:text-[var(--text-primary)] text-sm font-mono tracking-wider transition-colors">↓ القصة الكاملة</a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-[1px] h-10 bg-gradient-to-b from-[#d4e616] to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S2 — THE COUPLE'S STORY: Asymmetric editorial.
          Big quote left, their journey right.
          ══════════════════════════════════════════════════════════ */}
      <section id="story" ref={s2Ref} className="relative w-full min-h-screen py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">

          {/* Massive pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-32"
          >
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase block mb-8">/ قصتكما تبدأ هنا</span>
            <blockquote className="text-[clamp(1.5rem,4vw,3.5rem)] font-black text-[var(--text-primary)] leading-[1.4] max-w-[900px] text-balance">
              <span className="text-accent/20 text-[4rem] md:text-[6rem] leading-none font-serif absolute -mr-2 -mt-6">&ldquo;</span>
              كثيرٌ من الأزواج جاؤوا إلينا بعد أن أُغلقت أمامهم كل الأبواب. محاولات فاشلة. إجهاض متكرر. <span className="text-accent">وسؤال واحد: لماذا؟</span>
            </blockquote>
          </motion.div>

          {/* 3-column emotional journey — no cards, pure text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t border-[var(--border-subtle)] pt-16">
            {[
              {
                num: "01",
                title: "ما مررتم به",
                color: 'var(--text-primary)',
                body: "محاولات حقن مجهري بتكبير 400x — يختار الحيوان المنوي بناءً على شكله الخارجي فقط. لكن العيب الحقيقي مخفي في النواة. لا يُرى. لا يُشخّص. فتتكرر المحاولات وتتكرر الخيبة."
              },
              {
                num: "02",
                title: "ما يتغيّر هنا",
                color: "#0066FF",
                body: "بتكبير 6000x — 15 ضعفاً أكثر من التقليدي — نرى الفجوات النووية وتكسّر الحمض النووي. نستبعد كل حيوان منوي معيب. نختار المثالي فقط. هذا هو الفرق بين التخمين واليقين."
              },
              {
                num: "03",
                title: "النتيجة",
                color: 'var(--accent)',
                body: "حالات فشلت 3 و4 مرات في مراكز أخرى — نجحت هنا من المحاولة الأولى. تحسّن 15-20% في معدلات الحمل. انخفاض 40% في الإجهاض المبكر. هذه ليست أرقام — هذه عائلات."
              }
            ].map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ color: col.color }}>{col.num}</span>
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-4" style={{ color: col.color }}>{col.title}</h3>
                <p className="text-[var(--text-tertiary)] leading-[2] font-light text-[15px]">{col.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S3 — THE NUMBER: One massive stat, full viewport.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)] via-[#000a1a] to-[var(--page-bg)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >
          <span className="text-[clamp(6rem,20vw,16rem)] font-black text-[var(--text-primary)] font-mono leading-none block" dir="ltr">
            6<span className="text-accent">,</span>000<span className="text-accent">x</span>
          </span>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-8 h-[1px] bg-zinc-700" />
            <span className="text-[var(--text-muted-light)] font-mono text-xs tracking-[0.3em] uppercase">تكبير مجهري فائق</span>
            <div className="w-8 h-[1px] bg-zinc-700" />
          </div>
          <p className="text-[var(--text-muted-light)] text-sm font-light mt-4 max-w-md mx-auto">
            أعلى تكبير متاح لانتقاء الحيوان المنوي في المنطقة
          </p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S4 — TECHNOLOGY: Minimal list, no cards.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-[#0066FF] font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">/ الأنظمة</span>
              <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.1]">ما نستخدمه<br /><span className="text-zinc-600">لا يتواجد إلا هنا</span></h2>
            </div>
            <p className="text-[var(--text-muted-light)] text-sm font-light max-w-sm leading-relaxed">كل أداة مُصممة لغرض واحد — أعلى فرص نجاح ممكنة في العالم.</p>
          </motion.div>

          {(service.technologyUsed || []).map((t: {name: string; description: string}, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border-t border-[var(--border-subtle)] #0066FF]/30 transition-colors duration-500"
            >
              <div className="flex items-center justify-between py-8 md:py-10">
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-zinc-800 font-mono text-sm group-hover:text-[#0066FF]/40 transition-colors" dir="ltr">0{i + 1}</span>
                  <div>
                    <span className="text-[var(--text-primary)] font-bold text-lg md:text-2xl block font-mono group-hover:text-[#0066FF] transition-colors duration-500" dir="ltr">{t.name}</span>
                    <span className="text-zinc-600 text-sm font-light mt-1 block group-hover:text-[var(--text-tertiary)] transition-colors">{t.description}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-#0066FF]/30">
                  <ArrowLeft className="w-4 h-4 text-[#0066FF]" />
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[var(--border-subtle)]" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S5 — CLIENT JOURNEY: Vertical timeline, ultra-clean
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-20">
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">/ رحلتكما</span>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight">من الأمل<br /><span className="text-zinc-600">إلى الحقيقة</span></h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 right-[23px] md:right-[31px] w-[1px] bg-gradient-to-b from-[#d4e616]/40 via-[#d4e616]/10 to-transparent" />

            {(service.clientJourney || []).map((step: {step: number; title: string; description: string}, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-8 md:gap-12 mb-16 last:mb-0 group"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--page-bg)] #d4e616]/30 group-#d4e616] flex items-center justify-center transition-colors duration-500">
                  <span className="text-accent font-mono font-black text-sm md:text-base">{String(step.step).padStart(2, "0")}</span>
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-4 flex-1 max-w-2xl">
                  <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] mb-3 group-hover:text-accent transition-colors duration-500">{step.title}</h3>
                  <p className="text-[var(--text-muted-light)] leading-[1.9] font-light text-[15px] group-hover:text-[var(--text-tertiary)] transition-colors duration-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S6 — BENEFITS: Editorial list. Dramatic hover.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-20">
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">/ المزايا</span>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight">ما يميّز<br /><span className="text-zinc-600">هذا البروتوكول</span></h2>
          </motion.div>

          {(service.benefits || []).map((b: {label: string; value: string}, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group border-t border-[var(--border-subtle)] #d4e616]/40 transition-colors duration-700 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[#d4e616]/[0.02] to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000 -z-10" />
              <div className="flex-1">
                <span className="text-zinc-700 font-mono text-[10px] tracking-[0.3em] uppercase block mb-1 group-hover:text-accent/60 transition-colors">{b.label}</span>
                <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-accent transition-colors duration-500">{b.value}</h3>
              </div>
              <span className="text-zinc-900 font-mono text-5xl font-black group-hover:text-accent/10 transition-colors duration-700 hidden md:block" dir="ltr">0{i + 1}</span>
            </motion.div>
          ))}
          <div className="border-t border-[var(--border-subtle)]" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S7 — DEEP TECH: Scrolling text blocks. Sticky CTA.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Sticky sidebar */}
            <div className="lg:w-[35%] lg:sticky lg:top-32 lg:self-start">
              <span className="text-[#0066FF] font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">/ التقنية</span>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight mb-6 leading-[1.2]">هندسة<br />الدقة المطلقة</h2>
              <p className="text-[var(--text-muted-light)] text-sm leading-relaxed mb-8">كل عنصر في المنظومة مصمم لهدف واحد — حماية البويضة وانتقاء الأمثل.</p>

              {/* CTA */}
              <a href={getWhatsAppLink(WA)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between w-full p-5 rounded-2xl #d4e616]/20 bg-accent/[0.03] #d4e616]/50 hover:bg-accent/[0.06] transition-all duration-500">
                <div>
                  <span className="text-[var(--text-primary)] font-bold text-sm block">جاهزون للخطوة الأولى؟</span>
                  <span className="text-[var(--text-muted-light)] text-xs">تواصلوا عبر الواتساب</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
              </a>
            </div>

            {/* Scrolling content blocks */}
            <div className="lg:w-[65%] flex flex-col gap-10">
              {[
                "يمثل نظام IX73 نقلة نوعية. تم بناء المجهر على منصة مضادة للاهتزازات تضمن ثباتاً مطلقاً أثناء حقن البويضة — التي لا يتجاوز قطرها 0.1 ملم.",
                "المجهر مزود بأنظمة تلاعب دقيقة (Micromanipulators) تعمل بضغط الزيت، مما يتيح دقة حركة على مستوى الميكرون. كما يحتوي على سطح تسخين مدمج يحافظ بدقة متناهية على 37°C — محاكياً بيئة قناة فالوب.",
                "نستخدم إبر حقن مجهرية ليزرية دقيقة للغاية مصممة لتقليل الصدمة الميكانيكية لغشاء البويضة. كل هذه الأنظمة تعمل بتناغم تام — لتوفير بيئة خالية من الإجهاد الخلوي، ودفع معدلات تكوّن أجنة اليوم الخامس (Blastocysts) إلى مستويات عالمية.",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="border-r-2 border-[var(--border-subtle)] pr-8 #0066FF]/40 transition-colors duration-700"
                >
                  <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-[2] font-light">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          S8 — FAQ
          ══════════════════════════════════════════════════════════ */}
      {(service.faq || []).length > 0 && (
        <section className="relative w-full py-32 md:py-40 overflow-hidden">
          <div className="max-w-[900px] mx-auto px-6 md:px-16">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
              <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">/ أسئلة شائعة</span>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight">إجابات<br /><span className="text-zinc-600">تطمئنكما</span></h2>
            </motion.div>

            {(service.faq || []).map((q: {q: string; a: string}, i: number) => (
              <div key={i} className={`border-t transition-colors duration-500 ${openFaq === i ? "border-[#d4e616]/30" : "border-[var(--border-subtle)] "}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-right py-6 flex items-center justify-between outline-none gap-4">
                  <h4 className={`text-base md:text-lg font-bold transition-colors duration-300 text-right ${openFaq === i ? "text-accent" : "text-[var(--text-primary)]"}`}>{q.q}</h4>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? "border-[#d4e616]/50 text-accent" : "border-[var(--border-subtle)] text-zinc-600"}`}>
                    <Plus size={14} weight="bold" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="pb-6 text-[var(--text-muted-light)] text-[15px] leading-[1.9] font-light">{q.a}</p>
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
        <section className="relative w-full py-32 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-end justify-between mb-16">
              <div>
                <span className="text-[#0066FF] font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">/ مقالات</span>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight">قراءات ذات صلة</h2>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <Link href={`/blog/${post.id}`} className="group block  rounded-xl p-6 #d4e616]/20 hover:bg-[var(--surface-elevated)] transition-all duration-500">
                    <span className="text-accent/60 font-mono text-[9px] tracking-wider uppercase">{post.category}</span>
                    <h3 className="text-[var(--text-primary)] font-bold text-base mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-zinc-600 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex gap-4 mt-4 text-zinc-700 text-[11px]">
                      
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16 border-t border-[var(--border-subtle)] pt-16">
            <Link href={`/services/${prev.id}`} className="group flex items-center gap-6 w-full md:w-1/2">
              <div className="w-14 h-14 rounded-full  flex items-center justify-center group-#d4e616]/50 transition-colors"><ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-accent transition-colors" /></div>
              <div>
                <span className="text-zinc-700 font-mono text-[9px] tracking-widest uppercase block mb-1">السابقة</span>
                <span className="text-[var(--text-primary)] font-bold text-lg group-hover:text-accent transition-colors">{prev.title}</span>
              </div>
            </Link>
            <Link href={`/services/${next.id}`} className="group flex items-center gap-6 w-full md:w-1/2 justify-end text-left">
              <div>
                <span className="text-zinc-700 font-mono text-[9px] tracking-widest uppercase block mb-1 text-left">التالية</span>
                <span className="text-[var(--text-primary)] font-bold text-lg group-hover:text-accent transition-colors">{next.title}</span>
              </div>
              <div className="w-14 h-14 rounded-full  flex items-center justify-center group-#d4e616]/50 transition-colors"><ArrowLeft className="w-5 h-5 text-zinc-600 group-hover:text-accent transition-colors" /></div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[var(--border-subtle)] pt-10">
            {quickLinks.map((l) => (
              <Link key={l.id} href={`/services/${l.id}`} className="group  p-5 rounded-xl #d4e616]/20 hover:bg-[var(--surface-elevated)] transition-all duration-500">
                <span className="text-zinc-700 font-mono text-[9px] tracking-wider uppercase block mb-2 group-hover:text-accent/60">استكشف</span>
                <h4 className="text-[var(--text-primary)] font-bold text-sm">{l.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

