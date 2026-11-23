import { t, tr } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { getActivePromos } from "../utils/pricing.js";

export function renderHomePage() {
  const app = document.getElementById("app");
  const active = getActivePromos();

  const promoBanner = active.length
    ? active
        .map(
          (p) => `
      <div class="app-banner">
        <span class="app-banner-icon">${p.icon}</span>
        <div>
          <small>${t("home.activePromo")}</small>
          <strong>${tr(p.name)} — ${p.discount}% ${t("common.off")}</strong>
        </div>
        <a class="app-btn app-btn-gold" href="#/promotions">${t("common.viewPromos")}</a>
      </div>`
        )
        .join("")
    : `<div class="app-banner"><div>${t("home.noPromo")}</div></div>`;

  const cats = [
    { key: "earrings", icon: "🫧" },
    { key: "rings", icon: "💍" },
    { key: "flowers", icon: "🌹" },
    { key: "decor", icon: "🎄" },
  ]
    .map(
      (c) => `
      <a class="app-cat-card" href="#/products">
        <span class="app-cat-icon">${c.icon}</span>
        <strong>${t("category." + c.key)}</strong>
      </a>`
    )
    .join("");

  app.innerHTML = renderPageLayout({
    id: "home",
    title: t("home.title"),
    subtitle: t("home.subtitle"),
    content: `
      <div class="app-actions">
        <a class="app-btn app-btn-primary" href="#/products">${t("common.viewProducts")}</a>
      </div>
      ${promoBanner}
      <h2 class="app-h2">${t("home.categories")}</h2>
      <div class="app-grid-3">${cats}</div>
    `,
  });
}
