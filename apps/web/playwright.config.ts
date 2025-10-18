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
  workers: process.env.CI ? 1 : undefined,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Global timeout to surface failures before GH 30m cap
  globalTimeout: 18 * 60 * 1000,

  // Reporter to use
  reporter: "html",

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: BASE,

    // Optimize for CI performance
    trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
    video: process.env.CI ? "off" : "retain-on-failure",
    screenshot: "only-on-failure",

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

  // Server is started in CI workflow, not by Playwright
  webServer: undefined,
});
