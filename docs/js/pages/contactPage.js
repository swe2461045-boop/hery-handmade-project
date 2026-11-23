import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderContactPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "contact",
    title: t("contact.title"),
    subtitle: t("contact.subtitle"),
    content: `
      <div class="app-panel">
        <div class="app-row"><span>📞 ${t("contact.phone")}</span><span>+976 9900-0000</span></div>
        <div class="app-row"><span>📍 ${t("contact.address")}</span><span>${t("contact.addressValue")}</span></div>
        <div class="app-row"><span>🕙 ${t("contact.hours")}</span><span>${t("contact.hoursValue")}</span></div>
        <div class="app-row"><span>💬 ${t("contact.social")}</span><span>@hery.handmade</span></div>
      </div>
    `,
  });
}
