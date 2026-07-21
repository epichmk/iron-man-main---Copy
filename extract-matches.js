const fs = require('fs');

const files = ['src/lib/blogData.ts', 'src/lib/servicesData.json'];
const targetRegex = /مركز|فريق|كادر|نحن|عياد|لدينا/g;
let output = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.match(targetRegex)) {
      output.push(`${file}:${index + 1}: ${line.trim()}`);
    }
  });
});

fs.writeFileSync('matches.txt', output.join('\n'));
console.log(`Saved ${output.length} matches to matches.txt`);
