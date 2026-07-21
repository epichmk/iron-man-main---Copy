"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, MotionValue, useMotionValue } from "framer-motion";
import Image from "next/image";
import servicesData from "@/lib/servicesData.json";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { useIsMobile } from "@/hooks/useIsMobile";

function IX3FeaturedCard({ title, image, velocityRotation, velocityScale }: { title: string, image: string, velocityRotation: MotionValue<number>, velocityScale: MotionValue<number> }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-0 group min-h-[50vh] md:min-h-screen">
      {/* The Ethereal Halo Image - Full Bleed Blended */}
      <motion.div 
        className="absolute inset-0 z-10"
        animate={{ y: [-5, 5, -5] }}
        transition={{ 
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
        }}
      >
        <Image 
          src={image} 
          alt={title} 
          fill 
          sizes="100vw"
          className="object-contain object-top lg:object-center opacity-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000814]/90 via-transparent to-[#000814]/90" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#000814] to-transparent lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000814]/80 via-transparent to-[#000814]/80 hidden lg:block" />
      </motion.div>
      
      {/* Sci-Fi Viewfinder Brackets */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none hidden md:block"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ scale: velocityScale }}
      >
        <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-blue-400" />
        <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-blue-400" />
        <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-blue-400" />
        <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-blue-400" />
      </motion.div>

      {/* Floating Light Particles */}
      {mounted && [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px] z-20 hidden md:block"
          initial={{ 
            x: (Math.random() - 0.5) * 300, 
            y: (Math.random() - 0.5) * 300,
            opacity: 0
          }}
          animate={{ 
            y: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300 - 100],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
}

function IX3TechHUD({ mouseX, mouseY, velocityRotation }: { mouseX: MotionValue<number>, mouseY: MotionValue<number>, velocityRotation: MotionValue<number> }) {
  const [isHovered, setIsHovered] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = e.pageY - (listRef.current?.offsetTop || 0);
    scrollTop.current = listRef.current?.scrollTop || 0;
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
    setIsHovered(false);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !listRef.current) return;
    e.preventDefault();
    const y = e.pageY - listRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5;
    listRef.current.scrollTop = scrollTop.current - walk;
  };

  return (
    <motion.div 
      className="relative w-full h-full border-l border-blue-500/20 pl-6 hidden md:flex flex-col"
      style={{ rotateX: mouseY, rotateY: mouseX, rotateZ: velocityRotation }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handlePointerLeave}
    >
      <div className="absolute -left-[1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-50" />
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#000814] to-transparent z-10 pointer-events-none" />
        <div 
          ref={listRef}
          className="h-full overflow-y-auto no-scrollbar scroll-smooth select-none cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          style={{ touchAction: 'none' }}
        >
          <div className="py-8 flex flex-col gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-4 group/item"
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 1, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-blue-500/50 font-mono text-xs mt-1">{(i + 1).toString().padStart(2, '0')}</div>
                <div className="flex flex-col gap-1">
                  <div className="text-blue-300 text-sm font-bold tracking-widest font-mono">SYS.CHK.{i}</div>
                  <div className="text-blue-100/50 text-xs font-mono">STATUS: OPTIMAL</div>
                  <div className="w-16 h-[1px] bg-blue-500/30 mt-2 group-hover/item:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#000814] to-transparent z-10 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export function IX3FeaturedSection() {
  const velocityRotation = useMotionValue(0);
  const velocityScale = useMotionValue(1);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();
  const noAnim = isMobile;

  return (
    <section data-cinematic className="relative w-full h-[150vh] bg-[#000814]">
      {/* Sticky container to simulate the 'snapping' behavior without scrub timeline */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Heavy Vignette for Pitch Black Edges */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />
        
        {/* Background Video */}
        <LazyVideo
          src="/services-section.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        />
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

        {/* FULL BLEED WINDOW */}
        <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-0 md:px-16 pt-20 md:pt-0 pb-12 md:pb-0">
        
        {/* Left HUD Panel */}
        <div className="hidden md:flex w-[28vw] max-w-[350px] z-30 flex-col justify-center h-full max-h-[600px] shrink-0">
          <IX3TechHUD mouseX={mouseX} mouseY={mouseY} velocityRotation={velocityRotation} />
        </div>

        {/* IX3 Image Center */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-start pt-16 md:pt-0 md:items-center justify-center scale-125 md:scale-100 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="w-full h-full flex items-center justify-center">
            <IX3FeaturedCard title={servicesData.find(s => s.id === 'ix73-icsi-imsi')?.title || "IX3"} image="/ix73_wide_expanded.png" velocityRotation={velocityRotation} velocityScale={velocityScale} />
          </div>
        </div>

        {/* Cinematic Bottom Gradient Fade for Text */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#000814] via-[#000814]/80 to-transparent pointer-events-none z-20 md:hidden" />

        {/* Text Block (Bottom on Mobile, Right on Desktop) */}
        <div className="relative z-30 flex flex-col justify-end md:justify-center items-center md:items-start w-full px-6 md:px-0 md:w-[45vw] md:max-w-[600px] pointer-events-auto text-center md:text-right mt-auto md:mt-0" dir="rtl">
          <div className="w-full drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] flex flex-col items-center md:items-start">
            
            <div className="flex flex-col items-center md:items-start w-full">
              <motion.span 
                className="text-blue-400 text-[13px] md:text-sm font-sans font-bold tracking-[0.3em] uppercase block drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-1 md:mb-2"
                initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                أحدث التقنيات
              </motion.span>
              <motion.h2 
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[1.05] font-black tracking-tight text-white mb-0 md:mb-2 text-center md:text-right"
                initial={noAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: noAnim ? 0 : 0.1 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                دقة.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 dark:drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">متناهية.</span>
              </motion.h2>
            </div>
            
              <motion.div 
              className="max-w-sm relative mt-2 md:mt-4 mx-auto md:mx-0"
              initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: noAnim ? 0 : 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="absolute -right-6 top-1 bottom-1 w-[3px] bg-gradient-to-b from-blue-400 to-blue-900 rounded-full hidden md:block" />
              <p className="font-sans text-zinc-300 text-[15px] md:text-xl leading-snug md:leading-normal font-light dark:drop-shadow-[0_0_15px_rgba(0,0,0,1)] px-2 md:px-0 md:pr-2 text-center md:text-right">
                يُعد نظام <strong className="text-white font-semibold tracking-wide">Olympus IX73 ICSI & IMSI</strong><br className="hidden md:block" /> قمة تكنولوجيا الإنجاب.
              </p>
            </motion.div>

            <motion.div 
              className="w-full max-w-[280px] md:max-w-sm mt-4 md:mt-6 mx-auto md:mx-0"
              initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: noAnim ? 0 : 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <Link
                href="/services/ix73-icsi-imsi"
                className="group/btn relative w-full inline-flex items-center justify-center md:justify-between py-3.5 md:py-3 px-8 md:px-6 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500/15 via-blue-500/10 to-transparent border border-transparent text-accent hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-md overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] skew-x-12" />
                <span className="relative z-10 font-sans font-bold tracking-widest text-sm uppercase">اقرأ المزيد</span>
                <span className="relative z-10 transform transition-transform duration-300 group-hover/btn:-translate-x-2 font-mono ml-4 md:ml-0 md:mr-auto hidden md:inline-block">←</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
