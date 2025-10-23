const u = Object.create;
const a = Object.defineProperty;
const s = Object.getOwnPropertyDescriptor;
const o = Object.getOwnPropertyNames;
const c = Object.getPrototypeOf;
const O = Object.prototype.hasOwnProperty;
const l = (e, r) => () => (e && (r = (0, e[o(e)[0]])((e = 0))), r);
const v = (e, r) => () => (r || (0, e[o(e)[0]])((r = { exports: {} }).exports, r), r.exports);
const b = (e, r) => {
  for (const t in r) a(e, t, { get: r[t], enumerable: !0 });
};
const n = (e, r, t, p) => {
  if ((r && typeof r === "object") || typeof r === "function")
    for (const _ of o(r))
      !O.call(e, _) &&
        _ !== t &&
        a(e, _, { get: () => r[_], enumerable: !(p = s(r, _)) || p.enumerable });
  return e;
};
const P = (e, r, t) => (
  (t = e != null ? u(c(e)) : {}),
  n(!e || !e.__esModule ? a(t, "default", { value: e, enumerable: !0 }) : t, e)
);
const y = (e) => n(a({}, "__esModule", { value: !0 }), e);
export { P as _, v as a, l as b, y as c, b as d };
