const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./TokensGallery.stories-fHFDuXpz.js",
      "./index-2yJIXLcc.js",
      "./preview-jFfjQXim.js",
      "./preview-n2LuyfZw.css",
      "./entry-preview-DyzZ8sWk.js",
      "./chunk-XP5HYGXS-D5tuasO7.js",
      "./entry-preview-docs-CSBLhdYu.js",
      "./index-DgH-xKnr.js",
      "./preview-B8lJiyuQ.js",
      "./index-DrFu-skq.js",
      "./preview-BWzBA1C2.js",
    ]),
) => i.map((i) => d[i]);
(() => {
  const e = document.createElement("link").relList;
  if (e?.supports?.("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) o(a);
  new MutationObserver((a) => {
    for (const i of a)
      if (i.type === "childList")
        for (const u of i.addedNodes) u.tagName === "LINK" && u.rel === "modulepreload" && o(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(a) {
    const i = {};
    return (
      a.integrity && (i.integrity = a.integrity),
      a.referrerPolicy && (i.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function o(a) {
    if (a.ep) return;
    a.ep = !0;
    const i = r(a);
    fetch(a.href, i);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = (t, e) => new URL(t, e).href;
const seen = {};
const __vitePreload = (e, r, o) => {
    let a = Promise.resolve();
    if (r && r.length > 0) {
      const u = (m) =>
        Promise.all(
          m.map((h) =>
            Promise.resolve(h).then(
              (g) => ({ status: "fulfilled", value: g }),
              (g) => ({ status: "rejected", reason: g }),
            ),
          ),
        );
      const l = document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]");
      const d = (c == null ? void 0 : c.nonce) || (c == null ? void 0 : c.getAttribute("nonce"));
      a = u(
        r.map((m) => {
          if (((m = assetsURL(m, o)), m in seen)) return;
          seen[m] = !0;
          const h = m.endsWith(".css");
          const g = h ? '[rel="stylesheet"]' : "";
          if (o)
            for (let le = l.length - 1; le >= 0; le--) {
              const J = l[le];
              if (J.href === m && (!h || J.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${m}"]${g}`)) return;
          const ne = document.createElement("link");
          if (
            ((ne.rel = h ? "stylesheet" : scriptRel),
            h || (ne.as = "script"),
            (ne.crossOrigin = ""),
            (ne.href = m),
            d && ne.setAttribute("nonce", d),
            document.head.appendChild(ne),
            h)
          )
            return new Promise((le, J) => {
              ne.addEventListener("load", le),
                ne.addEventListener("error", () => J(new Error(`Unable to preload CSS for ${m}`)));
            });
        }),
      );
    }
    function i(u) {
      const l = new Event("vite:preloadError", { cancelable: !0 });
      if (((l.payload = u), window.dispatchEvent(l), !l.defaultPrevented)) throw u;
    }
    return a.then((u) => {
      for (const l of u || []) l.status === "rejected" && i(l.reason);
      return e().catch(i);
    });
  };
const tl = Object.create;
const et = Object.defineProperty;
const ol = Object.getOwnPropertyDescriptor;
const nl = Object.getOwnPropertyNames;
const sl = Object.getPrototypeOf;
const il = Object.prototype.hasOwnProperty;
const n = (t, e) => et(t, "name", { value: e, configurable: !0 });
const cr = ((t) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
        ? new Proxy(t, { get: (e, r) => (typeof require < "u" ? require : e)[r] })
        : t)(function (t) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error(`Dynamic require of "${t}" is not supported`);
  });
const q = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
const _e = (t, e) => {
    for (const r in e) et(t, r, { get: e[r], enumerable: !0 });
  };
const al = (t, e, r, o) => {
    if ((e && typeof e === "object") || typeof e === "function")
      for (const a of nl(e))
        !il.call(t, a) &&
          a !== r &&
          et(t, a, { get: () => e[a], enumerable: !(o = ol(e, a)) || o.enumerable });
    return t;
  };
const ue = (t, e, r) => (
    (r = t != null ? tl(sl(t)) : {}), al(et(r, "default", { value: t, enumerable: !0 }), t)
  );
const it = q((t, e) => {
    (function (r) {
      if (typeof t === "object" && typeof e < "u") e.exports = r();
      else if (typeof define === "function" && define.amd) define([], r);
      else {
        let o;
        typeof window < "u"
          ? (o = window)
          : typeof global < "u"
            ? (o = global)
            : typeof self < "u"
              ? (o = self)
              : (o = this),
          (o.memoizerific = r());
      }
    })(() =>
      n(function r(o, a, i) {
        function u(d, m) {
          if (!a[d]) {
            if (!o[d]) {
              const h = typeof cr === "function" && cr;
              if (!m && h) return h(d, !0);
              if (l) return l(d, !0);
              const g = new Error(`Cannot find module '${d}'`);
              throw ((g.code = "MODULE_NOT_FOUND"), g);
            }
            const re = (a[d] = { exports: {} });
            o[d][0].call(
              re.exports,
              (ne) => {
                const le = o[d][1][ne];
                return u(le || ne);
              },
              re,
              re.exports,
              r,
              o,
              a,
              i,
            );
          }
          return a[d].exports;
        }
        n(u, "s");
        for (let l = typeof cr === "function" && cr, c = 0; c < i.length; c++) u(i[c]);
        return u;
      }, "e")(
        {
          1: [
            (r, o, a) => {
              o.exports = (i) => {
                if (typeof Map !== "function" || i) {
                  const u = r("./similar");
                  return new u();
                }return new Map();
              };
            },
            { "./similar": 2 },
          ],
          2: [
            (r, o, a) => {
              function i() {
                return (this.list = []), (this.lastItem = void 0), (this.size = 0), this;
              }
              n(i, "Similar"),
                (i.prototype.get = function (u) {
                  let l;
                  if (this.lastItem && this.isEqual(this.lastItem.key, u)) return this.lastItem.val;
                  if (((l = this.indexOf(u)), l >= 0))
                    return (this.lastItem = this.list[l]), this.list[l].val;
                }),
                (i.prototype.set = function (u, l) {
                  let c;
                  return this.lastItem && this.isEqual(this.lastItem.key, u)
                    ? ((this.lastItem.val = l), this)
                    : ((c = this.indexOf(u)),
                      c >= 0
                        ? ((this.lastItem = this.list[c]), (this.list[c].val = l), this)
                        : ((this.lastItem = { key: u, val: l }),
                          this.list.push(this.lastItem),
                          this.size++,
                          this));
                }),
                (i.prototype.delete = function (u) {
                  let l;
                  if (
                    (this.lastItem &&
                      this.isEqual(this.lastItem.key, u) &&
                      (this.lastItem = void 0),
                    (l = this.indexOf(u)),
                    l >= 0)
                  )
                    return this.size--, this.list.splice(l, 1)[0];
                }),
                (i.prototype.has = function (u) {
                  let l;
                  return this.lastItem && this.isEqual(this.lastItem.key, u)
                    ? !0
                    : ((l = this.indexOf(u)), l >= 0 ? ((this.lastItem = this.list[l]), !0) : !1);
                }),
                (i.prototype.forEach = function (u, l) {
                  let c;
                  for (c = 0; c < this.size; c++)
                    u.call(l || this, this.list[c].val, this.list[c].key, this);
                }),
                (i.prototype.indexOf = function (u) {
                  let l;
                  for (l = 0; l < this.size; l++) if (this.isEqual(this.list[l].key, u)) return l;
                  return -1;
                }),
                (i.prototype.isEqual = (u, l) => u === l || (u !== u && l !== l)),
                (o.exports = i);
            },
            {},
          ],
          3: [
            (r, o, a) => {
              const i = r("map-or-similar");
              o.exports = (d) => {
                const m = new i(!1);
                const h = [];
                return (g) => {
                  const re = n(() => {
                    let ne = m;
                    let le;
                    let J;
                    const ce = arguments.length - 1;
                    const F = Array(ce + 1);
                    let se = !0;
                    let he;
                    if ((re.numArgs || re.numArgs === 0) && re.numArgs !== ce + 1)
                      throw new Error(
                        "Memoizerific functions should always be called with the same number of arguments",
                      );
                    for (he = 0; he < ce; he++) {
                      if (
                        ((F[he] = { cacheItem: ne, arg: arguments[he] }), ne.has(arguments[he]))
                      ) {
                        ne = ne.get(arguments[he]);
                        continue;
                      }
                      (se = !1), (le = new i(!1)), ne.set(arguments[he], le), (ne = le);
                    }
                    return (
                      se && (ne.has(arguments[ce]) ? (J = ne.get(arguments[ce])) : (se = !1)),
                      se || ((J = g.apply(null, arguments)), ne.set(arguments[ce], J)),
                      d > 0 &&
                        ((F[ce] = { cacheItem: ne, arg: arguments[ce] }),
                        se ? u(h, F) : h.push(F),
                        h.length > d && l(h.shift())),
                      (re.wasMemoized = se),
                      (re.numArgs = ce + 1),
                      J
                    );
                  }, "memoizerific");
                  return (re.limit = d), (re.wasMemoized = !1), (re.cache = m), (re.lru = h), re;
                };
              };
              function u(d, m) {
                const h = d.length;
                const g = m.length;
                let re;
                let ne;
                let le;
                for (ne = 0; ne < h; ne++) {
                  for (re = !0, le = 0; le < g; le++)
                    if (!c(d[ne][le].arg, m[le].arg)) {
                      re = !1;
                      break;
                    }
                  if (re) break;
                }
                d.push(d.splice(ne, 1)[0]);
              }
              n(u, "moveToMostRecentLru");
              function l(d) {
                const m = d.length;
                let h = d[m - 1];
                let g;
                let re;
                for (
                  h.cacheItem.delete(h.arg), re = m - 2;
                  re >= 0 && ((h = d[re]), (g = h.cacheItem.get(h.arg)), !g || !g.size);
                  re--
                )
                  h.cacheItem.delete(h.arg);
              }
              n(l, "removeCachedResult");
              function c(d, m) {
                return d === m || (d !== d && m !== m);
              }
              n(c, "isEqual");
            },
            { "map-or-similar": 1 },
          ],
        },
        {},
        [3],
      )(3),
    );
  });
const wi = q((t) => {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.isEqual = (() => {
        const e = Object.prototype.toString;
        const r = Object.getPrototypeOf;
        const o = Object.getOwnPropertySymbols
            ? (a) => Object.keys(a).concat(Object.getOwnPropertySymbols(a))
            : Object.keys;
        return (a, i) =>
          n(function u(l, c, d) {
            let m;
            let h;
            let g;
            const re = e.call(l);
            const ne = e.call(c);
            if (l === c) return !0;
            if (l == null || c == null) return !1;
            if (d.indexOf(l) > -1 && d.indexOf(c) > -1) return !0;
            if (
              (d.push(l, c),
              re !== ne ||
                ((m = o(l)),
                (h = o(c)),
                m.length !== h.length || m.some((le) => !u(l[le], c[le], d))))
            )
              return !1;
            switch (re.slice(8, -1)) {
              case "Symbol":
                return l.valueOf() === c.valueOf();
              case "Date":
              case "Number":
                return +l === +c || (+l !== +l && +c !== +c);
              case "RegExp":
              case "Function":
              case "String":
              case "Boolean":
                return `${l}` === `${c}`;
              case "Set":
              case "Map":
                (m = l.entries()), (h = c.entries());
                do if (!u((g = m.next()).value, h.next().value, d)) return !1;
                while (!g.done);
                return !0;
              case "ArrayBuffer":
                (l = new Uint8Array(l)), (c = new Uint8Array(c));
              case "DataView":
                (l = new Uint8Array(l.buffer)), (c = new Uint8Array(c.buffer));
              case "Float32Array":
              case "Float64Array":
              case "Int8Array":
              case "Int16Array":
              case "Int32Array":
              case "Uint8Array":
              case "Uint16Array":
              case "Uint32Array":
              case "Uint8ClampedArray":
              case "Arguments":
              case "Array":
                if (l.length !== c.length) return !1;
                for (g = 0; g < l.length; g++)
                  if ((g in l || g in c) && (g in l !== g in c || !u(l[g], c[g], d))) return !1;
                return !0;
              case "Object":
                return u(r(l), r(c), d);
              default:
                return !1;
            }
          }, "n")(a, i, []);
      })());
  });
const qn = q((t) => {
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.encodeString = o);
    const e = Array.from(
        { length: 256 },
        (a, i) => `%${((i < 16 ? "0" : "") + i.toString(16)).toUpperCase()}`,
      );
    const r = new Int8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 1, 0,
      ]);
    function o(a) {
      const i = a.length;
      if (i === 0) return "";
      let u = "";
      let l = 0;
      let c = 0;
      e: for (; c < i; c++) {
        let d = a.charCodeAt(c);
        while (d < 128) {
          if ((r[d] !== 1 && (l < c && (u += a.slice(l, c)), (l = c + 1), (u += e[d])), ++c === i))
            break e;
          d = a.charCodeAt(c);
        }
        if ((l < c && (u += a.slice(l, c)), d < 2048)) {
          (l = c + 1), (u += e[192 | (d >> 6)] + e[128 | (d & 63)]);
          continue;
        }
        if (d < 55296 || d >= 57344) {
          (l = c + 1), (u += e[224 | (d >> 12)] + e[128 | ((d >> 6) & 63)] + e[128 | (d & 63)]);
          continue;
        }
        if ((++c, c >= i)) throw new Error("URI malformed");
        const m = a.charCodeAt(c) & 1023;
        (l = c + 1),
          (d = 65536 + (((d & 1023) << 10) | m)),
          (u +=
            e[240 | (d >> 18)] +
            e[128 | ((d >> 12) & 63)] +
            e[128 | ((d >> 6) & 63)] +
            e[128 | (d & 63)]);
      }
      return l === 0 ? a : l < i ? u + a.slice(l) : u;
    }
    n(o, "encodeString");
  });
const It = q((t) => {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.defaultOptions = t.defaultShouldSerializeObject = t.defaultValueSerializer = void 0);
    const e = qn();
    const r = n((i) => {
        switch (typeof i) {
          case "string":
            return (0, e.encodeString)(i);
          case "bigint":
          case "boolean":
            return `${i}`;
          case "number":
            if (Number.isFinite(i)) return i < 1e21 ? `${i}` : (0, e.encodeString)(`${i}`);
            break;
        }
        return i instanceof Date ? (0, e.encodeString)(i.toISOString()) : "";
      }, "defaultValueSerializer");
    t.defaultValueSerializer = r;
    const o = n((i) => i instanceof Date, "defaultShouldSerializeObject");
    t.defaultShouldSerializeObject = o;
    const a = n((i) => i, "identityFunc");
    t.defaultOptions = {
      nesting: !0,
      nestingSyntax: "dot",
      arrayRepeat: !1,
      arrayRepeatSyntax: "repeat",
      delimiter: 38,
      valueDeserializer: a,
      valueSerializer: t.defaultValueSerializer,
      keyDeserializer: a,
      shouldSerializeObject: t.defaultShouldSerializeObject,
    };
  });
const Vn = q((t) => {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.getDeepObject = a),
      (t.stringifyObject = m);
    const e = It();
    const r = qn();
    function o(h) {
      return h === "__proto__" || h === "constructor" || h === "prototype";
    }
    n(o, "isPrototypeKey");
    function a(h, g, re, ne, le) {
      if (o(g)) return h;
      const J = h[g];
      return typeof J === "object" && J !== null
        ? J
        : !ne &&
            (le ||
              typeof re === "number" ||
              (typeof re === "string" && re * 0 === 0 && re.indexOf(".") === -1))
          ? (h[g] = [])
          : (h[g] = {});
    }
    n(a, "getDeepObject");
    const i = 20;
    const u = "[]";
    const l = "[";
    const c = "]";
    const d = ".";
    function m(h, g, re, ne, le) {
      const {
          nestingSyntax: J = e.defaultOptions.nestingSyntax,
          arrayRepeat: ce = e.defaultOptions.arrayRepeat,
          arrayRepeatSyntax: F = e.defaultOptions.arrayRepeatSyntax,
          nesting: se = e.defaultOptions.nesting,
          delimiter: he = e.defaultOptions.delimiter,
          valueSerializer: Ve = e.defaultOptions.valueSerializer,
          shouldSerializeObject: ve = e.defaultOptions.shouldSerializeObject,
        } = g;
      const we = typeof he === "number" ? String.fromCharCode(he) : he;
      const Nt = le === !0 && ce;
      const Bt = J === "dot" || (J === "js" && !le);
      if (re > i) return "";
      let Ft = "";
      let jt = !0;
      let qe = !1;
      for (const Dt in h) {
        const p = h[Dt];
        let A;
        ne
          ? ((A = ne),
            Nt
              ? F === "bracket" && (A += u)
              : Bt
                ? ((A += d), (A += Dt))
                : ((A += l), (A += Dt), (A += c)))
          : (A = Dt),
          jt || (Ft += we),
          typeof p === "object" && p !== null && !ve(p)
            ? ((qe = p.pop !== void 0), (se || (ce && qe)) && (Ft += m(p, g, re + 1, A, qe)))
            : ((Ft += (0, r.encodeString)(A)), (Ft += "="), (Ft += Ve(p, Dt))),
          jt && (jt = !1);
      }
      return Ft;
    }
    n(m, "stringifyObject");
  });
const na = q((t, e) => {
    const r = 12;
    const o = 0;
    const a = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48,
        60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
      ];
    function i(c) {
      let d = c.indexOf("%");
      if (d === -1) return c;
      for (let m = c.length, h = "", g = 0, re = 0, ne = d, le = r; d > -1 && d < m; ) {
        const J = l(c[d + 1], 4);
        const ce = l(c[d + 2], 0);
        const F = J | ce;
        const se = a[F];
        if (((le = a[256 + le + se]), (re = (re << 6) | (F & a[364 + se])), le === r))
          (h += c.slice(g, ne)),
            (h +=
              re <= 65535
                ? String.fromCharCode(re)
                : String.fromCharCode(55232 + (re >> 10), 56320 + (re & 1023))),
            (re = 0),
            (g = d + 3),
            (d = ne = c.indexOf("%", g));
        else {
          if (le === o) return null;
          if (((d += 3), d < m && c.charCodeAt(d) === 37)) continue;
          return null;
        }
      }
      return h + c.slice(g);
    }
    n(i, "decodeURIComponent");
    const u = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15,
    };
    function l(c, d) {
      const m = u[c];
      return m === void 0 ? 255 : m << d;
    }
    n(l, "hexCodeToInt"), (e.exports = i);
  });
const la = q((t) => {
    const e = (t?.__importDefault) || ((h) => (h?.__esModule ? h : { default: h }));
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.numberValueDeserializer = t.numberKeyDeserializer = void 0),
      (t.parse = m);
    const r = Vn();
    const o = It();
    const a = e(na());
    const i = n((h) => {
        const g = Number(h);
        return Number.isNaN(g) ? h : g;
      }, "numberKeyDeserializer");
    t.numberKeyDeserializer = i;
    const u = n((h) => {
      const g = Number(h);
      return Number.isNaN(g) ? h : g;
    }, "numberValueDeserializer");
    t.numberValueDeserializer = u;
    const l = /\+/g;
    const c = n(() => {}, "Empty");
    c.prototype = Object.create(null);
    function d(h, g, re, ne, le) {
      let J = h.substring(g, re);
      return ne && (J = J.replace(l, " ")), le && (J = (0, a.default)(J) || J), J;
    }
    n(d, "computeKeySlice");
    function m(h, g) {
      const {
          valueDeserializer: re = o.defaultOptions.valueDeserializer,
          keyDeserializer: ne = o.defaultOptions.keyDeserializer,
          arrayRepeatSyntax: le = o.defaultOptions.arrayRepeatSyntax,
          nesting: J = o.defaultOptions.nesting,
          arrayRepeat: ce = o.defaultOptions.arrayRepeat,
          nestingSyntax: F = o.defaultOptions.nestingSyntax,
          delimiter: se = o.defaultOptions.delimiter,
        } = g ?? {};
      const he = typeof se === "string" ? se.charCodeAt(0) : se;
      const Ve = F === "js";
      const ve = new c();
      if (typeof h !== "string") return ve;
      const we = h.length;
      let Nt = "";
      let Bt = -1;
      let Ft = -1;
      let jt = -1;
      let qe = ve;
      let Dt;
      let p = "";
      let A = "";
      let B = !1;
      let de = !1;
      let pe = !1;
      let Lt = !1;
      let qt = !1;
      let Ut = !1;
      let Mt = !1;
      let Gt = 0;
      let lr = -1;
      let zr = -1;
      let Qr = -1;
      for (let Vt = 0; Vt < we + 1; Vt++) {
        if (((Gt = Vt !== we ? h.charCodeAt(Vt) : he), Gt === he)) {
          if (
            ((Mt = Ft > Bt),
            Mt || (Ft = Vt),
            jt !== Ft - 1 &&
              ((A = d(h, jt + 1, lr > -1 ? lr : Ft, pe, B)),
              (p = ne(A)),
              Dt !== void 0 && (qe = (0, r.getDeepObject)(qe, Dt, p, Ve && qt, Ve && Ut))),
            Mt || p !== "")
          ) {
            Mt &&
              ((Nt = h.slice(Ft + 1, Vt)),
              Lt && (Nt = Nt.replace(l, " ")),
              de && (Nt = (0, a.default)(Nt) || Nt));
            const Jr = re(Nt, p);
            if (ce) {
              const Zr = qe[p];
              Zr === void 0
                ? lr > -1
                  ? (qe[p] = [Jr])
                  : (qe[p] = Jr)
                : Zr.pop
                  ? Zr.push(Jr)
                  : (qe[p] = [Zr, Jr]);
            } else qe[p] = Jr;
          }
          (Nt = ""),
            (Bt = Vt),
            (Ft = Vt),
            (B = !1),
            (de = !1),
            (pe = !1),
            (Lt = !1),
            (qt = !1),
            (Ut = !1),
            (lr = -1),
            (jt = Vt),
            (qe = ve),
            (Dt = void 0),
            (p = "");
        } else
          Gt === 93
            ? (ce && le === "bracket" && Qr === 91 && (lr = zr),
              J &&
                (F === "index" || Ve) &&
                Ft <= Bt &&
                (jt !== zr &&
                  ((A = d(h, jt + 1, Vt, pe, B)),
                  (p = ne(A)),
                  Dt !== void 0 && (qe = (0, r.getDeepObject)(qe, Dt, p, void 0, Ve)),
                  (Dt = p),
                  (pe = !1),
                  (B = !1)),
                (jt = Vt),
                (Ut = !0),
                (qt = !1)))
            : Gt === 46
              ? J &&
                (F === "dot" || Ve) &&
                Ft <= Bt &&
                (jt !== zr &&
                  ((A = d(h, jt + 1, Vt, pe, B)),
                  (p = ne(A)),
                  Dt !== void 0 && (qe = (0, r.getDeepObject)(qe, Dt, p, Ve)),
                  (Dt = p),
                  (pe = !1),
                  (B = !1)),
                (qt = !0),
                (Ut = !1),
                (jt = Vt))
              : Gt === 91
                ? J &&
                  (F === "index" || Ve) &&
                  Ft <= Bt &&
                  (jt !== zr &&
                    ((A = d(h, jt + 1, Vt, pe, B)),
                    (p = ne(A)),
                    Ve && Dt !== void 0 && (qe = (0, r.getDeepObject)(qe, Dt, p, Ve)),
                    (Dt = p),
                    (pe = !1),
                    (B = !1),
                    (qt = !1),
                    (Ut = !0)),
                  (jt = Vt))
                : Gt === 61
                  ? Ft <= Bt
                    ? (Ft = Vt)
                    : (de = !0)
                  : Gt === 43
                    ? Ft > Bt
                      ? (Lt = !0)
                      : (pe = !0)
                    : Gt === 37 && (Ft > Bt ? (de = !0) : (B = !0));
        (zr = Vt), (Qr = Gt);
      }
      return ve;
    }
    n(m, "parse");
  });
const ca = q((t) => {
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.stringify = r);
    const e = Vn();
    function r(o, a) {
      if (o === null || typeof o !== "object") return "";
      const i = a ?? {};
      return (0, e.stringifyObject)(o, i);
    }
    n(r, "stringify");
  });
const kt = q((t) => {
    const e =
        (t?.__createBinding) ||
        (Object.create
          ? (i, u, l, c) => {
              c === void 0 && (c = l);
              let d = Object.getOwnPropertyDescriptor(u, l);
              (!d || ("get" in d ? !u.__esModule : d.writable || d.configurable)) &&
                (d = { enumerable: !0, get: n(() => u[l], "get") }),
                Object.defineProperty(i, c, d);
            }
          : (i, u, l, c) => {
              c === void 0 && (c = l), (i[c] = u[l]);
            });
    const r =
        (t?.__exportStar) ||
        ((i, u) => {
          for (const l in i)
            l !== "default" && !Object.prototype.hasOwnProperty.call(u, l) && e(u, i, l);
        });
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.stringify = t.parse = void 0);
    const o = la();
    Object.defineProperty(t, "parse", { enumerable: !0, get: n(() => o.parse, "get") });
    const a = ca();
    Object.defineProperty(t, "stringify", { enumerable: !0, get: n(() => a.stringify, "get") }),
      r(It(), t);
  });
const Kn = q((t, e) => {
    e.exports = {
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      amp: "&",
      AMP: "&",
      andand: "⩕",
      And: "⩓",
      and: "∧",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angmsd: "∡",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      apacir: "⩯",
      ap: "≈",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      barwed: "⌅",
      Barwed: "⌆",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      because: "∵",
      Because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxdl: "┐",
      boxdL: "╕",
      boxDl: "╖",
      boxDL: "╗",
      boxdr: "┌",
      boxdR: "╒",
      boxDr: "╓",
      boxDR: "╔",
      boxh: "─",
      boxH: "═",
      boxhd: "┬",
      boxHd: "╤",
      boxhD: "╥",
      boxHD: "╦",
      boxhu: "┴",
      boxHu: "╧",
      boxhU: "╨",
      boxHU: "╩",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxul: "┘",
      boxuL: "╛",
      boxUl: "╜",
      boxUL: "╝",
      boxur: "└",
      boxuR: "╘",
      boxUr: "╙",
      boxUR: "╚",
      boxv: "│",
      boxV: "║",
      boxvh: "┼",
      boxvH: "╪",
      boxVh: "╫",
      boxVH: "╬",
      boxvl: "┤",
      boxvL: "╡",
      boxVl: "╢",
      boxVL: "╣",
      boxvr: "├",
      boxvR: "╞",
      boxVr: "╟",
      boxVR: "╠",
      bprime: "‵",
      breve: "˘",
      Breve: "˘",
      brvbar: "¦",
      bscr: "𝒷",
      Bscr: "ℬ",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsolb: "⧅",
      bsol: "\\",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      cap: "∩",
      Cap: "⋒",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      centerdot: "·",
      CenterDot: "·",
      cfr: "𝔠",
      Cfr: "ℭ",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cir: "○",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      colon: ":",
      Colon: "∷",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      conint: "∮",
      Conint: "∯",
      ContourIntegral: "∮",
      copf: "𝕔",
      Copf: "ℂ",
      coprod: "∐",
      Coproduct: "∐",
      copy: "©",
      COPY: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      cross: "✗",
      Cross: "⨯",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      cupbrcap: "⩈",
      cupcap: "⩆",
      CupCap: "≍",
      cup: "∪",
      Cup: "⋓",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      dagger: "†",
      Dagger: "‡",
      daleth: "ℸ",
      darr: "↓",
      Darr: "↡",
      dArr: "⇓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      ddagger: "‡",
      ddarr: "⇊",
      DD: "ⅅ",
      dd: "ⅆ",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      diamond: "⋄",
      Diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrowBar: "⤓",
      downarrow: "↓",
      DownArrow: "↓",
      Downarrow: "⇓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVectorBar: "⥖",
      DownLeftVector: "↽",
      DownRightTeeVector: "⥟",
      DownRightVectorBar: "⥗",
      DownRightVector: "⇁",
      DownTeeArrow: "↧",
      DownTee: "⊤",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      Ecirc: "Ê",
      ecirc: "ê",
      ecir: "≖",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      edot: "ė",
      eDot: "≑",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp13: " ",
      emsp14: " ",
      emsp: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      escr: "ℯ",
      Escr: "ℰ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      exponentiale: "ⅇ",
      ExponentialE: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      forall: "∀",
      ForAll: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      fscr: "𝒻",
      Fscr: "ℱ",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      ge: "≥",
      gE: "≧",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      gescc: "⪩",
      ges: "⩾",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      gg: "≫",
      Gg: "⋙",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gla: "⪥",
      gl: "≷",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gne: "⪈",
      gnE: "≩",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      gtcc: "⪧",
      gtcir: "⩺",
      gt: ">",
      GT: ">",
      Gt: "≫",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      harrcir: "⥈",
      harr: "↔",
      hArr: "⇔",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      hfr: "𝔥",
      Hfr: "ℌ",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      hopf: "𝕙",
      Hopf: "ℍ",
      horbar: "―",
      HorizontalLine: "─",
      hscr: "𝒽",
      Hscr: "ℋ",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      ifr: "𝔦",
      Ifr: "ℑ",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      Im: "ℑ",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      incare: "℅",
      in: "∈",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      intcal: "⊺",
      int: "∫",
      Int: "∬",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      iscr: "𝒾",
      Iscr: "ℐ",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      lang: "⟨",
      Lang: "⟪",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      larrb: "⇤",
      larrbfs: "⤟",
      larr: "←",
      Larr: "↞",
      lArr: "⇐",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      latail: "⤙",
      lAtail: "⤛",
      lat: "⪫",
      late: "⪭",
      lates: "⪭︀",
      lbarr: "⤌",
      lBarr: "⤎",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      le: "≤",
      lE: "≦",
      LeftAngleBracket: "⟨",
      LeftArrowBar: "⇤",
      leftarrow: "←",
      LeftArrow: "←",
      Leftarrow: "⇐",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVectorBar: "⥙",
      LeftDownVector: "⇃",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      leftrightarrow: "↔",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTeeArrow: "↤",
      LeftTee: "⊣",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangleBar: "⧏",
      LeftTriangle: "⊲",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVectorBar: "⥘",
      LeftUpVector: "↿",
      LeftVectorBar: "⥒",
      LeftVector: "↼",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      lescc: "⪨",
      les: "⩽",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      llarr: "⇇",
      ll: "≪",
      Ll: "⋘",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoustache: "⎰",
      lmoust: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lne: "⪇",
      lnE: "≨",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      longleftarrow: "⟵",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftrightarrow: "⟷",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longmapsto: "⟼",
      longrightarrow: "⟶",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      lscr: "𝓁",
      Lscr: "ℒ",
      lsh: "↰",
      Lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      ltcc: "⪦",
      ltcir: "⩹",
      lt: "<",
      LT: "<",
      Lt: "≪",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      midast: "*",
      midcir: "⫰",
      mid: "∣",
      middot: "·",
      minusb: "⊟",
      minus: "−",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      mscr: "𝓂",
      Mscr: "ℳ",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natural: "♮",
      naturals: "ℕ",
      natur: "♮",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      nearhk: "⤤",
      nearr: "↗",
      neArr: "⇗",
      nearrow: "↗",
      ne: "≠",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: `
`,
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nharr: "↮",
      nhArr: "⇎",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlarr: "↚",
      nlArr: "⇍",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nleftarrow: "↚",
      nLeftarrow: "⇍",
      nleftrightarrow: "↮",
      nLeftrightarrow: "⇎",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      nopf: "𝕟",
      Nopf: "ℕ",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangle: "⋪",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangle: "⋫",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      nparallel: "∦",
      npar: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      nprec: "⊀",
      npreceq: "⪯̸",
      npre: "⪯̸",
      nrarrc: "⤳̸",
      nrarr: "↛",
      nrArr: "⇏",
      nrarrw: "↝̸",
      nrightarrow: "↛",
      nRightarrow: "⇏",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nvdash: "⊬",
      nvDash: "⊭",
      nVdash: "⊮",
      nVDash: "⊯",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwarr: "↖",
      nwArr: "⇖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      Ocirc: "Ô",
      ocirc: "ô",
      ocir: "⊚",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      orarr: "↻",
      Or: "⩔",
      or: "∨",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      otimesas: "⨶",
      Otimes: "⨷",
      otimes: "⊗",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      para: "¶",
      parallel: "∥",
      par: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plus: "+",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      popf: "𝕡",
      Popf: "ℙ",
      pound: "£",
      prap: "⪷",
      Pr: "⪻",
      pr: "≺",
      prcue: "≼",
      precapprox: "⪷",
      prec: "≺",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      pre: "⪯",
      prE: "⪳",
      precsim: "≾",
      prime: "′",
      Prime: "″",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportional: "∝",
      Proportion: "∷",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      qopf: "𝕢",
      Qopf: "ℚ",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      quot: '"',
      QUOT: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      rang: "⟩",
      Rang: "⟫",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarr: "→",
      Rarr: "↠",
      rArr: "⇒",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      ratail: "⤚",
      rAtail: "⤜",
      ratio: "∶",
      rationals: "ℚ",
      rbarr: "⤍",
      rBarr: "⤏",
      RBarr: "⤐",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      Re: "ℜ",
      rect: "▭",
      reg: "®",
      REG: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      rfr: "𝔯",
      Rfr: "ℜ",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrowBar: "⇥",
      rightarrow: "→",
      RightArrow: "→",
      Rightarrow: "⇒",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVectorBar: "⥕",
      RightDownVector: "⇂",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTeeArrow: "↦",
      RightTee: "⊢",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangleBar: "⧐",
      RightTriangle: "⊳",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVectorBar: "⥔",
      RightUpVector: "↾",
      RightVectorBar: "⥓",
      RightVector: "⇀",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoustache: "⎱",
      rmoust: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      ropf: "𝕣",
      Ropf: "ℝ",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      rscr: "𝓇",
      Rscr: "ℛ",
      rsh: "↱",
      Rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      Sc: "⪼",
      sc: "≻",
      sccue: "≽",
      sce: "⪰",
      scE: "⪴",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdotb: "⊡",
      sdot: "⋅",
      sdote: "⩦",
      searhk: "⤥",
      searr: "↘",
      seArr: "⇘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      solbar: "⌿",
      solb: "⧄",
      sol: "/",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      square: "□",
      Square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squ: "□",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      sub: "⊂",
      Sub: "⋐",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      subset: "⊂",
      Subset: "⋐",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succapprox: "⪸",
      succ: "≻",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      sum: "∑",
      Sum: "∑",
      sung: "♪",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      sup: "⊃",
      Sup: "⋑",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      supset: "⊃",
      Supset: "⋑",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swarr: "↙",
      swArr: "⇙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      therefore: "∴",
      Therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      ThinSpace: " ",
      thinsp: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      tilde: "˜",
      Tilde: "∼",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      timesbar: "⨱",
      timesb: "⊠",
      times: "×",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      topbot: "⌶",
      topcir: "⫱",
      top: "⊤",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      trade: "™",
      TRADE: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      uarr: "↑",
      Uarr: "↟",
      uArr: "⇑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrowBar: "⤒",
      uparrow: "↑",
      UpArrow: "↑",
      Uparrow: "⇑",
      UpArrowDownArrow: "⇅",
      updownarrow: "↕",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      upsi: "υ",
      Upsi: "ϒ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTeeArrow: "↥",
      UpTee: "⊥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      varr: "↕",
      vArr: "⇕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      vBar: "⫨",
      Vbar: "⫫",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      vdash: "⊢",
      vDash: "⊨",
      Vdash: "⊩",
      VDash: "⊫",
      Vdashl: "⫦",
      veebar: "⊻",
      vee: "∨",
      Vee: "⋁",
      veeeq: "≚",
      vellip: "⋮",
      verbar: "|",
      Verbar: "‖",
      vert: "|",
      Vert: "‖",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      wedge: "∧",
      Wedge: "⋀",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xharr: "⟷",
      xhArr: "⟺",
      Xi: "Ξ",
      xi: "ξ",
      xlarr: "⟵",
      xlArr: "⟸",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrarr: "⟶",
      xrArr: "⟹",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      yuml: "ÿ",
      Yuml: "Ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      zfr: "𝔷",
      Zfr: "ℨ",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      zopf: "𝕫",
      Zopf: "ℤ",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌",
    };
  });
const ha = q((t, e) => {
    e.exports = {
      Aacute: "Á",
      aacute: "á",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      AElig: "Æ",
      aelig: "æ",
      Agrave: "À",
      agrave: "à",
      amp: "&",
      AMP: "&",
      Aring: "Å",
      aring: "å",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      brvbar: "¦",
      Ccedil: "Ç",
      ccedil: "ç",
      cedil: "¸",
      cent: "¢",
      copy: "©",
      COPY: "©",
      curren: "¤",
      deg: "°",
      divide: "÷",
      Eacute: "É",
      eacute: "é",
      Ecirc: "Ê",
      ecirc: "ê",
      Egrave: "È",
      egrave: "è",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      frac12: "½",
      frac14: "¼",
      frac34: "¾",
      gt: ">",
      GT: ">",
      Iacute: "Í",
      iacute: "í",
      Icirc: "Î",
      icirc: "î",
      iexcl: "¡",
      Igrave: "Ì",
      igrave: "ì",
      iquest: "¿",
      Iuml: "Ï",
      iuml: "ï",
      laquo: "«",
      lt: "<",
      LT: "<",
      macr: "¯",
      micro: "µ",
      middot: "·",
      nbsp: " ",
      not: "¬",
      Ntilde: "Ñ",
      ntilde: "ñ",
      Oacute: "Ó",
      oacute: "ó",
      Ocirc: "Ô",
      ocirc: "ô",
      Ograve: "Ò",
      ograve: "ò",
      ordf: "ª",
      ordm: "º",
      Oslash: "Ø",
      oslash: "ø",
      Otilde: "Õ",
      otilde: "õ",
      Ouml: "Ö",
      ouml: "ö",
      para: "¶",
      plusmn: "±",
      pound: "£",
      quot: '"',
      QUOT: '"',
      raquo: "»",
      reg: "®",
      REG: "®",
      sect: "§",
      shy: "­",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      szlig: "ß",
      THORN: "Þ",
      thorn: "þ",
      times: "×",
      Uacute: "Ú",
      uacute: "ú",
      Ucirc: "Û",
      ucirc: "û",
      Ugrave: "Ù",
      ugrave: "ù",
      uml: "¨",
      Uuml: "Ü",
      uuml: "ü",
      Yacute: "Ý",
      yacute: "ý",
      yen: "¥",
      yuml: "ÿ",
    };
  });
const Xn = q((t, e) => {
    e.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
  });
const ga = q((t, e) => {
    e.exports = {
      0: 65533,
      128: 8364,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      142: 381,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      158: 382,
      159: 376,
    };
  });
const ba = q((t) => {
    const e = (t?.__importDefault) || ((i) => (i?.__esModule ? i : { default: i }));
    Object.defineProperty(t, "__esModule", { value: !0 });
    const r = e(ga());
    const o =
        String.fromCodePoint ||
        ((i) => {
          let u = "";
          return (
            i > 65535 &&
              ((i -= 65536),
              (u += String.fromCharCode(((i >>> 10) & 1023) | 55296)),
              (i = 56320 | (i & 1023))),
            (u += String.fromCharCode(i)),
            u
          );
        });
    function a(i) {
      return (i >= 55296 && i <= 57343) || i > 1114111
        ? "�"
        : (i in r.default && (i = r.default[i]), o(i));
    }
    n(a, "decodeCodePoint"), (t.default = a);
  });
const Qn = q((t) => {
    const e = (t?.__importDefault) || ((m) => (m?.__esModule ? m : { default: m }));
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.decodeHTML = t.decodeHTMLStrict = t.decodeXML = void 0);
    const r = e(Kn());
    const o = e(ha());
    const a = e(Xn());
    const i = e(ba());
    const u = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
    (t.decodeXML = l(a.default)), (t.decodeHTMLStrict = l(r.default));
    function l(m) {
      const h = d(m);
      return (g) => String(g).replace(u, h);
    }
    n(l, "getStrictDecoder");
    const c = n((m, h) => (m < h ? 1 : -1), "sorter");
    t.decodeHTML = (() => {
      for (
        let m = Object.keys(o.default).sort(c), h = Object.keys(r.default).sort(c), g = 0, re = 0;
        g < h.length;
        g++
      )
        m[re] === h[g] ? ((h[g] += ";?"), re++) : (h[g] += ";");
      const ne = new RegExp(`&(?:${h.join("|")}|#[xX][\\da-fA-F]+;?|#\\d+;?)`, "g");
      const le = d(r.default);
      function J(ce) {
        return ce.substr(-1) !== ";" && (ce += ";"), le(ce);
      }
      return n(J, "replacer"), (ce) => String(ce).replace(ne, J);
    })();
    function d(m) {
      return n((h) => {
        if (h.charAt(1) === "#") {
          const g = h.charAt(2);
          return g === "X" || g === "x"
            ? i.default(Number.parseInt(h.substr(3), 16))
            : i.default(Number.parseInt(h.substr(2), 10));
        }
        return m[h.slice(1, -1)] || h;
      }, "replace");
    }
    n(d, "getReplacer");
  });
