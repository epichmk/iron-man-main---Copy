"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { X, CaretLeft, CaretRight, ArrowsClockwise } from "@phosphor-icons/react";
import Image from "next/image";

const feedbackImages = [
  "/clients-feedback/media__1777843245908.jpg",
  "/clients-feedback/media__1777843246016.jpg",
  "/clients-feedback/media__1777843246099.jpg",
  "/clients-feedback/media__1777843246110.jpg",
  "/clients-feedback/media__1777843246189.jpg",
  "/clients-feedback/media__1777843399133.jpg",
  "/clients-feedback/media__1777843399209.jpg",
  "/clients-feedback/media__1777843399240.jpg",
  "/clients-feedback/media__1777843399266.jpg",
  "/clients-feedback/media__1777843399273.jpg"
];

// Helper to avoid hydration mismatches while ensuring unique adjacent columns.
// We stagger the 10 images so each column starts at a different offset.
const extendedImages = [...feedbackImages, ...feedbackImages, ...feedbackImages];

const col1Data = extendedImages.slice(0, 15);
const col2Data = extendedImages.slice(3, 18);
const col3Data = extendedImages.slice(6, 21);
const col4Data = extendedImages.slice(9, 24);
const col5Data = extendedImages.slice(2, 17);

export function CinematicFeedbackGallery() {
  // Removed canvas logic
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalScrollY, setModalScrollY] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const col3Ref = useRef<HTMLDivElement | null>(null);
  const col4Ref = useRef<HTMLDivElement | null>(null);
  const col5Ref = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Removed image preloading and rendering

  // Parallax Scroll Tracking for Modal
  useEffect(() => {
    if (selectedImage) {
      const initialScroll = window.scrollY;
      const onScroll = () => {
        const delta = window.scrollY - initialScroll;
        setModalScrollY(delta);
        if (Math.abs(delta) > 350) {
          setSelectedImage(null);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
        
        if (rect.top <= 0) {
          targetProgressRef.current = Math.min(1, Math.max(0, -rect.top / scrollable));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.1;
      const progress = currentProgressRef.current;

      // Extremely Aggressive Friction for Instant Clarity
      velocityRef.current += (diff * 200 - velocityRef.current) * 0.4;
      const v = velocityRef.current;
      
      const skew = Math.min(Math.max(v * -3, -8), 8); // Max 8deg skew
      const blur = Math.min(Math.abs(v * 0.5), 5); // Max 5px directional motion blur

      // Removed drawFrame call

      // Entry Physics and Text Physics removed in favor of CSS/Framer Motion

      // Cinematic Entrance Fade Animation
      let gridOpacity = 1;
      let gridEntranceBlur = 0;
      
      if (progress < 0.05) {
        gridOpacity = progress / 0.05;
        gridEntranceBlur = (1 - gridOpacity) * 30;
      }

      // 3D Perspective Grid Tilt
      if (gridContainerRef.current) {
        // As you scroll down, physically tilt the grid so you fly *over* it
        const rotX = 30 - (progress * 45); // Tilts backwards
        const rotY = -15 + (progress * 25);
        gridContainerRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(-15deg) scale(1.4)`;
        gridContainerRef.current.style.opacity = String(gridOpacity);
        gridContainerRef.current.style.filter = `blur(${gridEntranceBlur}px)`;
      }

      // Extreme Parallax Columns with Velocity Skew & Volumetric Z-Depth
      const transformCol = (ref: HTMLDivElement | null, moveY: number, z: number) => {
        if (ref) {
          ref.style.transform = `translate3d(0, ${moveY}px, ${z}px) skewY(${skew}deg)`;
          ref.style.filter = `blur(${blur}px)`;
        }
      };
      
      transformCol(col1Ref.current, progress * -1800, -200); // Background
      transformCol(col2Ref.current, progress * -4000, 100);  // Foreground
      transformCol(col3Ref.current, progress * -2500, 300);  // Center is closest to camera
      transformCol(col4Ref.current, progress * -5000, 100);  // Foreground
      transformCol(col5Ref.current, progress * -2000, -200); // Background

      // --- EXIT ANIMATION: Fade up and fade to pure black at the end ---
      // Removed exit animation on contentWrapper in favor of simpler static UI

      // Removed canvas opacity fade

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cinematic-feedback"
      className="scroll-animation relative bg-black"
      style={{ height: "400vh", marginBottom: "-100vh" }}
      dir="ltr"
    >
      <style>
        {`
          .custom-zoom-in {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='rgba(0,8,20,0.8)' stroke='%23c0e816' stroke-width='1.5'/><path d='M12 7 L12 17 M7 12 L17 12' stroke='%23c0e816' stroke-width='1.5' stroke-linecap='round'/></svg>") 12 12, zoom-in !important;
          }
          .custom-zoom-out {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='rgba(0,8,20,0.8)' stroke='%23c0e816' stroke-width='1.5'/><path d='M7 12 L17 12' stroke='%23c0e816' stroke-width='1.5' stroke-linecap='round'/></svg>") 12 12, zoom-out !important;
          }
        `}
      </style>
      <div
        className="sticky top-0 min-h-[100svh] w-full overflow-hidden bg-black flex flex-col justify-center"
        style={{ height: "100svh", willChange: "transform", transform: "translateZ(0)" }}
      >
        <LazyVideo
          src="/clients-feedback.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

        {/* Heavy Vignette for Pitch Black Edges */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

        {/* Deep Space Vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Top Fader connecting previous section */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-black via-black/60 to-transparent z-40 pointer-events-none" />

        {/* Cinematic Bottom Shader: Connecting the Space void into the Deep Blue of the Blog */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black via-black/60 to-transparent z-40 pointer-events-none" />

        {/* Content Wrapper */}
        <div className="relative z-30 w-full h-full flex flex-col justify-center items-center py-[8vh] will-change-transform">
        {/* Split-HUD Architecture */}
        <div className="absolute z-50 top-0 left-0 w-full h-full pointer-events-none flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24" style={{ perspective: "1500px" }}>
          
          {/* Right Side (RTL Start) - Title */}
          <motion.div 
            initial={{ opacity: 0, x: 100, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: "-10%" }}
            className="w-full md:max-w-[45%] text-right mb-8 md:mb-0 will-change-transform" 
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className=" rounded-full px-5 py-1.5 uppercase text-xs tracking-[0.2em] font-medium text-white/60 mb-6 inline-block backdrop-blur-md shadow-[0_0_30px_rgba(192,232,22,0.1)]">
              رسائل الشكر
            </div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-[4rem] font-bold text-white dark:drop-shadow-2xl leading-tight">
              رسائل من القلب
            </h2>
          </motion.div>

          {/* Left Side (RTL End) - Description */}
          <motion.div 
            initial={{ opacity: 0, x: -100, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: "-10%" }}
            className="w-full md:max-w-[35%] will-change-transform"
          >
            <div className="bg-[#000814]/60 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem]  shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c0e816] blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
              <p className="font-sans text-zinc-300 text-base md:text-lg dark:drop-shadow-md font-medium leading-relaxed relative z-10">
                كل رسالة تصلنا هي قصة نجاح جديدة، وفرحة عائلة تمنحنا دافعاً للاستمرار في تقديم الأفضل.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Diagonal 5-Column Grid Container with 3D Perspective Chamber */}
        <div className="absolute inset-0 z-30 pointer-events-none flex justify-center items-center overflow-hidden" style={{ perspective: "1500px" }}>
          <div 
            ref={gridContainerRef}
            className="flex gap-6 pointer-events-auto w-[280vw] md:w-[180vw] max-w-[2000px] will-change-transform"
            style={{ transformStyle: "preserve-3d", transform: 'rotateX(30deg) rotateY(-15deg) rotateZ(-15deg) scale(1.4)' }}
          >
            
            {/* Col 1 */}
            <div ref={col1Ref} className="flex-1 flex flex-col gap-4 md:gap-6 pt-[5vh] will-change-transform">
              {col1Data.map((src, i) => (
                <div key={`c1-${i}`} onClick={() => { setSelectedImage(src); setModalScrollY(0); }} className="w-full p-2 rounded-2xl bg-white/5 backdrop-blur-md  #c0e816] hover:shadow-[0_0_40px_rgba(192,232,22,0.4)] transition-all duration-300 custom-zoom-in group">
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={src} alt="Feedback" className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,8,20,0.8),inset_0_0_20px_rgba(0,0,0,0.9)] mix-blend-multiply group-hover:opacity-50 transition-opacity duration-700" />
                    <div className="absolute inset-0 pointer-events-none  group-#c0e816]/50 transition-colors duration-700" />
                  </div>
                </div>
              ))}
            </div>

            {/* Col 2 */}
            <div ref={col2Ref} className="flex-1 flex flex-col gap-4 md:gap-6 pt-[25vh] will-change-transform">
              {col2Data.map((src, i) => (
                <div key={`c2-${i}`} onClick={() => { setSelectedImage(src); setModalScrollY(0); }} className="w-full p-2 rounded-2xl bg-white/5 backdrop-blur-md  #c0e816] hover:shadow-[0_0_40px_rgba(192,232,22,0.4)] transition-all duration-300 custom-zoom-in group">
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={src} alt="Feedback" className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,8,20,0.8),inset_0_0_20px_rgba(0,0,0,0.9)] mix-blend-multiply group-hover:opacity-50 transition-opacity duration-700" />
                    <div className="absolute inset-0 pointer-events-none  group-#c0e816]/50 transition-colors duration-700" />
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 */}
            <div ref={col3Ref} className="flex flex-1 flex-col gap-4 md:gap-6 pt-[10vh] will-change-transform">
              {col3Data.map((src, i) => (
                <div key={`c3-${i}`} onClick={() => { setSelectedImage(src); setModalScrollY(0); }} className="w-full p-2 rounded-2xl bg-white/5 backdrop-blur-md  #c0e816] hover:shadow-[0_0_40px_rgba(192,232,22,0.4)] transition-all duration-300 custom-zoom-in group">
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={src} alt="Feedback" className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,8,20,0.8),inset_0_0_20px_rgba(0,0,0,0.9)] mix-blend-multiply group-hover:opacity-50 transition-opacity duration-700" />
                    <div className="absolute inset-0 pointer-events-none  group-#c0e816]/50 transition-colors duration-700" />
                  </div>
                </div>
              ))}
            </div>

            {/* Col 4 */}
            <div ref={col4Ref} className="flex flex-1 flex-col gap-4 md:gap-6 pt-[30vh] will-change-transform">
              {col4Data.map((src, i) => (
                <div key={`c4-${i}`} onClick={() => { setSelectedImage(src); setModalScrollY(0); }} className="w-full p-2 rounded-2xl bg-white/5 backdrop-blur-md  #c0e816] hover:shadow-[0_0_40px_rgba(192,232,22,0.4)] transition-all duration-300 custom-zoom-in group">
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={src} alt="Feedback" className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,8,20,0.8),inset_0_0_20px_rgba(0,0,0,0.9)] mix-blend-multiply group-hover:opacity-50 transition-opacity duration-700" />
                    <div className="absolute inset-0 pointer-events-none  group-#c0e816]/50 transition-colors duration-700" />
                  </div>
                </div>
              ))}
            </div>

            {/* Col 5 */}
            <div ref={col5Ref} className="flex-1 flex flex-col gap-4 md:gap-6 pt-[5vh] will-change-transform flex">
              {col5Data.map((src, i) => (
                <div key={`c5-${i}`} onClick={() => { setSelectedImage(src); setModalScrollY(0); }} className="w-full p-2 rounded-2xl bg-white/5 backdrop-blur-md  #c0e816] hover:shadow-[0_0_40px_rgba(192,232,22,0.4)] transition-all duration-300 custom-zoom-in group">
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={src} alt="Feedback" className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,8,20,0.8),inset_0_0_20px_rgba(0,0,0,0.9)] mix-blend-multiply group-hover:opacity-50 transition-opacity duration-700" />
                    <div className="absolute inset-0 pointer-events-none  group-#c0e816]/50 transition-colors duration-700" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div> {/* Close Content Wrapper */}

        {/* Full-Screen Zoom Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300 overflow-hidden"
            onClick={() => setSelectedImage(null)}
          >
            {/* Cinematic Ambient Background */}
            <div className="absolute inset-0 z-[-2] pointer-events-none overflow-hidden">
              <motion.img 
                key={selectedImage} // Ensures smooth transition when image changes
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: 0.5,
                  scale: [1.2, 1.5, 1.3, 1.2],
                  rotate: [0, 5, -5, 0],
                  x: ["0%", "3%", "-3%", "0%"],
                  y: ["0%", "-3%", "3%", "0%"]
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 25, repeat: Infinity, ease: "linear" },
                  rotate: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 22, repeat: Infinity, ease: "easeInOut" }
                }}
                src={selectedImage} 
                alt="" 
                className="w-full h-full object-cover blur-[100px] saturate-200 contrast-125 origin-center" 
              />
            </div>
            
            {/* Vignette Overlay for Depth & Contrast */}
            <div className="absolute inset-0 z-[-1] pointer-events-none bg-black/60 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            <motion.div 
              className="relative flex items-center justify-center w-full h-full"
              onClick={(e) => e.stopPropagation()}
              style={{
                y: -modalScrollY * 0.4, // Parallax translation (opposite to scroll)
                opacity: 1 - Math.abs(modalScrollY) / 350,
              }}
            >
              {selectedImage === "BREAK" ? (
                <img 
                  src="/logo-break.png" 
                  alt="End of Gallery Loop" 
                  className="max-w-[95vw] max-h-[90vh] object-contain opacity-90 animate-in zoom-in-90 duration-500 drop-shadow-[0_0_80px_rgba(192,232,22,0.4)] hover:scale-105 transition-transform"
                />
              ) : (
                <img 
                  src={selectedImage} 
                  alt="Zoomed Feedback" 
                  className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(192,232,22,0.5)] #c0e816]/50 animate-in zoom-in-90 duration-300"
                />
              )}
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/60 hover:bg-red-500 text-white p-1.5 md:p-2.5 rounded-full backdrop-blur-md transition-all duration-300   shadow-xl z-50 group"
                aria-label="Close"
              >
                <X weight="bold" className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Prev Button */}
              {(() => {
                const gallerySequence = [...feedbackImages, "BREAK"];
                const currentIndex = gallerySequence.indexOf(selectedImage);
                const prevIndex = (currentIndex - 1 + gallerySequence.length) % gallerySequence.length;
                return (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(gallerySequence[prevIndex]); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#c0e816] hover:text-black text-white p-2 md:p-3 rounded-full backdrop-blur-md transition-all duration-300  #c0e816] shadow-xl z-50 group"
                    aria-label="Previous image"
                  >
                    <CaretLeft weight="bold" className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                  </button>
                );
              })()}

              {/* Next Button */}
              {(() => {
                const gallerySequence = [...feedbackImages, "BREAK"];
                const currentIndex = gallerySequence.indexOf(selectedImage);
                const nextIndex = (currentIndex + 1) % gallerySequence.length;
                return (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(gallerySequence[nextIndex]); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#c0e816] hover:text-black text-white p-2 md:p-3 rounded-full backdrop-blur-md transition-all duration-300  #c0e816] shadow-xl z-50 group"
                    aria-label="Next image"
                  >
                    <CaretRight weight="bold" className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                  </button>
                );
              })()}
            </motion.div>
          </div>
        )}

        {/* Removed loading overlay */}
      </div>
    </section>
  );
}

