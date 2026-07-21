"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import Image from "next/image";

const feedbackImages = [
  "/clients-feedback/media__1777843245908.jpg",
  "/clients-feedback/media__1777843246016.jpg",
  "/clients-feedback/media__1777843246099.jpg",
  "/clients-feedback/media__1777843246110.jpg",
  "/clients-feedback/media__1777843246189.jpg",
  "/clients-feedback/media__1777843399133.jpg",
  "/clients-feedback/media__1777843399209.jpg",
  "/clients-feedback/media__1777843399240.jpg",
  "/clients-feedback/media__1777843399266.jpg",
  "/clients-feedback/media__1777843399273.jpg"
];

export function MobileFeedbackGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbackImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-black" dir="rtl">
      {/* Background Video */}
      <LazyVideo
        src="/clients-feedback.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      {/* Heavy Vignette for Pitch Black Edges */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.7)_70%,rgba(0,4,10,1)_100%)]" />

      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Global Title */}
      <div className="absolute top-16 inset-x-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none">
        <div className="rounded-full px-5 py-1.5 uppercase text-[10px] tracking-[0.2em] font-medium text-white/60 mb-4 inline-block backdrop-blur-md shadow-[0_0_30px_rgba(192,232,22,0.1)] border border-white/10">
          رسائل الشكر
        </div>
        <h3 className="font-heading text-4xl font-black text-white dark:drop-shadow-[0_10px_40px_rgba(0,0,0,1)] mb-3">
          رسائل من القلب
        </h3>
        <p className="font-sans text-[13px] text-zinc-300 tracking-wide font-medium max-w-[280px] dark:drop-shadow-md leading-relaxed">
          كل رسالة تصلنا هي قصة نجاح جديدة، وفرحة عائلة تمنحنا دافعاً للاستمرار في تقديم الأفضل.
        </p>
      </div>

      {/* Auto-fading Whatsapp images */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pt-24 pb-10 px-8 pointer-events-none">
        <div className="relative w-full max-w-[320px] h-[65vh] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-white/20 bg-black/80 backdrop-blur-xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 1, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={feedbackImages[activeIndex]}
                alt="Whatsapp Feedback"
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fade Overlays */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
