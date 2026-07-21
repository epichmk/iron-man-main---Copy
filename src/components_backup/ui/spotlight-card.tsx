'use client';
import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'brand';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, isHovering: false });

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;
    let currentX = 0;
    let currentY = 0;

    const animateContinuous = () => {
      time += 0.06; // HIGH SPEED continuous motion
      
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        let targetX = 0;
        let targetY = 0;
        
        // Crazy complex fast orbit (Lissajous curve combined with sine waves)
        const orbitX = centerX + Math.cos(time) * (rect.width * 0.7) + Math.sin(time * 2.5) * (rect.width * 0.15);
        const orbitY = centerY + Math.sin(time * 1.3) * (rect.height * 0.7) + Math.cos(time * 2.1) * (rect.height * 0.15);
        
        if (mouse.current.isHovering) {
          targetX = mouse.current.x;
          targetY = mouse.current.y;
          cardRef.current.style.setProperty('--spotlight-size', `calc(${rect.width * 4}px)`);
          cardRef.current.style.setProperty('--spot-intensity', '2.5'); // EXPLOSIVE bright on hover
        } else {
          targetX = orbitX;
          targetY = orbitY;
          cardRef.current.style.setProperty('--spotlight-size', `calc(${rect.width * 1.8}px)`);
          cardRef.current.style.setProperty('--spot-intensity', '1.5');
        }

        currentX += (targetX - currentX) * 0.25;
        currentY += (targetY - currentY) * 0.25;

        // Secondary opposite complex orbit
        const secX = centerX + Math.cos(time * 1.2 + Math.PI) * (rect.width * 0.6) + Math.sin(time * 3) * (rect.width * 0.1);
        const secY = centerY + Math.sin(time * 1.7 + Math.PI) * (rect.height * 0.6) + Math.cos(time * 2.8) * (rect.height * 0.1);

        cardRef.current.style.setProperty('--x', currentX.toFixed(2));
        cardRef.current.style.setProperty('--y', currentY.toFixed(2));
        cardRef.current.style.setProperty('--sec-x', secX.toFixed(2));
        cardRef.current.style.setProperty('--sec-y', secY.toFixed(2));
      }
      animationFrameId = requestAnimationFrame(animateContinuous);
    };

    animationFrameId = requestAnimationFrame(animateContinuous);

    const handlePointerMove = (e: PointerEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    
    const handlePointerEnter = () => { mouse.current.isHovering = true; };
    const handlePointerLeave = () => { mouse.current.isHovering = false; };

    const el = cardRef.current;
    if (el) {
      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerenter', handlePointerEnter);
      el.addEventListener('pointerleave', handlePointerLeave);
      const rect = el.getBoundingClientRect();
      currentX = rect.width / 2;
      currentY = rect.height / 2;
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (el) {
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerenter', handlePointerEnter);
        el.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, []);

  const getInlineStyles = () => {
    return {
      '--radius': '32',
      '--border-size': '3px',
      '--backdrop': 'transparent',
      '--backup-border': 'rgba(255, 255, 255, 0.15)', // ALWAYS VISIBLE FAINT BORDER!
      backgroundColor: 'transparent',
      backgroundAttachment: 'local',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
    } as React.CSSProperties;
  };

  const beforeAfterStyles = `
    [data-glow-wrapper] > [data-glow]::before,
    [data-glow-wrapper] > [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: local;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      transition: filter 0.3s ease;
    }
    
    /* Aggressive Neon frames */
    [data-glow-wrapper] > [data-glow]::before {
      background-image: 
        radial-gradient(
          calc(var(--spotlight-size) * 1.5) calc(var(--spotlight-size) * 1.5) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
          rgba(0, 180, 216, calc(1 * var(--spot-intensity, 1))), transparent 100%
        ),
        radial-gradient(
          calc(var(--spotlight-size) * 1.2) calc(var(--spotlight-size) * 1.2) at calc(var(--sec-x, 0) * 1px) calc(var(--sec-y, 0) * 1px),
          rgba(212, 230, 22, calc(1 * var(--spot-intensity, 1))), transparent 100%
        );
      filter: brightness(4) contrast(3) saturate(3); /* INSANELY BRIGHT */
    }
    
    /* White core highlight in the frame */
    [data-glow-wrapper] > [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        rgba(255, 255, 255, calc(1 * var(--spot-intensity, 1))), transparent 100%
      );
    }

    /* Outer ambient blur for the frame */
    [data-glow-inner] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: 1;
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 5);
      filter: blur(20px);
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow-inner]::before {
      content: "";
      position: absolute;
      inset: -15px;
      border-width: 15px;
      border: 15px solid transparent;
      border-radius: calc(var(--radius) * 1.2 * 1px);
      background-attachment: local;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      background-image: 
        radial-gradient(
          calc(var(--spotlight-size) * 2) calc(var(--spotlight-size) * 2) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
          rgba(0, 180, 216, calc(1 * var(--spot-intensity, 1))), transparent 100%
        ),
        radial-gradient(
          calc(var(--spotlight-size) * 1.5) calc(var(--spotlight-size) * 1.5) at calc(var(--sec-x, 0) * 1px) calc(var(--sec-y, 0) * 1px),
          rgba(212, 230, 22, calc(0.8 * var(--spot-intensity, 1))), transparent 100%
        );
      filter: brightness(2) saturate(1.5);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow-wrapper
        data-glow
        style={getInlineStyles()}
        className={`
          ${customSize ? '' : 'w-full h-full'}
          rounded-[32px] 
          relative 
          flex flex-col
          p-0 
          shadow-[0_0_20px_rgba(0,180,216,0.15)] /* FAINT OUTER GLOW CONSTANT */
          transition-all duration-500 ease-out 
          hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(0,180,216,0.3)]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow-inner></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
          {children}
        </div>
      </div>
    </>
  );
};

export { GlowCard };
