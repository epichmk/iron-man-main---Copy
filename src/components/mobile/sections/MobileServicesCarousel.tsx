"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import servicesData from "@/lib/servicesData.json";
import { ServiceCard } from "@/components/ui/ServiceCard";

const mobileServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');
mobileServices.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

export function MobileServicesCarousel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = useCallback(() => {
    setActiveIndex(prev => Math.min(prev + 1, mobileServices.length - 1));
  }, []);

  const prevCard = useCallback(() => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      nextCard(); // Swipe left (RTL) -> next
    } else if (swipe > 50) {
      prevCard(); // Swipe right (RTL) -> prev
    }
  };

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[var(--page-bg)]" dir="rtl">
      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)]" />
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-screen">
        <video
          src="/services-section.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--overlay-bg)] z-0 pointer-events-none" />
      </div>

      {/* Global Cinematic Title */}
      <div className="absolute top-24 inset-x-0 z-50 flex flex-col items-center text-center pointer-events-none px-6">
        <h3 className="font-heading text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tight dark:drop-shadow-[0_10px_40px_rgba(0,0,0,1)] mb-5">
          خدماتنا التخصصية
        </h3>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-400/30 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#3b82f6]" />
          <p className="font-sans text-[10px] text-blue-300 tracking-[0.2em] uppercase font-bold pt-[1px]">
            اسحب لاستكشاف الخدمات • انقر للتفاصيل
          </p>
        </div>
      </div>

      {/* MOBILE LAYOUT (Stack Swipe) */}
      <div className="flex flex-col w-full h-full overflow-hidden relative z-20 pt-[220px] pb-8">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-20 px-4" dir="rtl">
          {mounted && (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ x: '100%', opacity: 1, scale: 0.9, rotateY: 45 }}
                animate={{ x: '0%', opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ x: '-100%', opacity: 0, scale: 0.9, rotateY: -45 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full flex items-center justify-center px-4 cursor-grab active:cursor-grabbing preserve-3d"
              >
                <div className="w-full h-full max-h-[75vh] relative rounded-2xl shadow-[0_0_50px_var(--shadow-color)]">
                  <ServiceCard {...mobileServices[activeIndex]} />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        
        {/* Mobile Pagination */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center items-center gap-2 z-40 pointer-events-none" dir="rtl">
          {mobileServices.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-4 shadow-[0_0_10px_rgba(212,230,22,0.8)]' : 'bg-[var(--surface-hover)]'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
