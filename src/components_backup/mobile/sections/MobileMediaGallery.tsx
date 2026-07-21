"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ALBUM_CARDS = [
  {
    id: "reception",
    title: "الاستقبال",
    subtitle: "بيئة مريحة وداعمة",
    image: "/facility-images/reception/reception album cover.JPG",
    link: "/gallery?album=reception"
  },
  {
    id: "check-up-room",
    title: "غرفة الفحص",
    subtitle: "تشخيص دقيق وعناية فائقة",
    image: "/facility-images/check up room/398A2601.JPG",
    link: "/gallery?album=check-up-room"
  },
  {
    id: "lab",
    title: "المختبر",
    subtitle: "تجهيزات طبية بأعلى المعايير العالمية",
    image: "/facility-images/lab/the lab (1).JPG",
    link: "/gallery?album=lab"
  },
  {
    id: "operation-room",
    title: "غرفة العمليات",
    subtitle: "رعاية جراحية متقدمة وآمنة",
    image: "/facility-images/operation-room/operation room.JPG",
    link: "/gallery?album=operation-room"
  },
  {
    id: "recovery-room",
    title: "غرفة الإفاقة",
    subtitle: "رعاية مستمرة بعد الإجراءات",
    image: "/facility-images/recovery-room/recovery room.JPG",
    link: "/gallery?album=recovery-room"
  },
  {
    id: "freezing-unit",
    title: "وحدة التجميد",
    subtitle: "حفظ العينات بأحدث التقنيات",
    image: "/facility-images/freezing-unit/freezing samples unit (1).JPG",
    link: "/gallery?album=freezing-unit"
  },
  {
    id: "workshops",
    title: "مؤتمرات وورش عمل",
    subtitle: "مواكبة مستمرة لأحدث التطورات العلمية",
    image: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (1).jpg",
    link: "/gallery?album=workshops"
  }
];

export function MobileMediaGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isWheeling = useRef(false);

  const nextCard = () => {
    setDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, ALBUM_CARDS.length - 1));
  };
  const prevCard = () => {
    setDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -50) nextCard();
    else if (swipe > 50) prevCard();
  };

  const activeCard = ALBUM_CARDS[activeIndex];

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[#000814]" dir="rtl">
      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

      {/* Dynamic Glassy Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCard.image}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeCard.image}
            alt={activeCard.title}
            fill
            className="object-cover blur-[80px] brightness-50"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        {/* Global Title */}
        <div className="absolute top-20 inset-x-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none">
          <h3 className="font-heading text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tight dark:drop-shadow-[0_10px_40px_rgba(0,0,0,1)] mb-3">
            المعرض الإعلامي
          </h3>
          <p className="font-sans text-[11px] text-zinc-400 tracking-wide uppercase">
            تصفح المرافق والمنشآت
          </p>
        </div>

        <div className="w-full h-full pb-10 flex flex-col items-center justify-center pt-24">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 1, scale: 0.95 }}
              animate={{ x: '0%', opacity: 1, scale: 1 }}
              exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 cursor-grab active:cursor-grabbing pb-16"
            >
              {/* Media Card */}
              <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src={activeCard.image}
                  alt={activeCard.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Card Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start text-right">
                  <h4 className="font-heading text-2xl font-black text-white mb-1">
                    {activeCard.title}
                  </h4>
                  <p className="font-sans text-xs text-zinc-300 font-light mb-4">
                    {activeCard.subtitle}
                  </p>
                  <Link 
                    href={activeCard.link}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase transition-all backdrop-blur-md"
                  >
                    استعرض الألبوم
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center items-center gap-2 z-40 pointer-events-none" dir="rtl">
        {ALBUM_CARDS.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-4 shadow-[0_0_10px_rgba(212,230,22,0.8)]' : 'bg-white/20'}`} 
          />
        ))}
      </div>
    </section>
  );
}
