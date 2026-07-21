const fs = require('fs');
const iconv = require('iconv-lite');

const file = "src/components/sections/CinematicTestimonials.tsx";
const corruptedString = fs.readFileSync(file, 'utf8');
let content = corruptedString;
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
}

const originalUtf8Bytes = iconv.encode(content, 'win1256');
const restoredString = originalUtf8Bytes.toString('utf8');

console.log(restoredString.substring(0, 300));
fs.writeFileSync('test_restore.tsx', restoredString, 'utf8');
