const fs = require('fs');
const path = 'src/components/sections/EditorialServicePage.tsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Add top fader to hero banner
const topFader = `<div className="absolute top-0 left-0 right-0 h-48 z-[1] bg-gradient-to-b from-[#000814] to-transparent" />`;
if (!content.includes('bg-gradient-to-b from-[#000814] to-transparent')) {
  // Find the gradient overlays section in S1
  content = content.replace(
    /\{\/\* Gradient overlays \*\/\}/,
    `{/* Gradient overlays */}\n        ${topFader}`
  );
}

// 2. Remove all local background "orbs" and "particles" inside sections
// We are targeting the div elements with blur-[100px]
// Example: <div className="absolute top-0 right-0 w-[600px] h-[200px] bg-gradient-to-r from-[#0066FF]/10 to-[#0066FF]/10 blur-[100px] pointer-events-none rounded-full" />

content = content.replace(/<div className="absolute[^"]+blur-\[100px\][^"]+" \/>/g, '');

fs.writeFileSync(path, content);
console.log('Background fixes applied successfully.');
