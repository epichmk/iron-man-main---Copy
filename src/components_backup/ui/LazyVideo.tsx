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
    }, [isInView, hasLoaded]);

    useEffect(() => {
      const video = localRef.current;
      if (!video) return;

      if (isInView && hasLoaded) {
        // Attempt to play if it's supposed to be auto-playing
        if (props.autoPlay) {
          video.play().catch(() => {
            // Autoplay might be blocked by browser policy, ignore
          });
        }
      } else {
        // Pause the video when out of view to save mobile GPU/RAM
        video.pause();
      }
    }, [isInView, hasLoaded, props.autoPlay]);

    return (
      <video
        ref={localRef}
        src={hasLoaded ? src : undefined}
        className={className}
        preload="none"
        disablePictureInPicture
        {...props}
      />
    );
  }
);

LazyVideo.displayName = "LazyVideo";
