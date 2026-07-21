"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

export function ServicesScene3Outro() {
  return (
    <section className="relative w-full bg-[var(--page-bg)] h-[100dvh]">
      <div className="sticky top-0 w-full min-h-[100dvh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
        {/* Deep dark gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,10,30,0.8)_0%,var(--gradient-radial-edge)_100%)] z-0" />
      
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center z-10 mx-auto" dir="rtl">
        <motion.div 
          className="text-center flex flex-col items-center gap-6 md:gap-8 max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl leading-[1.2] md:leading-tight font-black text-[var(--text-primary)] tracking-tight">
            لم تجدوا الخدمة<br className="md:hidden"/> التي تبحثون عنها؟
          </h2>
          
          <p className="font-sans text-xl md:text-3xl font-light text-[var(--text-secondary)] dark:drop-shadow-lg leading-relaxed max-w-2xl">
            دعونا نناقش <span className="text-blue-400 font-bold">حالتكم الخاصة</span> لتحديد خطة العلاج الأنسب.
          </p>
          
          <Link
            href="https://wa.me/yourphonenumber"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-6 md:mt-10 inline-flex items-center justify-center gap-4 py-4 md:py-5 px-10 md:px-14 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.8)] transition-all duration-500 overflow-hidden hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] skew-x-12" />
            <span className="relative z-10 font-sans font-bold text-lg md:text-xl text-[var(--text-primary)] tracking-wide">
              تواصل عبر الواتساب
            </span>
            <ArrowLeft weight="bold" className="relative z-10 w-6 h-6 md:w-8 md:h-8 text-[var(--text-primary)] group-hover:-translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
