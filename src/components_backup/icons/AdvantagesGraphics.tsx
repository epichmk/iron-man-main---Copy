import React from 'react';

export const IconLunchTime = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {/* Stopwatch / Timer */}
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2 2" />
    <path d="M10 3h4" />
  </svg>
);

export const IconCostEffective = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {/* Stack of coins/cylinders */}
    <ellipse cx="12" cy="7" rx="6" ry="2.5" />
    <path d="M6 7v4c0 1.5 2.5 2.5 6 2.5s6-1 6-2.5V7" />
    <path d="M6 11v4c0 1.5 2.5 2.5 6 2.5s6-1 6-2.5v-4" />
  </svg>
);

export const IconNoDowntime = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {/* Sun with rays */}
    <circle cx="12" cy="12" r="4" />
    <path d="M12 4v2" />
    <path d="M12 18v2" />
    <path d="M4 12h2" />
    <path d="M18 12h2" />
    <path d="M6.34 6.34l1.42 1.42" />
    <path d="M16.24 16.24l1.42 1.42" />
    <path d="M6.34 17.66l1.42-1.42" />
    <path d="M16.24 7.76l1.42-1.42" />
  </svg>
);

export const IconSensitivity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {/* Heart with a plus */}
    <path d="M19.5 13.572l-7.5 7.428l-7.5-7.428m0 0a5 5 0 117.5-6.566a5 5 0 117.5 6.572" />
    {/* Plus overlapping */}
    <circle cx="18" cy="16" r="4" fill="#000814" stroke="currentColor" />
    <path d="M16.5 16h3" />
    <path d="M18 14.5v3" />
  </svg>
);

export const IconIncontinence = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {/* Muscle fiber / leaf shape inside a circle */}
    <path d="M21.5 2.5c-4.5 0-9 4-12 8s-6 9-6 9 3 1.5 9-6 8-9 8-12z" />
    <path d="M15 6L8 13" />
    <path d="M18 9l-6 6" />
    <path d="M11 16l-4-4" />
  </svg>
);

export const IconSafe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {/* Three vertical wavy lines */}
    <path d="M8 6c0 2-2 3-2 5s2 3 2 5-2 3-2 5" />
    <path d="M12 6c0 2-2 3-2 5s2 3 2 5-2 3-2 5" />
    <path d="M16 6c0 2-2 3-2 5s2 3 2 5-2 3-2 5" />
  </svg>
);

export const AdvantagesGraphicWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-[#d4e616] flex items-center justify-center bg-transparent mb-6">
    <div className="w-10 h-10 md:w-12 md:h-12 text-[#d4e616]">
      {children}
    </div>
  </div>
);

// Map keys to English titles from JSON
export const advantagesIconsMap: Record<string, React.ReactNode> = {
  "Lunch Time": <IconLunchTime />,
  "Cost Effective": <IconCostEffective />,
  "No Downtime": <IconNoDowntime />,
  "Increase Sensitivity": <IconSensitivity />,
  "Urinary Incontinence": <IconIncontinence />,
  "Safe Treatment": <IconSafe />,
};
