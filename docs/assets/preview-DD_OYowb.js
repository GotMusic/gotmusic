let p;
const S = new Uint8Array(16);
function A() {
  if (
    !p &&
    ((p = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)), !p)
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
    );
  return p(S);
}
const o = [];
for (let e = 0; e < 256; ++e) o.push((e + 256).toString(16).slice(1));
function D(e, t = 0) {
  return `${
    o[e[t + 0]] + o[e[t + 1]] + o[e[t + 2]] + o[e[t + 3]]
  }-${o[e[t + 4]]}${o[e[t + 5]]}-${o[e[t + 6]]}${o[e[t + 7]]}-${o[e[t + 8]]}${o[e[t + 9]]}-${o[e[t + 10]]}${o[e[t + 11]]}${o[e[t + 12]]}${o[e[t + 13]]}${o[e[t + 14]]}${o[e[t + 15]]}`;
}
const I = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const h = { randomUUID: I };
function f(e, t, r) {
  if (h.randomUUID && !e) return h.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || A)();
  return (n[6] = (n[6] & 15) | 64), (n[8] = (n[8] & 63) | 128), D(n);
}
const { addons: v } = __STORYBOOK_MODULE_PREVIEW_API__;
const { ImplicitActionsDuringRendering: U } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
const { global: d } = __STORYBOOK_MODULE_GLOBAL__;
const w = "storybook/actions";
const j = `${w}/action-event`;
const V = { depth: 10, clearOnStoryChange: !0, limit: 50 };
const E = (e, t) => {
  const r = Object.getPrototypeOf(e);
  return !r || t(r) ? r : E(r, t);
};
const C = (e) =>
  !!(
    typeof e === "object" &&
    e &&
    E(e, (t) => /^Synthetic(?:Base)?Event$/.test(t.constructor.name)) &&
    typeof e.persist === "function"
  );
const K = (e) => {
  if (C(e)) {
    const t = Object.create(e.constructor.prototype, Object.getOwnPropertyDescriptors(e));
    t.persist();
    const r = Object.getOwnPropertyDescriptor(t, "view");
    const n = r == null ? void 0 : r.value;
    return (
      typeof n === "object" &&
        (n == null ? void 0 : n.constructor.name) === "Window" &&
        Object.defineProperty(t, "view", { ...r, value: Object.create(n.constructor.prototype) }),
      t
    );
  }
  return e;
};
const L = () =>
  typeof crypto === "object" && typeof crypto.getRandomValues === "function"
    ? f()
    : Date.now().toString(36) + Math.random().toString(36).substring(2);
function _(e, t = {}) {
  const r = { ...V, ...t };
  const n = (...s) => {
    let g;
    let O;
    if (t.implicit) {
      const y =
        (g = "__STORYBOOK_PREVIEW__" in d ? d.__STORYBOOK_PREVIEW__ : void 0) == null
          ? void 0
          : g.storyRenders.find((l) => l.phase === "playing" || l.phase === "rendering");
      if (y) {
        const l = !(
          (O = globalThis == null ? void 0 : globalThis.FEATURES) != null &&
          O.disallowImplicitActionsInRenderV8
        );
        const R = new U({ phase: y.phase, name: e, deprecated: l });
        if (l) console.warn(R);
        else throw R;
      }
    }
    const i = v.getChannel();
    const c = L();
    const a = 5;
    const u = s.map(K);
    const b = s.length > 1 ? u : u[0];
    const x = {
      id: c,
      count: 0,
      data: { name: e, args: b },
      options: { ...r, maxDepth: a + (r.depth || 3), allowFunction: r.allowFunction || !1 },
    };
    i.emit(j, x);
  };
  return (n.isAction = !0), (n.implicit = t.implicit), n;
}
const T = (e, t) => typeof t[e] > "u" && !(e in t);
const B = (e) => {
  const {
    initialArgs: t,
    argTypes: r,
    id: n,
    parameters: { actions: s },
  } = e;
  if (!s || s.disable || !s.argTypesRegex || !r) return {};
  const i = new RegExp(s.argTypesRegex);
  return Object.entries(r)
    .filter(([c]) => !!i.test(c))
    .reduce((c, [a, u]) => (T(a, t) && (c[a] = _(a, { implicit: !0, id: n })), c), {});
};
const M = (e) => {
  const {
    initialArgs: t,
    argTypes: r,
    parameters: { actions: n },
  } = e;
  return n?.disable || !r
    ? {}
    : Object.entries(r)
        .filter(([s, i]) => !!i.action)
        .reduce(
          (s, [i, c]) => (T(i, t) && (s[i] = _(typeof c.action === "string" ? c.action : i)), s),
          {},
        );
};
const Y = [M, B];
let m = !1;
const P = (e) => {
  const {
    parameters: { actions: t },
  } = e;
  if (
    !t?.disable &&
    !m &&
    "__STORYBOOK_TEST_ON_MOCK_CALL__" in d &&
    typeof d.__STORYBOOK_TEST_ON_MOCK_CALL__ === "function"
  ) {
    const r = d.__STORYBOOK_TEST_ON_MOCK_CALL__;
    r((n, s) => {
      const i = n.getMockName();
      i !== "spy" &&
        (!/^next\/.*::/.test(i) ||
          [
            "next/router::useRouter()",
            "next/navigation::useRouter()",
            "next/navigation::redirect",
            "next/cache::",
            "next/headers::cookies().set",
            "next/headers::cookies().delete",
            "next/headers::headers().set",
            "next/headers::headers().delete",
          ].some((c) => i.startsWith(c))) &&
        _(i)(s);
    }),
      (m = !0);
  }
};
const N = [P];
export { Y as argsEnhancers, N as loaders };
