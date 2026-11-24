import { renderPageLayout } from "./pageLayout.js";

export function renderSidebarPageLayout({
  sidebarContent = "",
  mainContent = "",
  pageId = "",
  pageTitle = "",
  pageSubtitle = "",
}) {
  const renderedMainContent = renderPageLayout({
    id: pageId,
    title: pageTitle,
    subtitle: pageSubtitle,
    content: mainContent,
  });

  return `
    <div class="app-search-shell">
      <aside id="docsSidebar" class="app-sidebar">
        ${sidebarContent}
      </aside>
      <div class="app-search-main">
        ${renderedMainContent}
      </div>
    </div>
  `;
}
