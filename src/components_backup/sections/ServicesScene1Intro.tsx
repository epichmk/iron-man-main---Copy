"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HudFrame } from "@/components/ui/HudFrame";
import servicesData from "@/lib/servicesData.json";

export function ServicesScene1Intro() {
  const service = servicesData.find(s => s.id === 'ix73-icsi-imsi');

  return (
    <section className="relative w-full bg-[#000814] h-[100dvh]">
      <div className="sticky top-0 w-full min-h-[100dvh] flex flex-col md:flex-row items-center justify-center overflow-hidden py-24 md:py-0">
        {/* Background Video */}
      <video
        src="/services-section.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

      {/* HUD Elements */}
      <div className="pointer-events-none absolute left-6 top-24 text-accent/50 md:left-10 md:top-28 z-20">
        <HudFrame corner="tl" size={26} />
      </div>
      <div className="pointer-events-none absolute right-6 bottom-24 text-accent/50 md:right-10 md:bottom-28 z-20">
        <HudFrame corner="br" size={26} />
      </div>

      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
        {/* Right Content (Text) */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-start text-right"
          dir="rtl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1 }}
        >
          <span className="text-blue-400 text-sm font-sans font-bold tracking-[0.3em] uppercase block dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-4">
            أحدث التقنيات
          </span>
          <h2 className="font-heading text-5xl md:text-[7rem] leading-[1.1] font-black tracking-tight text-white mb-6">
            دقة.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 dark:drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">متناهية.</span>
          </h2>
          
          <div className="relative border-r-2 border-blue-500 pr-6 mb-8">
            <p className="font-sans text-zinc-300 text-lg md:text-xl leading-relaxed font-light dark:drop-shadow-[0_0_15px_rgba(0,0,0,1)] text-right">
              يُعد نظام <strong className="text-white font-semibold tracking-wide">Olympus IX73 ICSI & IMSI</strong><br className="hidden md:block" /> قمة تكنولوجيا الإنجاب.
            </p>
          </div>

          <Link
            href="/services/ix73-icsi-imsi"
            className="group/btn relative inline-flex items-center justify-between py-3 px-8 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500/15 via-blue-500/10 to-transparent border border-blue-500/30 text-accent hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] skew-x-12" />
            <span className="relative z-10 font-sans font-bold tracking-widest text-sm uppercase">اقرأ المزيد</span>
            <span className="relative z-10 transform transition-transform duration-300 group-hover/btn:-translate-x-2 font-mono mr-4">←</span>
          </Link>
        </motion.div>

        {/* Left Content (Image) */}
        <motion.div 
          className="w-full md:w-1/2 relative h-[40vh] md:h-[80vh] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image 
            src="/ix73_wide_expanded.png"
            alt="Olympus IX73"
            fill
            className="object-contain object-center drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
      </div>
    </section>
  );
}
