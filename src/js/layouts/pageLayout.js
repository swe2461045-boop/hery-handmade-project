// <section class="app-section">
//      <div class="app-container">
//          <h1> title </h1>  <p> subtitle </p>
//          content
//      </div>
// </section>

export function renderPageLayout({
  id = "",
  title = "",
  subtitle = "",
  content = "",
  sectionClass = "app-section",
  containerClass = "app-container",
  titleClass = "app-title",
}) {
  return `
    <section ${id ? `id="${id}"` : ""} class="${sectionClass}">
      <div class="${containerClass}">
        ${title ? `<h1 class="${titleClass}">${title}</h1>` : ""}
        ${subtitle ? `<p class="app-subtitle">${subtitle}</p>` : ""}
        ${content}
      </div>
    </section>
  `;
}
