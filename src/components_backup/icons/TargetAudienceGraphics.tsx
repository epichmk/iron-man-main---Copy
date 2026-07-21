import React from 'react';

const BaseGraphic = ({ children, number }: { children: React.ReactNode, number: string }) => (
  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 -rotate-90">
      {/* Pink Arc */}
      <circle 
        cx="50" cy="50" r="42" 
        fill="none" 
        stroke="#0094FE" 
        strokeWidth="6" 
        strokeDasharray="180 263.89" 
        strokeDashoffset="-20"
        strokeLinecap="round" 
      />
      {/* Grey Arc */}
      <circle 
        cx="50" cy="50" r="42" 
        fill="none" 
        stroke="#555555" 
        strokeWidth="6" 
        strokeDasharray="60 263.89" 
        strokeDashoffset="-220"
        strokeLinecap="round" 
      />
    </svg>
    <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-[#0094FE]">
      {children}
    </div>
  </div>
);

export const IconCouple = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    {/* Man */}
    <circle cx="8" cy="5" r="2.5" />
    <path d="M5.5 9h5c1.1 0 2 .9 2 2v6h-1.5v6h-3v-6H6v6H3v-6H1.5v-6c0-1.1.9-2 2-2z" />
    {/* Woman */}
    <circle cx="16" cy="5" r="2.5" />
    <path d="M16 8.5l-3.5 8h2v6.5h3V16.5h2l-3.5-8z" />
  </svg>
);

export const IconWaves = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M2 7c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2" />
    <path d="M2 12c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2" />
    <path d="M2 17c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2" />
  </svg>
);

export const IconHeartMinus = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 .35-.03.69-.08 1.03A5.99 5.99 0 0 0 16 9c-3.31 0-6 2.69-6 6 0 1.95.93 3.68 2.37 4.79L12 21.35z" />
    {/* Minus sign overlapping */}
    <circle cx="18" cy="15" r="5" fill="#0094FE" />
    <path d="M15.5 15h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l3 3" />
    {/* Small dash marks around */}
    <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" strokeWidth="1" />
  </svg>
);

export const IconHealthyPelvis = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full relative">
    {/* Pelvis shape abstract */}
    <path d="M6 5c0 4 1 8 4 12 1 1.5 2 2 2 2s1-.5 2-2c3-4 4-8 4-12" />
    <path d="M12 14v5" />
    {/* Swoosh with heart */}
    <path d="M4 14c0 6 4 8 8 8s8-2 8-8" stroke="#0094FE" strokeWidth="2" />
    <path d="M3.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#0094FE" stroke="none" />
  </svg>
);

export const targetAudienceIcons = [
  <IconCouple key="couple" />,
  <IconWaves key="waves" />,
  <IconHeartMinus key="heart" />,
  <IconClock key="clock" />,
  <IconHealthyPelvis key="pelvis" />
];

export { BaseGraphic };
