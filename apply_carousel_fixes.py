import re

# 1. DesktopHomepage.tsx - Adjust Swipe Sensitivity
with open('src/components/DesktopHomepage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

onup_pattern = r'''(onUp: \(self\) => \{\s*// Ignore if the swipe is predominantly horizontal\s*if \(Math\.abs\(self\.deltaX\) > Math\.abs\(self\.deltaY\)\) return;)'''
onup_repl = r'''\1\n          // SPECIAL OVERRIDE FOR CAROUSEL SENSITIVITY\n          if (currentIndex.current === 3) {\n            const isTouch = self.event && (self.event.type.includes("touch") || getattr(self.event, "pointerType", "") === "touch");\n            if (isTouch && Math.abs(self.y - self.startY) < 180) return;\n          }'''

ondown_pattern = r'''(onDown: \(self\) => \{\s*// Ignore if the swipe is predominantly horizontal\s*if \(Math\.abs\(self\.deltaX\) > Math\.abs\(self\.deltaY\)\) return;)'''
ondown_repl = r'''\1\n          \n          // SPECIAL OVERRIDE FOR CAROUSEL SENSITIVITY\n          if (currentIndex.current === 3) {\n            const isTouch = self.event && (self.event.type.includes("touch") || getattr(self.event, "pointerType", "") === "touch");\n            if (isTouch && Math.abs(self.y - self.startY) < 180) return;\n          }'''

# Since getattr is Python, in JS it's self.event.pointerType
onup_repl = onup_repl.replace('getattr(self.event, "pointerType", "") === "touch"', '(self.event as any).pointerType === "touch"')
ondown_repl = ondown_repl.replace('getattr(self.event, "pointerType", "") === "touch"', '(self.event as any).pointerType === "touch"')

content = re.sub(onup_pattern, onup_repl, content)
content = re.sub(ondown_pattern, ondown_repl, content)

with open('src/components/DesktopHomepage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


# 2. ServicesScene2Carousel.tsx - Sort and Auto Exit
with open('src/components/sections/ServicesScene2Carousel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Sort
content = content.replace(
    "const nonHeroServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');",
    "const nonHeroServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');\n  nonHeroServices.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));"
)

# Auto Exit
content = content.replace(
    'toggleActions: "play none none reverse"',
    'toggleActions: "play none none none"'
)

with open('src/components/sections/ServicesScene2Carousel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


# 3. MobileServicesCarousel.tsx - Sort
with open('src/components/mobile/sections/MobileServicesCarousel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "const mobileServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');",
    "const mobileServices = servicesData.filter(s => s.id !== 'ix73-icsi-imsi');\nmobileServices.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));"
)

with open('src/components/mobile/sections/MobileServicesCarousel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied all carousel fixes!")