const es = q((t) => {
    const e = (t?.__importDefault) || ((F) => (F?.__esModule ? F : { default: F }));
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.escapeUTF8 = t.escape = t.encodeNonAsciiHTML = t.encodeHTML = t.encodeXML = void 0);
    const r = e(Xn());
    const o = c(r.default);
    const a = d(o);
    t.encodeXML = ce(o);
    const i = e(Kn());
    const u = c(i.default);
    const l = d(u);
    (t.encodeHTML = re(u, l)), (t.encodeNonAsciiHTML = ce(u));
    function c(F) {
      return Object.keys(F)
        .sort()
        .reduce((se, he) => ((se[F[he]] = `&${he};`), se), {});
    }
    n(c, "getInverseObj");
    function d(F) {
      for (let se = [], he = [], Ve = 0, ve = Object.keys(F); Ve < ve.length; Ve++) {
        const we = ve[Ve];
        we.length === 1 ? se.push(`\\${we}`) : he.push(we);
      }
      se.sort();
      for (let Nt = 0; Nt < se.length - 1; Nt++) {
        for (
          let Bt = Nt;
          Bt < se.length - 1 && se[Bt].charCodeAt(1) + 1 === se[Bt + 1].charCodeAt(1);
        )
          Bt += 1;
        const Ft = 1 + Bt - Nt;
        Ft < 3 || se.splice(Nt, Ft, `${se[Nt]}-${se[Bt]}`);
      }
      return he.unshift(`[${se.join("")}]`), new RegExp(he.join("|"), "g");
    }
    n(d, "getInverseReplacer");
    const m =
        /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
    const h =
        String.prototype.codePointAt != null
          ? (F) => F.codePointAt(0)
          : (F) => (F.charCodeAt(0) - 55296) * 1024 + F.charCodeAt(1) - 56320 + 65536;
    function g(F) {
      return `&#x${(F.length > 1 ? h(F) : F.charCodeAt(0)).toString(16).toUpperCase()};`;
    }
    n(g, "singleCharReplacer");
    function re(F, se) {
      return (he) => he.replace(se, (Ve) => F[Ve]).replace(m, g);
    }
    n(re, "getInverse");
    const ne = new RegExp(`${a.source}|${m.source}`, "g");
    function le(F) {
      return F.replace(ne, g);
    }
    n(le, "escape"), (t.escape = le);
    function J(F) {
      return F.replace(a, g);
    }
    n(J, "escapeUTF8"), (t.escapeUTF8 = J);
    function ce(F) {
      return (se) => se.replace(ne, (he) => F[he] || g(he));
    }
    n(ce, "getASCIIEncoder");
  });
const Da = q((t) => {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.decodeXMLStrict =
        t.decodeHTML5Strict =
        t.decodeHTML4Strict =
        t.decodeHTML5 =
        t.decodeHTML4 =
        t.decodeHTMLStrict =
        t.decodeHTML =
        t.decodeXML =
        t.encodeHTML5 =
        t.encodeHTML4 =
        t.escapeUTF8 =
        t.escape =
        t.encodeNonAsciiHTML =
        t.encodeHTML =
        t.encodeXML =
        t.encode =
        t.decodeStrict =
        t.decode =
          void 0);
    const e = Qn();
    const r = es();
    function o(c, d) {
      return (!d || d <= 0 ? e.decodeXML : e.decodeHTML)(c);
    }
    n(o, "decode"), (t.decode = o);
    function a(c, d) {
      return (!d || d <= 0 ? e.decodeXML : e.decodeHTMLStrict)(c);
    }
    n(a, "decodeStrict"), (t.decodeStrict = a);
    function i(c, d) {
      return (!d || d <= 0 ? r.encodeXML : r.encodeHTML)(c);
    }
    n(i, "encode"), (t.encode = i);
    const u = es();
    Object.defineProperty(t, "encodeXML", { enumerable: !0, get: n(() => u.encodeXML, "get") }),
      Object.defineProperty(t, "encodeHTML", { enumerable: !0, get: n(() => u.encodeHTML, "get") }),
      Object.defineProperty(t, "encodeNonAsciiHTML", {
        enumerable: !0,
        get: n(() => u.encodeNonAsciiHTML, "get"),
      }),
      Object.defineProperty(t, "escape", { enumerable: !0, get: n(() => u.escape, "get") }),
      Object.defineProperty(t, "escapeUTF8", { enumerable: !0, get: n(() => u.escapeUTF8, "get") }),
      Object.defineProperty(t, "encodeHTML4", {
        enumerable: !0,
        get: n(() => u.encodeHTML, "get"),
      }),
      Object.defineProperty(t, "encodeHTML5", {
        enumerable: !0,
        get: n(() => u.encodeHTML, "get"),
      });
    const l = Qn();
    Object.defineProperty(t, "decodeXML", { enumerable: !0, get: n(() => l.decodeXML, "get") }),
      Object.defineProperty(t, "decodeHTML", { enumerable: !0, get: n(() => l.decodeHTML, "get") }),
      Object.defineProperty(t, "decodeHTMLStrict", {
        enumerable: !0,
        get: n(() => l.decodeHTMLStrict, "get"),
      }),
      Object.defineProperty(t, "decodeHTML4", {
        enumerable: !0,
        get: n(() => l.decodeHTML, "get"),
      }),
      Object.defineProperty(t, "decodeHTML5", {
        enumerable: !0,
        get: n(() => l.decodeHTML, "get"),
      }),
      Object.defineProperty(t, "decodeHTML4Strict", {
        enumerable: !0,
        get: n(() => l.decodeHTMLStrict, "get"),
      }),
      Object.defineProperty(t, "decodeHTML5Strict", {
        enumerable: !0,
        get: n(() => l.decodeHTMLStrict, "get"),
      }),
      Object.defineProperty(t, "decodeXMLStrict", {
        enumerable: !0,
        get: n(() => l.decodeXML, "get"),
      });
  });
