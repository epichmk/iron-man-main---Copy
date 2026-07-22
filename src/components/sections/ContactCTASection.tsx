"use client";

import Link from "next/link";
import { useRef } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { MapPin, Phone, EnvelopeSimple, FacebookLogo, InstagramLogo, WhatsappLogo, ArrowUpLeft, Clock, Stethoscope, Headset } from "@phosphor-icons/react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function ContactCTASection() {
  const sectionRef = useRef<HTMLElement>(null);


  useGSAP(() => {
    // Removed looping background animation from here to put it inside playEntrance()

    // Reset initial states
    gsap.set(".s10-anim-el", { opacity: 0, x: -100, scale: 0.8 });
    gsap.set(".s10-anim-text", { opacity: 0, y: 100, scale: 0.8 });
    gsap.set(".s10-line", { width: 0 });
    gsap.set(".s10-line-2", { width: 0 });
    gsap.set(".s10-small-badge", { opacity: 0, x: -30 });

    const playEntrance = () => {
      const tl = gsap.timeline();
      
      // Start looping background animation ONLY when section is visible
      gsap.to(".s10-bg-img", {
        scale: 1.15, xPercent: -2, yPercent: -1, duration: 12,
        ease: "power1.inOut", yoyo: true, repeat: -1, force3D: true, overwrite: "auto"
      });

      tl.to(".s10-small-badge", { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 0.2);
      tl.to(".s10-line", { width: 32, duration: 0.8, ease: "power2.inOut" }, 0.4);
      
      tl.to(".s10-anim-el", {
        opacity: 1, x: 0, scale: 1,
        stagger: 0.15, duration: 1.4, ease: "power3.out"
      }, 0.5);

      tl.to(".s10-line-2", { width: 40, duration: 0.8, ease: "power2.inOut" }, 0.8);
      
      tl.to(".s10-anim-text", {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.2, duration: 1.8, ease: "power3.out"
      }, 0.9);
    };

    const resetState = () => {
      gsap.killTweensOf(".s10-bg-img"); // Stop heavy background calculation
      gsap.set(".s10-bg-img", { scale: 1, xPercent: 0, yPercent: 0 }); // Reset position
      gsap.set(".s10-anim-el", { opacity: 0, x: -100, scale: 0.8 });
      gsap.set(".s10-anim-text", { opacity: 0, y: 100, scale: 0.8 });
      gsap.set(".s10-line", { width: 0 });
      gsap.set(".s10-line-2", { width: 0 });
      gsap.set(".s10-small-badge", { opacity: 0, x: -30 });
    };

    let isFullPage = false;
    const handleIndex = (e: Event) => {
      isFullPage = true;
      const customEvent = e as CustomEvent;
      const mySection = sectionRef.current?.closest('.section-wrapper');
      if (mySection && mySection.parentElement) {
        const myIndex = Array.from(mySection.parentElement.children).indexOf(mySection);
        if (customEvent.detail.index === myIndex) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);

    return () => {
      window.removeEventListener("sectionIndexChanged", handleIndex);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-full bg-[var(--page-bg)] z-40 overflow-hidden">
      <div className="relative w-full h-[100dvh] bg-[var(--page-bg)] flex flex-col justify-center" dir="rtl">
      
      <div className="s10-small-badge pointer-events-none absolute left-6 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24">
        <div className="s10-line h-px bg-accent/60" />
        <span className="font-sans text-[12px] font-bold tracking-widest text-[var(--text-tertiary)]" dir="rtl">
          بإذن الله
        </span>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 w-full h-full origin-center">
          <Image 
            src="/cta-section-background.jpg" 
            alt="CTA Background" 
            fill 
            className="s10-bg-img will-change-transform object-cover object-[15%_center] md:object-[20%_20%] opacity-[var(--theme-bg-img-opacity)]"
          />
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 mt-10 md:mt-0 right-6 md:right-16 lg:right-32 z-40 flex flex-col md:flex-row items-center md:items-stretch gap-2 lg:gap-4" dir="rtl">
         
         <div className="flex flex-col justify-between h-full gap-2 md:gap-3 w-full max-w-[300px] shrink-0 py-2">

            <a href={getWhatsAppLink("مرحباً، أود حجز موعد.")} target="_blank" rel="noopener noreferrer" className="s10-anim-el flex items-center justify-start gap-5 group">
               <div className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <WhatsappLogo size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">واتساب (للحجز)</span>
                  <span className="text-[var(--text-primary)] font-sans text-lg tracking-wide group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 781 878 443</span>
               </div>
            </a>

            <a href="tel:+9671513729" className="s10-anim-el flex items-center justify-start gap-5 group">
               <div className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Phone size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">الاستقبال</span>
                  <span className="text-[var(--text-primary)] font-sans text-lg tracking-wide group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 1 513 729</span>
               </div>
            </a>

            <a href="tel:+967775950500" className="s10-anim-el flex items-center justify-start gap-5 group">
               <div className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Stethoscope size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">الاستشارات الطبية</span>
                  <span className="text-[var(--text-primary)] font-sans text-lg tracking-wide group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 775 950 500</span>
               </div>
            </a>

            <a href="mailto:ivfnmc@gmail.com" className="s10-anim-el flex items-center justify-start gap-5 group">
               <div className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <EnvelopeSimple size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">البريد الإلكتروني</span>
                  <span className="text-[var(--text-primary)] font-sans text-base tracking-wide group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">ivfnmc@gmail.com</span>
               </div>
            </a>

            <a href="https://maps.app.goo.gl/n8KvHLgkjQbbiBpz8" target="_blank" rel="noopener noreferrer" className="s10-anim-el flex items-center justify-start gap-5 group">
               <div className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <MapPin size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[var(--text-primary)] font-medium text-sm group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">صنعاء، جولة فلسطين</span>
               </div>
            </a>

            <div className="s10-anim-el flex items-center justify-start gap-5 group cursor-default">
               <div className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Clock size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">ساعات العمل</span>
                  <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]">السبت - الخميس | 9:00 ص - 3:00 م</span>
               </div>
            </div>

            <div className="s10-anim-el flex items-center justify-start gap-5 group cursor-default">
               <div className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                  <Headset size={28} weight="fill" />
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">أوقات الاتصال</span>
                  <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]">السبت - الخميس | 9:00 ص - 9:00 م</span>
               </div>
            </div>

            <div className="s10-anim-el flex flex-col gap-2 md:gap-3 pt-3 md:pt-4 mt-1 border-t border-[var(--border-subtle)] w-full">
               <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                  <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                     <Image src="/instagram.png" alt="Instagram" fill className="object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col items-start text-right">
                     <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                        انستجرام
                        <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-accent opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                     </span>
                     <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="ltr">@dr.najat_almalass_center</span>
                  </div>
               </a>

               <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                  <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                     <Image src="/facebook.png" alt="Facebook" fill className="object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col items-start text-right">
                     <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                        فيسبوك
                        <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-accent opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                     </span>
                     <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="ltr">/najatalmalascenter</span>
                  </div>
               </a>

               <a href={getWhatsAppLink("مرحباً، أود التواصل معكم.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                  <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                     <Image src="/whatsapp.png" alt="WhatsApp" fill className="object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col items-start text-right">
                     <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                        واتساب
                        <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-accent opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                     </span>
                     <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="ltr">+967 781 878 443</span>
                  </div>
               </a>
            </div>
         </div>

         <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col mb-2">
               <div className="s10-line-2 h-0.5 bg-accent mb-4 rounded-full opacity-80" />
               <h2 className="s10-anim-text text-4xl font-bold text-[var(--text-primary)] leading-tight mb-3 tracking-tight">
                  ابدأ رحلتك
               </h2>
               <span className="s10-anim-text text-[var(--text-secondary)] text-sm font-medium leading-relaxed max-w-[280px]">
                  الدعم الطبي جاهز للرد على استفساراتك الآن. الخطوة الأولى تبدأ هنا.
               </span>
            </div>
         </div>

      </div>
      </div>
    </section>
  );
}
