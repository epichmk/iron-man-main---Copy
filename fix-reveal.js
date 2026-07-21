const fs = require('fs');
const path = 'src/components/sections/EditorialServicePage.tsx';

let content = fs.readFileSync(path, 'utf8');

const scrollRevealComponent = `
// Reusable Continuous Scroll Reveal Component
function ScrollReveal({ children, className, direction = "up", offset = ["start 95%", "end 5%"] }: { children: React.ReactNode, className?: string, direction?: "up" | "down" | "left" | "right" | "none", offset?: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  
  const yOffset = direction === "up" ? 60 : direction === "down" ? -60 : 0;
  const xOffset = direction === "left" ? 60 : direction === "right" ? -60 : 0;
  
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [yOffset, 0, 0, -yOffset]);
  const x = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [xOffset, 0, 0, -xOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div ref={ref} style={{ opacity, y, x, scale }} className={className}>
      {children}
    </motion.div>
  );
}
`;

if (!content.includes('function ScrollReveal')) {
  content = content.replace(/(import { getWhatsAppLink } from "@\/lib\/whatsappMessages";)/, '$1\\n' + scrollRevealComponent);
}

// We have things like:
// <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-10 relative">
//   [children]
// </motion.div>

function replaceMotionDivs(text) {
  const regex = /<motion\.div[^>]*initial=\{\{\s*opacity:\s*0,\s*[xy]:\s*\d+\s*\}\}[^>]*whileInView=\{\{\s*opacity:\s*1,\s*[xy]:\s*0\s*\}\}[^>]*className=({[^}]+}|"[^"]+")[^>]*>([\s\S]*?)<\/motion\.div>/g;
  
  return text.replace(regex, (match, className, inner) => {
    // Some motion.divs inside might be caught? No, JS regex is greedy but we use [\s\S]*? which is lazy.
    // Wait, if there are nested motion.divs, [\s\S]*? will stop at the FIRST </motion.div>, which will break the HTML!
    // We cannot reliably parse nested HTML with Regex if there are nested motion.divs!
    return match; // return original for now
  });
}

// Instead of parsing HTML, let's just use `whileInView` as a marker and replace the opening and closing tags manually.
// Actually, I can just replace the opening tags that have `whileInView` with `<ScrollReveal>`
// AND then find the matching closing tag? No, it's easier to write a small tokenizer or use the fact that they are not nested!
// Are there any nested `motion.div`s with `whileInView`?
// Looking at EditorialServicePage:
// 1. Stats wrapper: <motion.div flex flex-col> -> inside map: <motion.div flex flex-col items-start>
// So they ARE nested! (Wait, the outer is opacity/y, the inner is opacity/y).

// Actually, is `ScrollReveal` what they meant?
// "what happened to the reveal animations? why do you always do your edits and remove animations while doing so? now i have to waste my time asking you to bring back the reveal animations claude made for me."
