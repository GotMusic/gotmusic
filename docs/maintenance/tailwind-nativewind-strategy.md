# 🎨 Tailwind + NativeWind Version Strategy

**Issue Type:** Architecture / Maintenance  
**Status:** Active  
**Last Updated:** 2025-01-21  

---

## 📋 Summary

We maintain **dual Tailwind versions** across our monorepo to support both web (Tailwind v4) and mobile (NativeWind with Tailwind v3) platforms. This strategy ensures optimal performance and compatibility while waiting for NativeWind to officially support Tailwind v4.

---

## 🎯 Current Architecture

### **Web Platform (Storybook + Next.js)**
- **Tailwind CSS:** `v4.x` with `@tailwindcss/postcss` plugin
- **PostCSS Config:** Uses new v4 plugin location
- **Benefits:** Latest features, improved performance, modern CSS architecture

### **Mobile Platform (React Native + Expo)**
- **Tailwind CSS:** `v3.3.x` (latest v3.x)
- **NativeWind:** `v4.x` or `v5.x` (latest stable)
- **Benefits:** Full NativeWind compatibility, stable mobile styling

---

## 🔧 Implementation Details

### **Web Package Configuration**
```javascript
// packages/ui/postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // Tailwind v4 plugin
    autoprefixer: {},
  },
};
```

### **Mobile Package Configuration**
```javascript
// apps/mobile/postcss.config.js (if needed)
module.exports = {
  plugins: {
    tailwindcss: {},  // Standard v3 plugin
    autoprefixer: {},
  },
};
```

### **Package.json Resolutions**
```json
{
  "resolutions": {
    // Web packages use Tailwind v4
    "tailwindcss": "^4.1.15",
    "@tailwindcss/postcss": "^4.1.15",
    
    // Mobile packages use Tailwind v3
    "apps/mobile/tailwindcss": "^3.4.0",
    "apps/mobile/nativewind": "^4.0.0"
  }
}
```

---

## 🚦 Version Compatibility Matrix

| Platform | Tailwind | NativeWind | Status | Notes |
|----------|----------|------------|--------|-------|
| **Web** | v4.x | N/A | ✅ Active | Latest features, PostCSS v4 |
| **Mobile** | v3.3.x | v4.x+ | ✅ Active | Full compatibility |
| **Future** | v4.x | v4.x+ | 🔄 Planned | When NativeWind supports v4 |

---

## 📋 Migration Checklist (Future)

### **When NativeWind Supports Tailwind v4:**
- [ ] Update NativeWind to version supporting Tailwind v4
- [ ] Upgrade mobile Tailwind from v3.x → v4.x
- [ ] Update mobile PostCSS config to use `@tailwindcss/postcss`
- [ ] Test all mobile components with new Tailwind v4 features
- [ ] Update mobile build pipeline for v4 compatibility
- [ ] Verify design token consistency across web/mobile
- [ ] Update documentation and examples

---

## 🎨 Design Token Strategy

### **Shared Tokens**
- **Location:** `packages/tokens/`
- **Format:** CSS custom properties
- **Usage:** Both web and mobile consume same token values
- **Build:** Separate output for web (CSS) and mobile (JS/TS)

### **Platform-Specific Adaptations**
- **Web:** Direct CSS custom property usage
- **Mobile:** NativeWind class mapping to design tokens
- **Consistency:** Same visual output, different implementation

---

## 🔍 Monitoring & Maintenance

### **Version Tracking**
- **Web Tailwind:** Monitor for v4.x updates and breaking changes
- **Mobile NativeWind:** Track v4 support progress in NativeWind roadmap
- **Compatibility:** Regular testing of shared components across platforms

### **Performance Monitoring**
- **Web:** Bundle size impact of Tailwind v4 features
- **Mobile:** NativeWind compilation performance with v3.x
- **Build Times:** Monitor CI/CD impact of dual version strategy

---

## 🚨 Known Limitations

### **Current Constraints**
- **NativeWind v4 Support:** Not yet available (GitHub issue tracking)
- **Shared Components:** Must work with both Tailwind versions
- **Design Tokens:** Must be compatible with both v3 and v4 syntax

### **Workarounds**
- **Component Abstraction:** Use design tokens instead of direct Tailwind classes
- **Platform Detection:** Conditional styling based on platform
- **Build Separation:** Isolated build processes for web vs mobile

---

## 📚 Resources

- **Tailwind v4 Migration:** [Official Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- **NativeWind v4 Support:** [GitHub Discussion](https://github.com/nativewind/nativewind/discussions/1394)
- **PostCSS v4 Plugin:** [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss)

---

**Labels:** `architecture`, `tailwind`, `nativewind`, `monorepo`, `maintenance`  
**Milestone:** _Design System v2.0_
