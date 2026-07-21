import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the Benefits (S6) list to NOT use text-balance.
# For some reason, Safari/Chrome on Arabic text-balance still miscalculates when it's mixed with flex items.
content = content.replace(
'''<h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-normal max-w-2xl group-hover:text-white transition-colors duration-500 text-balance text-right">{b.value}</h3>''',
'''<h3 className="text-xl md:text-2xl font-black text-white leading-[1.4] max-w-2xl group-hover:text-white transition-colors duration-500 text-right">{b.value}</h3>'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed text-balance from Benefits list completely to stop the bug!")
