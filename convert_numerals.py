import json
import re

def convert_arabic_numerals(text):
    if not isinstance(text, str):
        return text
    
    arabic_to_western = {
        '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
        '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
        '٪': '%'
    }
    
    for ar, w in arabic_to_western.items():
        text = text.replace(ar, w)
        
    return text

def traverse_and_convert(data):
    if isinstance(data, dict):
        return {k: traverse_and_convert(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [traverse_and_convert(item) for item in data]
    elif isinstance(data, str):
        return convert_arabic_numerals(data)
    else:
        return data

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        new_data = traverse_and_convert(data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, ensure_ascii=False, indent=2)
        print(f"Processed {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

process_file('src/lib/servicesData.json')
process_file('src/lib/servicesData_hidden.json')
