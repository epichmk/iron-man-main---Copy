"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, CaretRight, CaretLeft } from "@phosphor-icons/react/dist/ssr";

const ALBUM_CARDS = [
  {
    id: "reception",
    title: "الاستقبال",
    subtitle: "بيئة مريحة وداعمة",
    image: "/facility-images/reception/reception album cover.JPG",
    link: "/gallery?album=reception"
  },
  {
    id: "check-up-room",
    title: "غرفة الفحص",
    subtitle: "تشخيص دقيق وعناية فائقة",
    image: "/facility-images/check up room/398A2601.JPG",
    link: "/gallery?album=check-up-room"
  },
  {
    id: "lab",
    title: "المختبر",
    subtitle: "تجهيزات طبية بأعلى المعايير العالمية",
    image: "/facility-images/lab/the lab (1).JPG",
    link: "/gallery?album=lab"
  },
  {
    id: "operation-room",
    title: "غرفة العمليات",
    subtitle: "رعاية جراحية متقدمة وآمنة",
    image: "/facility-images/operation-room/operation room.JPG",
    link: "/gallery?album=operation-room"
  },
  {
    id: "recovery-room",
    title: "غرفة الإفاقة",
    subtitle: "رعاية مستمرة بعد الإجراءات",
    image: "/facility-images/recovery-room/recovery room.JPG",
    link: "/gallery?album=recovery-room"
  },
  {
    id: "freezing-unit",
    title: "وحدة التجميد",
    subtitle: "حفظ العينات بأحدث التقنيات",
    image: "/facility-images/freezing-unit/freezing samples unit (1).JPG",
    link: "/gallery?album=freezing-unit"
  },
  {
    id: "workshops",
    title: "مؤتمرات وورش عمل",
    subtitle: "مواكبة مستمرة لأحدث التطورات العلمية",
    image: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (1).jpg",
    link: "/gallery?album=workshops"
  }
];

