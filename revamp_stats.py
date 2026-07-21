import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_stats = '''      {/* ══════════════════════════════════════════════════════════
          S1.5 — STATS STRIP (Moved out of hero for better layout)
          ══════════════════════════════════════════════════════════ */}
      {service.stats && service.stats.length > 0 && (
        <section className="relative w-full border-b border-white/5 bg-[#00050d] z-20">
          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 py-8 md:py-12">
            <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[؀-ۿ]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className="flex flex-col items-center text-center border-r-0 md:border-r border-white/10 px-2 md:px-6"
                  >
                    <span 
                      className="text-white font-black text-2xl md:text-3xl lg:text-4xl leading-tight mb-2 md:mb-3 text-balance" 
                      dir={hasArabic ? "rtl" : "ltr"}
                    >
                      {s.value}
                    </span>
                    <span className="text-blue-300 font-mono text-xs md:text-sm font-bold tracking-widest uppercase text-balance mt-1">{s.label}</span>
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </section>
      )}'''

new_stats = '''      {/* ══════════════════════════════════════════════════════════
          S1.5 — STATS STRIP (Premium Dashboard Grid)
          ══════════════════════════════════════════════════════════ */}
      {service.stats && service.stats.length > 0 && (
        <section className="relative w-full z-20 -mt-10 mb-10 md:-mt-16 md:mb-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <AnimatedSection className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 p-px rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[؀-ۿ]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className="flex flex-col items-center justify-center text-center bg-[#000814]/90 p-8 md:p-10 group transition-colors duration-500 hover:bg-[#000814]"
                  >
                    <span 
                      className="font-black text-2xl md:text-3xl lg:text-4xl leading-tight mb-3 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 group-hover:scale-105 transition-transform duration-500" 
                      dir={hasArabic ? "rtl" : "ltr"}
                    >
                      {s.value}
                    </span>
                    <span className="text-[#0094FE] font-mono text-xs md:text-sm font-bold tracking-widest uppercase">{s.label}</span>
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </section>
      )}'''

if old_stats in content:
    content = content.replace(old_stats, new_stats)
    with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Stats section totally revamped!")
else:
    print("Could not find the exact old stats string. Check for whitespace differences.")
