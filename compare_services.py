import json

data = json.load(open('src/lib/servicesData.json', encoding='utf-8'))
andrology = next(s for s in data if s['id'] == 'andrology')
male_infertility = next(s for s in data if s['id'] == 'male-infertility')

def print_service(s):
    print(f"=== {s['id']} ===")
    print(f"Title: {s.get('title')}")
    print(f"Desc: {s.get('description')}")
    print(f"Detailed: {s.get('detailedInfo')}")
    print(f"Featured: {s.get('featured')}")
    print(f"Benefits: {len(s.get('benefits', []))} items")
    print(f"Stats: {len(s.get('stats', []))} items")
    print(f"Client Journey: {len(s.get('clientJourney', []))} items")
    if 'editorial' in s:
        print(f"Editorial: Yes (Hero Title: {s['editorial'].get('heroTitleLine1')} {s['editorial'].get('heroTitleHighlight1')})")
    print()

print_service(andrology)
print_service(male_infertility)
