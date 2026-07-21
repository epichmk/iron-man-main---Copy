import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Force text-right to override any inherited justify
content = content.replace(
'''<p className="text-blue-100 leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px] text-balance">{col.body}</p>''',
'''<p className="text-blue-100 leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px] text-balance text-right">{col.body}</p>'''
)

content = content.replace(
'''<p className="text-white font-bold text-xl md:text-2xl leading-snug tracking-tight max-w-2xl transition-colors duration-500 text-balance">{t.description}</p>''',
'''<p className="text-white font-bold text-xl md:text-2xl leading-snug tracking-tight max-w-2xl transition-colors duration-500 text-balance text-right">{t.description}</p>'''
)

content = content.replace(
'''<p className="text-blue-200 leading-snug font-light text-lg md:text-xl tracking-tight max-w-2xl group-hover:text-blue-100 transition-colors duration-500 text-balance">{step.description}</p>''',
'''<p className="text-blue-200 leading-snug font-light text-lg md:text-xl tracking-tight max-w-2xl group-hover:text-blue-100 transition-colors duration-500 text-balance text-right">{step.description}</p>'''
)

content = content.replace(
'''<h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight max-w-2xl group-hover:text-white transition-colors duration-500 text-balance">{b.value}</h3>''',
'''<h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight max-w-2xl group-hover:text-white transition-colors duration-500 text-balance text-right">{b.value}</h3>'''
)

content = content.replace(
'''<p className="pb-6 text-blue-200 text-lg md:text-xl leading-snug tracking-tight max-w-3xl font-light text-balance">{q.a}</p>''',
'''<p className="pb-6 text-blue-200 text-lg md:text-xl leading-snug tracking-tight max-w-3xl font-light text-balance text-right">{q.a}</p>'''
)

# S7 Deep Tech Mobile Fix (turn off justify on mobile)
content = content.replace(
'''<AnimatedSection className="columns-1 md:columns-2 gap-10 text-justify space-y-8 md:space-y-0">''',
'''<AnimatedSection className="columns-1 md:columns-2 gap-10 text-right md:text-justify space-y-8 md:space-y-0">'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Forced text-right and removed mobile justify!")
