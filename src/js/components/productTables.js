import { titleFromKey, escapeHtml } from "../fn/format.js";
import { renderTable } from "../layouts/tableLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { getImagesByProductCode } from "../services/imageService.js";
import { tr, t } from "../i18n/i18n.js";

export function renderProductTables(items, selectedTypes) {
  if (!items.length) return renderNotification(t("search.noMatch"));
  if (!selectedTypes.length) return renderNotification(t("search.selectCategory"));
  return selectedTypes.map((type) => renderTableByType(type, items)).join("");
}

function renderTableByType(type, items) {
  if (type === "description") {
    return renderTable({
      title: t("search.description"),
      columns: [
        { key: "product_name", label: t("search.colName") },
        { key: "category", label: t("search.colCategory") },
        { key: "description", label: t("search.colDesc") },
      ],
      rows: items.map((item) => ({
        ...item,
        product_name: tr(item.product_name),
        category: tr(item.category),
        description: tr(item.description),
      })),
    });
  }

  if (type === "images") {
    return renderTable({
      title: t("search.images"),
      columns: [
        { key: "product_name", label: t("search.colName") },
        {
          key: "number_of_images",
          label: t("search.colImageCount"),
          render: (item) => {
            const imgs = getImagesByProductCode(item.product_code);
            return imgs.length > 0
              ? `<span class="app-img-badge open-image-btn" data-code="${escapeHtml(item.product_code)}" data-name="${escapeHtml(tr(item.product_name))}">🖼 ${imgs.length}</span>`
              : "-";
          },
        },
      ],
      rows: items.map((item) => ({
        ...item,
        product_name: tr(item.product_name),
      })),
    });
  }

  const keys = Array.from(
    new Set(
      items.flatMap((item) => {
        const data = item?.[type];
        return data && typeof data === "object" ? Object.keys(data) : [];
      })
    )
  );

  const columns = [
    { key: "product_name", label: t("search.colName") },
    ...keys.map((k) => ({
      key: k,
      label: t(`tableCols.${k}`) !== `tableCols.${k}` ? t(`tableCols.${k}`) : k,
    })),
  ];

  const rows = items.map((item) => {
    const raw = item?.[type] || {};
    const localizedObj = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, typeof v === "object" && v !== null ? tr(v) : v])
    );
    return {
      product_name: tr(item.product_name),
      ...localizedObj,
    };
  });

  return renderTable({
    title: t(`search.${type}`) !== `search.${type}` ? t(`search.${type}`) : titleFromKey(type),
    columns,
    rows,
  });
}
