# E2E Testing with Playwright

**Status:** ✅ Active (Smoke tests)  
**Framework:** [Playwright](https://playwright.dev/)  
**Scope:** Critical user journeys in `apps/web`

---

## Quick Start

### Install Playwright Browsers

```bash
cd apps/web
yarn playwright:install
```

### Run Tests

```bash
# Run all e2e tests (headless)
yarn workspace @gotmusic/web test:e2e

# Run with UI mode (interactive)
yarn workspace @gotmusic/web test:e2e:ui

# Debug mode (step through tests)
yarn workspace @gotmusic/web test:e2e:debug

# Run specific test file
yarn workspace @gotmusic/web test:e2e home.spec
```

---

## Current Test Coverage

### Smoke Tests (MVP)

**`tests/e2e/home.spec.ts`**
- ✅ Home page renders with "GotMusic" heading
- ✅ Catalog items load (at least one visible)
- ✅ Page title is set correctly

**`tests/e2e/catalog.spec.ts`**
- ✅ Catalog page renders
- ✅ Assets load from API
- ✅ Search and filtering works

**`tests/e2e/studio-*.spec.ts`**
- ⚠️ Studio tests expect full functionality but current pages are smoke pages only
- ⚠️ Tests expect asset management forms, tables, and full CRUD operations
- ⚠️ Current implementation only has minimal smoke pages for routing verification

---

## Test Structure

```
apps/web/
├── playwright.config.ts    # Playwright configuration
├── tests/
│   ├── e2e/               # End-to-end smoke tests
│   │   ├── home.spec.ts
│   │   └── admin-uploads.spec.ts
│   └── fixtures/          # Test data (optional)
```

---

## Configuration

**Key settings** (see `playwright.config.ts`):
- **Base URL:** `http://localhost:3000` (configurable via `BASE_URL` env var)
- **Browsers:** Chromium only (add more in `projects` array if needed)
- **Retries:** 2 on CI, 0 locally
- **Web Server:** Auto-starts `yarn dev` before tests
- **Timeouts:** 120s for server startup
- **Screenshots:** On failure only
- **Traces:** On first retry

---

## CI Integration (Optional)

To add e2e tests to CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Install Playwright
  run: yarn workspace @gotmusic/web playwright:install --with-deps

- name: Run E2E tests
  run: yarn workspace @gotmusic/web test:e2e
  env:
    CI: true
```

**Note:** Not required for hackathon MVP. Run manually before demos.

---

## Known Flakes / Limitations

| Issue | Workaround | Status |
|-------|-----------|--------|
| File upload uses mock buffer | Sufficient for smoke tests | ✅ OK |
| Only Chromium tested | Add Firefox/Safari if needed | 📋 Backlog |
| No API mocking yet | Tests use real endpoints | 📋 Future |

---

## Writing New Tests

### Naming Convention

```
<page-name>.spec.ts
```

Examples:
- `asset-detail.spec.ts`
- `purchase-flow.spec.ts`
- `admin-assets.spec.ts`

### Test Structure Template

```typescript
import { test, expect } from "@playwright/test";

test.describe("Page Name", () => {
  test("should do something specific", async ({ page }) => {
    await page.goto("/your-route");
    
    // Arrange
    const element = page.getByRole("button", { name: /click me/i });
    
    // Act
    await element.click();
    
    // Assert
    await expect(page.getByText("Success")).toBeVisible();
  });
});
```

### Best Practices

1. **Use semantic selectors:**
   - Prefer `getByRole()`, `getByLabel()`, `getByText()`
   - Avoid brittle CSS selectors

2. **Add test IDs sparingly:**
   ```tsx
   <div data-testid="catalog-item">...</div>
   ```

3. **Keep tests focused:**
   - One behavior per test
   - Clear test names

4. **Clean up state:**
   - Use `test.beforeEach()` for setup
   - Use `test.afterEach()` for teardown

5. **Handle async properly:**
   - Always `await` actions
   - Use explicit waits: `await expect(...).toBeVisible()`

---

## Debugging Tips

### 1. Run in UI Mode

```bash
yarn workspace @gotmusic/web test:e2e:ui
```

Watch tests run in real-time, inspect DOM, replay steps.

### 2. Debug Mode

```bash
yarn workspace @gotmusic/web test:e2e:debug
```

Steps through test execution line-by-line.

### 3. Screenshots

Check `test-results/` directory after failures.

### 4. Traces

If a test retries, check `playwright-report/` for trace files.

### 5. Slow Down Tests

```typescript
test.use({ slowMo: 1000 }); // 1 second delay between actions
```

---

## Expanding Coverage (Post-MVP)

**High-value test candidates:**

- [ ] Asset detail page (preview audio, metadata display)
- [ ] Purchase flow (mock PYUSD, verify receipt)
- [ ] Download flow (mock decryption, verify playback)
- [ ] Mobile responsive layouts
- [ ] Dark mode (if implemented)
- [ ] Error states (network failures, invalid inputs)

---

## Resources

- [Playwright Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)
- [CI Configuration](https://playwright.dev/docs/ci)

---

**Last Updated:** Oct 13, 2025  
**Owner:** @GotMusic  
**Questions?** See main docs or open an issue with `type:test` label.

