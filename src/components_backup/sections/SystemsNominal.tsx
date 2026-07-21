"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PaperPlaneRight, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { getWhatsAppLink } from "@/lib/whatsappMessages";

import servicesData from "@/lib/servicesData.json";

const SERVICES = servicesData.map(s => s.title);

export function SystemsNominal() {
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const loopOverlayRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
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
    const fadeDuration = 0.5; // half second crossfade to black

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

  // Scroll Progress Physics
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Clean Video Fade Reveal
  const videoOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 0.8, 0.8, 0]);

  // Magical Text Reveal Variants
  const title1Str = "الخطوة الأولى تبدأ من هنا..";
  const title2Str = "احجز موعدك الآن.";
  const descStr = "الدعم الطبي جاهز للرد على استفساراتك وتحديد الموعد المناسب لك. يرجى تعبئة النموذج أدناه وسنتواصل معك في أقرب وقت ممكن.";

  const magicalContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const magicalWord = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] as const } 
    }
  };

  const formItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } 
    }
  };

  const completedFields = [name.trim(), phone.trim(), email.trim(), service].filter(Boolean).length;
  const progress = (completedFields / 4) * 100;

  // Auto-generate message
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
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service,
          message: whatsappMessage
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      const waLink = getWhatsAppLink(whatsappMessage);
      window.open(waLink, "_blank");
    } catch (error) {
      console.error(error);
      // Fallback to WhatsApp to ensure lead is not lost even if the backend is down
      const waLink = getWhatsAppLink(whatsappMessage);
      window.open(waLink, "_blank");
    } finally {
      setTimeout(() => setIsTransmitting(false), 500);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="systems-nominal"
      className="relative w-full bg-[#000814]"
      style={{ height: "250vh" }}
      dir="rtl"
    >
      <div 
        className="sticky top-0 left-0 w-full min-h-[100dvh] h-[100dvh] overflow-hidden flex flex-col justify-center bg-[#000814]"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c0e816;
          border-radius: 4px;
        }
      `}</style>

      {/* Looping Cinematic Video Background */}
      <motion.video
        ref={videoRef}
        src="/cinematic-contact-scrub.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover origin-center scale-105"
        style={{ 
          opacity: videoOpacity, 
          willChange: "transform, opacity", 
          transform: "translateZ(0)" 
        }}
      />
      
      {/* Dark Transition Overlay for seamless internal looping */}
      <div 
        ref={loopOverlayRef} 
        className="absolute inset-0 h-full w-full bg-[#000814] pointer-events-none z-[5]" 
        style={{ willChange: "opacity" }}
      />

      {/* Atmospheric Overlays with Heavy Vignette for Pitch Black Edges */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#000814] via-[#000814]/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#000814] via-[#000814]/60 to-transparent z-20 pointer-events-none" />

      {/* Cinematic Overlays */}
      <div className="pointer-events-none absolute right-6 top-20 md:right-10 md:top-24 z-30 flex items-center gap-2">
        <div className="h-px w-8 bg-[#c0e816]/60" />
        <span className="font-sans text-[12px] font-bold tracking-widest text-zinc-400">
          احجز الآن
        </span>
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-30 max-w-[1500px] mx-auto w-full px-6 md:px-12 lg:px-20 h-full flex flex-col md:flex-row items-center gap-12 md:gap-20"
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        
        {/* Right Column - Elegant Header */}
        <div className="w-full md:w-[45%] flex flex-col justify-center pt-20 md:pt-0">
          <motion.h2 
            variants={magicalContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-heading text-4xl md:text-5xl lg:text-[60px] font-black text-white leading-[1.2] tracking-tight m-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] min-h-[140px]"
          >
            {title1Str.split(" ").map((word, i) => (
              <motion.span key={i} variants={magicalWord} className="inline-block ml-3">{word}</motion.span>
            ))}
            <br />
            <span className="text-[#c0e816]">
              {title2Str.split(" ").map((word, i) => (
                <motion.span key={i} variants={magicalWord} className="inline-block ml-3">{word}</motion.span>
              ))}
            </span>
          </motion.h2>
          
          <motion.p 
            variants={magicalContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-sans text-white/90 text-lg md:text-xl font-medium leading-relaxed mt-8 max-w-md drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] min-h-[100px]"
          >
            {descStr.split(" ").map((word, i) => (
              <motion.span key={i} variants={magicalWord} className="inline-block ml-2">{word}</motion.span>
            ))}
          </motion.p>
        </div>

        {/* Left Column - Single Page Cinematic Form */}
        <div className="w-full md:w-[55%] relative flex flex-col justify-center">
          
          <div className="w-full bg-black/40 backdrop-blur-md  p-6 md:p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {/* Terminal Decorative Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#c0e816]/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#c0e816]/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#c0e816]/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#c0e816]/50" />

            {/* Form Header */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
                <div 
                  className="absolute right-0 top-0 bottom-0 bg-[#c0e816] transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%`, boxShadow: progress > 0 ? "0 0 10px #c0e816" : "none" }}
                />
              </div>
            </div>

            <motion.form 
              variants={magicalContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col gap-6" 
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <motion.div variants={formItemVariant} className="flex flex-col gap-2 group">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] group-focus-within:text-[#c0e816] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[#c0e816] transition-colors" />
                    الاسم الكامل
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-lg md:text-xl font-medium text-white placeholder-white/10 focus:outline-none focus:border-[#c0e816] transition-all rounded-none" 
                    placeholder="[ الاسم الكامل... ]"
                  />
                </motion.div>
                
                {/* Phone */}
                <motion.div variants={formItemVariant} className="flex flex-col gap-2 group">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] group-focus-within:text-[#c0e816] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[#c0e816] transition-colors" />
                    رقم الهاتف
                  </label>
                  <input 
                    required 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-lg md:text-xl font-mono font-medium text-[#c0e816] placeholder-white/10 focus:outline-none focus:border-[#c0e816] transition-all rounded-none" 
                    dir="ltr" 
                    placeholder="[ +967 ... ]" 
                  />
                </motion.div>
              </div>

              {/* Email & Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={formItemVariant} className="flex flex-col gap-2 group">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] group-focus-within:text-[#c0e816] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[#c0e816] transition-colors" />
                    البريد الإلكتروني
                  </label>
                  <input 
                    required 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-lg md:text-xl font-mono font-medium text-white placeholder-white/10 focus:outline-none focus:border-[#c0e816] transition-all rounded-none" 
                    dir="ltr" 
                    placeholder="[ you@domain.com ]"
                  />
                </motion.div>

                <motion.div variants={formItemVariant} className="flex flex-col gap-2 group">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] group-focus-within:text-[#c0e816] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-700 group-focus-within:bg-[#c0e816] transition-colors" />
                    الخدمة المطلوبة
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-transparent border-b px-0 py-2 text-lg md:text-xl font-medium focus:outline-none transition-all rounded-none text-right flex justify-between items-center ${isDropdownOpen ? 'border-[#c0e816]' : 'border-white/10'}`}
                    >
                      <span className={!service ? "text-white/30" : "text-white"}>
                        {service || "[ اختر الخدمة المطلوبة... ]"}
                      </span>
                      <span className={`text-[#c0e816] text-xs transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}>
                        ?
                      </span>
                    </button>
                    
                    {/* Custom Cinematic Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 w-full md:w-[calc(200%+1.5rem)] mt-2 bg-black/90 backdrop-blur-2xl  shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-50 transition-all duration-300 transform origin-top ${isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}
                    >
                      <div className="max-h-[250px] md:max-h-none overflow-y-auto md:overflow-visible custom-scrollbar p-2 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-x-2">
                        {SERVICES.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setService(s);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-right px-4 py-3 text-sm md:text-base font-medium transition-all duration-200 ${service === s ? "bg-[#c0e816]/10 text-[#c0e816] border-r-2 border-[#c0e816]" : "text-zinc-300 border-r-2 border-transparent hover:bg-white/5 hover:text-white"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Auto Message (Terminal Output) */}
              <motion.div variants={formItemVariant} className="flex flex-col gap-2 relative mt-2">
                <label className="font-mono text-[10px] text-[#c0e816] uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0e816] animate-pulse" />
                  رسالة الواتساب التلقائية
                </label>
                <div className="relative p-1  bg-black/60">
                  <textarea 
                    readOnly 
                    value={displayMessage} 
                    className="w-full h-[80px] bg-transparent border-none px-3 py-2 text-sm md:text-base leading-relaxed font-mono text-zinc-400 resize-none opacity-80 cursor-not-allowed focus:outline-none" 
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button 
                variants={formItemVariant}
                type="submit" 
                disabled={progress < 100 || isTransmitting}
                className={`mt-4 relative w-full flex items-center justify-center gap-4 border px-6 py-4 font-mono text-sm md:text-base font-bold tracking-[0.2em] transition-all duration-300 overflow-hidden ${progress < 100 ? 'bg-black/40 border-white/10 text-zinc-500 cursor-not-allowed' : isTransmitting ? 'bg-[#c0e816] border-[#c0e816] text-black shadow-[0_0_30px_rgba(192,232,22,0.4)] scale-[0.98]' : 'bg-white/[0.02] border-[#c0e816]/50 text-[#c0e816] hover:bg-[#c0e816] hover:text-black hover:shadow-[0_0_20px_rgba(192,232,22,0.3)]'}`}
              >
                {!isTransmitting && progress === 100 && (
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
                )}
                
                {isTransmitting && (
                  <div className="absolute inset-0 w-[200%] h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)] -translate-x-full animate-[shimmer_1.5s_infinite]" />
                )}
                
                <span className="relative z-10 transition-colors duration-300">
                  {progress < 100 ? 'أكمل البيانات المطلوبة' : isTransmitting ? 'جاري إرسال الطلب...' : 'تأكيد الحجز (واتساب)'}
                </span>
              </motion.button>
            </motion.form>
          </div>

          {/* Transmitting Overlay Mask */}
          {isTransmitting && (
            <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300 #c0e816]/30">
               <div className="relative flex items-center justify-center">
                 <CircleNotch size={80} className="text-[#c0e816] animate-spin opacity-20 absolute" weight="light" />
                 <CircleNotch size={50} className="text-[#c0e816] animate-spin absolute" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
                 <div className="w-3 h-3 bg-[#c0e816] rounded-full animate-pulse shadow-[0_0_15px_#c0e816]" />
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="font-sans text-sm font-bold tracking-widest text-[#c0e816] animate-pulse">
                   جاري معالجة البيانات
                 </div>
                 <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 overflow-hidden w-full whitespace-nowrap">
                   [========================] 100%
                 </div>
               </div>
            </div>
          )}
        </div>
      </motion.div>
      </div>
    </section>
  );
}

