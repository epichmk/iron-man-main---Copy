const fs = require('fs');
const iconv = require('iconv-lite');

const files = [
    "src/components/sections/AiEngine.tsx",
    "src/components/sections/ContactCTASection.tsx",
    "src/components/sections/DiagnosticsDashboard.tsx",
    "src/components/sections/FeaturedServicesGrid.tsx",
    "src/components/sections/Footer.tsx",
    "src/components/sections/GlobalNetwork.tsx",
    "src/components/sections/ProtocolTimeline.tsx",
    "src/components/sections/ServicesCinematicReveal.tsx",
    "src/components/sections/TheCoreFacility.tsx",
    "src/components/ui/AnimatedSection.tsx",
    "src/components/ui/EyebrowBadge.tsx",
    "src/components/sections/SystemsNominal.tsx",
    "src/components/sections/SecurityShield.tsx",
    "src/components/sections/CinematicFeedbackGallery.tsx"
];

for (const file of files) {
  if (fs.existsSync(file)) {
    const corruptedString = fs.readFileSync(file, 'utf8');

    let content = corruptedString;
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }

    const originalUtf8Bytes = iconv.encode(content, 'win1256');
    const restoredString = originalUtf8Bytes.toString('utf8');
    
    fs.writeFileSync(file, restoredString, 'utf8');
    console.log(`Restored ${file}`);
  }
}
