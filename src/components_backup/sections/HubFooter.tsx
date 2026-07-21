"use client";

import Link from "next/link";
import { ArrowUpLeft, BookOpen } from "@phosphor-icons/react";

export function HubFooter() {
  return (
    <footer className="w-full bg-[#000814] border-t border-white/5 py-24" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 mb-20">
          
          {/* Logo & Manifesto */}
          <div className="max-w-md">
            <Link href="/blog" className="flex items-center gap-3 group mb-8 inline-flex">
              <div className="w-12 h-12 bg-[#0066FF] flex items-center justify-center text-white group-hover:bg-[#d4e616] group-hover:text-black transition-colors duration-500">
                <BookOpen weight="bold" size={24} />
              </div>
              <span className="text-4xl font-black tracking-tighter text-white font-mono group-hover:text-[#d4e616] transition-colors duration-500">
                إخصاب وإنجاب.
              </span>
            </Link>
            <p className="text-zinc-500 font-light leading-relaxed text-lg">
              المنصة المستقلة المتخصصة في نشر الوعي الطبي المتقدم حول تقنيات الخصوبة، علم الأجنة، والصحة الإنجابية. 
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-mono font-bold tracking-widest uppercase mb-4 text-xs border-b border-white/10 pb-4">الأقسام</h4>
              <Link href="/blog?category=IVF%20Technology" className="text-zinc-400 hover:text-[#0066FF] transition-colors text-sm font-light">تقنيات الإخصاب</Link>
              <Link href="/blog?category=Women's%20Health" className="text-zinc-400 hover:text-[#0066FF] transition-colors text-sm font-light">صحة المرأة</Link>
              <Link href="/blog?category=Male%20Fertility" className="text-zinc-400 hover:text-[#0066FF] transition-colors text-sm font-light">خصوبة الرجل</Link>
              <Link href="/blog?category=General%20Fertility%20Education" className="text-zinc-400 hover:text-[#0066FF] transition-colors text-sm font-light">تعليم عام</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-mono font-bold tracking-widest uppercase mb-4 text-xs border-b border-white/10 pb-4">روابط سريعة</h4>
              <Link href="/" className="text-zinc-400 hover:text-[#d4e616] transition-colors text-sm font-light">الصفحة الرئيسية للمركز</Link>
              <Link href="/terms-of-service" className="text-zinc-400 hover:text-[#d4e616] transition-colors text-sm font-light">شروط الاستخدام</Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
          <p className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} KNOWLEDGE HUB. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}

