import fs from 'fs';
import path from 'path';

const blogDataPath = path.join(process.cwd(), 'src', 'lib', 'blogData.ts');
let content = fs.readFileSync(blogDataPath, 'utf8');

const posts = content.split('content: `');

for (let i = 1; i < posts.length; i++) {
  let html = posts[i];
  
  // Add drop-cap
  html = html.replace('<p>', '<p className="drop-cap">');
  
  // Add pull-quote to second paragraph
  let count = 0;
  html = html.replace(/<p>/g, (match) => {
    count++;
    if (count === 2) return '<blockquote className="pull-quote">';
    return match;
  });
  
  let closeCount = 0;
  html = html.replace(/<\/p>/g, (match) => {
    closeCount++;
    if (closeCount === 2) return '</blockquote>';
    return match;
  });

  posts[i] = html;
}

const finalContent = posts.join('content: `');
fs.writeFileSync(blogDataPath, finalContent, 'utf8');

console.log('Blog data successfully supercharged!');
