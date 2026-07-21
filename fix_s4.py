import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace S4 motion.div header with AnimatedSection
s4_pattern = r'<motion\.div[^>]+className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-10">\s*(.*?)\s*</motion\.div>'

def s4_repl(match):
    inner = match.group(1)
    # The inner content is:
    # <div>
    #   <span ...>/ التقنيات</span>
    #   <h2 ...>أحدث التقنيات<br /><span ...>الدقيقة والآمنة</span></h2>
    # </div>
    # <p ...>...</p>
    # We want to wrap the div in AnimatedItem, and the p in AnimatedItem
    # Actually, we can just do:
    inner = inner.replace('<div>', '<AnimatedItem>\n                <div>')
    inner = inner.replace('</div>\n                <p', '</div>\n                </AnimatedItem>\n                <AnimatedItem>\n                <p')
    inner = inner.replace('</p>', '</p>\n                </AnimatedItem>')
    return f'<AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-10">\n                {inner}\n              </AnimatedSection>'

content = re.sub(s4_pattern, s4_repl, content, flags=re.DOTALL)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed S4!")
