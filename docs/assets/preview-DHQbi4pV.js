const { makeDecorator: O, addons: _ } = __STORYBOOK_MODULE_PREVIEW_API__;
const { STORY_CHANGED: l, SELECT_STORY: E } = __STORYBOOK_MODULE_CORE_EVENTS__;
const { global: L } = __STORYBOOK_MODULE_GLOBAL__;
const c = "links";
const { document: s, HTMLElement: v } = L;
const d = (e) => _.getChannel().emit(E, e);
const i = (e) => {
  const { target: t } = e;
  if (!(t instanceof v)) return;
  const o = t;
  const { sbKind: a, sbStory: r } = o.dataset;
  (a || r) && (e.preventDefault(), d({ kind: a, story: r }));
};
let n = !1;
const m = () => {
  n || ((n = !0), s.addEventListener("click", i));
};
const k = () => {
  n && ((n = !1), s.removeEventListener("click", i));
};
const R = O({
  name: "withLinks",
  parameterName: c,
  wrapper: (e, t) => (m(), _.getChannel().once(l, k), e(t)),
});
const S = [R];
export { S as decorators };
