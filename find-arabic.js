const fs = require('fs');

const files = [
  'src/lib/blogData.ts',
  'src/lib/servicesData.json'
];

const regexes = [
  /مركز/g,
  /فريق/g,
  /كادر/g,
  /نحن/g,
  /عياد/g,
  /لدينا/g,
  /خبرائن/g
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\nChecking ${file} for target phrases:`);
  regexes.forEach(regex => {
    const matches = content.match(regex);
    if (matches) {
      console.log(`Matched ${regex}: ${matches.length} times`);
    }
  });
});
