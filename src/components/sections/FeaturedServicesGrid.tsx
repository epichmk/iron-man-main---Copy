"use client";

import { motion } from "framer-motion";
import servicesData from "@/lib/servicesData.json";
import { ServiceCard } from "@/components/ui/ServiceCard";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

export function FeaturedServicesGrid() {
  return (
    <section id="services" className="relative w-full py-32 bg-[var(--page-bg)] overflow-hidden" dir="rtl">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(212,230,22,0.05)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 flex flex-col items-center text-center">
          <span className="text-[#0066FF] font-mono text-sm tracking-[0.3em] uppercase mb-4 px-6 py-2 #0066FF]/30 bg-[#0066FF]/5 rounded-full">
            Our Elite Services
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] tracking-tight font-elite mb-6">
            بروتوكولات النخبة الطبية
          </h2>
          <p className="text-[var(--text-tertiary)] text-lg md:text-xl font-light max-w-3xl">
            اكتشف مجموعة متكاملة من خدمات الخصوبة والرعاية المتقدمة، حيث تتكامل التكنولوجيا الرائدة مع الدقة الطبية الفائقة لتحقيق نسب نجاح استثنائية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-[500px]"
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/services" className="group relative overflow-hidden bg-[var(--surface-elevated)]  px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[var(--surface-hover)]  transition-all duration-300">
            <span className="text-[var(--text-primary)] font-bold tracking-wider text-sm">استكشف جميع الخدمات</span>
            <ArrowUpRight size={16} className="text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}


