import json
import codecs

with codecs.open('src/lib/servicesData.json', 'r', 'utf-8') as f:
    data = json.load(f)

for item in data:
    print(item['id'] + " : " + item['title'])