const Ha = q((t, e) => {
    function r(p, A) {
      if (!(p instanceof A)) throw new TypeError("Cannot call a class as a function");
    }
    n(r, "_classCallCheck");
    function o(p, A) {
      for (let B = 0; B < A.length; B++) {
        const de = A[B];
        (de.enumerable = de.enumerable || !1),
          (de.configurable = !0),
          "value" in de && (de.writable = !0),
          Object.defineProperty(p, de.key, de);
      }
    }
    n(o, "_defineProperties");
    function a(p, A, B) {
      return A && o(p.prototype, A), B && o(p, B), p;
    }
    n(a, "_createClass");
    function i(p, A) {
      let B = (typeof Symbol < "u" && p[Symbol.iterator]) || p["@@iterator"];
      if (!B) {
        if (Array.isArray(p) || (B = u(p)) || (A && p && typeof p.length === "number")) {
          B && (p = B);
          let de = 0;
          const pe = n(() => {}, "F");
          return {
            s: pe,
            n: n(() => (de >= p.length ? { done: !0 } : { done: !1, value: p[de++] }), "n"),
            e: n((Mt) => {
              throw Mt;
            }, "e"),
            f: pe,
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      let Lt = !0;
      let qt = !1;
      let Ut;
      return {
        s: n(() => {
          B = B.call(p);
        }, "s"),
        n: n(() => {
          const Mt = B.next();
          return (Lt = Mt.done), Mt;
        }, "n"),
        e: n((Mt) => {
          (qt = !0), (Ut = Mt);
        }, "e"),
        f: n(() => {
          try {
            !Lt && B.return != null && B.return();
          } finally {
            if (qt) throw Ut;
          }
        }, "f"),
      };
    }
    n(i, "_createForOfIteratorHelper");
    function u(p, A) {
      if (p) {
        if (typeof p === "string") return l(p, A);
        let B = Object.prototype.toString.call(p).slice(8, -1);
        if (
          (B === "Object" && p.constructor && (B = p.constructor.name), B === "Map" || B === "Set")
        )
          return Array.from(p);
        if (B === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(B)) return l(p, A);
      }
    }
    n(u, "_unsupportedIterableToArray");
    function l(p, A) {
      (A == null || A > p.length) && (A = p.length);
      for (let B = 0, de = new Array(A); B < A; B++) de[B] = p[B];
      return de;
    }
    n(l, "_arrayLikeToArray");
    const c = Da();
    const d = { fg: "#FFF", bg: "#000", newline: !1, escapeXML: !1, stream: !1, colors: m() };
    function m() {
      const p = {
        0: "#000",
        1: "#A00",
        2: "#0A0",
        3: "#A50",
        4: "#00A",
        5: "#A0A",
        6: "#0AA",
        7: "#AAA",
        8: "#555",
        9: "#F55",
        10: "#5F5",
        11: "#FF5",
        12: "#55F",
        13: "#F5F",
        14: "#5FF",
        15: "#FFF",
      };
      return (
        F(0, 5).forEach((A) => {
          F(0, 5).forEach((B) => {
            F(0, 5).forEach((de) => h(A, B, de, p));
          });
        }),
        F(0, 23).forEach((A) => {
          const B = A + 232;
          const de = g(A * 10 + 8);
          p[B] = `#${de}${de}${de}`;
        }),
        p
      );
    }
    n(m, "getDefaultColors");
    function h(p, A, B, de) {
      const pe = 16 + p * 36 + A * 6 + B;
      const Lt = p > 0 ? p * 40 + 55 : 0;
      const qt = A > 0 ? A * 40 + 55 : 0;
      const Ut = B > 0 ? B * 40 + 55 : 0;
      de[pe] = re([Lt, qt, Ut]);
    }
    n(h, "setStyleColor");
    function g(p) {
      for (let A = p.toString(16); A.length < 2; ) A = `0${A}`;
      return A;
    }
    n(g, "toHexString");
    function re(p) {
      const A = [];
      const B = i(p);
      let de;
      try {
        for (B.s(); !(de = B.n()).done; ) {
          const pe = de.value;
          A.push(g(pe));
        }
      } catch (Lt) {
        B.e(Lt);
      } finally {
        B.f();
      }
      return `#${A.join("")}`;
    }
    n(re, "toColorHexString");
    function ne(p, A, B, de) {
      let pe;
      return (
        A === "text"
          ? (pe = Ve(B, de))
          : A === "display"
            ? (pe = J(p, B, de))
            : A === "xterm256Foreground"
              ? (pe = Nt(p, de.colors[B]))
              : A === "xterm256Background"
                ? (pe = Bt(p, de.colors[B]))
                : A === "rgb" && (pe = le(p, B)),
        pe
      );
    }
    n(ne, "generateOutput");
    function le(p, A) {
      A = A.substring(2).slice(0, -1);
      const B = +A.substr(0, 2);
      const de = A.substring(5).split(";");
      const pe = de.map((Lt) => (`0${Number(Lt).toString(16)}`).substr(-2)).join("");
      return we(p, (B === 38 ? "color:#" : "background-color:#") + pe);
    }
    n(le, "handleRgb");
    function J(p, A, B) {
      A = Number.parseInt(A, 10);
      const de = {
          "-1": n(() => "<br/>", "_"),
          0: n(() => p.length && ce(p), "_"),
          1: n(() => ve(p, "b"), "_"),
          3: n(() => ve(p, "i"), "_"),
          4: n(() => ve(p, "u"), "_"),
          8: n(() => we(p, "display:none"), "_"),
          9: n(() => ve(p, "strike"), "_"),
          22: n(() => we(p, "font-weight:normal;text-decoration:none;font-style:normal"), "_"),
          23: n(() => Ft(p, "i"), "_"),
          24: n(() => Ft(p, "u"), "_"),
          39: n(() => Nt(p, B.fg), "_"),
          49: n(() => Bt(p, B.bg), "_"),
          53: n(() => we(p, "text-decoration:overline"), "_"),
        };
      let pe;
      return (
        de[A]
          ? (pe = de[A]())
          : 4 < A && A < 7
            ? (pe = ve(p, "blink"))
            : 29 < A && A < 38
              ? (pe = Nt(p, B.colors[A - 30]))
              : 39 < A && A < 48
                ? (pe = Bt(p, B.colors[A - 40]))
                : 89 < A && A < 98
                  ? (pe = Nt(p, B.colors[8 + (A - 90)]))
                  : 99 < A && A < 108 && (pe = Bt(p, B.colors[8 + (A - 100)])),
        pe
      );
    }
    n(J, "handleDisplay");
    function ce(p) {
      const A = p.slice(0);
      return (
        (p.length = 0),
        A.reverse()
          .map((B) => `</${B}>`)
          .join("")
      );
    }
    n(ce, "resetStyles");
    function F(p, A) {
      for (let B = [], de = p; de <= A; de++) B.push(de);
      return B;
    }
    n(F, "range");
    function se(p) {
      return (A) => (p === null || A.category !== p) && p !== "all";
    }
    n(se, "notCategory");
    function he(p) {
      p = Number.parseInt(p, 10);
      let A = null;
      return (
        p === 0
          ? (A = "all")
          : p === 1
            ? (A = "bold")
            : 2 < p && p < 5
              ? (A = "underline")
              : 4 < p && p < 7
                ? (A = "blink")
                : p === 8
                  ? (A = "hide")
                  : p === 9
                    ? (A = "strike")
                    : (29 < p && p < 38) || p === 39 || (89 < p && p < 98)
                      ? (A = "foreground-color")
                      : ((39 < p && p < 48) || p === 49 || (99 < p && p < 108)) &&
                        (A = "background-color"),
        A
      );
    }
    n(he, "categoryForCode");
    function Ve(p, A) {
      return A.escapeXML ? c.encodeXML(p) : p;
    }
    n(Ve, "pushText");
    function ve(p, A, B) {
      return (
        B || (B = ""), p.push(A), "<".concat(A).concat(B ? ' style="'.concat(B, '"') : "", ">")
      );
    }
    n(ve, "pushTag");
    function we(p, A) {
      return ve(p, "span", A);
    }
    n(we, "pushStyle");
    function Nt(p, A) {
      return ve(p, "span", `color:${A}`);
    }
    n(Nt, "pushForegroundColor");
    function Bt(p, A) {
      return ve(p, "span", `background-color:${A}`);
    }
    n(Bt, "pushBackgroundColor");
    function Ft(p, A) {
      let B;
      if ((p.slice(-1)[0] === A && (B = p.pop()), B)) return `</${A}>`;
    }
    n(Ft, "closeTag");
    function jt(p, A, B) {
      let de = !1;
      const pe = 3;
      function Lt() {
        return "";
      }
      n(Lt, "remove");
      function qt(Kr, Xr) {
        return B("xterm256Foreground", Xr), "";
      }
      n(qt, "removeXterm256Foreground");
      function Ut(Kr, Xr) {
        return B("xterm256Background", Xr), "";
      }
      n(Ut, "removeXterm256Background");
      function Mt(Kr) {
        return A.newline ? B("display", -1) : B("text", Kr), "";
      }
      n(Mt, "newline");
      function Gt(Kr, Xr) {
        (de = !0), Xr.trim().length === 0 && (Xr = "0"), (Xr = Xr.trimRight(";").split(";"));
        const Bn = i(Xr);
        let zn;
        try {
          for (Bn.s(); !(zn = Bn.n()).done; ) {
            const is = zn.value;
            B("display", is);
          }
        } catch (ys) {
          Bn.e(ys);
        } finally {
          Bn.f();
        }
        return "";
      }
      n(Gt, "ansiMess");
      function lr(Kr) {
        return B("text", Kr), "";
      }
      n(lr, "realText");
      function zr(Kr) {
        return B("rgb", Kr), "";
      }
      n(zr, "rgb");
      const Qr = [
        { pattern: /^\x08+/, sub: Lt },
        { pattern: /^\x1b\[[012]?K/, sub: Lt },
        { pattern: /^\x1b\[\(B/, sub: Lt },
        { pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/, sub: zr },
        { pattern: /^\x1b\[38;5;(\d+)m/, sub: qt },
        { pattern: /^\x1b\[48;5;(\d+)m/, sub: Ut },
        { pattern: /^\n/, sub: Mt },
        { pattern: /^\r+\n/, sub: Mt },
        { pattern: /^\r/, sub: Mt },
        { pattern: /^\x1b\[((?:\d{1,3};?)+|)m/, sub: Gt },
        { pattern: /^\x1b\[\d?J/, sub: Lt },
        { pattern: /^\x1b\[\d{0,3};\d{0,3}f/, sub: Lt },
        { pattern: /^\x1b\[?[\d;]{0,3}/, sub: Lt },
        { pattern: /^(([^\x1b\x08\r\n])+)/, sub: lr },
      ];
      function Vt(Kr, Xr) {
        (Xr > pe && de) || ((de = !1), (p = p.replace(Kr.pattern, Kr.sub)));
      }
      n(Vt, "process");
      const Jr = [];
      const Zr = p;
      let Tn = Zr.length;
      e: while (Tn > 0) {
        for (let Gn = 0, Hn = 0, So = Qr.length; Hn < So; Gn = ++Hn) {
          const as = Qr[Gn];
          if ((Vt(as, Gn), p.length !== Tn)) {
            Tn = p.length;
            continue e;
          }
        }
        if (p.length === Tn) break;
        Jr.push(0), (Tn = p.length);
      }
      return Jr;
    }
    n(jt, "tokenize");
    function qe(p, A, B) {
      return (
        A !== "text" && ((p = p.filter(se(he(B)))), p.push({ token: A, data: B, category: he(B) })),
        p
      );
    }
    n(qe, "updateStickyStack");
    const Dt = (() => {
      function p(A) {
        r(this, p),
          (A = A || {}),
          A.colors && (A.colors = Object.assign({}, d.colors, A.colors)),
          (this.options = Object.assign({}, d, A)),
          (this.stack = []),
          (this.stickyStack = []);
      }
      return (
        n(p, "Filter"),
        a(p, [
          {
            key: "toHtml",
            value: n(function (A) {
              A = typeof A === "string" ? [A] : A;
              const de = this.stack;
              const pe = this.options;
              const Lt = [];
              return (
                this.stickyStack.forEach((qt) => {
                  const Ut = ne(de, qt.token, qt.data, pe);
                  Ut && Lt.push(Ut);
                }),
                jt(A.join(""), pe, (qt, Ut) => {
                  const Mt = ne(de, qt, Ut, pe);
                  Mt && Lt.push(Mt), pe.stream && (this.stickyStack = qe(this.stickyStack, qt, Ut));
                }),
                de.length && Lt.push(ce(de)),
                Lt.join("")
              );
            }, "toHtml"),
          },
        ]),
        p
      );
    })();
    e.exports = Dt;
  });
const Za = q((t, e) => {
    ((r, o) => {
      typeof t === "object" && typeof e < "u"
        ? (e.exports = o())
        : typeof define === "function" && define.amd
          ? define(o)
          : ((r = typeof globalThis < "u" ? globalThis : r || self).BrowserDetector = o());
    })(t, () => {
      function r(c, d) {
        for (let m = 0; m < d.length; m++) {
          const h = d[m];
          (h.enumerable = h.enumerable || !1),
            (h.configurable = !0),
            "value" in h && (h.writable = !0),
            Object.defineProperty(
              c,
              ((g = h.key),
              (re = void 0),
              typeof (re = ((ne, le) => {
                if (typeof ne !== "object" || ne === null) return ne;
                const J = ne[Symbol.toPrimitive];
                if (J !== void 0) {
                  const ce = J.call(ne, le);
                  if (typeof ce !== "object") return ce;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return (le === "string" ? String : Number)(ne);
              })(g, "string")) === "symbol"
                ? re
                : String(re)),
              h,
            );
        }
        let g;
        let re;
      }
      n(r, "e");
      const o = {
          chrome: "Google Chrome",
          brave: "Brave",
          crios: "Google Chrome",
          edge: "Microsoft Edge",
          edg: "Microsoft Edge",
          edgios: "Microsoft Edge",
          fennec: "Mozilla Firefox",
          jsdom: "JsDOM",
          mozilla: "Mozilla Firefox",
          fxios: "Mozilla Firefox",
          msie: "Microsoft Internet Explorer",
          opera: "Opera",
          opios: "Opera",
          opr: "Opera",
          opt: "Opera",
          rv: "Microsoft Internet Explorer",
          safari: "Safari",
          samsungbrowser: "Samsung Browser",
          electron: "Electron",
        };
      const a = {
          android: "Android",
          androidTablet: "Android Tablet",
          cros: "Chrome OS",
          fennec: "Android Tablet",
          ipad: "IPad",
          iphone: "IPhone",
          jsdom: "JsDOM",
          linux: "Linux",
          mac: "Macintosh",
          tablet: "Android Tablet",
          win: "Windows",
          "windows phone": "Windows Phone",
          xbox: "Microsoft Xbox",
        };
      const i = n((c) => {
          const d = new RegExp(
              "^-?\\d+(?:.\\d{0,".concat(
                arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1,
                "})?",
              ),
            );
          const m = Number(c).toString().match(d);
          return m ? m[0] : null;
        }, "n");
      const u = n(() => (typeof window < "u" ? window.navigator : null), "i");
      const l = (() => {
          function c(g) {
            let re;
            ((ne, le) => {
              if (!(ne instanceof le)) throw new TypeError("Cannot call a class as a function");
            })(this, c),
              (this.userAgent =
                g || ((re = u()) === null || re === void 0 ? void 0 : re.userAgent) || null);
          }
          n(c, "t");
          let d;
          let m;
          let h;
          return (
            (d = c),
            (m = [
              {
                key: "parseUserAgent",
                value: n(function (g) {
                  let re;
                  let ne;
                  let le;
                  const J = {};
                  const ce = g || this.userAgent || "";
                  const F = ce.toLowerCase().replace(/\s\s+/g, " ");
                  const se =
                      /(edge)\/([\w.]+)/.exec(F) ||
                      /(edg)[/]([\w.]+)/.exec(F) ||
                      /(opr)[/]([\w.]+)/.exec(F) ||
                      /(opt)[/]([\w.]+)/.exec(F) ||
                      /(fxios)[/]([\w.]+)/.exec(F) ||
                      /(edgios)[/]([\w.]+)/.exec(F) ||
                      /(jsdom)[/]([\w.]+)/.exec(F) ||
                      /(samsungbrowser)[/]([\w.]+)/.exec(F) ||
                      /(electron)[/]([\w.]+)/.exec(F) ||
                      /(chrome)[/]([\w.]+)/.exec(F) ||
                      /(crios)[/]([\w.]+)/.exec(F) ||
                      /(opios)[/]([\w.]+)/.exec(F) ||
                      /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(F) ||
                      /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(F) ||
                      /(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(F) ||
                      /(webkit)[/]([\w.]+)/.exec(F) ||
                      /(opera)(?:.*version|)[/]([\w.]+)/.exec(F) ||
                      /(msie) ([\w.]+)/.exec(F) ||
                      /(fennec)[/]([\w.]+)/.exec(F) ||
                      (F.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(F)) ||
                      (F.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(F)) ||
                      [];
                  const he =
                      /(ipad)/.exec(F) ||
                      /(ipod)/.exec(F) ||
                      /(iphone)/.exec(F) ||
                      /(jsdom)/.exec(F) ||
                      /(windows phone)/.exec(F) ||
                      /(xbox)/.exec(F) ||
                      /(win)/.exec(F) ||
                      /(tablet)/.exec(F) ||
                      (/(android)/.test(F) && /(mobile)/.test(F) === !1 && ["androidTablet"]) ||
                      /(android)/.exec(F) ||
                      /(mac)/.exec(F) ||
                      /(linux)/.exec(F) ||
                      /(cros)/.exec(F) ||
                      [];
                  let Ve = se[5] || se[3] || se[1] || null;
                  const ve = he[0] || null;
                  const we = se[4] || se[2] || null;
                  const Nt = u();
                  Ve === "chrome" &&
                    typeof (Nt == null || (re = Nt.brave) === null || re === void 0
                      ? void 0
                      : re.isBrave) === "function" &&
                    (Ve = "brave"),
                    Ve && (J[Ve] = !0),
                    ve && (J[ve] = !0);
                  const Bt = !!(J.tablet || J.android || J.androidTablet);
                  const Ft = !!(J.ipad || J.tablet || J.androidTablet);
                  const jt = !!(
                      J.android ||
                      J.androidTablet ||
                      J.tablet ||
                      J.ipad ||
                      J.ipod ||
                      J.iphone ||
                      J["windows phone"]
                    );
                  const qe = !!(J.cros || J.mac || J.linux || J.win);
                  const Dt = !!(
                      J.brave ||
                      J.chrome ||
                      J.crios ||
                      J.opr ||
                      J.safari ||
                      J.edg ||
                      J.electron
                    );
                  const p = !!(J.msie || J.rv);
                  return {
                    name: (ne = o[Ve]) !== null && ne !== void 0 ? ne : null,
                    platform: (le = a[ve]) !== null && le !== void 0 ? le : null,
                    userAgent: ce,
                    version: we,
                    shortVersion: we ? i(Number.parseFloat(we), 2) : null,
                    isAndroid: Bt,
                    isTablet: Ft,
                    isMobile: jt,
                    isDesktop: qe,
                    isWebkit: Dt,
                    isIE: p,
                  };
                }, "value"),
              },
              {
                key: "getBrowserInfo",
                value: n(function () {
                  const g = this.parseUserAgent();
                  return {
                    name: g.name,
                    platform: g.platform,
                    userAgent: g.userAgent,
                    version: g.version,
                    shortVersion: g.shortVersion,
                  };
                }, "value"),
              },
            ]),
            (h = [{ key: "VERSION", get: n(() => "3.4.0", "get") }]),
            m && r(d.prototype, m),
            h && r(d, h),
            Object.defineProperty(d, "prototype", { writable: !1 }),
            c
          );
        })();
      return l;
    });
  });
const Ht = {};
_e(Ht, { global: () => E$1 });
const E$1 = (() => {
    let t;
    return (
      typeof window < "u"
        ? (t = window)
        : typeof globalThis < "u"
          ? (t = globalThis)
          : typeof global < "u"
            ? (t = global)
            : typeof self < "u"
              ? (t = self)
              : (t = {}),
      t
    );
  })();
const ge = {};
_e(ge, {
  ARGTYPES_INFO_REQUEST: () => fo,
  ARGTYPES_INFO_RESPONSE: () => nt,
  CHANNEL_CREATED: () => cl,
  CHANNEL_WS_DISCONNECT: () => Wt,
  CONFIG_ERROR: () => $t,
  CREATE_NEW_STORYFILE_REQUEST: () => pl,
  CREATE_NEW_STORYFILE_RESPONSE: () => dl,
  CURRENT_STORY_WAS_SET: () => rt,
  DOCS_PREPARED: () => Yt,
  DOCS_RENDERED: () => pr,
  FILE_COMPONENT_SEARCH_REQUEST: () => ul,
  FILE_COMPONENT_SEARCH_RESPONSE: () => fl,
  FORCE_REMOUNT: () => Kt,
  FORCE_RE_RENDER: () => dr,
  GLOBALS_UPDATED: () => Ce,
  NAVIGATE_URL: () => yl,
  PLAY_FUNCTION_THREW_EXCEPTION: () => Xt,
  PRELOAD_ENTRIES: () => Qt,
  PREVIEW_BUILDER_PROGRESS: () => ml,
  PREVIEW_KEYDOWN: () => Zt,
  REGISTER_SUBSCRIPTION: () => hl,
  REQUEST_WHATS_NEW_DATA: () => wl,
  RESET_STORY_ARGS: () => ur,
  RESULT_WHATS_NEW_DATA: () => _l,
  SAVE_STORY_REQUEST: () => Ol,
  SAVE_STORY_RESPONSE: () => Il,
  SELECT_STORY: () => gl,
  SET_CONFIG: () => Sl,
  SET_CURRENT_STORY: () => eo,
  SET_FILTER: () => bl,
  SET_GLOBALS: () => ro,
  SET_INDEX: () => Tl,
  SET_STORIES: () => El,
  SET_WHATS_NEW_CACHE: () => Cl,
  SHARED_STATE_CHANGED: () => Rl,
  SHARED_STATE_SET: () => Al,
  STORIES_COLLAPSE_ALL: () => xl,
  STORIES_EXPAND_ALL: () => vl,
  STORY_ARGS_UPDATED: () => to,
  STORY_CHANGED: () => oo,
  STORY_ERRORED: () => no,
  STORY_FINISHED: () => ot,
  STORY_INDEX_INVALIDATED: () => so,
  STORY_MISSING: () => tt,
  STORY_PREPARED: () => io,
  STORY_RENDERED: () => We,
  STORY_RENDER_PHASE_CHANGED: () => Pe,
  STORY_SPECIFIED: () => ao,
  STORY_THREW_EXCEPTION: () => lo,
  STORY_UNCHANGED: () => co,
  TELEMETRY_ERROR: () => uo,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: () => Ll,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: () => jl,
  TESTING_MODULE_CRASH_REPORT: () => Fl,
  TESTING_MODULE_PROGRESS_REPORT: () => Dl,
  TESTING_MODULE_RUN_ALL_REQUEST: () => kl,
  TESTING_MODULE_RUN_REQUEST: () => Nl,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: () => Pl,
  UNHANDLED_ERRORS_WHILE_PLAYING: () => Jt,
  UPDATE_GLOBALS: () => fr,
  UPDATE_QUERY_PARAMS: () => po,
  UPDATE_STORY_ARGS: () => yr,
  default: () => ll,
});
const zt = ((t) => (
    (t.CHANNEL_WS_DISCONNECT = "channelWSDisconnect"),
    (t.CHANNEL_CREATED = "channelCreated"),
    (t.CONFIG_ERROR = "configError"),
    (t.STORY_INDEX_INVALIDATED = "storyIndexInvalidated"),
    (t.STORY_SPECIFIED = "storySpecified"),
    (t.SET_CONFIG = "setConfig"),
    (t.SET_STORIES = "setStories"),
    (t.SET_INDEX = "setIndex"),
    (t.SET_CURRENT_STORY = "setCurrentStory"),
    (t.CURRENT_STORY_WAS_SET = "currentStoryWasSet"),
    (t.FORCE_RE_RENDER = "forceReRender"),
    (t.FORCE_REMOUNT = "forceRemount"),
    (t.PRELOAD_ENTRIES = "preloadStories"),
    (t.STORY_PREPARED = "storyPrepared"),
    (t.DOCS_PREPARED = "docsPrepared"),
    (t.STORY_CHANGED = "storyChanged"),
    (t.STORY_UNCHANGED = "storyUnchanged"),
    (t.STORY_RENDERED = "storyRendered"),
    (t.STORY_FINISHED = "storyFinished"),
    (t.STORY_MISSING = "storyMissing"),
    (t.STORY_ERRORED = "storyErrored"),
    (t.STORY_THREW_EXCEPTION = "storyThrewException"),
    (t.STORY_RENDER_PHASE_CHANGED = "storyRenderPhaseChanged"),
    (t.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException"),
    (t.UNHANDLED_ERRORS_WHILE_PLAYING = "unhandledErrorsWhilePlaying"),
    (t.UPDATE_STORY_ARGS = "updateStoryArgs"),
    (t.STORY_ARGS_UPDATED = "storyArgsUpdated"),
    (t.RESET_STORY_ARGS = "resetStoryArgs"),
    (t.SET_FILTER = "setFilter"),
    (t.SET_GLOBALS = "setGlobals"),
    (t.UPDATE_GLOBALS = "updateGlobals"),
    (t.GLOBALS_UPDATED = "globalsUpdated"),
    (t.REGISTER_SUBSCRIPTION = "registerSubscription"),
    (t.PREVIEW_KEYDOWN = "previewKeydown"),
    (t.PREVIEW_BUILDER_PROGRESS = "preview_builder_progress"),
    (t.SELECT_STORY = "selectStory"),
    (t.STORIES_COLLAPSE_ALL = "storiesCollapseAll"),
    (t.STORIES_EXPAND_ALL = "storiesExpandAll"),
    (t.DOCS_RENDERED = "docsRendered"),
    (t.SHARED_STATE_CHANGED = "sharedStateChanged"),
    (t.SHARED_STATE_SET = "sharedStateSet"),
    (t.NAVIGATE_URL = "navigateUrl"),
    (t.UPDATE_QUERY_PARAMS = "updateQueryParams"),
    (t.REQUEST_WHATS_NEW_DATA = "requestWhatsNewData"),
    (t.RESULT_WHATS_NEW_DATA = "resultWhatsNewData"),
    (t.SET_WHATS_NEW_CACHE = "setWhatsNewCache"),
    (t.TOGGLE_WHATS_NEW_NOTIFICATIONS = "toggleWhatsNewNotifications"),
    (t.TELEMETRY_ERROR = "telemetryError"),
    (t.FILE_COMPONENT_SEARCH_REQUEST = "fileComponentSearchRequest"),
    (t.FILE_COMPONENT_SEARCH_RESPONSE = "fileComponentSearchResponse"),
    (t.SAVE_STORY_REQUEST = "saveStoryRequest"),
    (t.SAVE_STORY_RESPONSE = "saveStoryResponse"),
    (t.ARGTYPES_INFO_REQUEST = "argtypesInfoRequest"),
    (t.ARGTYPES_INFO_RESPONSE = "argtypesInfoResponse"),
    (t.CREATE_NEW_STORYFILE_REQUEST = "createNewStoryfileRequest"),
    (t.CREATE_NEW_STORYFILE_RESPONSE = "createNewStoryfileResponse"),
    (t.TESTING_MODULE_CRASH_REPORT = "testingModuleCrashReport"),
    (t.TESTING_MODULE_PROGRESS_REPORT = "testingModuleProgressReport"),
    (t.TESTING_MODULE_RUN_REQUEST = "testingModuleRunRequest"),
    (t.TESTING_MODULE_RUN_ALL_REQUEST = "testingModuleRunAllRequest"),
    (t.TESTING_MODULE_CANCEL_TEST_RUN_REQUEST = "testingModuleCancelTestRunRequest"),
    (t.TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE = "testingModuleCancelTestRunResponse"),
    t
  ))(zt || {});
const ll = zt;
const {
    CHANNEL_WS_DISCONNECT: Wt,
    CHANNEL_CREATED: cl,
    CONFIG_ERROR: $t,
    CREATE_NEW_STORYFILE_REQUEST: pl,
    CREATE_NEW_STORYFILE_RESPONSE: dl,
    CURRENT_STORY_WAS_SET: rt,
    DOCS_PREPARED: Yt,
    DOCS_RENDERED: pr,
    FILE_COMPONENT_SEARCH_REQUEST: ul,
    FILE_COMPONENT_SEARCH_RESPONSE: fl,
    FORCE_RE_RENDER: dr,
    FORCE_REMOUNT: Kt,
    GLOBALS_UPDATED: Ce,
    NAVIGATE_URL: yl,
    PLAY_FUNCTION_THREW_EXCEPTION: Xt,
    UNHANDLED_ERRORS_WHILE_PLAYING: Jt,
    PRELOAD_ENTRIES: Qt,
    PREVIEW_BUILDER_PROGRESS: ml,
    PREVIEW_KEYDOWN: Zt,
    REGISTER_SUBSCRIPTION: hl,
    RESET_STORY_ARGS: ur,
    SELECT_STORY: gl,
    SET_CONFIG: Sl,
    SET_CURRENT_STORY: eo,
    SET_FILTER: bl,
    SET_GLOBALS: ro,
    SET_INDEX: Tl,
    SET_STORIES: El,
    SHARED_STATE_CHANGED: Rl,
    SHARED_STATE_SET: Al,
    STORIES_COLLAPSE_ALL: xl,
    STORIES_EXPAND_ALL: vl,
    STORY_ARGS_UPDATED: to,
    STORY_CHANGED: oo,
    STORY_ERRORED: no,
    STORY_INDEX_INVALIDATED: so,
    STORY_MISSING: tt,
    STORY_PREPARED: io,
    STORY_RENDER_PHASE_CHANGED: Pe,
    STORY_RENDERED: We,
    STORY_FINISHED: ot,
    STORY_SPECIFIED: ao,
    STORY_THREW_EXCEPTION: lo,
    STORY_UNCHANGED: co,
    UPDATE_GLOBALS: fr,
    UPDATE_QUERY_PARAMS: po,
    UPDATE_STORY_ARGS: yr,
    REQUEST_WHATS_NEW_DATA: wl,
    RESULT_WHATS_NEW_DATA: _l,
    SET_WHATS_NEW_CACHE: Cl,
    TOGGLE_WHATS_NEW_NOTIFICATIONS: Pl,
    TELEMETRY_ERROR: uo,
    SAVE_STORY_REQUEST: Ol,
    SAVE_STORY_RESPONSE: Il,
    ARGTYPES_INFO_REQUEST: fo,
    ARGTYPES_INFO_RESPONSE: nt,
    TESTING_MODULE_CRASH_REPORT: Fl,
    TESTING_MODULE_PROGRESS_REPORT: Dl,
    TESTING_MODULE_RUN_REQUEST: Nl,
    TESTING_MODULE_RUN_ALL_REQUEST: kl,
    TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: Ll,
    TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: jl,
  } = zt;
const yo = {
    "@storybook/global": "__STORYBOOK_MODULE_GLOBAL__",
    "storybook/internal/channels": "__STORYBOOK_MODULE_CHANNELS__",
    "@storybook/channels": "__STORYBOOK_MODULE_CHANNELS__",
    "@storybook/core/channels": "__STORYBOOK_MODULE_CHANNELS__",
    "storybook/internal/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
    "@storybook/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
    "@storybook/core/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
    "storybook/internal/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
    "@storybook/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
    "@storybook/core/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
    "storybook/internal/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
    "@storybook/core-events/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
    "@storybook/core/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
    "storybook/internal/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
    "@storybook/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
    "@storybook/core/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
    "storybook/internal/types": "__STORYBOOK_MODULE_TYPES__",
    "@storybook/types": "__STORYBOOK_MODULE_TYPES__",
    "@storybook/core/types": "__STORYBOOK_MODULE_TYPES__",
  };
const cs = Object.keys(yo);
const br = {};
_e(br, {
  Channel: () => ie,
  HEARTBEAT_INTERVAL: () => Po,
  HEARTBEAT_MAX_LATENCY: () => Oo,
  PostMessageTransport: () => Qe,
  WebsocketTransport: () => Ze,
  createBrowserChannel: () => kd,
  default: () => Nd,
});
function _$1(t) {
  for (let e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
  let o = Array.from(typeof t === "string" ? [t] : t);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, "");
  const a = o.reduce((l, c) => {
    const d = c.match(/\n([\t ]+|(?!\s).)/g);
    return d
      ? l.concat(
          d.map((m) => {
            let h;
            let g;
            return (g = (h = m.match(/[\t ]/g)) === null || h === void 0 ? void 0 : h.length) !==
              null && g !== void 0
              ? g
              : 0;
          }),
        )
      : l;
  }, []);
  if (a.length) {
    const i = new RegExp(
      `
[	 ]{${Math.min.apply(Math, a)}}`,
      "g",
    );
    o = o.map((l) =>
      l.replace(
        i,
        `
`,
      ),
    );
  }
  o[0] = o[0].replace(/^\r?\n/, "");
  let u = o[0];
  return (
    e.forEach((l, c) => {
      const d = u.match(/(?:^|\n)( *)$/);
      const m = d ? d[1] : "";
      let h = l;
      typeof l === "string" &&
        l.includes(`
`) &&
        (h = String(l)
          .split(`
`)
          .map((g, re) => (re === 0 ? g : `${m}${g}`))
          .join(`
`)),
        (u += h + o[c + 1]);
    }),
    u
  );
}
n(_$1, "dedent");
const ps = _$1;
const mo = new Map();
const Ml = "UNIVERSAL_STORE:";
const ee = { PENDING: "PENDING", RESOLVED: "RESOLVED", REJECTED: "REJECTED" };
const w = class Ge {
    constructor(e, r) {
      if (
        ((this.debugging = !1),
        (this.listeners = new Map([["*", new Set()]])),
        (this.getState = n(
          () => (this.debug("getState", { state: this.state }), this.state),
          "getState",
        )),
        (this.subscribe = n((o, a) => {
          const i = typeof o === "function";
          const u = i ? "*" : o;
          const l = i ? o : a;
          if ((this.debug("subscribe", { eventType: u, listener: l }), !l))
            throw new TypeError(
              `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`,
            );
          return (
            this.listeners.has(u) || this.listeners.set(u, new Set()),
            this.listeners.get(u).add(l),
            () => {
              let c;
              this.debug("unsubscribe", { eventType: u, listener: l }),
                this.listeners.has(u) &&
                  (this.listeners.get(u).delete(l),
                  ((c = this.listeners.get(u)) == null ? void 0 : c.size) === 0 &&
                    this.listeners.delete(u));
            }
          );
        }, "subscribe")),
        (this.send = n((o) => {
          if ((this.debug("send", { event: o }), this.status !== Ge.Status.READY))
            throw new TypeError(_$1`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({ event: o, id: this.id, actor: this.actor, environment: this.environment }, null, 2)}`);
          this.emitToListeners(o, { actor: this.actor }),
            this.emitToChannel(o, { actor: this.actor });
        }, "send")),
        (this.debugging = e.debug ?? !1),
        !Ge.isInternalConstructing)
      )
        throw new TypeError(
          "UniversalStore is not constructable - use UniversalStore.create() instead",
        );
      if (
        ((Ge.isInternalConstructing = !1),
        (this.id = e.id),
        (this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2)),
        (this.actorType = e.leader ? Ge.ActorType.LEADER : Ge.ActorType.FOLLOWER),
        (this.state = e.initialState),
        (this.channelEventName = `${Ml}${this.id}`),
        this.debug("constructor", {
          options: e,
          environmentOverrides: r,
          channelEventName: this.channelEventName,
        }),
        this.actor.type === Ge.ActorType.LEADER)
      )
        this.syncing = { state: ee.RESOLVED, promise: Promise.resolve() };
      else {
        let o;
        let a;
        const i = new Promise((u, l) => {
            (o = n(() => {
              this.syncing.state === ee.PENDING && ((this.syncing.state = ee.RESOLVED), u());
            }, "syncingResolve")),
              (a = n((c) => {
                this.syncing.state === ee.PENDING && ((this.syncing.state = ee.REJECTED), l(c));
              }, "syncingReject"));
          });
        this.syncing = { state: ee.PENDING, promise: i, resolve: o, reject: a };
      }
      (this.getState = this.getState.bind(this)),
        (this.setState = this.setState.bind(this)),
        (this.subscribe = this.subscribe.bind(this)),
        (this.onStateChange = this.onStateChange.bind(this)),
        (this.send = this.send.bind(this)),
        (this.emitToChannel = this.emitToChannel.bind(this)),
        (this.prepareThis = this.prepareThis.bind(this)),
        (this.emitToListeners = this.emitToListeners.bind(this)),
        (this.handleChannelEvents = this.handleChannelEvents.bind(this)),
        (this.debug = this.debug.bind(this)),
        (this.channel = (r == null ? void 0 : r.channel) ?? Ge.preparation.channel),
        (this.environment = (r == null ? void 0 : r.environment) ?? Ge.preparation.environment),
        this.channel && this.environment
          ? this.prepareThis({ channel: this.channel, environment: this.environment })
          : Ge.preparation.promise.then(this.prepareThis);
    }
    static setupPreparationPromise() {
      let e;
      let r;
      const o = new Promise((a, i) => {
          (e = n((u) => {
            a(u);
          }, "resolveRef")),
            (r = n((...u) => {
              i(u);
            }, "rejectRef"));
        });
      Ge.preparation = { resolve: e, reject: r, promise: o };
    }
    get actor() {
      return Object.freeze({
        id: this.actorId,
        type: this.actorType,
        environment: this.environment ?? Ge.Environment.UNKNOWN,
      });
    }
    get status() {
      let e;
      if (!this.channel || !this.environment) return Ge.Status.UNPREPARED;
      switch ((e = this.syncing) == null ? void 0 : e.state) {
        case ee.PENDING:
        case void 0:
          return Ge.Status.SYNCING;
        case ee.REJECTED:
          return Ge.Status.ERROR;
        default:
          return Ge.Status.READY;
      }
    }
    untilReady() {
      let e;
      return Promise.all([Ge.preparation.promise, (e = this.syncing) == null ? void 0 : e.promise]);
    }
    static create(e) {
      if (!e || typeof (e == null ? void 0 : e.id) !== "string")
        throw new TypeError("id is required and must be a string, when creating a UniversalStore");
      e.debug &&;
      const r = mo.get(e.id);
      if (r)
        return (
          console.warn(_$1`UniversalStore with id "${e.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`),
          r
        );
      Ge.isInternalConstructing = !0;
      const o = new Ge(e);
      return mo.set(e.id, o), o;
    }
    static __prepare(e, r) {
      (Ge.preparation.channel = e),
        (Ge.preparation.environment = r),
        Ge.preparation.resolve({ channel: e, environment: r });
    }
    setState(e) {
      const r = this.state;
      const o = typeof e === "function" ? e(r) : e;
      if (
        (this.debug("setState", { newState: o, previousState: r, updater: e }),
        this.status !== Ge.Status.READY)
      )
        throw new TypeError(_$1`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({ newState: o, id: this.id, actor: this.actor, environment: this.environment }, null, 2)}`);
      this.state = o;
      const a = { type: Ge.InternalEventType.SET_STATE, payload: { state: o, previousState: r } };
      this.emitToChannel(a, { actor: this.actor }), this.emitToListeners(a, { actor: this.actor });
    }
    onStateChange(e) {
      return (
        this.debug("onStateChange", { listener: e }),
        this.subscribe(Ge.InternalEventType.SET_STATE, ({ payload: r }, o) => {
          e(r.state, r.previousState, o);
        })
      );
    }
    emitToChannel(e, r) {
      let o;
      this.debug("emitToChannel", { event: e, eventInfo: r, channel: this.channel }),
        (o = this.channel) == null || o.emit(this.channelEventName, { event: e, eventInfo: r });
    }
    prepareThis({ channel: e, environment: r }) {
      (this.channel = e),
        (this.environment = r),
        this.debug("prepared", { channel: e, environment: r }),
        this.channel.on(this.channelEventName, this.handleChannelEvents),
        this.actor.type === Ge.ActorType.LEADER
          ? this.emitToChannel({ type: Ge.InternalEventType.LEADER_CREATED }, { actor: this.actor })
          : (this.emitToChannel(
              { type: Ge.InternalEventType.FOLLOWER_CREATED },
              { actor: this.actor },
            ),
            this.emitToChannel(
              { type: Ge.InternalEventType.EXISTING_STATE_REQUEST },
              { actor: this.actor },
            ),
            setTimeout(() => {
              this.syncing.reject(
                new TypeError(
                  `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower.`,
                ),
              );
            }, 1e3));
    }
    emitToListeners(e, r) {
      const o = this.listeners.get(e.type);
      const a = this.listeners.get("*");
      this.debug("emitToListeners", {
        event: e,
        eventInfo: r,
        eventTypeListeners: o,
        everythingListeners: a,
      }),
        [...(o ?? []), ...(a ?? [])].forEach((i) => i(e, r));
    }
    handleChannelEvents(e) {
      let a;
      let i;
      let u;
      let l;
      let c;
      const { event: r, eventInfo: o } = e;
      if ([o.actor.id, (a = o.forwardingActor) == null ? void 0 : a.id].includes(this.actor.id)) {
        this.debug("handleChannelEvents: Ignoring event from self", { channelEvent: e });
        return;
      }if (
        ((i = this.syncing) == null ? void 0 : i.state) === ee.PENDING &&
        r.type !== Ge.InternalEventType.EXISTING_STATE_RESPONSE
      ) {
        this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent: e });
        return;
      }
      if (
        (this.debug("handleChannelEvents", { channelEvent: e }),
        this.actor.type === Ge.ActorType.LEADER)
      ) {
        let d = !0;
        switch (r.type) {
          case Ge.InternalEventType.EXISTING_STATE_REQUEST: {
            d = !1;
            const m = { type: Ge.InternalEventType.EXISTING_STATE_RESPONSE, payload: this.state };
            this.debug("handleChannelEvents: responding to existing state request", {
              responseEvent: m,
            }),
              this.emitToChannel(m, { actor: this.actor });
            break;
          }
          case Ge.InternalEventType.LEADER_CREATED:
            (d = !1),
              (this.syncing.state = ee.REJECTED),
              this.debug("handleChannelEvents: erroring due to second leader being created", {
                event: r,
              }),
              console.error(_$1`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(o.actor, null, 2)}`);
            break;
        }
        d &&
          (this.debug("handleChannelEvents: forwarding event", { channelEvent: e }),
          this.emitToChannel(r, { actor: o.actor, forwardingActor: this.actor }));
      }
      if (this.actor.type === Ge.ActorType.FOLLOWER)
        switch (r.type) {
          case Ge.InternalEventType.EXISTING_STATE_RESPONSE: {
            if (
              (this.debug(
                "handleChannelEvents: Setting state from leader's existing state response",
                { event: r },
              ),
              ((u = this.syncing) == null ? void 0 : u.state) !== ee.PENDING)
            )
              break;
            (c = (l = this.syncing).resolve) == null || c.call(l);
            const d = {
              type: Ge.InternalEventType.SET_STATE,
              payload: { state: r.payload, previousState: this.state },
            };
            (this.state = r.payload), this.emitToListeners(d, o);
            break;
          }
        }
      switch (r.type) {
        case Ge.InternalEventType.SET_STATE:
          this.debug("handleChannelEvents: Setting state", { event: r }),
            (this.state = r.payload.state);
          break;
      }
      this.emitToListeners(r, { actor: o.actor });
    }
    debug(e, r) {
      this.debugging &&;
    }
    static __reset() {
      Ge.preparation.reject(new Error("reset")),
        Ge.setupPreparationPromise(),
        (Ge.isInternalConstructing = !1);
    }
  };
n(w, "UniversalStore"),
  (w.ActorType = { LEADER: "LEADER", FOLLOWER: "FOLLOWER" }),
  (w.Environment = {
    SERVER: "SERVER",
    MANAGER: "MANAGER",
    PREVIEW: "PREVIEW",
    UNKNOWN: "UNKNOWN",
    MOCK: "MOCK",
  }),
  (w.InternalEventType = {
    EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
    EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
    SET_STATE: "__SET_STATE",
    LEADER_CREATED: "__LEADER_CREATED",
    FOLLOWER_CREATED: "__FOLLOWER_CREATED",
  }),
  (w.Status = { UNPREPARED: "UNPREPARED", SYNCING: "SYNCING", READY: "READY", ERROR: "ERROR" }),
  (w.isInternalConstructing = !1),
  w.setupPreparationPromise();
const Q = w;
const Ul = n((t) => t.transports !== void 0, "isMulti");
const Gl = n(() => Math.random().toString(16).slice(2), "generateRandomId");
const ho = class {
    constructor(e = {}) {
      (this.sender = Gl()),
        (this.events = {}),
        (this.data = {}),
        (this.transports = []),
        (this.isAsync = e.async || !1),
        Ul(e)
          ? ((this.transports = e.transports || []),
            this.transports.forEach((r) => {
              r.setHandler((o) => this.handleEvent(o));
            }))
          : (this.transports = e.transport ? [e.transport] : []),
        this.transports.forEach((r) => {
          r.setHandler((o) => this.handleEvent(o));
        });
    }
    get hasTransport() {
      return this.transports.length > 0;
    }
    addListener(e, r) {
      (this.events[e] = this.events[e] || []), this.events[e].push(r);
    }
    emit(e, ...r) {
      const o = { type: e, args: r, from: this.sender };
      let a = {};
      r.length >= 1 && r[0] && r[0].options && (a = r[0].options);
      const i = n(() => {
        this.transports.forEach((u) => {
          u.send(o, a);
        }),
          this.handleEvent(o);
      }, "handler");
      this.isAsync ? setImmediate(i) : i();
    }
    last(e) {
      return this.data[e];
    }
    eventNames() {
      return Object.keys(this.events);
    }
    listenerCount(e) {
      const r = this.listeners(e);
      return r ? r.length : 0;
    }
    listeners(e) {
      return this.events[e] || void 0;
    }
    once(e, r) {
      const o = this.onceListener(e, r);
      this.addListener(e, o);
    }
    removeAllListeners(e) {
      e ? this.events[e] && delete this.events[e] : (this.events = {});
    }
    removeListener(e, r) {
      const o = this.listeners(e);
      o && (this.events[e] = o.filter((a) => a !== r));
    }
    on(e, r) {
      this.addListener(e, r);
    }
    off(e, r) {
      this.removeListener(e, r);
    }
    handleEvent(e) {
      const r = this.listeners(e.type);
      r?.length &&
        r.forEach((o) => {
          o.apply(e, e.args);
        }),
        (this.data[e.type] = e.args);
    }
    onceListener(e, r) {
      const o = n((...a) => (this.removeListener(e, o), r(...a)), "onceListener");
      return o;
    }
  };
n(ho, "Channel");
const ie = ho;
const mr = {};
_e(mr, { deprecate: () => ae, logger: () => I$1, once: () => j$1, pretty: () => X });
const { LOGLEVEL: ql } = E$1;
const Se = { trace: 1, debug: 2, info: 3, warn: 4, error: 5, silent: 10 };
const Bl = ql;
const $e = Se[Bl] || Se.info;
const I$1 = {
    trace: n((t, ...e) => {
      $e <= Se.trace && ;
    }, "trace"),
    debug: n((t, ...e) => {
      $e <= Se.debug && ;
    }, "debug"),
    info: n((t, ...e) => {
      $e <= Se.info && ;
    }, "info"),
    warn: n((t, ...e) => {
      $e <= Se.warn && console.warn(t, ...e);
    }, "warn"),
    error: n((t, ...e) => {
      $e <= Se.error && console.error(t, ...e);
    }, "error"),
    log: n((t, ...e) => {
      $e < Se.silent && ;
    }, "log"),
  };
const go = new Set();
const j$1 = n(
    (t) =>
      (e, ...r) => {
        if (!go.has(e)) return go.add(e), I$1[t](e, ...r);
      },
    "once",
  );
j$1.clear = () => go.clear();
j$1.trace = j$1("trace");
j$1.debug = j$1("debug");
j$1.info = j$1("info");
j$1.warn = j$1("warn");
j$1.error = j$1("error");
j$1.log = j$1("log");
const ae = j$1("warn");
const X = n(
    (t) =>
      (...e) => {
        const r = [];
        if (e.length) {
          const o = /<span\s+style=(['"])([^'"]*)\1\s*>/gi;
          const a = /<\/span>/gi;
          let i;
          for (r.push(e[0].replace(o, "%c").replace(a, "%c")); (i = o.exec(e[0])); )
            r.push(i[2]), r.push("");
          for (let u = 1; u < e.length; u++) r.push(e[u]);
        }
        I$1[t].apply(I$1, r);
      },
    "pretty",
  );
X.trace = X("trace");
X.debug = X("debug");
X.info = X("info");
X.warn = X("warn");
X.error = X("error");
const Vl = Object.create;
const ds = Object.defineProperty;
const Hl = Object.getOwnPropertyDescriptor;
const us = Object.getOwnPropertyNames;
const zl = Object.getPrototypeOf;
const Wl = Object.prototype.hasOwnProperty;
const Z = n(
    (t, e) =>
      n(() => (e || (0, t[us(t)[0]])((e = { exports: {} }).exports, e), e.exports), "__require"),
    "__commonJS",
  );
const $l = n((t, e, r, o) => {
    if ((e && typeof e === "object") || typeof e === "function")
      for (const a of us(e))
        !Wl.call(t, a) &&
          a !== r &&
          ds(t, a, { get: n(() => e[a], "get"), enumerable: !(o = Hl(e, a)) || o.enumerable });
    return t;
  }, "__copyProps");
const st = n(
    (t, e, r) => (
      (r = t != null ? Vl(zl(t)) : {}),
      $l(e || !t || !t.__esModule ? ds(r, "default", { value: t, enumerable: !0 }) : r, t)
    ),
    "__toESM",
  );
const Yl = [
    "bubbles",
    "cancelBubble",
    "cancelable",
    "composed",
    "currentTarget",
    "defaultPrevented",
    "eventPhase",
    "isTrusted",
    "returnValue",
    "srcElement",
    "target",
    "timeStamp",
    "type",
  ];
const Kl = ["detail"];
function fs(t) {
  const e = Yl.filter((r) => t[r] !== void 0).reduce((r, o) => ({ ...r, [o]: t[o] }), {});
  return (
    t instanceof CustomEvent &&
      Kl.filter((r) => t[r] !== void 0).forEach((r) => {
        e[r] = t[r];
      }),
    e
  );
}
n(fs, "extractEventHiddenProperties");
const Ps = ue(it());
const Ts = Z({
    "node_modules/has-symbols/shams.js"(t, e) {
      e.exports = n(() => {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
          return !1;
        if (typeof Symbol.iterator === "symbol") return !0;
        const r = {};
        let o = Symbol("test");
        const a = Object(o);
        if (
          typeof o === "string" ||
          Object.prototype.toString.call(o) !== "[object Symbol]" ||
          Object.prototype.toString.call(a) !== "[object Symbol]"
        )
          return !1;
        const i = 42;
        r[o] = i;
        for (o in r) return !1;
        if (
          (typeof Object.keys === "function" && Object.keys(r).length !== 0) ||
          (typeof Object.getOwnPropertyNames === "function" &&
            Object.getOwnPropertyNames(r).length !== 0)
        )
          return !1;
        const u = Object.getOwnPropertySymbols(r);
        if (u.length !== 1 || u[0] !== o || !Object.prototype.propertyIsEnumerable.call(r, o))
          return !1;
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          const l = Object.getOwnPropertyDescriptor(r, o);
          if (l.value !== i || l.enumerable !== !0) return !1;
        }
        return !0;
      }, "hasSymbols");
    },
  });
const Es = Z({
    "node_modules/has-symbols/index.js"(t, e) {
      const r = typeof Symbol < "u" && Symbol;
      const o = Ts();
      e.exports = n(
        () =>
          typeof r !== "function" ||
          typeof Symbol !== "function" ||
          typeof r("foo") !== "symbol" ||
          typeof Symbol("bar") !== "symbol"
            ? !1
            : o(),
        "hasNativeSymbols",
      );
    },
  });
const Xl = Z({
    "node_modules/function-bind/implementation.js"(t, e) {
      const r = "Function.prototype.bind called on incompatible ";
      const o = Array.prototype.slice;
      const a = Object.prototype.toString;
      const i = "[object Function]";
      e.exports = n(function (u) {
        const l = this;
        if (typeof l !== "function" || a.call(l) !== i) throw new TypeError(r + l);
        for (
          let c = o.call(arguments, 1),
            d,
            m = n(function () {
              if (this instanceof d) {
                const le = l.apply(this, c.concat(o.call(arguments)));
                return Object(le) === le ? le : this;
              }return l.apply(u, c.concat(o.call(arguments)));
            }, "binder"),
            h = Math.max(0, l.length - c.length),
            g = [],
            re = 0;
          re < h;
          re++
        )
          g.push(`$${re}`);
        if (
          ((d = Function(
            "binder",
            `return function (${g.join(",")}){ return binder.apply(this,arguments); }`,
          )(m)),
          l.prototype)
        ) {
          const ne = n(() => {}, "Empty2");
          (ne.prototype = l.prototype), (d.prototype = new ne()), (ne.prototype = null);
        }
        return d;
      }, "bind");
    },
  });
const To = Z({
    "node_modules/function-bind/index.js"(t, e) {
      const r = Xl();
      e.exports = Function.prototype.bind || r;
    },
  });
const Jl = Z({
    "node_modules/has/src/index.js"(t, e) {
      const r = To();
      e.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
    },
  });
const Rs = Z({
    "node_modules/get-intrinsic/index.js"(t, e) {
      let r;
      const o = SyntaxError;
      const a = Function;
      const i = TypeError;
      const u = n((qe) => {
          try {
            return a(`"use strict"; return (${qe}).constructor;`)();
          } catch {}
        }, "getEvalledConstructor");
      let l = Object.getOwnPropertyDescriptor;
      if (l)
        try {
          l({}, "");
        } catch {
          l = null;
        }
      const c = n(() => {
          throw new i();
        }, "throwTypeError");
      const d = l
          ? (() => {
              try {
                return arguments.callee, c;
              } catch {
                try {
                  return l(arguments, "callee").get;
                } catch {
                  return c;
                }
              }
            })()
          : c;
      const m = Es()();
      const h = Object.getPrototypeOf || ((qe) => qe.__proto__);
      const g = {};
      const re = typeof Uint8Array > "u" ? r : h(Uint8Array);
      const ne = {
          "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
          "%Array%": Array,
          "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
          "%ArrayIteratorPrototype%": m ? h([][Symbol.iterator]()) : r,
          "%AsyncFromSyncIteratorPrototype%": r,
          "%AsyncFunction%": g,
          "%AsyncGenerator%": g,
          "%AsyncGeneratorFunction%": g,
          "%AsyncIteratorPrototype%": g,
          "%Atomics%": typeof Atomics > "u" ? r : Atomics,
          "%BigInt%": typeof BigInt > "u" ? r : BigInt,
          "%Boolean%": Boolean,
          "%DataView%": typeof DataView > "u" ? r : DataView,
          "%Date%": Date,
          "%decodeURI%": decodeURI,
          "%decodeURIComponent%": decodeURIComponent,
          "%encodeURI%": encodeURI,
          "%encodeURIComponent%": encodeURIComponent,
          "%Error%": Error,
          "%eval%": eval,
          "%EvalError%": EvalError,
          "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
          "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
          "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
          "%Function%": a,
          "%GeneratorFunction%": g,
          "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
          "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
          "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
          "%isFinite%": Number.isFinite,
          "%isNaN%": Number.isNaN,
          "%IteratorPrototype%": m ? h(h([][Symbol.iterator]())) : r,
          "%JSON%": typeof JSON === "object" ? JSON : r,
          "%Map%": typeof Map > "u" ? r : Map,
          "%MapIteratorPrototype%": typeof Map > "u" || !m ? r : h(new Map()[Symbol.iterator]()),
          "%Math%": Math,
          "%Number%": Number,
          "%Object%": Object,
          "%parseFloat%": Number.parseFloat,
          "%parseInt%": Number.parseInt,
          "%Promise%": typeof Promise > "u" ? r : Promise,
          "%Proxy%": typeof Proxy > "u" ? r : Proxy,
          "%RangeError%": RangeError,
          "%ReferenceError%": ReferenceError,
          "%Reflect%": typeof Reflect > "u" ? r : Reflect,
          "%RegExp%": RegExp,
          "%Set%": typeof Set > "u" ? r : Set,
          "%SetIteratorPrototype%": typeof Set > "u" || !m ? r : h(new Set()[Symbol.iterator]()),
          "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
          "%String%": String,
          "%StringIteratorPrototype%": m ? h(""[Symbol.iterator]()) : r,
          "%Symbol%": m ? Symbol : r,
          "%SyntaxError%": o,
          "%ThrowTypeError%": d,
          "%TypedArray%": re,
          "%TypeError%": i,
          "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
          "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
          "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
          "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
          "%URIError%": URIError,
          "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
          "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
          "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
        };
      const le = n(function qe(Dt) {
          let p;
          if (Dt === "%AsyncFunction%") p = u("async function () {}");
          else if (Dt === "%GeneratorFunction%") p = u("function* () {}");
          else if (Dt === "%AsyncGeneratorFunction%") p = u("async function* () {}");
          else if (Dt === "%AsyncGenerator%") {
            const A = qe("%AsyncGeneratorFunction%");
            A && (p = A.prototype);
          } else if (Dt === "%AsyncIteratorPrototype%") {
            const B = qe("%AsyncGenerator%");
            B && (p = h(B.prototype));
          }
          return (ne[Dt] = p), p;
        }, "doEval2");
      const J = {
          "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
          "%ArrayPrototype%": ["Array", "prototype"],
          "%ArrayProto_entries%": ["Array", "prototype", "entries"],
          "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
          "%ArrayProto_keys%": ["Array", "prototype", "keys"],
          "%ArrayProto_values%": ["Array", "prototype", "values"],
          "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
          "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
          "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
          "%BooleanPrototype%": ["Boolean", "prototype"],
          "%DataViewPrototype%": ["DataView", "prototype"],
          "%DatePrototype%": ["Date", "prototype"],
          "%ErrorPrototype%": ["Error", "prototype"],
          "%EvalErrorPrototype%": ["EvalError", "prototype"],
          "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
          "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
          "%FunctionPrototype%": ["Function", "prototype"],
          "%Generator%": ["GeneratorFunction", "prototype"],
          "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
          "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
          "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
          "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
          "%JSONParse%": ["JSON", "parse"],
          "%JSONStringify%": ["JSON", "stringify"],
          "%MapPrototype%": ["Map", "prototype"],
          "%NumberPrototype%": ["Number", "prototype"],
          "%ObjectPrototype%": ["Object", "prototype"],
          "%ObjProto_toString%": ["Object", "prototype", "toString"],
          "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
          "%PromisePrototype%": ["Promise", "prototype"],
          "%PromiseProto_then%": ["Promise", "prototype", "then"],
          "%Promise_all%": ["Promise", "all"],
          "%Promise_reject%": ["Promise", "reject"],
          "%Promise_resolve%": ["Promise", "resolve"],
          "%RangeErrorPrototype%": ["RangeError", "prototype"],
          "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
          "%RegExpPrototype%": ["RegExp", "prototype"],
          "%SetPrototype%": ["Set", "prototype"],
          "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
          "%StringPrototype%": ["String", "prototype"],
          "%SymbolPrototype%": ["Symbol", "prototype"],
          "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
          "%TypedArrayPrototype%": ["TypedArray", "prototype"],
          "%TypeErrorPrototype%": ["TypeError", "prototype"],
          "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
          "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
          "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
          "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
          "%URIErrorPrototype%": ["URIError", "prototype"],
          "%WeakMapPrototype%": ["WeakMap", "prototype"],
          "%WeakSetPrototype%": ["WeakSet", "prototype"],
        };
      const ce = To();
      const F = Jl();
      const se = ce.call(Function.call, Array.prototype.concat);
      const he = ce.call(Function.apply, Array.prototype.splice);
      const Ve = ce.call(Function.call, String.prototype.replace);
      const ve = ce.call(Function.call, String.prototype.slice);
      const we = ce.call(Function.call, RegExp.prototype.exec);
      const Nt =
          /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      const Bt = /\\(\\)?/g;
      const Ft = n((qe) => {
          const Dt = ve(qe, 0, 1);
          const p = ve(qe, -1);
          if (Dt === "%" && p !== "%")
            throw new o("invalid intrinsic syntax, expected closing `%`");
          if (p === "%" && Dt !== "%")
            throw new o("invalid intrinsic syntax, expected opening `%`");
          const A = [];
          return (
            Ve(qe, Nt, (B, de, pe, Lt) => {
              A[A.length] = pe ? Ve(Lt, Bt, "$1") : de || B;
            }),
            A
          );
        }, "stringToPath3");
      const jt = n((qe, Dt) => {
          let p = qe;
          let A;
          if ((F(J, p) && ((A = J[p]), (p = `%${A[0]}%`)), F(ne, p))) {
            let B = ne[p];
            if ((B === g && (B = le(p)), typeof B > "u" && !Dt))
              throw new i(
                `intrinsic ${qe} exists, but is not available. Please file an issue!`,
              );
            return { alias: A, name: p, value: B };
          }
          throw new o(`intrinsic ${qe} does not exist!`);
        }, "getBaseIntrinsic2");
      e.exports = n((qe, Dt) => {
        if (typeof qe !== "string" || qe.length === 0)
          throw new i("intrinsic name must be a non-empty string");
        if (arguments.length > 1 && typeof Dt !== "boolean")
          throw new i('"allowMissing" argument must be a boolean');
        if (we(/^%?[^%]*%?$/, qe) === null)
          throw new o(
            "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
          );
        const p = Ft(qe);
        let A = p.length > 0 ? p[0] : "";
        const B = jt(`%${A}%`, Dt);
        let de = B.name;
        let pe = B.value;
        let Lt = !1;
        const qt = B.alias;
        qt && ((A = qt[0]), he(p, se([0, 1], qt)));
        for (let Ut = 1, Mt = !0; Ut < p.length; Ut += 1) {
          const Gt = p[Ut];
          const lr = ve(Gt, 0, 1);
          const zr = ve(Gt, -1);
          if (
            (lr === '"' || lr === "'" || lr === "`" || zr === '"' || zr === "'" || zr === "`") &&
            lr !== zr
          )
            throw new o("property names with quotes must have matching quotes");
          if (
            ((Gt === "constructor" || !Mt) && (Lt = !0),
            (A += `.${Gt}`),
            (de = `%${A}%`),
            F(ne, de))
          )
            pe = ne[de];
          else if (pe != null) {
            if (!(Gt in pe)) {
              if (!Dt)
                throw new i(
                  `base intrinsic for ${qe} exists, but the property is not available.`,
                );
              return;
            }
            if (l && Ut + 1 >= p.length) {
              const Qr = l(pe, Gt);
              (Mt = !!Qr),
                Mt && "get" in Qr && !("originalValue" in Qr.get) ? (pe = Qr.get) : (pe = pe[Gt]);
            } else (Mt = F(pe, Gt)), (pe = pe[Gt]);
            Mt && !Lt && (ne[de] = pe);
          }
        }
        return pe;
      }, "GetIntrinsic");
    },
  });
const Ql = Z({
    "node_modules/call-bind/index.js"(t, e) {
      const r = To();
      const o = Rs();
      const a = o("%Function.prototype.apply%");
      const i = o("%Function.prototype.call%");
      const u = o("%Reflect.apply%", !0) || r.call(i, a);
      const l = o("%Object.getOwnPropertyDescriptor%", !0);
      let c = o("%Object.defineProperty%", !0);
      const d = o("%Math.max%");
      if (c)
        try {
          c({}, "a", { value: 1 });
        } catch {
          c = null;
        }
      e.exports = n((h) => {
        const g = u(r, i, arguments);
        if (l && c) {
          const re = l(g, "length");
          re.configurable && c(g, "length", { value: 1 + d(0, h.length - (arguments.length - 1)) });
        }
        return g;
      }, "callBind");
      const m = n(() => u(r, a, arguments), "applyBind2");
      c ? c(e.exports, "apply", { value: m }) : (e.exports.apply = m);
    },
  });
const Zl = Z({
    "node_modules/call-bind/callBound.js"(t, e) {
      const r = Rs();
      const o = Ql();
      const a = o(r("String.prototype.indexOf"));
      e.exports = n((i, u) => {
        const l = r(i, !!u);
        return typeof l === "function" && a(i, ".prototype.") > -1 ? o(l) : l;
      }, "callBoundIntrinsic");
    },
  });
const ec = Z({
    "node_modules/has-tostringtag/shams.js"(t, e) {
      const r = Ts();
      e.exports = n(() => r() && !!Symbol.toStringTag, "hasToStringTagShams");
    },
  });
const rc = Z({
    "node_modules/is-regex/index.js"(t, e) {
      const r = Zl();
      const o = ec()();
      let a;
      let i;
      let u;
      let l;
      o &&
        ((a = r("Object.prototype.hasOwnProperty")),
        (i = r("RegExp.prototype.exec")),
        (u = {}),
        (c = n(() => {
          throw u;
        }, "throwRegexMarker")),
        (l = { toString: c, valueOf: c }),
        typeof Symbol.toPrimitive === "symbol" && (l[Symbol.toPrimitive] = c));
      let c;
      const d = r("Object.prototype.toString");
      const m = Object.getOwnPropertyDescriptor;
      const h = "[object RegExp]";
      e.exports = n(
        o
          ? (g) => {
              if (!g || typeof g !== "object") return !1;
              const re = m(g, "lastIndex");
              const ne = re && a(re, "value");
              if (!ne) return !1;
              try {
                i(g, l);
              } catch (le) {
                return le === u;
              }
            }
          : (g) => (!g || (typeof g !== "object" && typeof g !== "function") ? !1 : d(g) === h),
        "isRegex",
      );
    },
  });
const tc = Z({
    "node_modules/is-function/index.js"(t, e) {
      e.exports = o;
      const r = Object.prototype.toString;
      function o(a) {
        if (!a) return !1;
        const i = r.call(a);
        return (
          i === "[object Function]" ||
          (typeof a === "function" && i !== "[object RegExp]") ||
          (typeof window < "u" &&
            (a === window.setTimeout ||
              a === window.alert ||
              a === window.confirm ||
              a === window.prompt))
        );
      }
      n(o, "isFunction3");
    },
  });
const oc = Z({
    "node_modules/is-symbol/index.js"(t, e) {
      const r = Object.prototype.toString;
      const o = Es()();
      o
        ? ((a = Symbol.prototype.toString),
          (i = /^Symbol\(.*\)$/),
          (u = n(
            (l) => (typeof l.valueOf() !== "symbol" ? !1 : i.test(a.call(l))),
            "isRealSymbolObject",
          )),
          (e.exports = n((l) => {
            if (typeof l === "symbol") return !0;
            if (r.call(l) !== "[object Symbol]") return !1;
            try {
              return u(l);
            } catch {
              return !1;
            }
          }, "isSymbol3")))
        : (e.exports = n((l) => !1, "isSymbol3"));
      let a;
      let i;
      let u;
    },
  });
const nc = st(rc());
const sc = st(tc());
const ic = st(oc());
function ac(t) {
  return t != null && typeof t === "object" && Array.isArray(t) === !1;
}
n(ac, "isObject");
const lc = typeof global === "object" && global && global.Object === Object && global;
const cc = lc;
const pc = typeof self === "object" && self && self.Object === Object && self;
const dc = cc || pc || Function("return this")();
const Eo = dc;
const uc = Eo.Symbol;
const Ye = uc;
const As = Object.prototype;
const fc = As.hasOwnProperty;
const yc = As.toString;
const hr = Ye ? Ye.toStringTag : void 0;
function mc(t) {
  const e = fc.call(t, hr);
  const r = t[hr];
  try {
    t[hr] = void 0;
    const o = !0;
  } catch {}
  const a = yc.call(t);
  return o && (e ? (t[hr] = r) : delete t[hr]), a;
}
n(mc, "getRawTag");
const hc = mc;
const gc = Object.prototype;
const Sc = gc.toString;
function bc(t) {
  return Sc.call(t);
}
n(bc, "objectToString");
const Tc = bc;
const Ec = "[object Null]";
const Rc = "[object Undefined]";
const ms = Ye ? Ye.toStringTag : void 0;
function Ac(t) {
  return t == null ? (t === void 0 ? Rc : Ec) : ms && ms in Object(t) ? hc(t) : Tc(t);
}
n(Ac, "baseGetTag");
const xs = Ac;
function xc(t) {
  return t != null && typeof t === "object";
}
n(xc, "isObjectLike");
const vc = xc;
const wc = "[object Symbol]";
function _c(t) {
  return typeof t === "symbol" || (vc(t) && xs(t) === wc);
}
n(_c, "isSymbol");
const Ro = _c;
function Cc(t, e) {
  for (let r = -1, o = t == null ? 0 : t.length, a = Array(o); ++r < o; ) a[r] = e(t[r], r, t);
  return a;
}
n(Cc, "arrayMap");
const Pc = Cc;
const Oc = Array.isArray;
const Ao = Oc;
const hs = Ye ? Ye.prototype : void 0;
const gs = hs ? hs.toString : void 0;
function vs(t) {
  if (typeof t === "string") return t;
  if (Ao(t)) return `${Pc(t, vs)}`;
  if (Ro(t)) return gs ? gs.call(t) : "";
  const e = `${t}`;
  return e === "0" && 1 / t === -1 / 0 ? "-0" : e;
}
n(vs, "baseToString");
const Fc = vs;
function Dc(t) {
  const e = typeof t;
  return t != null && (e === "object" || e === "function");
}
n(Dc, "isObject2");
const ws = Dc;
const Nc = "[object AsyncFunction]";
const kc = "[object Function]";
const Lc = "[object GeneratorFunction]";
const jc = "[object Proxy]";
function Mc(t) {
  if (!ws(t)) return !1;
  const e = xs(t);
  return e === kc || e === Lc || e === Nc || e === jc;
}
n(Mc, "isFunction");
const Uc = Mc;
const Gc = Eo["__core-js_shared__"];
const bo = Gc;
const Ss = (() => {
    const t = /[^.]+$/.exec((bo?.keys?.IE_PROTO) || "");
    return t ? `Symbol(src)_1.${t}` : "";
  })();
function qc(t) {
  return !!Ss && Ss in t;
}
n(qc, "isMasked");
const Bc = qc;
const Vc = Function.prototype;
const Hc = Vc.toString;
function zc(t) {
  if (t != null) {
    try {
      return Hc.call(t);
    } catch {}
    try {
      return `${t}`;
    } catch {}
  }
  return "";
}
n(zc, "toSource");
const Wc = zc;
const $c = /[\\^$.*+?()[\]{}|]/g;
const Yc = /^\[object .+?Constructor\]$/;
const Kc = Function.prototype;
const Xc = Object.prototype;
const Jc = Kc.toString;
const Qc = Xc.hasOwnProperty;
const Zc = RegExp(
    `^${Jc.call(Qc)
        .replace($c, "\\$&")
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?")}$`,
  );
function ep(t) {
  if (!ws(t) || Bc(t)) return !1;
  const e = Uc(t) ? Zc : Yc;
  return e.test(Wc(t));
}
n(ep, "baseIsNative");
const rp = ep;
function tp(t, e) {
  return t == null ? void 0 : t[e];
}
n(tp, "getValue");
const op = tp;
function np(t, e) {
  const r = op(t, e);
  return rp(r) ? r : void 0;
}
n(np, "getNative");
const _s = np;
function sp(t, e) {
  return t === e || (t !== t && e !== e);
}
n(sp, "eq");
const ip = sp;
const ap = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const lp = /^\w*$/;
function cp(t, e) {
  if (Ao(t)) return !1;
  const r = typeof t;
  return r === "number" || r === "symbol" || r === "boolean" || t == null || Ro(t)
    ? !0
    : lp.test(t) || !ap.test(t) || (e != null && t in Object(e));
}
n(cp, "isKey");
const pp = cp;
const dp = _s(Object, "create");
const gr = dp;
function up() {
  (this.__data__ = gr ? gr(null) : {}), (this.size = 0);
}
n(up, "hashClear");
const fp = up;
function yp(t) {
  const e = this.has(t) && delete this.__data__[t];
  return (this.size -= e ? 1 : 0), e;
}
n(yp, "hashDelete");
const mp = yp;
const hp = "__lodash_hash_undefined__";
const gp = Object.prototype;
const Sp = gp.hasOwnProperty;
function bp(t) {
  const e = this.__data__;
  if (gr) {
    const r = e[t];
    return r === hp ? void 0 : r;
  }
  return Sp.call(e, t) ? e[t] : void 0;
}
n(bp, "hashGet");
const Tp = bp;
const Ep = Object.prototype;
const Rp = Ep.hasOwnProperty;
function Ap(t) {
  const e = this.__data__;
  return gr ? e[t] !== void 0 : Rp.call(e, t);
}
n(Ap, "hashHas");
const xp = Ap;
const vp = "__lodash_hash_undefined__";
function wp(t, e) {
  const r = this.__data__;
  return (this.size += this.has(t) ? 0 : 1), (r[t] = gr && e === void 0 ? vp : e), this;
}
n(wp, "hashSet");
const _p = wp;
function Ke(t) {
  let e = -1;
  const r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    const o = t[e];
    this.set(o[0], o[1]);
  }
}
n(Ke, "Hash");
Ke.prototype.clear = fp;
Ke.prototype.delete = mp;
Ke.prototype.get = Tp;
Ke.prototype.has = xp;
Ke.prototype.set = _p;
const bs = Ke;
function Cp() {
  (this.__data__ = []), (this.size = 0);
}
n(Cp, "listCacheClear");
const Pp = Cp;
function Op(t, e) {
  for (let r = t.length; r--; ) if (ip(t[r][0], e)) return r;
  return -1;
}
n(Op, "assocIndexOf");
const lt = Op;
const Ip = Array.prototype;
const Fp = Ip.splice;
function Dp(t) {
  const e = this.__data__;
  const r = lt(e, t);
  if (r < 0) return !1;
  const o = e.length - 1;
  return r === o ? e.pop() : Fp.call(e, r, 1), --this.size, !0;
}
n(Dp, "listCacheDelete");
const Np = Dp;
function kp(t) {
  const e = this.__data__;
  const r = lt(e, t);
  return r < 0 ? void 0 : e[r][1];
}
n(kp, "listCacheGet");
const Lp = kp;
function jp(t) {
  return lt(this.__data__, t) > -1;
}
n(jp, "listCacheHas");
const Mp = jp;
function Up(t, e) {
  const r = this.__data__;
  const o = lt(r, t);
  return o < 0 ? (++this.size, r.push([t, e])) : (r[o][1] = e), this;
}
n(Up, "listCacheSet");
const Gp = Up;
function Xe(t) {
  let e = -1;
  const r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    const o = t[e];
    this.set(o[0], o[1]);
  }
}
n(Xe, "ListCache");
Xe.prototype.clear = Pp;
Xe.prototype.delete = Np;
Xe.prototype.get = Lp;
Xe.prototype.has = Mp;
Xe.prototype.set = Gp;
const qp = Xe;
const Bp = _s(Eo, "Map");
const Vp = Bp;
function Hp() {
  (this.size = 0), (this.__data__ = { hash: new bs(), map: new (Vp || qp)(), string: new bs() });
}
n(Hp, "mapCacheClear");
const zp = Hp;
function Wp(t) {
  const e = typeof t;
  return e === "string" || e === "number" || e === "symbol" || e === "boolean"
    ? t !== "__proto__"
    : t === null;
}
n(Wp, "isKeyable");
const $p = Wp;
function Yp(t, e) {
  const r = t.__data__;
  return $p(e) ? r[typeof e === "string" ? "string" : "hash"] : r.map;
}
n(Yp, "getMapData");
const ct = Yp;
function Kp(t) {
  const e = ct(this, t).delete(t);
  return (this.size -= e ? 1 : 0), e;
}
n(Kp, "mapCacheDelete");
const Xp = Kp;
function Jp(t) {
  return ct(this, t).get(t);
}
n(Jp, "mapCacheGet");
const Qp = Jp;
function Zp(t) {
  return ct(this, t).has(t);
}
n(Zp, "mapCacheHas");
const ed = Zp;
function rd(t, e) {
  const r = ct(this, t);
  const o = r.size;
  return r.set(t, e), (this.size += r.size === o ? 0 : 1), this;
}
n(rd, "mapCacheSet");
const td = rd;
function Je(t) {
  let e = -1;
  const r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    const o = t[e];
    this.set(o[0], o[1]);
  }
}
n(Je, "MapCache");
Je.prototype.clear = zp;
Je.prototype.delete = Xp;
Je.prototype.get = Qp;
Je.prototype.has = ed;
Je.prototype.set = td;
const Cs = Je;
const od = "Expected a function";
function xo(t, e) {
  if (typeof t !== "function" || (e != null && typeof e !== "function")) throw new TypeError(od);
  const r = n(function () {
    const o = arguments;
    const a = e ? e.apply(this, o) : o[0];
    const i = r.cache;
    if (i.has(a)) return i.get(a);
    const u = t.apply(this, o);
    return (r.cache = i.set(a, u) || i), u;
  }, "memoized");
  return (r.cache = new (xo.Cache || Cs)()), r;
}
n(xo, "memoize");
xo.Cache = Cs;
const nd = xo;
const sd = 500;
function id(t) {
  const e = nd(t, (o) => (r.size === sd && r.clear(), o));
  const r = e.cache;
  return e;
}
n(id, "memoizeCapped");
const ad = id;
const ld =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const cd = /\\(\\)?/g;
const pd = ad((t) => {
    const e = [];
    return (
      t.charCodeAt(0) === 46 && e.push(""),
      t.replace(ld, (r, o, a, i) => {
        e.push(a ? i.replace(cd, "$1") : o || r);
      }),
      e
    );
  });
const dd = pd;
function ud(t) {
  return t == null ? "" : Fc(t);
}
n(ud, "toString");
const fd = ud;
function yd(t, e) {
  return Ao(t) ? t : pp(t, e) ? [t] : dd(fd(t));
}
n(yd, "castPath");
const md = yd;
function gd(t) {
  if (typeof t === "string" || Ro(t)) return t;
  const e = `${t}`;
  return e === "0" && 1 / t === -1 / 0 ? "-0" : e;
}
n(gd, "toKey");
const Sd = gd;
function bd(t, e) {
  e = md(e, t);
  for (let r = 0, o = e.length; t != null && r < o; ) t = t[Sd(e[r++])];
  return r && r === o ? t : void 0;
}
n(bd, "baseGet");
const Td = bd;
function Ed(t, e, r) {
  const o = t == null ? void 0 : Td(t, e);
  return o === void 0 ? r : o;
}
n(Ed, "get");
const Rd = Ed;
const at = ac;
const Ad = n((t) => {
    let e = null;
    let r = !1;
    let o = !1;
    let a = !1;
    let i = "";
    if (t.indexOf("//") >= 0 || t.indexOf("/*") >= 0)
      for (let u = 0; u < t.length; u += 1)
        !e && !r && !o && !a
          ? t[u] === '"' || t[u] === "'" || t[u] === "`"
            ? (e = t[u])
            : t[u] === "/" && t[u + 1] === "*"
              ? (r = !0)
              : t[u] === "/" && t[u + 1] === "/"
                ? (o = !0)
                : t[u] === "/" && t[u + 1] !== "/" && (a = !0)
          : (e &&
              ((t[u] === e && t[u - 1] !== "\\") ||
                (t[u] ===
                  `
` &&
                  e !== "`")) &&
              (e = null),
            a &&
              ((t[u] === "/" && t[u - 1] !== "\\") ||
                t[u] ===
                  `
`) &&
              (a = !1),
            r && t[u - 1] === "/" && t[u - 2] === "*" && (r = !1),
            o &&
              t[u] ===
                `
` &&
              (o = !1)),
          !r && !o && (i += t[u]);
    else i = t;
    return i;
  }, "removeCodeComments");
const xd = (0, Ps.default)(1e4)((t) => Ad(t).replace(/\n\s*/g, "").trim());
const vd = n((t, e) => {
    const r = e.slice(0, e.indexOf("{"));
    const o = e.slice(e.indexOf("{"));
    if (r.includes("=>") || r.includes("function")) return e;
    let a = r;
    return (a = a.replace(t, "function")), a + o;
  }, "convertShorthandMethods2");
const wd = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
const Sr = n((t) => t.match(/^[\[\{\"\}].*[\]\}\"]$/), "isJSON");
function Os(t) {
  if (!at(t)) return t;
  let e = t;
  let r = !1;
  return (
    typeof Event < "u" && t instanceof Event && ((e = fs(e)), (r = !0)),
    (e = Object.keys(e).reduce((o, a) => {
      try {
        e[a]?.toJSON, (o[a] = e[a]);
      } catch {
        r = !0;
      }
      return o;
    }, {})),
    r ? e : t
  );
}
n(Os, "convertUnconventionalData");
const _d = n((t) => {
    let e;
    let r;
    let o;
    let a;
    return n(function (i, u) {
      try {
        if (i === "") return (a = []), (e = new Map([[u, "[]"]])), (r = new Map()), (o = []), u;
        const l = r.get(this) || this;
        while (o.length && l !== o[0]) o.shift(), a.pop();
        if (typeof u === "boolean") return u;
        if (u === void 0) return t.allowUndefined ? "_undefined_" : void 0;
        if (u === null) return null;
        if (typeof u === "number")
          return u === -1 / 0
            ? "_-Infinity_"
            : u === 1 / 0
              ? "_Infinity_"
              : Number.isNaN(u)
                ? "_NaN_"
                : u;
        if (typeof u === "bigint") return `_bigint_${u.toString()}`;
        if (typeof u === "string") return wd.test(u) ? (t.allowDate ? `_date_${u}` : void 0) : u;
        if ((0, nc.default)(u)) return t.allowRegExp ? `_regexp_${u.flags}|${u.source}` : void 0;
        if ((0, sc.default)(u)) {
          if (!t.allowFunction) return;
          const { name: d } = u;
          const m = u.toString();
          return m.match(
            /(\[native code\]|WEBPACK_IMPORTED_MODULE|__webpack_exports__|__webpack_require__)/,
          )
            ? `_function_${d}|${(() => {}).toString()}`
            : `_function_${d}|${xd(vd(i, m))}`;
        }
        if ((0, ic.default)(u)) {
          if (!t.allowSymbol) return;
          const d = Symbol.keyFor(u);
          return d !== void 0 ? `_gsymbol_${d}` : `_symbol_${u.toString().slice(7, -1)}`;
        }
        if (o.length >= t.maxDepth) return Array.isArray(u) ? `[Array(${u.length})]` : "[Object]";
        if (u === this) return `_duplicate_${JSON.stringify(a)}`;
        if (u instanceof Error && t.allowError)
          return {
            __isConvertedError__: !0,
            errorProperties: {
              ...(u.cause ? { cause: u.cause } : {}),
              ...u,
              name: u.name,
              message: u.message,
              stack: u.stack,
              "_constructor-name_": u.constructor.name,
            },
          };
        if (
          u.constructor?.name &&
          u.constructor.name !== "Object" &&
          !Array.isArray(u) &&
          !t.allowClass
        )
          return;
        const c = e.get(u);
        if (!c) {
          const d = Array.isArray(u) ? u : Os(u);
          if (
            u.constructor?.name &&
            u.constructor.name !== "Object" &&
            !Array.isArray(u) &&
            t.allowClass
          )
            try {
              Object.assign(d, { "_constructor-name_": u.constructor.name });
            } catch {}
          return a.push(i), o.unshift(d), e.set(u, JSON.stringify(a)), u !== d && r.set(u, d), d;
        }
        return `_duplicate_${c}`;
      } catch {
        return;
      }
    }, "replace");
  }, "replacer2");
const Cd = n(function reviver(options) {
    const refs = [];
    let root;
    return n(function revive(key, value) {
      if (
        (key === "" &&
          ((root = value),
          refs.forEach(({ target: t, container: e, replacement: r }) => {
            const o = Sr(r) ? JSON.parse(r) : r.split(".");
            o.length === 0 ? (e[t] = root) : (e[t] = Rd(root, o));
          })),
        key === "_constructor-name_")
      )
        return value;
      if (at(value) && value.__isConvertedError__) {
        const { message: t, ...e } = value.errorProperties;
        const r = new Error(t);
        return Object.assign(r, e), r;
      }
      if (at(value) && value["_constructor-name_"] && options.allowFunction) {
        const t = value["_constructor-name_"];
        if (t !== "Object") {
          const e = new Function(`return function ${t.replace(/[^a-zA-Z0-9$_]+/g, "")}(){}`)();
          Object.setPrototypeOf(value, new e());
        }
        return value["_constructor-name_"] = undefined, value;
      }
      if (typeof value === "string" && value.startsWith("_function_") && options.allowFunction) {
        const [, name, source] = value.match(/_function_([^|]*)\|(.*)/) || [];
        const sourceSanitized = source.replace(/[(\(\))|\\| |\]|`]*$/, "");
        if (!options.lazyEval) return eval(`(${sourceSanitized})`);
        const result = n((...args) => {
          const f = eval(`(${sourceSanitized})`);
          return f(...args);
        }, "result");
        return (
          Object.defineProperty(result, "toString", { value: n(() => sourceSanitized, "value") }),
          Object.defineProperty(result, "name", { value: name }),
          result
        );
      }
      if (typeof value === "string" && value.startsWith("_regexp_") && options.allowRegExp) {
        const [, t, e] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
        return new RegExp(e, t);
      }
      return typeof value === "string" && value.startsWith("_date_") && options.allowDate
        ? new Date(value.replace("_date_", ""))
        : typeof value === "string" && value.startsWith("_duplicate_")
          ? (refs.push({
              target: key,
              container: this,
              replacement: value.replace(/^_duplicate_/, ""),
            }),
            null)
          : typeof value === "string" && value.startsWith("_symbol_") && options.allowSymbol
            ? Symbol(value.replace("_symbol_", ""))
            : typeof value === "string" && value.startsWith("_gsymbol_") && options.allowSymbol
              ? Symbol.for(value.replace("_gsymbol_", ""))
              : typeof value === "string" && value === "_-Infinity_"
                ? -1 / 0
                : typeof value === "string" && value === "_Infinity_"
                  ? 1 / 0
                  : typeof value === "string" && value === "_NaN_"
                    ? Number.NaN
                    : typeof value === "string" &&
                        value.startsWith("_bigint_") &&
                        typeof BigInt === "function"
                      ? BigInt(value.replace("_bigint_", ""))
                      : value;
    }, "revive");
  }, "reviver");
const Is = {
    maxDepth: 10,
    space: void 0,
    allowFunction: !0,
    allowRegExp: !0,
    allowDate: !0,
    allowClass: !0,
    allowError: !0,
    allowUndefined: !0,
    allowSymbol: !0,
    lazyEval: !0,
  };
const pt = n((t, e = {}) => {
    const r = { ...Is, ...e };
    return JSON.stringify(Os(t), _d(r), e.space);
  }, "stringify");
const Pd = n(() => {
    const t = new Map();
    return n(function e(r) {
      at(r) &&
        Object.entries(r).forEach(([o, a]) => {
          a === "_undefined_" ? (r[o] = void 0) : t.get(a) || (t.set(a, !0), e(a));
        }),
        Array.isArray(r) &&
          r.forEach((o, a) => {
            o === "_undefined_"
              ? (t.set(o, !0), (r[a] = void 0))
              : t.get(o) || (t.set(o, !0), e(o));
          });
    }, "mutateUndefined");
  }, "mutator");
const dt = n((t, e = {}) => {
    const r = { ...Is, ...e };
    const o = JSON.parse(t, Cd(r));
    return Pd()(o), o;
  }, "parse");
const vo = "Invariant failed";
function fe(t, e) {
  if (!t) throw new Error(vo);
}
n(fe, "invariant");
const Fs = n((t) => {
    const e = Array.from(document.querySelectorAll("iframe[data-is-storybook]"));
    const [r, ...o] = e.filter((i) => {
        let c;
        let d;
        try {
          return (
            ((c = i.contentWindow) == null ? void 0 : c.location.origin) ===
              t.source.location.origin &&
            ((d = i.contentWindow) == null ? void 0 : d.location.pathname) ===
              t.source.location.pathname
          );
        } catch {}
        try {
          return i.contentWindow === t.source;
        } catch {}
        const u = i.getAttribute("src");
        let l;
        try {
          if (!u) return !1;
          ({ origin: l } = new URL(u, document.location.toString()));
        } catch {
          return !1;
        }
        return l === t.origin;
      });
    const a = r == null ? void 0 : r.getAttribute("src");
    if (a && o.length === 0) {
      const { protocol: i, host: u, pathname: l } = new URL(a, document.location.toString());
      return `${i}//${u}${l}`;
    }
    return o.length > 0 && I$1.error("found multiple candidates for event source"), null;
  }, "getEventSourceUrl");
const { document: wo, location: _o } = E$1;
const Ds = "storybook-channel";
const Id = { allowFunction: !1, maxDepth: 25 };
const Co = class {
    constructor(e) {
      if (
        ((this.config = e),
        (this.connected = !1),
        (this.buffer = []),
        typeof (E$1 == null ? void 0 : E$1.addEventListener) === "function" &&
          E$1.addEventListener("message", this.handleEvent.bind(this), !1),
        e.page !== "manager" && e.page !== "preview")
      )
        throw new Error(`postmsg-channel: "config.page" cannot be "${e.page}"`);
    }
    setHandler(e) {
      this.handler = (...r) => {
        e.apply(this, r),
          !this.connected && this.getLocalFrame().length && (this.flush(), (this.connected = !0));
      };
    }
    send(e, r) {
      const {
          target: o,
          allowRegExp: a,
          allowFunction: i,
          allowSymbol: u,
          allowDate: l,
          allowError: c,
          allowUndefined: d,
          allowClass: m,
          maxDepth: h,
          space: g,
          lazyEval: re,
        } = r || {};
      const ne = Object.fromEntries(
          Object.entries({
            allowRegExp: a,
            allowFunction: i,
            allowSymbol: u,
            allowDate: l,
            allowError: c,
            allowUndefined: d,
            allowClass: m,
            maxDepth: h,
            space: g,
            lazyEval: re,
          }).filter(([se, he]) => typeof he < "u"),
        );
      const le = { ...Id, ...(E$1.CHANNEL_OPTIONS || {}), ...ne };
      const J = this.getFrames(o);
      const ce = new URLSearchParams((_o == null ? void 0 : _o.search) || "");
      const F = pt({ key: Ds, event: e, refId: ce.get("refId") }, le);
      return J.length
        ? (this.buffer.length && this.flush(),
          J.forEach((se) => {
            try {
              se.postMessage(F, "*");
            } catch {
              I$1.error("sending over postmessage fail");
            }
          }),
          Promise.resolve(null))
        : new Promise((se, he) => {
            this.buffer.push({ event: e, resolve: se, reject: he });
          });
    }
    flush() {
      const { buffer: e } = this;
      (this.buffer = []),
        e.forEach((r) => {
          this.send(r.event).then(r.resolve).catch(r.reject);
        });
    }
    getFrames(e) {
      if (this.config.page === "manager") {
        const r = Array.from(
          wo.querySelectorAll("iframe[data-is-storybook][data-is-loaded]"),
        ).flatMap((o) => {
          try {
            return o.contentWindow && o.dataset.isStorybook !== void 0 && o.id === e
              ? [o.contentWindow]
              : [];
          } catch {
            return [];
          }
        });
        return r?.length ? r : this.getCurrentFrames();
      }
      return E$1?.parent && E$1.parent !== E$1.self ? [E$1.parent] : [];
    }
    getCurrentFrames() {
      return this.config.page === "manager"
        ? Array.from(wo.querySelectorAll('[data-is-storybook="true"]')).flatMap((e) =>
            e.contentWindow ? [e.contentWindow] : [],
          )
        : E$1?.parent
          ? [E$1.parent]
          : [];
    }
    getLocalFrame() {
      return this.config.page === "manager"
        ? Array.from(wo.querySelectorAll("#storybook-preview-iframe")).flatMap((e) =>
            e.contentWindow ? [e.contentWindow] : [],
          )
        : E$1?.parent
          ? [E$1.parent]
          : [];
    }
    handleEvent(e) {
      try {
        const { data: r } = e;
        const {
            key: o,
            event: a,
            refId: i,
          } = typeof r === "string" && Sr(r) ? dt(r, E$1.CHANNEL_OPTIONS || {}) : r;
        if (o === Ds) {
          const u =
              this.config.page === "manager"
                ? '<span style="color: #37D5D3; background: black"> manager </span>'
                : '<span style="color: #1EA7FD; background: black"> preview </span>';
          const l = Object.values(ge).includes(a.type)
              ? `<span style="color: #FF4785">${a.type}</span>`
              : `<span style="color: #FFAE00">${a.type}</span>`;
          if (
            (i && (a.refId = i),
            (a.source = this.config.page === "preview" ? e.origin : Fs(e)),
            !a.source)
          ) {
            X.error(`${u} received ${l} but was unable to determine the source of the event`);
            return;
          }
          const c = `${u} received ${l} (${r.length})`;
          X.debug(
            _o.origin !== a.source
              ? c
              : `${c} <span style="color: gray">(on ${_o.origin} from ${a.source})</span>`,
            ...a.args,
          ),
            fe(this.handler, "ChannelHandler should be set"),
            this.handler(a);
        }
      } catch (r) {
        I$1.error(r);
      }
    }
  };
n(Co, "PostMessageTransport");
const Qe = Co;
const { WebSocket: Fd } = E$1;
const Po = 15e3;
const Oo = 5e3;
const Io = class {
    constructor({ url: e, onError: r, page: o }) {
      (this.buffer = []),
        (this.isReady = !1),
        (this.isClosed = !1),
        (this.pingTimeout = 0),
        (this.socket = new Fd(e)),
        (this.socket.onopen = () => {
          (this.isReady = !0), this.heartbeat(), this.flush();
        }),
        (this.socket.onmessage = ({ data: a }) => {
          const i = typeof a === "string" && Sr(a) ? dt(a) : a;
          fe(this.handler),
            this.handler(i),
            i.type === "ping" && (this.heartbeat(), this.send({ type: "pong" }));
        }),
        (this.socket.onerror = (a) => {
          r?.(a);
        }),
        (this.socket.onclose = (a) => {
          fe(this.handler),
            this.handler({
              type: Wt,
              args: [{ reason: a.reason, code: a.code }],
              from: o || "preview",
            }),
            (this.isClosed = !0),
            clearTimeout(this.pingTimeout);
        });
    }
    heartbeat() {
      clearTimeout(this.pingTimeout),
        (this.pingTimeout = setTimeout(() => {
          this.socket.close(3008, "timeout");
        }, Po + Oo));
    }
    setHandler(e) {
      this.handler = e;
    }
    send(e) {
      this.isClosed || (this.isReady ? this.sendNow(e) : this.sendLater(e));
    }
    sendLater(e) {
      this.buffer.push(e);
    }
    sendNow(e) {
      const r = pt(e, { maxDepth: 15, allowFunction: !1, ...E$1.CHANNEL_OPTIONS });
      this.socket.send(r);
    }
    flush() {
      const { buffer: e } = this;
      (this.buffer = []), e.forEach((r) => this.send(r));
    }
  };
n(Io, "WebsocketTransport");
const Ze = Io;
const { CONFIG_TYPE: Dd } = E$1;
const Nd = ie;
function kd({ page: t, extraTransports: e = [] }) {
  const r = [new Qe({ page: t }), ...e];
  if (Dd === "DEVELOPMENT") {
    const a = window.location.protocol === "http:" ? "ws" : "wss";
    const { hostname: i, port: u } = window.location;
    const l = `${a}://${i}:${u}/storybook-server-channel`;
    r.push(new Ze({ url: l, onError: n(() => {}, "onError"), page: t }));
  }
  const o = new ie({ transports: r });
  return Q.__prepare(o, t === "manager" ? Q.Environment.MANAGER : Q.Environment.PREVIEW), o;
}
n(kd, "createBrowserChannel");
const Tr = {};
_e(Tr, { Addon_TypesEnum: () => Ns });
const Ns = ((t) => (
    (t.TAB = "tab"),
    (t.PANEL = "panel"),
    (t.TOOL = "tool"),
    (t.TOOLEXTRA = "toolextra"),
    (t.PREVIEW = "preview"),
    (t.experimental_PAGE = "page"),
    (t.experimental_SIDEBAR_BOTTOM = "sidebar-bottom"),
    (t.experimental_SIDEBAR_TOP = "sidebar-top"),
    (t.experimental_TEST_PROVIDER = "test-provider"),
    t
  ))(Ns || {});
const Yr = {};
_e(Yr, {
  DocsContext: () => me,
  HooksContext: () => be,
  Preview: () => Me,
  PreviewWeb: () => Wr,
  PreviewWithSelection: () => Ue,
  ReporterAPI: () => Ee,
  StoryStore: () => Le,
  UrlStore: () => Be,
  WebView: () => He,
  addons: () => te$1,
  applyHooks: () => ft,
  combineArgs: () => tr,
  combineParameters: () => Y,
  composeConfigs: () => ke,
  composeStepRunners: () => Ct,
  composeStories: () => qi,
  composeStory: () => Pn,
  createPlaywrightTest: () => Bi,
  decorateStory: () => xn,
  defaultDecorateStory: () => vt,
  definePreview: () => ks,
  experimental_MockUniversalStore: () => gt,
  experimental_UniversalStore: () => Q,
  experimental_useUniversalStore: () => Si,
  filterArgTypes: () => Mr,
  getCsfFactoryAnnotations: () => Pt,
  inferControls: () => ir,
  makeDecorator: () => $s,
  mockChannel: () => ut,
  normalizeProjectAnnotations: () => Ne,
  normalizeStory: () => De,
  prepareMeta: () => wt,
  prepareStory: () => sr,
  sanitizeStoryContextUpdate: () => vn,
  setDefaultProjectAnnotations: () => Ui,
  setProjectAnnotations: () => Gi,
  simulateDOMContentLoaded: () => $r,
  simulatePageLoad: () => ss,
  sortStoriesV7: () => Ki,
  useArgs: () => zs,
  useCallback: () => er,
  useChannel: () => Vs,
  useEffect: () => Er,
  useGlobals: () => Ws,
  useMemo: () => Ms,
  useParameter: () => Hs,
  useReducer: () => Bs,
  useRef: () => Gs,
  useState: () => mt,
  useStoryContext: () => Rr,
  userOrAutoTitle: () => Wi,
  userOrAutoTitleFromSpecifier: () => Fn,
});
function ut() {
  const t = { setHandler: n(() => {}, "setHandler"), send: n(() => {}, "send") };
  return new ie({ transport: t });
}
n(ut, "mockChannel");
const No = class {
  constructor() {
    (this.getChannel = n(() => {
      if (!this.channel) {
        const e = ut();
        return this.setChannel(e), e;
      }
      return this.channel;
    }, "getChannel")),
      (this.ready = n(() => this.promise, "ready")),
      (this.hasChannel = n(() => !!this.channel, "hasChannel")),
      (this.setChannel = n((e) => {
        (this.channel = e), this.resolve();
      }, "setChannel")),
      (this.promise = new Promise((e) => {
        this.resolve = () => e(this.getChannel());
      }));
  }
};
n(No, "AddonStore");
const Do = No;
const Fo = "__STORYBOOK_ADDONS_PREVIEW";
function Ld() {
  return E$1[Fo] || (E$1[Fo] = new Do()), E$1[Fo];
}
n(Ld, "getAddonsStore");
const te$1 = Ld();
function ks(t) {
  return t;
}
n(ks, "definePreview");
const Mo = class {
  constructor() {
    (this.hookListsMap = void 0),
      (this.mountedDecorators = void 0),
      (this.prevMountedDecorators = void 0),
      (this.currentHooks = void 0),
      (this.nextHookIndex = void 0),
      (this.currentPhase = void 0),
      (this.currentEffects = void 0),
      (this.prevEffects = void 0),
      (this.currentDecoratorName = void 0),
      (this.hasUpdates = void 0),
      (this.currentContext = void 0),
      (this.renderListener = n((e) => {
        let r;
        e === ((r = this.currentContext) == null ? void 0 : r.id) &&
          (this.triggerEffects(), (this.currentContext = null), this.removeRenderListeners());
      }, "renderListener")),
      this.init();
  }
  init() {
    (this.hookListsMap = new WeakMap()),
      (this.mountedDecorators = new Set()),
      (this.prevMountedDecorators = new Set()),
      (this.currentHooks = []),
      (this.nextHookIndex = 0),
      (this.currentPhase = "NONE"),
      (this.currentEffects = []),
      (this.prevEffects = []),
      (this.currentDecoratorName = null),
      (this.hasUpdates = !1),
      (this.currentContext = null);
  }
  clean() {
    this.prevEffects.forEach((e) => {
      e.destroy?.();
    }),
      this.init(),
      this.removeRenderListeners();
  }
  getNextHook() {
    const e = this.currentHooks[this.nextHookIndex];
    return (this.nextHookIndex += 1), e;
  }
  triggerEffects() {
    this.prevEffects.forEach((e) => {
      !this.currentEffects.includes(e) && e.destroy && e.destroy();
    }),
      this.currentEffects.forEach((e) => {
        this.prevEffects.includes(e) || (e.destroy = e.create());
      }),
      (this.prevEffects = this.currentEffects),
      (this.currentEffects = []);
  }
  addRenderListeners() {
    this.removeRenderListeners(), te$1.getChannel().on(We, this.renderListener);
  }
  removeRenderListeners() {
    te$1.getChannel().removeListener(We, this.renderListener);
  }
};
n(Mo, "HooksContext");
const be = Mo;
function Ls(t) {
  const e = n((...r) => {
    const { hooks: o } = typeof r[0] === "function" ? r[1] : r[0];
    const a = o.currentPhase;
    const i = o.currentHooks;
    const u = o.nextHookIndex;
    const l = o.currentDecoratorName;
    (o.currentDecoratorName = t.name),
      o.prevMountedDecorators.has(t)
        ? ((o.currentPhase = "UPDATE"), (o.currentHooks = o.hookListsMap.get(t) || []))
        : ((o.currentPhase = "MOUNT"),
          (o.currentHooks = []),
          o.hookListsMap.set(t, o.currentHooks),
          o.prevMountedDecorators.add(t)),
      (o.nextHookIndex = 0);
    const c = E$1.STORYBOOK_HOOKS_CONTEXT;
    E$1.STORYBOOK_HOOKS_CONTEXT = o;
    const d = t(...r);
    if (((E$1.STORYBOOK_HOOKS_CONTEXT = c), o.currentPhase === "UPDATE" && o.getNextHook() != null))
      throw new Error(
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement.",
      );
    return (
      (o.currentPhase = a),
      (o.currentHooks = i),
      (o.nextHookIndex = u),
      (o.currentDecoratorName = l),
      d
    );
  }, "hookified");
  return (e.originalFn = t), e;
}
n(Ls, "hookify");
let ko = 0;
const jd = 25;
const ft = n(
    (t) => (e, r) => {
      const o = t(
        Ls(e),
        r.map((a) => Ls(a)),
      );
      return (a) => {
        const { hooks: i } = a;
        i.prevMountedDecorators ?? (i.prevMountedDecorators = new Set()),
          (i.mountedDecorators = new Set([e, ...r])),
          (i.currentContext = a),
          (i.hasUpdates = !1);
        let u = o(a);
        for (ko = 1; i.hasUpdates; )
          if (((i.hasUpdates = !1), (i.currentEffects = []), (u = o(a)), (ko += 1), ko > jd))
            throw new Error(
              "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop.",
            );
        return i.addRenderListeners(), u;
      };
    },
    "applyHooks",
  );
const Md = n((t, e) => t.length === e.length && t.every((r, o) => r === e[o]), "areDepsEqual");
const Lo = n(
    () =>
      new Error(
        "Storybook preview hooks can only be called inside decorators and story functions.",
      ),
    "invalidHooksError",
  );
function js() {
  return E$1.STORYBOOK_HOOKS_CONTEXT || null;
}
n(js, "getHooksContextOrNull");
function jo() {
  const t = js();
  if (t == null) throw Lo();
  return t;
}
n(jo, "getHooksContextOrThrow");
function Ud(t, e, r) {
  const o = jo();
  if (o.currentPhase === "MOUNT") {
    r != null &&
      !Array.isArray(r) &&
      I$1.warn(
        `${t} received a final argument that is not an array (instead, received ${r}). When specified, the final argument must be an array.`,
      );
    const a = { name: t, deps: r };
    return o.currentHooks.push(a), e(a), a;
  }
  if (o.currentPhase === "UPDATE") {
    const a = o.getNextHook();
    if (a == null) throw new Error("Rendered more hooks than during the previous render.");
    return (
      a.name !== t &&
        I$1.warn(
          `Storybook has detected a change in the order of Hooks${o.currentDecoratorName ? ` called by ${o.currentDecoratorName}` : ""}. This will lead to bugs and errors if not fixed.`,
        ),
      r != null &&
        a.deps == null &&
        I$1.warn(
          `${t} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`,
        ),
      r != null &&
        a.deps != null &&
        r.length !== a.deps.length &&
        I$1.warn(`The final argument passed to ${t} changed size between renders. The order and size of this array must remain constant.
Previous: ${a.deps}
Incoming: ${r}`),
      (r == null || a.deps == null || !Md(r, a.deps)) && (e(a), (a.deps = r)),
      a
    );
  }
  throw Lo();
}
n(Ud, "useHook");
function yt(t, e, r) {
  const { memoizedState: o } = Ud(
    t,
    (a) => {
      a.memoizedState = e();
    },
    r,
  );
  return o;
}
n(yt, "useMemoLike");
function Ms(t, e) {
  return yt("useMemo", t, e);
}
n(Ms, "useMemo");
function er(t, e) {
  return yt("useCallback", () => t, e);
}
n(er, "useCallback");
function Us(t, e) {
  return yt(t, () => ({ current: e }), []);
}
n(Us, "useRefLike");
function Gs(t) {
  return Us("useRef", t);
}
n(Gs, "useRef");
function Gd() {
  const t = js();
  if (t != null && t.currentPhase !== "NONE") t.hasUpdates = !0;
  else
    try {
      te$1.getChannel().emit(dr);
    } catch {
      I$1.warn("State updates of Storybook preview hooks work only in browser");
    }
}
n(Gd, "triggerUpdate");
function qs(t, e) {
  const r = Us(t, typeof e === "function" ? e() : e);
  const o = n((a) => {
      (r.current = typeof a === "function" ? a(r.current) : a), Gd();
    }, "setState");
  return [r.current, o];
}
n(qs, "useStateLike");
function mt(t) {
  return qs("useState", t);
}
n(mt, "useState");
function Bs(t, e, r) {
  const o = r != null ? () => r(e) : e;
  const [a, i] = qs("useReducer", o);
  return [a, n((u) => i((l) => t(l, u)), "dispatch")];
}
n(Bs, "useReducer");
function Er(t, e) {
  const r = jo();
  const o = yt("useEffect", () => ({ create: t }), e);
  r.currentEffects.includes(o) || r.currentEffects.push(o);
}
n(Er, "useEffect");
function Vs(t, e = []) {
  const r = te$1.getChannel();
  return (
    Er(
      () => (
        Object.entries(t).forEach(([o, a]) => r.on(o, a)),
        () => {
          Object.entries(t).forEach(([o, a]) => r.removeListener(o, a));
        }
      ),
      [...Object.keys(t), ...e],
    ),
    er(r.emit.bind(r), [r])
  );
}
n(Vs, "useChannel");
function Rr() {
  const { currentContext: t } = jo();
  if (t == null) throw Lo();
  return t;
}
n(Rr, "useStoryContext");
function Hs(t, e) {
  const { parameters: r } = Rr();
  if (t) return r[t] ?? e;
}
n(Hs, "useParameter");
function zs() {
  const t = te$1.getChannel();
  const { id: e, args: r } = Rr();
  const o = er((i) => t.emit(yr, { storyId: e, updatedArgs: i }), [t, e]);
  const a = er((i) => t.emit(ur, { storyId: e, argNames: i }), [t, e]);
  return [r, o, a];
}
n(zs, "useArgs");
function Ws() {
  const t = te$1.getChannel();
  const { globals: e } = Rr();
  const r = er((o) => t.emit(fr, { globals: o }), [t]);
  return [e, r];
}
n(Ws, "useGlobals");
const $s = n(({ name: t, parameterName: e, wrapper: r, skipIfNoParametersOrOptions: o = !1 }) => {
  const a = n(
    (i) => (u, l) => {
      const c = l.parameters?.[e];
      return (c?.disable) || (o && !i && !c) ? u(l) : r(u, l, { options: i, parameters: c });
    },
    "decorator",
  );
  return (...i) =>
    typeof i[0] === "function"
      ? a()(...i)
      : (...u) => {
          if (u.length > 1) return i.length > 1 ? a(i)(...u) : a(...i)(...u);
          throw new Error(`Passing stories directly into ${t}() is not allowed,
        instead use addDecorator(${t}) and pass options with the '${e}' parameter`);
        };
}, "makeDecorator");
function Uo(t, e) {
  const r = {};
  const o = Object.entries(t);
  for (let a = 0; a < o.length; a++) {
    const [i, u] = o[a];
    e(u, i) || (r[i] = u);
  }
  return r;
}
n(Uo, "omitBy");
function Go(t, e) {
  const r = {};
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    Object.prototype.hasOwnProperty.call(t, a) && (r[a] = t[a]);
  }
  return r;
}
n(Go, "pick");
function qo(t, e) {
  const r = {};
  const o = Object.entries(t);
  for (let a = 0; a < o.length; a++) {
    const [i, u] = o[a];
    e(u, i) && (r[i] = u);
  }
  return r;
}
n(qo, "pickBy");
function $$1(t) {
  if (typeof t !== "object" || t == null) return !1;
  if (Object.getPrototypeOf(t) === null) return !0;
  if (t.toString() !== "[object Object]") return !1;
  let e = t;
  while (Object.getPrototypeOf(e) !== null) e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
n($$1, "isPlainObject");
function oe(t, e) {
  const r = {};
  const o = Object.keys(t);
  for (let a = 0; a < o.length; a++) {
    const i = o[a];
    const u = t[i];
    r[i] = e(u, i, t);
  }
  return r;
}
n(oe, "mapValues");
const Ys = "[object RegExp]";
const Ks = "[object String]";
const Xs = "[object Number]";
const Js = "[object Boolean]";
const Bo = "[object Arguments]";
const Qs = "[object Symbol]";
const Zs = "[object Date]";
const ei = "[object Map]";
const ri = "[object Set]";
const ti = "[object Array]";
const oi = "[object Function]";
const ni = "[object ArrayBuffer]";
const ht = "[object Object]";
const si = "[object Error]";
const ii = "[object DataView]";
const ai = "[object Uint8Array]";
const li = "[object Uint8ClampedArray]";
const ci = "[object Uint16Array]";
const pi = "[object Uint32Array]";
const di = "[object BigUint64Array]";
const ui = "[object Int8Array]";
const fi = "[object Int16Array]";
const yi = "[object Int32Array]";
const mi = "[object BigInt64Array]";
const hi = "[object Float32Array]";
const gi = "[object Float64Array]";
function Vo(t) {
  return Object.getOwnPropertySymbols(t).filter((e) =>
    Object.prototype.propertyIsEnumerable.call(t, e),
  );
}
n(Vo, "getSymbols");
function Ho(t) {
  return t == null
    ? t === void 0
      ? "[object Undefined]"
      : "[object Null]"
    : Object.prototype.toString.call(t);
}
n(Ho, "getTag");
function Ar(t, e) {
  if (typeof t === typeof e)
    switch (typeof t) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return t === e;
      case "number":
        return t === e || Object.is(t, e);
      case "function":
        return t === e;
      case "object":
        return ye(t, e);
    }
  return ye(t, e);
}
n(Ar, "isEqual");
function ye(t, e, r) {
  if (Object.is(t, e)) return !0;
  let o = Ho(t);
  let a = Ho(e);
  if ((o === Bo && (o = ht), a === Bo && (a = ht), o !== a)) return !1;
  switch (o) {
    case Ks:
      return t.toString() === e.toString();
    case Xs: {
      const l = t.valueOf();
      const c = e.valueOf();
      return l === c || (Number.isNaN(l) && Number.isNaN(c));
    }
    case Js:
    case Zs:
    case Qs:
      return Object.is(t.valueOf(), e.valueOf());
    case Ys:
      return t.source === e.source && t.flags === e.flags;
    case oi:
      return t === e;
  }
  r = r ?? new Map();
  const i = r.get(t);
  const u = r.get(e);
  if (i != null && u != null) return i === e;
  r.set(t, e), r.set(e, t);
  try {
    switch (o) {
      case ei: {
        if (t.size !== e.size) return !1;
        for (const [l, c] of t.entries()) if (!e.has(l) || !ye(c, e.get(l), r)) return !1;
        return !0;
      }
      case ri: {
        if (t.size !== e.size) return !1;
        const l = Array.from(t.values());
        const c = Array.from(e.values());
        for (let d = 0; d < l.length; d++) {
          const m = l[d];
          const h = c.findIndex((g) => ye(m, g, r));
          if (h === -1) return !1;
          c.splice(h, 1);
        }
        return !0;
      }
      case ti:
      case ai:
      case li:
      case ci:
      case pi:
      case di:
      case ui:
      case fi:
      case yi:
      case mi:
      case hi:
      case gi: {
        if (
          (typeof Buffer < "u" && Buffer.isBuffer(t) !== Buffer.isBuffer(e)) ||
          t.length !== e.length
        )
          return !1;
        for (let l = 0; l < t.length; l++) if (!ye(t[l], e[l], r)) return !1;
        return !0;
      }
      case ni:
        return t.byteLength !== e.byteLength ? !1 : ye(new Uint8Array(t), new Uint8Array(e), r);
      case ii:
        return t.byteLength !== e.byteLength || t.byteOffset !== e.byteOffset
          ? !1
          : ye(t.buffer, e.buffer, r);
      case si:
        return t.name === e.name && t.message === e.message;
      case ht: {
        if (!(ye(t.constructor, e.constructor, r) || ($$1(t) && $$1(e)))) return !1;
        const l = [...Object.keys(t), ...Vo(t)];
        const c = [...Object.keys(e), ...Vo(e)];
        if (l.length !== c.length) return !1;
        for (let d = 0; d < l.length; d++) {
          const m = l[d];
          const h = t[m];
          if (!Object.prototype.hasOwnProperty.call(e, m)) return !1;
          const g = e[m];
          if (!ye(h, g, r)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(t), r.delete(e);
  }
}
n(ye, "areObjectsEqual");
const Si = n((t, e) => {
    const [r, o] = mt(e ? e(t.getState()) : t.getState());
    return (
      Er(
        () =>
          t.onStateChange((a, i) => {
            if (!e) {
              o(a);
              return;
            }
            const u = e(a);
            const l = e(i);
            !Ar(u, l) && o(u);
          }),
        [t, o, e],
      ),
      [r, t.setState]
    );
  }, "useUniversalStore");
const St = class Jn extends Q {
    constructor(e, r) {
      (Q.isInternalConstructing = !0),
        super({ ...e, leader: !0 }, { channel: new ie({}), environment: Q.Environment.MOCK }),
        (Q.isInternalConstructing = !1),
        typeof (r == null ? void 0 : r.fn) === "function" &&
          ((this.testUtils = r),
          (this.getState = r.fn(this.getState)),
          (this.setState = r.fn(this.setState)),
          (this.subscribe = r.fn(this.subscribe)),
          (this.onStateChange = r.fn(this.onStateChange)),
          (this.send = r.fn(this.send)));
    }
    static create(e, r) {
      return new Jn(e, r);
    }
    unsubscribeAll() {
      let r;
      let o;
      if (!this.testUtils)
        throw new Error(ps`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`);
      const e = n((a) => {
        try {
          a.value();
        } catch {}
      }, "callReturnedUnsubscribeFn");
      (r = this.subscribe.mock) == null || r.results.forEach(e),
        (o = this.onStateChange.mock) == null || o.results.forEach(e);
    }
  };
n(St, "MockUniversalStore");
const gt = St;
const kr = {};
_e(kr, {
  CalledExtractOnStoreError: () => vr,
  CalledPreviewMethodBeforeInitializationError: () => V,
  Category: () => Ti,
  EmptyIndexError: () => Pr,
  ImplicitActionsDuringRendering: () => zo,
  MdxFileWithNoCsfReferencesError: () => Cr,
  MissingRenderToCanvasError: () => wr,
  MissingStoryAfterHmrError: () => xr,
  MissingStoryFromCsfFileError: () => Ir,
  MountMustBeDestructuredError: () => Oe,
  NextJsSharpError: () => Wo,
  NextjsRouterMocksNotAvailable: () => $o,
  NoRenderFunctionError: () => Dr,
  NoStoryMatchError: () => Or,
  NoStoryMountedError: () => Nr,
  StoryIndexFetchError: () => _r,
  StoryStoreAccessedBeforeInitializationError: () => Fr,
  UnknownArgTypesError: () => Yo,
  UnsupportedViewportDimensionError: () => Ko,
});
function bi({ code: t, category: e }) {
  const r = String(t).padStart(4, "0");
  return `SB_${e}_${r}`;
}
n(bi, "parseErrorCode");
const bt = class Zn extends Error {
  constructor(e) {
    super(Zn.getFullMessage(e)),
      (this.data = {}),
      (this.fromStorybook = !0),
      (this.category = e.category),
      (this.documentation = e.documentation ?? !1),
      (this.code = e.code);
  }
  get fullErrorCode() {
    return bi({ code: this.code, category: this.category });
  }
  get name() {
    const e = this.constructor.name;
    return `${this.fullErrorCode} (${e})`;
  }
  static getFullMessage({ documentation: e, code: r, category: o, message: a }) {
    let i;
    return (
      e === !0
        ? (i = `https://storybook.js.org/error/${bi({ code: r, category: o })}`)
        : typeof e === "string"
          ? (i = e)
          : Array.isArray(e) &&
            (i = `
${e
  .map((u) => `	- ${u}`)
  .join(`
`)}`),
      `${a}${
        i != null
          ? `

More info: ${i}
`
          : ""
      }`
    );
  }
};
n(bt, "StorybookError");
const G = bt;
const Ti = ((t) => (
    (t.BLOCKS = "BLOCKS"),
    (t.DOCS_TOOLS = "DOCS-TOOLS"),
    (t.PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER"),
    (t.PREVIEW_CHANNELS = "PREVIEW_CHANNELS"),
    (t.PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS"),
    (t.PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER"),
    (t.PREVIEW_API = "PREVIEW_API"),
    (t.PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM"),
    (t.PREVIEW_ROUTER = "PREVIEW_ROUTER"),
    (t.PREVIEW_THEMING = "PREVIEW_THEMING"),
    (t.RENDERER_HTML = "RENDERER_HTML"),
    (t.RENDERER_PREACT = "RENDERER_PREACT"),
    (t.RENDERER_REACT = "RENDERER_REACT"),
    (t.RENDERER_SERVER = "RENDERER_SERVER"),
    (t.RENDERER_SVELTE = "RENDERER_SVELTE"),
    (t.RENDERER_VUE = "RENDERER_VUE"),
    (t.RENDERER_VUE3 = "RENDERER_VUE3"),
    (t.RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS"),
    (t.FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS"),
    (t.ADDON_VITEST = "ADDON_VITEST"),
    t
  ))(Ti || {});
const Xo = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 1,
        message: _$1`
        Couldn't find story matching id '${e.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${e.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`,
      }),
        (this.data = e);
    }
  };
n(Xo, "MissingStoryAfterHmrError");
const xr = Xo;
const Jo = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 2,
        documentation:
          "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function",
        message: _$1`
        We detected that you use an implicit action arg while ${e.phase} of your story.  
        ${
          e.deprecated
            ? `
This is deprecated and won't work in Storybook 8 anymore.
`
            : ""
        }
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${e.name}: fn()
          }`,
      }),
        (this.data = e);
    }
  };
n(Jo, "ImplicitActionsDuringRendering");
const zo = Jo;
const Qo = class extends G {
    constructor() {
      super({
        category: "PREVIEW_API",
        code: 3,
        message: _$1`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`,
      });
    }
  };
n(Qo, "CalledExtractOnStoreError");
const vr = Qo;
const Zo = class extends G {
    constructor() {
      super({
        category: "PREVIEW_API",
        code: 4,
        message: _$1`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
        documentation:
          "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field",
      });
    }
  };
n(Zo, "MissingRenderToCanvasError");
const wr = Zo;
const en = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 5,
        message: _$1`
        Called \`Preview.${e.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${e.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`,
      }),
        (this.data = e);
    }
  };
n(en, "CalledPreviewMethodBeforeInitializationError");
const V = en;
const rn = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 6,
        message: _$1`
        Error fetching \`/index.json\`:
        
        ${e.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`,
      }),
        (this.data = e);
    }
  };
n(rn, "StoryIndexFetchError");
const _r = rn;
const tn = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 7,
        message: _$1`
        Tried to render docs entry ${e.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`,
      }),
        (this.data = e);
    }
  };
n(tn, "MdxFileWithNoCsfReferencesError");
const Cr = tn;
const on = class extends G {
    constructor() {
      super({
        category: "PREVIEW_API",
        code: 8,
        message: _$1`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`,
      });
    }
  };
n(on, "EmptyIndexError");
const Pr = on;
const nn = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 9,
        message: _$1`
        Couldn't find story matching '${e.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`,
      }),
        (this.data = e);
    }
  };
n(nn, "NoStoryMatchError");
const Or = nn;
const sn = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 10,
        message: _$1`
        Couldn't find story matching id '${e.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`,
      }),
        (this.data = e);
    }
  };
n(sn, "MissingStoryFromCsfFileError");
const Ir = sn;
const an = class extends G {
    constructor() {
      super({
        category: "PREVIEW_API",
        code: 11,
        message: _$1`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`,
      });
    }
  };
n(an, "StoryStoreAccessedBeforeInitializationError");
const Fr = an;
const ln = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 12,
        message: _$1`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${e.playFunction}`,
      }),
        (this.data = e);
    }
  };
