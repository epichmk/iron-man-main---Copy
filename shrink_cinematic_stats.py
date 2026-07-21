import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Shrink the massive typography in the cinematic stats
content = content.replace("font-black text-3xl md:text-4xl lg:text-5xl", "font-black text-xl md:text-2xl lg:text-3xl")

# Make the hover scale a bit more refined (smaller jump)
content = content.replace("group-hover:scale-[1.15]", "group-hover:scale-105")

# Decrease vertical padding slightly so the section isn't too massive
content = content.replace("py-12 md:py-16 flex flex-col", "py-8 md:py-10 flex flex-col")

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Scaled down the cinematic stats!")
