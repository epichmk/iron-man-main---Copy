"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { WhatsappLogo, FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export function MobileFooter() {
  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[#000814]" dir="rtl">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <LazyVideo
          src="/footer-baby.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark Fade Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#000814] via-[#000814]/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 pb-6">
        
        {/* Brand Section */}
        <div className="flex flex-col mb-8 text-center items-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3 w-fit mb-4">
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src="/nmc-logo.png"
                alt="NMC Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-white tracking-tight leading-tight dark:drop-shadow-md">مركز د. نجاة الملس</span>
              <span className="text-[#0094FE] text-[10px] font-bold tracking-widest uppercase mt-1 dark:drop-shadow-md">للحقن المجهري والمساعدة على الحمل</span>
            </div>
          </Link>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-[280px] mt-2">
            المركز الرائد في الحقن المجهري وأطفال الأنابيب في اليمن. تقنيات عالمية برؤية إنسانية، لتصنع الأمل وتحقق حلم الأمومة.
          </p>

          <div className="flex flex-col items-center gap-1.5 mt-6">
             <span className="text-xs text-zinc-500 font-medium">بإشراف</span>
             <span className="text-lg font-black tracking-wider text-[#d4e616] dark:drop-shadow-[0_0_10px_rgba(192,232,22,0.4)] relative inline-block w-fit">
                د. نجاة الملس
                <div className="absolute -bottom-1 left-0 right-0 mx-auto w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#d4e616]/50 to-transparent" />
             </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="flex flex-col items-start bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">الخدمات المتخصصة</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services/ix73-icsi-imsi" className="text-zinc-300 hover:text-white text-[11px] font-medium">تقنية IX73 / IMSI</Link></li>
              <li><Link href="/services/gender-selection" className="text-zinc-300 hover:text-white text-[11px] font-medium">تحديد الجنس</Link></li>
              <li><Link href="/services/freezing-unit" className="text-zinc-300 hover:text-white text-[11px] font-medium">وحدة التجميد</Link></li>
              <li><Link href="/services" className="text-[#d4e616] text-[10px] font-bold mt-1 inline-block">عرض الكل +</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-start bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">روابط سريعة</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/the-center" className="text-zinc-300 hover:text-white text-[11px] font-medium">عن المركز</Link></li>
              <li><Link href="/dr-najat" className="text-zinc-300 hover:text-white text-[11px] font-medium">د. نجاة الملس</Link></li>
              <li><Link href="/blog" className="text-zinc-300 hover:text-white text-[11px] font-medium">المدونة الطبية</Link></li>
              <li><Link href="/contact" className="text-zinc-300 hover:text-white text-[11px] font-medium">تواصل معنا</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Line */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <a href="https://wa.me/967781878443" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#d4e616] transition-colors"><WhatsappLogo size={24} weight="fill" /></a>
          <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#d4e616] transition-colors"><FacebookLogo size={24} weight="fill" /></a>
          <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#d4e616] transition-colors"><InstagramLogo size={24} weight="fill" /></a>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/10 flex flex-col items-center text-center gap-2 text-[10px] text-zinc-500 font-medium">
          <p>&copy; {new Date().getFullYear()} مركز د. نجاة الملس للحقن المجهري.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">سياسة الخصوصية</Link>
            <Link href="/terms-of-service">شروط الخدمة</Link>
          </div>
        </div>

      </div>
    </section>
  );
}
