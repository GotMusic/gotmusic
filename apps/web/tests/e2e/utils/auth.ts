import type { Page } from "@playwright/test";

/**
 * Login as Studio user (content manager, asset administrator)
 * Requires session cookie for /studio/* routes
 */
export async function loginStudio(page: Page, token = "e2e-session-123") {
  await page.context().addCookies([
    {
      name: "session",
      value: token,
      domain: "127.0.0.1",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    },
  ]);
}

/**
 * Login as Console user (platform administrator)
 * Requires session cookie AND platform_admin role for /console/* routes
 */
export async function loginConsole(page: Page, token = "e2e-session-123") {
  await page.context().addCookies([
    {
      name: "session",
      value: token,
      domain: "127.0.0.1",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    },
    {
      name: "role",
      value: "platform_admin",
      domain: "127.0.0.1",
      path: "/",
      sameSite: "Lax",
    },
  ]);
}

/**
 * Navigate to asset detail page in Studio
 * Waits for the page to load completely
 */
export async function gotoAssetDetail(page: Page, assetId: string) {
  await page.goto(`/studio/assets/${assetId}/`);
  await page.waitForLoadState("networkidle");
}

/**
 * Navigate to assets list page in Studio
 * Waits for the API response to ensure page is loaded
 */
export async function gotoAssetsList(page: Page) {
  await page.goto("/studio/assets/");
  await page.waitForResponse((r) => 
    r.url().includes("/api/assets") && r.ok()
  );
}

/**
 * Navigate to uploads page in Studio
 * Waits for the API response to ensure page is loaded
 */
export async function gotoUploads(page: Page) {
  await page.goto("/studio/uploads/");
  await page.waitForResponse((r) => 
    r.url().includes("/api/studio/upload/init") && r.ok()
  );
}
