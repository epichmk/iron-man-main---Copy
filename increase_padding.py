import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the tight paddings with very generous paddings
content = content.replace("px-4 md:px-8 lg:px-10", "px-8 md:px-20 lg:px-32")
content = content.replace("px-4 md:px-8", "px-8 md:px-20")

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Padding increased!")
