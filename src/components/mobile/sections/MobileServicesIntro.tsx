"use client";

import React from "react";
import { LazyVideo } from "@/components/ui/LazyVideo";
export function MobileServicesIntro() {
  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[var(--page-bg)] flex flex-col items-center justify-center" dir="rtl">
      {/* Background Video */}
      <LazyVideo
        src="/services-section-2.original.mp4" poster="/services-section-2-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
      />

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 right-1/4 w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[80px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[90vw] h-[90vw] bg-accent/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Floating Medical Tech Orbs */}
      <div className="absolute top-1/4 right-[5%] w-24 h-24 rounded-full border border-blue-500/20 bg-gradient-to-tr from-blue-900/10 to-transparent backdrop-blur-xl flex items-center justify-center pointer-events-none z-10">
        <div className="w-12 h-12 rounded-full border border-blue-400/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_15px_#3b82f6] absolute top-0" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full flex flex-col items-center justify-center px-6 z-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Top minimal badge */}
          <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#d4e616]" />
            <span className="font-sans text-xs font-bold tracking-widest text-[var(--text-secondary)] uppercase pt-1">
              مرحلة جديدة من الدقة
            </span>
          </div>

          {/* Epic Typography */}
          <h2 className="font-heading text-4xl leading-[1.2] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 tracking-tight dark:drop-shadow-[0_20px_40px_rgba(0,0,0,1)] mb-8">
            حيث تلتقي الخبرة الإنسانية
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent dark:drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">مع أحدث تقنيات العصر.</span>
          </h2>

          <p className="font-sans text-lg text-[var(--text-tertiary)] font-light leading-relaxed max-w-[300px]">
            في مركزنا، نجمع بين الكفاءة الطبية العالية والتكنولوجيا العالمية لنقدم لكم أعلى نسب النجاح في رحلة الإنجاب.
          </p>
        </div>
      </div>
    </section>
  );
}
