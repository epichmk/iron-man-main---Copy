import React from "react";
import Link from "next/link";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function MobileServicesOutro() {
  return (
    <section className="relative w-full h-[60dvh] snap-start flex flex-col items-center justify-center px-6 text-center border-t border-[var(--border-subtle)] bg-[var(--page-bg)] overflow-hidden">
      {/* Background Video */}
      <LazyVideo
        src="/cinematic-4.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
      />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,var(--gradient-radial-edge)_70%,var(--gradient-radial-edge)_100%)]" />

      <h2 className="relative z-20 font-heading text-2xl leading-[1.3] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-3 dark:drop-shadow-xl">
        لم تجدوا الخدمة التي تبحثون عنها؟
      </h2>
      <p className="relative z-20 font-sans text-xs text-[var(--text-tertiary)] font-light max-w-sm mb-8 leading-[1.6]">
        يرجى التواصل معنا لاستشارة طبية متخصصة ومناقشة خياراتكم العلاجية.
      </p>
      <div className="relative z-20 w-full flex flex-col gap-3 max-w-[280px]">
        <a
          href="https://wa.me/967781878443"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full rounded-full p-[1px] overflow-hidden"
        >
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d4e616_0%,transparent_50%,#d4e616_100%)]" />
          <div className="relative bg-[var(--page-bg)] px-6 py-4 rounded-full flex items-center justify-center gap-3">
            <span className="font-sans font-bold tracking-widest text-xs text-accent uppercase">حجز استشارة</span>
          </div>
        </a>
        <Link
          href="/services"
          className="relative w-full rounded-full bg-[var(--surface-elevated)] hover:bg-white/[0.1] border border-[var(--border-subtle)] px-6 py-4 flex items-center justify-center transition-colors"
        >
          <span className="font-sans font-bold tracking-widest text-[11px] text-[var(--text-primary)] uppercase">جميع الخدمات</span>
        </Link>
      </div>
    </section>
  );
}
