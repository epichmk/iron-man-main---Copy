import json
data = json.load(open('src/lib/servicesData.json', encoding='utf-8'))
for s in data:
    if s['id'] in ['andrology', 'male-infertility']:
        print(f"ID: {s['id']}")
        print(f"Title: {s['title']}")
        print(f"Image: {s['image']}")
        print("-" * 20)
