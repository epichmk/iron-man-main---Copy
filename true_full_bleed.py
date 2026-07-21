import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I need to carefully extract the motion.div containing the image, and the quote div, and reorganize them.

# 1. First, find the quote block
quote_pattern = r'(<div className="relative flex flex-col items-start text-right w-full" dir="rtl">.*?</div>\s*</div>)'
quote_match = re.search(quote_pattern, content, flags=re.DOTALL)

# 2. Second, find the image block
image_pattern = r'(<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*scale:\s*0\.9\s*\}\}.*?w-\[100vw\].*?</motion\.div>)'
image_match = re.search(image_pattern, content, flags=re.DOTALL)

if quote_match and image_match:
    quote_block = quote_match.group(0)
    image_block = image_match.group(0)
    
    # Clean up the image block classes to be perfectly full bleed
    clean_image_block = image_block.replace(
        '''w-[100vw] relative left-1/2 -translate-x-1/2 aspect-square md:aspect-[21/9] rounded-none overflow-hidden bg-transparent flex-shrink-0''',
        '''w-full relative aspect-square md:aspect-[21/9] rounded-none overflow-hidden bg-transparent flex-shrink-0'''
    )
    
    # We want to remove the image block from its current location inside the flex container
    # The flex container looks like:
    # <div className="flex flex-col items-center justify-center gap-16 mb-8 md:mb-24">
    #   [Quote Block]
    #   [Image Block]
    # </div>
    # We will replace the entire flex container with just the quote block (inside its own spacing div)
    
    container_pattern = r'<div className="flex flex-col items-center justify-center gap-16 mb-8 md:mb-24">.*?</div>\s*</div>\s*<motion\.div.*?</motion\.div>\s*</div>'
    
    # Actually it is easier to replace using string manipulation since regex can be tricky with nested divs.
    # Let's find the specific block starting from <div className="flex flex-col items-center justify-center gap-16 mb-8 md:mb-24">
    
    flex_container_start = content.find('<div className="flex flex-col items-center justify-center gap-16 mb-8 md:mb-24">')
    
    # The end of this flex container is right after the motion.div
    end_of_image = content.find('</motion.div>', flex_container_start) + len('</motion.div>')
    # Wait, the </div> for the flex container is after the motion.div
    end_of_flex = content.find('</div>', end_of_image) + len('</div>')
    
    old_block = content[flex_container_start:end_of_flex]
    
    new_block = quote_block + '\n          </div>\n\n          {/* Full Bleed Image Unconstrained */}\n          ' + clean_image_block + '\n\n          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10">'
    
    # Note: we need to close the max-w-[1400px] div before the image, and re-open it after, 
    # so the rest of S2 (like the journey/advantages) stays constrained.
    
    # The structure currently:
    # <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10">
    #   <div className="flex ...">
    #     QUOTE
    #     IMAGE
    #   </div>
    #   <AnimatedSection ...> JOURNEY </AnimatedSection>
    # </div>
    
    # Desired:
    # <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10 mb-16">
    #   QUOTE
    # </div>
    # IMAGE
    # <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10 mt-16">
    #   <AnimatedSection ...> JOURNEY </AnimatedSection>
    # </div>
    
    # Let's write a targeted replacement
    
    target_pattern = r'(<div className="max-w-\[1400px\] mx-auto px-10 md:px-20 lg:px-32 relative z-10">\s*)<div className="flex flex-col items-center justify-center gap-16 mb-8 md:mb-24">(.*?)<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*scale:\s*0\.9\s*\}\}.*?w-\[100vw\].*?</motion\.div>\s*</div>'
    
    def replacer(match):
        prelude = match.group(1)
        quote_content = match.group(2)
        
        # Get the clean image
        img = image_block.replace("w-[100vw] relative left-1/2 -translate-x-1/2", "w-full relative")
        
        return f'''{prelude}<div className="mb-8 md:mb-24 w-full">
              {quote_content}
            </div>
          </div>
          
          {img}

          <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-32 relative z-10 mt-16">'''

    new_content = re.sub(target_pattern, replacer, content, flags=re.DOTALL)
    
    if new_content != content:
        with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully broke the image out of the container for true full bleed!")
    else:
        print("Regex substitution failed. Content didn't change.")

else:
    print("Could not find quote or image blocks.")
