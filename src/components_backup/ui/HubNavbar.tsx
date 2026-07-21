"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, List, X } from "@phosphor-icons/react";

export function HubNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "تقنيات الإخصاب", category: "IVF Technology" },
    { name: "صحة المرأة", category: "Women's Health" },
    { name: "خصوبة الرجل", category: "Male Fertility" },
    { name: "تعليم عام", category: "General Fertility Education" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#000814]/90 backdrop-blur-xl border-b border-white/5"
        dir="rtl"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 h-24 flex items-center justify-between">
          
          {/* Hub Logo */}
          <Link href="/blog" className="flex items-center gap-3 group z-50">
            <div className="w-10 h-10 bg-[#d4e616] flex items-center justify-center text-black group-hover:bg-white transition-colors">
              <BookOpen weight="bold" size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-mono group-hover:text-[#d4e616] transition-colors">
              إخصاب وإنجاب.
            </span>
          </Link>

          {/* Hub Navigation Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name}
                href={`/blog?category=${encodeURIComponent(link.category)}`} 
                className="text-sm font-mono tracking-widest text-zinc-400 hover:text-white uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 z-50">
            {/* Go Back Button */}
            <Link 
              href="/" 
              className="group flex items-center gap-2 bg-white/5 hover:bg-[#d4e616] border border-white/10 hover:border-[#d4e616] px-3 py-1.5 transition-all duration-300"
            >
              <span className="text-[10px] font-mono tracking-widest text-white group-hover:text-black uppercase">
                العودة للمركز
              </span>
              <ArrowUpLeft className="text-white group-hover:text-black transition-colors" weight="bold" size={14} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
          
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#000814] pt-24 px-6 md:hidden flex flex-col items-center justify-center gap-8"
            dir="rtl"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={`/blog?category=${encodeURIComponent(link.category)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black text-white hover:text-[#d4e616] transition-colors font-mono tracking-widest"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
