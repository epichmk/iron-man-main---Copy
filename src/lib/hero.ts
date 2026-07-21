export const FRAME_COUNT = 169;

export const framePath = (n: number) =>
  `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

export type Dialogue = {
  id: string;
  show: number;
  hide: number;
  quote: string;
  image?: string;
  speaker?: string;
  film?: string;
};

export const DIALOGUES: Dialogue[] = [
  {
    id: "d1",
    show: 0.15,
    hide: 0.35,
    quote: "حلم الأبوة والأمومة\nليس مجرد أمل، بل هو رسالة نسعى لتحقيقها بكل تفانٍ بمشيئة الله.",
    image: "/quotes/quote-1.jpg"
  },
  {
    id: "d2",
    show: 0.38,
    hide: 0.58,
    quote: "رؤية ابتسامة الوالدين\nعند احتضان طفلهما الأول هي الدافع الذي يجعلنا نستمر في العطاء.",
    image: "/quotes/quote-2.jpg"
  },
  {
    id: "d3",
    show: 0.61,
    hide: 0.78,
    quote: "المعايير الطبية العالمية\nالتعلم من الرواد والالتزام بأعلى المعايير الطبية هو ما يضمن جودة الخدمة وسلامة الأجنة.",
    image: "/quotes/quote-3.jpg"
  },
];

export const HERO_TEXT_FADE_END = 0.08;
