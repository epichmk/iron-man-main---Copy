"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import servicesData from "@/lib/servicesData.json";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function ServicesScene2Carousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Localized scroll tracker for just this 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // Calculate carousel translation
  // 0 -> 1 progress maps to 0 -> 100% translation
  const carouselX = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Mouse drag state for track
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollY.current = window.scrollY;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
      trackRef.current.style.userSelect = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diffX = e.clientX - startX.current;
    
    // Reverse logic for RTL
    window.scrollTo({
      top: startScrollY.current - (diffX * 3), // multiplier for sensitivity
      behavior: 'auto'
    });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      trackRef.current.style.removeProperty('user-select');
    }
  };

  const nonHeroServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#000814]" 
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 w-full overflow-hidden flex items-center" style={{ height: "100dvh" }}>
        
        {/* Background elements */}
        <LazyVideo 
          src="/services-section-2.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

        {/* Scroll Track */}
        <motion.div 
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="relative z-10 flex flex-row flex-nowrap items-center h-[70vh] md:h-[80vh] cursor-grab pointer-events-auto gap-6 md:gap-12 px-[5vw] will-change-transform"
          style={{ 
            x: carouselX,
            width: "max-content"
          }}
          dir="rtl"
        >
          {/* Title Block for Carousel */}
          <div className="relative h-full w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center pointer-events-none text-right items-start pr-6 md:pr-0">
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8 }}
               className="flex flex-col items-start"
             >
               <h3 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                 خدماتنا التخصصية
               </h3>
               <p className="font-sans text-lg md:text-2xl text-zinc-300 leading-relaxed tracking-wide dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                 مرر للتعرف على المزيد.<br/><span className="text-blue-400 font-bold">اضغط على أي بطاقة</span> لاستكشاف خدماتنا.
               </p>
             </motion.div>
          </div>

          {nonHeroServices.map((service) => (
            <div 
              key={service.id} 
              className="relative w-[85vw] md:w-auto h-[75vh] md:h-[90%] aspect-[3/4] md:aspect-square flex-shrink-0 self-center"
            >
              <ServiceCard {...service} />
            </div>
          ))}
          
          {/* Padding at end of scroll track so last card isn't flush against edge */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
