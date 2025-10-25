# Design System Overview

**Status:** ✅ Active  
**Last Updated:** Jan 13, 2025  
**CODEX Integration:** ✅ Enhanced with AI-assisted development workflow  
**Unified Design System:** ✅ **FULLY IMPLEMENTED**

---

## Purpose

GotMusic's design system ensures visual consistency, accessibility, and maintainability across web and mobile platforms through:

1. **Design Tokens** (`@gotmusic/tokens`) - Single source of truth for colors, spacing, typography
2. **UI Components** (`@gotmusic/ui`) - Shared, token-aware primitives
3. **Platform Implementations** - Tailwind CSS (web), NativeWind (mobile)

## 🎨 **Unified Glass-Neumorphic Hybrid Design System**

**Status**: ✅ **FULLY IMPLEMENTED**  
**Last Updated**: Jan 13, 2025  

### **Core Design Philosophy**
Our design system now uses a **unified Glass-Neumorphic hybrid approach** that combines:
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Neumorphism**: Soft, tactile design with subtle shadows
- **Result**: A unique, modern, and sophisticated visual language

### **Unified Component System**
All components now use a **singular design language** with three core variants:
- **`default`**: Standard glass-neumorphic styling
- **`music`**: Enhanced styling for music-related components  
- **`disabled`**: Disabled state styling

**No more separate variants** - everything uses the unified hybrid approach for consistency across all platforms (Web, Mobile, Desktop, DAW).

## Visual-First Development

### **Web Development:**
- **Use Storybook** for component development and demos
- **UI PRs must include:** Storybook screenshots or short screen recordings
- **Demo changes:** Prefer Storybook for visual components

### **Mobile Development:**
- **Use Style Guide screen** with **Dev Panel** toggles
- **UI PRs must include:** Short screen recordings
- **Demo changes:** Prefer Style Guide screen for mobile components

### **Design System Principles:**
- **Never hardcode** colors/spacing/typography
- **Use design tokens** from `packages/tokens` outputs
- **Add new tokens** via PR: `feat(tokens): add <token>`

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  packages/tokens/tokens.raw.json            │
│  (Single Source of Truth)                   │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴────────┐
       │ Style Dictionary│
       └───────┬────────┘
               │
       ┌───────┴────────┐
       │                │
   ┌───▼────┐      ┌────▼─────┐
   │ web.css│      │native.cjs│
   └───┬────┘      └────┬─────┘
       │                │
┌──────▼──────┐   ┌─────▼──────┐
│ Web         │   │ Mobile     │
│ (Tailwind)  │   │(NativeWind)│
└──────┬──────┘   └─────┬──────┘
       │                │
┌──────▼──────────────────▼──────┐
│    @gotmusic/ui                │
│    (Shared Components)         │
└────────────────────────────────┘
```

---

## Core Packages

### **1. @gotmusic/tokens**

**Purpose:** Design token management via Style Dictionary  
**Location:** `packages/tokens`

**Outputs:**
- `dist/web.css` - CSS custom properties for web
- `dist/native.ts` - TypeScript tokens for mobile
- `dist/native.cjs` - CommonJS tokens for mobile (Tailwind config)

**Token Categories:**
- Colors (bg, fg, brand, semantic)
- Spacing (1-4)
- Border radius (xs, md, xl)
- Typography (font family, text sizes)
- Elevation (shadows)
- Motion (timing)

**Usage:**
```bash
yarn tokens:build    # Rebuild tokens
yarn tokens:check    # Verify parity between platforms
```

**⚠️ Critical: Build Dependencies**
- **Web apps require tokens to be built before starting** (dev or production)
- **CI automatically builds tokens** before E2E tests
- **Local development** uses `predev`/`prestart` hooks to auto-build tokens
- **Missing tokens cause 500 errors** in SSR environments

**Documentation:**
- [Tailwind Integration](./web/tailwind.md)
- [User Pathways](./pathways/USER-PATHWAYS.md) - Complete user journey specifications
- [UI Package Specification](./specifications/ui-package.md) - Component library specification

---

### **2. @gotmusic/ui**

**Purpose:** Shared UI components (web-first, token-aware)  
**Location:** `packages/ui`

**Components:**
- **Button** - Primary, secondary, ghost variants; sm, md, lg sizes
- **Card** - Container with title and meta subcomponents

**Principles:**
- ✅ Token-driven (no hard-coded colors/spacing)
- ✅ Composable and flexible
- ✅ Accessible by default
- ✅ TypeScript strict mode
- ✅ Documented in Storybook

**Usage:**
```tsx
import { Button, Card, CardTitle, CardMeta } from "@gotmusic/ui";

<Button variant="primary" size="md" onClick={...}>
  Save Changes
</Button>

<Card>
  <CardTitle>Track Title</CardTitle>
  <CardMeta>Artist · 120 BPM · C Major</CardMeta>
