import json

# Load main data
with open('src/lib/servicesData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Identify the ones to hide
hide_ids = ['octax', 'incubators']
hidden_services = [s for s in data if s['id'] in hide_ids]
active_services = [s for s in data if s['id'] not in hide_ids]

# Save hidden ones to a backup file
try:
    with open('src/lib/servicesData_hidden.json', 'r', encoding='utf-8') as f:
        existing_hidden = json.load(f)
except FileNotFoundError:
    existing_hidden = []

# Merge without duplicates
for hs in hidden_services:
    if not any(e['id'] == hs['id'] for e in existing_hidden):
        existing_hidden.append(hs)

with open('src/lib/servicesData_hidden.json', 'w', encoding='utf-8') as f:
    json.dump(existing_hidden, f, ensure_ascii=False, indent=2)

# Save active ones back to main data
with open('src/lib/servicesData.json', 'w', encoding='utf-8') as f:
    json.dump(active_services, f, ensure_ascii=False, indent=2)

print(f"Hid {len(hidden_services)} services. Active services left: {len(active_services)}")
