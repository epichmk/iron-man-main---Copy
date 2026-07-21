import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace #00E5FF (case insensitive) with #0066FF
    new_content = re.sub(r'#00E5FF', '#0066FF', content, flags=re.IGNORECASE)
    
    # Replace rgba(0,229,255, ...) with rgba(0,102,255, ...)
    new_content = re.sub(r'0,229,255', '0,102,255', new_content)
    
    # Replace cyan- with blue-
    new_content = re.sub(r'cyan-', 'blue-', new_content)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.json')):
            replace_in_file(os.path.join(root, file))

print("Cyan removal complete!")
