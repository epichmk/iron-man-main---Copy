"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  EnvelopeSimple,
  Desk,
  Clock
} from "@phosphor-icons/react";
import { getWhatsAppLink } from "@/lib/whatsappMessages";

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
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isHomepage) {
          window.dispatchEvent(new CustomEvent("footerVisibilityChange", { detail: { isVisible: entry.isIntersecting } }));
        }
      },
      { rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isHomepage]);

  useEffect(() => {
    let animationFrameId: number;

    const updateFade = () => {
      if (videoRef.current && fadeOverlayRef.current && !isNaN(videoRef.current.duration)) {
        const t = videoRef.current.currentTime;
        const d = videoRef.current.duration;
        const fadeDuration = 1.0; // 1 second fade in/out

        let opacity = 0;
        if (t < fadeDuration) {
          opacity = 1 - (t / fadeDuration);
        } else if (t > d - fadeDuration) {
          opacity = (t - (d - fadeDuration)) / fadeDuration;
        }

        fadeOverlayRef.current.style.opacity = opacity.toString();
      }
      animationFrameId = requestAnimationFrame(updateFade);
    };

    updateFade();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] z-10 overflow-hidden">
      <div className="relative w-full h-full z-10">
        <footer
          className="w-full h-full bg-[var(--page-bg)] pt-2 [@media(min-height:850px)]:pt-6 pb-6 flex flex-col justify-between group overflow-hidden"
          dir="rtl"
        >

          {/* 1. Base Layer: Looping Video Background with Parallax */}
          {isHomepage ? (
            <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 w-full h-full">
              <LazyVideo
                ref={videoRef}
                src="/footer-baby.original.mp4"
                poster="/footer-baby-poster.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-[0.85]"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Fade layer to blend the video smoothly with the page in light/dark mode */}
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)] via-[var(--page-bg)]/50 dark:via-transparent to-[var(--page-bg)] pointer-events-none" />
              {/* Cinematic Fade-to-Black Overlay synced to video time */}
              <div ref={fadeOverlayRef} className="absolute inset-0 w-full h-full bg-[var(--page-bg)] pointer-events-none" style={{ opacity: 0 }} />
            </motion.div>
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[var(--page-bg)] bg-[radial-gradient(ellipse_at_center,var(--ambient-glow-color)_0%,var(--page-bg)_100%)]" />
          )}

          {/* Top Fader */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent z-20 pointer-events-none" />

          {/* Ambient background glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[var(--accent-color)]/5 to-transparent blur-[150px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />
          {/* The background is now globally handled by layout.tsx */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-20%" }}
            className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-30 w-full flex-grow flex flex-col justify-between"
          >

            {isHomepage ? (
              <>
                {/* Main Footer Elite Split Layout */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center flex-grow w-full mt-2 md:mt-0 gap-2 [@media(min-height:850px)]:gap-4 md:gap-12 lg:gap-16">

                  {/* Column 1: Brand (Aligned to Start / Right in RTL) */}
                  <motion.div variants={itemVariants} className="flex flex-col items-center text-center md:items-start md:text-right gap-1 [@media(min-height:850px)]:gap-3 md:gap-6 w-full md:max-w-[320px] drop-shadow-[0_2px_8px_var(--shadow-color)]">
                    <Link href="/" className="inline-flex flex-col items-center md:items-start gap-2 md:gap-2 w-fit">
                      <div className="relative w-12 h-12 md:w-24 md:h-24 shrink-0 drop-shadow-[0_0_15px_rgba(212,230,22,0.3)]">
                        <Image
                          src="/nmc-logo.png"
                          alt="NMC Logo"
                          fill
                          className="object-contain logo-shadow"
                        />
                      </div>
                      <div className="flex flex-col items-center md:items-start justify-center pt-1">
                        <div className="font-black text-lg md:text-3xl text-[var(--text-primary)] leading-tight whitespace-nowrap">مركز د. نجاة الملس</div>
                        <div className="w-full flex justify-between text-[#0094FE] text-[10px] md:text-sm font-bold mt-1 px-0.5">
                          <span>للحقن</span>
                          <span>المجهري</span>
                          <span>والمساعدة</span>
                          <span>على</span>
                          <span>الحمل</span>
                        </div>
                      </div>
                    </Link>
                    <p className="text-[var(--text-tertiary)] text-xs md:text-[14px] leading-relaxed md:leading-[1.8] max-w-[260px] md:max-w-[250px] text-center md:text-justify mt-2 md:mt-2 hidden sm:block">
                      المركز الرائد في الحقن المجهري وأطفال الأنابيب في اليمن. تقنيات عالمية برؤية إنسانية، لتصنع الأمل وتحقق حلم الأمومة.
                    </p>
                    <div className="flex flex-col items-center md:items-start gap-2 [@media(min-height:850px)]:gap-3 md:gap-4 mt-1 md:mt-2">
                      <div className="hidden md:flex justify-center md:justify-start items-center gap-3 md:gap-4">
                        <a href="https://wa.me/967781878443" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center hover:bg-[#25D366] hover:text-[var(--text-primary)] text-[var(--text-tertiary)] hover:scale-110 transition-all duration-300">
                          <WhatsappLogo size={24} weight="fill" />
                        </a>
                        <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center hover:bg-[#1877F2] hover:text-[var(--text-primary)] text-[var(--text-tertiary)] hover:scale-110 transition-all duration-300">
                          <FacebookLogo size={24} weight="fill" />
                        </a>
                        <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center hover:bg-[#E4405F] hover:text-[var(--text-primary)] text-[var(--text-tertiary)] hover:scale-110 transition-all duration-300">
                          <InstagramLogo size={24} weight="fill" />
                        </a>
                      </div>

                      {/* Animated Slogan */}
                      <motion.div
                        className="text-sm [@media(min-height:850px)]:text-lg md:text-3xl font-black bg-clip-text text-transparent bg-[linear-gradient(90deg,#0094FE,#d4e616,#0094FE)] bg-[length:200%_auto] w-fit mt-0.5 md:mt-2"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 102, 255, 0.4))' }}
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        نجاة حلم الحمل
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Left Side Container (End / Left in RTL) - Ultra Minimal on Mobile, Complete on Desktop */}
                  <div className="flex flex-col md:flex-row justify-evenly flex-grow md:justify-between gap-1 [@media(min-height:850px)]:gap-6 md:gap-8 lg:gap-16 w-full my-0 [@media(min-height:850px)]:my-4 md:my-0 drop-shadow-[0_2px_8px_var(--shadow-color)] md:pl-10">

                    {/* Column 2: Our Services */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-1 md:gap-3 md:items-start md:text-right drop-shadow-md">
                      <h3 className="text-[var(--text-secondary)] text-[10px] md:text-[15px] font-black mb-0 [@media(min-height:850px)]:mb-2 md:border-b border-[var(--border-subtle)] md:pb-2 inline-block">الخدمات المتخصصة</h3>
                      <ul className="flex flex-col gap-0.5 [@media(min-height:850px)]:gap-2 md:gap-0 w-full md:items-start md:h-[220px] md:justify-between">
                        {[
                          { name: "تقنية IX73 / IMSI", path: "/services/ix73-icsi-imsi" },
                          { name: "تحديد الجنس والفحص الجيني PGT", path: "/services/gender-selection" },
                          { name: "وحدة تجميد الأجنة والبويضات", path: "/services/freezing-unit" },
                          { name: "حاضنات Time-Lapse الذكية", path: "/services/incubators" },
                          { name: "أمراض الذكورة والعقم", path: "/services/andrology" },
                        ].map((link, i) => (
                          <li key={i}>
                            <Link href={link.path} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-x-1 transition-all duration-500 inline-block font-sans text-[10px] [@media(min-height:850px)]:text-[14px] md:text-[14px] font-medium drop-shadow-md">
                              {link.name}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 md:mt-4">
                          <Link href="/services" className="text-accent hover:text-[var(--text-primary)] text-[10px] md:text-[14px] font-bold inline-block transition-colors duration-300">
                            + عرض جميع الخدمات
                          </Link>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Column 3: Quick Navigation */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-1 md:gap-3 md:items-start md:text-right drop-shadow-md">
                      <h3 className="text-[var(--text-secondary)] text-[10px] md:text-[15px] font-black mb-0 [@media(min-height:850px)]:mb-2 md:border-b border-[var(--border-subtle)] md:pb-2 inline-block">روابط سريعة</h3>
                      <ul className="flex flex-col gap-1 [@media(min-height:850px)]:gap-2 md:gap-0 w-full md:items-start md:h-[220px] md:justify-between">
                        {[
                          { name: "الرئيسية", path: "/" },
                          { name: "عن المركز", path: "/the-center" },
                          { name: "المديرة الطبية (د. نجاة)", path: "/dr-najat" },
                          { name: "خدماتنا الطبية", path: "/services" },
                          { name: "معرض الصور", path: "/gallery" },
                          { name: "المعرفة", path: "/blog" },
                          { name: "تواصل معنا", path: "/contact" },
                        ].map((link, i) => (
                          <li key={i}>
                            <Link href={link.path} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-x-1 transition-all duration-500 inline-block font-sans text-[10px] [@media(min-height:850px)]:text-[14px] md:text-[14px] font-medium drop-shadow-md">
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Column 4: Contact Info (Desktop Only to preserve mobile layout) */}
                    <motion.div variants={itemVariants} className="hidden md:flex flex-col gap-1 md:gap-3 md:items-start md:text-right drop-shadow-md">
                      <h3 className="text-[var(--text-secondary)] text-[10px] md:text-[15px] font-black mb-0 [@media(min-height:850px)]:mb-2 md:border-b border-[var(--border-subtle)] md:pb-2 inline-block">تواصل معنا</h3>
                      <ul className="flex flex-col gap-1 [@media(min-height:850px)]:gap-2 md:gap-0 w-full md:items-start mt-1 md:mt-0 md:h-[220px] md:justify-between">
                        <li>
                          <a href="tel:+967781878443" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-x-1 transition-all duration-500 flex items-center justify-start gap-3 font-sans text-[10px] [@media(min-height:850px)]:text-[14px] md:text-[14px] font-medium dark:drop-shadow-md">
                             <Phone size={18} className="text-accent" weight="fill" /><span dir="ltr" className="tracking-widest">+967 781 878 443</span>
                          </a>
                        </li>
                        <li>
                          <a href="tel:+9671513729" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-x-1 transition-all duration-500 flex items-center justify-start gap-3 font-sans text-[10px] [@media(min-height:850px)]:text-[14px] md:text-[14px] font-medium dark:drop-shadow-md">
                             <Phone size={18} className="text-accent" weight="fill" /><span dir="ltr" className="tracking-widest">+967 1 513 729</span>
                          </a>
                        </li>
                        <li>
                          <a href="mailto:ivfnmc@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-x-1 transition-all duration-500 flex items-center justify-start gap-3 font-sans text-[10px] [@media(min-height:850px)]:text-[14px] md:text-[14px] font-medium dark:drop-shadow-md">
                             <EnvelopeSimple size={18} className="text-[#0094FE]" weight="fill" /><span dir="ltr">ivfnmc@gmail.com</span>
                          </a>
                        </li>
                        <li>
                          <div className="text-[var(--text-secondary)] flex items-center justify-start gap-3 font-sans text-[10px] [@media(min-height:850px)]:text-[14px] md:text-[14px] font-medium drop-shadow-md">
                             <MapPin size={18} className="text-accent" weight="fill" /><span>صنعاء، جولة فلسطين</span>
                          </div>
                        </li>
                        <li>
                          <div className="text-[var(--text-secondary)] flex items-center justify-start gap-3 font-sans text-[10px] [@media(min-height:850px)]:text-[14px] md:text-[14px] font-medium drop-shadow-md">
                             <Clock size={18} className="text-[#0094FE]" weight="fill" /><span>السبت - الخميس | 9 ص - 3 م</span>
                          </div>
                        </li>
                      </ul>
                    </motion.div>
                  </div>

                </div>

                {/* Bottom Bar */}
                <motion.div variants={itemVariants} className="relative z-50 pt-2 [@media(min-height:850px)]:pt-6 pb-0 [@media(min-height:850px)]:pb-2 flex flex-col gap-1 md:gap-4 font-sans text-xs text-[var(--text-secondary)] mt-auto text-center drop-shadow-[0_2px_8px_var(--shadow-color)]">
                  
                  <div className="flex flex-wrap justify-center items-center gap-2 [@media(min-height:850px)]:gap-6 text-[10px] md:text-xs font-bold text-[var(--text-primary)]">
                    <Link href="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors">سياسة الخصوصية</Link>
                    <span className="text-[var(--text-muted-light)] hidden [@media(min-height:350px)]:inline">|</span>
                    <Link href="/terms-of-service" className="hover:text-[var(--text-primary)] transition-colors">شروط الخدمة</Link>
                    <span className="text-[var(--text-muted-light)] hidden [@media(min-height:350px)]:inline">|</span>
                    <span dir="ltr" className="font-mono">najat-ivf.com</span>
                  </div>

                  <p className="text-[8px] [@media(min-height:850px)]:text-[10px] md:text-xs max-w-[95%] md:max-w-none mx-auto font-medium opacity-60">
                    &copy; {new Date().getFullYear()} مركز د. نجاة الملس للحقن المجهري والمساعدة على الحمل. جميع الحقوق محفوظة.
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                {/* Award-Winning Inner Page Footer */}
                <div className="w-full mt-2 flex flex-col relative z-20 h-full justify-center">

                  {/* Single-Row Massive CTA Section */}
                  <motion.div variants={itemVariants} className="w-full flex flex-col xl:flex-row items-center justify-between gap-4 md:gap-8 pb-6 md:pb-12 border-b border-[var(--border-subtle)] relative">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[200px] bg-gradient-to-r from-[#0094FE]/15 to-[#0094FE]/15 blur-[120px] pointer-events-none rounded-full" />

                    <div className="flex-1 relative z-10 w-full text-center xl:text-right hidden md:block">
                      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[var(--text-primary)] tracking-tight leading-loose">
                        نبني <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-[#0094FE] font-black">الأمل</span>، ونصنع الحياة. <span className="text-[var(--text-tertiary)] font-light text-base md:text-lg mr-2">المركز الرائد في اليمن للحقن المجهري وأطفال الأنابيب.</span>
                      </h2>
                    </div>

                    <div className="flex-shrink-0 relative z-10 mt-6 xl:mt-0 xl:mr-10">
                      <Link href="/contact" className="group relative inline-flex h-12 md:h-14 items-center justify-center rounded-r-full rounded-l-none px-8 md:px-10 font-medium text-[var(--text-primary)] duration-300 hover:scale-[1.02] transition-transform whitespace-nowrap">

                        {/* Infinite Gradient Border (Bleeds Left) */}
                        <motion.div
                          className="absolute inset-0 -left-[100vw] p-[2px] bg-[linear-gradient(90deg,#0094FE,#d4e616,#0094FE)] bg-[length:200%_auto] rounded-r-full pointer-events-none"
                          animate={{ backgroundPosition: ["0% center", "200% center"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          {/* Inner Dark Background */}
                          <div className="w-full h-full bg-[var(--page-bg)] rounded-r-full group-hover:bg-[var(--surface-elevated)] transition-colors duration-300" />
                        </motion.div>

                        {/* Shine Effect (Clipped to button bounds) */}
                        <div className="absolute inset-0 overflow-hidden rounded-r-full">
                          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                            <div className="relative h-full w-8 bg-[var(--surface-hover)]" />
                          </div>
                        </div>

                        <span className="text-sm md:text-base font-bold tracking-wide relative z-10">احجز استشارتك الآن</span>
                      </Link>
                    </div>
                  </motion.div>

                  {/* Compact Centered Layout Section */}
                  <div className="flex flex-col items-center justify-center gap-4 md:gap-6 pt-4 md:pt-6 pb-2 relative z-10 w-full max-w-4xl mx-auto text-center my-auto">

                    {/* Brand & Slogan & Social Centered */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                      <Link href="/" className="inline-flex flex-col items-center gap-2 w-fit group/logo">
                        <div className="relative w-14 h-14 group-hover/logo:scale-105 transition-transform duration-500">
                          <Image src="/nmc-logo.png" alt="NMC Logo" fill className="object-contain logo-shadow" />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-xl md:text-2xl text-[var(--text-primary)] tracking-tight leading-tight">مركز د. نجاة الملس</span>
                          <span className="text-[#0094FE] text-[11px] md:text-xs tracking-widest font-medium mt-1">للحقن المجهري والمساعدة على الحمل</span>
                        </div>
                      </Link>

                      {/* Animated Slogan */}
                      <motion.div
                        className="text-lg font-black tracking-wider bg-clip-text text-transparent bg-[linear-gradient(90deg,#0094FE,#d4e616,#0094FE)] bg-[length:200%_auto] w-fit mt-1"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 102, 255, 0.4))' }}
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        نجاة حلم الحمل
                      </motion.div>

                      <div className="flex items-center gap-3 mt-1">
                        <a href="https://wa.me/967781878443" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#25D366]/10 #25D366]/20 flex items-center justify-center hover:bg-[#25D366] #25D366] text-[#25D366] hover:text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-1"><WhatsappLogo size={20} weight="fill" /></a>
                        <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#1877F2]/10 #1877F2]/20 flex items-center justify-center hover:bg-[#1877F2] #1877F2] text-[#1877F2] hover:text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-1"><FacebookLogo size={20} weight="fill" /></a>
                        <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#E4405F]/10 #E4405F]/20 flex items-center justify-center hover:bg-[#E4405F] #E4405F] text-[#E4405F] hover:text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-1"><InstagramLogo size={20} weight="fill" /></a>
                      </div>
                    </motion.div>

                    {/* Compact Inline Links & Contact */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 md:gap-4 w-full pt-2 md:pt-4 border-t border-[var(--border-subtle)]">

                      {/* Contact Inline */}
                      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-[var(--text-tertiary)]">
                        <div className="flex items-center gap-4">
                          <a href="tel:+967781878443" className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors group">
                            <Phone size={16} className="text-[#0094FE]" />
                            <span dir="ltr" className="font-bold tracking-wider">+967 781 878 443</span>
                          </a>
                          <a href="tel:+9671513729" className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors group">
                            <Phone size={16} className="text-accent" />
                            <span dir="ltr" className="font-bold tracking-wider">+967 1 513 729</span>
                          </a>
                        </div>
                        <a href="mailto:ivfnmc@gmail.com" className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors group">
                          <EnvelopeSimple size={16} className="text-[#0094FE]" />
                          <span className="font-sans">ivfnmc@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <MapPin size={16} className="text-accent" />
                          <span>صنعاء، اليمن. جولة فلسطين</span>
                        </div>
                      </div>

                      {/* Links Rows */}
                      <div className="flex flex-col gap-3 md:gap-4 mt-1 md:mt-2 w-full max-w-3xl">

                        {/* Row 1: Website Navigation */}
                        <div className="flex flex-wrap justify-center gap-6">
                          {[
                            { name: "الرئيسية", path: "/" },
                            { name: "عن المركز", path: "/the-center" },
                            { name: "المديرة الطبية", path: "/dr-najat" },
                            { name: "الخدمات", path: "/services" },
                            { name: "معرض الصور", path: "/gallery" },
                            { name: "المعرفة", path: "/blog" },
                            { name: "تواصل معنا", path: "/contact" },
                          ].map((link, i) => (
                            <Link key={`nav-${i}`} href={link.path} className="text-[var(--text-muted-light)] hover:text-[var(--text-primary)] transition-colors text-xs font-medium">
                              {link.name}
                            </Link>
                          ))}
                        </div>

                        {/* Row 2: Services */}
                        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 border-t border-[var(--border-subtle)] pt-2 md:pt-4">
                          {[
                            { name: "أطفال الأنابيب", path: "/services/ix73-icsi-imsi" },
                            { name: "تحديد الجنس", path: "/services/gender-selection" },
                            { name: "تجميد الأجنة", path: "/services/freezing-unit" },
                            { name: "أمراض الذكورة", path: "/services/andrology" },
                            { name: "حاضنات Time-Lapse", path: "/services/incubators" },
                          ].map((link, i) => (
                            <Link key={`serv-${i}`} href={link.path} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors text-[11px] font-medium">
                              {link.name}
                            </Link>
                          ))}
                          <Link href="/services" className="text-[#0094FE] hover:text-[var(--text-primary)] transition-colors text-[11px] font-bold tracking-wider">
                            عرض جميع الخدمات +
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Bar */}
                  <motion.div variants={itemVariants} className="relative z-50 pt-4 md:pt-6 pb-2 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[var(--text-muted-light)] mt-auto border-t border-[var(--border-subtle)]">
                    <p className="text-center w-full md:w-auto">
                      &copy; {new Date().getFullYear()} مركز د. نجاة الملس للحقن المجهري والمساعدة على الحمل.<br className="md:hidden" /> جميع الحقوق محفوظة.
                    </p>
                    <div className="flex items-center justify-center gap-6 w-full md:w-auto">
                      <Link href="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors">سياسة الخصوصية</Link>
                      <Link href="/terms-of-service" className="hover:text-[var(--text-primary)] transition-colors">شروط الخدمة</Link>
                      <span dir="ltr" className="font-mono text-zinc-600">najat-ivf.com</span>
                    </div>
                  </motion.div>
                </div>
              </>
            )}

          </motion.div>
        </footer>
      </div>
    </section>
  );
}