export function MediaGalleryCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      let p = Math.min(1, Math.max(0, -rect.top / scrollable));
      rafId = requestAnimationFrame(() => setProgress(p));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const totalCards = ALBUM_CARDS.length;
  
  // Calculate heights dynamically for perfect scroll pacing
  const cardsScroll = Math.max(1, totalCards) * 80; // 80vh per card
  const pauseScroll = 100; // 100vh of pure pause on the last card
  const rollupScroll = 100; // 100vh for the next section to roll up
  const D = cardsScroll + pauseScroll + rollupScroll;
  const H = D + 100;

  const cardsEndP = cardsScroll / D;
  const pauseEndP = (cardsScroll + pauseScroll) / D;

  // Use 0 -> cardsEndP for navigating cards
  const cardProgress = Math.min(1, progress / cardsEndP);
  const activeIndex = totalCards === 0 ? 0 : Math.min(totalCards - 1, Math.floor(cardProgress * totalCards));
  const activeCard = ALBUM_CARDS[activeIndex] || ALBUM_CARDS[0];

  // Exit animation from pauseEndP -> 1.0 (happens exactly as the next section rolls up)
  const exitProgress = Math.max(0, (progress - pauseEndP) / (1 - pauseEndP));
  const sectionOpacity = 1 - exitProgress;
  const sectionScale = 1 - (exitProgress * 0.05);

  const handleJumpTo = (index: number) => {
    if (!sectionRef.current) return;
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targetCardProgress = (index + 0.5) / Math.max(1, totalCards);
    const targetProgress = targetCardProgress * cardsEndP;
    const absoluteTop = window.scrollY + sectionRef.current.getBoundingClientRect().top;
    window.scrollTo({ top: absoluteTop + (targetProgress * scrollable), behavior: "smooth" });
  };

  const handleNext = () => handleJumpTo(activeIndex === totalCards - 1 ? 0 : activeIndex + 1);
  const handlePrev = () => handleJumpTo(activeIndex === 0 ? totalCards - 1 : activeIndex - 1);

  // Auto-Tour logic: smoothly scrolls down to the next image when Play is active
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (activeIndex >= totalCards - 1) {
        setIsPlaying(false); // Stop playing when we reach the end
      } else {
        handleNext();
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex, totalCards]);

  return (
    <section
      ref={sectionRef}
      id="media-gallery"
      className="scroll-animation relative bg-[#000814]"
      style={{ height: `${H}vh` }}
      dir="ltr"
    >
      <div 
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between selection:bg-[#d4e616] selection:text-[#000814] bg-[#000814] pb-6 md:pb-8"
        style={{ height: "100dvh", willChange: "transform, opacity", transform: `translateZ(0) scale(${sectionScale})`, opacity: sectionOpacity }}
      >
        {/* Dynamic Glassy Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard?.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <Image 
              src={activeCard?.image || "/hero-banner/0040.jpg"} 
              alt="Background" 
              fill 
              className="object-cover blur-[40px] saturate-[1.2]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000814]/90 via-[#000814]/60 to-[#000814]/95" />
          </motion.div>
        </AnimatePresence>

        {/* Heavy Vignette for Pitch Black Edges */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

        {/* Header - Top Bar */}
        <div className="relative z-20 flex-none pt-8 px-6 md:px-12 flex justify-between items-center w-full pointer-events-none">
          <div />
          {/* Left space intentionally empty to avoid WhatsApp overlap */}
          <div />
        </div>

        {/* Carousel - Flex Middle */}
        <div 
          className="relative flex-1 w-full flex items-center justify-center z-10 pointer-events-none mt-4 mb-4"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          <AnimatePresence mode="popLayout">
            {ALBUM_CARDS.map((card, i) => {
              const distance = i - activeIndex;
              const absDist = Math.abs(distance);
              const isActive = distance === 0;

              // 3D Coverflow Calculation
              // distance < 0 means it's on the left
              // distance > 0 means it's on the right
              const sign = Math.sign(distance);
              
              // We want a clear gap so they don't cover each other. 
              // Base translation + extra translation for distance
              const translateX = sign * (typeof window !== "undefined" && window.innerWidth < 768 ? 220 : 600) + (distance * 50); 
              const translateZ = isActive ? 0 : -300 - (absDist * 100);
              const rotateY = isActive ? 0 : sign * -25; // Left cards rotate positively (face right), right cards rotate negatively (face left)
              
              const scale = isActive ? 1 : 0.9;
              const opacity = isActive ? 1 : Math.max(0, 1 - (absDist * 0.4));
              const zIndex = 50 - absDist;

              if (absDist > 2) return null;

              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: sign * 1000, z: -500 }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-[80vw] sm:w-[450px] md:w-[700px] lg:w-[900px] max-w-[90vw] h-auto aspect-[16/9] max-h-[65vh] cursor-pointer group pointer-events-auto"
                  onClick={() => {
                    if (!isActive) handleJumpTo(i);
                    else {
                      window.location.href = card.link;
                    }
                  }}
                  style={{ transformOrigin: "center center" }}
                >
                  <div className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700 ${isActive ? 'shadow-[0_30px_80px_rgba(0,8,20,0.8)]' : 'shadow-2xl'}`}>
                    <Image 
                      src={card.image} 
                      alt={card.title}
                      fill
                      className={`transition-transform duration-[2s] ease-out object-cover ${isActive ? "scale-105" : "scale-100"}`}
                    />
                    
                    {/* Dim inactive cards to create depth */}
                    <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-70'}`} />
                    
                    {/* Brand Color Blue Fade on Left Side of Active Card */}
                    {isActive && (
                      <div className="absolute inset-y-0 left-0 w-2/3 md:w-1/2 bg-gradient-to-r from-[#000814] via-[#000814]/70 to-transparent z-10 pointer-events-none" />
                    )}

                    {/* Professional Cinematic Vignette Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />

                    {/* Glossy Specular Highlight for Ultimate Polish */}
                    {isActive && (
                      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-60 transform -rotate-12 scale-150 transition-opacity duration-1000" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Left Side Dark Fading Layer for Professional Text Backdrop */}
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 lg:w-1/3 bg-gradient-to-r from-[#000814] via-[#000814]/80 to-transparent z-20 pointer-events-none" />

        {/* Active Item Information Panel - Left Side Middle */}
        <div className="absolute inset-y-0 left-8 md:left-12 z-30 pointer-events-none max-w-lg flex flex-col justify-center" dir="rtl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pointer-events-auto flex flex-col"
            >
              {/* Elegant Minimal Pill */}
              <div className="inline-flex items-center gap-2 mb-4 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">
                  المعرض الحصري
                </span>
              </div>

              <h3 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 dark:drop-shadow-md">
                {activeCard?.title}
              </h3>
              <p className="font-sans text-white/50 text-sm md:text-base font-light leading-relaxed mb-6">
                {activeCard?.subtitle}
              </p>
              
              {/* Minimalist Explore Button */}
              <Link 
                href={activeCard?.link || "/gallery"}
                className="group flex items-center gap-3 w-fit"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full  text-white/60 group- group-hover:text-white transition-all duration-300">
                  <CaretLeft weight="light" size={16} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="text-white/50 group-hover:text-white text-xs font-bold tracking-[0.2em] transition-colors">
                  استكشف الألبوم
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation - Ultra Minimalist (Bottom Right) */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 pointer-events-none" dir="ltr">
          
          <div className="pointer-events-auto flex items-center gap-12">
            
            {/* Unboxed Minimal Media Controls */}
            <div className="flex items-center gap-10 text-white/40">
              <button 
                onClick={() => { setIsPlaying(false); handlePrev(); }}
                className="hover:text-white transition-all hover:-translate-x-1"
              >
                <CaretLeft weight="light" size={28} />
              </button>

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`transition-all hover:scale-110 ${isPlaying ? 'text-white' : 'hover:text-white'}`}
              >
                {isPlaying ? <Pause weight="fill" size={24} className="animate-pulse" /> : <Play weight="fill" size={24} />}
              </button>

              <button 
                onClick={() => { setIsPlaying(false); handleNext(); }}
                className="hover:text-white transition-all hover:translate-x-1"
              >
                <CaretRight weight="light" size={28} />
              </button>
            </div>

            {/* Minimalist Text Link */}
            <Link 
              href="/gallery"
              className="text-white/40 hover:text-white transition-colors text-xs font-bold tracking-[0.2em]"
              dir="rtl"
            >
              معرض الصور
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}

