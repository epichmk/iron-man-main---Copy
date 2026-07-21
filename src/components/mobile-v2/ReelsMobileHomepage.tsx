import React from "react";
import { ReelHero } from "./sections/ReelHero";
import { ReelBio } from "./sections/ReelBio";

export function ReelsMobileHomepage() {
  return (
    <main 
      id="mobile-main-scroll-v2"
      className="relative z-40 bg-[var(--page-bg)] w-full h-[100svh] overflow-y-auto snap-y snap-mandatory no-scrollbar"
    >
      <ReelHero />
      <ReelBio />
      
      {/* Temporary placeholders so you can scroll and test the activeIndex transitions */}
      <div className="w-full h-[100svh] snap-start bg-zinc-900 flex items-center justify-center text-[var(--text-tertiary)] text-xs">Section 3 Placeholder</div>
      <div className="w-full h-[100svh] snap-start bg-zinc-800 flex items-center justify-center text-[var(--text-tertiary)] text-xs">Section 4 Placeholder</div>
      <div className="w-full h-[100svh] snap-start bg-zinc-900 flex items-center justify-center text-[var(--text-tertiary)] text-xs">Section 5 Placeholder</div>
    </main>
  );
}
