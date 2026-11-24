import { safeValue } from "../fn/format.js";
import { renderNotification } from "./notificationLayout.js";

export function renderTable({ title = "", columns = [], rows = [], emptyMessage = "No data available." }) {
  return `
    <div class="app-table-wrap">
      ${title ? `<h2 class="app-h2">${safeValue(title)}</h2>` : ""}
      ${
        rows.length
          ? `<table class="app-table">
              <thead>
                <tr>
                  ${columns.map((col) => `<th>${safeValue(col.label)}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${rows
                  .map(
                    (row) => `
                    <tr>
                      ${columns
                        .map((col) => `<td>${col.render ? col.render(row) : safeValue(row[col.key])}</td>`)
                        .join("")}
                    </tr>`
                  )
                  .join("")}
              </tbody>
            </table>`
          : renderNotification(safeValue(emptyMessage))
      }
    </div>
  `;
}
