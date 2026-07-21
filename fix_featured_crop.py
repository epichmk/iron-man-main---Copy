import re

with open('src/app/services/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. In page.tsx, remove the fixed height from the featured services section
content = re.sub(
    r"className=\{(\`relative w-full \$\{service\.id === 'ix73-icsi-imsi' \? 'h-\[60vh\] md:h-\[80vh\] lg:h-screen' : 'h-\[40vh\] md:h-\[60vh\] lg:h-\[70vh\]'\}\s*bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-0\`)\}",
    r'className="relative w-full h-auto bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-0"',
    content
)

# 2. In FlipCard, let the front side dictate the height for featured services too
content = re.sub(
    r"(\{\`w-full \[backface-visibility:hidden\] \[-webkit-backface-visibility:hidden\] \$\{service\.featured\s*\?\s*)'absolute inset-0 h-full bg-\[\#000610\] (\[transform-style:preserve-3d\] shadow-\[inset_0_0_100px_rgba\(0,0,0,0\.8\),0_30px_60px_rgba\(0,0,0,0\.8\)\] border border-white/5)' : 'relative h-auto bg-transparent overflow-hidden'\}",
    r"\1'relative h-auto bg-[#000610] \2' : 'relative h-auto bg-transparent overflow-hidden'}",
    content
)

# 3. In FlipCard, remove absolute inset-0 from the image container for featured services
content = re.sub(
    r"(\{\`w-full \$\{service\.featured \?\s*)'h-full absolute inset-0 (\[transform:translateZ\(30px\)\] transition-all duration-\[1200ms\] group-hover:\[transform:translateZ\(80px\)_scale\(1\.05\)\])' : 'h-auto relative'\}",
    r"\1'relative h-auto \2' : 'relative h-auto'}",
    content
)

# 4. Use <img> instead of <Image fill /> for featured services so it scales naturally
img_featured = r'''\{service\.featured \? \(
\s*<Image
\s*src=\{imageSrc\}
\s*alt=\{service\.title\}
\s*fill
\s*className="transition-transform duration-\[1500ms\] object-cover"
\s*\/>
\s*\) : \('''

img_repl = '''{service.featured ? (
                <img
                  src={imageSrc}
                  alt={service.title}
                  className="w-full h-auto object-contain block transition-transform duration-[1500ms]"
                />
              ) : ('''

content = re.sub(img_featured, img_repl, content)

with open('src/app/services/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed FlipCard to scale to full width without cropping!")