</Card>
```

**Storybook:**
```bash
yarn workspace @gotmusic/web storybook
# Navigate to UI/Button and UI/Card
```

---

## Platform Implementations

### **Web (Next.js + Tailwind)**

**Location:** `apps/web`  
**Styling:** Tailwind CSS with token-based classes

**Key Files:**
- `src/styles/globals.css` - Imports `@gotmusic/tokens/web.css` ⚠️ **Critical dependency**
- `tailwind.config.js` - Maps tokens to Tailwind utilities
- `src/stories/*.stories.tsx` - Component documentation
- `package.json` - Contains `predev`/`prestart` hooks for auto-building tokens

**Token Usage:**
```tsx
// ✅ Good: Token-based classes
<div className="bg-bg text-fg p-4 rounded-md">
  <h1 className="text-brand-primary">Title</h1>
</div>

// ❌ Bad: Hard-coded values
<div className="bg-[#0B0D12] text-[#E6EAF2]">...</div>
```

**See:** [Tailwind Integration Guide](./web/tailwind.md)

---

### **Mobile (Expo + NativeWind)**

**Location:** `apps/mobile`  
**Styling:** NativeWind (Tailwind for React Native)

**Key Files:**
- `tailwind.config.cjs` - Imports tokens from `@gotmusic/tokens/native.cjs`
- `app/**/*.tsx` - Expo Router pages

**Token Usage:**
```tsx
// ✅ Good: Token-based classes
<View className="bg-bg p-4 rounded-md">
  <Text className="text-fg">Content</Text>
</View>

// ❌ Bad: Inline styles with hard-coded values
<View style={{ backgroundColor: '#0B0D12' }}>...</View>
```

---

## Design Token Workflow

### **Adding a New Token**

1. **Edit source:**
   ```json
   // packages/tokens/tokens.raw.json
   {
     "color": {
       "accent-secondary": { "value": "#FF6B6B" }
     }
   }
   ```

2. **Rebuild:**
   ```bash
   yarn tokens:build
   ```

3. **Verify parity:**
   ```bash
   yarn tokens:check
   ```

4. **Use in code:**
   ```tsx
   // Web (auto-available as Tailwind class)
   <div className="bg-accent-secondary">...</div>
   
   // Mobile (auto-available in NativeWind)
   <View className="bg-accent-secondary">...</View>
   ```

### **⚠️ Critical: Token Build Requirements**

**Before starting any web server (dev or production):**
- ✅ **Local development:** `predev` hook automatically builds tokens
- ✅ **Production builds:** `prestart` hook automatically builds tokens  
- ✅ **CI E2E tests:** `yarn tokens:build` step runs before server start
- ❌ **Missing tokens:** Causes `Module not found: Can't resolve '@gotmusic/tokens/web.css'` 500 error

**Troubleshooting:**
```bash
# If you see 500 errors, check tokens are built
ls packages/tokens/dist/web.css  # Should exist

# Force rebuild if needed
yarn tokens:build

# Verify in browser dev tools
# Look for CSS custom properties like --color-bg, --color-fg
```

### **Token Parity**

The `check-parity.cjs` script ensures tokens remain consistent across platforms:

**Validates:**
- ✅ Color values match between web CSS and mobile config
- ✅ Border radius values match
- ✅ No hard-coded values snuck into mobile config

**Runs automatically:**
- In pre-commit hooks (if configured)
- In CI pipeline
- Via `yarn tokens:check`

### **CI/CD Integration**

**Token building is integrated into the CI/CD pipeline:**

1. **Build Job:** `yarn tokens:build` runs as part of the build process
2. **E2E Job:** `yarn tokens:build` runs before starting the web server
3. **Local Development:** `predev`/`prestart` hooks automatically build tokens
4. **Production Deployments:** `prestart` hook ensures tokens are available

**CI Workflow Integration:**
```yaml
# .github/workflows/ci.yml
- name: Build tokens (required for @gotmusic/tokens/web.css)
  run: yarn tokens:build

- name: Start web (mode-aware)
  # Tokens are now available for both dev and production modes
```

**This prevents the common error:**
```
Module not found: Can't resolve '@gotmusic/tokens/web.css'
```

---

## Component Development

### **Adding a New Component**

1. **Create in packages/ui:**
   ```tsx
   // packages/ui/src/MyComponent.tsx
   import clsx from "clsx";
   
   export function MyComponent({ className, ...props }) {
     return (
       <div className={clsx("bg-bg-elevated p-4 rounded-md", className)} {...props} />
     );
   }
   ```

2. **Export from index:**
   ```ts
   // packages/ui/src/index.ts
   export { MyComponent } from "./MyComponent";
   ```

3. **Create Storybook story:**
   ```tsx
   // apps/web/src/stories/MyComponent.stories.tsx
   import { MyComponent } from "@gotmusic/ui";
   // ... story definition
   ```

4. **Use in app:**
   ```tsx
   import { MyComponent } from "@gotmusic/ui";
   ```

---

## Guidelines

### **✅ Best Practices**

1. **Always use tokens**
   - Colors: `bg-bg`, `text-fg`, `bg-brand-primary`
   - Spacing: `p-4`, `gap-3`, `mt-2`
   - Radius: `rounded-md`, `rounded-xl`

