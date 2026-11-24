import { renderHomePage } from "./pages/homePage.js";
import { renderProductsPage } from "./pages/productsPage.js";
import { renderSearchPage } from "./pages/searchPage.js";
import { renderDeliveryPage } from "./pages/deliveryPage.js";
import { renderPromotionsPage } from "./pages/promotionsPage.js";
import { renderContactPage } from "./pages/contactPage.js";
import { renderNotFoundPage } from "./pages/notFoundPage.js";

export const routes = {
  "#/home": renderHomePage,
  "#/products": renderProductsPage,
  "#/search": renderSearchPage,
  "#/delivery": renderDeliveryPage,
  "#/promotions": renderPromotionsPage,
  "#/contact": renderContactPage,
  "#/404": renderNotFoundPage,
};
