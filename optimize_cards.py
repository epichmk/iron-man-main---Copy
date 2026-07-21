import re

with open('src/app/services/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the heavy 3D entrance animation with a simpler fade up
heavy_initial = r'initial=\{\{\s*opacity:\s*0,\s*y:\s*150,\s*scale:\s*0\.9,\s*rotateX:\s*20\s*\}\}'
simple_initial = r'initial={{ opacity: 0, y: 50 }}'

heavy_animate = r'whileInView=\{\{\s*opacity:\s*1,\s*y:\s*0,\s*scale:\s*1,\s*rotateX:\s*0\s*\}\}'
# We also want to add a smooth tween transition instead of the default heavy spring
simple_animate = r'whileInView={{ opacity: 1, y: 0 }}\n                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}'

content = re.sub(heavy_initial, simple_initial, content)
content = re.sub(heavy_animate, simple_animate, content)

# Check if there's any blur in stagger container
content = content.replace('filter: "blur(10px)"', 'filter: "blur(0px)"')
content = content.replace('filter: "blur(20px)"', 'filter: "blur(0px)"')

with open('src/app/services/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Optimized card entrance animations!")
