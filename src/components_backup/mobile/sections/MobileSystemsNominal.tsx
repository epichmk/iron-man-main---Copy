"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import { LazyVideo } from "@/components/ui/LazyVideo";
import servicesData from "@/lib/servicesData.json";

const SERVICES = servicesData.map(s => s.title);

export function MobileSystemsNominal() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service,
          message: whatsappMessage
        })
      });

      if (!response.ok) throw new Error("Failed to submit form");
      const waLink = getWhatsAppLink(whatsappMessage);
      window.open(waLink, "_blank");
    } catch (error) {
      console.error(error);
      const waLink = getWhatsAppLink(whatsappMessage);
      window.open(waLink, "_blank");
    } finally {
      setTimeout(() => setIsTransmitting(false), 500);
    }
  };

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[#000814]" dir="rtl">
      {/* Background Video */}
      <LazyVideo
        src="/cinematic-contact-scrub.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40 scale-105"
      />
      
      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

      {/* Main Content Scrollable Area */}
      <div className="relative z-20 w-full h-full px-5 flex flex-col items-center justify-center">
        
        {/* Header */}
        <div className="w-full text-center mb-6">
          <h2 className="font-heading text-3xl font-black text-white leading-[1.2] tracking-tight dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-2">
            الخطوة الأولى تبدأ من هنا..<br />
            <span className="text-[#c0e816]">احجز موعدك الآن.</span>
          </h2>
          <p className="font-sans text-white/90 text-[11px] leading-relaxed max-w-sm mx-auto dark:drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
            الدعم الطبي جاهز للرد على استفساراتك وتحديد الموعد المناسب لك. يرجى تعبئة النموذج أدناه وسنتواصل معك في أقرب وقت ممكن.
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md bg-black/50 backdrop-blur-md p-5 relative shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/5 rounded-2xl mb-4">
          
          <div className="flex flex-col gap-2 mb-6">
            <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
              <div 
                className="absolute right-0 top-0 bottom-0 bg-[#c0e816] transition-all duration-500 ease-out" 
                style={{ width: `${progress}%`, boxShadow: progress > 0 ? "0 0 10px #c0e816" : "none" }}
              />
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 group">
              <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-zinc-700" /> الاسم الكامل
              </label>
              <input 
                required 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-base font-medium text-white placeholder-white/10 focus:outline-none focus:border-[#c0e816] transition-all rounded-none" 
                placeholder="[ الاسم الكامل... ]"
              />
            </div>
            
            <div className="flex flex-col gap-1 group">
              <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-zinc-700" /> رقم الهاتف
              </label>
              <input 
                required 
                type="tel" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-base font-mono font-medium text-[#c0e816] placeholder-white/10 focus:outline-none focus:border-[#c0e816] transition-all rounded-none" 
                dir="ltr" 
                placeholder="[ +967 ... ]" 
              />
            </div>

            <div className="flex flex-col gap-1 group">
              <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-zinc-700" /> البريد الإلكتروني
              </label>
              <input 
                required 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-base font-mono font-medium text-white placeholder-white/10 focus:outline-none focus:border-[#c0e816] transition-all rounded-none" 
                dir="ltr" 
                placeholder="[ you@domain.com ]"
              />
            </div>

            <div className="flex flex-col gap-1 group relative">
              <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-zinc-700" /> الخدمة المطلوبة
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full bg-transparent border-b px-0 py-2 text-base font-medium focus:outline-none transition-all rounded-none text-right flex justify-between items-center ${isDropdownOpen ? 'border-[#c0e816]' : 'border-white/10'}`}
                >
                  <span className={!service ? "text-white/30" : "text-white"}>
                    {service || "[ اختر الخدمة... ]"}
                  </span>
                  <span className={`text-[#c0e816] text-xs transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-black/95 backdrop-blur-3xl shadow-2xl z-50 rounded-xl overflow-hidden border border-white/10">
                    <div className="max-h-[200px] overflow-y-auto">
                      {SERVICES.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setService(s);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-right px-4 py-3 text-sm font-medium transition-all ${service === s ? "bg-[#c0e816]/20 text-[#c0e816]" : "text-zinc-300 hover:bg-white/5"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="font-mono text-[10px] text-[#c0e816] uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c0e816] animate-pulse" />
                رسالة الواتساب التلقائية
              </label>
              <div className="relative p-1 bg-black/60 rounded-xl border border-white/5">
                <textarea 
                  readOnly 
                  value={displayMessage} 
                  className="w-full h-[60px] bg-transparent border-none px-3 py-2 text-xs leading-relaxed font-mono text-zinc-400 resize-none opacity-80 cursor-not-allowed focus:outline-none" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={progress < 100 || isTransmitting}
              className={`mt-2 w-full flex items-center justify-center py-3 rounded-xl font-mono text-sm font-bold tracking-widest transition-all duration-300 ${progress < 100 ? 'bg-white/5 text-zinc-500 cursor-not-allowed' : isTransmitting ? 'bg-[#c0e816] text-black shadow-[0_0_20px_rgba(192,232,22,0.4)]' : 'bg-[#c0e816]/10 text-[#c0e816] border border-[#c0e816]/50 hover:bg-[#c0e816] hover:text-black hover:shadow-[0_0_20px_rgba(192,232,22,0.3)]'}`}
            >
              <span className="relative z-10">
                {progress < 100 ? 'أكمل البيانات' : isTransmitting ? 'جاري الإرسال...' : 'تأكيد الحجز (واتساب)'}
              </span>
            </button>
          </form>
        </div>
      </div>

      {isTransmitting && (
        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-6">
           <div className="relative flex items-center justify-center">
             <CircleNotch size={60} className="text-[#c0e816] animate-spin absolute" />
             <div className="w-2 h-2 bg-[#c0e816] rounded-full animate-pulse shadow-[0_0_10px_#c0e816]" />
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="font-sans text-xs font-bold tracking-widest text-[#c0e816] animate-pulse">
               جاري التحويل للواتساب...
             </div>
           </div>
        </div>
      )}
    </section>
  );
}
