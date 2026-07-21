const fs = require('fs');
let data = fs.readFileSync('src/lib/blogData.ts', 'utf8');

// Replace exact author strings
data = data.split('author: "د. نجاة الملس"').join('author: "فريق التحرير الطبي"');

// Replace any occurrence in text where it says written by dr najat
data = data.split('بقلم: د. نجاة الملس').join('بقلم: فريق التحرير الطبي');

// Remove the phrase 'في مركز د. نجاة الملس'
data = data.split('في مركز د. نجاة الملس').join('');

fs.writeFileSync('src/lib/blogData.ts', data);
console.log("Done");
