const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./DocsRenderer-CFRXHY34-DSr6COqG.js",
      "./iframe-D2Zm_jfV.js",
      "./index-2yJIXLcc.js",
      "./react-18-CRi7POyT.js",
      "./index-DgH-xKnr.js",
      "./index-DrFu-skq.js",
    ]),
) => i.map((i) => d[i]);
import { _ as a } from "./iframe-D2Zm_jfV.js";
const i = Object.defineProperty;
const s = (e, r) => {
  for (const t in r) i(e, t, { get: r[t], enumerable: !0 });
};
const _ = {};
s(_, { parameters: () => d });
const p = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((e, r) => {
  const [t, o] = r;
  return o.excludeFromDocsStories && (e[t] = !0), e;
}, {});
const d = {
  docs: {
    renderer: async () => {
      const { DocsRenderer: e } = await a(
        () => import("./DocsRenderer-CFRXHY34-DSr6COqG.js").then((r) => r.D),
        __vite__mapDeps([0, 1, 2, 3, 4, 5]),
        import.meta.url,
      );
      return new e();
    },
    stories: {
      filter: (e) => {
        let r;
        return (
          (e.tags || []).filter((t) => p[t]).length === 0 &&
          !((r = e.parameters.docs) != null && r.disable)
        );
      },
    },
  },
};
export { d as parameters };
