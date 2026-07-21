"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { HudFrame } from "@/components/ui/HudFrame";
import { DIALOGUES, FRAME_COUNT, HERO_TEXT_FADE_END, framePath } from "@/lib/hero";
import { Hero3DLogo } from "./Hero3DLogo";

const USE_3D_LOGO = true;

function DiagnosticText({ progress }: { progress: number }) {
  return <span></span>;
}
export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const bigLeftTextRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);
  const doctorImageRef = useRef<HTMLDivElement | null>(null);
  const quoteCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const quranRef = useRef<HTMLDivElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const loadedRef = useRef(false);
  const lastFrameRef = useRef(-1);
  const prevVisibleIdsRef = useRef("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (USE_3D_LOGO) {
      const timer = setTimeout(() => {
        loadedRef.current = true;
        setLoaded(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
          loadedRef.current = true;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
          loadedRef.current = true;
          setLoaded(true);
        }
      };
      imgs.push(img);
    }
    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number;
    let drawH: number;
    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    if (window.innerWidth <= 768) {
      drawW *= 1.3;
      drawH *= 1.3;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(1, 1);
    drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
  }, [drawFrame]);

  useEffect(() => {
    // Force scroll to top on mount (hard reset)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (!loaded || USE_3D_LOGO) return;
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [loaded, drawFrame]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const renderLoopRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section || !loadedRef.current) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      targetProgressRef.current = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
    };

    const renderLoop = () => {
      renderLoopRef.current = requestAnimationFrame(renderLoop);
      if (!loadedRef.current) return;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      
      const diff = target - current;
      if (Math.abs(diff) < 0.0001) {
        if (currentProgressRef.current === target && isInitializedRef.current) return; // Avoid redundant updates
        currentProgressRef.current = target;
      } else {
        currentProgressRef.current += diff * 0.08; // Buttery smooth lerp factor
      }
      
      isInitializedRef.current = true;
      const progress = currentProgressRef.current;
      
      // Update state for anything relying on it (will only trigger if changed significantly)
      if (Math.abs(diff) > 0.001) setScrollProgress(progress);

      if (!USE_3D_LOGO) {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT),
        );
        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      }

        if (heroTextRef.current) {
          const opacity = Math.max(0, 1 - progress / HERO_TEXT_FADE_END);
          heroTextRef.current.style.opacity = String(opacity);
          heroTextRef.current.style.transform = `translateY(${(1 - opacity) * 12}px)`;
        }

        if (doctorImageRef.current) {
          // Slide left and fade out as we scroll into the second part (progress > 0)
          const slide = progress * 800; // Move left
          const op = Math.max(0, 1 - (progress / 0.12)); // Fade out completely shortly after scroll starts
          doctorImageRef.current.style.transform = `translateX(-${slide}px)`;
          doctorImageRef.current.style.opacity = String(op);
        }

        if (bigLeftTextRef.current) {
          const children = Array.from(bigLeftTextRef.current.children) as HTMLElement[];
          children.forEach((child, idx) => {
            const enterStart = HERO_TEXT_FADE_END + (idx * 0.015);
            const enterEnd = enterStart + 0.1;
            const isMobile = window.innerWidth < 768;
            const exitStart = isMobile ? 0.10 + (idx * 0.015) : 0.96;
            const exitEnd = isMobile ? exitStart + 0.05 : 1.02;
            
            let op = 0;
            let ty = 30;
            let sc = 0.95;
            
            if (progress < enterStart) {
              op = 0; ty = 30; sc = 0.95;
            } else if (progress >= enterStart && progress < enterEnd) {
              const p = (progress - enterStart) / (enterEnd - enterStart);
              op = p; ty = 30 * (1 - p); sc = 0.95 + 0.05 * p;
            } else if (progress >= enterEnd && progress <= exitStart) {
              op = 1; ty = 0; sc = 1;
            } else if (progress > exitStart && progress <= exitEnd) {
              const p = (progress - exitStart) / (exitEnd - exitStart);
              op = 1 - p; ty = -30 * p; sc = 1 - 0.05 * p;
            } else {
              op = 0; ty = -30; sc = 0.95;
            }
            
            child.style.opacity = String(op);
            child.style.transform = `translateY(${ty}px) scale(${sc})`;
            
            // Maximalist animation for stats if it's the grid (idx === 3)
            if (idx === 3 && op > 0) {
              const statGrid = child;
              const stat1 = statGrid.querySelector('.stat-1');
              const stat2 = statGrid.querySelector('.stat-2');
              const stat3 = statGrid.querySelector('.stat-3');
              
              if (stat1) {
                const val = Math.min(98, Math.floor(op * 98));
                stat1.textContent = `${val}%`;
                stat1.setAttribute('style', `text-shadow: 0 0 ${op * 20}px rgba(212,230,22,0.8); transform: scale(${1 + (1-op)*0.5})`);
              }
              if (stat2) {
                const val = Math.min(30, Math.floor(op * 30));
                stat2.textContent = `+${val}`;
                stat2.setAttribute('style', `text-shadow: 0 0 ${op * 20}px rgba(212,230,22,0.8); transform: scale(${1 + (1-op)*0.5})`);
              }
              if (stat3) {
                const chars = ['I', 'X', '3'];
                const revealIdx = Math.floor(op * 3);
                stat3.textContent = chars.slice(0, revealIdx + 1).join('');
                stat3.setAttribute('style', `text-shadow: 0 0 ${op * 30}px rgba(212,230,22,1); transform: scale(${1 + (1-op)*0.5})`);
              }
            }
          });
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (powerReadoutRef.current) {
          const pwr = 87.3 + Math.sin(progress * Math.PI * 2) * 6.7;
          powerReadoutRef.current.textContent = pwr.toFixed(1) + "%";
        }

        if (powerReadoutRef.current) {
          const pwr = 87.3 + Math.sin(progress * Math.PI * 2) * 6.7;
          powerReadoutRef.current.textContent = pwr.toFixed(1) + "%";
        }

        // 3D Immersive Card Animation
        DIALOGUES.forEach((d, i) => {
          const card = quoteCardsRef.current[i];
          if (!card) return;

          const enterDuration = 0.05;
          const exitDuration = 0.05;
          
          let opacity = 0;
          let translateY = 0;
          let rotateX = 0;
          let scale = 1;
          
          if (progress < d.show - enterDuration) {
             opacity = 0;
             translateY = 150;
             rotateX = 20;
             scale = 0.8;
          } else if (progress >= d.show - enterDuration && progress < d.show) {
             const p = (progress - (d.show - enterDuration)) / enterDuration;
             const easeP = 1 - Math.pow(1 - p, 3);
             opacity = p;
             translateY = 150 * (1 - easeP);
             rotateX = 20 * (1 - easeP);
             scale = 0.8 + 0.2 * easeP;
          } else if (progress >= d.show && progress <= d.hide) {
             opacity = 1;
             translateY = 0;
             rotateX = 0;
             scale = 1;
          } else if (progress > d.hide && progress <= d.hide + exitDuration) {
             const p = (progress - d.hide) / exitDuration;
             const easeP = p * p * p;
             opacity = 1 - p;
             translateY = -150 * easeP;
             rotateX = -20 * easeP;
             scale = 1 + 0.2 * easeP;
          } else {
             opacity = 0;
             translateY = -150;
             rotateX = -20;
             scale = 1.2;
          }

          card.style.opacity = String(opacity);
          card.style.transform = `perspective(1200px) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`;
          card.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
        });

        if (buttonsRef.current) {
          const idx = 4;
          const enterStart = HERO_TEXT_FADE_END + (idx * 0.015);
          const enterEnd = enterStart + 0.1;
          const isMobile = window.innerWidth < 768;
          const exitStart = isMobile ? 0.10 + (idx * 0.015) : 0.96;
          const exitEnd = isMobile ? exitStart + 0.05 : 1.02;
          
          let op = 0;
          let ty = 30;
          let sc = 0.95;
          
          if (progress < enterStart) {
            op = 0; ty = 30; sc = 0.95;
          } else if (progress >= enterStart && progress < enterEnd) {
            const p = (progress - enterStart) / (enterEnd - enterStart);
            op = p; ty = 30 * (1 - p); sc = 0.95 + 0.05 * p;
          } else if (progress >= enterEnd && progress <= exitStart) {
            op = 1; ty = 0; sc = 1;
          } else if (progress > exitStart && progress <= exitEnd) {
            const p = (progress - exitStart) / (exitEnd - exitStart);
            op = 1 - p; ty = -30 * p; sc = 1 - 0.05 * p;
          } else {
            op = 0; ty = -30; sc = 0.95;
          }
          
          buttonsRef.current.style.opacity = String(op);
          buttonsRef.current.style.transform = `translateY(${ty}px) scale(${sc})`;
        }

        if (quranRef.current) {
          const enterStart = 0.80;
          const enterEnd = 0.85;
          const exitStart = 0.96;
          const exitEnd = 1.02;
          
          let op = 0;
          let tz = 0;
          let ty = 0;
          let rx = 0;
          let sc = 1;
          
          if (progress < enterStart) {
             op = 0; ty = 200; tz = -1000; rx = 30; sc = 0.5;
          } else if (progress >= enterStart && progress < enterEnd) {
             const p = (progress - enterStart) / (enterEnd - enterStart);
             const easeP = 1 - Math.pow(1 - p, 4);
             op = p;
             ty = 200 * (1 - easeP);
             tz = -1000 * (1 - easeP);
             rx = 30 * (1 - easeP);
             sc = 0.5 + 0.5 * easeP;
          } else if (progress >= enterEnd && progress <= exitStart) {
             op = 1; ty = 0; tz = 0; rx = 0; sc = 1;
          } else if (progress > exitStart && progress <= exitEnd) {
             const p = (progress - exitStart) / (exitEnd - exitStart);
             const easeP = p * p * p;
             op = 1 - p;
             ty = -200 * easeP;
             tz = 1000 * easeP;
             rx = -30 * easeP;
             sc = 1 + 0.5 * easeP;
          } else {
             op = 0; ty = -200; tz = 1000; rx = -30; sc = 1.5;
          }
          
          quranRef.current.style.opacity = String(op);
          quranRef.current.style.transform = `perspective(1200px) translateZ(${tz}px) translateY(${ty}px) rotateX(${rx}deg) scale(${sc})`;
          quranRef.current.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize initial scroll position
    handleScroll();
    renderLoopRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (renderLoopRef.current) cancelAnimationFrame(renderLoopRef.current);
    };
  }, [loaded, drawFrame]);

  return (
    <section ref={sectionRef} className="scroll-animation relative">
      <div
        className="sticky top-0 min-h-screen w-full overflow-hidden bg-background"
        style={{ height: "100vh", willChange: "transform", transform: "translateZ(0)" }}
      >
        {USE_3D_LOGO ? (
          <Hero3DLogo progress={scrollProgress} />
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ willChange: "contents", transform: "translateZ(0)" }}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, transparent 30%, rgba(10,10,11,0.45) 70%, rgba(10,10,11,0.85) 100%)",
          }}
        />

        {/* Doctor Image placed beautifully on the left/center */}
        <div 
          ref={doctorImageRef}
          className="pointer-events-none absolute bottom-[12vh] left-0 z-[2] h-[45vh] w-full md:bottom-0 md:h-[75vh] md:w-[650px] md:left-12 lg:left-24"
          style={{ transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <div className="relative h-full w-full">
            <img 
              src="/doctor.png?v=2" 
              alt="Dr. Najat Al-Malles" 
              className="absolute h-full w-full object-contain object-bottom"
            />
          </div>
        </div>

        <div className="absolute left-6 top-24 text-accent md:left-10 md:top-28">
          <HudFrame corner="tl" size={26} />
        </div>
        <div className="absolute right-6 top-24 text-accent md:right-10 md:top-28">
          <HudFrame corner="tr" size={26} />
        </div>
        <div className="absolute bottom-14 left-6 text-accent md:bottom-16 md:left-10">
          <HudFrame corner="bl" size={26} />
        </div>
        <div className="absolute bottom-14 right-6 text-accent md:bottom-16 md:right-10">
          <HudFrame corner="br" size={26} />
        </div>

        <div
          ref={heroTextRef}
          className="absolute inset-x-0 top-[18vh] z-10 flex flex-col items-center gap-4 px-6 text-center md:translate-y-0 md:bottom-0 md:top-auto md:gap-6 md:items-start md:px-12 md:pb-28 md:text-right"
          style={{ transition: "opacity 80ms linear" }}
        >
          <EyebrowBadge>المركز الرائد في الحقن المجهري في اليمن</EyebrowBadge>
          <h1 
            className="font-sans text-[2.5rem] font-bold tracking-normal text-white md:text-5xl lg:text-6xl md:whitespace-nowrap leading-[1.3] md:leading-[1.15] lg:leading-[1.15] mx-auto md:mx-0 w-full md:w-auto dark:drop-shadow-md"
          >
            <span className="text-blue-400 inline-block">أول</span> طبيبة أطفال أنابيب في <span className="text-accent">اليمن</span>
          </h1>
          <p className="w-[90%] mx-auto md:mx-0 md:w-auto md:max-w-none font-sans text-base leading-relaxed text-zinc-300 md:text-lg dark:drop-shadow" dir="rtl">
            مركز الدكتورة نجاة الملس التخصصي لأطفال الأنابيب وعلاج العقم.
          </p>
        </div>

        <div
          className="absolute inset-x-6 top-[12vh] z-10 flex flex-col items-center text-center md:inset-x-auto md:right-[50%] md:mr-6 lg:mr-12 md:top-1/2 md:-translate-y-1/2 md:w-[45%] lg:w-[500px] md:items-start md:text-right"
          dir="rtl"
        >
          <div ref={bigLeftTextRef} className="flex flex-col gap-3 md:gap-3 items-center md:items-start w-full">
            <span className="opacity-0 translate-y-8 inline-flex items-center gap-2.5 font-sans text-sm font-semibold tracking-wider text-accent">
              تواصلكم معنا مرحب به
            </span>
            <h2 className="opacity-0 translate-y-8 font-sans font-semibold tracking-normal leading-[1.2] text-white text-2xl md:text-4xl lg:text-[2.75rem] dark:drop-shadow-md">
              <div className="animate-float">بعض الأحلام... لا يمكن لنا ان نعيش من غير تحقيقها</div>
            </h2>
            <p className="opacity-0 translate-y-8 max-w-[50ch] font-sans text-base md:text-lg leading-relaxed text-zinc-300 dark:drop-shadow md:max-w-[450px]" dir="rtl">
              مركز طبي متكامل بأعلى معايير الجودة لتقديم أحدث حلول المساعدة على الإنجاب والحقن المجهري في اليمن
            </p>
            

            
            {/* Desktop Buttons (flows naturally below stats) */}
            <div className="opacity-0 translate-y-8 hidden md:flex flex-row w-full justify-start gap-4 mt-2">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-accent text-[#020817] px-6 py-3 font-sans text-sm font-bold shadow-[0_0_20px_rgba(212,230,22,0.3)] transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex-none"
              >
                إحجز موعد الآن
                <ArrowUpLeft className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="tel:+967733000000"
                className="inline-flex items-center justify-center rounded-full bg-transparent  text-accent px-6 py-3 font-sans text-sm font-bold transition-all hover:bg-accent/10  flex-none"
              >
                مكالمة استشارية
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div
          ref={buttonsRef}
          className="md:hidden absolute inset-x-6 bottom-[4vh] z-50 flex flex-row items-center justify-center gap-3 opacity-0"
          dir="rtl"
        >
          <a
            href="https://wa.me/967733000000?text=مرحباً، أود الاستفسار عن حجز موعد."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 md:px-10 md:py-4 font-sans text-xs md:text-base font-bold text-background transition-all hover:scale-105 hover:bg-accent/90 shadow-[0_0_30px_rgba(212,230,22,0.25)] flex-1 md:flex-none"
          >
            إحجز موعد الآن
          </a>
          <a
            href="tel:+967733000000"
            className="inline-flex items-center justify-center rounded-full bg-transparent  text-accent px-4 py-3 md:px-10 md:py-4 font-sans text-xs md:text-base font-bold transition-all hover:scale-105 hover:bg-accent/10  flex-1 md:flex-none"
          >
            مكالمة استشارية
          </a>
        </div>

        <div className="absolute left-6 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24">
          <div className="h-px w-8 bg-accent/60" />
          <span className="font-sans text-[12px] font-bold tracking-widest text-zinc-400" dir="rtl">
            بإذن الله
          </span>
        </div>

        <div className="absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent"
          >
            87.3%
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-accent"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:mx-10">
            <span>SEQ 001 / 169</span>
            <DiagnosticText progress={scrollProgress} />
            <span>Scroll &darr;</span>
          </div>
        </div>

        {DIALOGUES.map((d, i) => {
          return (
            <div
              key={d.id}
              ref={(el) => {
                quoteCardsRef.current[i] = el;
              }}
              className={`absolute inset-x-4 top-[55%] -translate-y-1/2 md:top-1/2 md:left-[50%] md:ml-6 lg:ml-12 z-20 md:w-[500px] lg:w-[600px] md:inset-x-auto pointer-events-none will-change-transform`}
              style={{ opacity: 0, transform: "perspective(1200px) translateZ(-800px) translateY(100px) rotateX(20deg) scale(0.8)" }}
            >
              <figure className="relative w-full h-[280px] md:h-[350px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] ">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  {d.image && (
                    <Image 
                      src={d.image} 
                      alt="Dr. Najat" 
                      fill 
                      unoptimized
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/90 via-[#020817]/40 to-transparent" />
                </div>
                
                {/* Content over image */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8 text-center md:text-right" dir="rtl">
                  <blockquote className="font-sans text-xl md:text-2xl font-bold leading-tight tracking-tight text-white dark:drop-shadow-md">
                    {d.quote.split('\n')[0]}
                  </blockquote>
                  <p className="mt-3 font-sans text-sm md:text-base text-zinc-300 whitespace-pre-line leading-relaxed dark:drop-shadow">
                    {d.quote.substring(d.quote.indexOf('\n') + 1)}
                  </p>
                </div>
                
                {/* Right border accent */}
                <div className="absolute top-0 right-0 w-1 h-full rounded-full bg-gradient-to-b from-accent to-transparent shadow-[0_0_15px_rgba(212,230,22,0.6)] z-20 hidden md:block" />
              </figure>
            </div>
          );
        })}

        {/* Quranic Verse - Appears after the last quote */}
        <div
          ref={quranRef}
          className="absolute inset-x-6 top-[55%] -translate-y-1/2 md:top-1/2 md:left-[50%] md:ml-6 lg:ml-12 z-20 md:w-[500px] lg:w-[600px] md:inset-x-auto pointer-events-none will-change-transform"
          style={{ opacity: 0, transform: "perspective(1200px) translateZ(-1000px) translateY(200px) rotateX(30deg) scale(0.5)" }}
        >
          <div className="relative flex flex-col items-center justify-center p-8 md:p-12 text-center pointer-events-none">
            <div className="relative z-10 flex flex-col items-center gap-6 animate-float">
              <Image 
                src="/nmc/rbi.png" 
                alt="Quran Verse" 
                width={600} 
                height={300} 
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-background px-6">
            <EyebrowBadge>SUIT UP PROTOCOL // BOOTING</EyebrowBadge>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <div
                className="h-full bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              Loading Mark LXXXV &nbsp;&middot;&nbsp; {Math.round(loadProgress * 100)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

