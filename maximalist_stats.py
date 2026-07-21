import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_stats = '''      {/* ══════════════════════════════════════════════════════════
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

new_stats = '''      {/* ══════════════════════════════════════════════════════════
          S1.5 — STATS STRIP (Maximalist Cyber-Spectacle)
          ══════════════════════════════════════════════════════════ */}
      {service.stats && service.stats.length > 0 && (
        <section className="relative w-full z-20 bg-[#00050d] py-24 md:py-40 overflow-hidden">
          {/* Maximalist Background Noise */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden mix-blend-overlay">
            <span className="font-black text-[15rem] md:text-[30rem] leading-none whitespace-nowrap tracking-tighter text-white rotate-[-5deg] scale-150">
              IX73 STATS
            </span>
          </div>

          <div className="max-w-[1600px] mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-10">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[؀-ۿ]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className={`relative w-[95%] md:w-[45%] lg:w-[40%] xl:w-[22%] h-[250px] md:h-[300px] p-6 md:p-8 
                                bg-gradient-to-br from-[#000814]/90 to-[#001026]/90 backdrop-blur-xl 
                                border border-[#0094FE]/20 rounded-[2rem] 
                                shadow-[0_20px_50px_rgba(0,148,254,0.05)] hover:shadow-[0_0_80px_rgba(0,148,254,0.3)] 
                                group transition-all duration-700 hover:z-50 hover:-translate-y-4 hover:border-[#0094FE]/50
                                -mt-6 md:mt-0 first:mt-0 ${i % 2 !== 0 ? 'lg:mt-24' : ''}`}
                  >
                    {/* Glowing Orb Behind */}
                    <div className="absolute -inset-4 bg-[#0094FE]/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[-1]" />
                    
                    {/* Floating Tech Accents */}
                    <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-[#0094FE]/50 group-hover:bg-white group-hover:shadow-[0_0_10px_#fff] transition-colors duration-500" />
                    <div className="absolute top-6 right-6 font-mono text-[10px] text-white/20 tracking-widest group-hover:text-white/60 transition-colors duration-500">SYS.0{i+1}</div>

                    {/* The Label */}
                    <span className="absolute bottom-8 left-8 text-[#0094FE] font-mono text-sm md:text-base font-black tracking-[0.2em] uppercase z-20 group-hover:text-white transition-colors duration-500">{s.label}</span>
                    
                    {/* The Explosive Value breaking out */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] text-center pointer-events-none z-10" dir={hasArabic ? "rtl" : "ltr"}>
                      <span className="font-black text-[3rem] md:text-[4rem] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20 drop-shadow-[0_20px_30px_rgba(0,0,0,1)] block group-hover:scale-110 transition-transform duration-700 group-hover:from-white group-hover:via-[#0094FE] group-hover:to-white">
                        {s.value}
                      </span>
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
    print("Maximalist stats applied!")
else:
    print("Could not find the exact old stats string. Check for whitespace differences.")