n(ln, "MountMustBeDestructuredError");
const Oe = ln;
const cn = class extends G {
    constructor(e) {
      super({
        category: "PREVIEW_API",
        code: 14,
        message: _$1`
        No render function available for storyId '${e.id}'
      `,
      }),
        (this.data = e);
    }
  };
n(cn, "NoRenderFunctionError");
const Dr = cn;
const pn = class extends G {
    constructor() {
      super({
        category: "PREVIEW_API",
        code: 15,
        message: _$1`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `,
      });
    }
  };
n(pn, "NoStoryMountedError");
const Nr = pn;
const dn = class extends G {
    constructor() {
      super({
        category: "FRAMEWORK_NEXTJS",
        code: 1,
        documentation: "https://storybook.js.org/docs/get-started/nextjs#faq",
        message: _$1`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `,
      });
    }
  };
n(dn, "NextJsSharpError");
const Wo = dn;
const un = class extends G {
    constructor(e) {
      super({
        category: "FRAMEWORK_NEXTJS",
        code: 2,
        message: _$1`
        Tried to access router mocks from "${e.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `,
      }),
        (this.data = e);
    }
  };
n(un, "NextjsRouterMocksNotAvailable");
const $o = un;
const fn = class extends G {
    constructor(e) {
      super({
        category: "DOCS-TOOLS",
        code: 1,
        documentation: "https://github.com/storybookjs/storybook/issues/26606",
        message: _$1`
        There was a failure when generating detailed ArgTypes in ${e.language} for:
        ${JSON.stringify(e.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `,
      }),
        (this.data = e);
    }
  };
