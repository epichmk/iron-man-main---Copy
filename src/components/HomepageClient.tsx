"use client";

import { useEffect, useState } from "react";
import { DesktopHomepage } from "./DesktopHomepage";
import { MobileHomepage } from "./mobile/MobileHomepage";

export function HomepageClient() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent hydration mismatch by rendering nothing until layout is known
  if (isMobile === null) {
    return <div className="w-full h-screen bg-[var(--page-bg)]" />;
  }

  return (
    <div className="w-full">
      {isMobile ? <MobileHomepage /> : <DesktopHomepage />}
    </div>
  );
}


