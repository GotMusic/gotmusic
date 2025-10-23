import { R as e } from "./index-2yJIXLcc.js";
const a = ({ name: d, token: t }) =>
    e.createElement(
      "div",
      { className: "flex items-center gap-3" },
      e.createElement("div", {
        className: "h-10 w-10 rounded-md border",
        style: { background: `var(${t})` },
      }),
      e.createElement("code", { className: "text-sm" }, d, " — ", t),
    ),
  s = { title: "Design/Tokens" },
  r = {
    render: () =>
      e.createElement(
        "div",
        { className: "grid gap-3" },
        e.createElement(a, { name: "Brand Primary", token: "--color-brand-primary" }),
        e.createElement(a, { name: "Foreground", token: "--color-fg-default" }),
        e.createElement(a, { name: "Background", token: "--color-bg-default" }),
      ),
  };
var o, n, c;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((o = r.parameters) == null ? void 0 : o.docs),
    source: {
      originalSource: `{
  render: () => <div className="grid gap-3">
      <Swatch name="Brand Primary" token="--color-brand-primary" />
      <Swatch name="Foreground" token="--color-fg-default" />
      <Swatch name="Background" token="--color-bg-default" />
    </div>
}`,
      ...((c = (n = r.parameters) == null ? void 0 : n.docs) == null ? void 0 : c.source),
    },
  },
};
const l = ["Colors"];
export { r as Colors, l as __namedExportsOrder, s as default };
