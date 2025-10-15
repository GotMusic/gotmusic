import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for GotMusic web app smoke tests
 * @see https://playwright.dev/docs/test-configuration
 */
const PORT = Number(process.env.PW_PORT ?? 4123);
const HOST = "127.0.0.1";
const BASE = `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",

  // Stabilize first - no parallel tests while fixing
  fullyParallel: false,
  workers: 1,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter to use
  reporter: "html",

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: BASE,

    // Collect trace when retrying the failed test
    trace: "retain-on-failure",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on failure
    video: "retain-on-failure",

    // Add timeout for better stability
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Playwright owns the server completely - no reuse, no conflicts
  webServer: {
    // Start production server on dedicated port (build happens separately in CI)
    command: process.env.CI
      ? `PORT=${PORT} next start -p ${PORT}`
      : `bash -lc "yarn build && PORT=${PORT} next start -p ${PORT}"`,
    url: BASE,
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      NODE_ENV: "test",
      E2E_AUTH_BYPASS: "1",
      GM_STORAGE_MODE: "stub",
      DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/gotmusic_test",
      ADMIN_USER: "admin",
      ADMIN_PASS: "password",
      STORAGE_DRIVER: "stub",
    },
  },
});
