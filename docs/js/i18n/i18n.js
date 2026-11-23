import { translations } from "./translations.js";

const DEFAULT_LANGUAGE = "mn";

export function getCurrentLanguage() {
  return localStorage.getItem("hery-language") || DEFAULT_LANGUAGE;
}

export function setLanguage(language) {
  localStorage.setItem("hery-language", language);
}

// t("nav.home") → "Нүүр" эсвэл "Home"
export function t(path) {
  const keys = path.split(".");
  let value = translations[getCurrentLanguage()];

  for (const key of keys) {
    value = value?.[key];
  }
  return value ?? path;
}

// {mn: "...", en: "..."} хэлбэртэй өгөгдлөөс одоогийн хэлийг сонгоно
export function tr(obj) {
  return obj?.[getCurrentLanguage()] ?? obj?.mn ?? "";
}

export function toggleLanguage() {
  const next = getCurrentLanguage() === "mn" ? "en" : "mn";
  setLanguage(next);
  return next;
}
