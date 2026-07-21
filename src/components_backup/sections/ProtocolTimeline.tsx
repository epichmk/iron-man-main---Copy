import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

const PHASES = [
  {
    id: "01",
    title: "التشخيص المبدئي والقياس عن بعد",
    subtitle: "Initial Diagnostics & Telemetry",
    desc: "مسح بيومتري شامل لتحديد المؤشرات الحيوية للزوجين، وتحليل جيني دقيق لبناء خطة العلاج المخصصة.",
  },
  {
    id: "02",
    title: "الضبط الهرموني الدقيق",
    subtitle: "Hormonal Calibration",
    desc: "تحفيز مبيض مدروس باستخدام بروتوكولات دوائية نانوية لضمان إنتاج بويضات عالية الجودة دون فرط التحفيز.",
  },
  {
    id: "03",
    title: "استخلاص البويضات والتلقيح",
    subtitle: "Extraction & ICSI",
    desc: "سحب البويضات في بيئة معقمة كلياً، يليه التلقيح المجهري (ICSI) تحت تكبير فائق يعادل 7300 مرة (IMSI).",
  },
  {
    id: "04",
    title: "الحضانة والمراقبة الحيوية",
    subtitle: "Embryo Culture & Monitoring",
    desc: "مراقبة الأجنة بالذكاء الاصطناعي (EmbryoScope) داخل حواضن تحاكي بدقة متناهية بيئة الرحم الطبيعية.",
  },
  {
    id: "05",
    title: "النقل الآمن للأجنة",
    subtitle: "Secure Embryo Transfer",
    desc: "نقل الجنين بدقة متناهية باستخدام موجات فوق صوتية متطورة، مع توفير بروتوكولات دعم لضمان الثبات.",
  }
];

