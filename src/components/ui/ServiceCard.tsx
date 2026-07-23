"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface ServiceCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  featured?: boolean;
  index?: number;
  benefits?: { label: string; value: string }[];
}

export function ServiceCard({ id, title, image, description, featured, index = 0, benefits }: ServiceCardProps) {
  const isIx3 = id === 'ix73-icsi-imsi';
  const [isFlipped, setIsFlipped] = useState(false);
  
  const imageLightSrc = id === 'ix73-icsi-imsi' ? "/services/lightmode/ix73-icsi-imsi_light.jpg" : `/services/lightmode/${id}_light.jpg`;
  
  return (
    <div 
      className={`group relative w-full h-full md:perspective-1000 ${featured || isIx3 ? 'z-10' : ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)} // Allow clicking to flip
    >
      {/* MOBILE LAYOUT: Full-width Stacked Layout */}
      <div 
        className="flex md:hidden flex-col h-full w-[100vw] relative border-none justify-center items-center py-8" 
        dir="rtl"
      >
        {/* TOP: Title Block */}
        <div className="w-full flex-none px-6 z-20 text-center mb-6">
          <h3 className={`font-sans text-lg md:text-xl font-medium tracking-wide dark:drop-shadow-[0_4px_20px_var(--shadow-color)] ${isIx3 ? 'text-[#0094FE]' : featured ? 'text-accent' : 'text-[var(--text-primary)]'}`}>
            {title}
          </h3>
        </div>

        {/* MIDDLE: Uncropped Image Area with Side Fades */}
        <div className="relative w-full flex-none flex items-center justify-center mb-6">
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0094FE]/5 to-transparent blur-3xl rounded-full scale-150 pointer-events-none" />
          
          <Image 
            src={image} 
            alt={title} 
            width={800}
            height={800}
            draggable={false} 
            className="hide-in-light w-full h-auto object-contain drop-shadow-[0_20px_50px_var(--shadow-color)] z-10" 
            quality={100} 
            priority={index === 0}
          />
          <Image 
            src={imageLightSrc} 
            alt={title} 
            width={800}
            height={800}
            draggable={false} 
            className="hide-in-dark w-full h-auto object-contain drop-shadow-[0_20px_50px_var(--shadow-color)] z-10" 
            quality={100} 
            priority={index === 0}
          />

          {/* Fading Masks on Left and Right */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent z-20 pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-6 right-6 flex justify-between items-start z-20 pointer-events-none">
            {isIx3 ? (
              <div className="flex items-center justify-center scale-[0.7] origin-top-left">
                <div className="relative flex items-center justify-center w-12 h-12">
                  <svg className="absolute w-full h-full animate-spin-slow opacity-80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="10 5" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 15" className="origin-center -rotate-90" />
                  </svg>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_#3b82f6]" />
                </div>
              </div>
            ) : <div />}

            {featured && !isIx3 ? (
              <div className="scale-75 origin-top-right">
                <div className="relative overflow-hidden flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-accent/10 backdrop-blur-md border border-blue-200 dark:border-accent/40 rounded-full shadow-[0_0_20px_rgba(212,230,22,0.2)]">
                  <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-accent animate-pulse shadow-[0_0_10px_#d4e616]" />
                  <span className="relative z-10 text-[10px] font-sans font-bold tracking-widest text-blue-600 dark:text-accent uppercase pt-[1px]">خدمة مميزة</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* BOTTOM: Description and Buttons */}
        <div className="w-full flex-none flex flex-col justify-end items-center text-center px-6 z-20 pb-0">
          <p className="font-sans text-[var(--text-secondary)] text-[14px] md:text-base leading-[1.5] font-normal line-clamp-3 w-full max-w-[340px] dark:drop-shadow-[0_2px_8px_var(--shadow-color)] mb-2">
            {description}
          </p>

          {/* Premium Action Buttons */}
          <div className="flex flex-col w-full max-w-[320px] gap-2 pointer-events-auto">
            <div onClick={(e) => e.stopPropagation()} className="w-full">
              <Link href={`/services/${id}`} className="group relative w-full flex items-center justify-center py-3 rounded-2xl overflow-hidden bg-blue-600 border border-blue-500 hover:bg-blue-500 transition-colors shadow-[0_0_30px_rgba(37,99,235,0.25)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite] skew-x-12" />
                <span className="relative z-10 font-sans font-bold tracking-[0.15em] text-[14px] text-[var(--text-primary)] uppercase">
                  اكتشف التقنية
                </span>
              </Link>
            </div>
            
            <div onClick={(e) => e.stopPropagation()} className="w-full">
                <a href="https://wa.me/967781878443" target="_blank" rel="noopener noreferrer" className="relative w-full flex items-center justify-center py-2.5 rounded-2xl bg-green-50 text-green-600 dark:bg-accent/10 dark:text-accent text-[13px] font-sans font-bold tracking-widest uppercase transition-colors hover:bg-green-100 dark:hover:bg-accent/20 border border-green-200 dark:border-[#d4e616]/30 shadow-[0_0_15px_rgba(34,197,94,0.1)] dark:shadow-[0_0_15px_rgba(212,230,22,0.1)]">
                  <span className="relative z-10">تواصل معنا</span>
                </a>
              </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT: 3D Flip */}
      <motion.div 
        className="hidden md:block relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25, mass: 1.2 }}
      >
        
        {/* Front Face */}
        <div className={`absolute inset-0 backface-hidden bg-[var(--page-bg)] overflow-hidden ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'} ${featured && !isIx3 ? 'ring-1 ring-inset ring-accent/30 shadow-[inset_0_0_20px_rgba(212,230,22,0.05)]' : 'ring-1 ring-inset ring-[var(--border-subtle)]'}`}>
          
          {/* Elite Minimal Badges */}
          {isIx3 && (
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center justify-center">
              {/* Elite Scanning Badge */}
              <div className="relative flex items-center justify-center w-12 h-12">
                <svg className="absolute w-full h-full animate-spin-slow opacity-80" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 5" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5 15" className="origin-center -rotate-90" />
                </svg>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                <span className="absolute -bottom-4 text-accent text-[7px] font-mono tracking-widest uppercase">SYS.NEW</span>
              </div>
            </div>
          )}

            {featured && !isIx3 && (
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <div className="relative overflow-hidden flex items-center gap-2 px-3 py-1 bg-yellow-50 dark:bg-accent/10 backdrop-blur-md border border-yellow-200 dark:border-accent/30 rounded-full shadow-[0_0_15px_rgba(212,230,22,0.15)] group-hover:border-yellow-400 dark:group-hover:border-accent/60 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 dark:via-accent/10 to-transparent -translate-x-full animate-[sweep_2s_ease-in-out_infinite]" />
                  <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-accent animate-pulse shadow-[0_0_8px_#d4e616]" />
                  <span className="relative z-10 text-[9px] font-sans font-bold tracking-widest text-blue-600 dark:text-accent uppercase pt-[1px]">خدمة مميزة</span>
                </div>
              </div>
            )}

          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
            className={`hide-in-light ${isIx3 ? "object-contain p-8 md:p-12 transition-transform duration-1000 group-hover:scale-105" : "object-contain transition-transform duration-1000 group-hover:scale-105"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
          <Image
            src={imageLightSrc}
            alt={title}
            fill
            draggable={false}
            className={`hide-in-dark ${isIx3 ? "object-contain p-8 md:p-12 transition-transform duration-1000 group-hover:scale-105" : "object-contain transition-transform duration-1000 group-hover:scale-105"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
        </div>

        {/* Back Face - Premium Tech/Editorial */}
        <div className={`absolute inset-0 rotate-y-180 backface-hidden bg-[var(--page-bg)] ring-1 ring-inset ring-[var(--border-subtle)] shadow-[0_0_40px_var(--shadow-color)] overflow-hidden flex flex-col justify-between rounded-lg ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`} dir="rtl">
          
          {/* Dynamic Blurred Background Effect */}
          <div className="absolute inset-0 opacity-30 group-hover:scale-110 transition-transform duration-[2000ms] ease-out pointer-events-none">
            <Image src={image} alt={title} fill draggable={false} className="hide-in-light object-cover blur-2xl grayscale-[50%]" sizes="(max-width: 768px) 100vw, 33vw" />
            <Image src={imageLightSrc} alt={title} fill draggable={false} className="hide-in-dark object-cover blur-2xl grayscale-[50%]" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          {/* Content layer */}
          <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isIx3 ? 'bg-blue-500/10' : featured ? 'bg-yellow-50 dark:bg-accent/10' : 'bg-[var(--surface-glass)]'}`} />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[var(--page-bg)] pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
            <div className="flex-1 min-h-0 flex flex-col justify-center items-center text-center gap-6">
              
              <div className="flex flex-col items-center gap-3">
                {/* Techy ID Badge */}
                <span className="text-[10px] font-mono tracking-widest text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 px-3 py-1 rounded-sm bg-blue-50 dark:bg-blue-500/10 backdrop-blur-md">
                  {id.substring(0, 4).toUpperCase()}
                </span>
                
                <h3 className={`font-sans text-lg md:text-2xl font-bold tracking-wide ${isIx3 ? 'text-accent dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]' : featured ? 'text-accent dark:drop-shadow-[0_0_15px_rgba(212,230,22,0.3)]' : 'text-[var(--text-primary)]'}`}>
                  {title}
                </h3>
                
                <div className={`w-12 h-px ${isIx3 ? 'bg-blue-500/50' : featured ? 'bg-accent/50' : 'bg-[var(--border-medium)]'}`} />
              </div>

              {/* High-impact structured copy (Copywriting & Humanizer Skills) */}
              <div className="relative w-full text-right flex flex-col gap-4 items-center">
                <p className="font-sans text-[var(--text-secondary)] text-sm md:text-[15px] leading-[1.8] font-light opacity-95 text-justify max-w-full px-2" style={{ textJustify: "inter-word" }}>
                  {description.split('\n')[0]}
                </p>

                {/* Benefits Bullet Points */}
                {benefits && benefits.length > 0 && (
                  <div className="flex flex-col gap-3 mt-2 w-full max-w-[95%] md:max-w-[85%] mx-auto text-right" dir="rtl">
                    {benefits.slice(0, 3).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 justify-start bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/10 p-3 rounded-lg hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors">
                        <div className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isIx3 ? 'bg-blue-400 shadow-[0_0_8px_#3b82f6]' : featured ? 'bg-accent shadow-[0_0_8px_#d4e616]' : 'bg-white/80'}`} />
                        <p className="font-sans text-[var(--text-secondary)] text-[13px] md:text-[14px] leading-[1.6]">
                          <strong className="text-[var(--text-primary)] font-medium ml-1">{benefit.label}:</strong> 
                          <span className="opacity-80">{benefit.value}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
            
            {/* Unique NMC System HUD Action Buttons */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--border-subtle)] shrink-0 w-full max-w-[240px] self-center">
                <div onClick={(e) => { e.stopPropagation(); window.location.href = `/services/${id}`; }} className="w-full cursor-pointer">
                  <div
                    className={`group/btn relative w-full flex items-center justify-between py-2.5 px-5 transition-all duration-300 rounded-sm overflow-hidden ${isIx3 ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]' : featured ? 'bg-yellow-50 text-yellow-700 dark:bg-accent/10 dark:text-accent border border-yellow-200 dark:border-accent/30 hover:border-yellow-400 dark:hover:border-accent hover:shadow-[0_0_15px_rgba(212,230,22,0.2)]' : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'}`}
                  >
                  {/* Scanner sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  <span className="relative z-10 font-sans font-bold tracking-widest text-[12px] uppercase">
                    عرض التفاصيل
                  </span>
                  <span className="relative z-10 transform transition-transform duration-300 group-hover/btn:-translate-x-1 opacity-70 group-hover/btn:opacity-100 font-mono text-xs">←</span>
                </div>
              </div>
              
              <div onClick={(e) => e.stopPropagation()} className="w-full">
                <a
                  href="https://wa.me/967781878443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/wa relative w-full flex items-center justify-center gap-2 py-2.5 text-[#1da851] dark:text-[#25D366] text-[11px] font-sans font-medium tracking-[0.1em] transition-colors duration-300 rounded-sm bg-green-50 dark:bg-[#25D366]/10 border border-green-200 dark:border-[#25D366]/20 hover:border-[#25D366] hover:bg-green-100 dark:hover:border-[#25D366]/40 overflow-hidden"
                >
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/0 group-hover/wa:via-[#25D366]/50 to-transparent transition-opacity duration-300" />
                  <span className="relative z-10">استشارة واتساب</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 w-3.5 h-3.5 transform transition-transform duration-300 group-hover/wa:scale-110">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
