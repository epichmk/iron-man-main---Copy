"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

function BlueprintLine({ delay = 0, horizontal = true, pos = "top-0", length = "w-full" }) {
  return (
    <motion.div 
      initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
      whileInView={{ scaleX: horizontal ? 1 : 0, scaleY: horizontal ? 0 : 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: "circOut" }}
      className={`absolute ${pos} ${length} ${horizontal ? 'h-[1px]' : 'w-[1px]'} bg-blue-500/30 origin-left pointer-events-none`}
    />
  );
}

function SecurityBadge({ text, code }: { text: string; code: string }) {
  return (
    <div className="inline-flex items-center  bg-[var(--background)]/60 backdrop-blur-md rounded-lg overflow-hidden shadow-[0_0_15px_var(--shadow-color)]">
      <div className="px-3 py-2 bg-blue-500/10 border-r border-blue-500/20">
        <span className="font-mono text-xs text-blue-400 tracking-widest">{code}</span>
      </div>
      <div className="px-4 py-2">
        <span className="font-sans font-bold text-sm text-zinc-200">{text}</span>
      </div>
    </div>
  );
}

export function TheCoreFacility() {
  const containerRef = useRef<HTMLElement>(null);
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 bg-[var(--page-bg)] overflow-hidden"
    >
      {/* Schematic Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
        {/* Radar sweeping circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw]  rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw]  rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw]  rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
      </div>

      {/* Crosshairs & Lines */}
      <BlueprintLine delay={0.2} pos="top-[10%]" />
      <BlueprintLine delay={0.4} pos="bottom-[10%]" />
      <BlueprintLine delay={0.3} horizontal={false} pos="left-[10%]" length="h-full" />
      <BlueprintLine delay={0.5} horizontal={false} pos="right-[10%]" length="h-full" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 min-h-[70vh]">
        
        {/* Schematic Graphic Side */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
          >
            {/* Holographic Core Graphic */}
            <div className="absolute inset-0 border-2 border-blue-500/40 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4  rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Central Hexagon */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
              <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" />
            </svg>
            
            {/* Pulsing Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-400 rounded-full shadow-[0_0_40px_rgba(34,211,238,1)] animate-pulse" />
            
            {/* Tech callouts */}
            <div className="absolute top-[15%] right-[-10%] flex items-center gap-2">
              <div className="h-px w-16 bg-blue-500/50" />
              <span className="font-mono text-[9px] text-blue-400">CRYO-VAULT_99%</span>
            </div>
            <div className="absolute bottom-[20%] left-[-15%] flex items-center gap-2 flex-row-reverse">
              <div className="h-px w-20 bg-blue-500/50" />
              <span className="font-mono text-[9px] text-blue-400">HEPA_ISO_5</span>
            </div>
          </motion.div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col items-start" dir="rtl">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded  bg-red-500/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-red-400 tracking-[0.2em] uppercase">
              Restricted Access Level 5
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tighter mb-6"
          >
            النواة <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-blue-500">المركزية</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-lg md:text-xl text-[var(--text-tertiary)] leading-relaxed font-light mb-10 max-w-lg"
          >
            بيئة محكمة الإغلاق مصممة هندسياً لمنع أي تلوث. تقنيات الغرف النظيفة (ISO 5) تتكامل مع ذكاء اصطناعي يراقب الأجنة على مدار الساعة دون أدنى تدخل بشري.
          </motion.p>

          {/* Security Badges Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <SecurityBadge code="SEC.01" text="حواضن EmbryoScope الذكية" />
            <SecurityBadge code="SEC.02" text="أنظمة HEPA فائقة النقاء" />
            <SecurityBadge code="SEC.03" text="مخازن تبريد نيتروجينية مؤمنة" />
            <SecurityBadge code="SEC.04" text="مراقبة حيوية 24/7" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}


