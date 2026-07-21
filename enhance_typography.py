import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Global Padding Update
content = content.replace("px-6 md:px-16 lg:px-24", "px-4 md:px-8 lg:px-10")
content = content.replace("px-6 md:px-16", "px-4 md:px-8")
content = content.replace("px-6 md:px-8", "px-4 md:px-8")

# 2. S7 Deep Tech Column Layout
content = content.replace(
'''            {/* Scrolling content blocks */}
            <AnimatedSection className="lg:w-[65%] flex flex-col gap-8 md:gap-12">
              {service.editorial.deepTechParagraphs.map((text: string, i: number) => (
                <AnimatedItem
                  key={i}
                  className="border-r-2 border-white/10 pr-10  transition-colors duration-700 w-full"
                >
                  <p className="text-blue-50 text-lg md:text-xl leading-[1.8] font-light">{text}</p>
                </AnimatedItem>
              ))}
            </AnimatedSection>''',
'''            {/* Scrolling content blocks */}
            <div className="lg:w-[65%]">
              <AnimatedSection className="columns-1 md:columns-2 gap-10 text-justify space-y-8 md:space-y-0">
                {service.editorial.deepTechParagraphs.map((text: string, i: number) => (
                  <AnimatedItem
                    key={i}
                    className="break-inside-avoid border-r-2 border-white/10 pr-6 mb-8 transition-colors duration-700 w-full"
                  >
                    <p className="text-blue-50 text-lg md:text-xl leading-snug font-light tracking-tight">{text}</p>
                  </AnimatedItem>
                ))}
              </AnimatedSection>
            </div>'''
)

# 3. S2 Story (Col Body)
content = content.replace(
'''<p className="text-blue-100 leading-[2] font-light text-lg md:text-xl leading-[1.8]">{col.body}</p>''',
'''<p className="text-blue-100 text-justify leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px]">{col.body}</p>'''
)

# 4. S4 Technology
content = content.replace(
'''<p className="text-white font-bold text-xl md:text-2xl leading-relaxed md:leading-snug transition-colors duration-500">{t.description}</p>''',
'''<p className="text-white font-bold text-xl md:text-2xl leading-snug text-justify tracking-tight max-w-2xl transition-colors duration-500">{t.description}</p>'''
)

# 5. S5 Client Journey
content = content.replace(
'''<p className="text-blue-200 leading-[1.9] font-light text-lg md:text-xl group-hover:text-blue-100 transition-colors duration-500">{step.description}</p>''',
'''<p className="text-blue-200 text-justify leading-snug font-light text-lg md:text-xl tracking-tight max-w-2xl group-hover:text-blue-100 transition-colors duration-500">{step.description}</p>'''
)

# 6. S6 Benefits
content = content.replace(
'''<h3 className="text-xl md:text-2xl font-black text-white group-hover:text-white transition-colors duration-500">{b.value}</h3>''',
'''<h3 className="text-xl md:text-2xl font-black text-white text-justify leading-tight tracking-tight max-w-2xl group-hover:text-white transition-colors duration-500">{b.value}</h3>'''
)

# 7. S8 FAQ
content = content.replace(
'''<p className="pb-6 text-blue-200 text-lg md:text-xl leading-[1.8] leading-[1.9] font-light">{q.a}</p>''',
'''<p className="pb-6 text-blue-200 text-lg md:text-xl text-justify leading-snug tracking-tight max-w-3xl font-light">{q.a}</p>'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Typography updates applied!")
