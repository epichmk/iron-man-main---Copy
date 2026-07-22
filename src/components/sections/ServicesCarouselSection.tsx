"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import servicesData from "@/lib/servicesData.json";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { LazyVideo } from "@/components/ui/LazyVideo";

const mobileServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');

export function ServicesCarouselSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = useCallback(() => {
    setActiveIndex(prev => Math.min(prev + 1, mobileServices.length - 1));
  }, []);

  const prevCard = useCallback(() => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      nextCard(); // Swipe left (RTL) -> next
    } else if (swipe > 50) {
      prevCard(); // Swipe right (RTL) -> prev
    }
  };

  // Helper to calculate 3D Coverflow styles based on offset from active index
  const getCardStyles = (offset: number) => {
    const abs = Math.abs(offset);
    const sign = Math.sign(offset);
    
    if (abs === 0) {
      return {
        x: "0vw",
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        opacity: 1,
        zIndex: 50,
        filter: "brightness(1)",
        boxShadow: "0 20px 50px var(--shadow-color), 0 0 40px rgba(59, 130, 246, 0.2)",
      };
    }
    if (abs === 1) {
      return {
        // Sign is inverted because we're in RTL visually, but framer x is absolute screen coordinates.
        // Wait, if RTL is active, x: positive goes right.
        x: `${sign * 25}vw`,
        scale: 0.8,
        rotateY: sign * -35,
        rotateX: 5,
        opacity: 0.6,
        zIndex: 40,
        filter: "brightness(0.6)",
        boxShadow: "0 10px 30px var(--shadow-color), 0 0 0 rgba(59, 130, 246, 0)",
      };
    }
    if (abs === 2) {
      return {
        x: `${sign * 45}vw`,
        scale: 0.6,
        rotateY: sign * -50,
        rotateX: 10,
        opacity: 0.2,
        zIndex: 30,
        filter: "brightness(0.3)",
        boxShadow: "0 5px 15px var(--shadow-color), 0 0 0 rgba(59, 130, 246, 0)",
      };
    }
    
    return {
      x: `${sign * 60}vw`,
      scale: 0.4,
      rotateY: sign * -60,
      rotateX: 10,
      opacity: 0,
      zIndex: 10,
      filter: "brightness(0)",
      boxShadow: "none",
    };
  };

  return (
    <section data-cinematic className="relative w-full h-[150vh] bg-[var(--page-bg)]">
      {/* Sticky container to simulate the 'snapping' behavior without scrub timeline */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center perspective-[2000px]">
        {/* Heavy Vignette for Pitch Black Edges */}
        {/* Background Video */}
        <LazyVideo
          src="/services-section.original.mp4" poster="/services-section-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[var(--overlay-bg)] z-0 pointer-events-none" />

        {/* Global Cinematic Title */}
        <div className="absolute top-24 md:top-28 inset-x-0 z-50 flex flex-col items-center text-center pointer-events-none px-6">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-tertiary)] tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,1)] mb-5 md:mb-8"
          >
            خدماتنا التخصصية
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-400/30 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#3b82f6]" />
            <p className="font-sans text-[10px] md:text-xs text-blue-300 tracking-[0.2em] uppercase font-bold pt-[1px]">
              اسحب لاستكشاف الخدمات • انقر للتفاصيل
            </p>
          </motion.div>
        </div>

        {/* ---------------- MOBILE LAYOUT (Stack Swipe) ---------------- */}
        <div className="flex flex-col md:hidden w-full h-full overflow-hidden relative z-20 pt-[220px] pb-8">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-20 px-4" dir="rtl">
            {mounted && (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ x: '100%', opacity: 0, scale: 0.9, rotateY: 45 }}
                  animate={{ x: '0%', opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ x: '-100%', opacity: 0, scale: 0.9, rotateY: -45 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 w-full h-full flex items-center justify-center px-4 cursor-grab active:cursor-grabbing preserve-3d"
                >
                  <div className="w-full h-full max-h-[65vh] relative rounded-2xl shadow-[0_0_50px_var(--shadow-color)]">
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

        {/* ---------------- DESKTOP LAYOUT (3D Coverflow) ---------------- */}
        <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center pointer-events-none perspective-[1200px]">
          {/* Draggable Interaction Layer */}
          <motion.div 
            className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing pointer-events-auto"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          />

          <div className="relative w-full h-full flex items-center justify-center" dir="ltr">
            {mounted && mobileServices.map((service, index) => {
              // Calculate logical offset
              // If activeIndex is 2, index 0 is -2, index 1 is -1, index 2 is 0, index 3 is 1.
              // Since we're rendering in LTR visually for the transform math to make sense, 
              // negative offset is left, positive offset is right.
              const offset = index - activeIndex;
              const styles = getCardStyles(offset);

              return (
                <motion.div
                  key={service.id}
                  className="absolute top-1/2 left-1/2 w-[35vw] max-w-[450px] aspect-square origin-center pointer-events-auto rounded-xl"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${styles.x})`,
                    y: "-50%",
                    scale: styles.scale,
                    rotateY: styles.rotateY,
                    rotateX: styles.rotateX,
                    opacity: styles.opacity,
                    zIndex: styles.zIndex,
                    filter: styles.filter,
                    boxShadow: styles.boxShadow,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 25, 
                    mass: 0.8 
                  }}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                    {/* The pointer-events-none above allows the drag layer to catch swipes, 
                        but we enable pointer events on click/hover internally by ServiceCard logic if needed. 
                        Actually, to allow ServiceCard to flip on click, we just let it handle clicks.
                        We wrap the click here to also set it to active. */}
                    <div className={`w-full h-full ${offset === 0 ? 'pointer-events-auto' : 'pointer-events-none cursor-pointer'}`}>
                      <ServiceCard {...service} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Overlay Controls */}
          <div className="absolute bottom-12 inset-x-0 flex justify-between items-center px-[10vw] z-50 pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); nextCard(); }} // RTL so Next is Left visually
              className={`w-14 h-14 rounded-full border border-[var(--border-medium)] backdrop-blur-xl flex items-center justify-center transition-all pointer-events-auto group ${activeIndex === mobileServices.length - 1 ? 'bg-[var(--overlay-bg)] text-[var(--text-muted-light)] cursor-not-allowed opacity-50' : 'bg-[var(--overlay-bg)] text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-900/30 hover:scale-110 active:scale-90 shadow-[0_0_20px_var(--shadow-color)]'}`}
              aria-label="السابق"
            >
              <svg className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            
            <div className="flex gap-3 pointer-events-auto">
              {mobileServices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-accent shadow-[0_0_15px_rgba(212,230,22,0.8)]' : 'w-2 bg-[var(--surface-hover)] hover:bg-white/50'}`}
                />
              ))}
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); prevCard(); }} // RTL so Prev is Right visually
              className={`w-14 h-14 rounded-full border border-[var(--border-medium)] backdrop-blur-xl flex items-center justify-center transition-all pointer-events-auto group ${activeIndex === 0 ? 'bg-[var(--overlay-bg)] text-[var(--text-muted-light)] cursor-not-allowed opacity-50' : 'bg-[var(--overlay-bg)] text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-900/30 hover:scale-110 active:scale-90 shadow-[0_0_20px_var(--shadow-color)]'}`}
              aria-label="التالي"
            >
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
