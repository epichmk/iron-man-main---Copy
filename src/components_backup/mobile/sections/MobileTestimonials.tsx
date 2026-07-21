"use client";

import React from "react";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";

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

export function MobileTestimonials() {
  return (
    <section className="relative w-full h-screen snap-start overflow-hidden bg-[#000814]" dir="rtl">
      {/* Background Video */}
      <video
        src="/success-stories-video.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,4,10,0.6)_70%,rgba(0,4,10,1)_100%)]" />

      {/* Global Title */}
      <div className="absolute top-16 inset-x-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none">
        <div className="rounded-full px-5 py-1.5 uppercase text-[10px] tracking-[0.2em] font-medium text-white/60 mb-4 inline-block backdrop-blur-md shadow-[0_0_30px_rgba(192,232,22,0.1)] border border-white/10">
          قصص النجاح
        </div>
        <h3 className="font-heading text-4xl font-black text-white dark:drop-shadow-[0_10px_40px_rgba(0,0,0,1)] mb-3">
          حملوا أحلامهم إلينا،<br/>وعادوا بأطفالهم
        </h3>
        <p className="font-sans text-[13px] text-zinc-300 tracking-wide font-medium max-w-[280px] dark:drop-shadow-md leading-relaxed">
          آلاف العائلات استعادت الأمل. هنا تكمن قصصهم.
        </p>
      </div>

      <div className="absolute inset-0 z-10 pt-40 pb-20 px-4 overflow-hidden flex justify-center gap-4">
        {/* We divide the testimonials into 2 columns for a mobile masonry marquee */}
        {[0, 1].map((colIndex) => {
          const colItems = massiveTestimonials.filter((_, i) => i % 2 === colIndex);
          return (
            <div 
              key={colIndex} 
              className={`flex flex-col gap-4 w-1/2 overflow-hidden`}
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <motion.div 
                className="flex flex-col gap-4"
                animate={{ y: colIndex === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {[...colItems, ...colItems].map((t, idx) => (
                  <div
                    key={idx}
                    className="w-full p-6 rounded-3xl bg-black/60 border border-white/10 border-t-white/20 flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
                  >
                    <div className="flex justify-center gap-1.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          weight="fill" 
                          className="text-[#c0e816] animate-pulse" 
                          style={{ animationDelay: `${i * 0.4}s` }}
                        />
                      ))}
                    </div>
                    <p className="font-heading text-white/90 text-[13px] leading-snug font-medium text-center">
                      "{t.text}"
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Fade Overlays */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#000814] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#000814] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
