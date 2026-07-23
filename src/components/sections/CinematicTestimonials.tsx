"use client";

import { useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Star, Quotes } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const massiveTestimonials = [
  { text: "بعد 5 سنوات من الانتظار، تحقق حلمنا هنا. شكراً من القلب." },
  { text: "الدكتور كان بمثابة ملاك رحمة. اليوم أحضن طفلي بفضل الله ثم بفضلكم." },
  { text: "لم نفقد الأمل لأنكم لم تفقدوه. تقنية الحقن المجهري غيّرت حياتنا." },
  { text: "احترافية وعناية فائقة في كل خطوة. تجربة فاقت التوقعات." },
  { text: "أفضل مركز أطفال أنابيب في المنطقة بلا منازع. شكراً لجهودكم." },
  { text: "عناية طبية راقية واهتمام نفسي ساعدنا على تجاوز أصعب المراحل." },
  { text: "اليوم سمعت نبض طفلي لأول مرة. لا توجد كلمات تصف سعادتي." },
  { text: "التشخيص الدقيق كان المفتاح. شكراً لخبرتكم العظيمة." },
  { text: "رحلة طويلة تكللت بالنجاح. المركز يتميز بأحدث التقنيات العالمية." },
  { text: "بعد تجارب فاشلة عديدة، وجدنا الحل هنا. أنصح الجميع بهذا المركز." },
  { text: "رعاية لا مثيل لها. الدعم الطبي يشعرك بأنك بين عائلتك." },
  { text: "بفضل الله ثم خبرتكم، اكتملت عائلتنا بعد 8 سنوات من الحرمان." },
  { text: "المختبرات هنا متطورة جداً، وهذا ما صنع الفارق في حالتنا." },
  { text: "الشفافية والمصداقية منذ اليوم الأول. شكراً على كل شيء." },
  { text: "لم أتوقع أن تكون الإجراءات بهذه السهولة. رعاية طبية من الطراز الأول." },
  { text: "طفلتي الآن بين يدي. شكراً لكل طبيب وممرض في هذا الصرح العظيم." }
];

const TestimonialCard = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-full px-8 md:px-12 py-10 md:py-14 rounded-[2.5rem] bg-[var(--surface-glass)] border border-[var(--border-subtle)] flex flex-col justify-center items-center text-center shadow-[0_30px_60px_var(--shadow-color)] backdrop-blur-xl relative overflow-hidden group" dir="rtl">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-[50px] pointer-events-none transition-transform duration-700 group-hover:scale-150" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none transition-transform duration-700 group-hover:scale-150" />
      
      <Quotes weight="fill" className="text-[var(--text-muted-light)] absolute top-8 right-8 rotate-180" size={64} />

      <div className="flex items-center justify-center gap-1.5 mb-8 relative z-10">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} weight="fill" className="text-accent drop-shadow-[0_0_10px_rgba(212,230,22,0.5)]" size={24} />
        ))}
      </div>
      
      <p className="text-[var(--text-primary)] relative z-10 leading-[1.8] font-medium" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
        "{text}"
      </p>
      
      <div className="mt-8 relative z-10">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#d4e616] to-transparent mx-auto" />
      </div>
    </div>
  );
};

export function CinematicTestimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useGSAP(() => {
    gsap.set(".s6-header-el", { opacity: 0, y: -20 });
    gsap.set(".s6-carousel", { opacity: 0, scale: 0.95 });

    if (swiperInstance) swiperInstance.autoplay?.stop();

    const playEntrance = () => {
      const tl = gsap.timeline();
      tl.to(".s6-header-el", { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 0.2);
      tl.to(".s6-carousel", { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 0.5);
      
      swiperInstance?.autoplay?.start();
    };

    const resetState = () => {
      gsap.set(".s6-header-el", { opacity: 0, y: -20 });
      gsap.set(".s6-carousel", { opacity: 0, scale: 0.95 });
      swiperInstance?.autoplay?.stop();
    };

    const handleIndex = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.index === 6) {
        playEntrance();
      } else {
        setTimeout(() => { resetState(); }, 1000);
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);
    return () => window.removeEventListener("sectionIndexChanged", handleIndex);
  }, { dependencies: [swiperInstance], scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-[var(--page-bg)] overflow-hidden flex flex-col justify-center py-20">
      
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img src="/studio_spotlight_bg.png" alt="Studio Spotlight" className="absolute inset-0 w-full h-full object-cover opacity-[var(--theme-bg-img-opacity)] hide-in-light" />
      </div>

      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,var(--gradient-radial-edge)_0%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)] pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 mb-8 md:mb-16 pointer-events-none">
        <div className="s6-header-el"><EyebrowBadge>قصص نجاح</EyebrowBadge></div>
        <h2 className="s6-header-el text-2xl md:text-5xl font-black text-[var(--text-primary)] dark:drop-shadow-2xl mt-4 max-w-5xl leading-tight whitespace-nowrap">
          نبضات أمل أصبحت حقيقة
        </h2>
        <p className="s6-header-el text-[var(--text-tertiary)] text-base md:text-xl mt-4 max-w-2xl font-light">
          آلاف العائلات حققت حلم الأمومة والأبوة معنا. قصصهم هي وسام فخرنا.
        </p>
      </div>

      <div className="s6-carousel relative z-20 w-full flex-grow flex items-center justify-center mask-edges-horizontal">
        <Swiper
          onSwiper={setSwiperInstance}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          dir="rtl"
          coverflowEffect={{
            rotate: 0,
            stretch: 50,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full !py-10"
        >
          {massiveTestimonials.map((item, i) => (
            <SwiperSlide key={i} className="!w-[85vw] md:!w-[600px] !h-auto">
              <TestimonialCard text={item.text} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </section>
  );
}
