import re

with open('src/components/sections/EditorialServicePage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove text-justify from short descriptions
content = content.replace(
'''<p className="text-blue-100 text-justify leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px]">{col.body}</p>''',
'''<p className="text-blue-100 leading-snug font-light text-lg md:text-xl tracking-tight max-w-[400px] text-balance">{col.body}</p>'''
)

content = content.replace(
'''<p className="text-white font-bold text-xl md:text-2xl leading-snug text-justify tracking-tight max-w-2xl transition-colors duration-500">{t.description}</p>''',
'''<p className="text-white font-bold text-xl md:text-2xl leading-snug tracking-tight max-w-2xl transition-colors duration-500 text-balance">{t.description}</p>'''
)

content = content.replace(
'''<p className="text-blue-200 text-justify leading-snug font-light text-lg md:text-xl tracking-tight max-w-2xl group-hover:text-blue-100 transition-colors duration-500">{step.description}</p>''',
'''<p className="text-blue-200 leading-snug font-light text-lg md:text-xl tracking-tight max-w-2xl group-hover:text-blue-100 transition-colors duration-500 text-balance">{step.description}</p>'''
)

content = content.replace(
'''<h3 className="text-xl md:text-2xl font-black text-white text-justify leading-tight tracking-tight max-w-2xl group-hover:text-white transition-colors duration-500">{b.value}</h3>''',
'''<h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight max-w-2xl group-hover:text-white transition-colors duration-500 text-balance">{b.value}</h3>'''
)

content = content.replace(
'''<p className="pb-6 text-blue-200 text-lg md:text-xl text-justify leading-snug tracking-tight max-w-3xl font-light">{q.a}</p>''',
'''<p className="pb-6 text-blue-200 text-lg md:text-xl leading-snug tracking-tight max-w-3xl font-light text-balance">{q.a}</p>'''
)

with open('src/components/sections/EditorialServicePage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed text-justify stretching issues!")
