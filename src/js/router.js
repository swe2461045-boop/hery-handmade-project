export function initRouter(routes) {
  function renderRoute() {
    const hash = window.location.hash || "#/home";
    const page = routes[hash];

    if (page) {
      page();
      window.scrollTo(0, 0);
      markActiveLink(hash);
    } else {
      routes["#/404"]?.();
      markActiveLink("");
    }
  }

  // Идэвхтэй цэсийг тодруулна
  function markActiveLink(hash) {
    document.querySelectorAll(".app-nav-link").forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === hash);
    });
  }

  window.addEventListener("load", renderRoute);
  window.addEventListener("hashchange", renderRoute);
}
