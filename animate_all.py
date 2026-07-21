import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. S7 Deep Tech
s7_old = '''            <div className="w-full lg:w-1/2 flex flex-col justify-center" dir="rtl">
              <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-8">
                / {service.editorial.deepTechTitle}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-black text-white leading-[1.1] mb-8 text-balance">
                {service.editorial.deepTechTitle}
              </h2>
              <div className="space-y-6 md:space-y-8">
                {service.editorial.deepTechParagraphs.map((p: string, i: number) => (
                  <p key={i} className="text-blue-100 leading-relaxed font-light text-lg md:text-xl md:text-justify text-right max-w-[600px] text-balance">
                    {p}
                  </p>
                ))}
              </div>
            </div>'''
s7_new = '''            <AnimatedSection className="w-full lg:w-1/2 flex flex-col justify-center" dir="rtl">
              <AnimatedItem>
                <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-8">
                  / {service.editorial.deepTechTitle}
                </span>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-black text-white leading-[1.1] mb-8 text-balance">
                  {service.editorial.deepTechTitle}
                </h2>
              </AnimatedItem>
              <div className="space-y-6 md:space-y-8">
                {service.editorial.deepTechParagraphs.map((p: string, i: number) => (
                  <AnimatedItem key={i}>
                    <p className="text-blue-100 leading-relaxed font-light text-lg md:text-xl md:text-justify text-right max-w-[600px] text-balance">
                      {p}
                    </p>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>'''

# 2. S6 Benefits Header
s6_header_old = '''            <div className="mb-12 md:mb-20 text-center md:text-right" dir="rtl">
              <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-4">/ لماذا النخبة</span>
              <h2 className="text-3xl md:text-5xl font-black text-white text-balance">المميزات والقيمة المضافة</h2>
            </div>'''
s6_header_new = '''            <AnimatedSection className="mb-12 md:mb-20 text-center md:text-right" dir="rtl">
              <AnimatedItem>
                <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-4">/ لماذا النخبة</span>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="text-3xl md:text-5xl font-black text-white text-balance">المميزات والقيمة المضافة</h2>
              </AnimatedItem>
            </AnimatedSection>'''

# 3. S8 FAQ
s8_old = '''            <div className="mb-12 text-center" dir="rtl">
              <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-4">/ استفساراتكم</span>
              <h2 className="text-3xl md:text-5xl font-black text-white text-balance">{service.editorial.faqSubtitle}</h2>
            </div>
            <div className="flex flex-col gap-4" dir="rtl">
              {service.editorial.faqQuestions.map((faq: {q: string; a: string}, i: number) => (
                <div 
                  key={i} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >'''
s8_new = '''            <AnimatedSection className="mb-12 text-center" dir="rtl">
              <AnimatedItem>
                <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-4">/ استفساراتكم</span>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="text-3xl md:text-5xl font-black text-white text-balance">{service.editorial.faqSubtitle}</h2>
              </AnimatedItem>
            </AnimatedSection>
            <AnimatedSection className="flex flex-col gap-4" dir="rtl">
              {service.editorial.faqQuestions.map((faq: {q: string; a: string}, i: number) => (
                <AnimatedItem key={i} className="w-full">
                  <div 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >'''
# Note: we need to make sure the closing </div> for FAQ mapping is adjusted if we wrapped it in AnimatedItem.
# It's currently:
#                 </div>
#               ))}
#             </div>
s8_end_old = '''                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>'''
s8_end_new = '''                    </AnimatePresence>
                  </div>
                </div>
                </AnimatedItem>
              ))}
            </AnimatedSection>'''

# 4. Quick Links
ql_old = '''            <div className="mb-12 md:mb-20 text-right" dir="rtl">
              <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-4">/ استكشف المزيد</span>
              <h2 className="text-3xl md:text-5xl font-black text-white">بروتوكولات ذات صلة</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {quickLinks.map((ql, i) => (
                <Link key={i} href={`/services/${ql.id}`} className="group relative aspect-video rounded-[2rem] overflow-hidden">'''
ql_new = '''            <AnimatedSection className="mb-12 md:mb-20 text-right" dir="rtl">
              <AnimatedItem>
                <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase block mb-4">/ استكشف المزيد</span>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="text-3xl md:text-5xl font-black text-white">بروتوكولات ذات صلة</h2>
              </AnimatedItem>
            </AnimatedSection>
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {quickLinks.map((ql, i) => (
                <AnimatedItem key={i} className="group relative aspect-video rounded-[2rem] overflow-hidden">
                  <Link href={`/services/${ql.id}`} className="block w-full h-full relative">'''
# Note: we need to fix the Link closing tag
ql_end_old = '''                    <ArrowLeft className="w-5 h-5 text-white transform group-hover:-translate-x-2 transition-transform duration-500" />
                  </div>
                </Link>
              ))}
            </div>'''
ql_end_new = '''                    <ArrowLeft className="w-5 h-5 text-white transform group-hover:-translate-x-2 transition-transform duration-500" />
                  </div>
                  </Link>
                </AnimatedItem>
              ))}
            </AnimatedSection>'''

content = content.replace(s7_old, s7_new)
content = content.replace(s6_header_old, s6_header_new)
content = content.replace(s8_old, s8_new)
content = content.replace(s8_end_old, s8_end_new)
content = content.replace(ql_old, ql_new)
content = content.replace(ql_end_old, ql_end_new)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Applied AnimatedSection to everything!")
