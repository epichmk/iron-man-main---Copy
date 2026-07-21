"use client";

import React from "react";
import Image from "next/image";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import { MapPin, Phone, EnvelopeSimple, WhatsappLogo, Clock, Stethoscope, Headset, ArrowUpLeft } from "@phosphor-icons/react/dist/ssr";

export function MobileContactCTA() {
  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[var(--page-bg)]" dir="rtl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/cta-section-background.jpg" 
          alt="CTA Background" 
          fill 
          className="object-cover object-[20%_20%] opacity-40"
        />
        {/* Dark Blue Shade Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/80 to-[var(--page-bg)]/40" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 pb-12">
        {/* Header Block */}
        <div className="flex flex-col mb-8">
          <div className="h-0.5 w-10 bg-accent mb-4 rounded-full opacity-80 shadow-[0_0_10px_#d4e616]" />
          <h2 className="text-4xl font-bold text-[var(--text-primary)] leading-tight mb-3 tracking-tight dark:drop-shadow-md">
            ابدأ رحلتك
          </h2>
          <p className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed max-w-[280px]">
            الدعم الطبي جاهز للرد على استفساراتك الآن. الخطوة الأولى تبدأ هنا.
          </p>
        </div>

        {/* Contact Links Stack */}
        <div className="flex flex-col gap-4 w-full bg-[var(--overlay-bg)] backdrop-blur-xl p-6 rounded-3xl border border-[var(--border-subtle)] shadow-2xl overflow-y-auto max-h-[60vh] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[var(--surface-hover)] [&::-webkit-scrollbar-thumb]:rounded-full">
          
          <a href={getWhatsAppLink("مرحباً، أود حجز موعد.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
             <div className="text-[var(--text-secondary)] shrink-0">
                <WhatsappLogo size={26} weight="fill" />
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[var(--text-tertiary)] text-[10px] font-medium mb-0.5">واتساب (للحجز)</span>
                <span className="text-[var(--text-primary)] font-sans text-sm tracking-wide" dir="ltr">+967 781 878 443</span>
             </div>
          </a>

          <a href="tel:+9671513729" className="flex items-center justify-start gap-5 group">
             <div className="text-[var(--text-secondary)] shrink-0">
                <Phone size={26} weight="fill" />
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[var(--text-tertiary)] text-[10px] font-medium mb-0.5">الاستقبال</span>
                <span className="text-[var(--text-primary)] font-sans text-sm tracking-wide" dir="ltr">+967 1 513 729</span>
             </div>
          </a>

          <a href="tel:+967775950500" className="flex items-center justify-start gap-5 group">
             <div className="text-[var(--text-secondary)] shrink-0">
                <Stethoscope size={26} weight="fill" />
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[var(--text-tertiary)] text-[10px] font-medium mb-0.5">الاستشارات الطبية</span>
                <span className="text-[var(--text-primary)] font-sans text-sm tracking-wide" dir="ltr">+967 775 950 500</span>
             </div>
          </a>

          <a href="mailto:ivfnmc@gmail.com" className="flex items-center justify-start gap-5 group">
             <div className="text-[var(--text-secondary)] shrink-0">
                <EnvelopeSimple size={26} weight="fill" />
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[var(--text-tertiary)] text-[10px] font-medium mb-0.5">البريد الإلكتروني</span>
                <span className="text-[var(--text-primary)] font-sans text-sm tracking-wide" dir="ltr">ivfnmc@gmail.com</span>
             </div>
          </a>

          <a href="https://maps.app.goo.gl/n8KvHLgkjQbbiBpz8" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
             <div className="text-[var(--text-secondary)] shrink-0">
                <MapPin size={26} weight="fill" />
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[var(--text-primary)] font-medium text-sm">صنعاء، جولة فلسطين</span>
             </div>
          </a>

          <div className="flex items-center justify-start gap-5 group cursor-default">
             <div className="text-[var(--text-secondary)] shrink-0">
                <Clock size={26} weight="fill" />
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[var(--text-primary)] font-medium text-[11px] mb-0.5">ساعات العمل</span>
                <span className="text-accent text-[10px] font-medium">السبت - الخميس | 9:00 ص - 3:00 م</span>
             </div>
          </div>

          <div className="flex items-center justify-start gap-5 group cursor-default">
             <div className="text-[var(--text-secondary)] shrink-0">
                <Headset size={26} weight="fill" />
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[var(--text-primary)] font-medium text-[11px] mb-0.5">أوقات الاتصال</span>
                <span className="text-accent text-[10px] font-medium">السبت - الخميس | 9:00 ص - 9:00 م</span>
             </div>
          </div>

          {/* Cohesive Elegant Socials */}
          <div className="flex flex-col gap-3 pt-4 mt-1 border-t border-[var(--border-subtle)] w-full">
             <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden">
                   <Image src="/instagram.png" alt="Instagram" fill className="object-cover rounded-full" />
                </div>
                <div className="flex flex-col items-start text-right">
                   <span className="text-[var(--text-primary)] font-medium text-[11px] mb-0.5">انستجرام</span>
                   <span className="text-[var(--text-tertiary)] text-[10px] font-medium" dir="ltr">@dr.najat_almalass_center</span>
                </div>
             </a>

             <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden">
                   <Image src="/facebook.png" alt="Facebook" fill className="object-cover rounded-full" />
                </div>
                <div className="flex flex-col items-start text-right">
                   <span className="text-[var(--text-primary)] font-medium text-[11px] mb-0.5">فيسبوك</span>
                   <span className="text-[var(--text-tertiary)] text-[10px] font-medium" dir="ltr">/najatalmalascenter</span>
                </div>
             </a>

             <a href={getWhatsAppLink("مرحباً، أود التواصل معكم.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden">
                   <Image src="/whatsapp.png" alt="WhatsApp" fill className="object-cover rounded-full" />
                </div>
                <div className="flex flex-col items-start text-right">
                   <span className="text-[var(--text-primary)] font-medium text-[11px] mb-0.5">واتساب</span>
                   <span className="text-[var(--text-tertiary)] text-[10px] font-medium" dir="ltr">+967 781 878 443</span>
                </div>
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}
