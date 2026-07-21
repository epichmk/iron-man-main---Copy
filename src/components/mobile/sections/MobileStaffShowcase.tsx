"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import cinematicData from "@/lib/cinematicData.json";

const staffEntry = cinematicData.find((d) => d.staffData && d.staffData.length > 0);
const allStaff = staffEntry?.staffData?.slice(0, 2) ?? [];

const PROMO_TEXTS = [
  "نلتزم برعاية شاملة تبدأ من فهم عميق لاحتياجاتك، لنبني أساساً متيناً لصحة مستدامة ومسارات علاجية متطورة.",
  "نوجه ابتكاراتنا الطبية ورؤيتنا الاستراتيجية نحو هدف واحد: تقديم بيئة رعاية متكاملة تضع المريض في قلب الاهتمام.",
];

export function MobileStaffShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isWheeling = useRef(false);

  const nextStaff = () => {
    setDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, allStaff.length - 1));
  };
  const prevStaff = () => {
    setDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -50) nextStaff();
    else if (swipe > 50) prevStaff();
  };

  if (allStaff.length === 0) return null;

  const activeStaff = allStaff[activeIndex];

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[var(--page-bg)]" dir="rtl">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-30 mix-blend-screen">
        <video
          src="/staff-section-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--overlay-bg)] z-0 pointer-events-none" />
      </div>

      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)]" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[150vw] h-[50vh] bg-blue-900/10 blur-[100px] rounded-full rotate-45" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end pt-24">
        {/* Global Title */}
        <div className="absolute top-16 inset-x-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none">
          <h3 className="font-heading text-4xl font-black text-[var(--text-primary)] dark:drop-shadow-[0_10px_40px_rgba(0,0,0,1)] mb-3">
            القيادة الطبية
          </h3>
          <p className="font-sans text-[11px] text-accent tracking-wide uppercase mb-2">
            عقولٌ رائدة
          </p>
          <p className="font-sans text-[11px] text-[var(--text-secondary)] font-medium max-w-[280px] dark:drop-shadow-md leading-relaxed">
            منظومة طبية متكاملة تقودها كفاءات استثنائية، تجمع بين الخبرة العميقة والابتكار التكنولوجي لضمان أعلى مستويات الرعاية والدقة.
          </p>
        </div>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 1 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Staff Image */}
            <div className="absolute inset-x-0 bottom-0 h-[65vh] z-10">
              <div className="relative w-full h-full flex items-end justify-center px-4">
                <Image
                  src={activeStaff.image}
                  alt={activeStaff.name}
                  fill
                  className="object-contain object-bottom drop-shadow-[0_5px_15px_var(--shadow-color)]"
                />
              </div>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-x-0 top-48 z-30 flex flex-col items-center text-center px-6">
              <p className="text-[var(--text-primary)] font-light leading-[1.5] text-[15px] mb-4 dark:drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                {PROMO_TEXTS[activeIndex % PROMO_TEXTS.length]}
              </p>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent my-1" />
              
              <div className="mt-6 flex flex-col items-center">
                <span className="font-mono tracking-[0.2em] uppercase px-5 py-2 rounded-full text-[12px] text-accent bg-[var(--overlay-bg)] border border-[#d4e616]/30 backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(212,230,22,0.2)]">
                  {activeStaff.title}
                </span>
                <h3 className="font-heading font-black text-4xl text-[var(--text-primary)] mb-3 dark:drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                  {activeStaff.name}
                </h3>
                <p className="text-zinc-100 font-medium leading-[1.8] text-sm max-w-[300px] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                  {activeStaff.roleDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots & Navigation Hint */}
      <div className="absolute bottom-8 inset-x-0 flex flex-col justify-center items-center gap-4 z-40 pointer-events-none" dir="rtl">
        <div className="flex justify-center items-center gap-2">
          {allStaff.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-4 shadow-[0_0_10px_rgba(212,230,22,0.8)]' : 'bg-[var(--surface-hover)]'}`} 
            />
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] backdrop-blur-md">
          <span className="font-sans text-[10px] text-[var(--text-secondary)] tracking-[0.1em] uppercase font-bold">
            اسحب للتنقل بين أعضاء الفريق
          </span>
          <div className="flex gap-1 opacity-50">
            <span className="text-xs">←</span>
            <span className="text-xs">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
