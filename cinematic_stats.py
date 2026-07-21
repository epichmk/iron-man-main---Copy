import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The section starts with: S1.5 — STATS STRIP
pattern = r"\{\/\* ══════════════════════════════════════════════════════════\s*S1\.5 — STATS STRIP.*?(?=\{/\* ══════════════════════════════════════════════════════════\s*S2 —)"

new_stats = '''{/* ══════════════════════════════════════════════════════════
          S1.5 — STATS STRIP (Cinematic Typography)
          ══════════════════════════════════════════════════════════ */}
      {service.stats && service.stats.length > 0 && (
        <section className="relative w-full z-20 bg-transparent py-16 md:py-24 overflow-hidden border-t border-b border-white/5">
          
          {/* Cinematic Background Ambient Light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4FF00]/5 via-[#00050d]/80 to-[#00050d] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 divide-y divide-white/5 md:divide-y-0 md:divide-x md:divide-x-reverse md:divide-white/5">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[؀-ۿ]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className="relative w-full py-12 md:py-16 flex flex-col items-center justify-center gap-6 group cursor-default overflow-hidden"
                  >
                    {/* Cinematic Hover Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4FF00]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl -z-10 pointer-events-none" />
                    
                    {/* Value */}
                    <span 
                      className="font-black text-3xl md:text-4xl lg:text-5xl text-center text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-[1.15] group-hover:from-white group-hover:via-[#D4FF00] group-hover:to-[#D4FF00]/50 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                      dir={hasArabic ? "rtl" : "ltr"}
                    >
                      {s.value}
                    </span>
                    
                    {/* Divider Accent */}
                    <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#D4FF00] group-hover:shadow-[0_0_15px_#D4FF00] group-hover:scale-150 transition-all duration-1000" />
                    
                    {/* Label */}
                    <span className="text-[#D4FF00]/60 font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-center group-hover:text-[#D4FF00] group-hover:tracking-[0.4em] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" dir="ltr">
                      {s.label}
                    </span>
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </section>
      )}
      '''

match = re.search(pattern, content, flags=re.DOTALL)
if match:
    content = content.replace(match.group(0), new_stats)
    with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Cinematic stats applied!")
else:
    print("Regex failed to match.")
