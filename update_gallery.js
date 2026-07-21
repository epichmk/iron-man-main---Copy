const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/sections/MediaGalleryCinematic.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace ALBUMS
content = content.replace(
  /const ALBUMS = \[[\s\S]*?\];/,
  `const ALBUMS = [
  { id: "all", label: "الكل" },
  { id: "facilities", label: "المرافق" },
  { id: "workshops", label: "مؤتمرات وورش عمل" },
  { id: "tour", label: "جولة المركز" },
  { id: "management", label: "الإدارة" },
];`
);

// New Cards
const newCards = [
  { id: "c1", category: "facilities", title: "مختبر الأجنة المتطور", image: "/services/incubators.jpg" },
  { id: "c2", category: "tour", title: "صالة الاستقبال الرئيسية", image: "/hero-banner/0040.jpg" },
  { id: "c3", category: "management", title: "الإدارة الطبية المتميزة", image: "/dr-najat/0001.jpg" },
  { id: "c4", category: "facilities", title: "غرف العمليات الذكية", image: "/services/laparoscopy.jpg" },
  { id: "c5", category: "tour", title: "أحدث التقنيات", image: "/hero-banner/0100.jpg" },
  { id: "c6", category: "facilities", title: "الفحص الدقيق", image: "/services/octax.jpg" },
  
  // Facilities
  { id: "f1", category: "facilities", title: "غرفة الفحص", image: "/facility-images/check up room/398A2601.JPG" },
  { id: "f2", category: "facilities", title: "غرفة الفحص", image: "/facility-images/check up room/398A2798.JPG" },
  { id: "f3", category: "facilities", title: "وحدة التجميد", image: "/facility-images/freezing-unit/freezing samples unit (1).JPG" },
  { id: "f4", category: "facilities", title: "وحدة التجميد", image: "/facility-images/freezing-unit/freezing samples unit (2).JPG" },
  { id: "f5", category: "facilities", title: "وحدة التجميد", image: "/facility-images/freezing-unit/freezing samples unit (3).JPG" },
  { id: "f6", category: "facilities", title: "المختبر", image: "/facility-images/lab/the lab (1).JPG" },
  { id: "f7", category: "facilities", title: "المختبر", image: "/facility-images/lab/the lab (2).JPG" },
  { id: "f8", category: "facilities", title: "المختبر", image: "/facility-images/lab/the lab (3).JPG" },
  { id: "f9", category: "facilities", title: "المختبر", image: "/facility-images/lab/the lab (4).JPG" },
  { id: "f10", category: "facilities", title: "المختبر", image: "/facility-images/lab/the lab (5).JPG" },
  { id: "f11", category: "facilities", title: "المختبر", image: "/facility-images/lab/the lab (6).JPG" },
  { id: "f12", category: "facilities", title: "غرفة العمليات", image: "/facility-images/operation-room/operation room 2.JPG" },
  { id: "f13", category: "facilities", title: "غرفة العمليات", image: "/facility-images/operation-room/operation room.JPG" },
  { id: "f14", category: "facilities", title: "الاستقبال", image: "/facility-images/reception/reception (1).JPG" },
  { id: "f15", category: "facilities", title: "الاستقبال", image: "/facility-images/reception/reception (2).JPG" },
  { id: "f16", category: "facilities", title: "الاستقبال", image: "/facility-images/reception/reception album cover.JPG" },
  { id: "f17", category: "facilities", title: "غرفة الإفاقة", image: "/facility-images/recovery-room/recovery room.JPG" },
  
  // Workshops
  { id: "w1", category: "workshops", title: "المؤتمر الرابع لديرماس - مصر 2024", image: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (1).jpg" },
  { id: "w2", category: "workshops", title: "المؤتمر الرابع لديرماس - مصر 2024", image: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (2).jpg" },
  { id: "w3", category: "workshops", title: "المؤتمر الرابع لديرماس - مصر 2024", image: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (3).jpg" },
  { id: "w4", category: "workshops", title: "المؤتمر الرابع لديرماس - مصر 2024", image: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (4).jpg" },
  { id: "w5", category: "workshops", title: "المؤتمر الرابع لديرماس - مصر 2024", image: "/workshops-conferences/4th dirmas conference - egypt 2024/4th dirmas conference, cairo, Egypt, 2024 (5).jpg" },
  { id: "w6", category: "workshops", title: "مؤتمر الحديدة - 2026", image: "/workshops-conferences/hodaidah conference- 2026/hodaidah_conference (1).jpg" },
  { id: "w7", category: "workshops", title: "مؤتمر الحديدة - 2026", image: "/workshops-conferences/hodaidah conference- 2026/hodaidah_conference (2).jpg" },
  { id: "w8", category: "workshops", title: "مؤتمر الحديدة - 2026", image: "/workshops-conferences/hodaidah conference- 2026/hodaidah_conference (3).jpg" },
  { id: "w9", category: "workshops", title: "مؤتمر الحديدة - 2026", image: "/workshops-conferences/hodaidah conference- 2026/hodaidah_conference (4).jpg" }
];

content = content.replace(
  /const CARDS = \[[\s\S]*?\];/,
  "const CARDS = " + JSON.stringify(newCards, null, 2) + ";"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated MediaGalleryCinematic.tsx');
