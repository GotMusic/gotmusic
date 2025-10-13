const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
  name: "value/size/px",
  type: "value",
  matcher: (prop) => ["space", "radius", "text"].includes(prop.path[0]),
  transformer: (prop) => {
    const v = String(prop.value);
    if (/^\d+(\.\d+)?$/.test(v)) return `${v}px`;
    return v;
  },
});

StyleDictionary.registerFormat({
  name: "javascript/ts-tokens",
  formatter: ({ dictionary }) => {
    const obj = {};
    for (const t of dictionary.allTokens) {
      const path = t.path;
      let cursor = obj;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        cursor[key] = cursor[key] || {};
        cursor = cursor[key];
      }
      cursor[path[path.length - 1]] = t.value;
    }
    return `export const tokens = ${JSON.stringify(obj, null, 2)} as const;\n`;
  },
});

StyleDictionary.registerFormat({
  name: "javascript/cjs-tokens",
  formatter: ({ dictionary }) => {
    const obj = {};
    for (const t of dictionary.allTokens) {
      const path = t.path;
      let cursor = obj;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        cursor[key] = cursor[key] || {};
        cursor = cursor[key];
      }
      cursor[path[path.length - 1]] = t.value;
    }
    return `module.exports = { tokens: ${JSON.stringify(obj, null, 2)} };\n`;
  },
});

module.exports = {
  source: ["tokens.raw.json"],
  platforms: {
    web: {
      transforms: ["attribute/cti", "name/cti/kebab", "value/size/px"],
      buildPath: "dist/",
      files: [
        {
          destination: "web.css",
          format: "css/variables",
          options: { selector: ":root" },
        },
      ],
    },
    native: {
      transforms: ["attribute/cti", "name/cti/kebab"],
      buildPath: "dist/",
      files: [
        {
          destination: "native.ts",
          format: "javascript/ts-tokens",
        },
        {
          destination: "native.cjs",
          format: "javascript/cjs-tokens",
        },
      ],
    },
  },
};
