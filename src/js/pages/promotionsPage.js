import { t, tr } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { promotions } from "../data/promotions.js";
import { products } from "../data/products.js";
import { isActive } from "../utils/pricing.js";

const pad = (n) => String(n).padStart(2, "0");
const fmt = ([m, d]) => `${pad(m)}/${pad(d)}`;

export function renderPromotionsPage() {
  const app = document.getElementById("app");

  const cards = promotions
    .map((p) => {
      const active = isActive(p);
      const cats = p.categories.includes("all")
        ? [t("category.all")]
        : p.categories.map((c) => t("category." + c));
      // тухайн баярт зориулсан чимэглэл байвал хамт харуулна
      if (products.some((x) => x.holiday === p.id)) cats.push(t("category.decor"));
      const applies = cats.join(", ");

      return `
      <article class="app-promo ${active ? "is-active" : ""}">
        <div class="app-promo-icon">${p.icon}</div>
        <div class="app-promo-body">
          <h3>${tr(p.name)}</h3>
          <p>${t("promotions.period")}: ${fmt(p.start)} – ${fmt(p.end)}</p>
          <p>${t("promotions.applies")}: ${applies}</p>
        </div>
        <div class="app-promo-side">
          <span class="app-discount">${p.discount}%</span>
          <span class="app-status">${active ? t("promotions.active") : t("promotions.upcoming")}</span>
        </div>
      </article>`;
    })
    .join("");

  app.innerHTML = renderPageLayout({
    id: "promotions",
    title: t("promotions.title"),
    subtitle: t("promotions.subtitle"),
    content: `<div class="app-stack">${cards}</div>`,
  });
}
