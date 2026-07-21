import re

with open('src/app/services/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Target the map function's motion.div
# It currently has:
# initial={{ opacity: 0, y: 50 }}
# whileInView={{ opacity: 1, y: 0 }}
#       transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
# viewport={{ once: true, margin: "-100px" }}

target_pattern = r'initial=\{\{\s*opacity:\s*0,\s*y:\s*50\s*\}\}\s*whileInView=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s*transition=\{\{\s*duration:\s*0\.7,\s*ease:\s*\[0\.16,\s*1,\s*0\.3,\s*1\]\s*\}\}'

# We want to replace it with:
replacement = '''initial={{ opacity: 0, y: 100, scale: 0.95, rotateX: 15 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (idx % 4) * 0.1 }}'''

# Wait, the CTA cell doesn't have `idx`.
# Let's replace only the one inside the map by using a more specific target.
# Actually, I can just replace the first one inside the map.
# Or better, just write a regex that catches both and ignores the `idx` error if it's the CTA? No, `idx` would throw ReferenceError.
# Let's look at the CTA cell.
# The CTA cell is at the end:
# {/* Extra Cell for CTA and Socials */}
#                 <motion.div
#                   initial={{ opacity: 0, y: 50 }}
#                   whileInView={{ opacity: 1, y: 0 }}
#                         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}

cta_replacement = '''initial={{ opacity: 0, y: 100, scale: 0.95, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}'''

# Replace the specific one inside the map:
content = re.sub(
    r'(key=\{service\.id\}\s*)' + target_pattern,
    r'\1' + replacement,
    content
)

# Replace the one for the CTA:
content = re.sub(
    r'(<!-- Extra Cell.*?-->\s*<motion\.div\s*)' + target_pattern.replace(' ', r'\s*'),
    r'\1' + cta_replacement,
    content,
    flags=re.DOTALL
)
# Wait, it's {/* Extra Cell ... */}, not <!--
content = re.sub(
    r'(\{\/\*\s*Extra Cell.*?\*\/\}\s*<motion\.div\s*)' + target_pattern,
    r'\1' + cta_replacement,
    content,
    flags=re.DOTALL
)

# Let's just do a manual replace using string index to be safe.
# Find the first occurrence (which is inside the map)
# And the second occurrence (which is the CTA)

content = content.replace(
    'initial={{ opacity: 0, y: 50 }}\n                      whileInView={{ opacity: 1, y: 0 }}\n                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}',
    'initial={{ opacity: 0, y: 100, scale: 0.95, rotateX: 15 }}\n                      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}\n                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (idx % 4) * 0.1 }}'
)

# Fix the CTA one (which doesn't have idx)
content = content.replace(
    'transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (idx % 4) * 0.1 }}\n                  viewport={{ once: true, margin: "-100px" }}\n                  className="col-span-2 lg:col-span-1 rounded-2xl md:rounded-3xl',
    'transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}\n                  viewport={{ once: true, margin: "-100px" }}\n                  className="col-span-2 lg:col-span-1 rounded-2xl md:rounded-3xl'
)

with open('src/app/services/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Reverted and smoothed card animations!")