2. **Composable components**
   ```tsx
   <Card className="hover:shadow-lg">
     <CardTitle>Title</CardTitle>
     <CardMeta>Meta info</CardMeta>
   </Card>
   ```

3. **Accessible defaults**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support

4. **TypeScript strict**
   - Explicit prop types
   - No `any` types
   - Exported interfaces

### **❌ Anti-Patterns**

1. **Hard-coded values**
   ```tsx
   // ❌ Bad
   <div style={{ color: '#E6EAF2', padding: '16px' }}>
   
   // ✅ Good
   <div className="text-fg p-4">
   ```

2. **Inline styles (when tokens exist)**
   ```tsx
   // ❌ Bad
   <div style={{ backgroundColor: 'red' }}>
   
   // ✅ Good
   <div className="bg-danger">
   ```

3. **Duplicating components**
   ```tsx
   // ❌ Bad: Creating Button copy in each app
   
   // ✅ Good: Using @gotmusic/ui
   import { Button } from "@gotmusic/ui";
   ```

---

## File Structure

```
packages/
├── tokens/
│   ├── tokens.raw.json          # Source of truth
│   ├── style-dictionary.config.cjs
│   ├── scripts/check-parity.cjs
│   └── dist/
│       ├── web.css              # CSS custom properties
│       ├── native.ts            # TypeScript tokens
│       └── native.cjs           # CommonJS tokens
│
└── ui/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── index.ts             # Barrel exports
        ├── Button.tsx
        └── Card.tsx

apps/
├── web/
│   ├── src/styles/globals.css  # Imports tokens
│   ├── tailwind.config.js      # Token mapping
│   └── src/stories/
│       ├── Button.stories.tsx
│       └── Card.stories.tsx
│
└── mobile/
    └── tailwind.config.cjs      # Token import
```

---

## Tools & Scripts

| Command | Purpose |
|---------|---------|
| `yarn tokens:build` | Rebuild tokens from source |
| `yarn tokens:check` | Verify platform parity |
| `yarn workspace @gotmusic/ui typecheck` | Type-check UI package |
| `yarn workspace @gotmusic/web storybook` | View component docs |
| `yarn biome check .` | Lint all files |

---

## 🤖 CODEX AI Integration

### CODEX-Enhanced Design System

Our design system now includes **CODEX AI integration** that automatically improves code quality and user experience:

#### **Automated Improvements**
- **Code Quality** - Automated formatting, import organization, and linting fixes
- **Accessibility** - Semantic HTML elements and proper ARIA labels
- **React Best Practices** - Stable keys, proper hooks, and component patterns
- **Professional Components** - Enhanced studio pages with complete functionality
- **Testing Reliability** - Deterministic fallback data for E2E testing

#### **CODEX Design System Features**
- **Studio Enhancement** - Professional asset management components
- **API Robustness** - Fallback patterns for graceful degradation
- **Build Stability** - Committed artifacts for CI reliability
- **User Experience** - Improved loading states and error handling
- **Code Consistency** - Automated formatting and import organization

#### **CODEX Configuration**
- **`.codex-rules.md`** - Design system analysis rules and focus areas
- **`.codex-prompt.md`** - Setup instructions for design system improvements
- **Auto-merge strategy** - Streamlined PR management for design system fixes

---

## Related Documentation

- [Tailwind Integration](./web/tailwind.md) - Web token usage guide
- [Builders Start Here](../BUILDERS-START-HERE.md) - Team onboarding
- [Issue/PR Workflow](../ISSUE-PR-WORKFLOW.md) - Contributing process
- [CODEX Integration Workflow](../workflows/CODEX-INTEGRATION.md) - AI-assisted development
- [CODEX Studio Enhancements](../studio/CODEX-STUDIO-ENHANCEMENTS.md) - Enhanced studio components

---

## Roadmap

### **Completed** ✅
- Design token infrastructure
- Web token integration (CSS custom properties)
- Mobile token integration (NativeWind)
- Parity validation script
- Shared UI package foundation
- Button and Card components extracted
- **Auto-build hooks** (`predev`/`prestart`) for seamless development
- **CI integration** with automatic token building before E2E tests
- **SSR compatibility** ensuring tokens are available for server-side rendering
- **CODEX AI integration** for automated design system improvements
- **Built artifact commits** for CI stability and dependency resolution
- **Professional studio components** with enhanced UX and accessibility
- **Deterministic fallback data** for reliable E2E testing
- **API robustness patterns** for graceful degradation

### **In Progress** 🔄
- Expanding component library (Input, Select, Modal, Toast)
- Mobile-specific component adaptations

### **Planned** 📋
- Theme switching (light/dark mode)
- Component composition patterns
- Animation/motion tokens
- Responsive design tokens
- Icon system integration

---

**Questions?** See individual component docs, ask in team chat, or open a `type:docs` issue.

**Last Updated:** Oct 13, 2025  
**Maintainer:** @GotMusic
