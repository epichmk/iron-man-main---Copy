import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change flex direction so it stacks instead of sitting side-by-side (since it's full bleed now)
content = content.replace(
    '''<div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-8 md:mb-16">''',
    '''<div className="flex flex-col items-center justify-center gap-16 mb-8 md:mb-24">'''
)

# Change the image container to be full bleed
content = content.replace(
    '''w-full md:w-[400px] lg:w-[500px] aspect-square md:aspect-[4/3] relative rounded-[2rem] \noverflow-hidden bg-transparent flex-shrink-0''',
    '''w-[100vw] relative left-1/2 -translate-x-1/2 aspect-square md:aspect-[21/9] rounded-none overflow-hidden bg-transparent flex-shrink-0'''
).replace(
    '''w-full md:w-[400px] lg:w-[500px] aspect-square md:aspect-[4/3] relative rounded-[2rem] overflow-hidden bg-transparent flex-shrink-0''',
    '''w-[100vw] relative left-1/2 -translate-x-1/2 aspect-square md:aspect-[21/9] rounded-none overflow-hidden bg-transparent flex-shrink-0'''
)

# Change object-contain to object-cover so it fills the full bleed container nicely
content = content.replace(
    '''<Image src={service.image} alt={service.title} fill className="object-contain" />''',
    '''<Image src={service.image} alt={service.title} fill className="object-cover" />'''
)

# Remove the floating animation because a full-bleed image bobbing up and down leaves gaps at the edges
content = content.replace(
    '''animate={{ y: [0, -20, 0] }}''',
    ''''''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Made image full bleed!")
