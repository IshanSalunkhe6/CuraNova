// Keep using same-origin rewrite
export const API_BASE = "/api";

function join(base, path) {
  const b = base.replace(/\/+$/, "");
  const p = String(path || "").replace(/^\/+/, "");
  return `${b}/${p}`;
}

export async function api(path, { method = "GET", body, headers = {} } = {}) {
  const url = join(API_BASE, path);

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text || null; }

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    if (data) {
      if (typeof data === "string") msg = data;
      else if (data.detail) {
        if (Array.isArray(data.detail)) {
          msg = data.detail.map(d => d.msg || d.message || JSON.stringify(d)).join(", ");
        } else {
          msg = data.detail.msg || data.detail.message || JSON.stringify(data.detail);
        }
      } else if (data.message || data.error) {
        msg = data.message || data.error;
      }
    }
    throw new Error(msg);
  }

  return data;
}
