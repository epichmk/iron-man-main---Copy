"use client";

import React, { useRef, useState, useEffect } from "react";
import { LazyVideo } from "@/components/ui/LazyVideo";
import Link from "next/link";
import { blogData } from "@/lib/blogData";

export function CinematicBlog() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chartreuseOverlayRef = useRef<HTMLDivElement | null>(null);
  
  const headerRef = useRef<HTMLDivElement | null>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  const [loaded, setLoaded] = useState(false);

  // Bind mouse move to container so all overlays can inherit the variables
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Preload video logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.load();

    // Fallback: force loaded after 2s for mobile where video may not autoplay
    const timeout = setTimeout(() => setLoaded(true), 2000);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      clearTimeout(timeout);
    };
  }, []);

  // Scroll physics and render loop
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
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      
      const diff = target - current;
      if (Math.abs(diff) < 0.0001) {
        currentProgressRef.current = target;
      } else {
        currentProgressRef.current += diff * 0.08; // Exact hero banner smooth lerp
      }
      
      const progress = currentProgressRef.current;

      // Video now plays automatically via autoPlay and loop props instead of being scrubbed


      // --- CHARTREUSE FLASHLIGHT PHYSICS ---
      // Fade in the effect only after frame 20
      if (chartreuseOverlayRef.current) {
        const startFrame = 20;
        const fadeLength = 10; // Fades in over 10 frames
        const currentFrame = progress * 570;
        
        let chartreuseOpacity = 0;
        if (currentFrame > startFrame) {
            chartreuseOpacity = Math.min(1, (currentFrame - startFrame) / fadeLength) * 0.8;
        }
        chartreuseOverlayRef.current.style.opacity = String(chartreuseOpacity);
      }

      // --- HEADER PHYSICS (Trigger-based Entry/Exit) ---
      if (headerRef.current) {
        const isHeaderActive = progress >= 0.05 && progress <= 0.9;
        const isHeaderPast = progress > 0.9;

        if (isHeaderActive) {
          headerRef.current.style.opacity = '1';
          headerRef.current.style.transform = 'translate3d(0, 0, 0)';
        } else if (isHeaderPast) {
          headerRef.current.style.opacity = '0';
          headerRef.current.style.transform = 'translate3d(-200px, 0, 0)';
        } else {
          headerRef.current.style.opacity = '0';
          headerRef.current.style.transform = 'translate3d(200px, 0, 0)';
        }
      }

      // --- SCROLLING NARRATIVE PHYSICS (Trigger-based Entry/Exit) ---
      postRefs.current.forEach((post, i) => {
        if (!post) return;
        
        let isActive = false;
        let isPast = false;

        if (i === 0) {
           isActive = progress >= 0.05 && progress < 0.35;
           isPast = progress >= 0.35;
        } else if (i === 1) {
           isActive = progress >= 0.35 && progress < 0.65;
           isPast = progress >= 0.65;
        } else if (i === 2) {
           isActive = progress >= 0.65 && progress < 0.95;
           isPast = progress >= 0.95;
        }

        if (isActive) {
          post.style.opacity = '1';
          post.style.transform = 'translate3d(0, 0, 0)';
          post.style.pointerEvents = 'auto';
        } else if (isPast) {
          post.style.opacity = '0';
          post.style.transform = 'translate3d(-100px, 0, 0)';
          post.style.pointerEvents = 'none';
        } else {
          post.style.opacity = '0';
          post.style.transform = 'translate3d(100px, 0, 0)';
          post.style.pointerEvents = 'none';
        }
      });

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  const featuredPosts = blogData.slice(0, 3);
  const categories = ['تثقيف الخصوبة', 'تكنولوجيا الحقن المجهري', 'الحمل المبكر', 'نصائح عامة'];

  return (
    <section
      ref={sectionRef}
      id="cinematic-blog"
      className="scroll-animation relative bg-[#000814]"
      style={{ height: "600vh" }}
      dir="ltr"
    >
      <div
        ref={containerRef}
        className="relative sticky top-0 h-screen w-full overflow-hidden bg-[#000814] flex flex-col justify-center py-20"
        style={{ height: "100vh", minHeight: "100vh", willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Full Visibility Cinematic Video using pure Video scrubbing */}
        <LazyVideo
          ref={videoRef}
          src="/cinematic-blog-scrub.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover scale-105"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />

        {/* Overlay 1: Deep Blue Tint & Blur. Warps AWAY at cursor (transparent hole) */}
        <div 
          className="pointer-events-none absolute inset-0 z-10 bg-[#06101d]/90 backdrop-blur-md"
          style={{
            WebkitMaskImage: `radial-gradient(circle 400px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), transparent 0%, black 100%)`,
            maskImage: `radial-gradient(circle 400px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), transparent 0%, black 100%)`,
            willChange: "mask-image, -webkit-mask-image"
          }}
        />

        {/* Overlay 2: Chartreuse Glow Tint. Only APPEARS at cursor (solid hole) */}
        <div 
          ref={chartreuseOverlayRef}
          className="pointer-events-none absolute inset-0 z-10 bg-[#c0e816] mix-blend-color opacity-0"
          style={{
            WebkitMaskImage: `radial-gradient(circle 350px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 80%)`,
            maskImage: `radial-gradient(circle 350px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 80%)`,
            willChange: "mask-image, -webkit-mask-image, opacity"
          }}
        />

        {/* Top/Bottom Faders for seamless blending into other sections */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#000814] via-[#000814]/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#000814] via-[#000814]/60 to-transparent z-20 pointer-events-none" />

        {/* Heavy Vignette for Pitch Black Edges */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

        {/* Minimalist Split Screen Architecture - NO CARDS, HEAVY TYPOGRAPHIC SHADOWS */}
        <div className="relative z-30 max-w-[1500px] mx-auto w-full px-6 md:px-12 lg:px-20 h-full flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Right Column (RTL Start) - Architectural Headline */}
          <div 
            ref={headerRef}
            className="w-full md:w-[45%] flex flex-col justify-center opacity-100 md:opacity-0 z-40 relative pt-10 md:pt-0"
            style={{ transition: "opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="text-[#c0e816] text-[12px] tracking-widest font-medium mb-10 flex items-center gap-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              <div className="w-8 h-[1px] bg-[#c0e816] shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
              إخصاب وإنجاب
            </div>
            
            <h2 className="font-heading text-6xl md:text-[80px] lg:text-[100px] font-medium text-white leading-[0.9] tracking-tight m-0 dark:[text-shadow:_0_8px_40px_rgb(0_0_0_/_0.8),_0_2px_10px_rgb(0_0_0_/_0.8)]">
              اقرأ، تعلم،<br />ابدأ رحلتك
            </h2>
            
            <p className="font-sans text-white/90 text-lg md:text-xl font-normal leading-[1.6] mt-10 max-w-sm dark:[text-shadow:_0_4px_24px_rgb(0_0_0_/_0.8),_0_2px_4px_rgb(0_0_0_/_0.8)]">
              مقالات طبية متخصصة صممت لتضع إخصاب وإنجاب الدقيقة بين يديك.
            </p>

            {/* Categories Menu */}
            <div className="mt-20 flex flex-col gap-6">
              <span className="text-[#c0e816] text-[11px] tracking-[0.2em] font-medium uppercase dark:drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">تصفح حسب التصنيف</span>
              <div className="flex flex-wrap gap-4">
                {categories.map(cat => (
                  <Link 
                    href={`/blog/category/${cat}`} 
                    key={cat} 
                    className="font-sans text-[14px] text-white/80 hover:text-white transition-colors duration-300 relative group pb-1 [text-shadow:_0_4px_16px_rgb(0_0_0_/_0.8)]"
                  >
                    {cat}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 group-hover:bg-[#c0e816] transition-colors duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Left Column (RTL End) - Pure Typographic Narrative */}
          <div className="w-full md:w-[55%] relative h-auto md:h-[85vh] mt-12 md:mt-0 flex flex-col md:items-center gap-12 md:gap-0">
            {featuredPosts.map((post, i) => (
              <div 
                key={post.id}
                ref={(el) => { postRefs.current[i] = el; }}
                className="relative md:absolute inset-auto md:inset-0 flex flex-col justify-center w-full opacity-100 md:opacity-0"
                style={{ transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {/* Naked Typography Layout - No Cards */}
                <div className="group w-full flex flex-col">
                  
                  {/* Eyebrow Number */}
                  <div className="mb-6 flex items-center gap-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    <span className="text-[#c0e816] font-sans text-sm font-medium">
                      {String(i+1).padStart(2, '0')}
                    </span>
                    <div className="h-[1px] w-12 bg-[#c0e816]/70 shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
                  </div>

                  {/* Massive Naked Title */}
                  <Link href={`/blog/${post.id}`} className="block">
                    <h3 className="font-heading text-4xl md:text-[52px] lg:text-[60px] text-white font-medium leading-[1.1] mb-8 group-hover:text-[#c0e816] transition-colors duration-500 max-w-[90%] dark:[text-shadow:_0_8px_40px_rgb(0_0_0_/_0.9),_0_2px_10px_rgb(0_0_0_/_0.9)]">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Body Text */}
                  <p className="text-white/80 font-sans text-lg md:text-xl mb-12 max-w-lg leading-relaxed line-clamp-3 font-normal dark:[text-shadow:_0_4px_24px_rgb(0_0_0_/_0.9),_0_2px_4px_rgb(0_0_0_/_0.9)]">
                    {post.excerpt}
                  </p>

                  {/* Flat Footer Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-dashed border-white/40 group-#c0e816]/70 transition-colors duration-500 w-full max-w-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center gap-4 mb-6 sm:mb-0">
                      
                      <span className="text-white/50 text-[13px] font-sans uppercase tracking-widest dark:[text-shadow:_0_4px_16px_rgb(0_0_0_/_0.9)]">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Pill Button - Exact DESIGN.md spec */}
                    <Link 
                      href={`/blog/${post.id}`}
                      className="rounded-[22.5px]  text-white text-[12px] px-8 py-[10px] uppercase tracking-wider font-medium hover:bg-white hover:text-[#000814] transition-all duration-300 bg-black/20 backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                    >
                      اقرأ المقال
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Loading State */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#000814]">
            <div className="text-[#c0e816] font-sans text-[11px] tracking-[0.2em] font-medium animate-pulse">
              جارِ التحميل
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

