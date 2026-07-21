import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the S1.5 section
pattern = r"(\{\/\* ══════════════════════════════════════════════════════════\s*S1\.5 — STATS STRIP.*?(?=\{/\* ══════════════════════════════════════════════════════════\s*S2 —))"

match = re.search(pattern, content, flags=re.DOTALL)
if match:
    stats_section = match.group(1)
    
    # Replace blue with chartreuse
    new_stats_section = stats_section.replace('#0094FE', '#D4FF00')
    
    content = content.replace(stats_section, new_stats_section)
    
    with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Chartreuse applied to Stats Strip!")
else:
    print("Could not find the Stats Strip section.")
