const o = "viewport";
const a = { [o]: { value: void 0, isRotated: !1 } };
const t = { viewport: "reset", viewportRotated: !1 };
let e;
const l = (e = globalThis.FEATURES) != null && e.viewportStoryGlobals ? a : t;
export { l as initialGlobals };
