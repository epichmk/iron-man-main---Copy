import re

with open('src/app/services/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore the section height specifically for IX73
content = re.sub(
    r'className="relative w-full h-auto bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-0"',
    r"className={`relative w-full ${service.id === 'ix73-icsi-imsi' ? 'h-[60vh] md:h-[80vh] lg:h-screen' : 'h-auto'} bg-transparent z-20 flex flex-col justify-center items-center overflow-hidden p-0`}",
    content
)

# 2. In FlipCard, restore the absolute height specifically for IX73
content = re.sub(
    r"(\{\`w-full \[backface-visibility:hidden\] \[-webkit-backface-visibility:hidden\] \$\{service\.featured\s*\?\s*)'relative h-auto bg-\[\#000610\] (\[transform-style:preserve-3d\] shadow-\[inset_0_0_100px_rgba\(0,0,0,0\.8\),0_30px_60px_rgba\(0,0,0,0\.8\)\] border border-white/5)' : 'relative h-auto bg-transparent overflow-hidden'\}",
    r"\1service.id === 'ix73-icsi-imsi' ? 'absolute inset-0 h-full bg-[#000610] \2' : 'relative h-auto bg-[#000610] \2' : 'relative h-auto bg-transparent overflow-hidden'}",
    content
)

# 3. In FlipCard, restore absolute inset-0 for IX73
content = re.sub(
    r"(\{\`w-full \$\{service\.featured \?\s*)'relative h-auto (\[transform:translateZ\(30px\)\] transition-all duration-\[1200ms\] group-hover:\[transform:translateZ\(80px\)_scale\(1\.05\)\])' : 'relative h-auto'\}",
    r"\1service.id === 'ix73-icsi-imsi' ? 'h-full absolute inset-0 \2' : 'relative h-auto \2' : 'relative h-auto'}",
    content
)

# 4. In FlipCard, restore <Image fill object-cover> for IX73, keep <img> for others
img_pattern = r'''\{service\.featured \? \(
\s*<img
\s*src=\{imageSrc\}
\s*alt=\{service\.title\}
\s*className="w-full h-auto object-contain block transition-transform duration-\[1500ms\]"
\s*\/>
\s*\) : \('''

img_replacement = '''{service.featured ? (
                service.id === 'ix73-icsi-imsi' ? (
                  <Image
                    src={imageSrc}
                    alt={service.title}
                    fill
                    className="transition-transform duration-[1500ms] object-cover"
                  />
                ) : (
                  <img
                    src={imageSrc}
                    alt={service.title}
                    className="w-full h-auto object-contain block transition-transform duration-[1500ms]"
                  />
                )
              ) : ('''

content = re.sub(img_pattern, img_replacement, content)

with open('src/app/services/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored IX73 to full-screen object-cover!")
