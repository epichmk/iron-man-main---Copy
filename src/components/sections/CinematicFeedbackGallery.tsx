"use client";

import { useState, useRef } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import 'swiper/css';

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

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

const defaultRow1 = feedbackImages.map((src, i) => ({ src, originalIndex: i }));
const defaultRow2 = [...defaultRow1].reverse();

export function CinematicFeedbackGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [swiper1, setSwiper1] = useState<SwiperType | null>(null);
  const [swiper2, setSwiper2] = useState<SwiperType | null>(null);
  const [row1Items, setRow1Items] = useState(defaultRow1);
  const [row2Items, setRow2Items] = useState(defaultRow2);

  useGSAP(() => {
    const shuffled1 = [...defaultRow1].sort(() => Math.random() - 0.5);
    const shuffled2 = [...defaultRow2].sort(() => Math.random() - 0.5);
    setRow1Items([...shuffled1, ...shuffled1, ...shuffled1]);
    setRow2Items([...shuffled2, ...shuffled2, ...shuffled2]);
    gsap.set(".s7-header-el", { opacity: 0, y: 30 });
    gsap.set(".s7-carousel", { opacity: 0, scale: 0.95 });

    if (swiper1) swiper1.autoplay.stop();
    if (swiper2) swiper2.autoplay.stop();

    const playEntrance = () => {
      const tl = gsap.timeline();
      tl.to(".s7-header-el", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.2);
      tl.to(".s7-carousel", { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 0.5);
      
      swiper1?.autoplay?.start();
      swiper2?.autoplay?.start();
    };

    const resetState = () => {
      gsap.set(".s7-header-el", { opacity: 0, y: 30 });
      gsap.set(".s7-carousel", { opacity: 0, scale: 0.95 });
      swiper1?.autoplay?.stop();
      swiper2?.autoplay?.stop();
    };

    const handleIndex = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.index === 7) {
        playEntrance();
      } else {
        setTimeout(() => { resetState(); }, 1000);
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);
    return () => window.removeEventListener("sectionIndexChanged", handleIndex);
  }, { dependencies: [swiper1, swiper2], scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] bg-[var(--page-bg)] overflow-hidden flex flex-col justify-center items-center pt-8 pb-24 md:py-8">
      
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img src="/studio_spotlight_bg.png" alt="Studio Spotlight" className="absolute inset-0 w-full h-full object-cover opacity-[var(--theme-bg-img-opacity)]" />
        <div className="absolute inset-0 bg-[var(--page-bg)]/70 mix-blend-multiply" />
      </div>

      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_80%,var(--gradient-radial-edge)_100%)] pointer-events-none" />

      <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-center text-center md:text-right px-4 mb-4 md:mb-6 gap-4 md:gap-12 pointer-events-none w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
          <div className="s7-header-el">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] dark:drop-shadow-2xl leading-tight whitespace-nowrap">
              كلمات من القلب
            </h2>
          </div>
          <div className="s7-header-el"><EyebrowBadge>رسائلكم تسعدنا</EyebrowBadge></div>
        </div>

        <div className="s7-header-el flex md:flex-1 justify-center md:justify-start items-end md:pb-2">
          <p className="text-[var(--text-secondary)] text-base md:text-xl w-11/12 max-w-[40ch] md:max-w-2xl font-light text-center md:text-right leading-relaxed text-balance" dir="rtl">
            نشارككم فرحتكم ونسعد بسماع تجاربكم الناجحة معنا.
          </p>
        </div>
      </div>

      <div className="s7-carousel relative z-10 w-full md:flex-grow flex flex-col items-center justify-center gap-4 md:gap-6 mask-edges-horizontal">
        
        <div className="w-full">
          <Swiper
            onSwiper={setSwiper1}
            slidesPerView={'auto'}
            spaceBetween={16}
            centeredSlides={true}
            dir="rtl"
            speed={12000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            modules={[Autoplay]}
            className="w-full ease-linear"
          >
            {row1Items.map((item, i) => (
              <SwiperSlide key={`row1-${i}`} className="!w-auto !h-auto">
                <img 
                  src={item.src} 
                  alt="Feedback" 
                  onClick={() => setLightboxIndex(item.originalIndex)}
                  className="h-[180px] md:h-[220px] w-auto max-w-none object-contain rounded-3xl shadow-[0_10px_30px_var(--shadow-color)] border border-[var(--border-subtle)] hover:scale-105 hover:border-blue-500/30 transition-all duration-500 cursor-pointer"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full">
          <Swiper
            onSwiper={setSwiper2}
            slidesPerView={'auto'}
            spaceBetween={16}
            centeredSlides={true}
            dir="rtl"
            speed={12000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: true }}
            loop={true}
            modules={[Autoplay]}
            className="w-full ease-linear"
          >
            {row2Items.map((item, i) => (
              <SwiperSlide key={`row2-${i}`} className="!w-auto !h-auto">
                <img 
                  src={item.src} 
                  alt="Feedback" 
                  onClick={() => setLightboxIndex(item.originalIndex)}
                  className="h-[180px] md:h-[220px] w-auto max-w-none object-contain rounded-3xl shadow-[0_10px_30px_var(--shadow-color)] border border-[var(--border-subtle)] hover:scale-105 hover:border-blue-500/30 transition-all duration-500 cursor-pointer"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        close={() => setLightboxIndex(-1)}
        slides={feedbackImages.map(src => ({ src }))}
        plugins={[Zoom]}
        carousel={{ finite: false }}
        controller={{ closeOnPullUp: true, closeOnPullDown: true }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          scrollToZoom: true
        }}
        styles={({
          root: { 
            "--yarl__navigation_button_margin": "20vw", 
            "--yarl__toolbar_margin": "2rem"
          } as any,
          buttonPrev: { backgroundColor: "var(--shadow-color)", borderRadius: "50%", padding: "12px", border: "1px solid var(--border-medium)" },
          buttonNext: { backgroundColor: "var(--shadow-color)", borderRadius: "50%", padding: "12px", border: "1px solid var(--border-medium)" },
          buttonClose: { backgroundColor: "var(--shadow-color)", borderRadius: "50%", padding: "12px", border: "1px solid var(--border-medium)", position: "absolute", right: "20vw", top: "2rem" },
          buttonZoom: { backgroundColor: "var(--shadow-color)", borderRadius: "50%", padding: "12px", border: "1px solid var(--border-medium)", marginRight: "1rem" }
        }) as any}
      />

      <style dangerouslySetInnerHTML={{__html: `
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}} />

    </section>
  );
}
