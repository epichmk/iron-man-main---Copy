"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

const partners = [
  { id: 1, src: "/partners/1.svg", name: "شريك 1" },
  { id: 2, src: "/partners/2.svg", name: "شريك 2" },
  { id: 3, src: "/partners/3.svg", name: "شريك 4" }, // Wait, array is 1,2,3,4,5,6,7
  { id: 4, src: "/partners/4.svg", name: "شريك 5" },
  { id: 5, src: "/partners/5.svg", name: "شريك 6" },
  { id: 6, src: "/partners/6.svg", name: "شريك 7" },
  { id: 7, src: "/partners/7.svg", name: "شريك 8" },
];

function PartnerCard({ partner }: { partner: typeof partners[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // 3D Tilt Effect
  const rotateX = useTransform(smoothY, [-50, 50], [10, -10]);
  const rotateY = useTransform(smoothX, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic Pull (subtle)
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);

    // Spotlight Coordinates
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const borderBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.4), transparent 40%)`;
  const innerBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.08), transparent 40%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group w-full h-[220px] rounded-[2rem] cursor-pointer"
    >
      {/* Dynamic Spotlight Border */}
      <div className="absolute -inset-[1px] rounded-[2rem] bg-[var(--surface-elevated)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: borderBackground }}
        />
      </div>

      {/* Card Content Layer */}
      <div className="absolute inset-0 rounded-[2rem] bg-[var(--page-bg)]/80 backdrop-blur-xl  group- transition-colors duration-500 overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* Subtle Background Glow moving with mouse inside */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: innerBackground }}
        />
        
        {/* Logo Container with 3D Pop */}
        <motion.div 
          className="relative w-[50%] h-[50%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
          style={{ translateZ: 40 }} // Pops out in 3D
        >
          <Image
            src={partner.src}
            alt={partner.name}
            fill
            className="object-contain drop-shadow-[0_0_15px_var(--border-subtle)] group-hover:drop-shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all duration-700"
            unoptimized
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function PartnersSection() {
  return (
    <section className="relative py-32 bg-[var(--page-bg)] overflow-hidden" style={{ perspective: "2000px" }}>
      {/* Ambient Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0066FF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-20" dir="rtl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--surface-elevated)]  mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,102,255,0.1)]">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(0,102,255,0.8)]" />
              <span className="text-zinc-200 text-xs font-bold tracking-widest uppercase" dir="ltr">Trusted Network</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-tight dark:drop-shadow-2xl">
              شركاء <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0066FF]">النجاح</span>
            </h2>
            
            <p className="font-sans text-lg md:text-xl text-[var(--text-tertiary)] max-w-3xl mx-auto leading-relaxed dark:drop-shadow-md">
              يساهمون معنا في تحقيق الأحلام ونشر الوعي لبناء قطاع صحي موثوق ورائد في الوطن. 
            </p>
          </motion.div>
        </div>

        {/* 3D Bento Grid for 7 Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative" dir="rtl">
           {partners.map((partner, index) => {
             // Asymmetric Premium Layout
             let spanClass = "";
             if (index === 0) spanClass = "md:col-span-2 lg:col-span-2";
             else if (index === 3) spanClass = "md:col-span-2 lg:col-span-2";
             
             return (
               <motion.div 
                 key={partner.id}
                 initial={{ opacity: 0, scale: 0.9, y: 40 }}
                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
                 viewport={{ once: true, margin: "-5%" }}
                 transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                 className={`w-full ${spanClass}`}
                 style={{ transformStyle: "preserve-3d" }}
               >
                  <PartnerCard partner={partner} />
               </motion.div>
             );
           })}
        </div>
      </div>
    </section>
  );
}

