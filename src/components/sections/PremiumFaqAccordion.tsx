"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "@phosphor-icons/react";

const faqData = [
  {
    category: "GENERAL",
    label: "معلومات عامة",
    items: [
      { q: "ما الفرق بين الحقن المجهري IVF والحقن المجهري ICSI؟", a: "في أطفال الأنابيب (IVF) العادي، تترك الحيوانات المنوية مع البويضة في طبق لتخصيبها طبيعياً. أما في الحقن المجهري (ICSI)، يتم اختيار حيوان منوي واحد وحقنه مباشرة داخل البويضة لضمان الإخصاب." },
      { q: "كم تستغرق دورة العلاج الكاملة من البداية للنهاية؟", a: "تستغرق الدورة عادة حوالي 4 إلى 6 أسابيع من بداية الاستشارة وتنشيط المبايض حتى موعد إجراء فحص الحمل." },
      { q: "ما نسبة نجاح أطفال الأنابيب لدى مركزنا؟", a: "بفضل استخدامنا لأحدث التقنيات مثل IMSI وفحص الجينات PGT، تتجاوز نسب النجاح لدينا المعدلات العالمية وتصل لأكثر من 65% للحالات المناسبة." },
      { q: "هل الإجراء مؤلم؟ وما مستوى عدم الراحة المتوقع؟", a: "الإجراءات غير مؤلمة في الغالب. سحب البويضات يتم تحت تخدير خفيف، ونقل الأجنة يشبه فحص مسحة عنق الرحم العادي ولا يحتاج تخدير." },
      { q: "كم مرة يجب أن أتردد على المركز خلال دورة العلاج؟", a: "ستحتاجين لزيارة المركز حوالي 5-7 مرات للمتابعة بالسونار خلال فترة التنشيط، بالإضافة ليوم السحب ويوم نقل الأجنة." }
    ]
  },
  {
    category: "TECHNOLOGY",
    label: "التقنيات الطبية",
    items: [
      { q: "ما الفرق بين ICSI وIMSI وكيف يساعدني مجهر IX73؟", a: "مجهر IX73 يتيح تكبير الحيوان المنوي حتى 6000 مرة (تقنية IMSI) مقارنة بـ 400 مرة في ICSI العادي، مما يمكننا من اختيار الحيوانات المنوية السليمة تماماً من التشوهات." },
      { q: "ما هي تقنية Time-Lapse وكيف تحسن نتائجي؟", a: "هي حاضنات ذكية مزودة بكاميرات تراقب تطور الجنين على مدار الساعة دون إخراجه من بيئته، مما يساعدنا في اختيار أفضل الأجنة للزرع." },
      { q: "هل تقنية التزجيج آمنة تماماً للبويضات والأجنة؟", a: "نعم، التزجيج (Vitrification) هو أحدث طرق التجميد السريع التي تمنع تكون بلورات ثلجية، ونسبة نجاة الأجنة بعد فك التجميد تفوق 95%." },
      { q: "ما هو فحص PGT-A وPGT-M وهل أحتاجه؟", a: "PGT هو فحص للكروموسومات قبل نقل الجنين للرحم. يوصى به لحالات الإجهاض المتكرر، تقدم عمر الزوجة، أو وجود أمراض وراثية في العائلة." },
      { q: "كيف يساعد ليزر OCTAX في تحسين نسب الانغراس؟", a: "نستخدم الليزر لإجراء 'ثقب جدار الجنين' (Assisted Hatching) بدقة متناهية، مما يسهل خروج الجنين وانغراسه في بطانة الرحم." }
    ]
  },
  {
    category: "PATIENT GUIDANCE",
    label: "إرشادات المرضى",
    items: [
      { q: "ما العمر المثالي لبدء علاج أطفال الأنابيب؟", a: "كلما كان التدخل مبكراً كانت النتائج أفضل، وتحديداً قبل سن الـ 35، لكننا نحقق نجاحات ممتازة حتى سن 42 عاماً بفضل البروتوكولات المخصصة." },
      { q: "هل يمكنني إجراء العلاج وأنا أعمل؟", a: "نعم بالتأكيد، نحن نجدول المواعيد بمرونة، ولن تحتاجي لأخذ إجازة سوى يوم سحب البويضات ويوم نقل الأجنة." },
      { q: "ما الذي يجب تجنبه قبل الإجراء بـ 3 أشهر؟", a: "ننصح بالابتعاد عن التدخين، الكافيين المفرط، التوتر، والأطعمة المصنعة، مع الالتزام بالمكملات الغذائية الموصوفة." },
      { q: "كيف أستعد نفسياً وجسدياً لرحلة أطفال الأنابيب؟", a: "نوفر برامج دعم متكاملة تشمل التغذية السريرية والوخز بالإبر والدعم النفسي لتهيئة الجسم بأفضل شكل." },
      { q: "هل يقبل المركز المرضى من خارج اليمن؟", a: "نعم، نستقبل مئات الحالات من الخارج ونوفر خدمة تنسيق طبي متكاملة تشمل الاستشارات عن بعد قبل السفر." }
    ]
  },
  {
    category: "LOGISTICS",
    label: "الحجوزات والتكاليف",
    items: [
      { q: "كيف يتم حجز الاستشارة الأولى؟", a: "يمكنك الحجز عبر التواصل على رقم الواتساب المخصص أو عبر الهاتف، وسيقوم فريق الاستقبال بتنسيق الموعد الأنسب لك." },
      { q: "ما تكلفة برامج العلاج وهل يوجد دفع بالتقسيط؟", a: "تختلف التكلفة حسب التقنيات المطلوبة (مثل PGT). نقدم باقات شاملة واضحة بدون تكاليف خفية، ويمكن مناقشة خطط الدفع." },
      { q: "ما عدد المحاولات المُنصح بها قبل تغيير البروتوكول؟", a: "في حال عدم النجاح، نقوم بدراسة الحالة بدقة قبل الدورة التالية، وتغيير البروتوكول فوراً إذا لزم الأمر." },
      { q: "هل يمكن تجميد الأجنة لاستخدامها في محاولة لاحقة؟", a: "بالتأكيد، وهو خيار نوصي به بقوة حيث يتيح لك محاولات إضافية بتكلفة أقل وبدون الحاجة لإعادة تنشيط المبايض." }
    ]
  },
  {
    category: "POST-TREATMENT",
    label: "بعد العلاج",
    items: [
      { q: "متى يُجرى اختبار الحمل بعد نقل الأجنة؟", a: "يجرى فحص الدم الرقمي للحمل (B-hCG) بعد 12 إلى 14 يوماً من يوم نقل الأجنة." },
      { q: "ما علامات نجاح عملية نقل الأجنة؟", a: "لا توجد علامات مؤكدة سوى الفحص الرقمي، بعض النساء يشعرن بمغص خفيف أو نزول قطرات دم بسيطة (نزيف الانغراس)." },
      { q: "هل الحمل بعد ICSI مختلف عن الحمل الطبيعي؟", a: "بمجرد حدوث الحمل، لا يوجد أي فرق بينه وبين الحمل الطبيعي، والمتابعة تتم بشكل اعتيادي." },
      { q: "ما مدة تجميد الأجنة المسموح بها؟", a: "يمكن تجميد الأجنة لسنوات طويلة (أكثر من 10 سنوات) مع الحفاظ على نفس جودتها وقدرتها على الانغراس بفضل تقنية التزجيج." }
    ]
  }
];

