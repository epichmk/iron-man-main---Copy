"use client";

import { useRef, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { HubNavbar } from "@/components/ui/HubNavbar";
import { HubFooter } from "@/components/sections/HubFooter";
import { BlogPost, blogData } from "@/lib/blogData";
import { getWhatsAppLink } from "@/lib/whatsappMessages";

interface CinematicBlogPostProps {
  post: BlogPost;
}

export function CinematicBlogPost({ post }: CinematicBlogPostProps) {
  // Parse the HTML content string into structured sections
  const sections = useMemo(() => {
    return post.content
      .split("<h2>")
      .filter(Boolean)
      .map((section) => {
        const [titlePart, ...bodyParts] = section.split("</h2>");
        const title = titlePart.trim();
        const body = bodyParts
          .join("</h2>")
          .replace(/<p>/g, "")
          .replace(/<\/p>/g, "\n\n")
          .trim();
        return { title, body };
      });
  }, [post.content]);

  const WA = `مرحباً، أود الاستفسار بعد قراءة مقال "${post.title}" وحجز موعد.`;

  // Progress
  const { scrollYProgress } = useScroll();
  const pw = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 80, damping: 30 });

  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroImgScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <div className="relative w-full bg-[var(--page-bg)] selection:bg-accent/30 selection:text-[var(--text-primary)]" dir="rtl">
      {/* Progress */}
      <motion.div className="fixed top-0 left-0 w-full h-1 bg-accent origin-left z-50 mix-blend-difference" style={{ width: pw }} />
      
      <HubNavbar />

      {/* ══════════════════════════════════════════════════════════
          HERO (Abstract Brutalism)
          ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--page-bg)]">
        
        {/* Abstract Geometry Background */}
        <motion.div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen" style={{ y: heroImgY, scale: heroImgScale }}>
          {post.category.includes("IVF") && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full border-[1px] border-[#d4e616]/10 animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] rounded-full border-[1px] border-[#0066FF]/10 animate-[spin_90s_linear_infinite_reverse]" />
              <div className="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full bg-gradient-to-tr from-[#0066FF]/10 to-[#d4e616]/10 blur-3xl" />
            </div>
          )}
          {post.category.includes("Male") && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-0 right-10 w-[30vw] h-[150vh] bg-gradient-to-b from-[#0066FF]/5 to-transparent skew-x-[30deg] blur-2xl" />
              <div className="absolute bottom-0 left-10 w-[20vw] h-screen bg-gradient-to-t from-[#d4e616]/5 to-transparent -skew-x-[30deg] blur-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.05)_0%,transparent_80%)]" />
            </div>
          )}
          {!post.category.includes("IVF") && !post.category.includes("Male") && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] bg-[#0066FF]/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.01)_75%,transparent_75%,transparent)] bg-[size:100px_100px]" />
            </div>
          )}
        </motion.div>
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-l from-[var(--page-bg)] via-transparent to-transparent" />

        <motion.div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto" style={{ y: heroTextY, opacity: heroOpacity }}>
          {/* Top Bar */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border-subtle)] pb-6">
            <div className="flex items-center gap-4">
              <span className="text-[#0066FF] font-mono text-[10px] tracking-[0.4em] uppercase font-bold px-3 py-1 #0066FF]/30 rounded-none">{post.category}</span>
              <span className="text-[var(--text-muted-light)] font-mono text-[10px] tracking-[0.2em]">{post.readTime}</span>
            </div>
            <Link href="/blog" className="text-[var(--text-muted-light)] hover:text-[var(--text-primary)] font-mono text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2">
              <ArrowRight size={14} /> العودة للمكتبة
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,5vw,5.5rem)] font-black text-[var(--text-primary)] leading-[1.1] tracking-tight mb-8 max-w-[1200px]"
          >
            {post.title}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-[var(--text-tertiary)] text-base md:text-xl font-light max-w-[600px] leading-[1.8] text-balance">
              {post.excerpt}
            </p>
            <div className="text-left md:text-right border-t border-[var(--border-subtle)] pt-4 md:border-t-0 md:pt-0 md:border-r md:pr-6">
              
              <p className="text-zinc-600 font-mono text-[10px] tracking-wider uppercase mt-1">{post.date}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DYNAMIC ENGINE
          ══════════════════════════════════════════════════════════ */}
      {sections.map((section, index) => {
        // Layout 1: Intro (Asymmetric Massive Quote style)
        if (index === 0) {
          return (
            <section key={index} className="relative w-full py-32 md:py-40 overflow-hidden">
              <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start"
                >
                  <div className="lg:w-1/3">
                    <span className="text-[#0066FF] font-mono text-[10px] tracking-[0.4em] uppercase block mb-6">/ 01 تمهيد</span>
                    <h2 className="text-[2.5rem] md:text-[3.5rem] font-black text-[var(--text-primary)] leading-[1.1] tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-[2] font-light max-w-[800px] whitespace-pre-wrap">
                      {section.body}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        }

        // Layout 2: Odd index (Split brutalist)
        if (index % 2 !== 0) {
          return (
            <section key={index} className="relative w-full py-32 border-y border-[var(--border-subtle)] overflow-hidden">
              <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-20">
                  <span className="text-zinc-600 font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">
                    / 0{index + 1}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.3]">
                    {section.title}
                  </h2>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 relative">
                  <div className="hidden md:block absolute top-0 bottom-0 right-[25%] w-[1px] bg-[var(--surface-elevated)]" />
                  
                  <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-3">
                    <div className="w-16 h-16 #d4e616]/30 rounded-none flex items-center justify-center mb-6">
                      <span className="text-accent font-mono text-xl font-black">0{index + 1}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="md:col-span-9 md:pr-8">
                    <p className="text-[var(--text-tertiary)] text-lg leading-[2.2] font-light whitespace-pre-wrap max-w-3xl">
                      {section.body}
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        }

        // Layout 3: Even index (Typography Heavy / Centered)
        return (
          <section key={index} className="relative w-full py-32 md:py-48 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 text-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <span className="text-[#0066FF] font-mono text-[10px] tracking-[0.4em] uppercase block mb-8">/ 0{index + 1}</span>
                <h2 className="text-[2rem] md:text-[4rem] font-black text-[var(--text-primary)] leading-[1.2] tracking-tight text-balance max-w-5xl mx-auto">
                  {section.title}
                </h2>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-16 max-w-3xl mx-auto text-right border-r-2 border-[#d4e616] pr-8">
                <p className="text-[var(--text-secondary)] text-lg leading-[2] font-light whitespace-pre-wrap">
                  {section.body}
                </p>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ══════════════════════════════════════════════════════════
          RELATED ARTICLES
          ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-24 border-t border-[var(--border-subtle)] bg-[var(--page-bg)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              استكشف المزيد
            </h3>
            <Link href="/blog" className="text-[var(--text-muted-light)] hover:text-accent font-mono text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2">
              جميع المقالات <ArrowLeft size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogData.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost, i) => (
              <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group block  bg-[var(--page-bg)] #d4e616]/30 transition-all duration-500 p-6">
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <span className="text-[#0066FF] font-mono text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 #0066FF]/20 mb-4 inline-block">
                      {relatedPost.category}
                    </span>
                    <h4 className="text-[var(--text-primary)] font-bold text-lg leading-tight group-hover:text-accent transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                    <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase">{relatedPost.readTime}</span>
                    <ArrowLeft size={14} className="text-[var(--text-muted-light)] group-hover:text-accent transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HubFooter />
    </div>
  );
}

