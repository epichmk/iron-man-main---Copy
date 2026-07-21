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
}

export function ServiceCard({ id, title, image, description, featured }: ServiceCardProps) {
  const isIx3 = id === 'ix73-icsi-imsi';
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className={`group relative w-full h-full md:perspective-1000 ${featured || isIx3 ? 'z-10' : ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)} // Allow clicking to flip
    >
      {/* MOBILE LAYOUT: Full-screen Cinematic, No Card Box */}
      <div className="flex md:hidden flex-col h-full w-full justify-start items-center relative" dir="rtl">
        {/* Floating Image Section */}
        <div className="relative w-full h-[50%] flex-none flex items-center justify-center pt-10 pb-4">
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent blur-3xl rounded-full scale-150 pointer-events-none" />
          
          <Image src={image} alt={title} fill draggable={false} className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10" sizes="(max-width: 768px) 100vw, 33vw" quality={100} />
          
          {/* Floating Badges */}
          {isIx3 && (
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center justify-center scale-75 origin-top-left">
              <div className="relative flex items-center justify-center w-12 h-12">
                <svg className="absolute w-full h-full animate-spin-slow opacity-80" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 5" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5 15" className="origin-center -rotate-90" />
                </svg>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#3b82f6]" />
              </div>
            </div>
          )}
          {featured && !isIx3 && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none scale-90 origin-top-right">
              <div className="relative overflow-hidden flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-accent/30 rounded-full">
                <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#d4e616]" />
                <span className="relative z-10 text-[9px] font-sans font-bold tracking-widest text-accent uppercase pt-[1px]">خدمة مميزة</span>
              </div>
            </div>
          )}
        </div>

        {/* Elegant Typography Section */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-between text-center px-6 z-20 pb-4 pt-2">
          <h3 className={`font-heading text-2xl font-black tracking-tight dark:drop-shadow-lg ${isIx3 ? 'text-accent' : featured ? 'text-accent' : 'text-white'}`}>
            {title}
          </h3>
          <p className="font-sans text-zinc-300 text-sm leading-[1.6] font-light my-auto max-w-[280px] line-clamp-4">
            {description}
          </p>

          {/* Premium Action Buttons */}
          <div className="flex flex-col w-full max-w-[280px] gap-2 mt-auto shrink-0">
            <Link href={`/services/${id}`} className="group relative w-full flex items-center justify-center py-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/30 backdrop-blur-md">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite] skew-x-12" />
              <span className="relative z-10 font-sans font-bold tracking-widest text-[11px] text-accent uppercase">اكتشف التقنية</span>
            </Link>
            <a href="https://wa.me/967781878443" target="_blank" rel="noopener noreferrer" className="relative w-full flex items-center justify-center py-2 text-zinc-400 text-[10px] font-sans font-medium tracking-widest uppercase transition-colors hover:text-[#25D366]">
              <span className="relative z-10">حجز استشارة</span>
            </a>
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
        <div className={`absolute inset-0 backface-hidden bg-black overflow-hidden ${featured && !isIx3 ? 'ring-1 ring-inset ring-accent/30 shadow-[inset_0_0_20px_rgba(212,230,22,0.05)]' : 'ring-1 ring-inset ring-white/5'}`}>
          
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
              <div className="relative overflow-hidden flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-accent/30 rounded-full shadow-[0_0_15px_rgba(212,230,22,0.15)] group-hover:border-accent/60 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full animate-[sweep_2s_ease-in-out_infinite]" />
                <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#d4e616]" />
                <span className="relative z-10 text-[9px] font-sans font-bold tracking-widest text-accent uppercase pt-[1px]">خدمة مميزة</span>
              </div>
            </div>
          )}

          {/* Image - Original Colors, No Shading */}
          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
            className={`${isIx3 ? "object-contain p-8 md:p-12 transition-transform duration-1000 group-hover:scale-105" : "object-cover transition-transform duration-1000 group-hover:scale-105"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
        </div>

        {/* Back Face - Premium Tech/Editorial */}
        <div className={`absolute inset-0 rotate-y-180 backface-hidden bg-black ring-1 ring-inset ring-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between rounded-lg`} dir="rtl">
          
          {/* Dynamic Blurred Background Effect */}
          <div className="absolute inset-0 opacity-30 group-hover:scale-110 transition-transform duration-[2000ms] ease-out pointer-events-none">
            <Image src={image} alt={title} fill draggable={false} className="object-cover blur-2xl grayscale-[50%]" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className={`absolute inset-0 mix-blend-overlay ${isIx3 ? 'bg-blue-900/60' : featured ? 'bg-accent/40' : 'bg-black/60'}`} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#050505] pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`font-heading text-xl md:text-2xl font-bold tracking-tight line-clamp-1 ${isIx3 ? 'text-accent dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]' : featured ? 'text-accent dark:drop-shadow-[0_0_15px_rgba(212,230,22,0.3)]' : 'text-white'}`}>
                  {title}
                </h3>
                {/* Techy ID Badge */}
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 border border-zinc-800/80 px-2 py-0.5 rounded-sm bg-black/40 backdrop-blur-md">
                  {id.substring(0, 4).toUpperCase()}
                </span>
              </div>
              {/* Perfectly fitted description box */}
              <div className="relative flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/30">
                <p className="font-sans text-zinc-300 text-xs md:text-sm leading-[1.6] opacity-90 pb-2">
                  {description}
                </p>
              </div>
            </div>
            
            {/* Unique Iron Man HUD Action Buttons */}
            <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-white/5 shrink-0">
              <Link
                href={`/services/${id}`}
                className={`group/btn relative w-full flex items-center justify-between py-2 px-4 transition-all duration-300 rounded-sm overflow-hidden ${isIx3 ? 'bg-blue-950/20 text-accent border border-blue-500/20 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]' : featured ? 'bg-accent/5 text-accent border border-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(212,230,22,0.2)]' : 'bg-white/5 text-zinc-300 hover:text-white border border-white/10 hover:border-white/40'}`}
              >
                {/* Scanner sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                <span className="relative z-10 font-sans font-bold tracking-widest text-[11px] uppercase">
                  عرض البيانات
                </span>
                <span className="relative z-10 transform transition-transform duration-300 group-hover/btn:-translate-x-1 opacity-70 group-hover/btn:opacity-100 font-mono text-xs">←</span>
              </Link>
              
              <a
                href="https://wa.me/967781878443"
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa relative w-full flex items-center justify-center gap-2 py-2 text-zinc-400 hover:text-[#25D366] text-[10px] font-sans font-medium tracking-[0.1em] transition-colors duration-300 rounded-sm bg-black/40 border border-transparent hover:border-[#25D366]/30 overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/0 group-hover/wa:via-[#25D366]/50 to-transparent transition-opacity duration-300" />
                <span className="relative z-10">استشارة أخصائي // واتساب</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 w-3 h-3 transform transition-transform duration-300 group-hover/wa:scale-110">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
