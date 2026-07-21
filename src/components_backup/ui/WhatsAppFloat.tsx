"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo, FacebookLogo, InstagramLogo, MapPin, X } from "@phosphor-icons/react";
import { getWhatsAppLink } from "@/lib/whatsappMessages";
import { useState, useEffect } from "react";

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Hide on first hero banner (e.g. scrollY < 500 or half viewport)
      if (window.scrollY > (window.innerHeight * 0.5)) {
        setShowButton(true);
      } else {
        setShowButton(false);
        setIsOpen(false);
      }

      // Collapse the expanded menu if the user starts scrolling
      setIsOpen(false);

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      
      // Assume scrolling stopped after 150ms of no scroll events
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Auto-collapse timer
  useEffect(() => {
    let collapseTimeout: NodeJS.Timeout;
    if (isOpen) {
      collapseTimeout = setTimeout(() => {
        setIsOpen(false);
      }, 9000); // 9 seconds timeout
    }
    return () => clearTimeout(collapseTimeout);
  }, [isOpen]);

  // Full color original brand logos
  const socials = [
    { 
      name: "واتساب", 
      icon: <WhatsappLogo weight="fill" size={20} />, 
      link: getWhatsAppLink("مرحباً مركز د. نجاة الملس، أود الاستفسار."),
      color: "#25D366" 
    },
    { 
      name: "إنستجرام", 
      icon: <InstagramLogo weight="fill" size={20} />, 
      link: "https://instagram.com",
      color: "#E1306C" 
    },
    { 
      name: "فيسبوك", 
      icon: <FacebookLogo weight="fill" size={20} />, 
      link: "https://facebook.com",
      color: "#1877F2" 
    },
    { 
      name: "موقع المركز", 
      icon: <MapPin weight="fill" size={20} />, 
      link: "https://maps.google.com",
      color: "#EA4335" 
    },
  ];

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: isScrolling ? 0.75 : 1, 
            y: 0 
          }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-50 md:bottom-8 md:left-8 flex flex-col-reverse items-center gap-3"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Main Toggle Button - Chartreuse & Black */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#d4e616] shadow-[0_4px_20px_rgba(212,230,22,0.4)] transition-transform duration-300 hover:scale-110 z-20"
          >
            <div className="absolute inset-0 rounded-full border-2 border-black/20 scale-[0.9] group-hover:scale-[1.1] transition-transform duration-500 pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-[#d4e616] animate-ping opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            
            {isOpen ? (
              <X weight="bold" className="text-black h-5 w-5 md:h-6 md:w-6 relative z-10" />
            ) : (
              <WhatsappLogo weight="fill" className="text-black h-6 w-6 md:h-7 md:w-7 relative z-10" />
            )}
          </button>

          {/* Expanded Social Icons */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 20 }}
                className="flex flex-col gap-3 overflow-visible pb-2 pt-2 px-4 -mx-4"
              >
                {socials.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (socials.length - 1 - index) * 0.05 }}
                    className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-[#000814] border border-white/20 hover:border-current hover:shadow-[0_0_15px_currentColor] hover:scale-110 transition-all duration-300 shadow-lg relative group/item"
                    style={{ color: social.color }}
                    title={social.name}
                  >
                    <div className="transform transition-transform duration-300 group-hover/item:scale-125">
                      {social.icon}
                    </div>
                    <span className="absolute left-full ml-3 px-2 py-1 rounded bg-[#000814] border border-white/10 text-white text-xs whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" dir="ltr">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
