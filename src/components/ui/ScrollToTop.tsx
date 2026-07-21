"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CaretUp, CaretDown, CaretDoubleUp, CaretDoubleDown } from "@phosphor-icons/react";

export function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const lastScrollY = useRef(0);

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleIndexChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { index, direction: dir } = customEvent.detail;
      setDirection(index === 0 ? "down" : dir === -1 ? "up" : "down");
      setIsVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setIsVisible(false), 2500);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we reached the absolute bottom (footer)
      const isAtBottom = currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 150;
      
      if (isAtBottom) {
        setDirection("up");
      } else if (currentScrollY < lastScrollY.current - 10) {
        // User is scrolling UP (with a small 10px buffer to prevent jitter)
        setDirection("up");
      } else if (currentScrollY > lastScrollY.current + 10) {
        // User is scrolling DOWN
        setDirection("down");
      }
      
      lastScrollY.current = currentScrollY;
      
      setIsVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setIsVisible(false), 2500);
    };

    const handleFooter = (e: Event) => {
      setIsFooterVisible((e as CustomEvent).detail.isVisible);
    };

    window.addEventListener("sectionIndexChanged", handleIndexChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("footerVisibilityChange", handleFooter);
    
    setIsVisible(true);
    hideTimeout = setTimeout(() => setIsVisible(false), 3000);

    return () => {
      window.removeEventListener("sectionIndexChanged", handleIndexChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("footerVisibilityChange", handleFooter);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleStep = () => {
    if (direction === "up") {
      window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("scrollUp"));
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("scrollDown"));
    }
  };

  const handleJump = () => {
    if (direction === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("scrollToTop"));
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("scrollToBottom"));
    }
  };

  if (pathname === "/gallery" || pathname === "/contact") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="fixed bottom-6 right-6 z-[9999] md:bottom-8 md:right-8 flex flex-row items-end gap-3"
        >
          {/* Main Step Button */}
          <button
            onClick={handleStep}
            aria-label={direction === "up" ? "Previous Section" : "Next Section"}
            title={direction === "up" ? "Scroll up" : "Scroll down"}
            className={`flex h-11 w-11 md:h-12 md:w-12 items-center justify-center transition-all duration-300 hover:scale-110 dark:drop-shadow-[0_2px_10px_var(--shadow-color)] ${
              direction === "up" 
                ? "text-accent hover:text-[#e8fb1a]" 
                : "text-[#0066FF] hover:text-[#3388ff]"
            }`}
          >
            {direction === "up" ? (
              <CaretUp size={28} weight="bold" />
            ) : (
              <CaretDown size={28} weight="bold" />
            )}
          </button>

          {/* Small Jump Button (Hero/Footer) */}
          <button
            onClick={handleJump}
            aria-label={direction === "up" ? "Hero" : "Footer"}
            title={direction === "up" ? "Jump to top" : "Jump to bottom"}
            className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center transition-all duration-300 hover:scale-110 dark:drop-shadow-[0_2px_10px_var(--shadow-color)] ${
              direction === "up" 
                ? "text-accent hover:text-[#e8fb1a]" 
                : "text-[#0066FF] hover:text-[#3388ff]"
            }`}
          >
            {direction === "up" ? (
              <CaretDoubleUp size={20} weight="bold" />
            ) : (
              <CaretDoubleDown size={20} weight="bold" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
