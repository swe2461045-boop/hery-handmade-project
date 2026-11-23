// start / end: [сар, өдөр]. Жил бүр давтагдана.
// discount: хувь, categories: хамрах ангилал (["all"] бол бүх бараа)
export const promotions = [
  { id: "tsagaan-sar", icon: "🥛", start: [1, 25], end: [2, 6], discount: 10, categories: ["earrings"],
    name: { mn: "Цагаан сарын урамшуулал", en: "Lunar New Year (Tsagaan Sar)" } },
  { id: "valentine", icon: "❤️", start: [2, 7], end: [2, 14], discount: 15, categories: ["rings"],
    name: { mn: "Үнэт зүрхний баяр (2/14)", en: "Valentine's Day (Feb 14)" } },
  { id: "women", icon: "🌷", start: [3, 1], end: [3, 8], discount: 15, categories: ["flowers"],
    name: { mn: "Эмэгтэйчүүдийн баяр (3/8)", en: "Women's Day (Mar 8)" } },
  { id: "mother-child", icon: "👩‍👧", start: [5, 25], end: [6, 1], discount: 12, categories: ["flowers", "earrings"],
    name: { mn: "Эх, хүүхдийн баяр (6/1)", en: "Mother & Children's Day (Jun 1)" } },
  { id: "naadam", icon: "🏹", start: [7, 1], end: [7, 11], discount: 10, categories: ["all"],
    name: { mn: "Наадмын урамшуулал", en: "Naadam promotion" } },
  { id: "new-year", icon: "🎄", start: [11, 20], end: [1, 5], discount: 12, categories: ["all"],
    name: { mn: "Шинэ жилийн урьдчилсан захиалга", en: "New Year pre-order" } },
];
