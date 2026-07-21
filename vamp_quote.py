import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Stats text: "go extremely balancy on the stats text."
# Let's change the AnimatedItem in S1.5 from flex-col items-start to items-center and add text-balance text-center
content = content.replace(
'''                  <AnimatedItem 
                    key={i} 
                    className="flex flex-col items-start border-r-0 md:border-r border-white/10 pr-0 md:pr-6"
                  >
                    <span 
                      className="text-white font-mono font-black text-2xl md:text-3xl lg:text-4xl leading-none mb-2 md:mb-3" 
                      dir={hasArabic ? "rtl" : "ltr"}
                    >
                      {s.value}
                    </span>
                    <span className="text-blue-300 font-mono text-xs md:text-sm font-bold tracking-widest uppercase">{s.label}</span>
                  </AnimatedItem>''',
'''                  <AnimatedItem 
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
                  </AnimatedItem>'''
)

# 2. Vamp up the quote and balance its text
content = content.replace(
'''              <span className="text-white text-sm md:text-base font-bold tracking-widest uppercase block mb-8">/ قصتكم تبدأ هنا</span>
              <blockquote className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white leading-[1.5] max-w-[800px] text-balance">
                <span className="text-white/20 text-[3rem] md:text-[4rem] leading-none font-serif absolute -mr-2 -mt-4">&ldquo;</span>
                {service.editorial.quote}
                <span className="text-white">{service.editorial.quoteHighlight}</span>
              </blockquote>''',
'''              <div className="flex flex-col items-center text-center">
                <span className="text-[#0094FE] text-sm md:text-base font-bold tracking-widest uppercase block mb-8">/ قصتكم تبدأ هنا</span>
                <blockquote className="relative text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.2] max-w-[900px] text-balance text-center mx-auto tracking-tight">
                  <span className="text-[#0094FE]/20 text-[4rem] md:text-[6rem] leading-none font-serif absolute right-1/2 translate-x-1/2 -top-12 md:-top-16">&ldquo;</span>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-lg">
                    {service.editorial.quote}
                  </span>
                  <span className="relative z-10 text-[#0094FE] drop-shadow-md"> {service.editorial.quoteHighlight}</span>
                </blockquote>
              </div>'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Vamped up quote and balanced stats!")
