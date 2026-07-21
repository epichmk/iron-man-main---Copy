import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Shrink the outer section padding
content = content.replace(
    '''<section className="relative w-full z-20 bg-transparent py-16 md:py-24 overflow-hidden border-t border-b border-white/5">''',
    '''<section className="relative w-full z-20 bg-transparent py-6 md:py-8 overflow-hidden border-t border-b border-white/5">'''
)

# Shrink the inner grid item padding
content = content.replace(
    '''className="relative w-full py-8 md:py-10 flex flex-col items-center justify-center gap-6 group cursor-default overflow-hidden"''',
    '''className="relative w-full py-4 md:py-6 flex flex-col items-center justify-center gap-4 group cursor-default overflow-hidden"'''
)

# Also shrink the gap between grid items slightly if needed
content = content.replace(
    '''<AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 divide-y divide-white/5 md:divide-y-0 md:divide-x md:divide-x-reverse md:divide-white/5">''',
    '''<AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 divide-y divide-white/5 md:divide-y-0 md:divide-x md:divide-x-reverse md:divide-white/5">'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Scaled down the section height by half!")
