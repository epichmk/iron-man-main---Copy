"use client";

import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import servicesData from "@/lib/servicesData.json";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { motion, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { WhatsappLogo, FacebookLogo, InstagramLogo } from "@phosphor-icons/react";
import { PremiumFaqAccordion } from "@/components/sections/PremiumFaqAccordion";

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};



function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// FLIP CARD (Full Bleed Grid Item)
// ─────────────────────────────────────────────
function FlipCard({ service, fullHeight = false }: { service: typeof servicesData[0], fullHeight?: boolean }) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { margin: "-20%" });
  
  // Auto-unflip when scrolled out of view (specifically targeting small grid cards, though safe for all)
  useEffect(() => {
    if (!isInView && isFlipped) {
      setIsFlipped(false);
    }
  }, [isInView, isFlipped]);

  const isHeroWide = fullHeight || service.id === 'ix73-icsi-imsi';
  const aspectRatio = "w-full h-full";
  const imageSrc = service.id === 'ix73-icsi-imsi' ? "/ix73_wide_expanded.png" : service.image;
  const imageLightSrc = service.id === 'ix73-icsi-imsi' ? "/services/lightmode/ix73_wide_light.jpg" : `/services/lightmode/${service.id}_light.jpg`;

  // Ultra-Cinematic 3D Transform for Greatness
  const flipHoverClass = service.featured
    ? "group-hover:[transform:rotateY(180deg)_translateZ(120px)_scale(1.1)] z-10 group-hover:z-50"
    : "group-hover:[transform:rotateY(180deg)_translateZ(80px)_scale(1.15)] z-10 group-hover:z-[100]";

  const flipStateClass = isFlipped 
    ? (service.featured ? "[transform:rotateY(180deg)_translateZ(120px)_scale(1.1)] z-50" : "[transform:rotateY(180deg)_translateZ(80px)_scale(1.15)] z-[100]")
    : "";

  return (
    <div ref={cardRef} className={`group ${aspectRatio} relative cursor-pointer [perspective:3000px]`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`block w-full h-full relative transition-all duration-[1200ms] [transform-style:preserve-3d] ${flipHoverClass} ${flipStateClass} ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:shadow-[0_50px_100px_var(--shadow-color)]`}>

        {/* FRONT SIDE */}
        <div className={`w-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'} ${service.featured ? service.id === 'ix73-icsi-imsi' ? 'absolute inset-0 h-full bg-[var(--page-bg)] [transform-style:preserve-3d] shadow-[inset_0_0_100px_var(--shadow-color),0_30px_60px_var(--shadow-color)] border border-[var(--border-subtle)]' : 'relative h-auto bg-[var(--page-bg)] [transform-style:preserve-3d] shadow-[inset_0_0_100px_var(--shadow-color),0_30px_60px_var(--shadow-color)] border border-[var(--border-subtle)]' : 'relative h-auto bg-transparent overflow-hidden'}`}>
          
          {/* 3D Floating Image on Front */}
          <div className={`w-full ${service.featured ? service.id === 'ix73-icsi-imsi' ? 'h-full absolute inset-0 [transform:translateZ(30px)] transition-all duration-[1200ms] group-hover:[transform:translateZ(80px)_scale(1.05)]' : 'relative h-auto [transform:translateZ(30px)] transition-all duration-[1200ms] group-hover:[transform:translateZ(80px)_scale(1.05)]' : 'relative h-auto'}`}>
            {service.featured ? (
                service.id === 'ix73-icsi-imsi' ? (
                  <>
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      quality={100}
                      unoptimized
                      priority
                      className="hide-in-light transition-transform duration-[1500ms] object-cover"
                    />
                    <Image
                      src={imageLightSrc}
                      alt={service.title}
                      fill
                      quality={100}
                      unoptimized
                      priority
                      className="hide-in-dark transition-transform duration-[1500ms] object-cover"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={imageSrc}
                      alt={service.title}
                      className="hide-in-light w-full h-auto object-contain transition-transform duration-[1500ms]"
                    />
                    <img
                      src={imageLightSrc}
                      alt={service.title}
                      className="hide-in-dark w-full h-auto object-contain transition-transform duration-[1500ms]"
                    />
                  </>
                )
              ) : (
              <>
                <img
                  src={imageSrc}
                  alt={service.title}
                  className="hide-in-light w-full h-auto object-contain transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <img
                  src={imageLightSrc}
                  alt={service.title}
                  className="hide-in-dark w-full h-auto object-contain transition-transform duration-[1500ms] group-hover:scale-110"
                />
              </>
            )}
          </div>
            <div className="absolute inset-0 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />

          <div className={`absolute inset-0 pointer-events-none ${service.featured ? '[transform:translateZ(50px)]' : ''}`}>
            {service.featured && (
              <div className={`absolute top-4 left-1/2 -translate-x-1/2 md:top-8 bg-accent/10 border border-[#d4e616]/30 backdrop-blur-md text-accent font-mono tracking-[0.2em] uppercase px-4 md:px-6 py-2 md:py-3 rounded-full shadow-[0_0_20px_rgba(212,230,22,0.2)] text-xs md:text-sm font-bold z-20 whitespace-nowrap`}>
                {isHeroWide ? "جديد كلياً - الأحدث لدينا" : "رائج"}
              </div>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div className={`absolute inset-0 w-full h-full bg-[var(--page-bg)] flex ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'} ${isHeroWide ? 'flex-col md:flex-row' : 'flex-col justify-center items-center text-center'} p-6 md:p-8 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] ${service.featured ? '[transform-style:preserve-3d]' : 'overflow-hidden'}`}>

          {/* Background Layer (Handles overflow and gradients without breaking 3D) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {isHeroWide ? (
              <>
                <div className="absolute inset-0 w-full h-full opacity-50">
                  <Image src={imageSrc} alt={service.title} fill className="hide-in-light object-cover animate-[cinematic-pan-zoom_7s_ease-in-out_infinite_alternate]" />
                  <Image src={imageLightSrc} alt={service.title} fill className="hide-in-dark object-cover animate-[cinematic-pan-zoom_7s_ease-in-out_infinite_alternate]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--page-bg)] via-[var(--page-bg)]/90 to-transparent z-10" />
              </>
            ) : (
              <>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,102,255,0.08)_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(212,230,22,0.05)_0%,transparent_60%)] pointer-events-none" />
              </>
            )}
          </div>

          {/* 3D Foreground Content */}
          {isHeroWide ? (
            <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center [transform-style:preserve-3d]">
              {/* Right Side: 3D Floating Foreground Image (Hidden on mobile to save space) */}
              <div className="hidden md:flex w-1/2 relative h-full items-center justify-center p-4 [transform:translateZ(40px)] transition-all duration-[3000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:[transform:translateZ(60px)_scale(1.05)_translateY(-10px)_translateX(-120px)]">
                <Image src={imageSrc} alt={service.title} fill className="hide-in-light object-contain p-4 drop-shadow-[0_20px_30px_var(--shadow-color)]" />
                <Image src={imageLightSrc} alt={service.title} fill className="hide-in-dark object-contain p-4 drop-shadow-[0_20px_30px_var(--shadow-color)]" />
              </div>

              {/* Left Side: 3D Holographic Text (Now with Staggered Entrance) */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-right px-4 md:pr-10 md:pl-16 h-full [transform:translateZ(50px)] transition-transform duration-[3000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:[transform:translateZ(60px)] md:group-hover:[transform:translateZ(120px)_translateX(120px)]">
                <motion.h3 variants={fadeUp} className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] font-heading mb-4 md:mb-6 text-balance drop-shadow-[0_10px_20px_var(--shadow-color)] line-clamp-2 md:line-clamp-3">
                  {service.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="text-[var(--text-secondary)] font-light text-sm md:text-base leading-relaxed md:leading-loose mb-8 md:mb-10 text-justify [text-justify:kashida] line-clamp-4 md:line-clamp-4 drop-shadow-[0_10px_10px_var(--shadow-color)] w-full">
                  {service.description}
                </motion.p>
                <div className="mt-2 md:mt-0 z-50 pointer-events-auto" onClick={(e) => { e.stopPropagation(); window.location.href = `/services/${service.id}`; }}>
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-accent text-black hover:bg-white transition-all duration-300 px-5 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-widest shadow-[0_0_40px_rgba(212,230,22,0.3)] hover:scale-105 [transform:translateZ(20px)] cursor-pointer">
                      استكشف التفاصيل
                    </motion.div>
                </div>
              </motion.div>
            </div>
          ) : (
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className={`relative z-20 flex flex-col justify-center items-center w-full h-full px-4 md:px-8 ${service.featured ? '[transform-style:preserve-3d]' : ''}`}>
                <motion.h3 variants={fadeUp} className={`text-lg md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] font-heading mb-2 md:mb-5 text-balance z-10 ${service.featured ? '[transform:translateZ(80px)] transition-transform duration-[1200ms] group-hover:[transform:translateZ(120px)] drop-shadow-[0_10px_15px_var(--shadow-color)]' : ''}`}>
                  {service.title}
                </motion.h3>
                <motion.p variants={fadeUp} className={`text-[var(--text-tertiary)] font-light text-xs md:text-base line-clamp-3 md:line-clamp-5 leading-relaxed md:leading-loose mb-4 md:mb-8 text-justify [text-justify:kashida] w-full z-10 ${service.featured ? '[transform:translateZ(40px)] transition-transform duration-[1200ms] group-hover:[transform:translateZ(70px)] drop-shadow-[0_5px_10px_var(--shadow-color)]' : ''}`}>
                  {service.description}
                </motion.p>
                <div className="z-50 pointer-events-auto mt-2 md:mt-4" onClick={(e) => { e.stopPropagation(); window.location.href = `/services/${service.id}`; }}>
                    <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 bg-transparent hover:bg-white text-[var(--text-primary)] hover:text-black transition-colors px-5 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-widest border-2 border-[var(--border-medium)] cursor-pointer ${service.featured ? '[transform:translateZ(100px)] transition-transform duration-[1200ms] group-hover:[transform:translateZ(150px)] shadow-2xl hover:scale-105' : ''}`}>
                      التفاصيل+
                    </motion.div>
                </div>
              </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SERVICES GRID & SECTIONS
// ─────────────────────────────────────────────
function ServicesGrid({ services, scrollYProgress }: { services: typeof servicesData, scrollYProgress: any }) {
  const featuredServices = services.filter(s => s.id === 'ix73-icsi-imsi');
  const normalServices = services.filter(s => s.id !== 'ix73-icsi-imsi');

  return (
    <>


      {/* ═══════════════════════════════════════════
          FEATURED SERVICES AS DEDICATED HERO BANNERS
          ═══════════════════════════════════════════ */}
      {featuredServices.map((service) => (
        <section
          key={service.id}
          className={`relative w-full ${service.id === 'ix73-icsi-imsi' ? 'h-[60vh] md:h-[80vh] lg:h-screen' : 'h-auto'} bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-0`}
        >
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.8, rotateX: 30 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-none overflow-hidden shadow-[0_50px_150px_var(--shadow-color)] [perspective:2000px]"
          >
            <FlipCard service={service} fullHeight />
          </motion.div>
        </section>
      ))}

      {/* ═══════════════════════════════════════════
          NORMAL SERVICES GRID (Window Fit)
          ═══════════════════════════════════════════ */}
      {normalServices.length > 0 && (
        <section className="relative w-full min-h-screen bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-0">
          <div className="relative w-full overflow-hidden bg-transparent flex justify-center items-center">
            
            

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 w-full h-auto">
              {normalServices.map((service, idx) => {
                const isLastItemAndOdd = idx === normalServices.length - 1 && normalServices.length % 2 !== 0;
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 100, scale: 0.95, rotateX: 15 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (idx % 4) * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-full h-auto relative overflow-hidden [perspective:2000px] ${
                      isLastItemAndOdd ? 'col-span-2 lg:col-span-1 w-1/2 lg:w-full mx-auto lg:mx-0' : ''
                    }`}
                  >
                    <FlipCard service={service} />
                  </motion.div>
                );
              })}
              
              {/* Extra Cell for CTA and Socials */}
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="col-span-2 lg:col-span-1 w-full h-full min-h-[300px] relative overflow-hidden flex flex-col items-center justify-center bg-[var(--page-bg)]/80 backdrop-blur-md p-8 border-[0.5px] border-[var(--border-subtle)] group"
              >
                {/* Background effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05)_0%,transparent_70%)] pointer-events-none" />
                
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] font-heading mb-4 text-center dark:drop-shadow-[0_10px_20px_var(--shadow-color)] z-10 relative">
                  لم تجدوا الخدمة التي تبحثون عنها؟
                </h3>
                <p className="text-[var(--text-secondary)] font-light text-sm md:text-base text-justify [text-justify:kashida] leading-relaxed mb-10 max-w-[90%] mx-auto z-10 relative">
                  يرجى التواصل معنا لاستشارة طبية متخصصة ومناقشة خياراتكم العلاجية.
                </p>

                <div className="z-10 relative mb-10 w-full max-w-xs scale-[0.85]">
                  <a
                    href="https://wa.me/967781878443?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%A1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-full p-[2px] w-full block"
                  >
                    {/* Animated Border Gradient */}
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d4e616_0%,transparent_50%,#d4e616_100%)]" />
                    
                    {/* Button Core */}
                    <div className="relative flex items-center justify-center gap-4 bg-[var(--page-bg)] px-10 py-5 rounded-full w-full transition-all duration-500">
                      <span className="text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-accent transition-colors whitespace-nowrap">
                        تواصل عبر الواتساب
                      </span>
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(212,230,22,0.4)] group-hover:scale-110 transition-transform duration-500 shrink-0">
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Glowing Animated Social Icons (Masterpiece Style) */}
                <div className="flex items-center justify-center gap-6 relative z-10 w-full" dir="ltr">
                  {/* WhatsApp */}
                  <a href="https://wa.me/967781878443" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden rounded-full p-[2px] hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#25D366_0%,transparent_50%,#25D366_100%)]" />
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--page-bg)] z-10">
                      <WhatsappLogo size={20} weight="fill" className="text-[#25D366]" />
                    </div>
                  </a>

                  {/* Facebook */}
                  <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden rounded-full p-[2px] hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(24,119,242,0.3)]">
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1877F2_0%,transparent_50%,#1877F2_100%)]" />
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--page-bg)] z-10">
                      <FacebookLogo size={20} weight="fill" className="text-[#1877F2]" />
                    </div>
                  </a>

                  {/* Instagram */}
                  <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden rounded-full p-[2px] hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(225,48,108,0.3)]">
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E1306C_0%,transparent_50%,#E1306C_100%)]" />
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--page-bg)] z-10">
                      <InstagramLogo size={20} weight="fill" className="text-[#E1306C]" />
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>

          </div>
        </section>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Global Scroll Progress (0 to 1) mapped from the top to bottom of the page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Global Parallax Ambient Drifts - Massive Shifts
  const yBg1 = useTransform(smoothScrollY, [0, 1], ["0%", "200%"]);
  const yBg2 = useTransform(smoothScrollY, [0, 1], ["0%", "-200%"]);

  // Hero Section Scroll Fades
  const heroY = useTransform(smoothScrollY, [0, 0.15], ["0%", "-300%"]);
  const heroOpacity = useTransform(smoothScrollY, [0, 0.15], [1, 0]);
  
  // EXTREME Deep Parallax for Hero Elements (Explodes apart)
  const ghostTextY = useTransform(smoothScrollY, [0, 1], ["0%", "50%"]);
  const logoY = useTransform(smoothScrollY, [0, 0.2], ["0%", "-500%"]);
  const titleY = useTransform(smoothScrollY, [0, 0.2], ["0%", "200%"]);
  const subtitleY = useTransform(smoothScrollY, [0, 0.2], ["0%", "500%"]);
  const videoY = useTransform(smoothScrollY, [0, 1], ["0%", "40%"]);

  // EXTREME CTA Section Parallax
  const ctaScale = useTransform(smoothScrollY, [0.7, 0.95], [0.2, 1]); // starts tiny, explodes to full
  const ctaTextY = useTransform(smoothScrollY, [0.75, 0.95], ["200px", "0px"]);

  return (
    <div ref={containerRef} className="bg-transparent text-[var(--text-primary)] selection:bg-accent/30 selection:text-[var(--text-primary)] flex flex-col font-sans overflow-x-hidden min-h-screen" dir="rtl">

      {/* Custom Page Animations */}
      <style>{`
        @keyframes cinematic-pan-zoom {
          0% { transform: scale(1.0) translateX(-5%); }
          100% { transform: scale(1.3) translateX(5%); }
        }
      `}</style>

      {/* Backgrounds removed */}


      <main className="relative z-10 w-full">

        {/* ═══════════════════════════════════════════
            SECTION 1: CINEMATIC VIDEO HERO
            ═══════════════════════════════════════════ */}
        <section className="relative z-10 w-full h-screen  flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <motion.div style={{ y: videoY }} className="absolute inset-[-20%] z-0 will-change-transform">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/footer-baby.original.mp4" />
          </motion.div>

          {/* Theme-aware fade overlay for text readability */}
          <div className="hide-in-light absolute inset-0 z-[1] bg-gradient-to-t from-[#000814] via-[#000814]/70 to-transparent pointer-events-none" />
          <div className="hide-in-dark absolute inset-0 z-[1] bg-gradient-to-t from-[#ffffff] via-[#ffffff]/70 to-transparent pointer-events-none" />

          {/* Ghost Typography */}
          <motion.div style={{ y: ghostTextY }} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] will-change-transform">
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(0px)", scale: 0.8 }} 
              animate={{ opacity: 0.03, filter: "blur(0px)", scale: 1 }} 
              transition={{ duration: 3, ease: "easeOut" }} 
              className="text-[8rem] md:text-[14rem] lg:text-[20rem] font-bold text-[var(--text-primary)] whitespace-nowrap tracking-tighter"
            >
              SERVICES
            </motion.h1>
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 text-center px-6 max-w-[1000px] will-change-transform"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              {/* Logo */}
              <motion.div style={{ y: logoY }} className="w-20 h-20 mb-8 relative will-change-transform">
                <Image src="/nmc-logo.png" alt="NMC Logo" fill className="object-contain logo-shadow" />
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-16 h-[1px] bg-gradient-to-l from-[#d4e616] to-transparent" />
                <span className="text-accent font-mono tracking-[0.3em] uppercase text-[10px] font-bold">NMC Medical Services</span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#d4e616] to-transparent" />
              </motion.div>

              <motion.h2 style={{ y: titleY }} className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--text-primary)] mb-6 leading-tight text-balance will-change-transform">
                الخدمات الطبية
              </motion.h2>

              <motion.p style={{ y: subtitleY }} className="text-lg md:text-2xl text-[var(--text-secondary)] font-light mb-6 will-change-transform">
                رعاية متكاملة تبدأ من التشخيص الدقيق وحتى تحقيق الحلم
              </motion.p>

            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 1 }} className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted-light)]">استكشف الخدمات</motion.span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-4 h-7 rounded-full border border-zinc-600 flex items-start justify-center p-1">
              <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1.5 bg-accent rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: SERVICES GALLERY (Grid)
            ═══════════════════════════════════════════ */}
        <ServicesGrid services={servicesData} scrollYProgress={scrollYProgress} />







        {/* ═══════════════════════════════════════════
            SECTION 7: FAQ (Free Scroll)
            ═══════════════════════════════════════════ */}
        <section id="faq" className="relative w-full  flex flex-col justify-center items-center bg-transparent py-20 md:py-32">
          <div className="relative w-full max-w-[1000px] px-6 flex flex-col bg-transparent">
            <ScrollReveal className="w-full flex flex-col justify-start">
              <PremiumFaqAccordion />
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 8: MASTERPIECE CTA
            ═══════════════════════════════════════════ */}
        <section
          id="services-cta"
          className="relative z-10 w-full min-h-screen  flex flex-col justify-center items-center overflow-hidden bg-transparent p-4 md:p-10"
        >
          {/* Main Masterpiece Container */}
          <motion.div style={{ scale: ctaScale }} className="relative w-full max-w-[1400px] py-20 md:py-32 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_100px_200px_var(--shadow-color),inset_0_2px_20px_var(--border-subtle)] flex flex-col justify-center items-center overflow-hidden bg-[var(--page-bg)] group will-change-transform">
            
            {/* Clean Background - Glows Removed */}
            
            {/* Cinematic Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

            {/* Content Wrapper */}
            <motion.div style={{ y: ctaTextY }} className="w-full max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 flex flex-col items-center will-change-transform">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="flex flex-col items-center w-full">
                
                {/* Monumental Typography */}
                <motion.h2 variants={fadeUp} className="text-[clamp(2rem,5vw,6rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-secondary)] leading-[1.1] tracking-tight whitespace-nowrap mb-6 drop-shadow-[0_20px_40px_var(--shadow-color)] relative z-10">
                  نصنع الحياة، <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#0066FF] to-blue-400">معاً.</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="text-lg md:text-2xl text-[var(--text-tertiary)] font-light mb-14 max-w-2xl mx-auto leading-relaxed text-justify [text-justify:kashida] w-full">
                  خطوتك الأولى تبدأ باستشارة دقيقة. احجز موعدك الآن مع نخبة الأطباء في اليمن واكتشف بروتوكولك الخاص.
                </motion.p>

                {/* Next-Gen Interactive CTA Buttons */}
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl">
                  
                  {/* Primary WhatsApp Button (Masterpiece Hover) */}
                  <a
                    href="https://wa.me/967781878443?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%A1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-full p-[2px] w-full sm:w-auto"
                  >
                    {/* Animated Border Gradient */}
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d4e616_0%,transparent_50%,#d4e616_100%)]" />
                    
                    {/* Button Core */}
                    <div className="relative flex items-center justify-center gap-4 bg-[var(--page-bg)] px-10 py-5 rounded-full w-full transition-all duration-500">
                      <span className="text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-accent transition-colors">
                        تواصل عبر الواتساب
                      </span>
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(212,230,22,0.4)] group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  {/* Secondary Phone Button */}
                  <a
                    href="tel:+967781878443"
                    className="group relative overflow-hidden rounded-full p-[2px] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] w-full sm:w-auto hover:bg-[var(--surface-hover)] hover:border-[var(--border-medium)] transition-all duration-500 backdrop-blur-xl"
                  >
                    <div className="relative flex items-center justify-center gap-4 px-10 py-5 w-full">
                      <span className="text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                        اتصل هاتفياً
                      </span>
                      <div className="w-10 h-10 rounded-full border border-[var(--border-medium)] bg-[var(--overlay-bg)] flex items-center justify-center group-hover:border-blue-400/50 transition-colors">
                        <svg className="w-5 h-5 text-[var(--text-primary)] group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </motion.div>


              </motion.div>
            </motion.div>
          </motion.div>
        </section>

      </main>

      <section className=" relative z-10 w-full flex-shrink-0">
        <Footer />
      </section>
    </div>
  );
}
