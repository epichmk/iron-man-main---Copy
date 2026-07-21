import React from "react";
import { TheCenterDetailed } from "@/components/sections/TheCenterDetailed";
import { Footer } from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المركز | أحدث تقنيات الإخصاب في اليمن",
  description:
    "تعرف على مركزنا، الرائد في اليمن في تقديم خدمات الحقن المجهري وأطفال الأنابيب بأحدث التقنيات العالمية.",
};

export default function TheCenterPage() {
  return (
    <>
      <style>{`
        html:has(#the-center-page) {
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
      `}</style>
      <main
        id="the-center-page"
        className="bg-[var(--page-bg)] text-[var(--text-primary)] selection:bg-blue-500/30 overflow-x-hidden"
        dir="rtl"
      >
        <TheCenterDetailed />
        <Footer />
      </main>
    </>
  );
}
