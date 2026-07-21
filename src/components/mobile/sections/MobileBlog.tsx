"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import Link from "next/link";
import { blogData } from "@/lib/blogData";

const featuredPosts = blogData.slice(0, 3);
const categories = ['تثقيف الخصوبة', 'تكنولوجيا الحقن المجهري', 'الحمل المبكر', 'نصائح عامة'];

export function MobileBlog() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextPost = () => {
    setDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, featuredPosts.length - 1));
  };
  const prevPost = () => {
    setDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -50) nextPost();
    else if (swipe > 50) prevPost();
  };

  const activePost = featuredPosts[activeIndex];

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[var(--page-bg)]" dir="rtl">
      {/* Background Video */}
      <LazyVideo
        src="/cinematic-blog-scrub.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />

      {/* Deep Blue Tint */}
      <div className="absolute inset-0 z-10 bg-[#06101d]/60" />

      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-[15] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)]" />

      {/* Global Title */}
      <div className="absolute top-16 inset-x-0 z-30 flex flex-col px-6 pointer-events-none">
        <div className="text-[#c0e816] text-[10px] tracking-widest font-medium mb-3 flex items-center gap-3 drop-shadow-[0_4px_4px_var(--shadow-color)]">
          <div className="w-6 h-[1px] bg-[#c0e816] shadow-[0_2px_4px_var(--shadow-color)]"></div>
          إخصاب وإنجاب
        </div>
        <h2 className="font-heading text-[2.5rem] font-medium text-[var(--text-primary)] leading-tight tracking-tight dark:drop-shadow-[0_4px_20px_var(--shadow-color)]">
          اقرأ، تعلم،<br />ابدأ رحلتك
        </h2>
        <p className="font-sans text-[var(--text-primary)] text-sm font-normal leading-[1.6] mt-4 max-w-xs dark:drop-shadow-[0_2px_10px_var(--shadow-color)]">
          مقالات طبية متخصصة صممت لتضع إخصاب وإنجاب الدقيقة بين يديك.
        </p>
      </div>

      {/* Swipeable Blog Posts */}
      <div className="absolute inset-x-0 bottom-32 top-48 z-20 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 1 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full flex flex-col justify-end px-6 pb-6 cursor-grab active:cursor-grabbing"
          >
            {/* Eyebrow Number */}
            <div className="mb-4 flex items-center gap-3 drop-shadow-[0_4px_4px_var(--shadow-color)]">
              <span className="text-[#c0e816] font-sans text-xs font-bold">
                {String(activeIndex+1).padStart(2, '0')}
              </span>
              <div className="h-[1px] w-8 bg-[#c0e816]/70"></div>
            </div>

            {/* Massive Naked Title */}
            <h3 className="font-heading text-3xl text-[var(--text-primary)] font-bold leading-tight mb-4 dark:drop-shadow-[0_4px_20px_rgba(0,0,0,1)] max-w-[280px]">
              {activePost.title}
            </h3>

            {/* Body Text */}
            <p className="text-[var(--text-secondary)] font-sans text-sm mb-6 max-w-[300px] leading-relaxed line-clamp-3 dark:drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
              {activePost.excerpt}
            </p>

            {/* Flat Footer Row */}
            <div className="flex justify-between items-center pt-5 border-t border-dashed border-[var(--border-strong)] drop-shadow-[0_4px_4px_var(--shadow-color)]">
              <span className="text-[var(--text-secondary)] text-[11px] font-sans uppercase tracking-widest">
                {activePost.readTime}
              </span>

              <Link 
                href={`/blog/${activePost.id}`}
                className="rounded-full border border-[var(--border-medium)] text-[var(--text-primary)] text-[11px] px-6 py-2 uppercase tracking-wider font-medium bg-white/70 dark:bg-black/60 backdrop-blur-md"
              >
                اقرأ المقال
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-24 inset-x-0 flex justify-center items-center gap-2 z-40 pointer-events-none" dir="rtl">
        {featuredPosts.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#c0e816] w-4 shadow-[0_0_10px_rgba(192,232,22,0.8)]' : 'bg-[var(--surface-hover)]'}`} 
          />
        ))}
      </div>

      {/* Categories Menu */}
      <div className="absolute bottom-6 inset-x-6 z-40">
        <span className="text-[#c0e816] text-[10px] tracking-[0.2em] font-medium uppercase dark:drop-shadow-[0_4px_4px_var(--shadow-color)] block mb-3">تصفح حسب التصنيف</span>
        <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden snap-x">
          {categories.map(cat => (
            <Link 
              href={`/blog/category/${cat}`} 
              key={cat} 
              className="whitespace-nowrap snap-start px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-white/70 dark:bg-black/60 backdrop-blur-md font-sans text-[11px] text-[var(--text-secondary)]"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
