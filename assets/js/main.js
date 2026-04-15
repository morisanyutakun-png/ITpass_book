// 共通: 現在ページのナビをハイライト
document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("is-active");
  });
});

// 汎用: JSON を取得
async function fetchJSON(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return await res.json();
}
window.fetchJSON = fetchJSON;

// 日付フォーマット
window.formatDate = function (iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// 汎用: テーブル描画（errata / changelog 用）
window.renderTable = function (mountEl, rows, columns) {
  if (!mountEl) return;
  if (!rows || rows.length === 0) {
    mountEl.innerHTML = '<p style="color:var(--color-muted)">現在、該当するデータはありません。</p>';
    return;
  }
  const thead = `<thead><tr>${columns.map((c) => `<th>${c.label}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map((r) => `<tr>${columns.map((c) => `<td>${c.render ? c.render(r) : r[c.key] ?? ""}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  mountEl.innerHTML = `<table class="data-table">${thead}${tbody}</table>`;
};
