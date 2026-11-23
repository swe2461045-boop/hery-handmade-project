import { t, tr } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { products } from "../data/products.js";
import { promotions } from "../data/promotions.js";
import { basePrice, finalPrice, getDiscountPercent, money } from "../utils/pricing.js";

function renderCards(category) {
  const list = category === "all" ? products : products.filter((p) => p.category === category);

  return list
    .map((p) => {
      const pct = getDiscountPercent(p);
      const price = pct
        ? `<s>${money(basePrice(p))}</s> <strong class="app-price">${money(finalPrice(p))}</strong>
           <span class="app-tag">-${pct}%</span>`
        : `<strong class="app-price">${money(basePrice(p))}</strong>`;

      const holiday = p.holiday ? promotions.find((x) => x.id === p.holiday) : null;
      const badge = holiday ? `<span class="app-holiday">${holiday.icon} ${tr(holiday.name)}</span>` : "";

      return `
      <article class="app-card">
        <div class="app-card-img">${p.emoji}</div>
        ${badge}
        <h3>${tr(p.name)}</h3>
        <p>${tr(p.desc)}</p>
        <div class="app-price-row">${price}</div>
        <details class="app-breakdown">
          <summary>${t("products.priceNote")}</summary>
          <ul>
            <li>${t("products.material")}: ${money(p.material)}</li>
            <li>${t("products.labor")}: ${money(p.labor)}</li>
            <li>${t("products.makeTime")}: ~${p.hours} ${t("products.hours")}</li>
          </ul>
        </details>
      </article>`;
    })
    .join("");
}

export function renderProductsPage() {
  const app = document.getElementById("app");
  const cats = ["all", "earrings", "rings", "flowers", "decor"];

  app.innerHTML = renderPageLayout({
    id: "products",
    title: t("products.title"),
    subtitle: t("products.subtitle"),
    content: `
      <div class="app-tabs" id="categoryTabs">
        ${cats
          .map((c) => `<button class="app-tab ${c === "all" ? "is-active" : ""}" data-cat="${c}">${t("category." + c)}</button>`)
          .join("")}
      </div>
      <div class="app-grid-3" id="productGrid">${renderCards("all")}</div>
    `,
  });

  document.getElementById("categoryTabs").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-cat]");
    if (!btn) return;
    document.querySelectorAll(".app-tab").forEach((b) => b.classList.toggle("is-active", b === btn));
    document.getElementById("productGrid").innerHTML = renderCards(btn.dataset.cat);
  });
}
