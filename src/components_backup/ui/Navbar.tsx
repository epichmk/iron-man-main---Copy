"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, List, X, CaretDown, WhatsappLogo } from "@phosphor-icons/react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import servicesData from "@/lib/servicesData.json";

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    rotateX: -15, 
    transformPerspective: 1000,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.04,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    scale: 0.98,
    filter: "blur(5px)",
    transition: { 
      duration: 0.3, 
      ease: "easeInOut" as const,
      staggerChildren: 0.02,
      staggerDirection: -1
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 400, damping: 30 } as const
  },
  exit: { opacity: 0, x: 10, filter: "blur(4px)", transition: { duration: 0.2 } }
};

const linkHoverVariants = {
  initial: { x: 0 },
  hover: { x: -8, transition: { type: "spring", stiffness: 400, damping: 25 } as const }
};

const indicatorVariants = {
  initial: { scaleY: 0, opacity: 0 },
  hover: { scaleY: 1, opacity: 1, transition: { duration: 0.2 } }
};

function EliteScrollContainer({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // Momentum Physics State
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const indicatorHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const springHeight = useSpring(indicatorHeight, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        containerRef.current.scrollBy({ top: 120, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        containerRef.current.scrollBy({ top: -120, behavior: 'smooth' });
      }
    };
    // Use passive: false so we can reliably preventDefault the page scroll
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(containerRef.current!.scrollTop);
    setDragDistance(0);
    
    lastYRef.current = e.clientY;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
      // Temporarily disable CSS smooth scrolling so it tracks the mouse 1:1 perfectly
      containerRef.current.style.scrollBehavior = 'auto'; 
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    // Only prevent default on mouse to avoid breaking native touch scrolling on phones
    if (e.pointerType === 'mouse') e.preventDefault();
    
    const walk = e.clientY - startY;
    containerRef.current.scrollTop = scrollTop - walk;
    setDragDistance(prev => prev + Math.abs(walk));

    // Calculate drag velocity
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const dy = e.clientY - lastYRef.current;
      velocityRef.current = dy / dt;
    }
    lastYRef.current = e.clientY;
    lastTimeRef.current = now;
  };

  const onPointerUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.scrollBehavior = 'smooth'; // Restore smooth scroll for keyboard

      // Apply Inertia/Momentum Physics
      if (Math.abs(velocityRef.current) > 0.3) {
        let v = velocityRef.current;
        const friction = 0.92; // How fast it slows down
        
        const momentumStep = () => {
          if (!containerRef.current) return;
          // Apply velocity
          containerRef.current.scrollTop -= v * 16; // Approx 16ms per frame
          v *= friction;
          
          if (Math.abs(v) > 0.05) {
            rafRef.current = requestAnimationFrame(momentumStep);
          } else {
            velocityRef.current = 0;
          }
        };
        rafRef.current = requestAnimationFrame(momentumStep);
      }
    }
  };

  const handleCaptureClick = (e: React.MouseEvent) => {
    if (dragDistance > 5) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Intercept wheel events to prevent scroll chaining to the document body
    e.stopPropagation();
  };

  return (
    <div className="relative w-full overflow-hidden pl-4" dir="rtl">
      {/* Custom Animated Scrollbar Indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-900/20 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-[#0094FE] shadow-[0_0_8px_#0094FE] rounded-full"
          style={{ height: springHeight }}
        />
      </div>

      <div 
        ref={containerRef}
        // overscroll-contain physically stops the body from scrolling when you reach the top/bottom
        className="flex flex-col max-h-[70vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab pb-2 touch-pan-y scroll-smooth"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClickCapture={handleCaptureClick}
        onWheel={handleWheel}
        style={{ userSelect: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only close if they scroll significantly (e.g., > 20px) to prevent trackpad jitter from closing it during a click
      if (Math.abs(currentScrollY - lastScrollY) > 20) {
        setIsExpanded(false);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <motion.div 
          layout
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`flex pointer-events-auto ${
            !isExpanded 
              ? "items-center justify-start py-4 md:py-6 w-full pr-4 md:pr-6" 
              : "fixed inset-0 md:relative md:inset-auto mx-auto w-full max-w-[1400px] justify-start md:justify-between pt-12 md:pt-5 pb-6 px-6 md:px-8 flex-col md:flex-row flex-nowrap bg-[#000814]/98 md:bg-transparent backdrop-blur-3xl md:backdrop-blur-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:shadow-none border-b border-white/5 md:border-transparent h-[100dvh] md:h-auto overflow-y-auto md:overflow-visible items-center"
          }`}
        >
          {/* LOGO CONTAINER (RIGHT SIDE IN RTL) */}
          <motion.div 
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className={`flex-none w-full md:w-auto flex items-center justify-between md:justify-start z-20 absolute top-4 right-4 md:relative md:top-auto md:right-auto cursor-pointer opacity-100 pointer-events-auto`}
          >
            <Link href="/" onClick={(e) => {
              if (!isExpanded) {
                e.preventDefault();
              }
            }}>
              <motion.div
                animate={{
                  rotateY: [0, 0, 180, 360, 360],
                  scale: [1, 1, 1.15, 1, 1],
                  filter: [
                    "drop-shadow(0 0 0px rgba(212,230,22,0))", 
                    "drop-shadow(0 0 0px rgba(212,230,22,0))", 
                    "drop-shadow(0 0 20px rgba(212,230,22,0.8)) brightness(1.3)", 
                    "drop-shadow(0 0 0px rgba(212,230,22,0))",
                    "drop-shadow(0 0 0px rgba(212,230,22,0))"
                  ]
                }}
                transition={{
                  duration: 7,
                  times: [0, 0.8, 0.85, 0.9, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "center center", perspective: 1000 }}
                className="mix-blend-screen flex items-center justify-center w-[48px] h-[48px]"
              >
                <Image 
                  src="/nmc-logo.png" 
                  alt="Logo" 
                  width={48} 
                  height={48} 
                  className="object-contain" 
                />
              </motion.div>
            </Link>
            
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <>
                {/* CENTERED NAVIGATION LINKS */}
                <motion.nav 
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", y: -10 },
                    visible: { 
                      opacity: 1, 
                      filter: "blur(0px)", 
                      y: 0, 
                      transition: { staggerChildren: 0.08, delayChildren: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
                    },
                    exit: { opacity: 0, filter: "blur(10px)", y: -10 }
                  }}
                  className="flex flex-col md:flex-row flex-none items-center justify-start md:justify-center gap-8 relative w-full md:w-auto order-last md:order-none mt-20 md:mt-0 pb-20 md:pb-0"
                >
                  
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/"
                      onClick={() => setIsExpanded(false)}
                      className="font-sans text-3xl md:text-[12px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-zinc-400 hover:text-white transition-colors block text-center md:text-right"
                    >
                      الرئيسية
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/dr-najat"
                      onClick={() => setIsExpanded(false)}
                      className="font-sans text-3xl md:text-[12px] font-bold tracking-[0.1em] text-[#0094FE] hover:text-white transition-colors drop-shadow-[0_0_5px_rgba(0,102,255,0.5)] block text-center md:text-right"
                    >
                      د. نجاة الملس
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/the-center"
                      onClick={() => setIsExpanded(false)}
                      className="font-sans text-3xl md:text-[12px] font-bold tracking-[0.1em] text-zinc-400 hover:text-[#d4e616] hover:drop-shadow-[0_0_5px_rgba(212,230,22,0.5)] transition-colors block text-center md:text-right"
                    >
                      المركز
                    </Link>
                  </motion.div>

                  {/* Interactive Services Dropdown */}
                  <div 
                    className="relative w-full md:w-auto flex flex-col items-center md:block"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center gap-2 font-sans text-3xl md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#0094FE] transition-colors py-2 md:py-4 group w-full justify-center md:justify-start"
                    >
                      <CaretDown size={24} className={`transition-transform duration-300 md:hidden ${isServicesOpen ? "rotate-180" : ""}`} />
                      <span className="relative">
                        الخدمات
                        {isServicesOpen && (
                          <motion.span layoutId="navUnderline" className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#0094FE] shadow-[0_0_8px_#0094FE] hidden md:block" />
                        )}
                      </span>
                      <CaretDown size={12} className={`transition-transform duration-300 group-hover:text-[#0094FE] hidden md:block ${isServicesOpen ? "rotate-180 text-[#0094FE] drop-shadow-[0_0_5px_#0094FE]" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="md:absolute md:top-[calc(100%+12px)] md:left-1/2 md:-translate-x-1/2 w-full md:w-[340px] bg-transparent md:bg-[#000814]/80 md:backdrop-blur-3xl border-none md:border border-[#0094FE]/30 md:border-white/10 p-2 md:p-4 z-50 overflow-hidden shadow-none md:shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_40px_rgba(0,102,255,0.1)] rounded-none md:rounded-3xl mt-4 md:mt-0 flex flex-col items-center md:items-stretch"
                          dir="rtl"
                        >

                          <div className="relative z-10 flex flex-col">
                            {/* Premium Elite Scrollable Container */}
                            <EliteScrollContainer isOpen={isServicesOpen}>
                              {servicesData.map((service) => {
                                return (
                                  <motion.div key={service.id} variants={itemVariants}>
                                    <Link href={`/services/${service.id}`} onClick={() => setIsExpanded(false)} className="block pointer-events-auto" draggable={false}>
                                      <motion.div 
                                        className="relative py-3 px-4 rounded-2xl overflow-hidden cursor-pointer group hover:bg-white/[0.03] transition-colors duration-300"
                                        initial="initial"
                                        whileHover="hover"
                                      >
                                        <motion.div 
                                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0094FE]/10 to-transparent"
                                          variants={{
                                            initial: { opacity: 0, x: -20 },
                                            hover: { opacity: 1, x: 0, transition: { duration: 0.3 } }
                                          }}
                                        />

                                        {/* Right Indicator Line */}
                                        <motion.div 
                                          className="absolute right-0 top-1/2 -translate-y-1/2 h-2/3 w-[3px] rounded-full bg-[#0094FE] shadow-[0_0_12px_#0094FE]"
                                          variants={indicatorVariants}
                                        />

                                        <motion.div variants={linkHoverVariants} className="relative z-10 flex flex-col items-start justify-center">
                                          <span className={`font-bold text-sm tracking-wide ${service.featured ? "text-[#c0e816] dark:drop-shadow-[0_0_8px_rgba(192,232,22,0.4)]" : "text-zinc-300 group-hover:text-white transition-colors"}`}>
                                            <motion.span variants={{ hover: { color: "#ffffff" } }}>
                                              {service.title}
                                            </motion.span>
                                          </span>
                                        </motion.div>
                                      </motion.div>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </EliteScrollContainer>
                            
                            {/* Attention Grabbing View All Button */}
                            <motion.div variants={itemVariants} className="mt-4">
                              <Link href="/services" onClick={() => setIsExpanded(false)} draggable={false} className="relative group flex items-center justify-center py-4 px-6 rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#0094FE]/50 transition-colors pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                {/* Button Hover Fill */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0094FE] to-[#0094FE] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                
                                <span className="relative z-10 flex items-center gap-2 text-white font-bold text-[11px] tracking-[0.2em] uppercase transition-colors duration-300">
                                  تصفح جميع الخدمات
                                  <motion.div
                                    animate={{ rotate: [0, 45, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  >
                                    <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                  </motion.div>
                                </span>
                              </Link>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div variants={itemVariants}>
                    <Link
                      href="/gallery"
                      onClick={() => setIsExpanded(false)}
                      className="font-sans text-3xl md:text-[12px] font-bold tracking-[0.1em] text-zinc-400 hover:text-[#d4e616] hover:drop-shadow-[0_0_5px_rgba(212,230,22,0.5)] transition-colors block text-center md:text-right"
                    >
                      المعرض
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/blog"
                      onClick={() => setIsExpanded(false)}
                      className="font-sans text-3xl md:text-[12px] font-bold tracking-[0.1em] text-zinc-400 hover:text-[#0094FE] hover:drop-shadow-[0_0_5px_rgba(0,102,255,0.5)] transition-colors block text-center md:text-right"
                    >
                      المعرفة
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/services#faq"
                      onClick={() => setIsExpanded(false)}
                      className="font-sans text-3xl md:text-[12px] font-bold tracking-[0.1em] text-zinc-400 hover:text-[#0094FE] hover:drop-shadow-[0_0_5px_rgba(0,102,255,0.5)] transition-colors block text-center md:text-right"
                    >
                      الأسئلة الشائعة
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/contact"
                      onClick={() => setIsExpanded(false)}
                      className="font-sans text-3xl md:text-[12px] font-bold tracking-[0.1em] text-zinc-400 hover:text-[#0094FE] hover:drop-shadow-[0_0_5px_rgba(0,102,255,0.5)] transition-colors block text-center md:text-right"
                    >
                      تواصل معنا
                    </Link>
                  </motion.div>
                </motion.nav>

                {/* BOOKING BUTTON (LEFT SIDE IN RTL) */}
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0, transition: { delay: 0.3, duration: 0.4 } }}
                  exit={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                  className="flex-1 flex justify-end"
                >
                  <a
                    href="https://wa.me/967781878443"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 md:bg-white md:hover:bg-zinc-200 md:px-5 md:py-2 w-14 h-14 md:w-auto md:h-auto bg-black/40 backdrop-blur-md border border-[#d4e616]/30 md:border-none shadow-[0_0_20px_rgba(212,230,22,0.2)] md:shadow-none opacity-100 pointer-events-auto`}
                    dir="rtl"
                  >
                    {/* Smartphone version: Animated Whatsapp Logo */}
                    <span className="relative z-10 flex items-center justify-center md:hidden w-full h-full">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-[#d4e616]/20 p-2 rounded-full flex items-center justify-center"
                      >
                        <motion.div
                          animate={{ rotate: [0, -15, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                        >
                          <WhatsappLogo size={28} weight="fill" className="text-[#d4e616] drop-shadow-[0_0_10px_#d4e616]" />
                        </motion.div>
                      </motion.div>
                    </span>
                    
                    {/* Desktop version: Text button */}
                    <span className="relative z-10 hidden md:flex items-center gap-2 font-sans text-[12px] font-bold tracking-wide text-black">
                      إحجز موعد
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" 
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-lg border border-[#0094FE]/20 bg-black/40 p-8 shadow-[0_0_50px_rgba(0,102,255,0.1)] overflow-hidden" 
              onClick={e => e.stopPropagation()}
              dir="rtl"
            >
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#0094FE]/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#0094FE]/40" />
              
              <div className="relative z-10 flex flex-col items-start gap-4">
                <span className="font-mono text-[10px] text-[#0094FE] tracking-[0.2em] uppercase">
                  Sys.Offer.Active
                </span>
                <h2 className="font-heading text-3xl font-bold text-white tracking-tight">
                  عرض خاص
                </h2>
                <p className="font-sans text-base text-zinc-300 leading-relaxed">
                  احصلي على <strong className="text-[#0094FE] font-bold text-lg">خصم 50%</strong> على كشفية الزيارة الأولى.
                </p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0094FE]/20 to-transparent my-2" />
                <p className="font-sans text-[10px] text-zinc-500 leading-relaxed max-w-[85%]">
                  تنويه: الخصم يقتصر على رسوم الكشفية الأولى ولا يشمل الفحوصات المخبرية أو البرامج العلاجية الأخرى.
                </p>
                <a 
                  href="https://wa.me/967781878443" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-6 group relative w-full overflow-hidden rounded bg-[#0094FE] px-6 py-4 text-center font-sans font-bold text-black text-sm tracking-wide transition-all hover:bg-[#0094FE]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    تأكيد الحجز
                    <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </a>
              </div>
              <button 
                className="absolute left-6 top-6 text-zinc-500 hover:text-white transition-colors" 
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
