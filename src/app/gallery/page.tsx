"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";

const GALLERY_ALBUMS = [
  { id: "all", label: "الكل", cover: "/facility-images/reception/reception album cover.JPG" },
  { id: "reception", label: "الاستقبال", cover: "/facility-images/reception/reception album cover.JPG" },
  { id: "check-up-room", label: "غرفة الفحص", cover: "/facility-images/check up room/398A2601.JPG" },
  { id: "lab", label: "المختبر", cover: "/facility-images/lab/the lab (1).JPG" },
  { id: "operation-room", label: "غرفة العمليات", cover: "/facility-images/operation-room/operation room.JPG" },
  { id: "recovery-room", label: "غرفة الإفاقة", cover: "/facility-images/recovery-room/recovery room.JPG" },
  { id: "freezing-unit", label: "وحدة التجميد", cover: "/facility-images/freezing-unit/freezing samples unit (1).JPG" },
  { id: "workshops", label: "مؤتمرات وورش عمل", cover: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (1).jpg" },
];

const GALLERY_IMAGES = [
  // Lab
  { id: "l1", album: "lab", src: "/facility-images/lab/the lab (1).JPG", title: "المختبر" },
  { id: "l2", album: "lab", src: "/facility-images/lab/the lab (2).JPG", title: "تجهيزات المختبر" },
  { id: "l3", album: "lab", src: "/facility-images/lab/the lab (3).JPG", title: "دقة الفحص" },
  { id: "l4", album: "lab", src: "/facility-images/lab/the lab (4).JPG", title: "أحدث التقنيات" },
  { id: "l5", album: "lab", src: "/facility-images/lab/the lab (5).JPG", title: "بيئة معقمة" },
  { id: "l6", album: "lab", src: "/facility-images/lab/the lab (6).JPG", title: "تحليل دقيق" },
  // Operation Room
  { id: "o1", album: "operation-room", src: "/facility-images/operation-room/operation room.JPG", title: "غرفة العمليات" },
  { id: "o2", album: "operation-room", src: "/facility-images/operation-room/operation room 2.JPG", title: "تجهيزات العمليات" },
  // Reception
  { id: "r1", album: "reception", src: "/facility-images/reception/reception album cover.JPG", title: "صالة الاستقبال" },
  { id: "r2", album: "reception", src: "/facility-images/reception/reception (1).JPG", title: "بيئة مريحة" },
  { id: "r3", album: "reception", src: "/facility-images/reception/reception (2).JPG", title: "ترحيب دائم" },
  // Freezing Unit
  { id: "f1", album: "freezing-unit", src: "/facility-images/freezing-unit/freezing samples unit (1).JPG", title: "وحدة التجميد" },
  { id: "f2", album: "freezing-unit", src: "/facility-images/freezing-unit/freezing samples unit (2).JPG", title: "حفظ العينات" },
  { id: "f3", album: "freezing-unit", src: "/facility-images/freezing-unit/freezing samples unit (3).JPG", title: "تجميد آمن" },
  // Check Up Room
  { id: "c1", album: "check-up-room", src: "/facility-images/check up room/398A2601.JPG", title: "غرفة الفحص" },
  { id: "c2", album: "check-up-room", src: "/facility-images/check up room/398A2798.JPG", title: "الموجات الصوتية" },
  // Recovery Room
  { id: "rr1", album: "recovery-room", src: "/facility-images/recovery-room/recovery room.JPG", title: "غرفة الإفاقة" },
  // Workshops
  { id: "w1", album: "workshops", src: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (1).jpg", title: "مؤتمر ديرماس الرابع" },
  { id: "w2", album: "workshops", src: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (2).jpg", title: "مشاركة دولية" },
  { id: "w3", album: "workshops", src: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (3).jpg", title: "تبادل الخبرات" },
  { id: "w4", album: "workshops", src: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (4).jpg", title: "تطوير مستمر" },
  { id: "w5", album: "workshops", src: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (5).jpg", title: "شراكات عالمية" },
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const urlAlbum = searchParams.get("album");
  const validUrlAlbum = urlAlbum && GALLERY_ALBUMS.some(a => a.id === urlAlbum) ? urlAlbum : "all";
  
  const [activeAlbum, setActiveAlbum] = useState(validUrlAlbum);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prevUrlAlbum, setPrevUrlAlbum] = useState(validUrlAlbum);

  // Sync state if URL changes dynamically (e.g., browser back button)
  if (validUrlAlbum !== prevUrlAlbum) {
    setPrevUrlAlbum(validUrlAlbum);
    setActiveAlbum(validUrlAlbum);
    setActiveIndex(0);
  }

  const filteredImages = useMemo(() => {
    return activeAlbum === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.album === activeAlbum);
  }, [activeAlbum]);

  const activeImage = filteredImages[activeIndex] || filteredImages[0] || GALLERY_IMAGES[0];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % filteredImages.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);

  // Auto Slideshow
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(handleNext, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex, filteredImages.length]);

  return (
    <div className="h-[100dvh] flex flex-col justify-between bg-[var(--page-bg)] text-[var(--text-primary)] overflow-hidden relative selection:bg-accent selection:text-[var(--page-bg)] pb-10 md:pb-12" dir="ltr">
      <div dir="rtl" className="relative z-50">

      </div>
      
      {/* Top Navigation & Header - Flex Top */}
      <div className="relative z-20 flex-none pt-32 md:pt-40 px-6 md:px-12 flex flex-col items-center text-center w-full" dir="rtl">

        {/* Filter Pills - Made smaller and sleeker */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
          {GALLERY_ALBUMS.map((album) => (
            <button
              key={album.id}
              onClick={() => {
                // Update URL parameter without full reload for proper routing structure
                window.history.pushState(null, '', album.id === "all" ? "/gallery" : `/gallery?album=${album.id}`);
                setActiveAlbum(album.id);
                setActiveIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-[11px] md:text-xs font-semibold transition-all duration-300 ${
                activeAlbum === album.id 
                  ? "bg-accent text-[#001529] shadow-[0_0_15px_rgba(212,230,22,0.3)]" 
                  : "bg-transparent text-[var(--text-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              }`}
            >
              {album.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Carousel - Flex Middle */}
      <div className="relative flex-1 w-full flex items-center justify-center z-10 overflow-hidden mt-4 mb-4">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, i) => {
            const distance = i - activeIndex;
            const absDist = Math.abs(distance);
            const isActive = distance === 0;

            if (absDist > 4) return null;

            // Flat 2D Overlap Math
            const translateX = distance * (typeof window !== "undefined" && window.innerWidth < 768 ? 160 : 360); 
            const scale = isActive ? 1 : 1 - (absDist * 0.15);
            const opacity = isActive ? 1 : Math.max(0, 0.4 - absDist * 0.1);
            const zIndex = 50 - absDist;

            return (
              <motion.div
                key={img.id}
                layout
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50) {
                    handleNext();
                    setIsPlaying(false);
                  } else if (swipe > 50) {
                    handlePrev();
                    setIsPlaying(false);
                  }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: translateX,
                  y: 0,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[85vw] sm:w-[500px] md:w-[700px] lg:w-[900px] max-w-[90vw] h-auto aspect-square md:aspect-video max-h-[50vh] md:max-h-[60vh] cursor-pointer group pointer-events-auto !touch-pan-y !touch-pinch-zoom"
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(i);
                    setIsPlaying(false);
                  }
                }}
                style={{ transformOrigin: "center center" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Uncropped View (object-contain) with deep shadow */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className={`rounded-3xl max-w-full max-h-full object-contain transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "scale-100 drop-shadow-[0_30px_60px_var(--shadow-color)]" : "scale-90 opacity-40 blur-[4px]"}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Clean Caption & Navigation Footer - Flex Bottom */}
      <div className="relative z-30 flex-none h-28 md:h-36 px-6 md:px-12 w-full flex items-center justify-between pointer-events-none">
        
        {/* Absolute Bottom Left: Active Title */}
        <div className="flex-1 text-left" dir="ltr">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-[var(--text-primary)] dark:drop-shadow-lg mb-1 tracking-wider uppercase">
                {filteredImages[activeIndex]?.title}
              </h3>
              <span className="text-accent text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 bg-[var(--background)]/80 border border-[#d4e616]/30 rounded">
                {GALLERY_ALBUMS.find(a => a.id === activeAlbum)?.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Media Player Controls */}
        <div className="flex-1 flex justify-center items-center gap-5 pointer-events-auto">
          <button 
            onClick={() => { setIsPlaying(false); handlePrev(); }}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-2xl hover:-translate-x-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-accent text-[#001529] flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,230,22,0.3)]"
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button 
            onClick={() => { setIsPlaying(false); handleNext(); }}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-2xl hover:translate-x-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
          </button>
        </div>

        {/* Right: Counter */}
        <div className="flex-1 text-right font-mono text-xs text-[var(--text-tertiary)] tracking-[0.2em]" dir="ltr">
          {String(activeIndex + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

// Export the page wrapped in a Suspense boundary for `useSearchParams` compatibility in Next.js App Router
export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-[var(--background)]">
        <div className="w-8 h-8 rounded-full border-2 border-[#d4e616] border-t-transparent animate-spin" />
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
