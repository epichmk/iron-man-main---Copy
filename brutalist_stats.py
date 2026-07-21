import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_stats = '''      {/* ══════════════════════════════════════════════════════════
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

new_stats = '''      {/* ══════════════════════════════════════════════════════════
          S1.5 — STATS STRIP (Brutalist Editorial Index)
          ══════════════════════════════════════════════════════════ */}
      {service.stats && service.stats.length > 0 && (
        <section className="relative w-full z-20 bg-[#00050d] pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
            
            <div className="mb-12 md:mb-20">
              <span className="text-[#0094FE] text-sm md:text-base font-bold tracking-widest uppercase block mb-4">/ تفاصيل البروتوكول</span>
            </div>

            <AnimatedSection className="flex flex-col border-t-2 border-white/20">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[؀-ۿ]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className="flex flex-col md:flex-row items-start md:items-baseline justify-between py-8 md:py-16 border-b border-white/10 group hover:border-white/40 transition-colors duration-700 w-full cursor-default relative overflow-hidden"
                  >
                    {/* Hover reveal gradient bg */}
                    <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000 -z-10" />
                    
                    <span 
                      className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-none text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-l group-hover:from-white group-hover:to-white/20 transition-all duration-700 w-full md:w-2/3 block" 
                      dir={hasArabic ? "rtl" : "ltr"}
                    >
                      {s.value}
                    </span>
                    <div className="flex items-baseline gap-4 mt-6 md:mt-0 md:w-1/3 md:justify-end">
                      <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase">{s.label}</span>
                      <span className="text-sm font-mono text-[#0094FE]/30 font-bold group-hover:text-[#0094FE]/80 transition-colors duration-700 hidden md:block">/ 0{i + 1}</span>
                    </div>
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
    print("Brutalist stats applied!")
else:
    print("Could not find the exact old stats string. Check for whitespace differences.")
