"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */
interface StaffMember {
  id: string;
  name: string;
  title: string;
  roleDescription?: string;
  image: string;
}

interface StaffShowcaseProps {
  staffData: StaffMember[];
  frameCount?: number;
  folderPath?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
}

const PROMO_TEXTS = [
  "نلتزم برعاية شاملة تبدأ من فهم عميق لاحتياجاتك، لنبني أساساً متيناً لصحة مستدامة ومسارات علاجية متطورة.",
  "نوجه ابتكاراتنا الطبية ورؤيتنا الاستراتيجية نحو هدف واحد: تقديم بيئة رعاية متكاملة تضع المريض في قلب الاهتمام.",
  "تضمن تقنياتنا وعياداتنا المتقدمة الدقة القصوى، لنمنح مرضانا الثقة الكاملة في كل خطوة نحو التعافي.",
  "نحلل أدق التفاصيل الطبية لنقدم حلولاً متكاملة، ونرعى الحالات بشمولية واهتمام بالغ وخبرة لا تضاهى.",
  "نحيط مراجعينا بعناية فائقة، ونرسم معاً مستقبلهم الصحي بأعلى معايير الرعاية والأمان.",
];

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export function StaffShowcase({
  staffData,
  sectionTitle = "القيادة الطبية",
  sectionSubtitle = "عقولٌ رائدة",
  sectionDescription = "منظومة طبية متكاملة تقودها كفاءات استثنائية، تجمع بين الخبرة العميقة والابتكار التكنولوجي لضمان أعلى مستويات الرعاية والدقة.",
}: StaffShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // In RTL, scrollLeft is usually negative or goes from 0 to negative
    // We calculate the index based on the center of the viewport
    // But to keep it simple across all browsers, we just divide the absolute scroll position by client width
    const scrollAbs = Math.abs(scrollLeft);
    const index = Math.round(scrollAbs / clientWidth);
    
    if (index !== activeIndex && index >= 0 && index < staffData.length) {
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    // For RTL, we scroll negatively
    const targetScroll = -(index * clientWidth);
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="staff-showcase"
      aria-label="فريقنا الطبي"
      className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col justify-center"
      dir="rtl"
    >
      {/* ── BACKGROUND VIDEO ── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <LazyVideo
          src="/staff-section-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,1)_100%)]" />
      </div>

      {/* ── HEADER INTRO ── */}
      <div className="absolute top-8 md:top-12 inset-x-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-transparent" />
          <span className="text-blue-400 font-mono tracking-widest text-sm font-bold uppercase dark:drop-shadow-[0_0_8px_rgba(0,180,216,0.8)]">
            {sectionSubtitle}
          </span>
          <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight dark:drop-shadow-2xl mb-4">
          {sectionTitle}
        </h2>
      </div>

      {/* ── HORIZONTAL CAROUSEL ── */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative z-20 w-full h-full flex flex-row overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {staffData.map((staff, i) => (
          <div key={staff.id} className="relative w-full h-full flex-shrink-0 snap-center flex items-center justify-center">
            
            {/* ══ STAFF IMAGE (LEFT) ══ */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 md:left-[14vw] md:top-[55%] md:bottom-auto md:translate-x-0 md:-translate-y-1/2 z-[22] pointer-events-none h-[50dvh] md:h-[75vh] w-full md:w-auto flex justify-center md:block">
              <Image 
                src={staff.image}
                alt={staff.name}
                fill
                className="object-contain object-bottom md:object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                unoptimized
              />
            </div>

            {/* ══ STAFF CONTENT (RIGHT) ══ */}
            <div
              className="absolute top-[20%] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[15vw] md:top-[50%] md:-translate-y-1/2 z-[30] flex flex-col justify-start items-center md:items-start text-center md:text-right gap-2 w-[80vw] md:w-[500px]"
            >
              <div className="flex flex-col items-center md:items-start gap-1 w-full">
                <div className="inline-flex items-center gap-2 mb-1 relative z-10">
                  <span
                    className="font-mono tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, rgba(0,180,216,0.15) 0%, rgba(0,119,182,0.05) 100%)",
                      border: "1px solid rgba(0,180,216,0.3)",
                      color: "#00b4d8",
                      boxShadow: "0 0 15px rgba(0,180,216,0.2)",
                      fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
                    }}
                  >
                    {staff.title}
                  </span>
                </div>
                
                <h3 
                  className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e0e0e0] to-[#888] relative z-10 w-full"
                  style={{ 
                    fontSize: "clamp(2rem, 4vw, 4rem)", 
                    lineHeight: 1.1,
                    textShadow: "0px 10px 30px rgba(0,0,0,0.8)",
                  }}
                >
                  {staff.name}
                </h3>
              </div>

              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent my-1" />
              
              <div className="flex flex-col items-center md:items-start gap-4 w-full">
                {staff.roleDescription && (
                  <p
                    className="text-zinc-100 font-medium leading-[1.5] relative z-10 w-full"
                    style={{ 
                      fontSize: "clamp(0.85rem, 1.2vw, 1rem)", 
                      maxWidth: "60ch",
                      textShadow: "15px 12px 30px rgba(0,0,0,1), 8px 6px 15px rgba(0,0,0,1)" 
                    }}
                  >
                    {staff.roleDescription}
                  </p>
                )}

                <p
                  className="text-zinc-400 font-light leading-[1.6] relative z-10 w-full mt-2"
                  style={{ 
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    maxWidth: "55ch",
                    textShadow: "10px 10px 20px rgba(0,0,0,1)"
                  }}
                >
                  {PROMO_TEXTS[i % PROMO_TEXTS.length]}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ── NAVIGATION DOTS & ARROWS ── */}
      <div className="absolute bottom-6 md:bottom-12 inset-x-0 z-40 flex flex-col items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <CaretRight size={24} className="text-white" />
          </button>
          
          <div className="flex items-center gap-3" dir="ltr">
            {staffData.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === i 
                    ? "w-8 h-2 bg-blue-400 shadow-[0_0_12px_rgba(0,180,216,0.8)]" 
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => scrollToIndex(Math.min(staffData.length - 1, activeIndex + 1))}
            disabled={activeIndex === staffData.length - 1}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <CaretLeft size={24} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
