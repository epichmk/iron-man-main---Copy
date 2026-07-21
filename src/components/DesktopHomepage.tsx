"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

import { HeroCinematic } from "@/components/sections/HeroCinematic";
import { DrNajatCinematic } from "@/components/sections/DrNajatCinematic";
import { SystemsNominal } from "@/components/sections/SystemsNominal";
import { ServicesScene1Intro } from "@/components/sections/ServicesScene1Intro";
import { ServicesScene2Carousel } from "@/components/sections/ServicesScene2Carousel";
import { StaffShowcase } from "@/components/sections/StaffShowcase";
import { MediaGalleryCinematic } from "@/components/sections/MediaGalleryCinematic";
import { CinematicTestimonials } from "@/components/sections/CinematicTestimonials";
import { CinematicFeedbackGallery } from "@/components/sections/CinematicFeedbackGallery";
import { CinematicBlog } from "@/components/sections/CinematicBlog";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { Footer } from "@/components/sections/Footer";
import cinematicData from "@/lib/cinematicData.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Observer);
}

const staffEntry = cinematicData.find((d) => d.staffData && d.staffData.length > 0);
const allStaff = staffEntry?.staffData ?? [];

export function DesktopHomepage() {
  const containerRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const isRefreshing = useRef(false);

  const sections = [
    <HeroCinematic key="hero" />,
    <DrNajatCinematic key="drnajat" />,
    <ServicesScene1Intro key="s1" />,
    <ServicesScene2Carousel key="s2" />,
    ...(allStaff.length > 0 ? [<StaffShowcase 
      key="staff"
      staffData={allStaff} 
      frameCount={528}
      folderPath="cinematic-1"
      sectionTitle="القيادة الطبية"
      sectionSubtitle="عقولٌ رائدة"
      sectionDescription="منظومة طبية متكاملة تقودها كفاءات استثنائية، تجمع بين الخبرة العميقة والابتكار التكنولوجي لضمان أعلى مستويات الرعاية والدقة."
    />] : []),
    <MediaGalleryCinematic key="media" />,
    <CinematicTestimonials key="test" />,
    <CinematicFeedbackGallery key="feed" />,
    <CinematicBlog key="blog" />,
    <SystemsNominal key="sys" />,
    <ContactCTASection key="cta" />,
    <div key="footer" className="w-full bg-[var(--page-bg)] min-h-[100dvh] flex flex-col justify-end"><Footer /></div>
  ];

  useGSAP(() => {
    const sectionsElements = sectionsRef.current.filter(Boolean);
    
    // Initial setup: stack all sections absolutely. Hide all except the first one.
    gsap.set(sectionsElements, {
      yPercent: 100,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none"
    });
    
    gsap.set(sectionsElements[0], {
      yPercent: 0,
      opacity: 1,
      zIndex: 10,
      pointerEvents: "auto"
    });

    // Initial state: hide navbar on the first section (Hero Banner)
    window.dispatchEvent(new CustomEvent("footerVisibilityChange", { detail: { isVisible: true } }));
    // Dispatch initial section to trigger preemptive adjacent loading for index 1
    window.dispatchEvent(new CustomEvent("sectionIndexChanged", { detail: { index: 0, direction: 0 } }));

    const gotoSection = (index: number, direction: number) => {
      if (index < 0 || index >= sectionsElements.length || isAnimating.current) return;
      
      isAnimating.current = true;
      const currentSection = sectionsElements[currentIndex.current];
      const nextSection = sectionsElements[index];

      // Keep pointerEvents: "none" during animation so stray wheel events don't scroll inner carousels!
      gsap.set(nextSection, { 
        yPercent: direction === 1 ? 100 : -100, 
        opacity: 0,
        zIndex: 10,
        pointerEvents: "none"
      });
      
      // Push the current section behind the next one, and disable its pointer events
      gsap.set(currentSection, { 
        zIndex: 5,
        pointerEvents: "none" 
      });

      window.dispatchEvent(new CustomEvent("sectionIndexChanged", { detail: { index, direction } }));
      window.dispatchEvent(new CustomEvent("footerVisibilityChange", { detail: { isVisible: index === 0 || index === sectionsElements.length - 1 } }));

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          currentIndex.current = index;
          // Enable pointer events ONLY after the transition is fully complete
          gsap.set(nextSection, { pointerEvents: "auto" });
          
          // We removed the automatic scrollLeft reset to allow carousel persistence
        }
      });

      // Cinematic out-animation: current section pushes back (no scale to prevent jitter) and fades out
      tl.to(currentSection, {
        yPercent: direction === 1 ? -20 : 20,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut"
      }, 0);

      // Cinematic in-animation: next section sweeps in from the edge
      tl.to(nextSection, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut"
      }, 0);
    };

    const triggerPullToRefresh = () => {
      if (isRefreshing.current) return;
      isRefreshing.current = true;
      
      // Invisible Rubber-band effect (just moves the section down slightly and snaps back)
      gsap.to(sectionsElements[0], {
        y: 80,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(sectionsElements[0], {
            y: 0,
            duration: 0.4,
            ease: "power2.in"
          });
          // Reload the page silently
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      });
    };

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: (self) => {
        // Ignore if the swipe is predominantly horizontal
        if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) return;
          // SPECIAL OVERRIDE FOR CAROUSEL SENSITIVITY
          if (currentIndex.current === 3) {
            const isTouch = self.event && (self.event.type.includes("touch") || (self.event as any).pointerType === "touch");
            if (isTouch && Math.abs((self.y ?? 0) - (self.startY ?? 0)) < 180) return;
          }
        gotoSection(currentIndex.current + 1, 1);
      },
      onDown: (self) => {
        // Ignore if the swipe is predominantly horizontal
        if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) return;
          
          // SPECIAL OVERRIDE FOR CAROUSEL SENSITIVITY
          if (currentIndex.current === 3) {
            const isTouch = self.event && (self.event.type.includes("touch") || (self.event as any).pointerType === "touch");
            if (isTouch && Math.abs((self.y ?? 0) - (self.startY ?? 0)) < 180) return;
          }
        
        if (currentIndex.current === 0) {
          const isTouch = self.event && (self.event.type.includes("touch") || (self.event as PointerEvent).pointerType === "touch");
          if (isTouch) {
            triggerPullToRefresh();
          }
        } else {
          gotoSection(currentIndex.current - 1, -1);
        }
      },
      tolerance: 50, // Slightly higher tolerance to require a deliberate vertical swipe
      preventDefault: false
    });

    const handleNext = () => gotoSection(currentIndex.current + 1, 1);
    const handlePrev = () => gotoSection(currentIndex.current - 1, -1);
    const handleScrollToTop = () => gotoSection(0, -1);
    const handleScrollToBottom = () => gotoSection(sections.length - 1, 1);
    
    window.addEventListener("nextSection", handleNext);
    window.addEventListener("scrollUp", handlePrev);
    window.addEventListener("scrollDown", handleNext);
    window.addEventListener("scrollToTop", handleScrollToTop);
    window.addEventListener("scrollToBottom", handleScrollToBottom);

    return () => {
      window.removeEventListener("nextSection", handleNext);
      window.removeEventListener("scrollUp", handlePrev);
      window.removeEventListener("scrollDown", handleNext);
      window.removeEventListener("scrollToTop", handleScrollToTop);
      window.removeEventListener("scrollToBottom", handleScrollToBottom);
      observer.kill();
    };
  }, { scope: containerRef });

  return (
    <main 
      ref={containerRef} 
      // touch-pan-x prevents native vertical scrolling on mobile but allows horizontal swipe carousels
      className="fixed inset-0 z-40 bg-[var(--page-bg)] overflow-hidden overscroll-none touch-pan-x"
    >
      {sections.map((child, i) => (
        <div 
          key={child.key} 
          ref={(el) => { sectionsRef.current[i] = el; }}
          className="absolute inset-0 w-full h-[100dvh] overflow-hidden will-change-transform bg-[var(--page-bg)]"
        >
          {child}
        </div>
      ))}
    </main>
  );
}
