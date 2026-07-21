import React from "react";
import { DrNajatDetailed } from "@/components/sections/DrNajatDetailed";
import { Footer } from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "د. نجاة الملس | أول طبيبة للحقن المجهري في اليمن",
  description:
    "تعرف على د. نجاة الملس، أول استشارية يمنية في الحقن المجهري والإخصاب المساعد، حاملة البورد العربي في أمراض النساء والتوليد، وأكثر من 30 عاماً من الخبرة.",
  openGraph: {
    title: "د. نجاة الملس | المديرة الطبية | مركز NMC",
    description:
      "د. نجاة الملس — خبيرة خصوبة وإنجاب، أول طبيبة للحقن المجهري في اليمن بخبرة تزيد عن 30 عاماً في أمراض النساء والتوليد.",
    images: [
      {
        url: "/staff/medical director dr. najat al-malas 3.png",
        width: 800,
        height: 1000,
        alt: "د. نجاة الملس — المدير الطبي لمركز NMC",
      },
    ],
    type: "profile",
    locale: "ar_YE",
  },
  twitter: {
    card: "summary_large_image",
    title: "د. نجاة الملس | مركز NMC للحقن المجهري — صنعاء",
    description:
      "حاملة البورد العربي. أكثر من 30 سنة خبرة. أول استشارية للحقن المجهري (IVF) في اليمن.",
    images: ["/staff/medical director dr. najat al-malas 3.png"],
  },
};

export default function DrNajatPage() {
  return (
    <>
      <main
        id="dr-najat-page"
        className="text-[var(--text-primary)] selection:bg-blue-500/30 overflow-x-hidden relative"
        dir="rtl"
      >
        <DrNajatDetailed />
        <Footer />
      </main>
    </>
  );
}