function TimelineNode({ data, index }: { data: typeof PHASES[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-25% 0px -25% 0px" });
  
  const isEven = index % 2 === 0;

  // Masterpiece 3D Interactive Mouse Tracking
  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(150);

  // Map mouse position to subtle 3D rotation
  const rotateX = useTransform(mouseY, [0, 400], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 600], [-5, 5]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    // Reset to center smoothly
    mouseX.set(250);
    mouseY.set(150);
  }

  return (
    <div ref={ref} className={`relative flex items-center justify-between w-full mb-20 md:mb-40 ${isEven ? '' : 'flex-row-reverse'} [perspective:2000px]`}>
      
      {/* Node Dot (Masterpiece Rings) */}
      <div className="absolute right-[20px] md:right-1/2 translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -180 }}
          transition={{ duration: 1, ease: "backOut" }}
          className={`relative w-8 h-8 md:w-14 md:h-14 rounded-full border bg-[#00040a] flex items-center justify-center transition-all duration-1000
            ${isInView ? 'border-[#d4e616] shadow-[0_0_50px_rgba(212,230,22,0.4)] scale-110' : 'border-[#d4e616]/20'}`}
        >
          {/* Inner pulsating diamond */}
          <div className={`w-2 h-2 md:w-4 md:h-4 bg-[#d4e616] rotate-45 transition-all duration-1000 ${isInView ? 'shadow-[0_0_20px_#d4e616] scale-125' : 'opacity-30'}`} />
          
          {/* Double Expanding Radar Rings */}
          {isInView && (
            <>
              <motion.div 
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-[#d4e616]/80"
              />
              <motion.div 
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                className="absolute inset-0 rounded-full #d4e616]/40"
              />
            </>
          )}
        </motion.div>
      </div>

      {/* The Masterpiece 3D Glass Card */}
      <div className={`w-full md:w-[45%] flex flex-col relative z-30 pr-16 md:pr-0`}>
        <motion.div 
          initial={{ y: 80, opacity: 0, rotateX: 15 }}
          animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : { y: 80, opacity: 0, rotateX: 15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative overflow-visible rounded-3xl p-8 md:p-14 bg-gradient-to-br from-[#000814]/80 to-[#00040a]/90 backdrop-blur-3xl  transition-colors duration-700 #d4e616]/40 hover:bg-[#000814]/90 shadow-2xl"
          dir="rtl"
        >
          {/* Mouse Spotlight Mask */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  800px circle at ${mouseX}px ${mouseY}px,
                  rgba(212, 230, 22, 0.15),
                  transparent 40%
                )
              `,
            }}
          />

          {/* Liquid Number Reveal (Ghost -> Fill) */}
          {/* 1. Base Outline */}
          <div 
            className="absolute -top-12 -right-8 text-[12rem] md:text-[20rem] font-black leading-none pointer-events-none select-none transition-transform duration-1000 group-hover:scale-[1.15] group-hover:-translate-x-6 z-0"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.03)", color: "transparent" }}
          >
            {data.id}
          </div>
          {/* 2. Hover Gradient Fill */}
          <div 
            className="absolute -top-12 -right-8 text-[12rem] md:text-[20rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#d4e616]/20 to-transparent pointer-events-none select-none opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:scale-[1.15] group-hover:-translate-x-6 z-0"
          >
            {data.id}
          </div>

          {/* Floating 3D Content Container */}
          <div 
            className="relative z-20 transition-transform duration-700 ease-out group-hover:[transform:translateZ(60px)]"
          >
            {/* Top accent line - elongates and glows on hover */}
            <div className="w-16 h-[3px] bg-[#d4e616] mb-10 transition-all duration-700 ease-out group-hover:w-48 group-hover:shadow-[0_0_20px_rgba(212,230,22,0.8)]" />

            <h3 className="font-sans text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight dark:drop-shadow-2xl">
              {data.title}
            </h3>
            <p className="font-mono text-sm md:text-base text-[#d4e616] mb-8 uppercase tracking-[0.3em] font-bold dark:drop-shadow-md">
              {data.subtitle}
            </p>
            <p className="font-sans text-lg md:text-xl text-zinc-300 leading-[1.9] font-light max-w-lg">
              {data.desc}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Empty space for the alternating layout */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}

export function ProtocolTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const scaleY = useTransform(smoothProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-[#00040a] overflow-hidden">
      
      {/* Ambient Masterpiece Lighting */}
      <div className="absolute top-1/4 left-0 w-[50rem] h-[50rem] bg-[#d4e616]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-0 w-[60rem] h-[60rem] bg-[#0066FF]/5 rounded-full blur-[180px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-32 md:mb-48 text-center" dir="rtl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full #d4e616]/40 bg-[#d4e616]/10 mb-8 backdrop-blur-md shadow-[0_0_40px_rgba(212,230,22,0.15)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4e616] animate-pulse" />
            <span className="font-mono text-xs md:text-sm text-[#d4e616] tracking-[0.4em] uppercase font-bold">
              TREATMENT PATHWAY
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="font-heading text-[clamp(4rem,12vw,9rem)] font-black text-white tracking-tighter leading-none drop-shadow-2xl"
          >
            مراحل <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#d4e616] to-[#8a9609] relative">العلاج
              <div className="absolute -bottom-6 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#d4e616]/60 to-transparent blur-md" />
            </span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto" dir="rtl">
          
          {/* Center Line (Faint Background Track) */}
          <div className="absolute right-[20px] md:right-1/2 top-0 bottom-0 w-[1px] bg-white/5 translate-x-1/2" />
          
          {/* Animated Liquid Scroll Beam (Chartreuse) */}
          <motion.div 
            className="absolute right-[20px] md:right-1/2 top-0 bottom-0 w-[4px] translate-x-1/2 origin-top z-10"
            style={{ scaleY }}
          >
            {/* The line itself */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4e616]/90 to-[#d4e616] shadow-[0_0_30px_rgba(212,230,22,0.6)]" />
            
            {/* The glowing laser drop at the tip */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-40 bg-gradient-to-t from-[#d4e616] to-transparent rounded-full shadow-[0_0_80px_rgba(212,230,22,1)] blur-[2px]" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_30px_#fff]" />
          </motion.div>

          {/* Nodes */}
          <div className="relative pt-12 pb-24">
            {PHASES.map((phase, i) => (
              <TimelineNode key={phase.id} data={phase} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


