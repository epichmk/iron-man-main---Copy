import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Hero Title
content = content.replace(
'''          {/* Title — massive, editorial */}
          <motion.h1
            initial={{ opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.25rem] sm:text-5xl md:text-[clamp(3rem,5vw,4.5rem)] font-black text-white leading-[1.2] md:leading-[1.1] tracking-tight mb-6 md:mb-8 max-w-[800px]"
          >''',
'''          {/* Title — massive, editorial */}
          <motion.h1
            initial={{ opacity: 0, y: 80, filter: "blur(10px)", rotateX: -10 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: "1000px" }}
            className="text-[2.25rem] sm:text-5xl md:text-[clamp(3rem,5vw,4.5rem)] font-black text-white leading-[1.2] md:leading-[1.1] tracking-tight mb-6 md:mb-8 max-w-[800px]"
          >'''
)

# 2. Hero Subtitle
content = content.replace(
'''          {/* Subtitle ONLY */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">''',
'''          {/* Subtitle ONLY */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} 
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
          >'''
)

# 3. Stats Strip (use AnimatedSection)
content = re.sub(
r'''            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
              \{service\.stats\.map\(\(s: \{value: string; label: string\}, i: number\) => \{
                const hasArabic = /\[\\u0600-\\u06FF\]/\.test\(s\.value\);
                return \(
                  <motion\.div 
                    key=\{i\} 
                    initial=\{\{ opacity: 0, y: 20 \}\} 
                    whileInView=\{\{ opacity: 1, y: 0 \}\} 
                    viewport=\{\{ once: true \}\}
                    transition=\{\{ delay: i \* 0\.1, duration: 0\.6 \}\} 
                    className="flex flex-col items-start border-r-0 md:border-r border-white/10 pr-0 md:pr-6"
                  >''',
'''            <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
              {service.stats.map((s: {value: string; label: string}, i: number) => {
                const hasArabic = /[\u0600-\u06FF]/.test(s.value);
                return (
                  <AnimatedItem 
                    key={i} 
                    className="flex flex-col items-start border-r-0 md:border-r border-white/10 pr-0 md:pr-6"
                  >''', content
)
content = content.replace(
'''                  </motion.div>
                );
              })}
            </div>''',
'''                  </AnimatedItem>
                );
              })}
            </AnimatedSection>'''
)

# 4. The Couple's Story Quote
content = content.replace(
'''            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full"
            >''',
'''            <motion.div
              initial={{ opacity: 0, y: 80, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full"
            >'''
)

# 5. The Number Zoom
content = content.replace(
'''        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >''',
'''        <motion.div
          initial={{ opacity: 0, scale: 0.4, filter: "blur(30px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >'''
)

# 6. S4 Technology Div
content = content.replace(
'''            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-10">''',
'''            <motion.div initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-10">'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Animation updates applied to EditorialServicePage.tsx")
