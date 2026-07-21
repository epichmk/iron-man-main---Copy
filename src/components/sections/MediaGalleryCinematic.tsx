"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { CaretLeft, CaretRight, CaretDown } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

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
  const containerRef = useRef<HTMLElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    if (swiper.activeIndex > swiper.previousIndex) {
      setDirection(1);
    } else if (swiper.activeIndex < swiper.previousIndex) {
      setDirection(-1);
    } else {
      setDirection(1);
    }
    setActiveIndex(swiper.realIndex);
    setAnimKey(prev => prev + 1);
  };

  // Animate text elements on slide change
  useGSAP(() => {
    gsap.fromTo(".media-text-element", {
      opacity: 0,
      x: direction > 0 ? -20 : 20,
    }, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { dependencies: [animKey, direction], scope: containerRef });

  // Handle section entrance/exit
  useGSAP(() => {
    gsap.set(".media-content", { opacity: 0 });
    
    // Default stop autoplay if it starts automatically
    if (swiperInstance) {
      swiperInstance.autoplay?.stop();
    }

    const handleIndex = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.index === 5) {
        gsap.to(".media-content", { opacity: 1, duration: 1, ease: "power2.out" });
        swiperInstance?.autoplay?.start();
      } else {
        setTimeout(() => {
          gsap.to(".media-content", { opacity: 0, duration: 0.5 });
          swiperInstance?.autoplay?.stop();
        }, 1000);
      }
    };
    
    window.addEventListener("sectionIndexChanged", handleIndex);
    return () => window.removeEventListener("sectionIndexChanged", handleIndex);
  }, { dependencies: [swiperInstance], scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-[var(--page-bg)] overflow-hidden flex items-center justify-center" dir="rtl">
      
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ 
            clickable: true,
            el: '.gallery-pagination',
            bulletClass: 'gallery-bullet',
            bulletActiveClass: 'gallery-bullet-active',
          }}
          onSlideChange={handleSlideChange}
          loop={true}
          className="w-full h-full"
          allowTouchMove={true}
          grabCursor={true}
        >
          {ALBUM_CARDS.map((card) => (
            <SwiperSlide key={card.id}>
              {({ isActive }) => (
                <div className={`relative w-full h-full transition-transform duration-[4500ms] ease-out ${isActive ? 'scale-[1.07]' : 'scale-100'}`}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    quality={100}
                    unoptimized={true}
                    className="object-cover opacity-60"
                    priority
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)] pointer-events-none z-10" />
      
      <div className="media-content relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pointer-events-none">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 h-full pb-[15vh]">
          
          <div className="hidden md:block w-full md:w-[450px]" />

          <div className="flex flex-col items-center md:items-end text-center md:text-left pointer-events-auto w-full md:w-[450px] relative h-[180px] md:h-[200px]">
            <div className="absolute inset-0 flex flex-col justify-end items-center md:items-end">
              <h3 
                className="media-text-element font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-tertiary)] mb-2 text-center md:text-right dark:[text-shadow:_0px_10px_30px_var(--text-glow)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                {ALBUM_CARDS[activeIndex].title}
              </h3>
              <p 
                className="media-text-element text-[var(--text-secondary)] font-medium leading-[1.5] mb-6 text-center md:text-right dark:[text-shadow:_0_0_15px_var(--text-glow)]"
                style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
              >
                {ALBUM_CARDS[activeIndex].subtitle}
              </p>
              <div className="media-text-element">
                <Link href={ALBUM_CARDS[activeIndex].link}>
                  <button 
                    className="group relative px-8 py-3 overflow-hidden rounded-full font-medium tracking-wide text-[var(--text-primary)] transition-transform duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(90deg, rgba(0,180,216,0.1) 0%, rgba(0,119,182,0.1) 100%)",
                      border: "1px solid rgba(0,180,216,0.4)",
                      boxShadow: "0 0 20px rgba(0,180,216,0.2), inset 0 0 10px rgba(0,180,216,0.1)",
                    }}
                  >
                    <span className="relative z-10 dark:drop-shadow-md">استعرض الألبوم</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="media-content absolute bottom-24 right-6 md:right-8 z-40 flex flex-col items-center gap-4 pointer-events-auto">
        <button onClick={() => swiperInstance?.slidePrev()} className="text-accent hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(212,230,22,0.8)]" aria-label="السابق">
          <CaretRight size={32} weight="bold" />
        </button>
        <button onClick={() => swiperInstance?.slideNext()} className="text-accent hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(212,230,22,0.8)]" aria-label="التالي">
          <CaretLeft size={32} weight="bold" />
        </button>
      </div>

      <div className="media-content absolute bottom-8 left-6 md:left-8 z-40 animate-bounce drop-shadow-[0_0_20px_rgba(212,230,22,1)] pointer-events-none">
        <CaretDown size={28} weight="bold" className="text-accent" />
      </div>

      <div className="media-content absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center pointer-events-auto">
        <div className="gallery-pagination flex gap-2" dir="ltr" />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .gallery-bullet {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: var(--border-strong);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .gallery-bullet-active {
          width: 32px;
          background: var(--border-medium);
        }
        .gallery-bullet-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: #d4e616;
          box-shadow: 0 0 10px rgba(212, 230, 22, 0.8);
          animation: fillProgress 3.5s linear forwards;
        }
        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </section>
  );
}
