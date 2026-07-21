import json
from collections import Counter
from pathlib import Path

d = json.load(open('graphify-out/.graphify_detect.json', encoding='utf-8-sig'))
dirs = Counter()
for ftype, paths in d['files'].items():
    for p in paths:
        dirs[Path(p).parent.name] += 1

for dir, count in dirs.most_common(5):
    print(f"{dir}: {count} files")
