"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function GlobalNetwork() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10% 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#000a14] overflow-hidden py-32" dir="rtl">
      
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-20">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded #d4e616]/30 bg-[#d4e616]/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4e616] animate-pulse" />
            <span className="font-mono text-xs text-[#d4e616] tracking-[0.3em] uppercase">
              Global VIP Network
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
          >
            وجهة <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#d4e616] to-green-500">النخبة</span> من جميع أنحاء العالم
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xl text-zinc-400 font-light leading-relaxed mb-10 max-w-lg"
          >
            نوفر خدمات كونسيرج طبية متكاملة &quot;من المطار إلى المطار&quot; لمرضانا الدوليين. خصوصية تامة، طيران خاص، وأجنحة إقامة فاخرة لضمان تفرغكم التام لرحلة العلاج.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {[
              "طيران خاص واستقبال VIP في المطار",
              "بروتوكولات سرية تامة للشخصيات العامة",
              "أجنحة تعافي بمواصفات 5 نجوم",
              "متابعة دولية عن بعد عبر منصة مؤمنة"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-sm #d4e616]/50 bg-[#d4e616]/10 flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-[#d4e616]" />
                </div>
                <span className="text-white font-sans">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Globe / Network Side */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center">
          
          {/* Central Globe Representation */}
          <motion.div 
            style={{ y: y1 }}
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full  bg-[radial-gradient(ellipse_at_center,rgba(0,10,20,0.8)_0%,rgba(0,0,0,0.8)_100%)] shadow-[0_0_80px_rgba(212,230,22,0.1)] flex items-center justify-center overflow-hidden"
          >
            {/* Latitude / Longitude lines */}
            <div className="absolute inset-0 rounded-full  scale-90" />
            <div className="absolute inset-0 rounded-full  scale-75" />
            <div className="absolute inset-0 rounded-full  scale-50" />
            <div className="absolute inset-0 rounded-full  w-[20%] mx-auto" />
            <div className="absolute inset-0 rounded-full  h-[20%] my-auto" />
            
            {/* The Destination Node (Yemen / Clinic Location) */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 z-30">
               <div className="absolute inset-0 bg-[#d4e616] rounded-full animate-ping opacity-75" />
               <div className="relative w-full h-full bg-[#d4e616] rounded-full shadow-[0_0_20px_rgba(212,230,22,1)]" />
               
               {/* Label */}
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-mono text-[10px] text-[#d4e616] whitespace-nowrap bg-black/50 px-2 py-1 rounded #d4e616]/30 backdrop-blur-sm">
                 DESTINATION_LOCKED
               </div>
            </div>

            {/* Flight Paths / Arcs */}
            {isInView && (
              <svg className="absolute inset-0 w-full h-full z-20" viewBox="0 0 100 100">
                {/* Arc 1 */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  d="M10,20 Q50,-10 50,50" 
                  fill="none" 
                  stroke="#d4e616" 
                  strokeWidth="0.5" 
                  strokeDasharray="2,2"
                />
                {/* Arc 2 */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                  d="M90,30 Q80,10 50,50" 
                  fill="none" 
                  stroke="#d4e616" 
                  strokeWidth="0.5" 
                  strokeDasharray="2,2"
                />
                {/* Arc 3 */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 1.1 }}
                  d="M20,80 Q10,50 50,50" 
                  fill="none" 
                  stroke="#d4e616" 
                  strokeWidth="0.5" 
                  strokeDasharray="2,2"
                />
                {/* Arc 4 */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 1.4 }}
                  d="M80,90 Q90,60 50,50" 
                  fill="none" 
                  stroke="#d4e616" 
                  strokeWidth="0.5" 
                  strokeDasharray="2,2"
                />
              </svg>
            )}

            {/* Glowing Map overlay effect */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain filter invert" />
            
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div style={{ y: y2 }} className="absolute -right-4 md:-right-12 top-1/4 bg-[#001020]/80 backdrop-blur-md  p-4 rounded-xl shadow-2xl z-30">
            <span className="font-mono text-xs text-zinc-500 mb-1 block">INBOUND_FLIGHT</span>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold font-mono">LHR</span>
              <div className="w-8 h-[1px] bg-white/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#d4e616] rotate-45" />
              </div>
              <span className="text-[#d4e616] font-bold font-mono">SAH</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}


