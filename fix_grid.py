import re

with open('src/app/services/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove max-w-[1400px], rounded-3xl, and padding from the grid container
content = content.replace(
    'className="relative w-full min-h-screen  bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-2 md:p-6 lg:p-10"',
    'className="relative w-full min-h-screen bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-0"'
)

content = content.replace(
    'className="relative w-full max-w-[1400px] rounded-3xl overflow-hidden bg-transparent flex justify-center items-center"',
    'className="relative w-full overflow-hidden bg-transparent flex justify-center items-center"'
)

# 2. Delete the fade layer entirely
content = content.replace(
    '{/* Outer Edges Fade Layer */}\n              <div className="absolute inset-0 z-40 pointer-events-none shadow-[inset_0_0_120px_60px_#000000]" />',
    ''
)

# Alternative regex if formatting shifted
content = re.sub(
    r'\{\/\*\s*Outer Edges Fade Layer\s*\*\/\}\s*<div className="absolute inset-0 z-40 pointer-events-none shadow-\[inset_0_0_120px_60px_\#000000\]" \/>',
    '',
    content
)

with open('src/app/services/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed normal grid max-width and fade!")
