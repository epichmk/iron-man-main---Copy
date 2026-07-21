import os
import shutil
import json

src_dir = r"C:\Users\PC\Documents\iroooooooonman\nmc\nmc services  خدمات المركز"
dest_dir = r"C:\Users\PC\Documents\iroooooooonman\iron-man-main\public\services"
json_path = r"C:\Users\PC\Documents\iroooooooonman\iron-man-main\src\lib\servicesData.json"

mapping = {
    "التشخيص والعلاج بإستخدام جــراحة المناظير.jpg": "laparoscopy",
    "الحقن الداخلي  IUI.jpg": "iui",
    "السونار التجميلي.jpg": "cosmetic-ultrasound",
    "العيادة الإستشارية لأمراض النساء والتوليد.jpg": "obgyn-clinic",
    "المـســـاعـدة علـى الـــــــحـمـل بإستخدام الأدوية المنشـطة والمحــــفزة عـــلى التبــــويض.jpg": "ovulation-stimulation",
    "تـــحديد جـــنــس الــــجـنـيــــن.jpg": "gender-selection",
    "علاج أمراض الذكورة والعقم عند الرجال.jpg": "male-infertility",
    "وحدة الحقن المجهري بأحدث جـــهـاز لـــيـزر IX73-IMSI.jpg": "ix73-icsi-imsi",
    "وحــــــــدة تــجــمـــيد الأجـــنـة والـبويضات والحيوانات المنـويـة.jpg": "freezing-unit"
}

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for f in os.listdir(src_dir):
    if f in mapping:
        service_id = mapping[f]
        dest_filename = f"{service_id}_squared.jpg"
        
        # Copy image
        shutil.copy(os.path.join(src_dir, f), os.path.join(dest_dir, dest_filename))
        
        # Update json
        for s in data:
            if s['id'] == service_id:
                s['image'] = f"/services/{dest_filename}"
                break

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Images copied and JSON updated.")
