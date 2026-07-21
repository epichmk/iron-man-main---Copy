const fs = require('fs');
const path = 'src/components/sections/EditorialServicePage.tsx';

let content = fs.readFileSync(path, 'utf8');

// Add imports if they don't exist
if (!content.includes('AnimatedSection')) {
  content = content.replace(
    /import \{ Navbar \} from "@\/components\/ui\/Navbar";/,
    'import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";\nimport { Navbar } from "@/components/ui/Navbar";'
  );
}

// 1. Technology Section (Lines 240-275ish)
// We want to wrap the technology mapping in AnimatedSection and the items in AnimatedItem.
content = content.replace(
  /\{\(service\.technologyUsed \|\| \[\]\)\.map\(\(t: \{name: string; description: string\}, i: number\) => \(\s*<motion\.div\s*key=\{i\}\s*initial=\{\{ opacity: 0 \}\}\s*whileInView=\{\{ opacity: 1 \}\}\s*viewport=\{\{ once: true \}\}\s*transition=\{\{ duration: 0\.6, delay: i \* 0\.1 \}\}\s*className="([^"]+)"\s*>/g,
  '<AnimatedSection className="w-full flex flex-col">\n            {(service.technologyUsed || []).map((t: {name: string; description: string}, i: number) => (\n              <AnimatedItem key={i} className="$1">'
);
content = content.replace(
  /<\/div>\s*<\/motion\.div>\s*\)\)}\s*<div className="border-t border-white\/5" \/>/g,
  '</div>\n              </AnimatedItem>\n            ))}\n            </AnimatedSection>\n            <div className="border-t border-white/5" />'
);

// 2. Client Journey Section
content = content.replace(
  /\{\(service\.clientJourney \|\| \[\]\)\.map\(\(step: \{step: number; title: string; description: string\}, i: number\) => \(\s*<motion\.div\s*key=\{i\}\s*initial=\{\{ opacity: 0, x: 30 \}\}\s*whileInView=\{\{ opacity: 1, x: 0 \}\}\s*viewport=\{\{ once: true, margin: "-10%" \}\}\s*transition=\{\{ duration: 0\.7, delay: i \* 0\.08, ease: \[0\.16, 1, 0\.3, 1\] \}\}\s*className="([^"]+)"\s*>/g,
  '<AnimatedSection className="w-full flex flex-col relative">\n              {(service.clientJourney || []).map((step: {step: number; title: string; description: string}, i: number) => (\n                <AnimatedItem key={i} className="$1">'
);
content = content.replace(
  /<\/div>\s*<\/motion\.div>\s*\)\)}\s*<\/div>/g,
  '</div>\n                </AnimatedItem>\n              ))}\n              </AnimatedSection>\n            </div>'
);

// 3. Benefits Section
content = content.replace(
  /\{\(service\.benefits \|\| \[\]\)\.map\(\(b: \{label: string; value: string\}, i: number\) => \(\s*<motion\.div\s*key=\{i\}\s*initial=\{\{ opacity: 0 \}\}\s*whileInView=\{\{ opacity: 1 \}\}\s*viewport=\{\{ once: true \}\}\s*transition=\{\{ duration: 0\.5, delay: i \* 0\.04 \}\}\s*className="([^"]+)"\s*>/g,
  '<AnimatedSection className="w-full flex flex-col">\n            {(service.benefits || []).map((b: {label: string; value: string}, i: number) => (\n              <AnimatedItem key={i} className="$1">'
);
// The closing for benefits is same as tech:
// Wait, the regex for benefits closing is slightly different because it might not have the same exact match. Let's use a more robust replace for closing tags.

fs.writeFileSync('src/components/sections/EditorialServicePage.temp.tsx', content);
console.log('Script ran. Please review the output file.');
