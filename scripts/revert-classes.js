import fs from 'fs';
import path from 'path';

const blogDataPath = path.join(process.cwd(), 'src', 'lib', 'blogData.ts');
let content = fs.readFileSync(blogDataPath, 'utf8');

// Revert the broken classes and HTML tags
content = content.replace(/<p class="drop-cap">/g, '<p>');
content = content.replace(/<p className="drop-cap">/g, '<p>'); // Just in case
content = content.replace(/<blockquote class="pull-quote">/g, '<p>');
content = content.replace(/<blockquote className="pull-quote">/g, '<p>');
content = content.replace(/<\/blockquote>/g, '</p>');

fs.writeFileSync(blogDataPath, content, 'utf8');

console.log('Reverted broken HTML classes!');