n(fn, "UnknownArgTypesError");
const Yo = fn;
const yn = class extends G {
    constructor(e) {
      super({
        category: "ADDON_VITEST",
        code: 1,
        message: _$1`
        Encountered an unsupported value "${e.value}" when setting the viewport ${e.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `,
      }),
        (this.data = e);
    }
  };
n(yn, "UnsupportedViewportDimensionError");
const Ko = yn;
const Ot = ue(it());
const rr = Symbol("incompatible");
const mn = n((t, e) => {
    const r = e.type;
    if (t == null || !r || e.mapping) return t;
    switch (r.name) {
      case "string":
        return String(t);
      case "enum":
        return t;
      case "number":
        return Number(t);
      case "boolean":
        return String(t) === "true";
      case "array":
        return !r.value || !Array.isArray(t)
          ? rr
          : t.reduce((o, a, i) => {
              const u = mn(a, { type: r.value });
              return u !== rr && (o[i] = u), o;
            }, new Array(t.length));
      case "object":
        return typeof t === "string" || typeof t === "number"
          ? t
          : !r.value || typeof t !== "object"
            ? rr
            : Object.entries(t).reduce((o, [a, i]) => {
                const u = mn(i, { type: r.value[a] });
                return u === rr ? o : Object.assign(o, { [a]: u });
              }, {});
      default:
        return rr;
    }
  }, "map");
const Ei = n(
    (t, e) =>
      Object.entries(t).reduce((r, [o, a]) => {
        if (!e[o]) return r;
        const i = mn(a, e[o]);
        return i === rr ? r : Object.assign(r, { [o]: i });
      }, {}),
    "mapArgsToTypes",
  );
