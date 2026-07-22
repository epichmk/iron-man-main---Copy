import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { UiTicket } from "@/components/ui/UiTicket";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Navbar } from "@/components/ui/Navbar";

const geSS = localFont({
  src: [
    {
      path: "../../public/fonts/GE SS Two Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/GE SS Two Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GE SS Two Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ge-ss",
});

const geSSUnique = localFont({
  src: [
    {
      path: "../../public/fonts/GE SS Unique Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/GE SS Unique Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ge-ss-unique",
});

const cormorant = { variable: "--font-elite" };
const montserrat = { variable: "--font-sans-elite" };

export const metadata: Metadata = {
  title: {
    default: 'مركز د. نجاة الملس | الحقن المجهري وأطفال الأنابيب في صنعاء، اليمن',
    template: '%s | مركز د. نجاة الملس',
  },
  description: 'المركز الرائد للحقن المجهري وأطفال الأنابيب في اليمن. تقنيات ICSI, IMSI, PGT. بقيادة د. نجاة الملس. احجز استشارتك الآن.',
  keywords: ['حقن مجهري', 'أطفال أنابيب', 'ICSI', 'IVF', 'صنعاء', 'اليمن', 'خصوبة', 'عقم', 'د. نجاة الملس'],
  openGraph: {
    type: 'website',
    locale: 'ar_YE',
    url: 'https://najat-ivf.com',
    siteName: 'مركز د. نجاة الملس',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'مركز د. نجاة الملس' }],
  },
  twitter: { card: 'summary_large_image', site: '@najat_ivf' },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://najat-ivf.com'),
  alternates: { canonical: 'https://najat-ivf.com' },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { SecurityWrapper } from "@/components/providers/SecurityWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="" suppressHydrationWarning>
      <head>
        {/* No-flash theme script — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light')}}catch(e){}})();`,
          }}
        />
        <meta id="theme-color-meta" name="theme-color" content="var(--page-bg)" />

        <script
          id="schema-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "مركز د. نجاة الملس",
              "url": "https://najat-ivf.com",
              "telephone": "+967-781-878-443",
              "email": "ivfnmc@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "جولة فلسطين - تقاطع شارع حدة مع الستين - خلف محطة البترول",
                "addressLocality": "صنعاء",
                "addressCountry": "YE"
              },
              "medicalSpecialty": ["Obstetrics", "ReproductiveMedicine", "Genetics"],
              "openingHours": "Sa-Th 08:00-17:00",
              "founder": {
                "@type": "Person",
                "name": "Dr. Najat Al-Malas",
                "jobTitle": "Medical Director & IVF Specialist"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${geSS.variable} ${geSSUnique.variable} ${cormorant.variable} ${montserrat.variable} overflow-x-hidden`} style={{ background: 'var(--body-bg)', color: 'var(--text-primary)' }}>
        
        {/* GLOBAL FOOTER-MATCHED BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center" style={{ background: 'var(--page-bg)' }}>
          {/* Center massive glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] blur-[150px] pointer-events-none rounded-full translate-y-1/3 -translate-x-1/4" style={{ background: `linear-gradient(to right, var(--glow-color), var(--glow-color-mid), transparent)` }} />

          {/* Heavy Vignette to all edges so the center becomes the focus */}
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ boxShadow: 'inset 0 0 250px 100px var(--vignette-color)' }} />
          <div className="absolute inset-0 z-[5] pointer-events-none" style={{ background: `radial-gradient(ellipse at center, var(--gradient-radial-center) 0%, var(--gradient-radial-center) 50%, var(--gradient-radial-edge) 100%)` }} />
        </div>

        <div className="relative z-10">
          <SecurityWrapper>
            <ThemeProvider>
              <SmoothScrollProvider>
                {children}
              </SmoothScrollProvider>
              <Navbar />
              <UiTicket />
              <WhatsAppFloat />
              <ScrollToTop />
            </ThemeProvider>
          </SecurityWrapper>
        </div>
      </body>
    </html>
  );
}
