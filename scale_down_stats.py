import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Shrink the card dimensions
content = content.replace("h-[250px] md:h-[300px] p-6 md:p-8", "h-[180px] md:h-[220px] p-4 md:p-6")

# Shrink the explosive value typography and container width
content = content.replace(
'''<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] text-center pointer-events-none z-10" dir={hasArabic ? "rtl" : "ltr"}>
                      <span className="font-black text-[3rem] md:text-[4rem] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20 drop-shadow-[0_20px_30px_rgba(0,0,0,1)] block group-hover:scale-110 transition-transform duration-700 group-hover:from-white group-hover:via-[#0094FE] group-hover:to-white">''',
'''<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2 text-center pointer-events-none z-10" dir={hasArabic ? "rtl" : "ltr"}>
                      <span className="font-black text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20 drop-shadow-[0_10px_20px_rgba(0,0,0,1)] block group-hover:scale-110 transition-transform duration-700 group-hover:from-white group-hover:via-[#0094FE] group-hover:to-white">'''
)

# Shrink the background watermark
content = content.replace(
'''<span className="font-black text-[15rem] md:text-[30rem] leading-none whitespace-nowrap tracking-tighter text-white rotate-[-5deg] scale-150">''',
'''<span className="font-black text-[10rem] md:text-[20rem] leading-none whitespace-nowrap tracking-tighter text-white rotate-[-5deg] scale-125">'''
)

# Shrink the label positioning
content = content.replace("bottom-8 left-8", "bottom-4 left-4")
content = content.replace("top-6 left-6", "top-4 left-4")
content = content.replace("top-6 right-6", "top-4 right-4")

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Scaled down the maximalist stats!")
