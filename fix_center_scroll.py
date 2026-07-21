import re

with open('src/components/sections/TheCenterDetailed.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to add the useEffect right at the top of the component
target = r'export function TheCenterDetailed\(\)\s*\{'

replacement = '''export function TheCenterDetailed() {
  // Force scroll to top on mount so the user ALWAYS lands on the hero banner
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
    return () => clearTimeout(t);
  }, []);
'''

content = re.sub(target, replacement, content)

with open('src/components/sections/TheCenterDetailed.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added force-scroll-to-top on TheCenterDetailed!")