export function PremiumFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleOpen = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="w-full relative py-24 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
        
        {/* Left Column (Sticky Heading) */}
        <motion.div 
          initial={{ opacity: 0, rotateY: 30, y: 100 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:w-1/3 [perspective:2000px]"
        >
          <div className="sticky top-32">
            <span className="text-accent font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 block">/ FAQ</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] leading-tight mb-4 md:mb-6 dark:drop-shadow-2xl">الأسئلة<br/>الشائعة</h2>
            <p className="text-[var(--text-tertiary)] font-sans text-sm md:text-lg text-justify [text-justify:kashida]">كل ما تحتاج لمعرفته حول رحلة العلاج والتقنيات المستخدمة في مركزنا.</p>
          </div>
        </motion.div>

        {/* Right Column (Accordion) */}
        <div className="md:w-2/3 flex flex-col gap-12 [perspective:2000px]">
          {faqData.map((section, sIdx) => (
            <motion.div 
              key={sIdx} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-2"
            >
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ opacity: 0, letterSpacing: "1em", y: 20 }}
                  whileInView={{ opacity: 0.8, letterSpacing: "0.1em", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-[#0066FF] text-xs md:text-sm uppercase mb-4" 
                  dir="ltr"
                >
                  {section.category} // {section.label}
                </motion.h3>
              </div>
              
              <div className="flex flex-col">
                {section.items.map((faq, fIdx) => {
                  const id = `${sIdx}-${fIdx}`;
                  const isOpen = openIndex === id;

                  return (
                    <motion.div 
                      key={id} 
                      initial={{ opacity: 0, y: 80, rotateX: -20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, delay: fIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`group relative transition-colors duration-500 overflow-hidden ${isOpen ? 'bg-[var(--surface-elevated)]' : 'hover:bg-[var(--surface-elevated)]'}`}
                    >
                      {/* Award-Winning Drawing Border */}
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay: fIdx * 0.1 + 0.3, ease: [0.76, 0, 0.24, 1] }}
                        className={`absolute bottom-0 right-0 w-full h-[1px] origin-right transition-colors duration-500 z-10 ${isOpen ? 'bg-accent/50' : 'bg-[var(--surface-hover)] group-hover:bg-accent/50'}`}
                      />
                      <button 
                        onClick={() => toggleOpen(id)}
                        className="w-full text-right py-4 md:py-6 px-2 md:px-4 flex items-center justify-between outline-none"
                      >
                        <h4 className={`text-base md:text-xl font-bold transition-colors duration-300 pl-4 ${isOpen ? 'text-accent' : 'text-[var(--text-primary)] group-hover:text-blue-400'}`}>
                          {faq.q}
                        </h4>
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'border-[#d4e616] bg-accent/10 text-accent' : 'border-[var(--border-medium)] text-[var(--text-tertiary)] group-hover:text-blue-400 group-hover:border-blue-400/50'}`}>
                          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                            <Plus size={14} weight="bold" className="md:w-4 md:h-4 w-3 h-3" />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <div className="px-2 md:px-4 pb-6 md:pb-8 text-[var(--text-tertiary)] text-sm md:text-base leading-relaxed md:leading-loose font-light text-justify [text-justify:kashida] w-full">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

