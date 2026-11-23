import { t, tr } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { products } from "../data/products.js";
import {
  GIFT_WRAP_FEE, bands, basePrice, deliveryFee, districts, finalPrice, money,
} from "../utils/pricing.js";

const bandLabel = (b) => (b.from === 0 ? `0–${b.to} km` : `${b.from}–${b.to} km`);

function renderTariffTable(activeBand) {
  const rows = bands
    .map(
      (b, i) => `
      <tr class="${i === activeBand ? "is-current" : ""}">
        <td>${bandLabel(b)}</td><td>${t("delivery." + b.key)}</td>
      </tr>`
    )
    .join("");
  return `<table class="app-table">
    <thead><tr><th>${t("delivery.colZone")}</th><th>${t("delivery.colFee")}</th></tr></thead>
    <tbody>${rows}</tbody></table>`;
}

export function renderDeliveryPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "delivery",
    title: t("delivery.title"),
    subtitle: t("delivery.subtitle"),
    content: `
      <div class="app-two-col">
        <div class="app-panel">
          <label class="app-label" for="productSelect">${t("delivery.product")}</label>
          <select id="productSelect" class="app-input">
            ${products.map((p) => `<option value="${p.id}">${p.emoji} ${tr(p.name)}</option>`).join("")}
          </select>

          <label class="app-label" for="qtyInput">${t("delivery.qty")}</label>
          <input id="qtyInput" class="app-input" type="number" min="1" max="20" value="1" />

          <label class="app-check"><input type="checkbox" id="wrapCheck" /> ${t("delivery.giftWrap")}</label>

          <label class="app-label" for="districtSelect">${t("delivery.district")}</label>
          <select id="districtSelect" class="app-input">
            <option value="">${t("delivery.custom")}</option>
            ${districts.map((d) => `<option value="${d.km}">${tr(d.name)} – ~${d.km} km</option>`).join("")}
          </select>

          <label class="app-label" for="kmInput">${t("delivery.distance")}</label>
          <input id="kmInput" class="app-input" type="number" min="0" max="60" step="0.5" value="7" />
          <input id="kmRange" type="range" min="0" max="40" step="0.5" value="7" />

          <span class="app-label">${t("delivery.type")}</span>
          <div class="app-radios">
            <label class="app-radio"><input type="radio" name="dtype" value="standard" checked /> ${t("delivery.standard")}</label>
            <label class="app-radio"><input type="radio" name="dtype" value="express" /> ${t("delivery.express")}</label>
          </div>
          <p class="app-note" id="expressNote"></p>

          <div id="result" class="app-result"></div>
        </div>

        <div class="app-panel app-panel-soft">
          <h2 class="app-h2" style="margin-top:0">${t("delivery.zonesTitle")}</h2>
          <div id="tariff"></div>
          <h3 class="app-h3">${t("delivery.rules")}</h3>
          <ul class="app-list">
            <li>${t("delivery.rule1")}</li>
            <li>${t("delivery.rule2")}</li>
            <li>${t("delivery.rule3")}</li>
          </ul>
        </div>
      </div>
    `,
  });

  const $ = (id) => document.getElementById(id);
  const select = $("productSelect"), qty = $("qtyInput"), km = $("kmInput"), range = $("kmRange");
  const district = $("districtSelect"), wrap = $("wrapCheck"), result = $("result");

  function calculate() {
    const product = products.find((p) => p.id === select.value);
    const q = Math.max(1, parseInt(qty.value, 10) || 1);
    const distance = parseFloat(km.value);
    const express = document.querySelector('input[name="dtype"]:checked').value === "express";

    const original = basePrice(product) * q;
    const itemTotal = finalPrice(product) * q;
    const discount = original - itemTotal;
    const d = deliveryFee(distance, itemTotal, { express });

    $("tariff").innerHTML = renderTariffTable(d.ok ? d.band : -1);

    if (!d.ok) {
      $("expressNote").textContent = "";
      result.innerHTML = `<p class="app-warning">${d.tooFar ? t("delivery.tooFar") : ""}</p>`;
      return;
    }

    $("expressNote").textContent = d.expressAvailable ? "" : t("delivery.expressNA");
    const fee = d.free ? 0 : d.fee;
    const wrapFee = wrap.checked ? GIFT_WRAP_FEE : 0;
    const total = itemTotal + wrapFee + fee + d.expressFee;

    const useExpress = express && d.expressAvailable;
    const etaText = useExpress ? t("delivery.etaExp") : t("delivery." + d.eta);

    const hint = d.free
      ? `<div class="app-hint is-ok">${t("delivery.freeOk")}</div>`
      : d.missing !== null
      ? `<div class="app-hint">${t("delivery.freeHint").replace("{n}", money(d.missing))}</div>`
      : "";

    result.innerHTML = `
      <div class="app-row"><span>${t("delivery.itemTotal")}</span><span>${money(original)}</span></div>
      ${discount ? `<div class="app-row app-row-promo"><span>${t("delivery.promoApplied")}</span><span>− ${money(discount)}</span></div>` : ""}
      ${wrapFee ? `<div class="app-row"><span>${t("delivery.wrapFee")}</span><span>${money(wrapFee)}</span></div>` : ""}
      <div class="app-row"><span>${t("delivery.fee")} (${distance} km)</span>
        <span>${d.free ? `<s>${money(d.fee)}</s> ${t("delivery.free")}` : money(fee)}</span></div>
      ${d.expressFee ? `<div class="app-row"><span>${t("delivery.expressFee")}</span><span>${money(d.expressFee)}</span></div>` : ""}
      <div class="app-row app-row-total"><span>${t("delivery.total")}</span><span>${money(total)}</span></div>
      <div class="app-eta"><span>${t("delivery.eta")}</span><span>${etaText}</span></div>
      ${hint}
    `;
  }

  km.addEventListener("input", () => { range.value = km.value; district.value = ""; calculate(); });
  range.addEventListener("input", () => { km.value = range.value; district.value = ""; calculate(); });
  district.addEventListener("change", () => {
    if (district.value) { km.value = district.value; range.value = district.value; }
    calculate();
  });
  [select, qty, wrap].forEach((el) => el.addEventListener("input", calculate));
  document.querySelectorAll('input[name="dtype"]').forEach((el) => el.addEventListener("change", calculate));
  calculate();
}
