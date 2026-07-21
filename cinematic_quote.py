import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r"(<div className=\"flex flex-col items-center text-center\">\s*<span className=\"text-\[\#0094FE\].*?</blockquote>\s*</div>)"

new_quote = '''<div className="relative flex flex-col items-start text-right w-full" dir="rtl">
                  {/* Cinematic Glowing background orb */}
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#0094FE]/15 via-transparent to-transparent blur-[60px] pointer-events-none -z-10" />

                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-[2px] bg-[#0094FE]" />
                    <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase">قصتكم تبدأ هنا</span>
                  </div>

                  <div className="relative pr-6 md:pr-10 border-r-[3px] border-white/5 hover:border-[#0094FE]/50 transition-colors duration-1000 group">
                    {/* Massive Watermark Quote Mark */}
                    <span className="absolute -top-16 -right-12 text-[#0094FE]/5 text-[12rem] md:text-[18rem] leading-none font-serif select-none group-hover:text-[#0094FE]/10 transition-colors duration-1000">
                      &rdquo;
                    </span>
                    
                    <blockquote className="relative z-10 text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] font-black leading-[1.3] md:leading-[1.4] max-w-[850px] text-white">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30 drop-shadow-xl transition-all duration-1000">
                        {service.editorial.quote}
                      </span>
                      <br />
                      <span className="inline-block mt-4 text-transparent bg-clip-text bg-gradient-to-l from-[#0094FE] to-[#D4FF00] drop-shadow-[0_0_15px_rgba(0,148,254,0.4)]">
                        {service.editorial.quoteHighlight}
                      </span>
                    </blockquote>
                  </div>
                </div>'''

match = re.search(pattern, content, flags=re.DOTALL)
if match:
    content = content.replace(match.group(0), new_quote)
    with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Cinematic Quote applied!")
else:
    print("Regex failed to match the quote block.")
