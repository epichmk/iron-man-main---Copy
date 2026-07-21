import json
import codecs

translations = {
    'male-infertility': 'Male Infertility',
    'ix73-icsi-imsi': 'IX73 IMSI System',
    'cosmetic-ultrasound': 'Cosmetic Ultrasound',
    'freezing-unit': 'Freezing Unit',
    'gender-selection': 'Gender Selection',
    'iui': 'IUI',
    'laparoscopy': 'Laparoscopy',
    'obgyn-clinic': 'OB/GYN Clinic',
    'ovulation-stimulation': 'Ovulation Stimulation'
}

with codecs.open('src/lib/servicesData.json', 'r', 'utf-8') as f:
    data = json.load(f)

for item in data:
    if item['id'] in translations:
        item['title'] = translations[item['id']]

with codecs.open('src/lib/servicesData.json', 'w', 'utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Titles translated successfully!")
