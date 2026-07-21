const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));

let totalReplaced = 0;

files.forEach(file => {
  const filePath = path.join(sectionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove blur() from filter strings
  let newContent = content.replace(/blur\([^)]*\)\s*/g, '');
  
  // Cleanup empty filters like filter: "" or filter: ''
  // If preceded by a comma:
  newContent = newContent.replace(/,\s*filter:\s*["']["']/g, '');
  // If followed by a comma, or just standing alone:
  newContent = newContent.replace(/filter:\s*["']["']\s*,?\s*/g, '');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    totalReplaced++;
    console.log('Cleaned up: ' + file);
  }
});

console.log('Total files modified: ' + totalReplaced);
