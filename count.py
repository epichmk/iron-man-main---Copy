import json
d = json.load(open('graphify-out/.graphify_detect.json', encoding='utf-8-sig'))
print(f"Total files: {d['total_files']}, Total words: {d['total_words']}")
print(f"code: {len(d['files'].get('code', []))}")
print(f"doc: {len(d['files'].get('document', []))}")
print(f"paper: {len(d['files'].get('paper', []))}")
print(f"image: {len(d['files'].get('image', []))}")
print(f"video: {len(d['files'].get('video', []))}")
print(f"skipped: {len(d.get('skipped_sensitive', []))}")
