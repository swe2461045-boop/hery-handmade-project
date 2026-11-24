import { escapeHtml } from "../fn/format.js";
import { t, tr } from "../i18n/i18n.js";

export const displayGroups = [
  {
    groupName: "search.priceGroup",
    items: [
      { value: "pricing", label: "search.pricing", checked: true },
      { value: "craft_details", label: "search.craft_details", checked: true },
    ],
  },
  {
    groupName: "search.extraGroup",
    items: [
      { value: "description", label: "search.description", checked: false },
      { value: "images", label: "search.images", checked: true },
    ],
  },
];

export function renderSearchByName() {
  return `
    <p class="app-sidebar-label">🔍 ${t("search.byName")}</p>
    <input class="app-input" type="text" placeholder="${t("search.placeholder")}" id="searchTxt" />
    <button class="app-btn app-btn-primary" style="width:100%; margin-top:.5rem;" type="button" id="searchBtn">
      ${t("search.button")}
    </button>
  `;
}

export function renderSearchSettings() {
  return `
    <p class="app-sidebar-label">🛠 ${t("search.settings")}</p>
    <ul class="app-sidebar-list">
      ${displayGroups
        .map(
          (g) => `
        <li>
          <a class="app-toggle-sublist" href="#">▸ ${escapeHtml(t(g.groupName))}</a>
          <ul class="app-sublist">
            ${g.items
              .map(
                (item) => `
              <li>
                <label class="app-sublist-item">
                  <input type="checkbox" name="displayType" value="${escapeHtml(item.value)}" ${item.checked ? "checked" : ""}>
                  <span>${escapeHtml(t(item.label))}</span>
                </label>
              </li>`
              )
              .join("")}
          </ul>
        </li>`
        )
        .join("")}
    </ul>
  `;
}

export function renderCategoryGroupList(groups = []) {
  return `
    <p class="app-sidebar-label">💍 ${t("search.byCategory")}</p>
    <ul class="app-sidebar-list">
      ${groups
        .map(
          (g) => `
        <li>
          <a class="app-toggle-sublist" href="#">▸ ${escapeHtml(tr(g.groupName))}</a>
          <ul class="app-sublist">
            ${g.items
              .map(
                (item) => `
              <li>
                <label class="app-sublist-item">
                  <input type="checkbox" name="prodcode" value="${escapeHtml(item.product_code)}">
                  <span>${escapeHtml(tr(item.product_name))}</span>
                </label>
              </li>`
              )
              .join("")}
          </ul>
        </li>`
        )
        .join("")}
    </ul>
  `;
}
