import { d as P } from "./index-DrFu-skq.js";
const { useEffect: _, useMemo: h } = __STORYBOOK_MODULE_PREVIEW_API__;
const { global: j } = __STORYBOOK_MODULE_GLOBAL__;
const { logger: X } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
const p = "backgrounds";
const U = { light: { name: "light", value: "#F8F8F8" }, dark: { name: "dark", value: "#333" } };
const { document: b, window: O } = j;
const D = () => {
  let r;
  return !!(
    (r = O == null ? void 0 : O.matchMedia("(prefers-reduced-motion: reduce)")) != null && r.matches
  );
};
const A = (r) => {
  (Array.isArray(r) ? r : [r]).forEach(N);
};
const N = (r) => {
  let t;
  const e = b.getElementById(r);
  e && ((t = e.parentElement) == null || t.removeChild(e));
};
const F = (r, e) => {
  const t = b.getElementById(r);
  if (t) t.innerHTML !== e && (t.innerHTML = e);
  else {
    const o = b.createElement("style");
    o.setAttribute("id", r), (o.innerHTML = e), b.head.appendChild(o);
  }
};
const Y = (r, e, t) => {
  let a;
  const o = b.getElementById(r);
  if (o) o.innerHTML !== e && (o.innerHTML = e);
  else {
    const d = b.createElement("style");
    d.setAttribute("id", r), (d.innerHTML = e);
    const i = `addon-backgrounds-grid${t ? `-docs-${t}` : ""}`;
    const n = b.getElementById(i);
    n ? (a = n.parentElement) == null || a.insertBefore(d, n) : b.head.appendChild(d);
  }
};
const W = { cellSize: 100, cellAmount: 10, opacity: 0.8 };
const w = "addon-backgrounds";
const R = "addon-backgrounds-grid";
const q = D() ? "" : "transition: background-color 0.3s;";
const J = (r, e) => {
  const { globals: t, parameters: o, viewMode: a, id: d } = e;
  const { options: i = U, disable: n, grid: s = W } = o[p] || {};
  const c = t[p] || {};
  const u = c.value;
  const l = u ? i[u] : void 0;
  const $ = (l == null ? void 0 : l.value) || "transparent";
  const f = c.grid || !1;
  const y = !!l && !n;
  const m = a === "docs" ? `#anchor--${d} .docs-story` : ".sb-show-main";
  const E = a === "docs" ? `#anchor--${d} .docs-story` : ".sb-show-main";
  const H = o.layout === void 0 || o.layout === "padded";
  const L = a === "docs" ? 20 : H ? 16 : 0;
  const { cellAmount: k, cellSize: g, opacity: x, offsetX: v = L, offsetY: S = L } = s;
  const B = a === "docs" ? `${w}-docs-${d}` : `${w}-color`;
  const G = a === "docs" ? d : null;
  _(() => {
    const M = `
    ${m} {
      background: ${$} !important;
      ${q}
      }`;
    if (!y) {
      A(B);
      return;
    }
    Y(B, M, G);
  }, [m, B, G, y, $]);
  const T = a === "docs" ? `${R}-docs-${d}` : `${R}`;
  return (
    _(() => {
      if (!f) {
        A(T);
        return;
      }
      const M = [
        `${g * k}px ${g * k}px`,
        `${g * k}px ${g * k}px`,
        `${g}px ${g}px`,
        `${g}px ${g}px`,
      ].join(", ");
      const K = `
        ${E} {
          background-size: ${M} !important;
          background-position: ${v}px ${S}px, ${v}px ${S}px, ${v}px ${S}px, ${v}px ${S}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${x}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${x}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${x / 2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${x / 2}) 1px, transparent 1px) !important;
        }
      `;
      F(T, K);
    }, [k, g, E, T, f, v, S, x]),
    r()
  );
};
const Q = (r, e, t) => {
  if (r === "transparent") return "transparent";
  if (e.find((a) => a.value === r) || r) return r;
  const o = e.find((a) => a.name === t);
  if (o) return o.value;
  if (t) {
    const a = e.map((d) => d.name).join(", ");
    X.warn(P`
        Backgrounds Addon: could not find the default color "${t}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `);
  }
  return "transparent";
};
const Z = (r, e) => {
  let u;
  const { globals: t, parameters: o } = e;
  const a = (u = t[p]) == null ? void 0 : u.value;
  const d = o[p];
  const i = h(() => (d.disable ? "transparent" : Q(a, d.values, d.default)), [d, a]);
  const n = h(() => i && i !== "transparent", [i]);
  const s = e.viewMode === "docs" ? `#anchor--${e.id} .docs-story` : ".sb-show-main";
  const c = h(
    () => `
      ${s} {
        background: ${i} !important;
        ${D() ? "" : "transition: background-color 0.3s;"}
      }
    `,
    [i, s],
  );
  return (
    _(() => {
      const l =
        e.viewMode === "docs" ? `addon-backgrounds-docs-${e.id}` : "addon-backgrounds-color";
      if (!n) {
        A(l);
        return;
      }
      Y(l, c, e.viewMode === "docs" ? e.id : null);
    }, [n, c, e]),
    r()
  );
};
const V = (r, e) => {
  let y;
  const { globals: t, parameters: o } = e;
  const a = o[p].grid;
  const d = ((y = t[p]) == null ? void 0 : y.grid) === !0 && a.disable !== !0;
  const { cellAmount: i, cellSize: n, opacity: s } = a;
  const c = e.viewMode === "docs";
  const u = o.layout === void 0 || o.layout === "padded" ? 16 : 0;
  const l = a.offsetX ?? (c ? 20 : u);
  const $ = a.offsetY ?? (c ? 20 : u);
  const f = h(() => {
    const m = e.viewMode === "docs" ? `#anchor--${e.id} .docs-story` : ".sb-show-main";
    const E = [
      `${n * i}px ${n * i}px`,
      `${n * i}px ${n * i}px`,
      `${n}px ${n}px`,
      `${n}px ${n}px`,
    ].join(", ");
    return `
      ${m} {
        background-size: ${E} !important;
        background-position: ${l}px ${$}px, ${l}px ${$}px, ${l}px ${$}px, ${l}px ${$}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${s / 2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s / 2}) 1px, transparent 1px) !important;
      }
    `;
  }, [n]);
  return (
    _(() => {
      const m =
        e.viewMode === "docs" ? `addon-backgrounds-grid-docs-${e.id}` : "addon-backgrounds-grid";
      if (!d) {
        A(m);
        return;
      }
      F(m, f);
    }, [d, f, e]),
    r()
  );
};
let C;
const ae = (C = globalThis.FEATURES) != null && C.backgroundsStoryGlobals ? [J] : [V, Z];
let I;
const oe = {
  [p]: {
    grid: { cellSize: 20, opacity: 0.5, cellAmount: 5 },
    disable: !1,
    ...(!((I = globalThis.FEATURES) != null && I.backgroundsStoryGlobals) && {
      values: Object.values(U),
    }),
  },
};
const ee = { [p]: { value: void 0, grid: !1 } };
let z;
const de = (z = globalThis.FEATURES) != null && z.backgroundsStoryGlobals ? ee : { [p]: null };
export { ae as decorators, de as initialGlobals, oe as parameters };
