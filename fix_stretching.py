import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove tracking-tight from S2, S4, S5, S6
content = content.replace("tracking-tight max-w-[400px] text-balance text-right", "tracking-normal max-w-[400px] text-balance text-right")
content = content.replace("tracking-tight max-w-2xl transition-colors duration-500 text-balance text-right", "tracking-normal max-w-2xl transition-colors duration-500 text-balance text-right")
content = content.replace("tracking-tight max-w-2xl group-hover:text-blue-100 transition-colors duration-500 text-balance text-right", "tracking-normal max-w-2xl group-hover:text-blue-100 transition-colors duration-500 text-balance text-right")
content = content.replace("tracking-tight max-w-2xl group-hover:text-white transition-colors duration-500 text-balance text-right", "tracking-normal max-w-2xl group-hover:text-white transition-colors duration-500 text-balance text-right")

# Let's also remove tracking-tight from the FAQ
content = content.replace("tracking-tight max-w-3xl font-light text-balance text-right", "tracking-normal max-w-3xl font-light text-balance text-right")

# Also, ensure there is no hidden justify on the S5 wrapper
# Currently: className="pt-2 md:pt-4 flex-1 max-w-2xl"
# Let's change it to "pt-2 md:pt-4 flex-1 max-w-2xl text-right"
content = content.replace('className="pt-2 md:pt-4 flex-1 max-w-2xl"', 'className="pt-2 md:pt-4 flex-1 max-w-2xl text-right"')

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed tracking-tight which might be causing rendering bugs in Arabic text balance.")
