export const WA_PHONE = "+967781878443";

export const WA_MESSAGES = {
  general: "مرحباً مركز د. نجاة الملس، أود الاستفسار عن خدماتكم وحجز استشارة.",
  drNajat: "مرحباً، أود حجز موعد استشارة مع الدكتورة نجاة الملس من فضلكم.",
  service: (serviceTitle: string) => `مرحباً مركز د. نجاة الملس، أود الاستفسار وحجز موعد بخصوص خدمة: ${serviceTitle}.`,
  blog: (articleTitle: string) => `مرحباً، قرأت مقالكم المميز بعنوان "${articleTitle}" وأود الاستفسار أكثر وحجز موعد.`,
  contact: "مرحباً مركز د. نجاة الملس، أود حجز موعد في أقرب وقت متاح."
};

export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${WA_PHONE.replace("+", "")}?text=${encodeURIComponent(message)}`;
};
