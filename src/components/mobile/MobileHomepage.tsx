"use client";

import React, { useState, useCallback } from "react";
import { MobileHero } from "./sections/MobileHero";
import { MobileDrNajat } from "./sections/MobileDrNajat";
import { MobileServicesIntro } from "./sections/MobileServicesIntro";
import { MobileIX3 } from "./sections/MobileIX3";
import { MobileServicesCarousel } from "./sections/MobileServicesCarousel";
import { MobileServicesOutro } from "./sections/MobileServicesReveal";
import { MobileStaffShowcase } from "./sections/MobileStaffShowcase";
import { MobileMediaGallery } from "./sections/MobileMediaGallery";
import { MobileTestimonials } from "./sections/MobileTestimonials";
import { MobileFeedbackGallery } from "./sections/MobileFeedbackGallery";
import { MobileBlog } from "./sections/MobileBlog";
import { MobileContactCTA } from "./sections/MobileContactCTA";
import { MobileSystemsNominal } from "./sections/MobileSystemsNominal";
import { MobileFooter } from "./sections/MobileFooter";

export function MobileHomepage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const scrollY = e.currentTarget.scrollTop;
    // use window.innerHeight for mobile full-screen sections
    const height = window.innerHeight;
    // adding a small offset to ensure it triggers before exact snap
    const index = Math.round(scrollY / height);
    setActiveIndex(index);
  }, []);

  return (
    <main 
      id="mobile-main-scroll" 
      onScroll={handleScroll}
      className="relative z-40 bg-[var(--page-bg)] w-full h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth"
    >
      <MobileHero isActive={activeIndex === 0} />
      <MobileDrNajat isActive={activeIndex === 1} />
      <MobileServicesIntro />
      <MobileIX3 />
      <MobileServicesCarousel />
      <MobileServicesOutro />
      <MobileStaffShowcase />
      <MobileMediaGallery />
      <MobileTestimonials />
      <MobileFeedbackGallery />
      <MobileBlog />
      <MobileSystemsNominal />
      <MobileContactCTA />
      <MobileFooter />
    </main>
  );
}
