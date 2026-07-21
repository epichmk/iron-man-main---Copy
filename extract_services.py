import json

data = json.load(open('src/lib/servicesData.json', encoding='utf-8'))
andrology = next(s for s in data if s['id'] == 'andrology')
male_infertility = next(s for s in data if s['id'] == 'male-infertility')

with open('merge_input.json', 'w', encoding='utf-8') as f:
    json.dump({'andrology': andrology, 'male-infertility': male_infertility}, f, ensure_ascii=False, indent=2)
