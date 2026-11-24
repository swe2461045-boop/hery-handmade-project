import { t, toggleLanguage } from "../i18n/i18n.js";

const links = [
  { href: "#/home", icon: "🏠", key: "nav.home" },
  { href: "#/products", icon: "💍", key: "nav.products" },
  { href: "#/search", icon: "🔍", key: "nav.search" },
  { href: "#/delivery", icon: "🚚", key: "nav.delivery" },
  { href: "#/promotions", icon: "🎁", key: "nav.promotions" },
  { href: "#/contact", icon: "✉️", key: "nav.contact" },
];

export function renderNavbar() {
  const items = links
    .map(
      (l) => `
        <a class="app-nav-link" href="${l.href}">
          <span class="app-nav-icon" aria-hidden="true">${l.icon}</span>
          <span>${t(l.key)}</span>
        </a>`
    )
    .join("");

  return `
    <header class="app-navbar app-sticky app-shadow">
      <nav class="app-navbar-inner" role="navigation" aria-label="main navigation">
        <a class="app-logo" href="#/home">
          <img src="./img/logo.svg" alt="logo" />
          <span class="app-logo-text">
            <strong>${t("nav.brand")}</strong>
            <small>${t("nav.tagline")}</small>
          </span>
        </a>

        <button class="app-burger" aria-expanded="false" aria-controls="topNavbar" aria-label="menu">
          <span></span><span></span><span></span>
        </button>

        <div class="app-nav-menu" id="topNavbar">
          <div class="app-nav-links">${items}</div>
          <a class="app-lang" href="#" id="langToggle">${t("nav.language")}</a>
        </div>
      </nav>
    </header>
  `;
}

export function initNavbar() {
  const burger = document.querySelector(".app-burger");
  const menu = document.getElementById("topNavbar");
  const languageToggle = document.getElementById("langToggle");
  if (!burger || !menu) return;

  const setOpen = (open) => {
    burger.classList.toggle("is-active", open);
    menu.classList.toggle("is-active", open);
    burger.setAttribute("aria-expanded", String(open));
  };

  burger.addEventListener("click", () => setOpen(!menu.classList.contains("is-active")));

  menu.querySelectorAll(".app-nav-link").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  languageToggle?.addEventListener("click", (event) => {
    event.preventDefault();
    toggleLanguage();
    window.location.reload();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setOpen(false);
  });
}

export function mountNavbar(root) {
  if (!root) return;
  root.innerHTML = renderNavbar();
  initNavbar();
}
