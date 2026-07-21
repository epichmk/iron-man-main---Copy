import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The section starts with: S1.5 — STATS STRIP (Floating Glassmorphic Pills)
# Let's replace the flex container with a grid container so all pills match width

pattern = r"\{\/\* ══════════════════════════════════════════════════════════\s*S1\.5 — STATS STRIP.*?<\/section>\s*\)\}"

new_stats = '''{/* ══════════════════════════════════════════════════════════
          S1.5 — STATS STRIP (Floating Glassmorphic Pills - Uniform Width)
          ══════════════════════════════════════════════════════════ */}
      {service.stats && service.stats.length > 0 && (
        <section className="relative w-full z-20 bg-[#00050d] py-16 md:py-24 border-b border-white/5 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 md:px-10">
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[؀-ۿ]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className="relative w-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 md:px-6 md:py-5 flex flex-col xl:flex-row items-center justify-center gap-2 xl:gap-4 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,148,254,0.2)] hover:border-[#0094FE]/30 group cursor-default"
                  >
                    <span 
                      className="font-black text-xl md:text-2xl text-white text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#0094FE] transition-colors duration-500" 
                      dir={hasArabic ? "rtl" : "ltr"}
                    >
                      {s.value}
                    </span>
                    <div className="hidden xl:block w-px h-8 bg-white/20 group-hover:bg-[#0094FE]/50 transition-colors duration-500" />
                    <div className="block xl:hidden w-8 h-px bg-white/20 group-hover:bg-[#0094FE]/50 transition-colors duration-500" />
                    <span className="text-[#0094FE] font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-center" dir="ltr">
                      {s.label}
                    </span>
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </section>
      )}'''

new_content = re.sub(pattern, new_stats, content, flags=re.DOTALL)

if new_content != content:
    with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Uniform width Pills applied via regex!")
else:
    print("Regex failed to match.")
