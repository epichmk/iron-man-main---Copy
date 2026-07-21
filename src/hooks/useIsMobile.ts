"use client";

import { useState, useEffect } from "react";

/**
 * Returns true on viewports < 768px.
 * Starts as `false` on the server / first render to avoid hydration mismatch,
 * then syncs to the real viewport width on mount.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
