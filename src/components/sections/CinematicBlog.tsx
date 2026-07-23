"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import { LazyVideo } from "@/components/ui/LazyVideo";
import Link from "next/link";
import { blogData } from "@/lib/blogData";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { CaretLeft } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function CinematicBlog() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useGSAP(() => {
    gsap.set(".s8-header-el", { opacity: 0, y: 30 });
    gsap.set(".s8-carousel", { opacity: 0, y: 50 });

    if (swiperInstance) swiperInstance.autoplay?.stop();

    const playEntrance = () => {
      const tl = gsap.timeline();
      tl.to(".s8-header-el", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.2);
      tl.to(".s8-carousel", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.5);
      
      swiperInstance?.autoplay?.start();
    };

    const resetState = () => {
      gsap.set(".s8-header-el", { opacity: 0, y: 30 });
      gsap.set(".s8-carousel", { opacity: 0, y: 50 });
      swiperInstance?.autoplay?.stop();
    };

    const handleIndex = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.index === 8) {
        playEntrance();
      } else {
        setTimeout(() => { resetState(); }, 1000);
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);
    return () => window.removeEventListener("sectionIndexChanged", handleIndex);
  }, { dependencies: [swiperInstance], scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[var(--page-bg)] overflow-hidden flex flex-col justify-center"
      dir="rtl"
    >
      <div className="absolute inset-0 w-full h-[100dvh] overflow-hidden pointer-events-none z-0">
        <LazyVideo src="/cinematic-blog-scrub.mp4" poster="/cinematic-blog-scrub-poster.jpg" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
        {/* Unified Cinematic Edge Fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)] z-[5]" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 mb-8 pointer-events-none">
        <div className="s8-header-el"><EyebrowBadge>المعرفة قوة</EyebrowBadge></div>

        <div className="s8-header-el">
          <h2 className="text-3xl md:text-6xl font-black text-[var(--text-primary)] mt-4 max-w-4xl leading-tight">
            المدونة الطبية
          </h2>
        </div>

        <div className="s8-header-el flex justify-center">
          <p className="text-[var(--text-secondary)] text-base md:text-lg mt-4 max-w-2xl font-light mx-auto">
            مقالات ونصائح طبية موثوقة لدعم رحلتكم.
          </p>
        </div>
      </div>

      <div className="s8-carousel relative z-20 w-full px-[5%] mt-[5vh]">
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[FreeMode, Mousewheel, Autoplay]}
          direction="horizontal"
          slidesPerView="auto"
          spaceBetween={24}
          freeMode={true}
          mousewheel={{ forceToAxis: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          className="w-full !overflow-visible"
        >
          {blogData.map((post) => (
            <SwiperSlide key={post.id} className="!w-[300px] md:!w-[400px]">
              <Link href={`/blog/${post.id}`}>
                <div className="group relative w-full h-[220px] rounded-3xl overflow-hidden bg-white/70 dark:bg-black/60 border border-[var(--border-subtle)] hover:border-blue-400/50 transition-all duration-500 shadow-[0_20px_40px_var(--shadow-color)] backdrop-blur-md">
                  <div className="absolute inset-0 flex flex-col justify-center p-6">
                    <div className="inline-flex items-center gap-2 mb-3 max-w-full">
                      <span className="px-3 py-1 bg-chartreuse/20 text-chartreuse border border-chartreuse/30 rounded-full text-xs font-mono uppercase tracking-widest whitespace-nowrap truncate inline-block max-w-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 leading-tight group-hover:text-chartreuse transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          
          <SwiperSlide className="!w-[30vw] md:!w-[200px]">
            <Link href="/blog">
              <div className="h-[220px] flex flex-col items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors gap-4">
                <CaretLeft size={48} weight="thin" />
                <span className="font-mono text-sm tracking-widest uppercase">عرض الكل</span>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>

    </section>
  );
}