const tr = n(
    (t, e) =>
      Array.isArray(t) && Array.isArray(e)
        ? e.reduce((r, o, a) => ((r[a] = tr(t[a], e[a])), r), [...t]).filter((r) => r !== void 0)
        : !$$1(t) || !$$1(e)
          ? e
          : Object.keys({ ...t, ...e }).reduce((r, o) => {
              if (o in e) {
                const a = tr(t[o], e[o]);
                a !== void 0 && (r[o] = a);
              } else r[o] = t[o];
              return r;
            }, {}),
    "combineArgs",
  );
const Ri = n(
    (t, e) =>
      Object.entries(e).reduce((r, [o, { options: a }]) => {
        function i() {
          return o in t && (r[o] = t[o]), r;
        }
        if ((n(i, "allowArg"), !a)) return i();
        if (!Array.isArray(a))
          return (
            j$1.error(_$1`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `),
            i()
          );
        if (a.some((h) => h && ["object", "function"].includes(typeof h)))
          return (
            j$1.error(_$1`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `),
            i()
          );
        const u = Array.isArray(t[o]);
        const l = u && t[o].findIndex((h) => !a.includes(h));
        const c = u && l === -1;
        if (t[o] === void 0 || a.includes(t[o]) || c) return i();
        const d = u ? `${o}[${l}]` : o;
        const m = a.map((h) => (typeof h === "string" ? `'${h}'` : String(h))).join(", ");
        return j$1.warn(`Received illegal value for '${d}'. Supported options: ${m}`), r;
      }, {}),
    "validateOptions",
  );
const Ie = Symbol("Deeply equal");
const or = n((t, e) => {
    if (typeof t !== typeof e) return e;
    if (Ar(t, e)) return Ie;
    if (Array.isArray(t) && Array.isArray(e)) {
      const r = e.reduce((o, a, i) => {
        const u = or(t[i], a);
        return u !== Ie && (o[i] = u), o;
      }, new Array(e.length));
      return e.length >= t.length ? r : r.concat(new Array(t.length - e.length).fill(void 0));
    }
    return $$1(t) && $$1(e)
      ? Object.keys({ ...t, ...e }).reduce((r, o) => {
          const a = or(t == null ? void 0 : t[o], e == null ? void 0 : e[o]);
          return a === Ie ? r : Object.assign(r, { [o]: a });
        }, {})
      : e;
  }, "deepDiff");
const hn = "UNTARGETED";
function Ai({ args: t, argTypes: e }) {
  const r = {};
  return (
    Object.entries(t).forEach(([o, a]) => {
      const { target: i = hn } = e[o] || {};
      (r[i] = r[i] || {}), (r[i][o] = a);
    }),
    r
  );
}
n(Ai, "groupArgsByTarget");
function qd(t) {
  return Object.keys(t).forEach((e) => t[e] === void 0 && delete t[e]), t;
}
n(qd, "deleteUndefined");
const gn = class {
  constructor() {
    (this.initialArgsByStoryId = {}), (this.argsByStoryId = {});
  }
  get(e) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    return this.argsByStoryId[e];
  }
  setInitial(e) {
    if (!this.initialArgsByStoryId[e.id])
      (this.initialArgsByStoryId[e.id] = e.initialArgs), (this.argsByStoryId[e.id] = e.initialArgs);
    else if (this.initialArgsByStoryId[e.id] !== e.initialArgs) {
      const r = or(this.initialArgsByStoryId[e.id], this.argsByStoryId[e.id]);
      (this.initialArgsByStoryId[e.id] = e.initialArgs),
        (this.argsByStoryId[e.id] = e.initialArgs),
        r !== Ie && this.updateFromDelta(e, r);
    }
  }
  updateFromDelta(e, r) {
    const o = Ri(r, e.argTypes);
    this.argsByStoryId[e.id] = tr(this.argsByStoryId[e.id], o);
  }
  updateFromPersisted(e, r) {
    const o = Ei(r, e.argTypes);
    return this.updateFromDelta(e, o);
  }
  update(e, r) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    this.argsByStoryId[e] = qd({ ...this.argsByStoryId[e], ...r });
  }
};
n(gn, "ArgsStore");
const Tt = gn;
const Et = n(
    (t = {}) =>
      Object.entries(t).reduce(
        (e, [r, { defaultValue: o }]) => (typeof o < "u" && (e[r] = o), e),
        {},
      ),
    "getValuesFromArgTypes",
  );
const Sn = class {
    constructor({ globals: e = {}, globalTypes: r = {} }) {
      this.set({ globals: e, globalTypes: r });
    }
    set({ globals: e = {}, globalTypes: r = {} }) {
      const o = this.initialGlobals && or(this.initialGlobals, this.globals);
      this.allowedGlobalNames = new Set([...Object.keys(e), ...Object.keys(r)]);
      const a = Et(r);
      (this.initialGlobals = { ...a, ...e }),
        (this.globals = this.initialGlobals),
        o && o !== Ie && this.updateFromPersisted(o);
    }
    filterAllowedGlobals(e) {
      return Object.entries(e).reduce(
        (r, [o, a]) => (
          this.allowedGlobalNames.has(o)
            ? (r[o] = a)
            : I$1.warn(
                `Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`,
              ),
          r
        ),
        {},
      );
    }
    updateFromPersisted(e) {
      const r = this.filterAllowedGlobals(e);
      this.globals = { ...this.globals, ...r };
    }
    get() {
      return this.globals;
    }
    update(e) {
      this.globals = { ...this.globals, ...this.filterAllowedGlobals(e) };
    }
  };
n(Sn, "GlobalsStore");
const Rt = Sn;
const xi = ue(it());
const Bd = (0, xi.default)(1)((t) =>
    Object.values(t).reduce((e, r) => ((e[r.importPath] = e[r.importPath] || r), e), {}),
  );
const bn = class {
    constructor({ entries: e } = { v: 5, entries: {} }) {
      this.entries = e;
    }
    entryFromSpecifier(e) {
      const r = Object.values(this.entries);
      if (e === "*") return r[0];
      if (typeof e === "string")
        return this.entries[e] ? this.entries[e] : r.find((i) => i.id.startsWith(e));
      const { name: o, title: a } = e;
      return r.find((i) => i.name === o && i.title === a);
    }
    storyIdToEntry(e) {
      const r = this.entries[e];
      if (!r) throw new xr({ storyId: e });
      return r;
    }
    importPathToEntry(e) {
      return Bd(this.entries)[e];
    }
  };
n(bn, "StoryIndexStore");
const At = bn;
const Vd = n((t) => (typeof t === "string" ? { name: t } : t), "normalizeType");
const Hd = n((t) => (typeof t === "string" ? { type: t } : t), "normalizeControl");
const zd = n((t, e) => {
    const { type: r, control: o, ...a } = t;
    const i = { name: e, ...a };
    return (
      r && (i.type = Vd(r)), o ? (i.control = Hd(o)) : o === !1 && (i.control = { disable: !0 }), i
    );
  }, "normalizeInputType");
const Fe = n((t) => oe(t, zd), "normalizeInputTypes");
function vi(t) {
  return t
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\./g, " ")
    .replace(/([^\n])([A-Z])([a-z])/g, (e, r, o, a) => `${r} ${o}${a}`)
    .replace(/([a-z])([A-Z])/g, (e, r, o) => `${r} ${o}`)
    .replace(/([a-z])([0-9])/gi, (e, r, o) => `${r} ${o}`)
    .replace(/([0-9])([a-z])/gi, (e, r, o) => `${r} ${o}`)
    .replace(/(\s|^)(\w)/g, (e, r, o) => `${r}${o.toUpperCase()}`)
    .replace(/ +/g, " ")
    .trim();
}
n(vi, "toStartCaseStr");
const En = ue(wi());
const _i = n((t) => t.map((e) => typeof e < "u").filter(Boolean).length, "count");
const Wd = n((t, e) => {
    const { exists: r, eq: o, neq: a, truthy: i } = t;
    if (_i([r, o, a, i]) > 1)
      throw new Error(`Invalid conditional test ${JSON.stringify({ exists: r, eq: o, neq: a })}`);
    if (typeof o < "u") return (0, En.isEqual)(e, o);
    if (typeof a < "u") return !(0, En.isEqual)(e, a);
    if (typeof r < "u") {
      const u = typeof e < "u";
      return r ? u : !u;
    }
    return typeof i > "u" || i ? !!e : !e;
  }, "testValue");
const Rn = n((t, e, r) => {
    if (!t.if) return !0;
    const { arg: o, global: a } = t.if;
    if (_i([o, a]) !== 1)
      throw new Error(`Invalid conditional value ${JSON.stringify({ arg: o, global: a })}`);
    const i = o ? e[o] : r[a];
    return Wd(t.if, i);
  }, "includeConditionalArg");
function nr(t) {
  return (
    t != null && typeof t === "object" && "_tag" in t && (t == null ? void 0 : t._tag) === "Story"
  );
}
n(nr, "isStory");
const An = n(
    (t) =>
      t
        .toLowerCase()
        .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, ""),
    "sanitize",
  );
const Ci = n((t, e) => {
    const r = An(t);
    if (r === "") throw new Error(`Invalid ${e} '${t}', must include alphanumeric characters`);
    return r;
  }, "sanitizeSafe");
const Oi = n((t, e) => `${Ci(t, "kind")}${e ? `--${Ci(e, "name")}` : ""}`, "toId");
const Ii = n((t) => vi(t), "storyNameFromExport");
function Pi(t, e) {
  return Array.isArray(e) ? e.includes(t) : t.match(e);
}
n(Pi, "matches");
function Lr(t, { includeStories: e, excludeStories: r }) {
  return t !== "__esModule" && (!e || Pi(t, e)) && (!r || !Pi(t, r));
}
n(Lr, "isExportStory");
const Fi = n((...t) => {
    const e = t.reduce(
      (r, o) => (o.startsWith("!") ? r.delete(o.slice(1)) : r.add(o), r),
      new Set(),
    );
    return Array.from(e);
  }, "combineTags");
const k = n((t) => (Array.isArray(t) ? t : t ? [t] : []), "normalizeArrays");
const $d = _$1`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function De(t, e, r) {
  const o = e;
  const a = typeof e === "function" ? e : null;
  const { story: i } = o;
  i && (I$1.debug("deprecated story", i), ae($d));
  const u = Ii(t);
  const l = (typeof o !== "function" && o.name) || o.storyName || (i == null ? void 0 : i.name) || u;
  const c = [...k(o.decorators), ...k(i == null ? void 0 : i.decorators)];
  const d = { ...(i == null ? void 0 : i.parameters), ...o.parameters };
  const m = { ...(i == null ? void 0 : i.args), ...o.args };
  const h = { ...(i == null ? void 0 : i.argTypes), ...o.argTypes };
  const g = [...k(o.loaders), ...k(i == null ? void 0 : i.loaders)];
  const re = [...k(o.beforeEach), ...k(i == null ? void 0 : i.beforeEach)];
  const ne = [...k(o.experimental_afterEach), ...k(i == null ? void 0 : i.experimental_afterEach)];
  const { render: le, play: J, tags: ce = [], globals: F = {} } = o;
  const se = d.__id || Oi(r.id, u);
  return {
    moduleExport: e,
    id: se,
    name: l,
    tags: ce,
    decorators: c,
    parameters: d,
    args: m,
    argTypes: Fe(h),
    loaders: g,
    beforeEach: re,
    experimental_afterEach: ne,
    globals: F,
    ...(le && { render: le }),
    ...(a && { userStoryFn: a }),
    ...(J && { play: J }),
  };
}
n(De, "normalizeStory");
function jr(t, e, r) {
  const { id: o, argTypes: a } = t;
  return {
    id: An(o || e),
    ...t,
    title: e,
    ...(a && { argTypes: Fe(a) }),
    parameters: { fileName: r, ...t.parameters },
  };
}
n(jr, "normalizeComponentAnnotations");
const Yd = n((t) => {
    const { globals: e, globalTypes: r } = t;
    (e || r) &&
      I$1.error(
        "Global args/argTypes can only be set globally",
        JSON.stringify({ globals: e, globalTypes: r }),
      );
  }, "checkGlobals");
const Kd = n((t) => {
    const { options: e } = t;
    e?.storySort &&
      I$1.error("The storySort option parameter can only be set globally");
  }, "checkStorySort");
const xt = n((t) => {
    t && (Yd(t), Kd(t));
  }, "checkDisallowedParameters");
function Di(t, e, r) {
  const { default: o, __namedExportsOrder: a, ...i } = t;
  const u = Object.values(i)[0];
  if (nr(u)) {
    const d = jr(u.meta.input, r, e);
    xt(d.parameters);
    const m = { meta: d, stories: {}, moduleExports: t };
    return (
      Object.keys(i).forEach((h) => {
        if (Lr(h, d)) {
          const g = De(h, i[h].input, d);
          xt(g.parameters), (m.stories[g.id] = g);
        }
      }),
      (m.projectAnnotations = u.meta.preview.composed),
      m
    );
  }
  const l = jr(o, r, e);
  xt(l.parameters);
  const c = { meta: l, stories: {}, moduleExports: t };
  return (
    Object.keys(i).forEach((d) => {
      if (Lr(d, l)) {
        const m = De(d, i[d], l);
        xt(m.parameters), (c.stories[m.id] = m);
      }
    }),
    c
  );
}
n(Di, "processCSFFile");
function ki(t) {
  return t != null && Xd(t).includes("mount");
}
n(ki, "mountDestructured");
function Xd(t) {
  const e = t.toString().match(/[^(]*\(([^)]*)/);
  if (!e) return [];
  const r = Ni(e[1]);
  if (!r.length) return [];
  const o = r[0];
  return o.startsWith("{") && o.endsWith("}")
    ? Ni(o.slice(1, -1).replace(/\s/g, "")).map((a) => a.replace(/:.*|=.*/g, ""))
    : [];
}
n(Xd, "getUsedProps");
function Ni(t) {
  const e = [];
  const r = [];
  let o = 0;
  for (let i = 0; i < t.length; i++)
    if (t[i] === "{" || t[i] === "[") r.push(t[i] === "{" ? "}" : "]");
    else if (t[i] === r[r.length - 1]) r.pop();
    else if (!r.length && t[i] === ",") {
      const u = t.substring(o, i).trim();
      u && e.push(u), (o = i + 1);
    }
  const a = t.substring(o).trim();
  return a && e.push(a), e;
}
n(Ni, "splitByComma");
function xn(t, e, r) {
  const o = r(t);
  return (a) => e(o, a);
}
n(xn, "decorateStory");
function vn({
  componentId: t,
  title: e,
  kind: r,
  id: o,
  name: a,
  story: i,
  parameters: u,
  initialArgs: l,
  argTypes: c,
  ...d
} = {}) {
  return d;
}
n(vn, "sanitizeStoryContextUpdate");
function vt(t, e) {
  const r = {};
  const o = n(
      (i) => (u) => {
        if (!r.value) throw new Error("Decorated function called without init");
        return (r.value = { ...r.value, ...vn(u) }), i(r.value);
      },
      "bindWithContext",
    );
  const a = e.reduce((i, u) => xn(i, u, o), t);
  return (i) => ((r.value = i), a(i));
}
n(vt, "defaultDecorateStory");
const Y = n((...t) => {
  const e = {};
  const r = t.filter(Boolean);
  const o = r.reduce(
      (a, i) => (
        Object.entries(i).forEach(([u, l]) => {
          const c = a[u];
          Array.isArray(l) || typeof c > "u"
            ? (a[u] = l)
            : $$1(l) && $$1(c)
              ? (e[u] = !0)
              : typeof l < "u" && (a[u] = l);
        }),
        a
      ),
      {},
    );
  return (
    Object.keys(e).forEach((a) => {
      const i = r
        .filter(Boolean)
        .map((u) => u[a])
        .filter((u) => typeof u < "u");
      i.every((u) => $$1(u)) ? (o[a] = Y(...i)) : (o[a] = i[i.length - 1]);
    }),
    o
  );
}, "combineParameters");
function sr(t, e, r) {
  const { moduleExport: o, id: a, name: i } = t || {};
  const u = Li(t, e, r);
  const l = n(async (ve) => {
      const we = {};
      for (const Nt of [
        ...("__STORYBOOK_TEST_LOADERS__" in E$1 && Array.isArray(E$1.__STORYBOOK_TEST_LOADERS__)
          ? [E$1.__STORYBOOK_TEST_LOADERS__]
          : []),
        k(r.loaders),
        k(e.loaders),
        k(t.loaders),
      ]) {
        if (ve.abortSignal.aborted) return we;
        const Bt = await Promise.all(Nt.map((Ft) => Ft(ve)));
        Object.assign(we, ...Bt);
      }
      return we;
    }, "applyLoaders");
  const c = n(async (ve) => {
      const we = new Array();
      for (const Nt of [...k(r.beforeEach), ...k(e.beforeEach), ...k(t.beforeEach)]) {
        if (ve.abortSignal.aborted) return we;
        const Bt = await Nt(ve);
        Bt && we.push(Bt);
      }
      return we;
    }, "applyBeforeEach");
  const d = n(async (ve) => {
      const we = [
        ...k(r.experimental_afterEach),
        ...k(e.experimental_afterEach),
        ...k(t.experimental_afterEach),
      ].reverse();
      for (const Nt of we) {
        if (ve.abortSignal.aborted) return;
        await Nt(ve);
      }
    }, "applyAfterEach");
  const m = n((ve) => ve.originalStoryFn(ve.args, ve), "undecoratedStoryFn");
  const { applyDecorators: h = vt, runStep: g } = r;
  const re = [
      ...k(t == null ? void 0 : t.decorators),
      ...k(e == null ? void 0 : e.decorators),
      ...k(r == null ? void 0 : r.decorators),
    ];
  const ne =
      (t == null ? void 0 : t.userStoryFn) ||
      (t == null ? void 0 : t.render) ||
      e.render ||
      r.render;
  const le = ft(h)(m, re);
  const J = n((ve) => le(ve), "unboundStoryFn");
  const ce = (t == null ? void 0 : t.play) ?? (e == null ? void 0 : e.play);
  const F = ki(ce);
  if (!ne && !F) throw new Dr({ id: a });
  const se = n((ve) => async () => (await ve.renderToCanvas(), ve.canvas), "defaultMount");
  const he = t.mount ?? e.mount ?? r.mount ?? se;
  const Ve = r.testingLibraryRender;
  return {
    storyGlobals: {},
    ...u,
    moduleExport: o,
    id: a,
    name: i,
    story: i,
    originalStoryFn: ne,
    undecoratedStoryFn: m,
    unboundStoryFn: J,
    applyLoaders: l,
    applyBeforeEach: c,
    applyAfterEach: d,
    playFunction: ce,
    runStep: g,
    mount: he,
    testingLibraryRender: Ve,
    renderToCanvas: r.renderToCanvas,
    usesMount: F,
  };
}
n(sr, "prepareStory");
function wt(t, e, r) {
  return { ...Li(void 0, t, e), moduleExport: r };
}
n(wt, "prepareMeta");
function Li(t, e, r) {
  let ce;
  const o = ["dev", "test"];
  const a = ((ce = E$1.DOCS_OPTIONS) == null ? void 0 : ce.autodocs) === !0 ? ["autodocs"] : [];
  const i = Fi(
      ...o,
      ...a,
      ...(r.tags ?? []),
      ...(e.tags ?? []),
      ...((t == null ? void 0 : t.tags) ?? []),
    );
  const u = Y(r.parameters, e.parameters, t == null ? void 0 : t.parameters);
  const { argTypesEnhancers: l = [], argsEnhancers: c = [] } = r;
  const d = Y(r.argTypes, e.argTypes, t == null ? void 0 : t.argTypes);
  if (t) {
    const F =
      (t == null ? void 0 : t.userStoryFn) ||
      (t == null ? void 0 : t.render) ||
      e.render ||
      r.render;
    u.__isArgsStory = F && F.length > 0;
  }
  const m = { ...r.args, ...e.args, ...(t == null ? void 0 : t.args) };
  const h = { ...e.globals, ...(t == null ? void 0 : t.globals) };
  const g = {
      componentId: e.id,
      title: e.title,
      kind: e.title,
      id: (t == null ? void 0 : t.id) || e.id,
      name: (t == null ? void 0 : t.name) || "__meta",
      story: (t == null ? void 0 : t.name) || "__meta",
      component: e.component,
      subcomponents: e.subcomponents,
      tags: i,
      parameters: u,
      initialArgs: m,
      argTypes: d,
      storyGlobals: h,
    };
  g.argTypes = l.reduce((F, se) => se({ ...g, argTypes: F }), g.argTypes);
  const re = { ...m };
  g.initialArgs = c.reduce((F, se) => ({ ...F, ...se({ ...g, initialArgs: F }) }), re);
  const { name: ne, story: le, ...J } = g;
  return J;
}
n(Li, "preparePartialAnnotations");
function _t(t) {
  let i;
  const { args: e } = t;
  let r = { ...t, allArgs: void 0, argsByTarget: void 0 };
  if ((i = E$1.FEATURES) != null && i.argTypeTargetsV7) {
    const u = Ai(t);
    r = { ...t, allArgs: t.args, argsByTarget: u, args: u[hn] || {} };
  }
  const o = Object.entries(r.args).reduce((u, [l, c]) => {
      let m;
      if (!((m = r.argTypes[l]) != null && m.mapping)) return (u[l] = c), u;
      const d = n((h) => {
        const g = r.argTypes[l].mapping;
        return g && h in g ? g[h] : h;
      }, "mappingFn");
      return (u[l] = Array.isArray(c) ? c.map(d) : d(c)), u;
    }, {});
  const a = Object.entries(o).reduce((u, [l, c]) => {
      const d = r.argTypes[l] || {};
      return Rn(d, o, r.globals) && (u[l] = c), u;
    }, {});
  return { ...r, unmappedArgs: e, args: a };
}
n(_t, "prepareContext");
const wn = n((t, e, r) => {
    const o = typeof t;
    switch (o) {
      case "boolean":
      case "string":
      case "number":
      case "function":
      case "symbol":
        return { name: o };
    }
    return t
      ? r.has(t)
        ? (I$1.warn(_$1`
        We've detected a cycle in arg '${e}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `),
          { name: "other", value: "cyclic object" })
        : (r.add(t),
          Array.isArray(t)
            ? {
                name: "array",
                value: t.length > 0 ? wn(t[0], e, new Set(r)) : { name: "other", value: "unknown" },
              }
            : { name: "object", value: oe(t, (a) => wn(a, e, new Set(r))) })
      : { name: "object", value: {} };
  }, "inferType");
const _n = n((t) => {
    const { id: e, argTypes: r = {}, initialArgs: o = {} } = t;
    const a = oe(o, (u, l) => ({ name: l, type: wn(u, `${e}.${l}`, new Set()) }));
    const i = oe(r, (u, l) => ({ name: l }));
    return Y(a, i, r);
  }, "inferArgTypes");
_n.secondPass = !0;
const ji = n((t, e) => (Array.isArray(e) ? e.includes(t) : t.match(e)), "matches");
const Mr = n(
    (t, e, r) =>
      !e && !r
        ? t
        : t &&
          qo(t, (o, a) => {
            const i = o.name || a.toString();
            return !!(!e || ji(i, e)) && (!r || !ji(i, r));
          }),
    "filterArgTypes",
  );
const Jd = n((t, e, r) => {
    const { type: o, options: a } = t;
    if (o) {
      if (r.color?.test(e)) {
        const i = o.name;
        if (i === "string") return { control: { type: "color" } };
        i !== "enum" &&
          I$1.warn(
            `Addon controls: Control of type color only supports string, received "${i}" instead`,
          );
      }
      if (r.date?.test(e)) return { control: { type: "date" } };
      switch (o.name) {
        case "array":
          return { control: { type: "object" } };
        case "boolean":
          return { control: { type: "boolean" } };
        case "string":
          return { control: { type: "text" } };
        case "number":
          return { control: { type: "number" } };
        case "enum": {
          const { value: i } = o;
          return {
            control: { type: (i == null ? void 0 : i.length) <= 5 ? "radio" : "select" },
            options: i,
          };
        }
        case "function":
        case "symbol":
          return null;
        default:
          return { control: { type: a ? "select" : "object" } };
      }
    }
  }, "inferControl");
const ir = n((t) => {
    const {
      argTypes: e,
      parameters: {
        __isArgsStory: r,
        controls: { include: o = null, exclude: a = null, matchers: i = {} } = {},
      },
    } = t;
    if (!r) return e;
    const u = Mr(e, o, a);
    const l = oe(u, (c, d) => (c == null ? void 0 : c.type) && Jd(c, d.toString(), i));
    return Y(l, u);
  }, "inferControls");
ir.secondPass = !0;
function Ne({
  argTypes: t,
  globalTypes: e,
  argTypesEnhancers: r,
  decorators: o,
  loaders: a,
  beforeEach: i,
  experimental_afterEach: u,
  globals: l,
  initialGlobals: c,
  ...d
}) {
  return (
    l &&
      Object.keys(l).length > 0 &&
      ae(_$1`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `),
    {
      ...(t && { argTypes: Fe(t) }),
      ...(e && { globalTypes: Fe(e) }),
      decorators: k(o),
      loaders: k(a),
      beforeEach: k(i),
      experimental_afterEach: k(u),
      argTypesEnhancers: [...(r || []), _n, ir],
      initialGlobals: Y(c, l),
      ...d,
    }
  );
}
n(Ne, "normalizeProjectAnnotations");
const Mi = n(
  (t) => async () => {
    const e = [];
    for (const r of t) {
      const o = await r();
      o && e.unshift(o);
    }
    return async () => {
      for (const r of e) await r();
    };
  },
  "composeBeforeAllHooks",
);
function Ct(t) {
  return async (e, r, o) => {
    await t.reduceRight(
      (a, i) => async () => i(e, a, o),
      async () => r(o),
    )();
  };
}
n(Ct, "composeStepRunners");
function Gr(t, e) {
  return t
    .map((r) => {
      let o;
      return ((o = r.default) == null ? void 0 : o[e]) ?? r[e];
    })
    .filter(Boolean);
}
n(Gr, "getField");
function Te(t, e, r = {}) {
  return Gr(t, e).reduce((o, a) => {
    const i = k(a);
    return r.reverseFileOrder ? [...i, ...o] : [...o, ...i];
  }, []);
}
n(Te, "getArrayField");
function Ur(t, e) {
  return Object.assign({}, ...Gr(t, e));
}
n(Ur, "getObjectField");
function ar(t, e) {
  return Gr(t, e).pop();
}
n(ar, "getSingletonField");
function ke(t) {
  let a;
  const e = Te(t, "argTypesEnhancers");
  const r = Gr(t, "runStep");
  const o = Te(t, "beforeAll");
  return {
    parameters: Y(...Gr(t, "parameters")),
    decorators: Te(t, "decorators", {
      reverseFileOrder: !(((a = E$1.FEATURES) == null ? void 0 : a.legacyDecoratorFileOrder) ?? !1),
    }),
    args: Ur(t, "args"),
    argsEnhancers: Te(t, "argsEnhancers"),
    argTypes: Ur(t, "argTypes"),
    argTypesEnhancers: [...e.filter((i) => !i.secondPass), ...e.filter((i) => i.secondPass)],
    globals: Ur(t, "globals"),
    initialGlobals: Ur(t, "initialGlobals"),
    globalTypes: Ur(t, "globalTypes"),
    loaders: Te(t, "loaders"),
    beforeAll: Mi(o),
    beforeEach: Te(t, "beforeEach"),
    experimental_afterEach: Te(t, "experimental_afterEach"),
    render: ar(t, "render"),
    renderToCanvas: ar(t, "renderToCanvas"),
    renderToDOM: ar(t, "renderToDOM"),
    applyDecorators: ar(t, "applyDecorators"),
    runStep: Ct(r),
    tags: Te(t, "tags"),
    mount: ar(t, "mount"),
    testingLibraryRender: ar(t, "testingLibraryRender"),
  };
}
n(ke, "composeConfigs");
const Cn = class {
  constructor() {
    this.reports = [];
  }
  async addReport(e) {
    this.reports.push(e);
  }
};
n(Cn, "ReporterAPI");
const Ee = Cn;
function Pt(t, e, r) {
  return nr(t)
    ? { story: t.input, meta: t.meta.input, preview: t.meta.preview.composed }
    : { story: t, meta: e, preview: r };
}
n(Pt, "getCsfFactoryAnnotations");
function Ui(t) {
  globalThis.defaultProjectAnnotations = t;
}
n(Ui, "setDefaultProjectAnnotations");
const Qd = "ComposedStory";
const Zd = "Unnamed Story";
function eu(t) {
  return t ? ke([t]) : {};
}
n(eu, "extractAnnotation");
function Gi(t) {
  const e = Array.isArray(t) ? t : [t];
  return (
    (globalThis.globalProjectAnnotations = ke([
      globalThis.defaultProjectAnnotations ?? {},
      ke(e.map(eu)),
    ])),
    globalThis.globalProjectAnnotations ?? {}
  );
}
n(Gi, "setProjectAnnotations");
const Re = [];
function Pn(t, e, r, o, a) {
  let ce;
  if (t === void 0) throw new Error("Expected a story but received undefined.");
  e.title = e.title ?? Qd;
  const i = jr(e);
  const u = a || t.storyName || ((ce = t.story) == null ? void 0 : ce.name) || t.name || Zd;
  const l = De(u, t, i);
  const c = Ne(ke([o ?? globalThis.globalProjectAnnotations ?? {}, r ?? {}]));
  const d = sr(l, i, c);
  const m = { ...Et(c.globalTypes), ...c.initialGlobals, ...d.storyGlobals };
  const h = new Ee();
  const g = n(() => {
      const F = _t({
        hooks: new be(),
        globals: m,
        args: { ...d.initialArgs },
        viewMode: "story",
        reporting: h,
        loaded: {},
        abortSignal: new AbortController().signal,
        step: n((se, he) => d.runStep(se, he, F), "step"),
        canvasElement: null,
        canvas: {},
        globalTypes: c.globalTypes,
        ...d,
        context: null,
        mount: null,
      });
      return (
        (F.parameters.__isPortableStory = !0),
        (F.context = F),
        d.renderToCanvas &&
          (F.renderToCanvas = async () => {
            let he;
            const se = await ((he = d.renderToCanvas) == null
              ? void 0
              : he.call(
                  d,
                  {
                    componentId: d.componentId,
                    title: d.title,
                    id: d.id,
                    name: d.name,
                    tags: d.tags,
                    showMain: n(() => {}, "showMain"),
                    showError: n((Ve) => {
                      throw new Error(`${Ve.title}
