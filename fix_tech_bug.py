import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the Technology (S4) list to NOT use text-balance.
content = content.replace(
'''<p className="text-white font-bold text-xl md:text-2xl leading-snug tracking-normal max-w-2xl transition-colors duration-500 text-balance text-right">{t.description}</p>''',
'''<p className="text-white font-bold text-xl md:text-2xl leading-[1.4] max-w-2xl transition-colors duration-500 text-right">{t.description}</p>'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed text-balance from Technology list completely to stop the bug!")
