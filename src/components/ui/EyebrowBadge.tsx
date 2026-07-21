"use client";

import { motion } from "framer-motion";

type Props = { children: React.ReactNode; className?: string };

export function EyebrowBadge({ children, className = "" }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.95 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`inline-flex items-center gap-2 rounded-full bg-[var(--surface-elevated)] px-3 py-1.5 font-mono text-[14px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md ${className}`}
    >
      {children}
    </motion.span>
  );
}
