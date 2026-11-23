import { promotions } from "../data/promotions.js";

export const FREE_DELIVERY_MIN = 150000;
export const FREE_DELIVERY_MAX_KM = 10;
export const MAX_KM = 40;

export const money = (n) => `${Math.round(n).toLocaleString("en-US")}₮`;

const toNum = ([m, d]) => m * 100 + d;

// Огноо урамшууллын хугацаанд орж байгаа эсэх (жил дамждаг хугацааг дэмжинэ)
export function isActive(promo, date = new Date()) {
  const today = (date.getMonth() + 1) * 100 + date.getDate();
  const s = toNum(promo.start);
  const e = toNum(promo.end);
  return s <= e ? today >= s && today <= e : today >= s || today <= e;
}

export function getActivePromos(date = new Date()) {
  return promotions.filter((p) => isActive(p, date));
}

// Бүтээгдэхүүнд хамаарах хамгийн их хөнгөлөлт (%)
export function getDiscountPercent(product, date = new Date()) {
  return getActivePromos(date)
    .filter(
      (p) =>
        p.categories.includes("all") ||
        p.categories.includes(product.category) ||
        p.id === product.holiday // баярын чимэглэл нь зөвхөн тухайн баярын урамшуулалд хамрагдана
    )
    .reduce((max, p) => Math.max(max, p.discount), 0);
}

export const basePrice = (product) => product.material + product.labor;

export function finalPrice(product, date = new Date()) {
  const pct = getDiscountPercent(product, date);
  return Math.round((basePrice(product) * (100 - pct)) / 100);
}

export const GIFT_WRAP_FEE = 3000;
export const EXPRESS_RATE = 0.5; // түргэн хүргэлт = энгийн төлбөрийн +50%
export const EXPRESS_MAX_KM = 15;

// Хүргэлтийн тарифын зурвасууд (хүснэгт харуулахад хэрэглэнэ)
export const bands = [
  { from: 0, to: 3, key: "zone1" },
  { from: 3, to: 15, key: "zone2" },
  { from: 15, to: 40, key: "zone3" },
];

// Хөгжүүлэгчийн үнэлгээ: студиос дүүргийн төв хүртэлх ойролцоо зай (км)
export const districts = [
  { id: "sukh", km: 2, name: { mn: "Сүхбаатар", en: "Sukhbaatar" } },
  { id: "chin", km: 4, name: { mn: "Чингэлтэй", en: "Chingeltei" } },
  { id: "bayng", km: 6, name: { mn: "Баянгол", en: "Bayangol" } },
  { id: "bayz", km: 8, name: { mn: "Баянзүрх", en: "Bayanzurkh" } },
  { id: "khan", km: 9, name: { mn: "Хан-Уул", en: "Khan-Uul" } },
  { id: "song", km: 13, name: { mn: "Сонгинохайрхан", en: "Songinokhairkhan" } },
  { id: "nal", km: 35, name: { mn: "Налайх", en: "Nalaikh" } },
];

// Хүргэлтийн тариф: 0-3км 3000₮, 3-15км +1000₮/км, 15-40км +1500₮/км
export function deliveryFee(km, orderTotal, { express = false } = {}) {
  if (!Number.isFinite(km) || km < 0) return { ok: false, fee: 0, free: false };
  if (km > MAX_KM) return { ok: false, tooFar: true, fee: 0, free: false };

  const fee = Math.round(
    3000 + Math.max(0, Math.min(km, 15) - 3) * 1000 + Math.max(0, km - 15) * 1500
  );
  const free = orderTotal >= FREE_DELIVERY_MIN && km <= FREE_DELIVERY_MAX_KM;

  const expressAvailable = km <= EXPRESS_MAX_KM;
  const expressFee = express && expressAvailable ? Math.round(fee * EXPRESS_RATE) : 0;

  // Үнэгүй хүргэлтэд хүрэхэд дутах дүн
  const missing = km <= FREE_DELIVERY_MAX_KM ? Math.max(0, FREE_DELIVERY_MIN - orderTotal) : null;

  const band = km <= 3 ? 0 : km <= 15 ? 1 : 2;
  const eta = km <= 10 ? "etaStd1" : "etaStd2";

  return { ok: true, fee, free, expressAvailable, expressFee, missing, band, eta };
}
