const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function generateCards(basePath, category) {
  const dirPath = path.join(publicDir, basePath);
  let cards = [];
  
  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);
    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
        walk(itemPath);
      } else {
        const relativePath = '/' + path.relative(publicDir, itemPath).replace(/\\/g, '/');
        // generate a title from folder name
        const folderName = path.basename(path.dirname(itemPath));
        cards.push({
          category,
          title: folderName,
          image: relativePath
        });
      }
    }
  }
  
  if (fs.existsSync(dirPath)) {
    walk(dirPath);
  }
  return cards;
}

const facilityCards = generateCards('facility-images', 'facilities');
const workshopCards = generateCards('workshops-conferences', 'workshops');

const allCards = [...facilityCards, ...workshopCards];

console.log(JSON.stringify(allCards, null, 2));
