const { STORY_CHANGED: r } = __STORYBOOK_MODULE_CORE_EVENTS__;
const { addons: s } = __STORYBOOK_MODULE_PREVIEW_API__;
const { global: O } = __STORYBOOK_MODULE_GLOBAL__;
const d = "storybook/highlight";
const i = "storybookHighlight";
const g = `${d}/add`;
const E = `${d}/reset`;
const { document: l } = O;
const H = (e = "#FF4785", t = "dashed") => `
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`;
const h = s.getChannel();
const T = (e) => {
  const t = i;
  n();
  const o = Array.from(new Set(e.elements));
  const _ = l.createElement("style");
  _.setAttribute("id", t),
    (_.innerHTML = o
      .map(
        (a) => `${a}{
          ${H(e.color, e.style)}
         }`,
      )
      .join(" ")),
    l.head.appendChild(_);
};
const n = () => {
  let o;
  const e = i;
  const t = l.getElementById(e);
  t && ((o = t.parentNode) == null || o.removeChild(t));
};
h.on(r, n);
h.on(E, n);
h.on(g, T);
