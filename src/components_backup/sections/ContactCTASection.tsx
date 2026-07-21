"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { MapPin, Phone, EnvelopeSimple, FacebookLogo, InstagramLogo, WhatsappLogo, ArrowUpLeft, Clock, Stethoscope, Headset } from "@phosphor-icons/react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -100, scale: 0.8, filter: "blur(20px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8, filter: "blur(30px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export function ContactCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000814] z-40" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full bg-[#000814] flex flex-col justify-center overflow-hidden" dir="rtl">
      
      {/* Cinematic Details */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute left-6 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24"
      >
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="h-px bg-accent/60" 
        />
        <span className="font-sans text-[12px] font-bold tracking-widest text-zinc-400" dir="rtl">
          بإذن الله
        </span>
      </motion.div>

      {/* Background Image - Full Color with Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute top-0 w-full h-[120%]">
          <Image 
            src="/cta-section-background.jpg" 
            alt="CTA Background" 
            fill 
            className="object-cover object-[20%_20%] opacity-100"
          />
        </motion.div>

        {/* Right-Side Dark Blue Shade Layer */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#000814] via-[#000814]/70 to-transparent pointer-events-none" />

        {/* Top Fader */}
        <div className="absolute inset-x-0 top-0 h-[30vh] bg-gradient-to-b from-[#000814] via-[#000814]/60 to-transparent pointer-events-none" />
        
        {/* Bottom Fader */}
        <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-[#000814] via-[#000814]/60 to-transparent pointer-events-none" />
      </div>



      {/* Master Container: Two-Column Layout on the Right */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-16 lg:right-32 z-40 flex flex-col md:flex-row items-center md:items-stretch gap-2 lg:gap-4" dir="rtl"
      >
         
         {/* RIGHT COLUMN: Ultra Minimal Icon List & Socials */}
         <div className="flex flex-col justify-between h-full gap-3 w-full max-w-[300px] shrink-0 py-2">
            
            <motion.a variants={itemVariants} href={getWhatsAppLink("مرحباً، أود حجز موعد.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
               <div className="text-white/60 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <WhatsappLogo size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-white/50 text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-white/70">واتساب (للحجز)</span>
                  <span className="text-white font-sans text-lg tracking-wide group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 781 878 443</span>
               </div>
            </motion.a>

            <motion.a variants={itemVariants} href="tel:+9671513729" className="flex items-center justify-start gap-5 group">
               <div className="text-white/60 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Phone size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-white/50 text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-white/70">الاستقبال</span>
                  <span className="text-white font-sans text-lg tracking-wide group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 1 513 729</span>
               </div>
            </motion.a>

            <motion.a variants={itemVariants} href="tel:+967775950500" className="flex items-center justify-start gap-5 group">
               <div className="text-white/60 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Stethoscope size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-white/50 text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-white/70">الاستشارات الطبية</span>
                  <span className="text-white font-sans text-lg tracking-wide group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 775 950 500</span>
               </div>
            </motion.a>

            <motion.a variants={itemVariants} href="mailto:ivfnmc@gmail.com" className="flex items-center justify-start gap-5 group">
               <div className="text-white/60 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <EnvelopeSimple size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-white/50 text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-white/70">البريد الإلكتروني</span>
                  <span className="text-white font-sans text-base tracking-wide group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">ivfnmc@gmail.com</span>
               </div>
            </motion.a>

            <motion.a variants={itemVariants} href="https://maps.app.goo.gl/n8KvHLgkjQbbiBpz8" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
               <div className="text-white/60 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <MapPin size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-white font-medium text-sm group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">صنعاء، جولة فلسطين</span>
               </div>
            </motion.a>

            <motion.div variants={itemVariants} className="flex items-center justify-start gap-5 group cursor-default">
               <div className="text-white/60 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Clock size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-white font-medium text-sm mb-0.5 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">ساعات العمل</span>
                  <span className="text-white/50 text-xs font-medium transition-colors duration-500 group-hover:text-white/70">السبت - الخميس | 9:00 ص - 3:00 م</span>
               </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-start gap-5 group cursor-default">
               <div className="text-white/60 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Headset size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-white font-medium text-sm mb-0.5 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">أوقات الاتصال</span>
                  <span className="text-white/50 text-xs font-medium transition-colors duration-500 group-hover:text-white/70">السبت - الخميس | 9:00 ص - 9:00 م</span>
               </div>
            </motion.div>

            {/* Cohesive Elegant Socials */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-4 mt-1 border-t border-white/10 w-full">
               <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                  <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                     <Image src="/instagram.png" alt="Instagram" fill className="object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col items-start text-right">
                     <span className="text-white font-medium text-sm mb-0.5 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                        انستجرام
                        <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-[#d4e616] opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                     </span>
                     <span className="text-white/50 text-xs font-medium transition-colors duration-500 group-hover:text-white/70" dir="ltr">@dr.najat_almalass_center</span>
                  </div>
               </a>

               <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                  <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                     <Image src="/facebook.png" alt="Facebook" fill className="object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col items-start text-right">
                     <span className="text-white font-medium text-sm mb-0.5 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                        فيسبوك
                        <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-[#d4e616] opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                     </span>
                     <span className="text-white/50 text-xs font-medium transition-colors duration-500 group-hover:text-white/70" dir="ltr">/najatalmalascenter</span>
                  </div>
               </a>

               <a href={getWhatsAppLink("مرحباً، أود التواصل معكم.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                  <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                     <Image src="/whatsapp.png" alt="WhatsApp" fill className="object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col items-start text-right">
                     <span className="text-white font-medium text-sm mb-0.5 group-hover:text-[#d4e616] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                        واتساب
                        <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-[#d4e616] opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                     </span>
                     <span className="text-white/50 text-xs font-medium transition-colors duration-500 group-hover:text-white/70" dir="ltr">+967 781 878 443</span>
                  </div>
               </a>
            </motion.div>
         </div>

         {/* LEFT COLUMN: CTA Block */}
         <div className="flex flex-col justify-center gap-6">
            
            {/* MIDDLE: Title & Description */}
            <motion.div variants={textVariants} className="flex flex-col mb-2">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: 40 }}
                 viewport={{ once: false }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="h-0.5 bg-[#d4e616] mb-4 rounded-full opacity-80" 
               />
               <h2 className="text-4xl font-bold text-white leading-tight mb-3 tracking-tight">
                  ابدأ رحلتك
               </h2>
               <span className="text-white/70 text-sm font-medium leading-relaxed max-w-[280px]">
                  الدعم الطبي جاهز للرد على استفساراتك الآن. الخطوة الأولى تبدأ هنا.
               </span>
            </motion.div>

         </div>

      </motion.div>
      </div>
    </section>
  );
}


