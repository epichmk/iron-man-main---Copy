"use client";

import { useCallback, useEffect, useRef, useState, forwardRef } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";
import { useIsMobile } from "@/hooks/useIsMobile";

const massiveTestimonials = [
  { text: "بعد 5 سنوات من الانتظار، تحقق حلمنا هنا. شكراً من القلب." },
  { text: "الدكتور كان بمثابة ملاك رحمة. اليوم أحضن طفلي بفضل الله ثم بفضلكم." },
  { text: "لم نفقد الأمل لأنكم لم تفقدوه. تقنية الحقن المجهري غيّرت حياتنا." },
  { text: "احترافية وعناية فائقة في كل خطوة. تجربة فاقت التوقعات." },
  { text: "أفضل مركز أطفال أنابيب في المنطقة بلا منازع. شكراً لجهودكم." },
  { text: "عناية طبية راقية واهتمام نفسي ساعدنا على تجاوز أصعب المراحل." },
  { text: "اليوم سمعت نبض طفلي لأول مرة. لا توجد كلمات تصف سعادتي." },
  { text: "التشخيص الدقيق كان المفتاح. شكراً لخبرتكم العظيمة." },
  { text: "رحلة طويلة تكللت بالنجاح. المركز يتميز بأحدث التقنيات العالمية." },
  { text: "بعد تجارب فاشلة عديدة، وجدنا الحل هنا. أنصح الجميع بهذا المركز." },
  { text: "رعاية لا مثيل لها. الدعم الطبي يشعرك بأنك بين عائلتك." },
  { text: "بفضل الله ثم خبرتكم، اكتملت عائلتنا بعد 8 سنوات من الحرمان." },
  { text: "المختبرات هنا متطورة جداً، وهذا ما صنع الفارق في حالتنا." },
  { text: "الشفافية والمصداقية منذ اليوم الأول. شكراً على كل شيء." },
  { text: "لم أتوقع أن تكون الإجراءات بهذه السهولة. رعاية طبية من الطراز الأول." },
  { text: "طفلتي الآن بين يدي. شكراً لكل طبيب وممرض في هذا الصرح العظيم." },
  { text: "تفاصيل دقيقة وعناية فائقة. أنتم الأفضل في مجال الخصوبة." },
  { text: "بعد اليأس، أشرقت شمس الأمل. المركز يوفر أحدث تقنيات تجميد الأجنة." },
  { text: "تجربة مليئة بالراحة النفسية والمهنية العالية. أنتم رواد هذا المجال." },
  { text: "علاج العقم يتطلب صبراً، ومعكم كان الصبر جميلاً والنهاية أجمل." },
  { text: "احترافية لا تضاهى. التقنيات المستخدمة تضاهي أكبر المراكز العالمية." },
  { text: "دعم طبي متكامل يعمل بقلب واحد من أجل نجاح كل حالة." },
  { text: "الأمل ليس مجرد كلمة هنا، بل هو واقع نعيشه كل يوم." },
  { text: "شكراً على الدعم المستمر حتى بعد تحقق الحمل. أنتم عائلتنا الثانية." },
  { text: "أفضل قرار اتخذناه كان اللجوء إلى مركزكم. شكراً بحجم السماء." },
  { text: "النجاح من أول محاولة بفضل الدقة المتناهية في التشخيص والعلاج." },
  { text: "مرافق عالمية ورعاية طبية تفوق الخيال. تجربة استثنائية." },
  { text: "بعد سنوات من الدموع، اليوم نبكي فرحاً. شكراً لكم." },
  { text: "كل خطوة كانت محسوبة بدقة. العناية بالمرضى هنا لا تُقدّر بثمن." },
  { text: "لا مستحيل مع العلم والإرادة. أنتم جسّدتم هذا الشعار." },
  { text: "أحدث التقنيات وأفضل الكوادر الطبية. النتيجة كانت طفلنا الجميل." },
  { text: "الصدق والأمانة في التعامل. أنصح كل زوجين يواجهان صعوبة في الإنجاب بزيارتكم." },
  { text: "رحلة العلاج كانت مريحة بفضل طاقم التمريض الرائع والأطباء المتميزين." },
  { text: "لن ننسى فضلكم ما حيينا. أنتم أعدتم البسمة إلى وجوهنا." },
  { text: "مركز متكامل يقدم خدمات طبية بمستوى عالمي. شكراً من القلب." },
];

