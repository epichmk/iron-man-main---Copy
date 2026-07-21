"use client";

import { useEffect } from "react";

/**
 * On mobile phones, framer-motion's whileInView animations never trigger
 * because the IntersectionObserver doesn't fire reliably with heavy videos,
 * sticky positioning, and massive scroll heights. This causes all content
 * to stay stuck at opacity:0 (the initial animation state).
 *
 * This component runs AFTER hydration and forcefully:
 * 1. Cancels all Web Animations API (WAAPI) animations that hide content
 * 2. Forces opacity:1 on hidden elements (but NOT on gradient overlays)
 * 3. Removes blur filters and clip-path hiding
 * 4. Runs on scroll to catch lazy-loaded sections
 */
export function MobileAnimationKiller() {
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    function forceVisible() {
      const elements = document.querySelectorAll("main *");
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;

        // Cancel all WAAPI animations on this element
        if (htmlEl.getAnimations) {
          htmlEl.getAnimations().forEach((anim) => {
            try { anim.cancel(); } catch (_) {}
          });
        }

        const cs = window.getComputedStyle(htmlEl);

        // Skip pointer-events:none elements — these are intentional overlays,
        // gradients, and vignettes that SHOULD have partial opacity
        if (cs.pointerEvents === "none") return;

        // Force visible if computed opacity is near 0
        if (parseFloat(cs.opacity) < 0.05) {
          htmlEl.style.setProperty("opacity", "1", "important");
        }

        // Fix clip-path that clips away 100% of the element
        if (cs.clipPath && cs.clipPath.includes("100%")) {
          htmlEl.style.setProperty("clip-path", "none", "important");
        }

        // Fix blur filters that hide text
        if (cs.filter && cs.filter.includes("blur") && !cs.filter.includes("blur(0")) {
          htmlEl.style.setProperty("filter", "none", "important");
        }

        // Fix transforms that push content off-screen
        if (cs.transform && cs.transform !== "none") {
          const rect = htmlEl.getBoundingClientRect();
          // If element is positioned way outside the viewport, reset transform
          if (rect.top > window.innerHeight * 2 || rect.bottom < -window.innerHeight ||
              rect.left > window.innerWidth * 2 || rect.right < -window.innerWidth) {
            // Don't reset transforms on sticky containers or scroll-driven sections
            if (!htmlEl.closest("[data-cinematic]") || htmlEl.style.transform.includes("translateY")) {
              htmlEl.style.setProperty("transform", "none", "important");
            }
          }
        }
      });
    }

    // Run multiple times to catch dynamically hydrated & lazy-loaded components
    const timers = [
      setTimeout(forceVisible, 300),
      setTimeout(forceVisible, 800),
      setTimeout(forceVisible, 1500),
      setTimeout(forceVisible, 3000),
      setTimeout(forceVisible, 5000),
    ];

    // Also run on scroll to catch content that enters the viewport later
    let scrollTimer: ReturnType<typeof setTimeout>;
    function onScroll() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(forceVisible, 150);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
