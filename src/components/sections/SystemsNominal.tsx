"use client";

import { useState, useEffect, useRef } from "react";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import servicesData from "@/lib/servicesData.json";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const ARABIC_SERVICES: Record<string, string> = {
  "Male Infertility": "أمراض الذكورة والعقم",
  "IX73 IMSI System": "الحقن المجهري (IMSI)",
  "Cosmetic Ultrasound": "السونار التجميلي",
  "Freezing Unit": "وحدة التجميد",
  "Gender Selection": "تحديد نوع الجنين",
  "IUI": "التلقيح الصناعي (IUI)",
  "Laparoscopy": "جراحة المناظير",
  "OB/GYN Clinic": "عيادة النساء والولادة",
  "Ovulation Stimulation": "تنشيط التبويض"
};

const SERVICES = servicesData.map(s => ARABIC_SERVICES[s.title] || s.title);

export function SystemsNominal() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const loopOverlayRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let animId: number;
    const fadeDuration = 0.5;

    const checkVideoFading = () => {
      const video = videoRef.current;
      const overlay = loopOverlayRef.current;
      
      if (video && overlay && video.duration > 0) {
        const time = video.currentTime;
        const duration = video.duration;
        let overlayOpacity = 0;

        if (time < fadeDuration) {
          overlayOpacity = 1 - (time / fadeDuration);
        } else if (duration - time < fadeDuration) {
          overlayOpacity = 1 - ((duration - time) / fadeDuration);
        }

        overlay.style.opacity = overlayOpacity.toString();
      }
      animId = requestAnimationFrame(checkVideoFading);
    };

    animId = requestAnimationFrame(checkVideoFading);
    return () => cancelAnimationFrame(animId);
  }, []);

  useGSAP(() => {
    // gsap.set(".s9-anim-word", { opacity: 0, y: 20 });
    // gsap.set(".s9-anim-form", { opacity: 0, y: 20 });
    
    if (videoRef.current) {
      videoRef.current.pause();
    }

    const playEntrance = () => {
      const tl = gsap.timeline();
      tl.to(".s9-anim-word", { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out" }, 0.2);
      tl.to(".s9-anim-form", { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, 0.5);
      
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    };

    const resetState = () => {
      // gsap.set(".s9-anim-word", { opacity: 0, y: 20 });
      // gsap.set(".s9-anim-form", { opacity: 0, y: 20 });
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    let isFullPage = false;
    const handleIndex = (e: Event) => {
      isFullPage = true;
      const customEvent = e as CustomEvent;
      const mySection = containerRef.current?.closest('main > div');
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

    const observer = new IntersectionObserver((entries) => {
      if (isFullPage) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("sectionIndexChanged", handleIndex);
      observer.disconnect();
    };
  }, { scope: containerRef });

  const title1Str = "الخطوة الأولى تبدأ من هنا..";
  const title2Str = "احجز موعدك الآن.";
  const descStr = "الدعم الطبي جاهز للرد على استفساراتك وتحديد الموعد المناسب لك. يرجى تعبئة النموذج أدناه وسنتواصل معك في أقرب وقت ممكن.";

  const completedFields = [name.trim(), phone.trim(), email.trim(), service].filter(Boolean).length;
  const progress = (completedFields / 4) * 100;

  const displayMessage = service 
    ? `مرحباً مركز د. نجاة الملس،\nأود الاستفسار عن خدمة: ${service}\nشكراً لكم.`
    : "يرجى تعبئة الحقول المطلوبة لبدء المحادثة...";
    
  const whatsappMessage = service
    ? `مرحباً مركز د. نجاة الملس،\nالاسم: ${name.trim() || "[لم يتم الإدخال]"}\nالخدمة المطلوبة: ${service}\nرقم الهاتف: ${phone.trim() || "[لم يتم الإدخال]"}\nالبريد الإلكتروني: ${email.trim() || "[لم يتم الإدخال]"}`
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (progress < 100 || isTransmitting) return;
    setIsTransmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim(), service, message: whatsappMessage })
      });
      if (!response.ok) throw new Error("Failed to submit form");
      window.open(getWhatsAppLink(whatsappMessage), "_blank");
    } catch (error) {
      console.error(error);
      window.open(getWhatsAppLink(whatsappMessage), "_blank");
    } finally {
      setTimeout(() => setIsTransmitting(false), 500);
    }
  };

  return (
    <section ref={containerRef} id="systems-nominal" className="relative w-full bg-[var(--page-bg)] min-h-[100dvh] h-auto md:h-[100dvh]" dir="rtl">
      <div className="relative w-full h-full min-h-[100dvh] flex flex-col justify-center bg-[var(--page-bg)] py-10 md:py-0" style={{ willChange: "transform", transform: "translateZ(0)" }}>
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: var(--border-subtle); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 4px; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video ref={videoRef} src="/cinematic-contact-scrub.original.mp4" muted loop playsInline className="absolute inset-0 h-full w-full object-cover origin-center opacity-70" style={{ willChange: "transform, opacity", transform: "translateZ(0)" }} />
        <div ref={loopOverlayRef} className="absolute inset-0 h-full w-full bg-[var(--page-bg)] pointer-events-none z-[5]" style={{ willChange: "opacity" }} />
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--page-bg)]/50 via-[var(--page-bg)]/20 to-[var(--page-bg)] pointer-events-none z-10" />
      </div>

      <div className="hidden md:flex pointer-events-none absolute right-6 top-20 md:right-10 md:top-24 z-30 items-center gap-2">
        <div className="h-px w-8 bg-[var(--accent)]/60" />
        <span className="font-sans text-[12px] font-bold tracking-widest text-[var(--text-tertiary)]">احجز الآن</span>
      </div>

      <div className="relative z-30 max-w-[1500px] mx-auto w-full px-4 md:px-12 lg:px-20 h-full flex flex-col md:flex-row items-center gap-4 md:gap-20">
        
        <div className="w-full md:w-[45%] flex flex-col justify-center pt-8 pb-2 md:pt-0 md:pb-0">
          <h2 className="font-heading text-xl md:text-5xl lg:text-[60px] font-black text-[var(--text-primary)] leading-[1.2] tracking-tight m-0 dark:drop-shadow-[0_10px_30px_var(--shadow-color)] min-h-0 md:min-h-[140px] text-center md:text-right">
            {title1Str.split(" ").map((word, i) => <span key={`t1-${i}`} className="s9-anim-word inline-block ml-2 md:ml-3">{word}</span>)}
            <br className="hidden md:block" />
            <span className="hidden md:inline text-[var(--accent)]">
              {title2Str.split(" ").map((word, i) => <span key={`t2-${i}`} className="s9-anim-word inline-block ml-3">{word}</span>)}
            </span>
          </h2>
          
          <p className="hidden md:block font-sans text-[var(--text-primary)] text-lg md:text-xl font-medium leading-relaxed mt-8 max-w-md dark:drop-shadow-[0_5px_15px_var(--shadow-color)] min-h-[100px]">
            {descStr.split(" ").map((word, i) => <span key={`desc-${i}`} className="s9-anim-word inline-block ml-2">{word}</span>)}
          </p>
        </div>

        <div className="w-full md:w-[55%] relative flex flex-col justify-center">
          <div className="w-[95%] md:w-full mx-auto bg-[var(--surface-glass)] backdrop-blur-md p-3 md:p-8 relative shadow-[0_20px_60px_var(--shadow-color)]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]/50" />

            <div className="flex flex-col gap-2 mb-3 md:mb-6">
              <div className="w-full h-[2px] bg-[var(--surface-elevated)] relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 bg-[var(--accent)] transition-all duration-500 ease-out" style={{ width: `${progress}%`, boxShadow: progress > 0 ? "0 0 10px var(--accent)" : "none" }} />
              </div>
            </div>

            <form className="flex flex-col gap-3 md:gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="s9-anim-form flex flex-col gap-2 group">
                  <label className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.2em] group-focus-within:text-[var(--accent)] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[var(--accent)] transition-colors" />الاسم الكامل
                  </label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-transparent border-b border-[var(--border-subtle)] px-0 py-1.5 md:py-2 text-sm md:text-xl font-medium text-[var(--text-primary)] placeholder-[var(--text-muted-light)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-none" placeholder="[ الاسم الكامل... ]" />
                </div>
                
                <div className="s9-anim-form flex flex-col gap-2 group">
                  <label className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.2em] group-focus-within:text-[var(--accent)] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[var(--accent)] transition-colors" />رقم الهاتف
                  </label>
                  <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-transparent border-b border-[var(--border-subtle)] px-0 py-1.5 md:py-2 text-sm md:text-xl font-mono font-medium text-[var(--accent)] placeholder-[var(--text-muted-light)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-none" dir="ltr" placeholder="[ +967 ... ]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="s9-anim-form flex flex-col gap-2 group">
                  <label className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.2em] group-focus-within:text-[var(--accent)] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[var(--accent)] transition-colors" />البريد الإلكتروني
                  </label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border-b border-[var(--border-subtle)] px-0 py-1.5 md:py-2 text-sm md:text-xl font-mono font-medium text-[var(--text-primary)] placeholder-[var(--text-muted-light)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-none" dir="ltr" placeholder="[ you@domain.com ]" />
                </div>

                <div className="s9-anim-form flex flex-col gap-2 group relative z-50">
                  <label className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.2em] group-focus-within:text-[var(--accent)] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[var(--accent)] transition-colors" />الخدمة المطلوبة
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full bg-transparent border-b px-0 py-1.5 md:py-2 text-sm md:text-xl font-medium focus:outline-none transition-all rounded-none text-right flex justify-between items-center ${isDropdownOpen ? 'border-[var(--accent)]' : 'border-[var(--border-subtle)]'}`}>
                      <span className={!service ? "text-[var(--text-muted-light)]" : "text-[var(--text-primary)]"}>{service || "[ اختر الخدمة المطلوبة... ]"}</span>
                      <span className={`text-[var(--accent)] text-xs transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}>?</span>
                    </button>
                    
                    <div className={`absolute top-full left-0 w-full md:w-[calc(200%+1.5rem)] mt-2 bg-[var(--surface-glass)] backdrop-blur-2xl shadow-[0_20px_60px_var(--shadow-color)] z-50 transition-all duration-300 transform origin-top ${isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}>
                      <div className="max-h-[250px] md:max-h-none overflow-y-auto md:overflow-visible custom-scrollbar p-2 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-x-2">
                        {SERVICES.map(s => (
                          <button key={s} type="button" onClick={() => { setService(s); setIsDropdownOpen(false); }} className={`w-full text-right px-4 py-3 text-sm md:text-base font-medium transition-all duration-200 ${service === s ? "bg-[var(--accent)]/10 text-[var(--accent)] border-r-2 border-[var(--accent)]" : "text-[var(--text-secondary)] border-r-2 border-transparent hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="s9-anim-form flex flex-col gap-2 relative mt-2">
                <label className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />رسالة الواتساب التلقائية
                </label>
                <div className="relative p-1 bg-[var(--surface-glass)]">
                  <textarea readOnly value={displayMessage} className="w-full h-[50px] md:h-[80px] bg-transparent border-none px-3 py-1.5 md:py-2 text-xs md:text-base leading-relaxed font-mono text-[var(--text-tertiary)] resize-none opacity-80 cursor-not-allowed focus:outline-none" />
                </div>
              </div>

              <button type="submit" disabled={progress < 100 || isTransmitting} className={`s9-anim-form mt-2 md:mt-4 relative w-full flex items-center justify-center gap-4 border px-6 py-2.5 md:py-4 font-mono text-sm md:text-base font-bold tracking-[0.2em] transition-all duration-300 overflow-hidden ${progress < 100 ? 'bg-[var(--surface-glass)] border-[var(--border-subtle)] text-[var(--text-muted-light)] cursor-not-allowed' : isTransmitting ? 'bg-[var(--accent)] border-[var(--accent)] text-black shadow-[0_0_30px_rgba(192,232,22,0.4)] scale-[0.98]' : 'bg-[var(--surface-elevated)] border-[var(--accent)]/50 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_20px_rgba(192,232,22,0.3)]'}`}>
                {!isTransmitting && progress === 100 && <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />}
                {isTransmitting && <div className="absolute inset-0 w-[200%] h-full bg-[linear-gradient(90deg,transparent,var(--text-primary),transparent)] -translate-x-full animate-[shimmer_1.5s_infinite]" />}
                <span className="relative z-10 transition-colors duration-300">
                  {progress < 100 ? 'أكمل البيانات المطلوبة' : isTransmitting ? 'جاري إرسال الطلب...' : 'تأكيد الحجز (واتساب)'}
                </span>
              </button>
            </form>
          </div>

          {isTransmitting && (
            <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300 var(--accent)]/30">
               <div className="relative flex items-center justify-center">
                 <CircleNotch size={80} className="text-[var(--accent)] animate-spin opacity-20 absolute" weight="light" />
                 <CircleNotch size={50} className="text-[var(--accent)] animate-spin absolute" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
                 <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse shadow-[0_0_15px_var(--accent)]" />
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="font-sans text-sm font-bold tracking-widest text-[var(--accent)] animate-pulse">جاري معالجة البيانات</div>
                 <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted-light)] overflow-hidden w-full whitespace-nowrap">[========================] 100%</div>
               </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