${Ve.description}`);
                    }, "showError"),
                    showException: n((Ve) => {
                      throw Ve;
                    }, "showException"),
                    forceRemount: !0,
                    storyContext: F,
                    storyFn: n(() => d.unboundStoryFn(F), "storyFn"),
                    unboundStoryFn: d.unboundStoryFn,
                  },
                  F.canvasElement,
                ));
            se && Re.push(se);
          }),
        (F.mount = d.mount(F)),
        F
      );
    }, "initializeContext");
  let re;
  const ne = n(async (F) => {
      let he;
      const se = g();
      return (
        se.canvasElement ??
          (se.canvasElement =
            (he = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : he.body),
        re && (se.loaded = re.loaded),
        Object.assign(se, F),
        d.playFunction(se)
      );
    }, "play");
  const le = n((F) => {
      const se = g();
      return Object.assign(se, F), tu(d, se);
    }, "run");
  const J = d.playFunction ? ne : void 0;
  return Object.assign(
    n((F) => {
      const se = g();
      return (
        re && (se.loaded = re.loaded), (se.args = { ...se.initialArgs, ...F }), d.unboundStoryFn(se)
      );
    }, "storyFn"),
    {
      id: d.id,
      storyName: u,
      load: n(async () => {
        for (const se of [...Re].reverse()) await se();
        Re.length = 0;
        const F = g();
        (F.loaded = await d.applyLoaders(F)),
          Re.push(...(await d.applyBeforeEach(F)).filter(Boolean)),
          (re = F);
      }, "load"),
      globals: m,
      args: d.initialArgs,
      parameters: d.parameters,
      argTypes: d.argTypes,
      play: J,
      run: le,
      reporting: h,
      tags: d.tags,
    },
  );
}
n(Pn, "composeStory");
const ru = n((t, e, r, o) => Pn(t, e, r, {}, o), "defaultComposeStory");
function qi(t, e, r = ru) {
  const { default: o, __esModule: a, __namedExportsOrder: i, ...u } = t;
  let l = o;
  return Object.entries(u).reduce((c, [d, m]) => {
    const { story: h, meta: g } = Pt(m);
    return !l && g && (l = g), Lr(d, l) ? Object.assign(c, { [d]: r(h, l, e, d) }) : c;
  }, {});
}
n(qi, "composeStories");
function Bi(t) {
  return t.extend({
    mount: n(async ({ mount: e, page: r }, o) => {
      await o(async (a, ...i) => {
        if (!("__pw_type" in a) || ("__pw_type" in a && a.__pw_type !== "jsx"))
          throw new Error(_$1`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        await r.evaluate(async (l) => {
          let d;
          let m;
          let h;
          const c = await ((d = globalThis.__pwUnwrapObject) == null
            ? void 0
            : d.call(globalThis, l));
          return (h = (m = "__pw_type" in c ? c.type : c) == null ? void 0 : m.load) == null
            ? void 0
            : h.call(m);
        }, a);
        const u = await e(a, ...i);
        return (
          await r.evaluate(async (l) => {
            let h;
            let g;
            const c = await ((h = globalThis.__pwUnwrapObject) == null
                ? void 0
                : h.call(globalThis, l));
            const d = "__pw_type" in c ? c.type : c;
            const m = document.querySelector("#root");
            return (g = d == null ? void 0 : d.play) == null
              ? void 0
              : g.call(d, { canvasElement: m });
          }, a),
          u
        );
      });
    }, "mount"),
  });
}
n(Bi, "createPlaywrightTest");
async function tu(t, e) {
  let a;
  let i;
  for (const u of [...Re].reverse()) await u();
  if (((Re.length = 0), !e.canvasElement)) {
    const u = document.createElement("div");
    (i = (a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body) ==
      null || i.appendChild(u),
      (e.canvasElement = u),
      Re.push(() => {
        let l;
        let c;
        let d;
        let m;
        (c = (l = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : l.body) !=
          null &&
          c.contains(u) &&
          ((m =
            (d = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : d.body) ==
            null ||
            m.removeChild(u));
      });
  }
  if (((e.loaded = await t.applyLoaders(e)), e.abortSignal.aborted)) return;
  Re.push(...(await t.applyBeforeEach(e)).filter(Boolean));
  const r = t.playFunction;
  const o = t.usesMount;
  o || (await e.mount()),
    !e.abortSignal.aborted &&
      (r &&
        (o ||
          (e.mount = async () => {
            throw new Oe({ playFunction: r.toString() });
          }),
        await r(e)),
      await t.applyAfterEach(e));
}
n(tu, "runStory");
function Vi(t, e) {
  return Uo(Go(t, e), (r) => r === void 0);
}
n(Vi, "picky");
const Hi = 1e3;
const ou = 1e4;
const On = class {
    constructor(e, r, o) {
      (this.importFn = r),
        (this.getStoriesJsonData = n(() => {
          const u = this.getSetStoriesPayload();
          const l = ["fileName", "docsOnly", "framework", "__id", "__isArgsStory"];
          return {
            v: 3,
            stories: oe(u.stories, (c) => {
              const { importPath: d } = this.storyIndex.entries[c.id];
              return {
                ...Vi(c, ["id", "name", "title"]),
                importPath: d,
                kind: c.title,
                story: c.name,
                parameters: { ...Vi(c.parameters, l), fileName: d },
              };
            }),
          };
        }, "getStoriesJsonData")),
        (this.storyIndex = new At(e)),
        (this.projectAnnotations = Ne(o));
      const { initialGlobals: a, globalTypes: i } = this.projectAnnotations;
      (this.args = new Tt()),
        (this.userGlobals = new Rt({ globals: a, globalTypes: i })),
        (this.hooks = {}),
        (this.cleanupCallbacks = {}),
        (this.processCSFFileWithCache = (0, Ot.default)(Hi)(Di)),
        (this.prepareMetaWithCache = (0, Ot.default)(Hi)(wt)),
        (this.prepareStoryWithCache = (0, Ot.default)(ou)(sr));
    }
    setProjectAnnotations(e) {
      this.projectAnnotations = Ne(e);
      const { initialGlobals: r, globalTypes: o } = e;
      this.userGlobals.set({ globals: r, globalTypes: o });
    }
    async onStoriesChanged({ importFn: e, storyIndex: r }) {
      e && (this.importFn = e),
        r && (this.storyIndex.entries = r.entries),
        this.cachedCSFFiles && (await this.cacheAllCSFFiles());
    }
    async storyIdToEntry(e) {
      return this.storyIndex.storyIdToEntry(e);
    }
    async loadCSFFileByStoryId(e) {
      const { importPath: r, title: o } = this.storyIndex.storyIdToEntry(e);
      const a = await this.importFn(r);
      return this.processCSFFileWithCache(a, r, o);
    }
    async loadAllCSFFiles() {
      const e = {};
      return (
        Object.entries(this.storyIndex.entries).forEach(([r, { importPath: o }]) => {
          e[o] = r;
        }),
        (
          await Promise.all(
            Object.entries(e).map(async ([r, o]) => ({
              importPath: r,
              csfFile: await this.loadCSFFileByStoryId(o),
            })),
          )
        ).reduce((r, { importPath: o, csfFile: a }) => ((r[o] = a), r), {})
      );
    }
    async cacheAllCSFFiles() {
      this.cachedCSFFiles = await this.loadAllCSFFiles();
    }
    preparedMetaFromCSFFile({ csfFile: e }) {
      const r = e.meta;
      return this.prepareMetaWithCache(r, this.projectAnnotations, e.moduleExports.default);
    }
    async loadStory({ storyId: e }) {
      const r = await this.loadCSFFileByStoryId(e);
      return this.storyFromCSFFile({ storyId: e, csfFile: r });
    }
    storyFromCSFFile({ storyId: e, csfFile: r }) {
      const o = r.stories[e];
      if (!o) throw new Ir({ storyId: e });
      const a = r.meta;
      const i = this.prepareStoryWithCache(o, a, r.projectAnnotations ?? this.projectAnnotations);
      return this.args.setInitial(i), (this.hooks[i.id] = this.hooks[i.id] || new be()), i;
    }
    componentStoriesFromCSFFile({ csfFile: e }) {
      return Object.keys(this.storyIndex.entries)
        .filter((r) => !!e.stories[r])
        .map((r) => this.storyFromCSFFile({ storyId: r, csfFile: e }));
    }
    async loadEntry(e) {
      const r = await this.storyIdToEntry(e);
      const o = r.type === "docs" ? r.storiesImports : [];
      const [a, ...i] = await Promise.all([
          this.importFn(r.importPath),
          ...o.map((u) => {
            const l = this.storyIndex.importPathToEntry(u);
            return this.loadCSFFileByStoryId(l.id);
          }),
        ]);
      return { entryExports: a, csfFiles: i };
    }
    getStoryContext(e, { forceInitialArgs: r = !1 } = {}) {
      const o = this.userGlobals.get();
      const { initialGlobals: a } = this.userGlobals;
      const i = new Ee();
      return _t({
        ...e,
        args: r ? e.initialArgs : this.args.get(e.id),
        initialGlobals: a,
        globalTypes: this.projectAnnotations.globalTypes,
        userGlobals: o,
        reporting: i,
        globals: { ...o, ...e.storyGlobals },
        hooks: this.hooks[e.id],
      });
    }
    addCleanupCallbacks(e, r) {
      this.cleanupCallbacks[e.id] = r;
    }
    async cleanupStory(e) {
      this.hooks[e.id].clean();
      const r = this.cleanupCallbacks[e.id];
      if (r) for (const o of [...r].reverse()) await o();
      delete this.cleanupCallbacks[e.id];
    }
    extract(e = { includeDocsOnly: !1 }) {
      const { cachedCSFFiles: r } = this;
      if (!r) throw new vr();
      return Object.entries(this.storyIndex.entries).reduce(
        (o, [a, { type: i, importPath: u }]) => {
          if (i === "docs") return o;
          const l = r[u];
          const c = this.storyFromCSFFile({ storyId: a, csfFile: l });
          return (
            (!e.includeDocsOnly && c.parameters.docsOnly) ||
              (o[a] = Object.entries(c).reduce(
                (d, [m, h]) =>
                  m === "moduleExport" || typeof h === "function"
                    ? d
                    : Array.isArray(h)
                      ? Object.assign(d, { [m]: h.slice().sort() })
                      : Object.assign(d, { [m]: h }),
                {
                  args: c.initialArgs,
                  globals: {
                    ...this.userGlobals.initialGlobals,
                    ...this.userGlobals.globals,
                    ...c.storyGlobals,
                  },
                },
              )),
            o
          );
        },
        {},
      );
    }
    getSetStoriesPayload() {
      const e = this.extract({ includeDocsOnly: !0 });
      const r = Object.values(e).reduce((o, { title: a }) => ((o[a] = {}), o), {});
      return {
        v: 2,
        globals: this.userGlobals.get(),
        globalParameters: {},
        kindParameters: r,
        stories: e,
      };
    }
    raw() {
      return (
        ae(
          "StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead",
        ),
        Object.values(this.extract())
          .map(({ id: e }) => this.fromId(e))
          .filter(Boolean)
      );
    }
    fromId(e) {
      if (
        (ae(
          "StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead",
        ),
        !this.cachedCSFFiles)
      )
        throw new Error("Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.");
      let r;
      try {
        ({ importPath: r } = this.storyIndex.storyIdToEntry(e));
      } catch {
        return null;
      }
      const o = this.cachedCSFFiles[r];
      const a = this.storyFromCSFFile({ storyId: e, csfFile: o });
      return {
        ...a,
        storyFn: n((i) => {
          const u = {
            ...this.getStoryContext(a),
            abortSignal: new AbortController().signal,
            canvasElement: null,
            loaded: {},
            step: n((l, c) => a.runStep(l, c, u), "step"),
            context: null,
            mount: null,
            canvas: {},
            viewMode: "story",
          };
          return a.unboundStoryFn({ ...u, ...i });
        }, "storyFn"),
      };
    }
  };
n(On, "StoryStore");
const Le = On;
function In(t) {
  return t.startsWith("\\\\?\\") ? t : t.replace(/\\/g, "/");
}
n(In, "slash");
const nu = n((t) => {
  if (t.length === 0) return t;
  const e = t[t.length - 1];
  const r = e == null ? void 0 : e.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
  if (t.length === 1) return [r];
  const o = t[t.length - 2];
  return r && o && r.toLowerCase() === o.toLowerCase()
    ? [...t.slice(0, -2), r]
    : r && (/^(story|stories)([.][^.]+)$/i.test(e) || /^index$/i.test(r))
      ? t.slice(0, -1)
      : [...t.slice(0, -1), r];
}, "sanitize");
function zi(t) {
  return t
    .flatMap((e) => e.split("/"))
    .filter(Boolean)
    .join("/");
}
n(zi, "pathJoin");
const Fn = n((t, e, r) => {
    const { directory: o, importPathMatcher: a, titlePrefix: i = "" } = e || {};
    typeof t === "number" &&
      j$1.warn(_$1`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
    const u = In(String(t));
    if (a.exec(u)) {
      if (!r) {
        const l = u.replace(o, "");
        let c = zi([i, l]).split("/");
        return (c = nu(c)), c.join("/");
      }
      return i ? zi([i, r]) : r;
    }
  }, "userOrAutoTitleFromSpecifier");
const Wi = n((t, e, r) => {
    for (let o = 0; o < e.length; o += 1) {
      const a = Fn(t, e[o], r);
      if (a) return a;
    }
    return r || void 0;
  }, "userOrAutoTitle");
const $i = /\s*\/\s*/;
const Yi = n(
    (t = {}) =>
      (e, r) => {
        if (e.title === r.title && !t.includeNames) return 0;
        const o = t.method || "configure";
        let a = t.order || [];
        const i = e.title.trim().split($i);
        const u = r.title.trim().split($i);
        t.includeNames && (i.push(e.name), u.push(r.name));
        let l = 0;
        while (i[l] || u[l]) {
          if (!i[l]) return -1;
          if (!u[l]) return 1;
          const c = i[l];
          const d = u[l];
          if (c !== d) {
            let h = a.indexOf(c);
            let g = a.indexOf(d);
            const re = a.indexOf("*");
            return h !== -1 || g !== -1
              ? (h === -1 && (re !== -1 ? (h = re) : (h = a.length)),
                g === -1 && (re !== -1 ? (g = re) : (g = a.length)),
                h - g)
              : o === "configure"
                ? 0
                : c.localeCompare(d, t.locales ? t.locales : void 0, {
                    numeric: !0,
                    sensitivity: "accent",
                  });
          }
          let m = a.indexOf(c);
          m === -1 && (m = a.indexOf("*")),
            (a = m !== -1 && Array.isArray(a[m + 1]) ? a[m + 1] : []),
            (l += 1);
        }
        return 0;
      },
    "storySort",
  );
const su = n((t, e, r) => {
    if (e) {
      let o;
      typeof e === "function" ? (o = e) : (o = Yi(e)), t.sort(o);
    } else t.sort((o, a) => r.indexOf(o.importPath) - r.indexOf(a.importPath));
    return t;
  }, "sortStoriesCommon");
const Ki = n((t, e, r) => {
    try {
      return su(t, e, r);
    } catch (o) {
      throw new Error(_$1`
    Error sorting stories with sort parameter ${e}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
    }
  }, "sortStoriesV7");
const Ae = new Error("prepareAborted");
const { AbortController: Xi } = globalThis;
function Ji(t) {
  try {
    const { name: e = "Error", message: r = String(t), stack: o } = t;
    return { name: e, message: r, stack: o };
  } catch {
    return { name: "Error", message: String(t) };
  }
}
n(Ji, "serializeError");
const Dn = class {
  constructor(e, r, o, a, i, u, l, c) {
    (this.channel = e),
      (this.store = r),
      (this.renderToScreen = o),
      (this.callbacks = a),
      (this.id = i),
      (this.viewMode = u),
      (this.renderOptions = l),
      (this.type = "story"),
      (this.notYetRendered = !0),
      (this.rerenderEnqueued = !1),
      (this.disableKeyListeners = !1),
      (this.teardownRender = n(() => {}, "teardownRender")),
      (this.torndown = !1),
      (this.abortController = new Xi()),
      c && ((this.story = c), (this.phase = "preparing"));
  }
  async runPhase(e, r, o) {
    (this.phase = r),
      this.channel.emit(Pe, { newPhase: this.phase, storyId: this.id }),
      o && (await o(), this.checkIfAborted(e));
  }
  checkIfAborted(e) {
    return e.aborted
      ? ((this.phase = "aborted"),
        this.channel.emit(Pe, { newPhase: this.phase, storyId: this.id }),
        !0)
      : !1;
  }
  async prepare() {
    if (
      (await this.runPhase(this.abortController.signal, "preparing", async () => {
        this.story = await this.store.loadStory({ storyId: this.id });
      }),
      this.abortController.signal.aborted)
    )
      throw (await this.store.cleanupStory(this.story), Ae);
  }
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  isPreparing() {
    return ["preparing"].includes(this.phase);
  }
  isPending() {
    return ["loading", "beforeEach", "rendering", "playing", "afterEach"].includes(this.phase);
  }
  async renderToElement(e) {
    return (this.canvasElement = e), this.render({ initial: !0, forceRemount: !0 });
  }
  storyContext() {
    if (!this.story) throw new Error("Cannot call storyContext before preparing");
    const { forceInitialArgs: e } = this.renderOptions;
    return this.store.getStoryContext(this.story, { forceInitialArgs: e });
  }
  async render({ initial: e = !1, forceRemount: r = !1 } = {}) {
    let se;
    let he;
    let Ve;
    let ve;
    const { canvasElement: o } = this;
    if (!this.story) throw new Error("cannot render when not prepared");
    const a = this.story;
    if (!o) throw new Error("cannot render when canvasElement is unset");
    const {
      id: i,
      componentId: u,
      title: l,
      name: c,
      tags: d,
      applyLoaders: m,
      applyBeforeEach: h,
      applyAfterEach: g,
      unboundStoryFn: re,
      playFunction: ne,
      runStep: le,
    } = a;
    r && !e && (this.cancelRender(), (this.abortController = new Xi()));
    const J = this.abortController.signal;
    let ce = !1;
    const F = a.usesMount;
    try {
      const we = {
        ...this.storyContext(),
        viewMode: this.viewMode,
        abortSignal: J,
        canvasElement: o,
        loaded: {},
        step: n((B, de) => le(B, de, we), "step"),
        context: null,
        canvas: {},
        renderToCanvas: n(async () => {
          const B = await this.renderToScreen(Nt, o);
          (this.teardownRender = B || (() => {})), (ce = !0);
        }, "renderToCanvas"),
        mount: n(async (...B) => {
          let pe;
          let Lt;
          (Lt = (pe = this.callbacks).showStoryDuringRender) == null || Lt.call(pe);
          let de = null;
          return (
            await this.runPhase(J, "rendering", async () => {
              de = await a.mount(we)(...B);
            }),
            F && (await this.runPhase(J, "playing")),
            de
          );
        }, "mount"),
      };
      we.context = we;
      const Nt = {
        componentId: u,
        title: l,
        kind: l,
        id: i,
        name: c,
        story: c,
        tags: d,
        ...this.callbacks,
        showError: n((B) => ((this.phase = "errored"), this.callbacks.showError(B)), "showError"),
        showException: n(
          (B) => ((this.phase = "errored"), this.callbacks.showException(B)),
          "showException",
        ),
        forceRemount: r || this.notYetRendered,
        storyContext: we,
        storyFn: n(() => re(we), "storyFn"),
        unboundStoryFn: re,
      };
      if (
        (await this.runPhase(J, "loading", async () => {
          we.loaded = await m(we);
        }),
        J.aborted)
      )
        return;
      const Bt = await h(we);
      if (
        (this.store.addCleanupCallbacks(a, Bt),
        this.checkIfAborted(J) ||
          (!ce && !F && (await we.mount()), (this.notYetRendered = !1), J.aborted))
      )
        return;
      const Ft =
          ((he = (se = this.story.parameters) == null ? void 0 : se.test) == null
            ? void 0
            : he.dangerouslyIgnoreUnhandledErrors) === !0;
      const jt = new Set();
      const qe = n((B) => jt.add("error" in B ? B.error : B.reason), "onError");
      if (this.renderOptions.autoplay && r && ne && this.phase !== "errored") {
        window.addEventListener("error", qe),
          window.addEventListener("unhandledrejection", qe),
          (this.disableKeyListeners = !0);
        try {
          if (
            (F
              ? await ne(we)
              : ((we.mount = async () => {
                  throw new Oe({ playFunction: ne.toString() });
                }),
                await this.runPhase(J, "playing", async () => ne(we))),
            !ce)
          )
            throw new Nr();
          this.checkIfAborted(J),
            !Ft && jt.size > 0
              ? await this.runPhase(J, "errored")
              : await this.runPhase(J, "played");
        } catch (B) {
          if (
            ((ve = (Ve = this.callbacks).showStoryDuringRender) == null || ve.call(Ve),
            await this.runPhase(J, "errored", async () => {
              this.channel.emit(Xt, Ji(B));
            }),
            this.story.parameters.throwPlayFunctionExceptions !== !1)
          )
            throw B;
          console.error(B);
        }
        if (
          (!Ft && jt.size > 0 && this.channel.emit(Jt, Array.from(jt).map(Ji)),
          (this.disableKeyListeners = !1),
          window.removeEventListener("unhandledrejection", qe),
          window.removeEventListener("error", qe),
          J.aborted)
        )
          return;
      }
      await this.runPhase(J, "completed", async () => this.channel.emit(We, i)),
        this.phase !== "errored" &&
          (await this.runPhase(J, "afterEach", async () => {
            await g(we);
          }));
      const Dt = !Ft && jt.size > 0;
      const p = we.reporting.reports.some((B) => B.status === "failed");
      const A = Dt || p;
      await this.runPhase(J, "finished", async () =>
        this.channel.emit(ot, {
          storyId: i,
          status: A ? "error" : "success",
          reporters: we.reporting.reports,
        }),
      );
    } catch (we) {
      (this.phase = "errored"),
        this.callbacks.showException(we),
        await this.runPhase(J, "finished", async () =>
          this.channel.emit(ot, { storyId: i, status: "error", reporters: [] }),
        );
    }
    this.rerenderEnqueued && ((this.rerenderEnqueued = !1), this.render());
  }
  async rerender() {
    if (this.isPending() && this.phase !== "playing") this.rerenderEnqueued = !0;
    else return this.render();
  }
  async remount() {
    return await this.teardown(), this.render({ forceRemount: !0 });
  }
  cancelRender() {
    let e;
    (e = this.abortController) == null || e.abort();
  }
  async teardown() {
    (this.torndown = !0),
      this.cancelRender(),
      this.story && (await this.store.cleanupStory(this.story));
    for (let e = 0; e < 3; e += 1) {
      if (!this.isPending()) {
        await this.teardownRender();
        return;
      }
      await new Promise((r) => setTimeout(r, 0));
    }
    window.location.reload(), await new Promise(() => {});
  }
};
n(Dn, "StoryRender");
const je = Dn;
const { fetch: iu } = E$1;
const au = "./index.json";
const Nn = class {
    constructor(e, r, o = te$1.getChannel(), a = !0) {
      (this.importFn = e),
        (this.getProjectAnnotations = r),
        (this.channel = o),
        (this.storyRenders = []),
        (this.storeInitializationPromise = new Promise((i, u) => {
          (this.resolveStoreInitializationPromise = i), (this.rejectStoreInitializationPromise = u);
        })),
        a && this.initialize();
    }
    get storyStore() {
      return new Proxy(
        {},
        {
          get: n((e, r) => {
            if (this.storyStoreValue)
              return (
                ae("Accessing the Story Store is deprecated and will be removed in 9.0"),
                this.storyStoreValue[r]
              );
            throw new Fr();
          }, "get"),
        },
      );
    }
    async initialize() {
      this.setupListeners();
      try {
        const e = await this.getProjectAnnotationsOrRenderError();
        await this.runBeforeAllHook(e), await this.initializeWithProjectAnnotations(e);
      } catch (e) {
        this.rejectStoreInitializationPromise(e);
      }
    }
    ready() {
      return this.storeInitializationPromise;
    }
    setupListeners() {
      this.channel.on(so, this.onStoryIndexChanged.bind(this)),
        this.channel.on(fr, this.onUpdateGlobals.bind(this)),
        this.channel.on(yr, this.onUpdateArgs.bind(this)),
        this.channel.on(fo, this.onRequestArgTypesInfo.bind(this)),
        this.channel.on(ur, this.onResetArgs.bind(this)),
        this.channel.on(dr, this.onForceReRender.bind(this)),
        this.channel.on(Kt, this.onForceRemount.bind(this));
    }
    async getProjectAnnotationsOrRenderError() {
      try {
        const e = await this.getProjectAnnotations();
        if (((this.renderToCanvas = e.renderToCanvas), !this.renderToCanvas)) throw new wr();
        return e;
      } catch (e) {
        throw (this.renderPreviewEntryError("Error reading preview.js:", e), e);
      }
    }
    async initializeWithProjectAnnotations(e) {
      this.projectAnnotationsBeforeInitialization = e;
      try {
        const r = await this.getStoryIndexFromServer();
        return this.initializeWithStoryIndex(r);
      } catch (r) {
        throw (this.renderPreviewEntryError("Error loading story index:", r), r);
      }
    }
    async runBeforeAllHook(e) {
      let r;
      let o;
      try {
        await ((r = this.beforeAllCleanup) == null ? void 0 : r.call(this)),
          (this.beforeAllCleanup = await ((o = e.beforeAll) == null ? void 0 : o.call(e)));
      } catch (a) {
        throw (this.renderPreviewEntryError("Error in beforeAll hook:", a), a);
      }
    }
    async getStoryIndexFromServer() {
      const e = await iu(au);
      if (e.status === 200) return e.json();
      throw new _r({ text: await e.text() });
    }
    initializeWithStoryIndex(e) {
      if (!this.projectAnnotationsBeforeInitialization)
        throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
      (this.storyStoreValue = new Le(
        e,
        this.importFn,
        this.projectAnnotationsBeforeInitialization,
      )),
        this.projectAnnotationsBeforeInitialization = undefined,
        this.setInitialGlobals(),
        this.resolveStoreInitializationPromise();
    }
    async setInitialGlobals() {
      this.emitGlobals();
    }
    emitGlobals() {
      if (!this.storyStoreValue) throw new V({ methodName: "emitGlobals" });
      const e = {
        globals: this.storyStoreValue.userGlobals.get() || {},
        globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {},
      };
      this.channel.emit(ro, e);
    }
    async onGetProjectAnnotationsChanged({ getProjectAnnotations: e }) {
      this.previewEntryError = undefined, (this.getProjectAnnotations = e);
      const r = await this.getProjectAnnotationsOrRenderError();
      if ((await this.runBeforeAllHook(r), !this.storyStoreValue)) {
        await this.initializeWithProjectAnnotations(r);
        return;
      }
      this.storyStoreValue.setProjectAnnotations(r), this.emitGlobals();
    }
    async onStoryIndexChanged() {
      if (
        (this.previewEntryError = undefined,
        !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization))
      )
        try {
          const e = await this.getStoryIndexFromServer();
          if (this.projectAnnotationsBeforeInitialization) {
            this.initializeWithStoryIndex(e);
            return;
          }
          await this.onStoriesChanged({ storyIndex: e });
        } catch (e) {
          throw (this.renderPreviewEntryError("Error loading story index:", e), e);
        }
    }
    async onStoriesChanged({ importFn: e, storyIndex: r }) {
      if (!this.storyStoreValue) throw new V({ methodName: "onStoriesChanged" });
      await this.storyStoreValue.onStoriesChanged({ importFn: e, storyIndex: r });
    }
    async onUpdateGlobals({ globals: e, currentStory: r }) {
      if ((this.storyStoreValue || (await this.storeInitializationPromise), !this.storyStoreValue))
        throw new V({ methodName: "onUpdateGlobals" });
      if ((this.storyStoreValue.userGlobals.update(e), r)) {
        const {
          initialGlobals: o,
          storyGlobals: a,
          userGlobals: i,
          globals: u,
        } = this.storyStoreValue.getStoryContext(r);
        this.channel.emit(Ce, { initialGlobals: o, userGlobals: i, storyGlobals: a, globals: u });
      } else {
        const { initialGlobals: o, globals: a } = this.storyStoreValue.userGlobals;
        this.channel.emit(Ce, { initialGlobals: o, userGlobals: a, storyGlobals: {}, globals: a });
      }
      await Promise.all(this.storyRenders.map((o) => o.rerender()));
    }
    async onUpdateArgs({ storyId: e, updatedArgs: r }) {
      if (!this.storyStoreValue) throw new V({ methodName: "onUpdateArgs" });
      this.storyStoreValue.args.update(e, r),
        await Promise.all(
          this.storyRenders
            .filter((o) => o.id === e && !o.renderOptions.forceInitialArgs)
            .map((o) => (o.story?.usesMount ? o.remount() : o.rerender())),
        ),
        this.channel.emit(to, { storyId: e, args: this.storyStoreValue.args.get(e) });
    }
    async onRequestArgTypesInfo({ id: e, payload: r }) {
      let o;
      try {
        await this.storeInitializationPromise;
        const a = await ((o = this.storyStoreValue) == null ? void 0 : o.loadStory(r));
        this.channel.emit(nt, {
          id: e,
          success: !0,
          payload: { argTypes: (a == null ? void 0 : a.argTypes) || {} },
          error: null,
        });
      } catch (a) {
        this.channel.emit(nt, { id: e, success: !1, error: a == null ? void 0 : a.message });
      }
    }
    async onResetArgs({ storyId: e, argNames: r }) {
      let i;
      if (!this.storyStoreValue) throw new V({ methodName: "onResetArgs" });
      const o =
          ((i = this.storyRenders.find((u) => u.id === e)) == null ? void 0 : i.story) ||
          (await this.storyStoreValue.loadStory({ storyId: e }));
      const a = (
          r || [
            ...new Set([
              ...Object.keys(o.initialArgs),
              ...Object.keys(this.storyStoreValue.args.get(e)),
            ]),
          ]
        ).reduce((u, l) => ((u[l] = o.initialArgs[l]), u), {});
      await this.onUpdateArgs({ storyId: e, updatedArgs: a });
    }
    async onForceReRender() {
      await Promise.all(this.storyRenders.map((e) => e.rerender()));
    }
    async onForceRemount({ storyId: e }) {
      await Promise.all(this.storyRenders.filter((r) => r.id === e).map((r) => r.remount()));
    }
    renderStoryToElement(e, r, o, a) {
      if (!this.renderToCanvas || !this.storyStoreValue)
        throw new V({ methodName: "renderStoryToElement" });
      const i = new je(
        this.channel,
        this.storyStoreValue,
        this.renderToCanvas,
        o,
        e.id,
        "docs",
        a,
        e,
      );
      return (
        i.renderToElement(r),
        this.storyRenders.push(i),
        async () => {
          await this.teardownRender(i);
        }
      );
    }
    async teardownRender(e, { viewModeChanged: r } = {}) {
      let o;
      (this.storyRenders = this.storyRenders.filter((a) => a !== e)),
        await ((o = e == null ? void 0 : e.teardown) == null
          ? void 0
          : o.call(e, { viewModeChanged: r }));
    }
    async loadStory({ storyId: e }) {
      if (!this.storyStoreValue) throw new V({ methodName: "loadStory" });
      return this.storyStoreValue.loadStory({ storyId: e });
    }
    getStoryContext(e, { forceInitialArgs: r = !1 } = {}) {
      if (!this.storyStoreValue) throw new V({ methodName: "getStoryContext" });
      return this.storyStoreValue.getStoryContext(e, { forceInitialArgs: r });
    }
    async extract(e) {
      if (!this.storyStoreValue) throw new V({ methodName: "extract" });
      if (this.previewEntryError) throw this.previewEntryError;
      return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(e);
    }
    renderPreviewEntryError(e, r) {
      (this.previewEntryError = r), I$1.error(e), I$1.error(r), this.channel.emit($t, r);
    }
  };
n(Nn, "Preview");
const Me = Nn;
const kn = class {
    constructor(e, r, o, a) {
      (this.channel = e),
        (this.store = r),
        (this.renderStoryToElement = o),
        (this.storyIdByName = n((i) => {
          const u = this.nameToStoryId.get(i);
          if (u) return u;
          throw new Error(`No story found with that name: ${i}`);
        }, "storyIdByName")),
        (this.componentStories = n(() => this.componentStoriesValue, "componentStories")),
        (this.componentStoriesFromCSFFile = n(
          (i) => this.store.componentStoriesFromCSFFile({ csfFile: i }),
          "componentStoriesFromCSFFile",
        )),
        (this.storyById = n((i) => {
          if (!i) {
            if (!this.primaryStory)
              throw new Error(
                "No primary story defined for docs entry. Did you forget to use `<Meta>`?",
              );
            return this.primaryStory;
          }
          const u = this.storyIdToCSFFile.get(i);
          if (!u) throw new Error(`Called \`storyById\` for story that was never loaded: ${i}`);
          return this.store.storyFromCSFFile({ storyId: i, csfFile: u });
        }, "storyById")),
        (this.getStoryContext = n(
          (i) => ({ ...this.store.getStoryContext(i), loaded: {}, viewMode: "docs" }),
          "getStoryContext",
        )),
        (this.loadStory = n((i) => this.store.loadStory({ storyId: i }), "loadStory")),
        (this.componentStoriesValue = []),
        (this.storyIdToCSFFile = new Map()),
        (this.exportToStory = new Map()),
        (this.exportsToCSFFile = new Map()),
        (this.nameToStoryId = new Map()),
        (this.attachedCSFFiles = new Set()),
        a.forEach((i, u) => {
          this.referenceCSFFile(i);
        });
    }
    referenceCSFFile(e) {
      this.exportsToCSFFile.set(e.moduleExports, e),
        this.exportsToCSFFile.set(e.moduleExports.default, e),
        this.store.componentStoriesFromCSFFile({ csfFile: e }).forEach((r) => {
          const o = e.stories[r.id];
          this.storyIdToCSFFile.set(o.id, e), this.exportToStory.set(o.moduleExport, r);
        });
    }
    attachCSFFile(e) {
      if (!this.exportsToCSFFile.has(e.moduleExports))
        throw new Error("Cannot attach a CSF file that has not been referenced");
      this.attachedCSFFiles.has(e) ||
        (this.attachedCSFFiles.add(e),
        this.store.componentStoriesFromCSFFile({ csfFile: e }).forEach((r) => {
          this.nameToStoryId.set(r.name, r.id),
            this.componentStoriesValue.push(r),
            this.primaryStory || (this.primaryStory = r);
        }));
    }
    referenceMeta(e, r) {
      const o = this.resolveModuleExport(e);
      if (o.type !== "meta")
        throw new Error(
          "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your CSF file?",
        );
      r && this.attachCSFFile(o.csfFile);
    }
    get projectAnnotations() {
      const { projectAnnotations: e } = this.store;
      if (!e)
        throw new Error(
          "Can't get projectAnnotations from DocsContext before they are initialized",
        );
      return e;
    }
    resolveAttachedModuleExportType(e) {
      if (e === "story") {
        if (!this.primaryStory)
          throw new Error(
            "No primary story attached to this docs file, did you forget to use <Meta of={} />?",
          );
        return { type: "story", story: this.primaryStory };
      }
      if (this.attachedCSFFiles.size === 0)
        throw new Error(
          "No CSF file attached to this docs file, did you forget to use <Meta of={} />?",
        );
      const r = Array.from(this.attachedCSFFiles)[0];
      if (e === "meta") return { type: "meta", csfFile: r };
      const { component: o } = r.meta;
      if (!o)
        throw new Error(
          "Attached CSF file does not defined a component, did you forget to export one?",
        );
      return { type: "component", component: o };
    }
    resolveModuleExport(e) {
      const r = this.exportsToCSFFile.get(e);
      if (r) return { type: "meta", csfFile: r };
      const o = this.exportToStory.get(nr(e) ? e.input : e);
      return o ? { type: "story", story: o } : { type: "component", component: e };
    }
    resolveOf(e, r = []) {
      let o;
      if (["component", "meta", "story"].includes(e)) {
        const a = e;
        o = this.resolveAttachedModuleExportType(a);
      } else o = this.resolveModuleExport(e);
      if (r.length && !r.includes(o.type)) {
        const a = o.type === "component" ? "component or unknown" : o.type;
        throw new Error(_$1`Invalid value passed to the 'of' prop. The value was resolved to a '${a}' type but the only types for this block are: ${r.join(", ")}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
      }
      switch (o.type) {
        case "component":
          return { ...o, projectAnnotations: this.projectAnnotations };
        case "meta":
          return { ...o, preparedMeta: this.store.preparedMetaFromCSFFile({ csfFile: o.csfFile }) };
        default:
          return o;
      }
    }
  };
n(kn, "DocsContext");
const me = kn;
const Ln = class {
    constructor(e, r, o, a) {
      (this.channel = e),
        (this.store = r),
        (this.entry = o),
        (this.callbacks = a),
        (this.type = "docs"),
        (this.subtype = "csf"),
        (this.torndown = !1),
        (this.disableKeyListeners = !1),
        (this.preparing = !1),
        (this.id = o.id);
    }
    isPreparing() {
      return this.preparing;
    }
    async prepare() {
      this.preparing = !0;
      const { entryExports: e, csfFiles: r = [] } = await this.store.loadEntry(this.id);
      if (this.torndown) throw Ae;
      const { importPath: o, title: a } = this.entry;
      const i = this.store.processCSFFileWithCache(e, o, a);
      const u = Object.keys(i.stories)[0];
      (this.story = this.store.storyFromCSFFile({ storyId: u, csfFile: i })),
        (this.csfFiles = [i, ...r]),
        (this.preparing = !1);
    }
    isEqual(e) {
      return !!(this.id === e.id && this.story && this.story === e.story);
    }
    docsContext(e) {
      if (!this.csfFiles) throw new Error("Cannot render docs before preparing");
      const r = new me(this.channel, this.store, e, this.csfFiles);
      return this.csfFiles.forEach((o) => r.attachCSFFile(o)), r;
    }
    async renderToElement(e, r) {
      if (!this.story || !this.csfFiles) throw new Error("Cannot render docs before preparing");
      const o = this.docsContext(r);
      const { docs: a } = this.story.parameters || {};
      if (!a)
        throw new Error(
          "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed",
        );
      const i = await a.renderer();
      const { render: u } = i;
      const l = n(async () => {
          try {
            await u(o, a, e), this.channel.emit(pr, this.id);
          } catch (c) {
            this.callbacks.showException(c);
          }
        }, "renderDocs");
      return (
        (this.rerender = async () => l()),
        (this.teardownRender = async ({ viewModeChanged: c }) => {
          !c || !e || i.unmount(e);
        }),
        l()
      );
    }
    async teardown({ viewModeChanged: e } = {}) {
      let r;
      (r = this.teardownRender) == null || r.call(this, { viewModeChanged: e }),
        (this.torndown = !0);
    }
  };
n(Ln, "CsfDocsRender");
const qr = Ln;
const jn = class {
    constructor(e, r, o, a) {
      (this.channel = e),
        (this.store = r),
        (this.entry = o),
        (this.callbacks = a),
        (this.type = "docs"),
        (this.subtype = "mdx"),
        (this.torndown = !1),
        (this.disableKeyListeners = !1),
        (this.preparing = !1),
        (this.id = o.id);
    }
    isPreparing() {
      return this.preparing;
    }
    async prepare() {
      this.preparing = !0;
      const { entryExports: e, csfFiles: r = [] } = await this.store.loadEntry(this.id);
      if (this.torndown) throw Ae;
      (this.csfFiles = r), (this.exports = e), (this.preparing = !1);
    }
    isEqual(e) {
      return !!(this.id === e.id && this.exports && this.exports === e.exports);
    }
    docsContext(e) {
      if (!this.csfFiles) throw new Error("Cannot render docs before preparing");
      return new me(this.channel, this.store, e, this.csfFiles);
    }
    async renderToElement(e, r) {
      if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
        throw new Error("Cannot render docs before preparing");
      const o = this.docsContext(r);
      const { docs: a } = this.store.projectAnnotations.parameters || {};
      if (!a)
        throw new Error(
          "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed",
        );
      const i = { ...a, page: this.exports.default };
      const u = await a.renderer();
      const { render: l } = u;
      const c = n(async () => {
          try {
            await l(o, i, e), this.channel.emit(pr, this.id);
          } catch (d) {
            this.callbacks.showException(d);
          }
        }, "renderDocs");
      return (
        (this.rerender = async () => c()),
        (this.teardownRender = async ({ viewModeChanged: d } = {}) => {
          !d || !e || (u.unmount(e), (this.torndown = !0));
        }),
        c()
      );
    }
    async teardown({ viewModeChanged: e } = {}) {
      let r;
      (r = this.teardownRender) == null || r.call(this, { viewModeChanged: e }),
        (this.torndown = !0);
    }
  };
n(jn, "MdxDocsRender");
const Br = jn;
const lu = globalThis;
function cu(t) {
  const e = (t.composedPath?.()[0]) || t.target;
  return /input|textarea/i.test(e.tagName) || e.getAttribute("contenteditable") !== null;
}
n(cu, "focusInInput");
const Qi = "attached-mdx";
const pu = "unattached-mdx";
function du({ tags: t }) {
  return (t == null ? void 0 : t.includes(pu)) || (t == null ? void 0 : t.includes(Qi));
}
n(du, "isMdxEntry");
function Mn(t) {
  return t.type === "story";
}
n(Mn, "isStoryRender");
function uu(t) {
  return t.type === "docs";
}
n(uu, "isDocsRender");
function fu(t) {
  return uu(t) && t.subtype === "csf";
}
n(fu, "isCsfDocsRender");
const Un = class extends Me {
  constructor(e, r, o, a) {
    super(e, r, void 0, !1),
      (this.importFn = e),
      (this.getProjectAnnotations = r),
      (this.selectionStore = o),
      (this.view = a),
      this.initialize();
  }
  setupListeners() {
    super.setupListeners(),
      (lu.onkeydown = this.onKeydown.bind(this)),
      this.channel.on(eo, this.onSetCurrentStory.bind(this)),
      this.channel.on(po, this.onUpdateQueryParams.bind(this)),
      this.channel.on(Qt, this.onPreloadStories.bind(this));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue) throw new V({ methodName: "setInitialGlobals" });
    const { globals: e } = this.selectionStore.selectionSpecifier || {};
    e && this.storyStoreValue.userGlobals.updateFromPersisted(e), this.emitGlobals();
  }
  async initializeWithStoryIndex(e) {
    return await super.initializeWithStoryIndex(e), this.selectSpecifiedStory();
  }
  async selectSpecifiedStory() {
    if (!this.storyStoreValue) throw new V({ methodName: "selectSpecifiedStory" });
    if (this.selectionStore.selection) {
      await this.renderSelection();
      return;
    }
    if (!this.selectionStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }
    const { storySpecifier: e, args: r } = this.selectionStore.selectionSpecifier;
    const o = this.storyStoreValue.storyIndex.entryFromSpecifier(e);
    if (!o) {
      e === "*"
        ? this.renderStoryLoadingException(e, new Pr())
        : this.renderStoryLoadingException(e, new Or({ storySpecifier: e.toString() }));
      return;
    }
    const { id: a, type: i } = o;
    this.selectionStore.setSelection({ storyId: a, viewMode: i }),
      this.channel.emit(ao, this.selectionStore.selection),
      this.channel.emit(rt, this.selectionStore.selection),
      await this.renderSelection({ persistedArgs: r });
  }
  async onGetProjectAnnotationsChanged({ getProjectAnnotations: e }) {
    await super.onGetProjectAnnotationsChanged({ getProjectAnnotations: e }),
      this.selectionStore.selection && this.renderSelection();
  }
  async onStoriesChanged({ importFn: e, storyIndex: r }) {
    await super.onStoriesChanged({ importFn: e, storyIndex: r }),
      this.selectionStore.selection
        ? await this.renderSelection()
        : await this.selectSpecifiedStory();
  }
  onKeydown(e) {
    if (!this.storyRenders.find((r) => r.disableKeyListeners) && !cu(e)) {
      const { altKey: r, ctrlKey: o, metaKey: a, shiftKey: i, key: u, code: l, keyCode: c } = e;
      this.channel.emit(Zt, {
        event: { altKey: r, ctrlKey: o, metaKey: a, shiftKey: i, key: u, code: l, keyCode: c },
      });
    }
  }
  async onSetCurrentStory(e) {
    this.selectionStore.setSelection({ viewMode: "story", ...e }),
      await this.storeInitializationPromise,
      this.channel.emit(rt, this.selectionStore.selection),
      this.renderSelection();
  }
  onUpdateQueryParams(e) {
    this.selectionStore.setQueryParams(e);
  }
  async onUpdateGlobals({ globals: e }) {
    let o;
    let a;
    const r = (this.currentRender instanceof je && this.currentRender.story) || void 0;
    super.onUpdateGlobals({ globals: e, currentStory: r }),
      (this.currentRender instanceof Br || this.currentRender instanceof qr) &&
        (await ((a = (o = this.currentRender).rerender) == null ? void 0 : a.call(o)));
  }
  async onUpdateArgs({ storyId: e, updatedArgs: r }) {
    super.onUpdateArgs({ storyId: e, updatedArgs: r });
  }
  async onPreloadStories({ ids: e }) {
    await this.storeInitializationPromise,
      this.storyStoreValue &&
        (await Promise.allSettled(
          e.map((r) => {
            let o;
            return (o = this.storyStoreValue) == null ? void 0 : o.loadEntry(r);
          }),
        ));
  }
  async renderSelection({ persistedArgs: e } = {}) {
    let g;
    let re;
    let ne;
    let le;
    const { renderToCanvas: r } = this;
    if (!this.storyStoreValue || !r) throw new V({ methodName: "renderSelection" });
    const { selection: o } = this.selectionStore;
    if (!o) throw new Error("Cannot call renderSelection as no selection was made");
    const { storyId: a } = o;
    let i;
    try {
      i = await this.storyStoreValue.storyIdToEntry(a);
    } catch (J) {
      this.currentRender && (await this.teardownRender(this.currentRender)),
        this.renderStoryLoadingException(a, J);
      return;
    }
    const u = ((g = this.currentSelection) == null ? void 0 : g.storyId) !== a;
    const l = ((re = this.currentRender) == null ? void 0 : re.type) !== i.type;
    i.type === "story"
      ? this.view.showPreparingStory({ immediate: l })
      : this.view.showPreparingDocs({ immediate: l }),
      (ne = this.currentRender) != null &&
        ne.isPreparing() &&
        (await this.teardownRender(this.currentRender));
    let c;
    i.type === "story"
      ? (c = new je(this.channel, this.storyStoreValue, r, this.mainStoryCallbacks(a), a, "story"))
      : du(i)
        ? (c = new Br(this.channel, this.storyStoreValue, i, this.mainStoryCallbacks(a)))
        : (c = new qr(this.channel, this.storyStoreValue, i, this.mainStoryCallbacks(a)));
    const d = this.currentSelection;
    this.currentSelection = o;
    const m = this.currentRender;
    this.currentRender = c;
    try {
      await c.prepare();
    } catch (J) {
      m && (await this.teardownRender(m)), J !== Ae && this.renderStoryLoadingException(a, J);
      return;
    }
    const h = !u && m && !c.isEqual(m);
    if (
      (e && Mn(c) && (fe(!!c.story), this.storyStoreValue.args.updateFromPersisted(c.story, e)),
      m && !m.torndown && !u && !h && !l)
    ) {
      (this.currentRender = m), this.channel.emit(co, a), this.view.showMain();
      return;
    }
    if (
      (m && (await this.teardownRender(m, { viewModeChanged: l })),
      d && (u || l) && this.channel.emit(oo, a),
      Mn(c))
    ) {
      fe(!!c.story);
      const {
        parameters: J,
        initialArgs: ce,
        argTypes: F,
        unmappedArgs: se,
        initialGlobals: he,
        userGlobals: Ve,
        storyGlobals: ve,
        globals: we,
      } = this.storyStoreValue.getStoryContext(c.story);
      this.channel.emit(io, { id: a, parameters: J, initialArgs: ce, argTypes: F, args: se }),
        this.channel.emit(Ce, {
          userGlobals: Ve,
          storyGlobals: ve,
          globals: we,
          initialGlobals: he,
        });
    } else {
      let { parameters: J } = this.storyStoreValue.projectAnnotations;
      const { initialGlobals: ce, globals: F } = this.storyStoreValue.userGlobals;
      if (
        (this.channel.emit(Ce, {
          globals: F,
          initialGlobals: ce,
          storyGlobals: {},
          userGlobals: F,
        }),
        fu(c) || ((le = c.entry.tags) == null ? void 0 : le.includes(Qi)))
      ) {
        if (!c.csfFiles) throw new Cr({ storyId: a });
        ({ parameters: J } = this.storyStoreValue.preparedMetaFromCSFFile({
          csfFile: c.csfFiles[0],
        }));
      }
      this.channel.emit(Yt, { id: a, parameters: J });
    }
    Mn(c)
      ? (fe(!!c.story),
        this.storyRenders.push(c),
        this.currentRender.renderToElement(this.view.prepareForStory(c.story)))
      : this.currentRender.renderToElement(
          this.view.prepareForDocs(),
          this.renderStoryToElement.bind(this),
        );
  }
  async teardownRender(e, { viewModeChanged: r = !1 } = {}) {
    let o;
    (this.storyRenders = this.storyRenders.filter((a) => a !== e)),
      await ((o = e == null ? void 0 : e.teardown) == null
        ? void 0
        : o.call(e, { viewModeChanged: r }));
  }
  mainStoryCallbacks(e) {
    return {
      showStoryDuringRender: n(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
      showMain: n(() => this.view.showMain(), "showMain"),
      showError: n((r) => this.renderError(e, r), "showError"),
      showException: n((r) => this.renderException(e, r), "showException"),
    };
  }
  renderPreviewEntryError(e, r) {
    super.renderPreviewEntryError(e, r), this.view.showErrorDisplay(r);
  }
  renderMissingStory() {
    this.view.showNoPreview(), this.channel.emit(tt);
  }
  renderStoryLoadingException(e, r) {
    I$1.error(r), this.view.showErrorDisplay(r), this.channel.emit(tt, e);
  }
  renderException(e, r) {
    const { name: o = "Error", message: a = String(r), stack: i } = r;
    this.channel.emit(lo, { name: o, message: a, stack: i }),
      this.channel.emit(Pe, { newPhase: "errored", storyId: e }),
      this.view.showErrorDisplay(r),
      I$1.error(`Error rendering story '${e}':`),
      I$1.error(r);
  }
  renderError(e, { title: r, description: o }) {
    I$1.error(`Error rendering story ${r}: ${o}`),
      this.channel.emit(no, { title: r, description: o }),
      this.channel.emit(Pe, { newPhase: "errored", storyId: e }),
      this.view.showErrorDisplay({ message: r, stack: o });
  }
};
n(Un, "PreviewWithSelection");
const Ue = Un;
const Hr = ue(kt());
const da = ue(kt());
const pa = /^[a-zA-Z0-9 _-]*$/;
const ua = /^-?[0-9]+(\.[0-9]+)?$/;
const Uu = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i;
const fa =
    /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i;
const Wn = n(
    (t, e) =>
      t === null || t === "" || !pa.test(t)
        ? !1
        : e == null || e instanceof Date || typeof e === "number" || typeof e === "boolean"
          ? !0
          : typeof e === "string"
            ? pa.test(e) || ua.test(e) || Uu.test(e) || fa.test(e)
            : Array.isArray(e)
              ? e.every((r) => Wn(t, r))
              : $$1(e)
                ? Object.entries(e).every(([r, o]) => Wn(r, o))
                : !1,
    "validateArgs",
  );
const Gu = {
    delimiter: ";",
    nesting: !0,
    arrayRepeat: !0,
    arrayRepeatSyntax: "bracket",
    nestingSyntax: "js",
    valueDeserializer(t) {
      if (t.startsWith("!")) {
        if (t === "!undefined") return;
        if (t === "!null") return null;
        if (t === "!true") return !0;
        if (t === "!false") return !1;
        if (t.startsWith("!date(") && t.endsWith(")"))
          return new Date(t.replaceAll(" ", "+").slice(6, -1));
        if (t.startsWith("!hex(") && t.endsWith(")")) return `#${t.slice(5, -1)}`;
        const e = t.slice(1).match(fa);
        if (e)
          return t.startsWith("!rgba") || t.startsWith("!RGBA")
            ? `${e[1]}(${e[2]}, ${e[3]}, ${e[4]}, ${e[5]})`
            : t.startsWith("!hsla") || t.startsWith("!HSLA")
              ? `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%, ${e[5]})`
              : t.startsWith("!rgb") || t.startsWith("!RGB")
                ? `${e[1]}(${e[2]}, ${e[3]}, ${e[4]})`
                : `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%)`;
      }
      return ua.test(t) ? Number(t) : t;
    },
  };
const $n = n((t) => {
    const e = t.split(";").map((r) => r.replace("=", "~").replace(":", "="));
    return Object.entries((0, da.parse)(e.join(";"), Gu)).reduce(
      (r, [o, a]) =>
        Wn(o, a)
          ? Object.assign(r, { [o]: a })
          : (j$1.warn(_$1`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `),
            r),
      {},
    );
  }, "parseArgsParam");
const { history: ya, document: xe } = E$1;
function qu(t) {
  const e = (t || "").match(/^\/story\/(.+)/);
  if (!e) throw new Error(`Invalid path '${t}',  must start with '/story/'`);
  return e[1];
}
n(qu, "pathToId");
const ma = n(({ selection: t, extraParams: e }) => {
    const r = xe == null ? void 0 : xe.location.search.slice(1);
    const { path: o, selectedKind: a, selectedStory: i, ...u } = (0, Hr.parse)(r);
    return `?${(0, Hr.stringify)({ ...u, ...e, ...(t && { id: t.storyId, viewMode: t.viewMode }) })}`;
  }, "getQueryString");
const Bu = n((t) => {
    if (!t) return;
    const e = ma({ selection: t });
    const { hash: r = "" } = xe.location;
    (xe.title = t.storyId), ya.replaceState({}, "", `${xe.location.pathname}${e}${r}`);
  }, "setPath");
const Vu = n((t) => t != null && typeof t === "object" && Array.isArray(t) === !1, "isObject");
const Vr = n((t) => {
    if (t !== void 0) {
      if (typeof t === "string") return t;
      if (Array.isArray(t)) return Vr(t[0]);
      if (Vu(t)) return Vr(Object.values(t).filter(Boolean));
    }
  }, "getFirstString");
const Hu = n(() => {
    if (typeof xe < "u") {
      const t = xe.location.search.slice(1);
      const e = (0, Hr.parse)(t);
      const r = typeof e.args === "string" ? $n(e.args) : void 0;
      const o = typeof e.globals === "string" ? $n(e.globals) : void 0;
      let a = Vr(e.viewMode);
      (typeof a !== "string" || !a.match(/docs|story/)) && (a = "story");
      const i = Vr(e.path);
      const u = i ? qu(i) : Vr(e.id);
      if (u) return { storySpecifier: u, args: r, globals: o, viewMode: a };
    }
    return null;
  }, "getSelectionSpecifierFromPath");
const Yn = class {
    constructor() {
      this.selectionSpecifier = Hu();
    }
    setSelection(e) {
      (this.selection = e), Bu(this.selection);
    }
    setQueryParams(e) {
      const r = ma({ extraParams: e });
      const { hash: o = "" } = xe.location;
      ya.replaceState({}, "", `${xe.location.pathname}${r}${o}`);
    }
  };
n(Yn, "UrlStore");
const Be = Yn;
const $a = ue(Ha());
const Ya = ue(kt());
const { document: z$1 } = E$1;
const za = 100;
const Ka = ((t) => (
    (t.MAIN = "MAIN"),
    (t.NOPREVIEW = "NOPREVIEW"),
    (t.PREPARING_STORY = "PREPARING_STORY"),
    (t.PREPARING_DOCS = "PREPARING_DOCS"),
    (t.ERROR = "ERROR"),
    t
  ))(Ka || {});
const rs = {
    PREPARING_STORY: "sb-show-preparing-story",
    PREPARING_DOCS: "sb-show-preparing-docs",
    MAIN: "sb-show-main",
    NOPREVIEW: "sb-show-nopreview",
    ERROR: "sb-show-errordisplay",
  };
const ts = { centered: "sb-main-centered", fullscreen: "sb-main-fullscreen", padded: "sb-main-padded" };
const Wa = new $a.default({ escapeXML: !0 });
const os = class {
    constructor() {
      if (((this.testing = !1), typeof z$1 < "u")) {
        const { __SPECIAL_TEST_PARAMETER__: e } = (0, Ya.parse)(z$1.location.search.slice(1));
        switch (e) {
          case "preparing-story": {
            this.showPreparingStory(), (this.testing = !0);
            break;
          }
          case "preparing-docs": {
            this.showPreparingDocs(), (this.testing = !0);
            break;
          }
        }
      }
    }
    prepareForStory(e) {
      return (
        this.showStory(),
        this.applyLayout(e.parameters.layout),
        (z$1.documentElement.scrollTop = 0),
        (z$1.documentElement.scrollLeft = 0),
        this.storyRoot()
      );
    }
    storyRoot() {
      return z$1.getElementById("storybook-root");
    }
    prepareForDocs() {
      return (
        this.showMain(),
        this.showDocs(),
        this.applyLayout("fullscreen"),
        (z$1.documentElement.scrollTop = 0),
        (z$1.documentElement.scrollLeft = 0),
        this.docsRoot()
      );
    }
    docsRoot() {
      return z$1.getElementById("storybook-docs");
    }
    applyLayout(e = "padded") {
      if (e === "none") {
        z$1.body.classList.remove(this.currentLayoutClass), (this.currentLayoutClass = null);
        return;
      }
      this.checkIfLayoutExists(e);
      const r = ts[e];
      z$1.body.classList.remove(this.currentLayoutClass),
        z$1.body.classList.add(r),
        (this.currentLayoutClass = r);
    }
    checkIfLayoutExists(e) {
      ts[e] ||
        I$1.warn(_$1`
          The desired layout: ${e} is not a valid option.
          The possible options are: ${Object.keys(ts).join(", ")}, none.
        `);
    }
    showMode(e) {
      clearTimeout(this.preparingTimeout),
        Object.keys(Ka).forEach((r) => {
          r === e ? z$1.body.classList.add(rs[r]) : z$1.body.classList.remove(rs[r]);
        });
    }
    showErrorDisplay({ message: e = "", stack: r = "" }) {
      let o = e;
      let a = r;
      const i = e.split(`
`);
      i.length > 1 &&
        (([o] = i),
        (a = i
          .slice(1)
          .join(`
`)
          .replace(/^\n/, ""))),
        (z$1.getElementById("error-message").innerHTML = Wa.toHtml(o)),
        (z$1.getElementById("error-stack").innerHTML = Wa.toHtml(a)),
        this.showMode("ERROR");
    }
    showNoPreview() {
      let e;
      let r;
      this.testing ||
        (this.showMode("NOPREVIEW"),
        (e = this.storyRoot()) == null || e.setAttribute("hidden", "true"),
        (r = this.docsRoot()) == null || r.setAttribute("hidden", "true"));
    }
    showPreparingStory({ immediate: e = !1 } = {}) {
      clearTimeout(this.preparingTimeout),
        e
          ? this.showMode("PREPARING_STORY")
          : (this.preparingTimeout = setTimeout(() => this.showMode("PREPARING_STORY"), za));
    }
    showPreparingDocs({ immediate: e = !1 } = {}) {
      clearTimeout(this.preparingTimeout),
        e
          ? this.showMode("PREPARING_DOCS")
          : (this.preparingTimeout = setTimeout(() => this.showMode("PREPARING_DOCS"), za));
    }
    showMain() {
      this.showMode("MAIN");
    }
    showDocs() {
      this.storyRoot().setAttribute("hidden", "true"), this.docsRoot().removeAttribute("hidden");
    }
    showStory() {
      this.docsRoot().setAttribute("hidden", "true"), this.storyRoot().removeAttribute("hidden");
    }
    showStoryDuringRender() {
      z$1.body.classList.add(rs.MAIN);
    }
  };
n(os, "WebView");
const He = os;
const ns = class extends Ue {
    constructor(e, r) {
      super(e, r, new Be(), new He()),
        (this.importFn = e),
        (this.getProjectAnnotations = r),
        (E$1.__STORYBOOK_PREVIEW__ = this);
    }
  };
n(ns, "PreviewWeb");
const Wr = ns;
const { document: ze } = E$1;
const wf = [
    "application/javascript",
    "application/ecmascript",
    "application/x-ecmascript",
    "application/x-javascript",
    "text/ecmascript",
    "text/javascript",
    "text/javascript1.0",
    "text/javascript1.1",
    "text/javascript1.2",
    "text/javascript1.3",
    "text/javascript1.4",
    "text/javascript1.5",
    "text/jscript",
    "text/livescript",
    "text/x-ecmascript",
    "text/x-javascript",
    "module",
  ];
const _f = "script";
const Xa = "scripts-root";
function $r() {
  const t = ze.createEvent("Event");
  t.initEvent("DOMContentLoaded", !0, !0), ze.dispatchEvent(t);
}
n($r, "simulateDOMContentLoaded");
function Cf(t, e, r) {
  const o = ze.createElement("script");
  (o.type = t.type === "module" ? "module" : "text/javascript"),
    t.src ? ((o.onload = e), (o.onerror = e), (o.src = t.src)) : (o.textContent = t.innerText),
    r ? r.appendChild(o) : ze.head.appendChild(o),
    t.parentNode.removeChild(t),
    t.src || e();
}
n(Cf, "insertScript");
function Ja(t, e, r = 0) {
  t[r](() => {
    r++, r === t.length ? e() : Ja(t, e, r);
  });
}
n(Ja, "insertScriptsSequentially");
function ss(t) {
  let e = ze.getElementById(Xa);
  e ? (e.innerHTML = "") : ((e = ze.createElement("div")), (e.id = Xa), ze.body.appendChild(e));
  const r = Array.from(t.querySelectorAll(_f));
  if (r.length) {
    const o = [];
    r.forEach((a) => {
      const i = a.getAttribute("type");
      (!i || wf.includes(i)) && o.push((u) => Cf(a, u, e));
    }),
      o.length && Ja(o, $r, void 0);
  } else $r();
}
n(ss, "simulatePageLoad");
const Qa = {
    "@storybook/global": Ht,
    "storybook/internal/channels": br,
    "@storybook/channels": br,
    "@storybook/core/channels": br,
    "storybook/internal/client-logger": mr,
    "@storybook/client-logger": mr,
    "@storybook/core/client-logger": mr,
    "storybook/internal/core-events": ge,
    "@storybook/core-events": ge,
    "@storybook/core/core-events": ge,
    "storybook/internal/preview-errors": kr,
    "@storybook/core-events/preview-errors": kr,
    "@storybook/core/preview-errors": kr,
    "storybook/internal/preview-api": Yr,
    "@storybook/preview-api": Yr,
    "@storybook/core/preview-api": Yr,
    "storybook/internal/types": Tr,
    "@storybook/types": Tr,
    "@storybook/core/types": Tr,
  };
const el = ue(Za());
let ls;
function Pf() {
  let t;
  return (
    ls ||
      (ls = new el.default((t = E$1.navigator) == null ? void 0 : t.userAgent).getBrowserInfo()),
    ls
  );
}
n(Pf, "getBrowserInfo");
function rl(t) {
  return (t.browserInfo = Pf()), t;
}
n(rl, "prepareForTelemetry");
function Of(t) {
  const e = t.error || t;
  e.fromStorybook && E$1.sendTelemetryError(e);
}
n(Of, "errorListener");
function If({ reason: t }) {
  t.fromStorybook && E$1.sendTelemetryError(t);
}
n(If, "unhandledRejectionListener");
function Ff() {
  cs.forEach((t) => {
    E$1[yo[t]] = Qa[t];
  }),
    (E$1.sendTelemetryError = (t) => {
      E$1.__STORYBOOK_ADDONS_CHANNEL__.emit(uo, rl(t));
    }),
    E$1.addEventListener("error", Of),
    E$1.addEventListener("unhandledrejection", If);
}
n(Ff, "setup");
Ff();
const { createBrowserChannel } = __STORYBOOK_MODULE_CHANNELS__;
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const channel = createBrowserChannel({ page: "preview" });
addons.setChannel(channel);
window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
window.CONFIG_TYPE === "DEVELOPMENT" && (window.__STORYBOOK_SERVER_CHANNEL__ = channel);
const b = Object.create;
const f = Object.defineProperty;
const v = Object.getOwnPropertyDescriptor;
const P = Object.getOwnPropertyNames;
const O = Object.getPrototypeOf;
const _ = Object.prototype.hasOwnProperty;
const s = (t, e) => f(t, "name", { value: e, configurable: !0 });
const $ = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
const j = (t, e, r, o) => {
    if ((e && typeof e === "object") || typeof e === "function")
      for (const a of P(e))
        !_.call(t, a) &&
          a !== r &&
          f(t, a, { get: () => e[a], enumerable: !(o = v(e, a)) || o.enumerable });
    return t;
  };
const C = (t, e, r) => (
    (r = t != null ? b(O(t)) : {}), j(f(r, "default", { value: t, enumerable: !0 }), t)
  );
const T = $((t) => {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.isEqual = (() => {
        const e = Object.prototype.toString;
        const r = Object.getPrototypeOf;
        const o = Object.getOwnPropertySymbols
            ? (a) => Object.keys(a).concat(Object.getOwnPropertySymbols(a))
            : Object.keys;
        return (a, i) =>
          s(function u(l, c, d) {
            let m;
            let h;
            let g;
            const re = e.call(l);
            const ne = e.call(c);
            if (l === c) return !0;
            if (l == null || c == null) return !1;
            if (d.indexOf(l) > -1 && d.indexOf(c) > -1) return !0;
            if (
              (d.push(l, c),
              re !== ne ||
                ((m = o(l)),
                (h = o(c)),
                m.length !== h.length || m.some((le) => !u(l[le], c[le], d))))
            )
              return !1;
            switch (re.slice(8, -1)) {
              case "Symbol":
                return l.valueOf() === c.valueOf();
              case "Date":
              case "Number":
                return +l === +c || (+l !== +l && +c !== +c);
              case "RegExp":
              case "Function":
              case "String":
              case "Boolean":
                return `${l}` === `${c}`;
              case "Set":
              case "Map":
                (m = l.entries()), (h = c.entries());
                do if (!u((g = m.next()).value, h.next().value, d)) return !1;
                while (!g.done);
                return !0;
              case "ArrayBuffer":
                (l = new Uint8Array(l)), (c = new Uint8Array(c));
              case "DataView":
                (l = new Uint8Array(l.buffer)), (c = new Uint8Array(c.buffer));
              case "Float32Array":
              case "Float64Array":
              case "Int8Array":
              case "Int16Array":
              case "Int32Array":
              case "Uint8Array":
              case "Uint16Array":
              case "Uint32Array":
              case "Uint8ClampedArray":
              case "Arguments":
              case "Array":
                if (l.length !== c.length) return !1;
                for (g = 0; g < l.length; g++)
                  if ((g in l || g in c) && (g in l !== g in c || !u(l[g], c[g], d))) return !1;
                return !0;
              case "Object":
                return u(r(l), r(c), d);
              default:
                return !1;
            }
          }, "n")(a, i, []);
      })());
  });
function R(t) {
  return t
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\./g, " ")
    .replace(/([^\n])([A-Z])([a-z])/g, (e, r, o, a) => `${r} ${o}${a}`)
    .replace(/([a-z])([A-Z])/g, (e, r, o) => `${r} ${o}`)
    .replace(/([a-z])([0-9])/gi, (e, r, o) => `${r} ${o}`)
    .replace(/([0-9])([a-z])/gi, (e, r, o) => `${r} ${o}`)
    .replace(/(\s|^)(\w)/g, (e, r, o) => `${r}${o.toUpperCase()}`)
    .replace(/ +/g, " ")
    .trim();
}
s(R, "toStartCaseStr");
const y = C(T());
const x = s((t) => t.map((e) => typeof e < "u").filter(Boolean).length, "count");
const E = s((t, e) => {
    const { exists: r, eq: o, neq: a, truthy: i } = t;
    if (x([r, o, a, i]) > 1)
      throw new Error(`Invalid conditional test ${JSON.stringify({ exists: r, eq: o, neq: a })}`);
    if (typeof o < "u") return (0, y.isEqual)(e, o);
    if (typeof a < "u") return !(0, y.isEqual)(e, a);
    if (typeof r < "u") {
      const u = typeof e < "u";
      return r ? u : !u;
    }
    return typeof i > "u" || i ? !!e : !e;
  }, "testValue");
const z = s((t, e, r) => {
    if (!t.if) return !0;
    const { arg: o, global: a } = t.if;
    if (x([o, a]) !== 1)
      throw new Error(`Invalid conditional value ${JSON.stringify({ arg: o, global: a })}`);
    const i = o ? e[o] : r[a];
    return E(t.if, i);
  }, "includeConditionalArg");
const { composeConfigs: M, normalizeProjectAnnotations: N } = __STORYBOOK_MODULE_PREVIEW_API__;
function L(t) {
  let e;
  const r = {
      _tag: "Preview",
      input: t,
      get composed() {
        if (e) return e;
        const { addons: o, ...a } = t;
        return (e = N(M([...(o ?? []), a]))), e;
      },
      meta(o) {
        return I(o, this);
      },
    };
  return (globalThis.globalProjectAnnotations = r.composed), r;
}
s(L, "__definePreview");
function W(t) {
  return (
    t != null && typeof t === "object" && "_tag" in t && (t == null ? void 0 : t._tag) === "Preview"
  );
}
s(W, "isPreview");
function H(t) {
  return (
    t != null && typeof t === "object" && "_tag" in t && (t == null ? void 0 : t._tag) === "Meta"
  );
}
s(H, "isMeta");
function I(t, e) {
  return {
    _tag: "Meta",
    input: t,
    preview: e,
    get composed() {
      throw new Error("Not implemented");
    },
    story(r) {
      return U(r, this);
    },
  };
}
s(I, "defineMeta");
function U(t, e) {
  return {
    _tag: "Story",
    input: t,
    meta: e,
    get composed() {
      throw new Error("Not implemented");
    },
  };
}
s(U, "defineStory");
function K(t) {
  return (
    t != null && typeof t === "object" && "_tag" in t && (t == null ? void 0 : t._tag) === "Story"
  );
}
s(K, "isStory");
const D = s(
  (t) =>
    t
      .toLowerCase()
      .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, ""),
  "sanitize",
);
function S(t, e) {
  return Array.isArray(e) ? e.includes(t) : t.match(e);
}
s(S, "matches");
function te(t, { includeStories: e, excludeStories: r }) {
  return t !== "__esModule" && (!e || S(t, e)) && (!r || !S(t, r));
}
s(te, "isExportStory");
const importers = {
  "./src/stories/TokensGallery.stories.tsx": () =>
    __vitePreload(
      () => import("./TokensGallery.stories-fHFDuXpz.js"),
      __vite__mapDeps([0, 1]),
      import.meta.url,
    ),
};
async function importFn(t) {
  return await importers[t]();
}
Ff();
const { composeConfigs, PreviewWeb } = __STORYBOOK_MODULE_PREVIEW_API__;
const getProjectAnnotations = async (t = []) => {
    const e = await __vitePreload(
      () => import("./preview-jFfjQXim.js"),
      __vite__mapDeps([2, 3]),
      import.meta.url,
    );
    if (W(e.default)) return e.default.composed;
    const r = await Promise.all([
      t[0] ??
        __vitePreload(
          () => import("./entry-preview-DyzZ8sWk.js"),
          __vite__mapDeps([4, 5, 1]),
          import.meta.url,
        ),
      t[1] ??
        __vitePreload(
          () => import("./entry-preview-docs-CSBLhdYu.js"),
          __vite__mapDeps([6, 5, 7, 1]),
          import.meta.url,
        ),
      t[2] ?? __vitePreload(() => import("./preview-DHQbi4pV.js"), [], import.meta.url),
      t[3] ?? __vitePreload(() => import("./preview-DD_OYowb.js"), [], import.meta.url),
      t[4] ?? __vitePreload(() => import("./preview-DtcVxDIu.js"), [], import.meta.url),
      t[5] ??
        __vitePreload(
          () => import("./preview-B8lJiyuQ.js"),
          __vite__mapDeps([8, 9]),
          import.meta.url,
        ),
      t[6] ?? __vitePreload(() => import("./preview-CvbIS5ZJ.js"), [], import.meta.url),
      t[7] ?? __vitePreload(() => import("./preview-BBWR9nbA.js"), [], import.meta.url),
      t[8] ??
        __vitePreload(
          () => import("./preview-BWzBA1C2.js"),
          __vite__mapDeps([10, 9]),
          import.meta.url,
        ),
      t[9] ?? __vitePreload(() => import("./preview-DGUiP6tS.js"), [], import.meta.url),
    ]);
    return composeConfigs([...r, e]);
  };
window.__STORYBOOK_PREVIEW__ =
  window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn, getProjectAnnotations);
window.__STORYBOOK_STORY_STORE__ =
  window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
export { D, __vitePreload as _, z };
