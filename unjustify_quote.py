import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the blockquote styling
content = content.replace(
    '''<blockquote className="relative z-10 text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-black leading-tight tracking-tight max-w-[750px] text-justify text-white">''',
    '''<blockquote className="relative z-10 text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-black leading-[1.3] md:leading-[1.4] max-w-[850px] text-right text-balance text-white">'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Quote justification removed and reverted to text-right with text-balance!")
