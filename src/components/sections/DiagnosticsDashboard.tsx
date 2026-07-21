"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// A single JARVIS-style glowing dial
function StatDial({ 
  value, 
  label, 
  sublabel, 
  delay = 0 
}: { 
  value: number; 
  label: string; 
  sublabel: string; 
  delay?: number 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Animate the number counting up
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let animationFrameId: number;
    let startTime: number | null = null;
    
    // Sophisticated Timeline Configuration
    const playDuration = 2000;    // Play forward
    const holdPlayDuration = 3500; // Hold at max value
    const reverseDuration = 1200;  // Reverse backward
    const holdReverseDuration = 800; // Hold at zero
    const totalDuration = playDuration + holdPlayDuration + reverseDuration + holdReverseDuration;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const cycleTime = elapsed % totalDuration;
      
      let nextValue = 0;
      
      if (cycleTime < playDuration) {
        // Phase 1: Play forward (easeOutExpo - starts fast, slows down)
        const progress = cycleTime / playDuration;
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        nextValue = value * easeProgress;
      } else if (cycleTime < playDuration + holdPlayDuration) {
        // Phase 2: Hold at maximum
        nextValue = value;
      } else if (cycleTime < playDuration + holdPlayDuration + reverseDuration) {
        // Phase 3: Reverse (starts slow, then drops rapidly)
        const reverseProgress = (cycleTime - playDuration - holdPlayDuration) / reverseDuration;
        // 1 - x^4 creates a curve that stays high initially, then drops dramatically at the end
        nextValue = value * (1 - Math.pow(reverseProgress, 4)); 
      } else {
        // Phase 4: Hold at zero
        nextValue = 0;
      }
      
      setCurrentValue(nextValue);
      animationFrameId = window.requestAnimationFrame(step);
    };
    
    // Initial delay before starting the timeline
    const timer = setTimeout(() => {
      animationFrameId = window.requestAnimationFrame(step);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timer);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, delay]);

  const circleLength = 283; // 2 * pi * r (r=45)
  const strokeOffset = circleLength - (circleLength * currentValue) / 100;
  
  // Calculate a synced rotation for the inner graphics (0 to 180 degrees)
  const syncRotation = (currentValue / value) * 180;

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {/* The Holographic Ring */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 flex items-center justify-center">
        {/* Background track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          <circle 
            cx="50%" cy="50%" r="45%" 
            fill="none" 
            stroke="rgba(34,211,238,0.1)" 
            strokeWidth="2" 
          />
          <circle 
            cx="50%" cy="50%" r="45%" 
            fill="none" 
            stroke="rgba(34,211,238,0.2)" 
            strokeWidth="1" 
            strokeDasharray="4 8" 
          />
        </svg>
        
        {/* Animated value track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
          <motion.circle 
            cx="50%" cy="50%" r="45%" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            className="text-blue-400"
            strokeDasharray={circleLength}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Inner grid/radar details - Synced to the Timeline! */}
        <div 
          className="absolute inset-4 rounded-full  border-dashed opacity-50"
          style={{ transform: `rotate(${syncRotation}deg)` }}
        />
        <div 
          className="absolute inset-8 rounded-full border-t border-b border-blue-500/30 opacity-50"
          style={{ transform: `rotate(${-syncRotation * 1.5}deg)` }}
        />

        {/* Number Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-black text-[var(--text-primary)] dark:drop-shadow-[0_0_15px_var(--text-primary)] tabular-nums">
            {currentValue.toFixed(value % 1 !== 0 ? 1 : 0)}<span className="text-[0.5em] text-blue-400 ml-1">%</span>
          </span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-blue-500/80 mt-1">
            {sublabel}
          </span>
        </div>
      </div>

      {/* Label under the ring */}
      <h3 className="mt-4 md:mt-6 font-sans text-base md:text-lg lg:text-xl font-bold text-zinc-200 text-center tracking-wide" dir="rtl">
        {label}
      </h3>
    </motion.div>
  );
}

export function DiagnosticsDashboard() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const yBg = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const opacityGrid = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-full min-h-0 py-4 md:py-8 overflow-hidden bg-transparent flex items-center justify-center"
    >
      {/* Tactical Grid Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: yBg, opacity: opacityGrid }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_80%)]" />
      </motion.div>

      {/* HUD Scanline */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-blue-500/20 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-[scanline_8s_linear_infinite]" />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-8 lg:px-12 w-full flex flex-col justify-center h-full">
        <div className="flex flex-col items-center mb-6 md:mb-10 lg:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-black text-[var(--text-primary)] text-center tracking-tighter"
            dir="rtl"
          >
            نتائج <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">تتحدث عن نفسها</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 md:mt-6 font-sans text-[var(--text-tertiary)] text-[clamp(1rem,2vw,1.25rem)] max-w-2xl text-center leading-[1.6] md:leading-[1.8] font-light"
            dir="rtl"
          >
            في قلب مختبراتنا، تتحول البيانات إلى حياة. تضمن تقنياتنا الدقيقة نسب نجاح استثنائية، مما يجعل حلم الأمومة حقيقة ملموسة بإذن الله.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <StatDial 
            value={99.9} 
            label="دقة الفحص الجيني" 
            sublabel="GENETIC.SCREEN.ACC" 
            delay={0.2} 
          />
          <StatDial 
            value={85} 
            label="معدل نجاح الحقن المجهري" 
            sublabel="ICSI.SUCCESS.RT" 
            delay={0.4} 
          />
          <StatDial 
            value={92} 
            label="نسبة بقاء الأجنة (تجميد)" 
            sublabel="CRYO.VIABILITY.IDX" 
            delay={0.6} 
          />
        </div>

        {/* Decorative corner brackets for the section */}
        <div className="absolute top-4 md:top-8 left-4 md:left-6 w-6 md:w-8 h-6 md:h-8 border-t border-l border-blue-500/30" />
        <div className="absolute top-4 md:top-8 right-4 md:right-6 w-6 md:w-8 h-6 md:h-8 border-t border-r border-blue-500/30" />
        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-6 w-6 md:w-8 h-6 md:h-8 border-b border-l border-blue-500/30" />
        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-6 w-6 md:w-8 h-6 md:h-8 border-b border-r border-blue-500/30" />
      </div>
    </section>
  );
}



