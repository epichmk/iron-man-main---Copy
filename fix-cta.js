const fs = require('fs');

const blogDataPath = 'src/lib/blogData.ts';
let content = fs.readFileSync(blogDataPath, 'utf8');

// Replace any heading that starts with <h2>خطوتك القادمة معنا</h2> 
// and the immediately following <p>...</p> block.
// Using a more lenient regex to handle spaces and newlines.
const ctaRegex = /<h2>خطوتك القادمة معنا<\/h2>\s*<p>.*?<\/p>/gs;

const matches = content.match(ctaRegex);
console.log(`Found ${matches ? matches.length : 0} CTA blocks.`);

content = content.replace(ctaRegex, '');
fs.writeFileSync(blogDataPath, content);
