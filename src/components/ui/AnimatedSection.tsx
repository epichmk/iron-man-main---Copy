"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    rotateX: -15,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 15,
      mass: 1.2
    },
  },
};

type SectionProps = { children: ReactNode; className?: string };

export function AnimatedSection({ children, className = "" }: SectionProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className = "" }: SectionProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

