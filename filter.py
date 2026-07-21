import json
import re

d = json.load(open('graphify-out/.graphify_detect.json', encoding='utf-8-sig'))

new_images = []
for p in d['files'].get('image', []):
    if 'cinematic-' not in p:
        new_images.append(p)

d['files']['image'] = new_images

# recount
total_files = sum(len(v) for v in d['files'].values())
d['total_files'] = total_files

with open('graphify-out/.graphify_detect.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False)

print(f"Filtered images. New total files: {total_files}")
