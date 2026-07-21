import re

with open('temp_read.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. S7 - Deep Tech Methodology (Scrolling content blocks)
# We want to wrap the text side in AnimatedSection and AnimatedItem
def replace_s7(match):
    s = match.group(0)
    # Wrap the entire div in AnimatedSection
    s = s.replace('<div className="lg:w-[65%]">', '<div className="lg:w-[65%]">\n                <AnimatedSection className="flex flex-col gap-10 text-right md:text-justify">')
    # Or actually the text is inside `columns-1 md:columns-2...`
    # Let's just find the deepTechParagraphs.map
    # Currently:
    # <div className="lg:w-[65%]">
    #   <AnimatedSection className="columns-1 md:columns-2 gap-10 text-right md:text-justify space-y-8 md:space-y-0">
    #     {service.editorial.deepTechParagraphs.map((text: string, i: number) => (
    #       <p key={i} className="text-blue-100 leading-relaxed font-light text-lg md:text-xl md:text-justify text-right break-inside-avoid mb-8 shadow-sm">
    #         {text}
    #       </p>
    #     ))}
    #   </AnimatedSection>
    # </div>
    # Wait, looking at the previous grep, it says S7 has:
    # <AnimatedSection className="columns-1 md:columns-2 gap-10 text-right md:text-justify space-y-8 md:space-y-0">
    # It ALREADY has AnimatedSection! It just needs AnimatedItem inside the map!
    s = re.sub(
        r'(<p key=\{i\} className="[^"]+">\s*\{text\}\s*</p>)',
        r'<AnimatedItem key={i}>\1</AnimatedItem>',
        s
    )
    # The sticky title:
    s = re.sub(
        r'(<h2 className="text-4xl md:text-6xl font-black text-white leading-\[1.1\] text-balance drop-shadow-xl">\s*\{service\.editorial\.deepTechTitle\}\s*</h2>)',
        r'<AnimatedItem>\1</AnimatedItem>',
        s
    )
    s = re.sub(
        r'(<span className="text-\[\#0094FE\] font-mono text-sm md:text-base font-bold tracking-widest uppercase block mb-6">\s*/\s*\{service\.editorial\.deepTechTitle\}\s*</span>)',
        r'<AnimatedItem>\1</AnimatedItem>',
        s
    )
    s = re.sub(
        r'(<div className="lg:w-\[35\%\] lg:sticky lg:top-32 h-fit">\s*)(<AnimatedItem>)?',
        r'\1<AnimatedSection>\n                ',
        s
    )
    s = s.replace('</div>\n              </div>\n            </div>', '</AnimatedSection>\n              </div>\n            </div>')
    return s

# 2. S8 - FAQs
def replace_s8(match):
    s = match.group(0)
    # The header is currently motion.div. Let's change it to AnimatedSection + AnimatedItems
    header_pattern = r'<motion\.div[^>]+className="mb-10">\s*<span[^>]+>(.*?)</span>\s*<h2[^>]+>(.*?)</h2>\s*</motion\.div>'
    def header_repl(m):
        return f'<AnimatedSection className="mb-10">\n              <AnimatedItem>\n                <span className="text-[#d4e616] text-sm md:text-base font-bold tracking-widest uppercase block mb-6">{m.group(1)}</span>\n              </AnimatedItem>\n              <AnimatedItem>\n                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{m.group(2)}</h2>\n              </AnimatedItem>\n            </AnimatedSection>'
    s = re.sub(header_pattern, header_repl, s)
    
    # The map:
    # {(service.faq || []).map((q: {q: string; a: string}, i: number) => (
    #   <div key={i} ...
    map_start = r'\{\(service\.faq \|\| \[\]\)\.map\(\(q[^>]+\)\s*=>\s*\('
    # we want to wrap the returned div in AnimatedItem, and the whole map in AnimatedSection.
    # We can replace the start:
    s = re.sub(map_start, r'<AnimatedSection className="flex flex-col w-full">\n            {(service.faq || []).map((q: {q: string; a: string}, i: number) => (\n              <AnimatedItem key={i}>', s)
    # We replace the end of the map:
    s = s.replace('</div>\n            ))}', '</div>\n              </AnimatedItem>\n            ))}\n            </AnimatedSection>')
    return s

# 3. S9 - Blogs
def replace_s9(match):
    s = match.group(0)
    # Replace motion.div header with AnimatedSection
    header_pattern = r'<motion\.div[^>]+className="flex items-end justify-between mb-8">\s*<div>\s*<span[^>]+>(.*?)</span>\s*<h2[^>]+>(.*?)</h2>\s*</div>\s*</motion\.div>'
    def header_repl(m):
        return f'<AnimatedSection className="flex items-end justify-between mb-8">\n              <div>\n                <AnimatedItem>\n                  <span className="text-[#0094FE] font-mono text-sm md:text-base font-bold tracking-widest uppercase block mb-4">{m.group(1)}</span>\n                </AnimatedItem>\n                <AnimatedItem>\n                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{m.group(2)}</h2>\n                </AnimatedItem>\n              </div>\n            </AnimatedSection>'
    s = re.sub(header_pattern, header_repl, s)
    
    # Replace motion.div cards with AnimatedItem. The grid should be AnimatedSection
    s = s.replace('<div className="grid grid-cols-1 md:grid-cols-3 gap-6">', '<AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6">')
    s = s.replace('</div>\n          </div>', '</AnimatedSection>\n          </div>')
    
    # Replace the card motion.div
    card_pattern = r'<motion\.div key=\{post\.id\} initial=[^>]+>'
    s = re.sub(card_pattern, r'<AnimatedItem key={post.id}>', s)
    # The closing tag for motion.div is inside the map
    s = re.sub(r'</Link>\s*</motion\.div>', r'</Link>\n                </AnimatedItem>', s)
    
    return s

# 4. S10 - Navigation
def replace_s10(match):
    s = match.group(0)
    # We have top section (prev/next) and bottom grid (quickLinks)
    s = s.replace('<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-8 border-t border-white/5 pt-16">', '<AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-8 border-t border-white/5 pt-16">')
    s = s.replace('</Link>\n          </div>', '</Link>\n          </AnimatedSection>')
    
    s = s.replace('<Link href={`/services/${prev.id}`}', '<AnimatedItem className="w-full md:w-1/2">\n            <Link href={`/services/${prev.id}`}')
    s = s.replace('</Link>\n            <Link href={`/services/${next.id}`}', '</Link>\n            </AnimatedItem>\n            <AnimatedItem className="w-full md:w-1/2">\n            <Link href={`/services/${next.id}`}')
    
    # Wait, the closing of the next Link is directly before `</div>` (which is now `</AnimatedSection>`)
    s = s.replace('</Link>\n          </AnimatedSection>', '</Link>\n            </AnimatedItem>\n          </AnimatedSection>')
    
    # Quick links grid
    s = s.replace('<div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-10">', '<AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-10">')
    # The end of the grid is `</div>\n        </div>\n        \n        {/* Bottom fader`
    s = s.replace('</div>\n        </div>\n        \n        {/* Bottom fader', '</AnimatedSection>\n        </div>\n        \n        {/* Bottom fader')
    
    # Inside quicklinks map
    s = s.replace('<Link key={l.id}', '<AnimatedItem key={l.id}>\n              <Link')
    s = s.replace('</h4>\n              </Link>\n            ))}', '</h4>\n              </Link>\n              </AnimatedItem>\n            ))}')
    
    return s


# Apply replacements
# S7
content = re.sub(r'\{\/\*\s*S7.*?\{\/\*\s*S8', replace_s7, content, flags=re.DOTALL)
# S8
content = re.sub(r'\{\/\*\s*S8.*?\{\/\*\s*S9', replace_s8, content, flags=re.DOTALL)
# S9
content = re.sub(r'\{\/\*\s*S9.*?\{\/\*\s*S10', replace_s9, content, flags=re.DOTALL)
# S10
content = re.sub(r'\{\/\*\s*S10.*?</section>', replace_s10, content, flags=re.DOTALL)


with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied animations using advanced regex!")
