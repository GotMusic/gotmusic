function l(o) {
  for (let f = [], i = 1; i < arguments.length; i++) f[i - 1] = arguments[i];
  let n = Array.from(typeof o === "string" ? [o] : o);
  n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
  const s = n.reduce((t, g) => {
    const a = g.match(/\n([\t ]+|(?!\s).)/g);
    return a
      ? t.concat(
          a.map((u) => {
            let r;
            let e;
            return (e = (r = u.match(/[\t ]/g)) === null || r === void 0 ? void 0 : r.length) !==
              null && e !== void 0
              ? e
              : 0;
          }),
        )
      : t;
  }, []);
  if (s.length) {
    const d = new RegExp(
      `
[	 ]{${Math.min.apply(Math, s)}}`,
      "g",
    );
    n = n.map((t) =>
      t.replace(
        d,
        `
`,
      ),
    );
  }
  n[0] = n[0].replace(/^\r?\n/, "");
  let c = n[0];
  return (
    f.forEach((t, g) => {
      const a = c.match(/(?:^|\n)( *)$/);
      const u = a ? a[1] : "";
      let r = t;
      typeof t === "string" &&
        t.includes(`
`) &&
        (r = String(t)
          .split(`
`)
          .map((e, h) => (h === 0 ? e : `${u}${e}`))
          .join(`
`)),
        (c += r + n[g + 1]);
    }),
    c
  );
}
export { l as d };
