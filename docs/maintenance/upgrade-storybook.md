# 🧩 Storybook + Tailwind Version Upgrade Plan

**Issue Type:** Maintenance / Tech Debt  
**Status:** Scheduled for later  
**Target Window:** After Design System v2.0 stabilization  

---

## 📋 Summary

We are currently running **Storybook 8.6.14** for compatibility with key addons (`@storybook/addon-essentials`, `@storybook/addon-a11y`, `@storybook/addon-links`) and using **Tailwind v4** for web.  

When the addon ecosystem for **Storybook 9.x+** stabilizes, we will perform a full upgrade across all web and mobile packages to regain access to the newer testing, performance, and documentation improvements.

---

## 🎯 Goals

- Upgrade **Storybook 8.6.14 → 9.1.x+**  
- Align all addons to the same version (`@storybook/addon-essentials`, `@storybook/addon-a11y`, `@storybook/addon-links`, etc.)  
- Verify **Tailwind v4** integration with Vite builder remains stable  
- Prepare **NativeWind (React Native)** for Tailwind v4 once official support is released  

---

## ✅ Current Stable Stack

| Area | Package / Tool | Version | Notes |
|------|----------------|----------|-------|
| Storybook | `@storybook/react-vite` | **8.6.14** | Stable and aligned |
| Addons | Essentials · A11y · Links | **8.6.14** | All functional |
| Tailwind (Web) | `tailwindcss@4.x` | ✅ | Using `@tailwindcss/postcss` |
| Tailwind (Mobile) | `tailwindcss@3.x` + `nativewind` | ✅ | Will upgrade when supported |

---

## 🧭 Upgrade Checklist

- [ ] Bump Storybook core and all addons to `9.1.x` (or latest stable)
- [ ] Replace `@storybook/react-vite@8.6.14` → `@storybook/react-vite@9.x`
- [ ] Update addons (`@storybook/addon-essentials`, `@storybook/addon-a11y`, `@storybook/addon-links`, etc.) → `9.x`
- [ ] Run `yarn dedupe` and confirm a single Storybook version across all packages
- [ ] Verify Tailwind v4/PostCSS integration under new Storybook
- [ ] Smoke-test all stories (`http://localhost:6006/iframe.html`)
- [ ] Confirm A11y panel renders and axe checks pass
- [ ] Confirm Docs, Controls, and Actions panels function normally
- [ ] Validate performance improvements vs 8.6.14 baseline
- [ ] Remove temporary workarounds added for 8.x compatibility

---

## 🚦 Exit Criteria

- Storybook starts with **no version or addon resolution warnings**  
- All **19+ component stories** render without errors  
- **A11y panel** performs full axe accessibility audits  
- **Docs/Controls/Actions panels** function as expected  
- **Tailwind CSS** builds cleanly with PostCSS plugin  
- **NativeWind** supports Tailwind v4 (or patch applied)

---

## 🕐 Timing Recommendation

Schedule this upgrade **after major component refactors or design-system v2.0 stabilization**  
(e.g., target Q3 2025) to avoid merging UI changes and infrastructure migrations simultaneously.

---

**Labels:** `maintenance`, `storybook`, `tech-debt`, `frontend`, `a11y`  
**Milestone:** _Post-Design System v2.0 Stabilization_
