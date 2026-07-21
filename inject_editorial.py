import json

file_path = 'src/lib/servicesData.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

editorial_data = {
    "eyebrow": "PRECISION OVARIAN STIMULATION",
    "heroTitleLine1": "بروتوكولات",
    "heroTitleHighlight1": " دقيقة",
    "heroTitleLine2": "لتنشيط",
    "heroTitleHighlight2": " الإباضة",
    "subtitle": "نعتمد أحدث بروتوكولات التنشيط الهرموني الدقيقة لتحفيز المبيضين بشكل آمن ومدروس، مما يرفع من جودة البويضات ويزيد من فرص الحمل بنجاح.",
    "quote": "ليس الهدف هو استخراج عدد كبير من البويضات، بل الهدف هو استخراج بويضات ذات جودة عالية قادرة على تكوين أجنة سليمة. الجودة دائماً تسبق الكمية.",
    "quoteHighlight": "الجودة دائماً تسبق الكمية.",
    "journeyColumns": [
        {
            "num": "01",
            "title": "التقييم الهرموني",
            "color": "#ffffff",
            "body": "تحليل دقيق للمخزون المبيضي والهرمونات الأساسية لتحديد البروتوكول الأنسب لحالتك."
        },
        {
            "num": "02",
            "title": "التحفيز الموجه",
            "color": "#D4FF00",
            "body": "إعطاء الأدوية الهرمونية بجرعات دقيقة ومخصصة لضمان استجابة مبيضية مثالية."
        },
        {
            "num": "03",
            "title": "المتابعة بالسونار",
            "color": "#ffffff",
            "body": "مراقبة مستمرة لتطور الحويصلات ونموها لتحديد الموعد الدقيق للخطوة التالية."
        }
    ],
    "deepTechTitle": "دقة التنشيط: المعيار الذهبي",
    "deepTechDesc": "تختلف كل استجابة مبيضية من امرأة لأخرى، ولذلك نعتمد على بروتوكولات مخصصة بالكامل تضمن أعلى معايير الأمان والفاعلية.",
    "deepTechParagraphs": [
        "تعتمد بروتوكولاتنا في مركز النخبة الطبي على التقييم الدقيق لمخزون المبيض (AMH) والعمر والتاريخ الطبي. نستخدم أحدث الأدوية الهرمونية لضمان تحفيز متوازن يقلل من خطر متلازمة فرط التنشيط (OHSS) ويزيد من إنتاج بويضات ناضجة وعالية الجودة.",
        "تتم مراقبة الاستجابة بشكل دقيق ومستمر عبر السونار المتقدم والتحاليل الهرمونية الدورية (E2/LH) لضبط الجرعات في الوقت الفعلي، مما يضمن أفضل النتائج بأعلى معايير الأمان الممكنة للمريضة."
    ],
    "faqSubtitle": "الأسئلة الشائعة حول تنشيط الإباضة",
    "faqQuestions": [
        {
            "q": "هل الأدوية المنشطة تسبب زيادة الوزن؟",
            "a": "قد تسبب بعض الأدوية احتباساً بسيطاً ومؤقتاً للسوائل يزول بعد انتهاء الدورة، لكنها لا تسبب زيادة حقيقية في دهون الجسم. نتابع الحالة لضمان راحة المريضة."
        },
        {
            "q": "ما هو خطر متلازمة فرط التنشيط (OHSS)؟",
            "a": "بفضل بروتوكولاتنا الدقيقة والمتابعة المستمرة، نقوم بتقليل هذا الخطر إلى أدنى حد ممكن، مع اتخاذ تدابير استباقية صارمة عند وجود أي مؤشرات."
        }
    ]
}

# Update the specific service
updated = False
for service in data:
    if service.get("id") == "ovulation-stimulation":
        service["editorial"] = editorial_data
        updated = True
        break

if updated:
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Successfully added editorial data to ovulation-stimulation.")
else:
    print("Could not find ovulation-stimulation service in the data.")
