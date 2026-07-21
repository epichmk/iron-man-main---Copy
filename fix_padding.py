import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the super tight paddings with generous paddings
content = content.replace("px-2 md:px-4 lg:px-6", "px-10 md:px-20 lg:px-32")
content = content.replace("px-2 md:px-4", "px-10 md:px-20")

# Just in case there are others
content = content.replace("px-4 md:px-8 lg:px-10", "px-10 md:px-20 lg:px-32")
content = content.replace("px-4 md:px-8", "px-10 md:px-20")

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Padding increased to px-10 md:px-20 lg:px-32!")
