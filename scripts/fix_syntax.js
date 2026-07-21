const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Fix the syntax error: setTimeout(() => resetState();, 1000); -> setTimeout(() => { resetState(); }, 1000);
  const regex = /setTimeout\(\(\) => (reset[A-Za-z0-g]*\(\));, 1000\);/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, 'setTimeout(() => { $1; }, 1000);');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed syntax in ${file}`);
  }
}
