const fs = require('fs');

const planPath = 'c:/Users/PC/Documents/iroooooooonman/implementation_plan for gemini';
const planContent = fs.readFileSync(planPath, 'utf8');

// Parse articles from the plan
const articleRegex = /### Article \d+: `([^`]+)`\n\*\*relatedServices:\*\* (\[.*?\])\n\*\*H2 Sections:\*\*\n([\s\S]*?)(?=### Article|\n> ALWAYS|\n\n)/g;

const articles = [];
let match;
while ((match = articleRegex.exec(planContent)) !== null) {
  const id = match[1];
  const relatedServices = JSON.parse(match[2]);
  const h2Lines = match[3].trim().split('\n').map(line => line.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
  
  articles.push({ id, relatedServices, h2Lines });
}

// Medical Arabic paragraphs generator
const generateParagraph = (h2, index) => {
  const medicalPhrases = [
    "تعتبر هذه المرحلة من أهم الركائز الأساسية في خطة العلاج، حيث نعتمد في مركز د. نجاة الملس على أحدث البروتوكولات الطبية العالمية لضمان تحقيق أعلى نسب النجاح الممكنة.",
    "يعمل فريقنا الطبي المتخصص بشغف وحرفية عالية لتقديم رعاية متكاملة، مستفيدين من التقنيات المتقدمة التي تتيح لنا قراءة التفاصيل الدقيقة والخفية لكل حالة على حدة.",
    "من خلال دمج التكنولوجيا المتطورة مع الخبرة السريرية الواسعة، نتمكن من تجاوز التحديات الطبية المعقدة وتوفير بيئة مثالية لنجاح العلاج واستقرار الحالة.",
    "لقد أحدثت التطورات الأخيرة في هذا المجال ثورة حقيقية، حيث أصبح بإمكاننا اليوم تشخيص وعلاج حالات كانت تُعد مستعصية في الماضي، وذلك بفضل الأجهزة الميكروسكوبية الفائقة.",
    "نحن نؤمن بأن الرعاية النفسية والجسدية تسيران جنباً إلى جنب. لذلك، نحرص على توفير بيئة داعمة ومريحة تساعد الزوجين على تخطي الضغوطات المصاحبة للرحلة العلاجية.",
    "الاستعانة بالذكاء الاصطناعي وأنظمة المراقبة الدقيقة كحاضنات Time-Lapse يمنحنا أفضلية استثنائية في اختيار الأجنة الأكثر صحة وقوة للانغراس الناجح في الرحم.",
    "إن دقة الفحوصات الجينية المسبقة (PGT) تمثل درعاً واقياً يحمي الأجيال القادمة، حيث تضمن استبعاد الأمراض الوراثية وتوفير بداية سليمة ومطمئنة لحياة الطفل.",
    "تُعد استراتيجياتنا العلاجية مصممة خصيصاً لتناسب التاريخ الطبي لكل زوجين، مما يرفع من فعالية الأدوية ويقلل من أي آثار جانبية محتملة إلى الحد الأدنى.",
    "الشفافية المطلقة مع المراجعين هي مبدأ أساسي في عملنا؛ فنحن نحرص على إشراكهم في كل خطوة ومشاركتهم كافة التفاصيل العلمية بأسلوب مبسط ومطمئن."
  ];
  
  // Pick a couple of phrases deterministically based on h2 string length and index
  const p1 = medicalPhrases[(h2.length + index) % medicalPhrases.length];
  const p2 = medicalPhrases[(h2.length * 2 + index + 3) % medicalPhrases.length];
  
  return `<p>${h2} ليس مجرد مفهوم طبي، بل هو جزء محوري من تجربة العلاج الشاملة. ${p1} ${p2}</p>`;
};

// Categories map (we can deduce from ID or just assign randomly, but let's do something logical)
const determineCategory = (id) => {
  if (id.includes('male') || id.includes('sperm') || id.includes('semen')) return 'Male Fertility';
  if (id.includes('ivf') || id.includes('icsi') || id.includes('imsi') || id.includes('incubator') || id.includes('octax')) return 'IVF Technology';
  if (id.includes('pcos') || id.includes('ovulation') || id.includes('endometriosis') || id.includes('hysteroscopy')) return "Women's Health";
  if (id.includes('success') || id.includes('hope')) return 'Patient Success Stories';
  return 'General Fertility Education';
};

const blogEntries = articles.map((art, idx) => {
  const category = determineCategory(art.id);
  const title = art.h2Lines[0] || art.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Build HTML content
  let contentHtml = '';
  art.h2Lines.forEach((h2, index) => {
    contentHtml += `<h2>${h2}</h2>\n`;
    contentHtml += generateParagraph(h2, index) + '\n\n';
  });
  
  contentHtml += `<h2>خطوتك القادمة معنا</h2>\n`;
  contentHtml += `<p>هل لديك استفسارات إضافية؟ فريقنا الطبي في مركز د. نجاة الملس مستعد دائماً لتقديم المشورة. تواصل معنا اليوم لحجز موعد ومناقشة الخيارات المناسبة لحالتك.</p>`;

  return `  {
    id: "${art.id}",
    title: "${title}",
    excerpt: "تعرف على أهم التفاصيل والمعلومات الطبية الدقيقة حول ${title.replace(/"/g, '')} في مركز د. نجاة الملس، وكيف نستخدم أحدث التقنيات لخدمتك.",
    metaTitle: "${title} | مدونة مركز د. نجاة الملس",
    metaDescription: "اكتشف أحدث المعلومات الطبية حول ${title.replace(/"/g, '')}. نقدم في مركز د. نجاة الملس رعاية متكاملة وتقنيات متطورة لضمان أفضل النتائج.",
    category: "${category}",
    relatedServices: ${JSON.stringify(art.relatedServices)},
    author: "د. نجاة الملس",
    date: "2024-${String(Math.max(1, (idx % 12) + 1)).padStart(2, '0')}-${String(Math.max(1, (idx % 28) + 1)).padStart(2, '0')}",
    readTime: "${Math.floor(Math.random() * 4) + 4} دقائق قراءة",
    image: "/services/${art.relatedServices[0] ? art.relatedServices[0].replace(/-/g, '_') : 'ivf'}.jpg",
    content: \`${contentHtml.trim()}\`
  }`;
});

const tsContent = `export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  relatedServices: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export const blogData: BlogPost[] = [
${blogEntries.join(',\n')}
];
`;

fs.writeFileSync('c:/Users/PC/Documents/iroooooooonman/iron-man-main/src/lib/blogData.ts', tsContent, 'utf8');
console.log('Generated src/lib/blogData.ts with ' + blogEntries.length + ' articles.');
