"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { CaretLeft, CaretRight, CaretDown } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface StaffMember {
  id: string;
  name: string;
  title: string;
  roleDescription?: string;
  image: string;
}

interface StaffShowcaseProps {
  staffData: StaffMember[];
  frameCount?: number;
  folderPath?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
}

const PROMO_TEXTS = [
  "نلتزم برعاية شاملة تبدأ من فهم عميق لاحتياجاتك، لنبني أساساً متيناً لصحة مستدامة ومسارات علاجية متطورة.",
  "نوجه ابتكاراتنا الطبية ورؤيتنا الاستراتيجية نحو هدف واحد: تقديم بيئة رعاية متكاملة تضع المريض في قلب الاهتمام.",
  "تضمن تقنياتنا وعياداتنا المتقدمة الدقة القصوى، لنمنح مرضانا الثقة الكاملة في كل خطوة نحو التعافي.",
  "نحلل أدق التفاصيل الطبية لنقدم حلولاً متكاملة، ونرعى الحالات بشمولية واهتمام بالغ وخبرة لا تضاهى.",
  "نحيط مراجعينا بعناية فائقة، ونرسم معاً مستقبلهم الصحي بأعلى معايير الرعاية والأمان.",
];

export function StaffShowcase({
  staffData,
  sectionTitle = "القيادة الطبية",
  sectionSubtitle = "عقولٌ رائدة",
}: StaffShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isActiveSection, setIsActiveSection] = useState(false);

  // Mouse drag to scroll refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAbs = Math.abs(scrollLeft);
    const index = Math.round(scrollAbs / clientWidth);
    
    if (index !== activeIndex && index >= 0 && index < staffData.length) {
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    const targetScroll = -(index * clientWidth);
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isHovered || !isActiveSection) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = prev >= staffData.length - 1 ? 0 : prev + 1;
        if (scrollRef.current) {
          const clientWidth = scrollRef.current.clientWidth;
          const targetScroll = -(nextIndex * clientWidth);
          scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
        }
        return nextIndex;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [staffData.length, isHovered, isActiveSection]);

  // GSAP: Animate Carousel Items on Active Index Change
  useGSAP(() => {
    staffData.forEach((_, i) => {
      if (i === activeIndex) {
        gsap.to(`.staff-img-${i}`, { scale: 1, opacity: 1, filter: "brightness(1) ", duration: 1.2, ease: "power3.out" });
        gsap.to(`.staff-txt-${i}`, { x: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: "power3.out" });
      } else {
        gsap.to(`.staff-img-${i}`, { scale: 0.85, opacity: 0.2, filter: "brightness(0.4) ", duration: 1.2, ease: "power3.out" });
        gsap.to(`.staff-txt-${i}`, { x: i < activeIndex ? -60 : 60, opacity: 0, duration: 0.9, ease: "power3.out" });
      }
    });
  }, { dependencies: [activeIndex, staffData], scope: containerRef });

  // GSAP: Section Entrance
  useGSAP(() => {
    gsap.set(".s4-header", { opacity: 0, y: -30 });
    gsap.set(".s4-nav", { opacity: 0, x: -50 });
    gsap.set(".s4-carousel", { opacity: 0, scale: 0.95 });

    const playEntrance = () => {
      const tl = gsap.timeline();
      tl.to(".s4-header", { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out" }, 0.5);
      tl.to(".s4-carousel", { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }, 0.6);
      tl.to(".s4-nav", { opacity: 1, x: 0, duration: 1, ease: "elastic.out(1, 0.7)" }, 1.2);
    };

    const resetState = () => {
      gsap.set(".s4-header", { opacity: 0, y: -30 });
      gsap.set(".s4-nav", { opacity: 0, x: -50 });
      gsap.set(".s4-carousel", { opacity: 0, scale: 0.95 });
    };

    let isFullPage = false;
    const handleIndex = (e: Event) => {
      isFullPage = true;
      const customEvent = e as CustomEvent;
      const mySection = containerRef.current?.closest('main > div');
      if (mySection && mySection.parentElement) {
        const myIndex = Array.from(mySection.parentElement.children).indexOf(mySection);
        if (customEvent.detail.index === myIndex) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);

    const observer = new IntersectionObserver((entries) => {
      if (isFullPage) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("sectionIndexChanged", handleIndex);
      observer.disconnect();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="staff-showcase"
      className="relative w-full h-[100dvh] bg-[var(--page-bg)] overflow-hidden flex flex-col justify-center"
      dir="rtl"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <LazyVideo src="/staff-section-video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[var(--theme-bg-img-opacity)]" />
        
        {/* Unified Cinematic Edge Fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)] pointer-events-none z-10" />
        
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)] z-[5]" />
      </div>

      <div className="absolute top-8 md:top-12 inset-x-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none">
        <div className="s4-header inline-flex items-center gap-3 mb-2">
          <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-transparent" />
          <span className="text-blue-600 dark:text-blue-400 font-mono tracking-widest text-sm font-bold uppercase">{sectionSubtitle}</span>
          <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent" />
        </div>
        <h2 className="s4-header text-2xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight mb-4">{sectionTitle}</h2>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          isDragging.current = false;
          if (scrollRef.current) scrollRef.current.style.scrollSnapType = 'x mandatory';
        }}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onTouchCancel={() => setIsHovered(false)}
        onMouseDown={(e) => {
          isDragging.current = true;
          if (scrollRef.current) {
            scrollRef.current.style.scrollSnapType = 'none'; // Disable snap during drag
            startX.current = e.pageX - scrollRef.current.offsetLeft;
            scrollLeftStart.current = scrollRef.current.scrollLeft;
          }
        }}
        onMouseUp={() => {
          isDragging.current = false;
          if (scrollRef.current) scrollRef.current.style.scrollSnapType = 'x mandatory';
        }}
        onMouseMove={(e) => {
          if (!isDragging.current || !scrollRef.current) return;
          e.preventDefault();
          const x = e.pageX - scrollRef.current.offsetLeft;
          const walk = (x - startX.current) * 1.5;
          scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
        }}
        className="s4-carousel relative z-20 w-full h-full flex flex-row overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
      >
        {staffData.map((staff, i) => (
          <div key={staff.id} className="relative w-full h-full flex-shrink-0 snap-center snap-always flex items-center justify-center">
            
            <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 md:left-[14vw] md:top-[55%] md:bottom-auto md:translate-x-0 md:-translate-y-1/2 z-[22] pointer-events-none h-[50dvh] md:h-[75vh] w-full md:w-[40vw] flex justify-center md:block`}>
              <div className={`staff-img-${i} relative w-full h-full flex justify-center md:block`}>
                <Image src={staff.image} alt={staff.name} fill className="object-contain object-bottom md:object-center drop-shadow-[0_20px_50px_var(--shadow-color)]" sizes="(max-width: 768px) 100vw, 50vw" quality={100} />
              </div>
            </div>

            <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[15vw] md:top-[50%] md:-translate-y-1/2 z-[30] w-[80vw] md:w-[500px]`}>
              <div className={`staff-txt-${i} flex flex-col justify-start items-center md:items-start text-center md:text-right gap-2 w-full`}>
                <div className="flex flex-col items-center md:items-start gap-1 w-full">
                  <div className="inline-flex items-center gap-2 mb-1 relative z-10">
                    <span className="font-mono tracking-[0.2em] uppercase px-4 py-1.5 rounded-full" style={{ background: "linear-gradient(90deg, rgba(0,180,216,0.15) 0%, rgba(0,119,182,0.05) 100%)", border: "1px solid rgba(0,180,216,0.3)", color: "#00b4d8", boxShadow: "0 0 15px rgba(0,180,216,0.2)", fontSize: "clamp(0.6rem, 1vw, 0.75rem)" }}>
                      {staff.title}
                    </span>
                  </div>
                  <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-tertiary)] relative z-10 w-full" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 1.1 }}>
                    {staff.name}
                  </h3>
                </div>

                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent my-1" />
                
                <div className="flex flex-col items-center md:items-start gap-4 w-full">
                  {staff.roleDescription && (
                    <p className="text-[var(--text-secondary)] font-medium leading-[1.5] relative z-10 w-full" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", maxWidth: "60ch" }}>
                      {staff.roleDescription}
                    </p>
                  )}
                  <p className="text-[var(--text-tertiary)] font-light leading-[1.6] relative z-10 w-full mt-2" style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)", maxWidth: "55ch" }}>
                    {PROMO_TEXTS[i % PROMO_TEXTS.length]}
                  </p>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="s4-nav absolute bottom-24 right-6 md:right-8 z-40 flex flex-col items-center gap-4 pointer-events-auto">
        <button onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} className="text-accent hover:scale-110 transition-transform duration-300 disabled:opacity-20 disabled:scale-100 drop-shadow-[0_0_15px_rgba(212,230,22,0.8)]">
          <CaretRight size={32} weight="bold" />
        </button>
        
        <button onClick={() => scrollToIndex(Math.min(staffData.length - 1, activeIndex + 1))} disabled={activeIndex === staffData.length - 1} className="text-accent hover:scale-110 transition-transform duration-300 disabled:opacity-20 disabled:scale-100 drop-shadow-[0_0_15px_rgba(212,230,22,0.8)]">
          <CaretLeft size={32} weight="bold" />
        </button>
      </div>

      <div className="s4-nav absolute bottom-8 left-6 md:left-8 z-40 animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(212,230,22,1)] pointer-events-none">
        <CaretDown size={28} weight="bold" className="text-accent" />
      </div>
    </section>
  );
}
