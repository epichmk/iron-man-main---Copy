const fs = require('fs');
const path = require('path');

const files = [
  'CinematicBlog.tsx',
  'CinematicFeedbackGallery.tsx',
  'CinematicTestimonials.tsx',
  'ContactCTASection.tsx',
  'DrNajatCinematic.tsx',
  'HeroCinematic.tsx',
  'MediaGalleryCinematic.tsx',
  'ServicesScene1Intro.tsx',
  'ServicesScene2Carousel.tsx',
  'StaffShowcase.tsx',
  'SystemsNominal.tsx'
];

files.forEach(file => {
  const filePath = path.join('C:/Users/PC/Documents/iroooooooonman/iron-man-main/src/components/sections', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  const pattern = /const handleIndex = \(e: Event\) => \{[\s\S]*?return \(\) => window\.removeEventListener\("sectionIndexChanged", handleIndex\);/m;
  
  const replacement = `let isFullPage = false;
    const handleIndex = (e: Event) => {
      isFullPage = true;
      const customEvent = e as CustomEvent;
      const mySection = containerRef.current?.closest('main > div');
      if (mySection && mySection.parentElement) {
        const myIndex = Array.from(mySection.parentElement.children).indexOf(mySection);
        if (customEvent.detail.index === myIndex) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      }
    };

    window.addEventListener("sectionIndexChanged", handleIndex);

    const observer = new IntersectionObserver((entries) => {
      if (isFullPage) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playEntrance();
        } else {
          setTimeout(() => { resetState(); }, 1000);
        }
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("sectionIndexChanged", handleIndex);
      observer.disconnect();
    };`;

  if (content.match(pattern)) {
    content = content.replace(pattern, replacement);
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', file);
  } else {
    // Try a more lenient pattern if some files have different formatting
    const loosePattern = /const handleIndex = \(e: Event\) => \{[\s\S]*?window\.addEventListener\("sectionIndexChanged", handleIndex\);\s*return \(\) => .*?window\.removeEventListener\("sectionIndexChanged", handleIndex\);/m;
    if (content.match(loosePattern)) {
      content = content.replace(loosePattern, replacement);
      fs.writeFileSync(filePath, content);
      console.log('Fixed loose:', file);
    } else {
      console.log('Pattern not found in:', file);
    }
  }
});
