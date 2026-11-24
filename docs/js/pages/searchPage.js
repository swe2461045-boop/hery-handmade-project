import { getProductsData } from "../services/productService.js";
import { loadImages } from "../services/imageService.js";
import { buildCategoryGroups, bindSearchEvents, renderDefaultTables, initProductsData } from "../fn/productSearchEvents.js";
import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";
import { renderSearchByName, renderSearchSettings, renderCategoryGroupList } from "../components/searchProductSidebar.js";
import { renderImageModal, bindImageModalEvents } from "../components/imageModal.js";
import { t } from "../i18n/i18n.js";

export async function renderSearchPage() {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-section"><div class="app-container"><p>${t("search.loading")}</p></div></div>`;

  try {
    const productsData = await getProductsData();
    await loadImages();
    initProductsData(productsData);
    const groups = buildCategoryGroups(productsData);

    app.innerHTML =
      renderSidebarPageLayout({
        sidebarContent: `${renderSearchByName()} ${renderSearchSettings()} ${renderCategoryGroupList(groups)}`,
        pageId: "search",
        pageTitle: t("search.title"),
        pageSubtitle: t("search.subtitle"),
        mainContent: `<div id="resultTbl">${renderDefaultTables(productsData)}</div>`,
      }) + renderImageModal();

    bindSearchEvents();
    bindImageModalEvents();
  } catch (err) {
    console.error(err);
  }
}
