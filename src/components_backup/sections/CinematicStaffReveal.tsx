"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { LazyVideo } from "@/components/ui/LazyVideo";

interface StaffMember {
  id: string;
  show: number;
  hide: number;
  name: string;
  title: string;
  image: string;
  roleDescription?: string;
}

interface CinematicStaffProps {
  id: string;
  frameCount: number;
  folderPath: string;
  badgeText: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  seqLabel: string;
  scrollHeight?: string;
  staffData?: StaffMember[];
}

export function CinematicStaffReveal({
  id,
  frameCount,
  folderPath,
  badgeText,
  titleTop,
  titleBottom,
  description,
  seqLabel,
  scrollHeight,
  staffData,
}: CinematicStaffProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const deepSpaceBgRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);
  const mainTextRef = useRef<HTMLDivElement | null>(null);
  const rightTitleContainerRef = useRef<HTMLDivElement | null>(null);

  // Staff Refs
  const staffTickerContainerRef = useRef<HTMLDivElement | null>(null);
  const staffTickerItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const staffHeroRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Removed image preloading and canvas drawing logic

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;

      if (scrollable <= 0) return;

      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      }
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const renderLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.1;
      const progress = currentProgressRef.current;

      const currentFrame = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)));

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }

      if (seqReadoutRef.current) {
        seqReadoutRef.current.textContent = `المقطع 001 / ${String(currentFrame + 1).padStart(3, "0")}`;
      }

      const fadeInOp = Math.min(1, Math.max(0, progress / 0.05));
      if (videoRef.current) {
        videoRef.current.style.opacity = id === 'cinematic-1' ? "1" : String(fadeInOp);
      }
      if (deepSpaceBgRef.current) {
        deepSpaceBgRef.current.style.opacity = id === 'cinematic-1' ? "1" : String(fadeInOp);
      }

      // Introductory text animation
      let mainTextX = 0;
      let mainTextY = 0;
      let mainTextBlur = 0;
      let mainTextOp = 1;

      if (progress < 0) {
        mainTextX = Math.max(-window.innerWidth, (progress / 0.1) * window.innerWidth);
        mainTextBlur = Math.min(20, -progress * 200);
        mainTextOp = Math.max(0, 1 + progress * 2);
      } else if (progress > 0.08) {
        const fadeProgress = Math.min(1, Math.max(0, (progress - 0.08) / 0.05));
        mainTextOp = 1 - fadeProgress;
        mainTextY = fadeProgress * -150;
        mainTextBlur = fadeProgress * 15;
      }

      if (mainTextRef.current) {
        mainTextRef.current.style.transform = `translate3d(${mainTextX}px, ${mainTextY}px, 0)`;
        mainTextRef.current.style.opacity = String(mainTextOp);
        mainTextRef.current.style.filter = `blur(${mainTextBlur}px)`;
        mainTextRef.current.style.pointerEvents = mainTextOp <= 0.01 ? "none" : "auto";
      }

      // Staff Physics Update
      if (staffData && staffData.length > 0) {
        const N = staffData.length;
        const start = 0.15;
        const end = 0.90;
        const localProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)));

        // Left Ticker Vertical Scroll
        if (staffTickerContainerRef.current) {
           const translateY = -localProgress * 100 * ((N - 1) / N); 
           staffTickerContainerRef.current.style.transform = `translate3d(0, ${translateY}%, 0)`;
           
           let tickerOp = 1;
           if (progress < start) tickerOp = Math.max(0, 1 - (start - progress) * 20);
           if (progress > end) tickerOp = Math.max(0, 1 - (progress - end) * 20);
           
           staffTickerContainerRef.current.style.opacity = tickerOp.toString();
           staffTickerContainerRef.current.style.pointerEvents = tickerOp <= 0.01 ? "none" : "auto";
        }

        const segment = 1 / Math.max(1, N - 1);
        
        for (let i = 0; i < N; i++) {
           const targetCenter = i * segment;
           const dist = Math.abs(localProgress - targetCenter);
           
           // Highlight active ticker item
           const tickerItem = staffTickerItemsRef.current[i];
           if (tickerItem) {
             if (dist < segment * 0.5) {
               tickerItem.style.opacity = "1";
               tickerItem.style.transform = "scale(1.05)";
               tickerItem.style.filter = "grayscale(0%) brightness(1.1)";
               tickerItem.style.borderColor = "rgba(0, 180, 216, 0.8)";
             } else {
               tickerItem.style.opacity = "0.4";
               tickerItem.style.transform = "scale(0.95)";
               tickerItem.style.filter = "grayscale(100%) brightness(0.6)";
               tickerItem.style.borderColor = "rgba(255, 255, 255, 0.1)";
             }
           }

           // Crossfade right hero
           const heroItem = staffHeroRefs.current[i];
           if (heroItem) {
             let heroOp = 0;
             let slideX = 50;
             
             if (dist < segment) {
                const visibility = 1 - (dist / segment);
                heroOp = visibility;
                slideX = (localProgress < targetCenter ? 50 : -50) * (1 - visibility);
             }
             
             if (progress < start) heroOp *= Math.max(0, 1 - (start - progress) * 20);
             if (progress > end) heroOp *= Math.max(0, 1 - (progress - end) * 20);

             if (heroOp <= 0.01) {
               heroItem.style.opacity = "0";
               heroItem.style.pointerEvents = "none";
             } else {
               heroItem.style.opacity = heroOp.toString();
               heroItem.style.pointerEvents = "auto";
               heroItem.style.transform = `translate3d(${slideX}px, 0, 0)`;
             }
           }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [frameCount, id, staffData]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="scroll-animation relative border-t border-white/5 bg-black"
      style={{ height: scrollHeight || "300vh", marginBottom: "-100vh" }}
    >
      <div
        className="sticky top-0 min-h-screen w-full overflow-hidden bg-black z-0"
        style={{ height: "100vh", willChange: "transform", transform: "translateZ(0)" }}
      >
        <LazyVideo
          ref={videoRef}
          src={`/${folderPath}.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

        <div
          ref={deepSpaceBgRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 90%, transparent 30%, rgba(10,10,11,0.45) 70%, rgba(10,10,11,0.85) 100%)",
          }}
        />

        <div className="pointer-events-none absolute left-6 top-24 text-accent md:left-10 md:top-28">
          <HudFrame corner="tl" size={26} />
        </div>
        <div className="pointer-events-none absolute right-6 top-24 text-accent md:right-10 md:top-28">
          <HudFrame corner="tr" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 left-6 text-accent md:bottom-16 md:left-10">
          <HudFrame corner="bl" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 right-6 text-accent md:bottom-16 md:right-10">
          <HudFrame corner="br" size={26} />
        </div>

        <div ref={rightTitleContainerRef} className="pointer-events-none absolute right-6 inset-y-0 z-50 md:right-16 flex flex-col justify-center">
          <div ref={mainTextRef} className="flex flex-col items-end border-r-4 border-blue-500/60 pr-6 md:pr-8 text-right w-max max-w-[90vw] md:max-w-[46ch]" style={{ willChange: "transform, opacity, filter", backfaceVisibility: "hidden" }}>
            {id !== 'cinematic-1' && (
              <div className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] pointer-events-auto mb-5 md:mb-6">
                <EyebrowBadge>{badgeText}</EyebrowBadge>
              </div>
            )}
            <div className="relative self-stretch drop-shadow-[0_10px_40px_rgba(0,0,0,1)] pointer-events-auto mb-5 md:mb-6">
              <h2
                className="font-sans text-5xl font-black leading-[1.1] tracking-tighter text-transparent bg-clip-text md:text-6xl lg:text-[4.5rem]"
                style={{
                  backgroundImage: "linear-gradient(110deg, #fff 30%, #00b4d8 50%, #fff 70%)",
                  backgroundSize: "200% auto",
                }}
              >
                {titleTop}
              </h2>
              {titleBottom && (
                <h2
                  className="font-sans text-5xl font-black leading-[1.1] tracking-tighter text-transparent bg-clip-text md:text-6xl lg:text-[4.5rem] mt-2"
                  style={{
                    backgroundImage: "linear-gradient(110deg, #fff 30%, #00b4d8 50%, #fff 70%)",
                    backgroundSize: "200% auto",
                  }}
                >
                  {titleBottom}
                </h2>
              )}
            </div>
            <p className="max-w-[42ch] font-sans text-sm md:text-lg leading-[1.8] text-zinc-300 dark:drop-shadow-[0_5px_10px_rgba(0,0,0,1)] font-bold pointer-events-auto">
              {description}
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT SIDE HERO CONTAINER                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[60vw] pointer-events-none z-30 overflow-hidden pr-6 md:pr-16" dir="rtl">
          {staffData?.map((staff, i) => (
             <div 
               key={`hero-${staff.id}`}
               ref={(el) => { staffHeroRefs.current[i] = el; }}
               className="absolute inset-0 flex flex-col md:flex-row items-end justify-end will-change-[opacity,transform]"
               style={{ opacity: 0 }}
             >
                <div className="relative z-20 flex flex-col items-start justify-center max-w-sm ml-6 mb-24 md:mb-0 pointer-events-auto">
                   <span className="font-mono text-xs tracking-[0.4em] text-[#00b4d8] uppercase mb-4 opacity-90 dark:drop-shadow-[0_2px_10px_rgba(0,180,216,0.8)]">
                     // {staff.title}
                   </span>
                   <h3 className="font-sans text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                     {staff.name}
                   </h3>
                   <div className="w-12 h-px bg-white/40 mb-6" />
                   <p className="font-sans text-base text-zinc-300 font-light leading-relaxed dark:drop-shadow-[0_5px_10px_rgba(0,0,0,1)] text-right">
                     {staff.roleDescription}
                   </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full md:w-[80%] h-[70vh] md:h-[90vh] pointer-events-none">
                   <Image
                     src={staff.image}
                     alt={staff.name}
                     fill
                     quality={100}
                     className="object-contain object-bottom md:object-left-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                   />
                   <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
             </div>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* LEFT SIDE VERTICAL TICKER                                        */}
        {/* ---------------------------------------------------------------- */}
        {staffData && staffData.length > 0 && (
          <div className="absolute inset-y-0 left-0 w-32 md:w-48 z-40 pointer-events-none overflow-hidden ml-6 md:ml-12 flex flex-col items-center justify-center">
             
             {/* Center Indicator */}
             <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[-10px] w-2 h-2 rounded-full bg-accent -translate-y-1/2" />

             <div 
               ref={staffTickerContainerRef}
               className="w-full flex flex-col gap-10 md:gap-16 pt-[50vh] pb-[50vh] will-change-transform"
             >
               {staffData.map((staff, i) => (
                 <div 
                   key={`ticker-${staff.id}`}
                   ref={(el) => { staffTickerItemsRef.current[i] = el; }}
                   className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-zinc-900 border-2 shrink-0 transition-all duration-300 ease-out will-change-[transform,opacity,filter]"
                   style={{ opacity: 0.4, transform: "scale(0.9)", filter: "grayscale(100%)", borderColor: "rgba(255,255,255,0.1)", pointerEvents: "auto" }}
                 >
                    <Image src={staff.image} alt={staff.name} fill className="object-cover object-top opacity-90" />
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Loading overlay removed since video autoplays */}
      </div>
    </section>
  );
}

