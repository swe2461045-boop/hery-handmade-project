import { renderNotification } from "../layouts/notificationLayout.js";
import { renderProductTables } from "../components/productTables.js";
import { displayGroups } from "../components/searchProductSidebar.js";
import { tr, t } from "../i18n/i18n.js";

let allProducts = [];
export function initProductsData(data) {
  allProducts = data;
}

const DEFAULT_TYPES = displayGroups
  .flatMap((g) => g.items)
  .filter((i) => i.checked)
  .map((i) => i.value);

export function buildCategoryGroups(data) {
  const grouped = new Map();
  for (const item of data) {
    const key = item.category?.en || "Other";
    if (!grouped.has(key)) {
      grouped.set(key, { groupName: item.category, items: [] });
    }
    grouped.get(key).items.push({
      product_code: item.product_code,
      product_name: item.product_name,
    });
  }
  return Array.from(grouped.values());
}

export function renderDefaultTables(data) {
  return renderProductTables(data.slice(0, 4), DEFAULT_TYPES);
}

export function bindSearchEvents() {
  const searchBtn = document.getElementById("searchBtn");
  const searchTxt = document.getElementById("searchTxt");

  const updateResults = () => {
    const selectedCodes = Array.from(document.querySelectorAll('input[name="prodcode"]:checked')).map((c) => c.value);
    const selectedTypes = Array.from(document.querySelectorAll('input[name="displayType"]:checked')).map((c) => c.value);
    const keyword = searchTxt?.value.trim().toLowerCase() || "";

    let matched = allProducts.slice(0, 4);
    if (selectedCodes.length) {
      matched = allProducts.filter((item) => selectedCodes.includes(item.product_code));
    } else if (keyword) {
      matched = allProducts.filter((item) => tr(item.product_name).toLowerCase().includes(keyword));
    }

    const resultTbl = document.getElementById("resultTbl");
    if (resultTbl) resultTbl.innerHTML = renderProductTables(matched, selectedTypes);
  };

  searchBtn?.addEventListener("click", () => {
    document.querySelectorAll('input[name="prodcode"]:checked').forEach((c) => (c.checked = false));
    if (!searchTxt?.value.trim()) {
      document.getElementById("resultTbl").innerHTML = renderNotification(t("search.enterName"));
      return;
    }
    updateResults();
  });

  searchTxt?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); searchBtn?.click(); }
  });

  document.addEventListener("change", (e) => {
    if (e.target.matches('input[name="prodcode"]')) {
      if (searchTxt) searchTxt.value = "";
      updateResults();
    } else if (e.target.matches('input[name="displayType"]')) {
      updateResults();
    }
  });

  document.querySelectorAll(".app-toggle-sublist").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggle.nextElementSibling?.classList.toggle("is-hidden");
    });
  });
}
