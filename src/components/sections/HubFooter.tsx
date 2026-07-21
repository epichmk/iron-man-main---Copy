"use client";

import Link from "next/link";
import { ArrowUpLeft, BookOpen } from "@phosphor-icons/react";

export function HubFooter() {
  return (
    <footer className="w-full bg-[var(--page-bg)] border-t border-[var(--border-subtle)] py-12" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 mb-12">
          
          {/* Logo & Manifesto */}
          <div className="max-w-md">
            <Link href="/blog" className="flex items-center gap-3 group mb-8 inline-flex">
              <div className="w-12 h-12 bg-[#0066FF] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-accent group-hover:text-black transition-colors duration-500">
                <BookOpen weight="bold" size={24} />
              </div>
              <span className="text-4xl font-black tracking-tighter text-[var(--text-primary)] font-mono group-hover:text-accent transition-colors duration-500">
                إخصاب وإنجاب.
              </span>
            </Link>
            <p className="text-[var(--text-muted-light)] font-light leading-relaxed text-lg">
              المنصة المستقلة المتخصصة في نشر الوعي الطبي المتقدم حول تقنيات الخصوبة، علم الأجنة، والصحة الإنجابية. 
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-[var(--text-primary)] font-mono font-bold tracking-widest uppercase mb-4 text-xs border-b border-[var(--border-subtle)] pb-4">الأقسام</h4>
              <Link href="/blog?category=IVF%20Technology" className="text-[var(--text-tertiary)] hover:text-[#0066FF] transition-colors text-sm font-light">تقنيات الإخصاب</Link>
              <Link href="/blog?category=Women's%20Health" className="text-[var(--text-tertiary)] hover:text-[#0066FF] transition-colors text-sm font-light">صحة المرأة</Link>
              <Link href="/blog?category=Male%20Fertility" className="text-[var(--text-tertiary)] hover:text-[#0066FF] transition-colors text-sm font-light">خصوبة الرجل</Link>
              <Link href="/blog?category=General%20Fertility%20Education" className="text-[var(--text-tertiary)] hover:text-[#0066FF] transition-colors text-sm font-light">تعليم عام</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[var(--text-primary)] font-mono font-bold tracking-widest uppercase mb-4 text-xs border-b border-[var(--border-subtle)] pb-4">روابط سريعة</h4>
              <Link href="/" className="text-[var(--text-tertiary)] hover:text-accent transition-colors text-sm font-light">الصفحة الرئيسية للمركز</Link>
              <Link href="/terms-of-service" className="text-[var(--text-tertiary)] hover:text-accent transition-colors text-sm font-light">شروط الاستخدام</Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-[var(--border-subtle)] gap-8">
          <p className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} KNOWLEDGE HUB. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}