const col1Items = [...massiveTestimonials.slice(0, 8)];
const col2Items = [...massiveTestimonials.slice(4, 12)];
const col3Items = [...massiveTestimonials.slice(8, 16)];
const col4Items = [...massiveTestimonials.slice(12, 20)];
const col5Items = [...massiveTestimonials.slice(16, 24)];
const col6Items = [...massiveTestimonials.slice(20, 28)];
const col7Items = [...massiveTestimonials.slice(24, 32)];

const TestimonialCard = forwardRef<HTMLDivElement, { text: string }>(({ text }, ref) => {
  return (
    <div 
      ref={ref}
      className="w-full px-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(1.5rem,3vw,2.5rem)] rounded-3xl bg-black/60  border-t-white/20 flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.6)]" dir="rtl"
    >
      <div className="flex justify-center gap-2.5 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            weight="fill" 
            className="text-[#c0e816] dynamic-star" 
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-heading text-white/80 text-[clamp(1.1rem,1.5vw,1.3rem)] leading-snug font-medium text-center"
      >
        "{text}"
      </motion.p>
    </div>
  );
});
TestimonialCard.displayName = "TestimonialCard";

export function CinematicTestimonials() {
  // Removed canvas logic
  const isMobile = useIsMobile();
  const noAnim = isMobile;
  const sectionRef = useRef<HTMLElement | null>(null);
  
  const titleContainerRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef(false);
  const entryProgressRef = useRef(0);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const col3Ref = useRef<HTMLDivElement | null>(null);
  const col4Ref = useRef<HTMLDivElement | null>(null);
  const col5Ref = useRef<HTMLDivElement | null>(null);
  const col6Ref = useRef<HTMLDivElement | null>(null);
  const col7Ref = useRef<HTMLDivElement | null>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
        
        if (rect.top <= 0) {
          targetProgressRef.current = Math.min(1, Math.max(0, -rect.top / scrollable));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Intersection Observer for Entry Animation
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) {
        entryProgressRef.current = 0; // Reset animation when scrolled out
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    const renderLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.1;
      const progress = currentProgressRef.current;

      // Removed drawFrame call

      // Entry Physics
      if (inViewRef.current) {
        entryProgressRef.current = Math.min(1, entryProgressRef.current + 0.02); // Reaches 1 in ~50 frames
      }
      const rawEntry = entryProgressRef.current;
      const entryEased = rawEntry === 1 ? 1 : 1 - Math.pow(2, -10 * rawEntry); // Expo ease out

      // Split-HUD Parallax & Scatter Physics removed in favor of CSS/Framer Motion

      // Parallax 7 Columns Logic
      const distUp = progress * -2000;
      const distDown = -2000 + progress * 2000;
      
      // Cinematic Entrance Physics
      let gridOpacity = 1;
      let gridBlur = 0;
      
      if (progress < 0.1) {
        gridOpacity = progress / 0.1;
      }
      
      const targetScale = 2.5 - (progress * 1.5); // Zooms out from 2.5 to 1.0
      
      if (gridContainerRef.current) {
        gridContainerRef.current.style.transform = `scale(${targetScale}) translateZ(0)`;
        gridContainerRef.current.style.opacity = String(gridOpacity * 0.75); // Peak opacity is 0.75
      }
      
      if (col1Ref.current) col1Ref.current.style.transform = `translateY(${distUp}px)`;
      if (col2Ref.current) col2Ref.current.style.transform = `translateY(${distDown}px)`;
      if (col3Ref.current) col3Ref.current.style.transform = `translateY(${distUp}px)`;
      if (col4Ref.current) col4Ref.current.style.transform = `translateY(${distDown}px)`;
      if (col5Ref.current) col5Ref.current.style.transform = `translateY(${distUp}px)`;
      if (col6Ref.current) col6Ref.current.style.transform = `translateY(${distDown}px)`;
      if (col7Ref.current) col7Ref.current.style.transform = `translateY(${distUp}px)`;

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);



  return (
    <section ref={sectionRef} id="cinematic-testimonials" className="scroll-animation relative bg-black" style={{ height: "400vh" }}>
      <style>
        {`
          @keyframes dynamicTwinkle {
            0% { transform: rotate(0deg) scale(0.9); opacity: 0.7; }
            50% { transform: rotate(180deg) scale(1.2); opacity: 1; filter: drop-shadow(0 0 10px #c0e816); }
            100% { transform: rotate(360deg) scale(0.9); opacity: 0.7; }
          }
          .dynamic-star {
            animation: dynamicTwinkle 4s linear infinite;
          }
        `}
      </style>
      <div
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden bg-black flex flex-col justify-center"
        style={{ height: "100dvh", willChange: "transform", transform: "translateZ(0)" }}
      >
        <LazyVideo
          src="/success-stories-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Heavy Vignette for Pitch Black Edges */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

        {/* Deep Space Vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-30 w-full h-full flex flex-col justify-center items-center py-[8vh]">
        {/* Split-HUD Architecture */}
        <div className="absolute z-50 top-0 left-0 w-full h-full pointer-events-none flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24" style={{ perspective: "1500px" }}>
          
          {/* Right Side (RTL Start) - Title */}
          <motion.div 
            initial={noAnim ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: "-10%" }}
            className="w-full md:max-w-[45%] text-right mb-8 md:mb-0 will-change-transform" 
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className=" rounded-full px-5 py-1.5 uppercase text-xs tracking-[0.2em] font-medium text-white/60 mb-6 inline-block backdrop-blur-md shadow-[0_0_30px_rgba(192,232,22,0.1)]">
              قصص النجاح
            </div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-[4rem] font-bold text-white dark:drop-shadow-2xl leading-tight">
              حملوا أحلامهم إلينا،<br/>وعادوا بأطفالهم
            </h2>
          </motion.div>

          {/* Left Side (RTL End) - Description */}
          <motion.div 
            initial={noAnim ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -100, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: "-10%" }}
            className="w-full md:max-w-[35%] will-change-transform"
          >
            <div className="bg-[#000814]/60 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem]  shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c0e816] blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
              <p className="font-sans text-zinc-300 text-base md:text-lg dark:drop-shadow-md font-medium leading-relaxed relative z-10">
                آلاف العائلات استعادت الأمل. هنا تكمن قصصهم.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Fader connecting next section */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black via-black/60 to-transparent z-40 pointer-events-none" />

          {/* Diagonal Parallax Grid (7 Columns) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex justify-center items-center">
            {/* The tilted, scaling canvas */}
            <div 
              ref={gridContainerRef}
              className="w-[300vw] h-[300vh] flex justify-center gap-6 -rotate-[8deg] will-change-transform"
            >
              
              {/* Column 1 (Moves UP) */}
              <div ref={col1Ref} className="flex-1 flex flex-col gap-4 md:gap-6 pt-[50px] md:pt-[100px] will-change-transform">
                {col1Items.map((t, i) => (
                  <TestimonialCard key={`col1-${i}`} text={t.text} />
                ))}
              </div>

              {/* Column 2 (Moves DOWN) */}
              <div ref={col2Ref} className="flex-1 flex flex-col gap-4 md:gap-6 pt-[0px] md:pt-[400px] will-change-transform">
                {col2Items.map((t, i) => (
                  <TestimonialCard key={`col2-${i}`} text={t.text} />
                ))}
              </div>

              {/* Column 3 (Moves UP) */}
              <div ref={col3Ref} className="hidden md:flex flex-1 flex-col gap-4 md:gap-6 pt-[200px] will-change-transform">
                {col3Items.map((t, i) => (
                  <TestimonialCard key={`col3-${i}`} text={t.text} />
                ))}
              </div>

              {/* Column 4 (Moves DOWN) */}
              <div ref={col4Ref} className="hidden md:flex flex-1 flex-col gap-4 md:gap-6 will-change-transform">
                {col4Items.map((t, i) => (
                  <TestimonialCard key={`col4-${i}`} text={t.text} />
                ))}
              </div>

              {/* Column 5 (Moves UP) */}
              <div ref={col5Ref} className="hidden md:flex flex-1 flex-col gap-4 md:gap-6 pt-[300px] will-change-transform">
                {col5Items.map((t, i) => (
                  <TestimonialCard key={`col5-${i}`} text={t.text} />
                ))}
              </div>

              {/* Column 6 (Moves DOWN) */}
              <div ref={col6Ref} className="hidden md:flex flex-1 flex-col gap-4 md:gap-6 pt-[200px] will-change-transform">
                {col6Items.map((t, i) => (
                  <TestimonialCard key={`col6-${i}`} text={t.text} />
                ))}
              </div>

              {/* Column 7 (Moves UP) */}
              <div ref={col7Ref} className="hidden md:flex flex-1 flex-col gap-4 md:gap-6 pt-[500px] will-change-transform">
                {col7Items.map((t, i) => (
                  <TestimonialCard key={`col7-${i}`} text={t.text} />
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Removed loading overlay */}
      </div>
    </section>
  );
}


