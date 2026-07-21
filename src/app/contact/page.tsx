"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { UiTicket } from "@/components/ui/UiTicket";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, EnvelopeSimple, MapPin, Clock, WhatsappLogo, CircleNotch, CheckCircle, ArrowUpLeft, Stethoscope, Headset } from "@phosphor-icons/react";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 20, y: 15, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const formContainerVariants = {
  hidden: { opacity: 0, x: -20, y: 15, scale: 0.98 },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"patient" | "partner">("patient");
  const [focusedForm, setFocusedForm] = useState<"patient" | "partner" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "استشارة طبية عامة",
    message: ""
  });
  const [partnerFormData, setPartnerFormData] = useState({
    companyName: "",
    representativeName: "",
    phone: "",
    email: "",
    partnershipArea: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus("success");
      
      const text = `مرحباً مركز د. نجاة الملس.
الاسم: ${formData.name}
الهاتف: ${formData.phone}
البريد: ${formData.email}
الخدمة المطلوبة: ${formData.service}
الرسالة: ${formData.message}`;
      
      window.open(getWhatsAppLink(text), "_blank");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setErrorMessage("عذراً، حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <main className="bg-[var(--page-bg)] text-foreground min-h-screen flex flex-col">
      <UiTicket />


      <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col lg:block justify-start lg:justify-center pt-28 lg:pt-32 pb-16 lg:pb-8 px-4 lg:px-8 overflow-x-hidden lg:overflow-hidden">
        
        {/* Cinematic Deep Mesh Background with Parallax & Floating Orbs */}
        <motion.div 
          style={{ y: yBg, scale: scaleBg }} 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[var(--page-bg)]"
        >
          <motion.div 
            animate={{ 
              y: [0, -40, 0], scale: [1, 1.1, 1], x: [0, 20, 0]
            }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] bg-blue-500/10" 
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0], scale: [1, 1.15, 1], x: [0, -20, 0],
            }} 
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] bg-[#0066FF]/10" 
          />
        </motion.div>

        {/* Dynamic Center Text (Interactive) - Unique Flowing Gradient & Glowing Effect */}
        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-[320px] lg:right-[380px] xl:right-[450px] z-10 pointer-events-none flex-col items-start justify-center w-[300px] xl:w-[400px] text-right" dir="rtl">
          <AnimatePresence mode="wait">
            {focusedForm === 'patient' ? (
              <motion.h1 
                key="patient"
                initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  filter: "blur(0px)",
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                exit={{ opacity: 0, y: -20, scale: 1.05, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] as const,
                  backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
                }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#0094FE] to-[#0066FF] bg-[length:200%_auto] drop-shadow-[0_0_40px_rgba(0,102,255,0.2)] font-heading leading-tight"
              >
                رحلتك نحو الأمومة<br/>تبدأ هنا.
              </motion.h1>
            ) : focusedForm === 'partner' ? (
              <motion.h1 
                key="partner"
                initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  filter: "blur(0px)",
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                exit={{ opacity: 0, y: -20, scale: 1.05, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] as const,
                  backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
                }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#d4e616] to-[#a3b30e] bg-[length:200%_auto] drop-shadow-[0_0_40px_rgba(212,230,22,0.2)] font-heading leading-tight"
              >
                العمل معنا<br/>بناء المستحيل.
              </motion.h1>
            ) : (
              <motion.h1 
                key="default"
                initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                animate={{ 
                  opacity: 0.6, 
                  y: 0, 
                  scale: 1, 
                  filter: "blur(0px)",
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                exit={{ opacity: 0, y: -20, scale: 1.05, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] as const,
                  backgroundPosition: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-secondary)] via-[var(--text-primary)] to-[var(--text-secondary)] bg-[length:200%_auto] drop-shadow-[0_0_20px_var(--shadow-color)] font-heading leading-tight"
              >
                نحن هنا<br/>من أجلك.
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Contact Details (Floating on Right like Homepage) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-6 xl:right-16 2xl:right-32 z-40 flex flex-col gap-3 w-full lg:max-w-[300px] shrink-0 py-2 pointer-events-auto order-2 lg:order-none mt-12 lg:mt-0" dir="rtl"
        >

              <motion.a variants={itemVariantsRight} href={getWhatsAppLink("مرحباً، أود حجز موعد.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                 <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 1.0 }} className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                    <WhatsappLogo size={28} weight="fill" />
                 </motion.div>
                 <div className="flex flex-col text-right">
                    <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">واتساب (للحجز)</span>
                    <span className="text-[var(--text-primary)] font-sans text-lg tracking-wide group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 781 878 443</span>
                 </div>
              </motion.a>

              <motion.a variants={itemVariantsRight} href="tel:+9671513729" className="flex items-center justify-start gap-5 group">
                 <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 1.2 }} className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                    <Phone size={28} weight="fill" />
                 </motion.div>
                  <div className="flex flex-col text-right">
                     <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">الاستقبال (للحجز)</span>
                     <span className="text-[var(--text-primary)] font-sans text-lg tracking-wide group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 1 513 729</span>
                 </div>
              </motion.a>

              <motion.a variants={itemVariantsRight} href="tel:+967775950500" className="flex items-center justify-start gap-5 group">
                 <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 1.4 }} className="text-[var(--text-secondary)] group-hover:text-blue-400 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                    <Stethoscope size={28} weight="fill" />
                 </motion.div>
                 <div className="flex flex-col text-right">
                    <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">الاستشارات الطبية</span>
                    <span className="text-[var(--text-primary)] font-sans text-lg tracking-wide group-hover:text-blue-400 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">+967 775 950 500</span>
                 </div>
              </motion.a>

              <motion.a variants={itemVariantsRight} href="mailto:ivfnmc@gmail.com" className="flex items-center justify-start gap-5 group">
                 <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 1.6 }} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                    <EnvelopeSimple size={28} weight="fill" />
                 </motion.div>
                 <div className="flex flex-col text-right">
                    <span className="text-[var(--text-tertiary)] text-xs font-medium mb-0.5 transition-colors duration-500 group-hover:text-[var(--text-secondary)]">البريد الإلكتروني</span>
                    <span className="text-[var(--text-primary)] font-sans text-sm tracking-wide group-hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">ivfnmc@gmail.com</span>
                 </div>
              </motion.a>

              <motion.div variants={itemVariantsRight} className="flex items-center justify-start gap-5 group pt-2">
                 <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 1.8 }} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                    <MapPin size={28} weight="fill" />
                 </motion.div>
                 <div className="flex flex-col text-right">
                    <span className="text-[var(--text-primary)] font-bold text-sm transition-colors duration-500 group-hover:text-[var(--text-primary)]">صنعاء، جولة فلسطين</span>
                 </div>
              </motion.div>

              <motion.div variants={itemVariantsRight} className="flex items-center justify-start gap-5 group">
                 <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 2.0 }} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                    <Clock size={28} weight="fill" />
                 </motion.div>
                 <div className="flex flex-col text-right">
                    <span className="text-[var(--text-primary)] font-bold text-sm transition-colors duration-500 group-hover:text-[var(--text-primary)]">ساعات العمل</span>
                    <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="rtl">السبت - الخميس | 9:00 ص - 3:00 م</span>
                 </div>
              </motion.div>

              <motion.div variants={itemVariantsRight} className="flex items-center justify-start gap-5 group">
                 <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 2.2 }} className="text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                    <Headset size={28} weight="fill" />
                 </motion.div>
                 <div className="flex flex-col text-right">
                    <span className="text-[var(--text-primary)] font-bold text-sm transition-colors duration-500 group-hover:text-[var(--text-primary)]">أوقات الاتصال</span>
                    <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="rtl">السبت - الخميس | 9:00 ص - 9:00 م</span>
                 </div>
              </motion.div>

              {/* Cohesive Elegant Socials */}
              <motion.div variants={itemVariantsRight} className="flex flex-col gap-3 pt-4 mt-1 border-t border-[var(--border-subtle)] w-full">
                 <a href="https://www.instagram.com/dr.najat_almalass_center" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                    <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 2.4 }} className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                       <Image src="/instagram.png" alt="Instagram" fill className="object-cover rounded-full" />
                    </motion.div>
                    <div className="flex flex-col items-start text-right">
                       <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                          انستجرام
                          <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-accent opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                       </span>
                       <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="ltr">@dr.najat_almalass_center</span>
                    </div>
                 </a>

                 <a href="https://www.facebook.com/najatalmalascenter" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                    <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 2.6 }} className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                       <Image src="/facebook.png" alt="Facebook" fill className="object-cover rounded-full" />
                    </motion.div>
                    <div className="flex flex-col items-start text-right">
                       <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                          فيسبوك
                          <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-accent opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                       </span>
                       <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="ltr">/najatalmalascenter</span>
                    </div>
                 </a>

                 <a href={getWhatsAppLink("مرحباً، أود التواصل معكم.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-5 group">
                    <motion.div animate={{ y: [0, -8, 0, 0], scale: [1, 1.1, 1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 1], delay: 2.8 }} className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 rounded-full overflow-hidden">
                       <Image src="/whatsapp.png" alt="WhatsApp" fill className="object-cover rounded-full" />
                    </motion.div>
                    <div className="flex flex-col items-start text-right">
                       <span className="text-[var(--text-primary)] font-medium text-sm mb-0.5 group-hover:text-accent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative inline-block">
                          واتساب
                          <ArrowUpLeft size={14} weight="bold" className="absolute -left-5 top-0.5 text-accent opacity-0 -translate-y-1 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                       </span>
                       <span className="text-[var(--text-tertiary)] text-xs font-medium transition-colors duration-500 group-hover:text-[var(--text-secondary)]" dir="ltr">+967 781 878 443</span>
                    </div>
                 </a>
              </motion.div>
        </motion.div>

        {/* LEFT COLUMN: Split Forms Container */}
        <motion.div 
          variants={formContainerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.2 }}
          className="relative lg:absolute lg:top-[42%] lg:-translate-y-1/2 lg:left-4 xl:left-12 2xl:left-24 z-40 w-full lg:max-w-[750px] pointer-events-auto flex flex-col lg:flex-row gap-4 order-1 lg:order-none" 
          dir="rtl"
        >
           {/* PATIENT FORM CARD */}
           <div 
             className={`flex flex-col flex-1 bg-[var(--page-bg)]/80 backdrop-blur-3xl border ${focusedForm === 'patient' ? 'border-blue-500/50 shadow-[0_0_100px_rgba(0,102,255,0.2)] lg:scale-[1.02]' : 'border-[var(--border-subtle)] shadow-[0_0_80px_rgba(0,100,255,0.15)]'} rounded-[1.5rem] lg:rounded-[2rem] p-4 lg:p-6 relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
             onFocus={() => setFocusedForm('patient')}
             onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocusedForm(null); }}
           >
             <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/20 blur-[100px] pointer-events-none" />
             <h2 className="text-lg lg:text-xl font-bold text-[var(--text-primary)] mb-0.5 lg:mb-1 font-heading">حجز موعد طبي</h2>
             <p className="text-[var(--text-tertiary)] text-[10px] lg:text-xs mb-3 lg:mb-4 font-sans leading-relaxed">تواصلوا معنا للحجز المباشر أو للاستشارة.</p>

               <motion.form 
                 onSubmit={handleSubmit} 
                 className="w-full flex flex-col flex-1 gap-2.5 lg:gap-3 relative z-10"
               >
                 {submitStatus === "success" && (
                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-2 rounded-xl font-sans text-xs flex items-center justify-center gap-2">
                     <CheckCircle size={16} weight="fill" /> تم التحويل لواتساب.
                   </motion.div>
                 )}
                 {submitStatus === "error" && (
                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-xl font-sans text-xs flex items-center justify-center gap-2">
                     {errorMessage}
                   </motion.div>
                 )}

                 <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                   <div className="w-full">
                     <input required type="text" placeholder="الاسم الكامل *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-blue-400 focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)]" />
                   </div>
                   <div className="w-full">
                     <input type="tel" placeholder="رقم الهاتف" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-blue-400 focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)]" dir="rtl" />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                   <div className="w-full">
                     <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-blue-400 focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)]" dir="ltr" />
                   </div>
                   <div className="w-full relative">
                     <select value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-blue-400 focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all appearance-none cursor-pointer font-sans">
                       <option value="استشارة طبية عامة" className="bg-[var(--page-bg)]">استشارة طبية عامة</option>
                       <option value="نظام الميكروسكوب الفائق IX73 للحقن المجهري (IMSI)" className="bg-[var(--page-bg)]">الحقن المجهري الدقيق (IMSI)</option>
                       <option value="الموجات فوق الصوتية التجميلية" className="bg-[var(--page-bg)]">الموجات فوق الصوتية التجميلية</option>
                       <option value="وحدة التجميد" className="bg-[var(--page-bg)]">وحدة التجميد (بويضات/أجنة)</option>
                       <option value="تحديد الجنس" className="bg-[var(--page-bg)]">تحديد جنس الجنين</option>
                       <option value="أمراض الذكورة" className="bg-[var(--page-bg)]">عيادة أمراض الذكورة</option>
                       <option value="حاضنات ذكية" className="bg-[var(--page-bg)]">مراقبة الأجنة بالحاضنات الذكية</option>
                       <option value="التلقيح الصناعي" className="bg-[var(--page-bg)]">التلقيح الصناعي (IUI)</option>
                       <option value="تنظير البطن" className="bg-[var(--page-bg)]">عمليات تنظير البطن</option>
                       <option value="العقم عند الذكور" className="bg-[var(--page-bg)]">علاج العقم عند الذكور</option>
                       <option value="عيادة النساء والتوليد" className="bg-[var(--page-bg)]">عيادة النساء والتوليد</option>
                       <option value="نظام ليزر OCTAX" className="bg-[var(--page-bg)]">نظام ليزر OCTAX</option>
                       <option value="تنشيط الإباضة" className="bg-[var(--page-bg)]">برامج تنشيط الإباضة</option>
                     </select>
                   </div>
                 </div>
                 
                 <div className="w-full">
                   <textarea required placeholder="اكتب استفسارك هنا..." rows={2} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-blue-400 focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)] resize-none" />
                 </div>
                 
                 <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full mt-auto h-[40px] lg:h-[44px] rounded-xl bg-gradient-to-r from-blue-500 to-[#0066FF] text-white hover:opacity-90 font-bold text-[11px] lg:text-xs font-sans flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                   {isSubmitting ? <CircleNotch size={16} className="animate-spin" /> : <WhatsappLogo size={16} weight="fill" />}
                   إرسال عبر الواتساب
                 </motion.button>
               </motion.form>
           </div>

           {/* PARTNER FORM CARD */}
           <div 
             className={`flex flex-col flex-1 bg-[var(--page-bg)]/80 backdrop-blur-3xl border ${focusedForm === 'partner' ? 'border-[#0066FF]/50 shadow-[0_0_100px_rgba(0,102,255,0.2)] lg:scale-[1.02]' : 'border-[var(--border-subtle)] shadow-[0_0_80px_rgba(0,100,255,0.15)]'} rounded-[1.5rem] lg:rounded-[2rem] p-4 lg:p-6 relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
             onFocus={() => setFocusedForm('partner')}
             onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocusedForm(null); }}
           >
             <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#0066FF]/20 blur-[100px] pointer-events-none" />
             <h2 className="text-lg lg:text-xl font-bold text-[var(--text-primary)] mb-0.5 lg:mb-1 font-heading">مستعدون للعمل معنا؟</h2>
             <p className="text-[var(--text-tertiary)] text-[10px] lg:text-xs mb-3 lg:mb-4 font-sans leading-relaxed">معاً يمكننا بناء المستحيل.</p>

               <motion.form 
                 onSubmit={(e) => {
                   e.preventDefault();
                   window.open(getWhatsAppLink("مرحباً، أود التواصل لبحث آفاق الشراكة معكم."), "_blank");
                 }} 
                 className="w-full flex flex-col flex-1 gap-2.5 lg:gap-3 relative z-10"
               >
                 <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                   <div className="w-full">
                     <input required type="text" placeholder="الجهة / الشركة *" value={partnerFormData.companyName} onChange={(e) => setPartnerFormData({...partnerFormData, companyName: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-accent focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(212,230,22,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)]" />
                   </div>
                   <div className="w-full">
                     <input required type="text" placeholder="اسم الممثل *" value={partnerFormData.representativeName} onChange={(e) => setPartnerFormData({...partnerFormData, representativeName: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-accent focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(212,230,22,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)]" />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                   <div className="w-full">
                     <input required type="tel" placeholder="رقم التواصل *" value={partnerFormData.phone} onChange={(e) => setPartnerFormData({...partnerFormData, phone: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-accent focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(212,230,22,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)]" dir="rtl" />
                   </div>
                   <div className="w-full">
                     <input required type="email" placeholder="البريد الإلكتروني *" value={partnerFormData.email} onChange={(e) => setPartnerFormData({...partnerFormData, email: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-accent focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(212,230,22,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)]" dir="ltr" />
                   </div>
                 </div>

                 <div className="w-full">
                   <textarea required placeholder="كيف يمكننا العمل معاً؟..." rows={2} value={partnerFormData.partnershipArea} onChange={(e) => setPartnerFormData({...partnerFormData, partnershipArea: e.target.value})} className="w-full bg-[var(--page-bg)] border border-[var(--border-subtle)] rounded-xl py-2 lg:py-2.5 px-3 text-[var(--text-primary)] text-[11px] lg:text-xs focus:outline-none focus:border-accent focus:bg-[var(--page-bg)] focus:shadow-[0_0_15px_rgba(212,230,22,0.2)] transition-all font-sans placeholder-[var(--text-tertiary)] resize-none" />
                 </div>
                 
                 <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full mt-auto h-[40px] lg:h-[44px] rounded-xl bg-accent text-[#001529] hover:bg-[#C2D414] font-bold text-[11px] lg:text-xs font-sans flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,230,22,0.3)]">
                   <WhatsappLogo size={16} weight="fill" />
                   إرسال الطلب
                 </motion.button>
               </motion.form>
           </div>
         </motion.div>

        {/* PARTNERS LOGO STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, type: "spring" as const, bounce: 0.4 }}
          className="absolute bottom-6 lg:bottom-10 left-4 lg:left-12 xl:left-24 z-40 w-full max-w-[750px] px-6 pointer-events-auto hidden lg:flex flex-col justify-center"
          dir="ltr"
        >
          <div className="w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <motion.div 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
              className="flex items-center w-max gap-24 pr-24 py-4"
            >
              {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((num, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.15, y: -4, filter: "brightness(1.2)" }}
                  className="opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center h-[150px]"
                >
                  <Image src={`/partners/${num}.svg`} alt={`Partner ${num}`} width={330} height={150} className="object-contain max-h-[150px] w-auto" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </section>

      <Footer />
    </main>
  );
}
