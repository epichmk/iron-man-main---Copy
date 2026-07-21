import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix S2 Journey Columns to be beautifully centered and balanced instead of right-aligned
content = content.replace(
'''              <AnimatedItem
                key={i}
              >
                <span className="font-mono text-sm md:text-base font-bold tracking-widest tracking-wider uppercase block mb-3" style={{ color: col.color }}>{col.num}</span>
                <h3 className="text-2xl font-black text-white mb-4" style={{ color: col.color }}>{col.title}</h3>
                <p className="text-blue-100 leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px] text-balance text-right">{col.body}</p>
              </AnimatedItem>''',
'''              <AnimatedItem
                key={i}
                className="flex flex-col items-center text-center"
              >
                <span className="font-mono text-sm md:text-base font-bold tracking-widest uppercase block mb-3" style={{ color: col.color }}>{col.num}</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ color: col.color }}>{col.title}</h3>
                <p className="text-blue-100 leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px] text-balance">{col.body}</p>
              </AnimatedItem>'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("S2 Journey Columns perfectly centered and balanced!")
