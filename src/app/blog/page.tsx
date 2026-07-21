import { blogData } from "@/lib/blogData";
import { HubNavbar } from "@/components/ui/HubNavbar";
import { HubFooter } from "@/components/sections/HubFooter";
import { Metadata } from "next";
import { Suspense } from "react";
import ClientBlogGrid from "./ClientBlogGrid";

export const metadata: Metadata = {
  title: "إخصاب وإنجاب | الدليل الشامل لتقنيات الخصوبة وأطفال الأنابيب",
  description: "المرجع الشامل في الخصوبة، الحقن المجهري، وأطفال الأنابيب. استكشف أحدث التقنيات الطبية، صحة المرأة، وخصوبة الرجل من خلال منصة إخصاب وإنجاب.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] selection:bg-accent/30" dir="rtl">
      <HubNavbar />
      
      {/* Cinematic Full-Screen Hero */}
      <section className="relative w-full h-screen min-h-[600px] flex items-end pb-20 md:pb-32 overflow-hidden border-b border-[var(--border-subtle)]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105" 
            src="/cinematic-blog-scrub.mp4" 
          />
          {/* Deep Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--page-bg)] via-[var(--page-bg)]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--page-bg)_100%)]" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col gap-6 md:gap-8 max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#0066FF] font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold px-4 py-2 border border-[#0066FF]/30 bg-[#0066FF]/10 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(0,102,255,0.2)]">إخصاب وإنجاب</span>
              <span className="text-[var(--text-secondary)] font-mono text-[10px] tracking-[0.2em] uppercase">مركز د. نجاة الملس</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[6rem] font-black text-[var(--text-primary)] leading-[1.1] tracking-tight dark:drop-shadow-2xl">
              إخصاب وإنجاب
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#0066FF] to-[#0066FF]">
                الطبية.
              </span>
            </h1>
            
            <p className="font-sans text-[var(--text-secondary)] text-lg md:text-2xl leading-[1.8] font-light mt-4 dark:drop-shadow-lg text-balance border-r-2 border-[#0066FF] pr-6">
              أحدث الأبحاث والمقالات حول الحقن المجهري والخصوبة. 
              هنا حيث يلتقي العلم بالأمل.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Area */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-16 md:py-32 max-w-[1600px] mx-auto">
        <Suspense fallback={<div className="text-[var(--text-muted-light)] font-mono tracking-widest uppercase">جاري التحميل...</div>}>
          <ClientBlogGrid posts={blogData} />
        </Suspense>
      </section>

      <HubFooter />
    </main>
  );
}
