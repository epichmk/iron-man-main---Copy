const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\PC\\Documents\\iroooooooonman\\iron-man-main\\public\\cinematic-4';
const destDir = 'c:\\Users\\PC\\Documents\\iroooooooonman\\iron-man-main\\public\\cinematic-blog';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

for (let i = 177; i <= 456; i++) {
    const srcFile = path.join(srcDir, `frame_${String(i).padStart(4, '0')}.jpg`);
    const destFile = path.join(destDir, `frame_${String(i - 176).padStart(4, '0')}.jpg`);
    try {
        fs.copyFileSync(srcFile, destFile);
    } catch (e) {
        console.error("Error copying " + srcFile);
    }
}
console.log("Done copying 280 frames!");
