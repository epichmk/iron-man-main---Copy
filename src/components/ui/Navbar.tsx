"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية", highlight: "hover:text-[var(--text-primary)]" },
  { href: "/dr-najat", label: "د. نجاة الملس", highlight: "text-[#0094FE] hover:text-[var(--text-primary)] hover:drop-shadow-[0_0_10px_rgba(0,148,254,0.8)]" },
  { href: "/the-center", label: "المركز", highlight: "hover:text-accent hover:drop-shadow-[0_0_10px_rgba(212,230,22,0.8)]" },
  { href: "/services", label: "الخدمات", highlight: "hover:text-[#0094FE] hover:drop-shadow-[0_0_10px_rgba(0,148,254,0.8)]" },
  { href: "/gallery", label: "المعرض", highlight: "hover:text-accent hover:drop-shadow-[0_0_10px_rgba(212,230,22,0.8)]" },
  { href: "/blog", label: "المعرفة", highlight: "hover:text-[#0094FE] hover:drop-shadow-[0_0_10px_rgba(0,148,254,0.8)]" },
  { href: "/services#faq", label: "الأسئلة الشائعة", highlight: "hover:text-accent hover:drop-shadow-[0_0_10px_rgba(212,230,22,0.8)]" },
  { href: "/contact", label: "تواصل معنا", highlight: "hover:text-[#0094FE] hover:drop-shadow-[0_0_10px_rgba(0,148,254,0.8)]" },
];

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleFooter = (e: Event) => setIsFooterVisible((e as CustomEvent).detail.isVisible);
    window.addEventListener("footerVisibilityChange", handleFooter);
    return () => window.removeEventListener("footerVisibilityChange", handleFooter);
  }, []);

  if (pathname?.startsWith("/blog")) return null;

  return (
    <>
      {/* ALWAYS VISIBLE LOGO + THEME TOGGLE */}
      <header className={`fixed inset-x-0 top-0 z-50 pointer-events-none transition-opacity duration-300 ${isFooterVisible && !isExpanded ? "opacity-0" : "opacity-100"}`}>
        <div className="flex items-center justify-start py-4 md:py-6 w-full pr-4 md:pr-6 pointer-events-none">
          {/* LOGO CONTAINER (RIGHT SIDE IN RTL) */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-none flex items-center justify-between z-50 absolute top-4 right-4 md:top-6 md:right-6 cursor-pointer opacity-100 pointer-events-auto"
          >
            <Link href="/" onClick={(e) => {
              if (!isExpanded) e.preventDefault();
            }}>
              <motion.div
                animate={{
                  rotateY: [0, 0, 180, 360, 360],
                  scale: [1, 1, 1.15, 1, 1],
                  filter: [
                    "drop-shadow(0 0 0px rgba(212,230,22,0))", 
                    "drop-shadow(0 0 0px rgba(212,230,22,0))", 
                    "drop-shadow(0 0 20px rgba(212,230,22,0.8)) brightness(1.3)", 
                    "drop-shadow(0 0 0px rgba(212,230,22,0))",
                    "drop-shadow(0 0 0px rgba(212,230,22,0))"
                  ]
                }}
                transition={{
                  duration: 7,
                  times: [0, 0.8, 0.85, 0.9, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "center center", perspective: 1000 }}
              >
                <Image src="/nmc-logo.png" alt="Menu Logo" width={48} height={48} className="object-contain w-full h-full logo-shadow" />
              </motion.div>
            </Link>
          </div>

          {/* THEME TOGGLE (LEFT SIDE IN RTL = visual left) */}
          <div className="flex-none z-50 absolute top-5 left-4 md:top-7 md:left-6 pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* FULL SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="fixed inset-0 z-40 backdrop-blur-3xl flex flex-col justify-between pt-24 md:pt-16 pb-12 px-6 md:px-12 items-center h-[100dvh] overflow-hidden pointer-events-auto"
            style={{ background: 'color-mix(in srgb, var(--page-bg) 95%, transparent)', boxShadow: '0 20px 50px var(--shadow-color)' }}
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* BACKGROUND DECORATIONS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#0094FE]/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[100px]" style={{ background: 'var(--accent-glow)' }} />
            </div>

            {/* CENTERED NAVIGATION LINKS */}
            <motion.nav 
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1, 
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 } 
                },
                exit: { opacity: 0, transition: { staggerChildren: 0.06, staggerDirection: -1 } }
              }}
              className="flex flex-col items-center justify-center gap-5 md:gap-7 relative w-full flex-1 z-10"
            >
              {NAV_LINKS.map((link) => (
                <motion.div 
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)", rotateX: -20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      filter: "blur(0px)", 
                      rotateX: 0,
                      transition: { type: "spring", stiffness: 200, damping: 20 }
                    },
                    exit: { 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.9,
                      filter: "blur(10px)",
                      rotateX: -20,
                      transition: { type: "spring", stiffness: 200, damping: 20 } 
                    }
                  }}
                  className="group relative"
                  style={{ perspective: 1000 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsExpanded(false)}
                    className={`font-sans text-3xl md:text-5xl lg:text-[6vh] font-black uppercase tracking-wider md:tracking-[0.1em] transition-all duration-500 ease-out inline-block text-[var(--text-tertiary)] ${link.highlight}`}
                  >
                    {link.label}
                  </Link>
                  <motion.div 
                    className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-[2px] md:h-[4px] opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-center"
                    style={{ background: `linear-gradient(to right, transparent, var(--text-primary), transparent)` }}
                  />
                </motion.div>
              ))}
            </motion.nav>

            {/* BOOKING BUTTON (BOTTOM ON MOBILE, LEFT ON DESKTOP) */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.4, duration: 0.6, type: "spring" } }}
              exit={{ opacity: 0, y: 30, filter: "blur(10px)", transition: { duration: 0.6, type: "spring" } }}
              className="flex-none w-full md:w-auto md:absolute md:top-8 md:left-8 z-50 mt-8 md:mt-0"
            >
              <a
                href="https://wa.me/967781878443"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-full md:w-auto overflow-hidden rounded-2xl md:rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-accent/50 md:bg-accent md:hover:bg-accent px-8 py-5 md:py-3 transition-all duration-500 pointer-events-auto"
                style={{ boxShadow: '0 0 30px var(--shadow-color)' }}
                dir="rtl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-[#0094FE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <WhatsappLogo size={24} weight="fill" className="text-accent md:text-black transition-colors" />
                  <span className="font-sans text-xl md:text-sm font-bold tracking-wide text-[var(--text-primary)] md:text-black">
                    إحجز موعد
                  </span>
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="text-[var(--text-primary)] md:text-black transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
