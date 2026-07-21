import fs from 'fs';
import path from 'path';

const blogDataPath = path.join(process.cwd(), 'src', 'lib', 'blogData.ts');
let content = fs.readFileSync(blogDataPath, 'utf8');

// Fix className to class for dangerouslySetInnerHTML
content = content.replace(/className="drop-cap"/g, 'class="drop-cap"');
content = content.replace(/className="pull-quote"/g, 'class="pull-quote"');

fs.writeFileSync(blogDataPath, content, 'utf8');

console.log('Fixed classes in blog data!');
