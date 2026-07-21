const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Try to find the else block inside handleIndex
  // Usually looks like:
  // } else {
  //   resetState();
  // }
  
  const regex = /} else {\s+(reset[A-Za-z0-g]*\(\);)\s+}/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, '} else {\n        setTimeout(() => $1, 1000);\n      }');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file} (resetState)`);
  } else {
    // For MediaGalleryCinematic
    const regexMedia = /} else {\s+gsap.to\(".media-content", \{ opacity: 0, duration: 0.5 \}\);\s+swiperInstance\?\.autoplay\.stop\(\);\s+}/g;
    if (regexMedia.test(content)) {
      content = content.replace(regexMedia, '} else {\n        setTimeout(() => {\n          gsap.to(".media-content", { opacity: 0, duration: 0.5 });\n          swiperInstance?.autoplay.stop();\n        }, 1000);\n      }');
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${file} (MediaGalleryCinematic)`);
    } else {
        console.log(`No match found in ${file}`);
    }
  }
}
