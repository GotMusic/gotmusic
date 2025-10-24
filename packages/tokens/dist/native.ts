export const tokens = {
  "color": {
    "palette": {
      "neutral": {
        "0": "#0A0C11",
        "50": "#0B0D12",
        "100": "#0F131B",
        "200": "#121520",
        "300": "#171B28",
        "400": "#1E2433",
        "500": "#293141",
        "600": "#343E52",
        "700": "#445369",
        "800": "#5A6F8A",
        "900": "#A9B1C1",
        "1000": "#E6EAF2"
      },
      "brand": {
        "mint": "#6AE6A6",
        "mint-200": "#96F0C2",
        "mint-700": "#2BCB8E",
        "ice": "#5BD0FF",
        "ice-200": "#90E0FF",
        "ice-700": "#23B7F0"
      },
      "semantic": {
        "success": "#39D98A",
        "warning": "#F7C948",
        "danger": "#F97066",
        "info": "#7CD4FF"
      },
      "gradient": {
        "brandGlow": "linear-gradient(135deg, #6AE6A6 0%, #5BD0FF 100%)",
        "surfaceSheen": "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)"
      }
    },
    "bg": {
      "default": "#0B0D12",
      "elevated": "#121520",
      "overlay": "rgba(8, 10, 14, 0.70)",
      "muted": "#0F131B",
      "active": "#101623"
    },
    "fg": {
      "default": "#E6EAF2",
      "muted": "#A9B1C1",
      "subtle": "rgba(230,234,242,0.75)",
      "inverse": "#0B0D12"
    },
    "brand": {
      "primary": "#6AE6A6",
      "accent": "#5BD0FF",
      "ring": "#7EF0C9"
    },
    "border": {
      "hairline": "rgba(255,255,255,0.06)",
      "subtle": "rgba(255,255,255,0.10)",
      "emphasis": "rgba(255,255,255,0.16)",
      "brand": "rgba(106,230,166,0.55)",
      "danger": "rgba(249,112,102,0.55)"
    },
    "state": {
      "hover": "rgba(255,255,255,0.04)",
      "press": "rgba(255,255,255,0.06)",
      "focus": "#7EF0C9",
      "selected": "rgba(106,230,166,0.20)",
      "disabled-fg": "rgba(230,234,242,0.35)",
      "disabled-bg": "rgba(255,255,255,0.06)"
    }
  },
  "radius": {
    "xs": 6,
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 20,
    "full": 999
  },
  "space": {
    "0": 0,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "8": 32,
    "10": 40,
    "12": 48,
    "16": 64,
    "24": 96
  },
  "size": {
    "icon": {
      "xs": 12,
      "sm": 14,
      "md": 16,
      "lg": 20,
      "xl": 24,
      "xxl": 32
    },
    "control": {
      "sm": 28,
      "md": 36,
      "lg": 44
    },
    "container": {
      "sm": 640,
      "md": 768,
      "lg": 1024,
      "xl": 1280
    }
  },
  "opacity": {
    "0": 0,
    "4": 0.04,
    "6": 0.06,
    "10": 0.1,
    "16": 0.16,
    "20": 0.2,
    "35": 0.35,
    "70": 0.7
  },
  "elevation": {
    "ambient-1": "0 2 8 0 rgba(0,0,0,0.35)",
    "ambient-2": "0 4 16 0 rgba(0,0,0,0.40)",
    "ambient-3": "0 10 32 0 rgba(0,0,0,0.45)",
    "glow-brand-soft": "0 0 0 1px rgba(106,230,166,0.25), 0 0 22px 6px rgba(106,230,166,0.15)",
    "glow-accent-soft": "0 0 0 1px rgba(91,208,255,0.20), 0 0 24px 8px rgba(91,208,255,0.12)"
  },
  "blur": {
    "backdrop": 12,
    "popover": 20
  },
  "z": {
    "base": 0,
    "dropdown": 10,
    "sticky": 20,
    "overlay": 30,
    "modal": 40,
    "toast": 50
  },
  "font": {
    "family": {
      "sans": "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      "mono": "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    },
    "weight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "tracking": {
      "tight": -0.2,
      "normal": 0,
      "wide": 0.2
    }
  },
  "text": {
    "xs": {
      "size": 12,
      "line": 16
    },
    "sm": {
      "size": 13,
      "line": 18
    },
    "md": {
      "size": 14,
      "line": 20
    },
    "lg": {
      "size": 16,
      "line": 22
    },
    "xl": {
      "size": 20,
      "line": 26
    },
    "display-sm": {
      "size": 24,
      "line": 30,
      "weight": 600
    },
    "display-md": {
      "size": 32,
      "line": 38,
      "weight": 600
    },
    "display-lg": {
      "size": 40,
      "line": 48,
      "weight": 700
    }
  },
  "motion": {
    "duration": {
      "micro": 120,
      "fast": 180,
      "base": 240,
      "slow": 320
    },
    "easing": {
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      "emphasized": "cubic-bezier(0.2, 0.0, 0, 1.0)",
      "springy": "cubic-bezier(0.16, 1, 0.3, 1)"
    }
  },
  "ring": {
    "focus": "0 0 0 2px rgba(126,240,201,0.9)",
    "danger": "0 0 0 2px rgba(249,112,102,0.9)"
  },
  "component": {
    "button": {
      "radius": 12,
      "height": 36,
      "paddingX": 16,
      "gap": 8,
      "primary": {
        "fg": "#0B0D12",
        "bg": "#6AE6A6",
        "bg-hover": "#5ADFA0",
        "bg-press": "#44D593",
        "shadow": "0 0 0 1px rgba(106,230,166,0.25), 0 0 22px 6px rgba(106,230,166,0.15)"
      },
      "ghost": {
        "fg": "#E6EAF2",
        "bg": "transparent",
        "bg-hover": "rgba(255,255,255,0.04)",
        "bg-press": "rgba(255,255,255,0.06)",
        "border": "rgba(255,255,255,0.10)"
      },
      "danger": {
        "fg": "#0B0D12",
        "bg": "#F97066",
        "bg-hover": "#F85A50"
      }
    },
    "card": {
      "radius": 16,
      "bg": "#121520",
      "border": "rgba(255,255,255,0.10)",
      "shadow": "0 4 16 0 rgba(0,0,0,0.40)",
      "sheen": "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)"
    },
    "input": {
      "radius": 8,
      "height": 36,
      "fg": "#E6EAF2",
      "placeholder": "#A9B1C1",
      "bg": "#0F131B",
      "border": "rgba(255,255,255,0.10)",
      "border-focus": "#5BD0FF",
      "ring-focus": "0 0 0 2px rgba(126,240,201,0.9)"
    },
    "toggle": {
      "track": "rgba(255,255,255,0.12)",
      "track-on": "rgba(106,230,166,0.45)",
      "thumb": "#0B0D12",
      "thumb-on": "#0B0D12",
      "radius": 999
    },
    "listItem": {
      "bg-hover": "rgba(255,255,255,0.04)",
      "bg-press": "rgba(255,255,255,0.06)",
      "border": "rgba(255,255,255,0.06)",
      "radius": 12
    },
    "chip": {
      "radius": 999,
      "bg": "rgba(255,255,255,0.08)",
      "bg-active": "#5BD0FF",
      "fg": "#E6EAF2",
      "fg-active": "#0B0D12",
      "border": "rgba(255,255,255,0.10)"
    }
  },
  "a11y": {
    "focusOffset": 2,
    "focusWidth": 2,
    "minTap": 44
  },
  "audio": {
    "meter": {
      "low": "#6AE6A6",
      "mid": "#F7C948",
      "hot": "#F97066"
    },
    "waveform": {
      "fill": "rgba(230,234,242,0.9)",
      "bg": "rgba(255,255,255,0.06)",
      "cursor": "#5BD0FF"
    }
  },
  "icon": {
    "strokeWidth": 1.5,
    "corner": "miter",
    "fill": {
      "default": "none",
      "solid": "currentColor",
      "brand": "#6AE6A6",
      "accent": "#5BD0FF",
      "success": "#39D98A",
      "warning": "#F7C948",
      "danger": "#F97066",
      "info": "#7CD4FF"
    },
    "stroke": {
      "default": "currentColor",
      "brand": "#6AE6A6",
      "accent": "#5BD0FF",
      "muted": "#A9B1C1",
      "subtle": "rgba(230,234,242,0.75)"
    },
    "animation": {
      "duration": 180,
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  },
  "dataviz": {
    "1": "#6AE6A6",
    "2": "#5BD0FF",
    "3": "#CBA1FF",
    "4": "#FFD180",
    "5": "#FF8FA3"
  }
} as const;
