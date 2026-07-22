"use client";

import React, { useRef, useState, useEffect, forwardRef } from "react";
import { useInView } from "framer-motion";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  margin?: string;
}

export const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({ src, margin = "200px 0px", className, ...props }, forwardedRef) => {
    // We use a local ref for intersection observation
    const localRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(localRef, { margin: margin as any });
    const [hasLoaded, setHasLoaded] = useState(false);

    // Synchronize forwarded ref with our local ref
    useEffect(() => {
      if (!forwardedRef) return;
      if (typeof forwardedRef === "function") {
        forwardedRef(localRef.current);
      } else {
        forwardedRef.current = localRef.current;
      }
    }, [forwardedRef]);

    useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }

      // ULTIMATE BACKGROUND PRELOADER
      // If the user sits on the website for minutes, use that idle time to slowly 
      // download every video in sequence so they never buffer.
      if (!hasLoaded) {
        const wrapper = localRef.current?.closest(".section-wrapper");
        const indexStr = wrapper?.getAttribute("data-index");
        const myIndex = indexStr ? parseInt(indexStr, 10) : 0;
        
        // Stagger the loads: 5 seconds per section index
        const timer = setTimeout(() => {
          setHasLoaded(true);
        }, myIndex * 5000 + 5000); 

        return () => clearTimeout(timer);
      }
    }, [isInView, hasLoaded]);

    // Preemptive loading & iOS Memory Management via GSAP section events
    useEffect(() => {
      const video = localRef.current;
      if (!video) return;

      const wrapper = video.closest(".section-wrapper");
      if (!wrapper) return;
      
      const indexStr = wrapper.getAttribute("data-index");
      if (!indexStr) return;
      
      const myIndex = parseInt(indexStr, 10);

      const handleSectionChange = (e: Event) => {
        const { index } = (e as CustomEvent).detail;
        const distance = Math.abs(index - myIndex);
        
        if (distance <= 2) {
          // Preload active and the next TWO adjacent sections
          setHasLoaded(true);
        }
        // Removed the memory-drop (setHasLoaded(false)) so the network buffer is never lost!
        
        // Handle playback
        if (distance !== 0) {
          video.pause();
        } else if (props.autoPlay) {
          video.play().catch(() => {});
        }
      };

      window.addEventListener("sectionIndexChanged", handleSectionChange);
      return () => window.removeEventListener("sectionIndexChanged", handleSectionChange);
    }, [props.autoPlay]);

    // Fallback playback handler for standard scroll components (non-GSAP)
    useEffect(() => {
      const video = localRef.current;
      if (!video) return;
      // Only handle playback via isInView if it's NOT a GSAP section 
      // (to avoid conflicting with the event listener above)
      if (!video.closest(".section-wrapper")) {
        if (isInView && hasLoaded) {
          if (props.autoPlay) video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    }, [isInView, hasLoaded, props.autoPlay]);

    return (
      <video
        ref={localRef}
        src={hasLoaded ? src : undefined}
        className={className}
        preload="metadata"
        disablePictureInPicture
        playsInline
        webkit-playsinline="true"
        {...props}
      />
    );
  }
);

LazyVideo.displayName = "LazyVideo";
