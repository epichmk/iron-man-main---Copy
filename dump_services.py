import json
data = json.load(open('src/lib/servicesData.json', encoding='utf-8'))
for s in data:
    print(s['id'])
