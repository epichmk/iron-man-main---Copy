import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the image block completely from its current spot
pattern_image = r'\s*<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*scale:\s*0\.9\s*\}\}\s*whileInView=\{\{\s*opacity:\s*1,\s*scale:\s*1\s*\}\}.*?w-\[100vw\].*?</motion\.div>'

match_img = re.search(pattern_image, content, flags=re.DOTALL)
if match_img:
    img_str = match_img.group(0)
    
    # We remove it
    content = content.replace(img_str, "")
    
    # Fix the flex container
    content = content.replace('<div className="flex flex-col items-center justify-center gap-16 mb-8 md:mb-24">', '<div className="mb-8 md:mb-16 w-full">')
    
    journey_marker = '{/* 3-column emotional journey'
    
    insertion_point = content.find(journey_marker)
    
    if insertion_point != -1:
        fresh_img = '''</div>

          {/* Full Bleed Image Unconstrained */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative aspect-[4/5] md:aspect-[21/9] rounded-none overflow-hidden bg-transparent flex-shrink-0"
          >
            <Image src={service.image} alt={service.title} fill className="object-cover" />
          </motion.div>

          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10">
            {/* 3-column emotional journey'''
            
        content = content.replace(journey_marker, fresh_img)
        
        with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print("True Full Bleed Applied!")
    else:
        print("Could not find journey marker.")
else:
    print("Could not find image block.")
