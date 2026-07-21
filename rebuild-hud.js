const fs = require('fs');
const file = 'src/components/sections/ServicesCinematicReveal.tsx';
const content = fs.readFileSync(file, 'utf-8');

const startIdx = content.indexOf('function IX3TechHUD({');
const endIdx = content.indexOf('export function ServicesCinematicReveal()');

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find start or end index");
  process.exit(1);
}

const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

const items = [
  { title: 'تقنية IMSI المتطورة', hex: '0xA8F1', desc: 'تكبير عالي لفحص فجوات رأس الحيوان المنوي' },
  { title: 'تباين تضاريسي (Relief-Contrast)', hex: '0xB2C9', desc: 'رؤية ثلاثية الأبعاد دقيقة للبويضات' },
  { title: 'مراقبة المغزل (Spindle Observation)', hex: '0xF4A2', desc: 'تجنب إتلاف المغزل لرفع نسب نجاح التلقيح' },
  { title: 'مانع الاهتزاز (Zero Drift)', hex: '0xE11B', desc: 'استقرار وثبات تلقائي لحماية العينات الدقيقة' },
  { title: 'أتمتة متكاملة', hex: '0xC001', desc: 'تعديل تلقائي للسطوع والتركيز لتقليل الإجهاد' },
  { title: 'بصريات UIS2 العالمية', hex: '0xD3F9', desc: 'صور عالية التباين لتقييم أدق تفاصيل الأجنة' },
  { title: 'تصميم نموذجي مفتوح', hex: '0x88B2', desc: 'مرونة كاملة في إضافة تقنيات بصرية مخصصة' },
  { title: 'انتقال آلي سلس', hex: '0xE990', desc: 'تبديل سريع للعدسات دون فقدان التركيز البصري' },
  { title: 'بيئة حرارية مستقرة', hex: '0xF00D', desc: 'حماية مثالية للبويضات من التغيرات الحرارية' },
  { title: 'دقة مايكروية (ICSI)', hex: '0x4A2C', desc: 'تحكم فائق الدقة لرفع معدلات الإخصاب بأمان' }
];

const renderItems = (prefix) => {
  return items.map((item, index) => {
    const idNum = String(index + 1).padStart(2, '0');
    const id = `${prefix}${idNum}`;
    return `              <motion.div whileHover={{ scale: 1.05, x: 15, backgroundColor: "rgba(34,211,238,0.15)", padding: "8px", borderRadius: "8px" }} className="flex flex-col items-start gap-1 w-full group relative pl-3 cursor-pointer" id="benefit-${id}">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-900/40 group-hover:bg-cyan-400 transition-colors duration-300"><div className="h-3 w-full bg-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></div>
                <div className="flex items-center justify-between w-full">
                  <span id="benefit-title-${id}" className="text-zinc-400 tracking-widest text-sm font-bold group-hover:text-cyan-300 group-hover:scale-[1.05] inline-block origin-left transition-all duration-300">${item.title}</span>
                  <span id="benefit-hex-${id}" className="text-cyan-900/60 text-[9px] font-mono group-hover:text-cyan-400/80 transition-colors duration-300">${item.hex}</span>
                </div>
                <p id="benefit-desc-${id}" className="text-[1.2rem] tracking-wider font-bold text-cyan-600 drop-shadow-[0_0_10px_rgba(34,211,238,0.1)] group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300 inline-block origin-left group-hover:scale-[1.1]">${item.desc}</p>
                <div className="flex items-center gap-1 mt-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div className="h-[2px] w-full bg-gradient-to-r from-cyan-400/80 to-transparent shadow-[0_0_8px_#22d3ee]" /><span className="text-[7px] font-mono text-cyan-400">100%</span></div>
              </motion.div>`;
  }).join('\\n\\n');
};

const hudComponent = `function IX3TechHUD({ mouseX, mouseY, velocityRotation }: { mouseX: any, mouseY: any, velocityRotation: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  
  // Drag-to-scroll state
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = e.pageY - (listRef.current?.offsetTop || 0);
    scrollTop.current = listRef.current?.scrollTop || 0;
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
    setIsHovered(false);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !listRef.current) return;
    e.preventDefault();
    const y = e.pageY - listRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5;
    listRef.current.scrollTop = scrollTop.current - walk;
  };

  useEffect(() => {
    if (isHovered) return;
    let animationFrameId: number;
    let currentScroll = listRef.current?.scrollTop || 0;
    
    const scrollStep = () => {
      if (listRef.current) {
        currentScroll += 0.5;
        const halfHeight = listRef.current.scrollHeight / 2;
        if (currentScroll >= halfHeight) {
          currentScroll = 0;
        }
        listRef.current.scrollTop = currentScroll;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };
    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <motion.div 
      className="w-full relative pr-4 lg:pr-8 ml-auto mr-2 lg:mr-8 max-w-sm"
      dir="rtl"
      style={{ z: 150, transformPerspective: 1000 }}
    >
      <div className="w-full flex flex-col items-start gap-6">
        {/* HUD Circular Element */}
        <div className="relative w-16 h-16 mb-2 hidden lg:block opacity-60">
          <motion.svg className="absolute inset-0 w-full h-full text-cyan-500/30" viewBox="0 0 100 100" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
          </motion.svg>
          <motion.svg className="absolute inset-0 w-full h-full text-cyan-400/50" viewBox="0 0 100 100" style={{ rotate: velocityRotation }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10 5 10" />
          </motion.svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span className="text-cyan-400 font-mono text-[8px] tracking-widest" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              SYS.ON
            </motion.span>
          </div>
        </div>

        {/* Outer Mask Wrapper for Performance */}
        <div 
          className="w-full relative h-[450px]"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)' }}
        >
          {/* Inner Drag-to-Scroll Container */}
          <div 
            ref={listRef}
            className="w-full h-full overflow-y-auto cursor-grab active:cursor-grabbing rounded-lg border border-cyan-500/10 bg-black/20 backdrop-blur-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-contain will-change-scroll"
            onPointerDown={handlePointerDown}
            onPointerLeave={handlePointerLeave}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onMouseEnter={() => setIsHovered(true)}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-start gap-4 w-full pt-8 pb-8 pl-4 pr-12">
              
              {/* --- LIST BLOCK 1 --- */}
              <div id="benefits-loop-1" className="flex flex-col items-start gap-4 w-full">
${renderItems('0')}
              </div>

              {/* --- LOOP BREAK DIVIDER --- */}
              <div className="w-full flex items-center justify-center py-8 opacity-40">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-500" />
                <span className="mx-4 text-cyan-400 text-[10px] tracking-widest font-mono">SYS.LOOP.RESTART</span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-500" />
              </div>
              
              {/* --- LIST BLOCK 2 --- */}
              <div id="benefits-loop-2" className="flex flex-col items-start gap-4 w-full">
${renderItems('1')}
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

`;

fs.writeFileSync(file, before + hudComponent + after);
console.log("Successfully rebuilt IX3TechHUD!");
