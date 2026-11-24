export function renderNotification(message, type = "warning") {
  return `<div class="app-hint ${type === "danger" ? "app-warning" : ""}">${message}</div>`;
}
