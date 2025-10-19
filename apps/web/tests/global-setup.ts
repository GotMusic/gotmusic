import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  
  if (!baseURL) {
    throw new Error("Base URL not configured");
  }

  console.log("🔧 Setting up authentication for E2E tests...");

  // Launch browser for auth setup
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Wait for server to be ready
    console.log("⏳ Waiting for server readiness...");
    await page.goto(`${baseURL}/api/readiness`, { 
      waitUntil: "networkidle",
      timeout: 30000 
    });

    // Get auth session from test-login endpoint
    console.log("🔐 Creating test authentication session...");
    const response = await page.request.post(`${baseURL}/api/auth/test-login`);
    
    if (!response.ok()) {
      throw new Error(`Failed to create test session: ${response.status()}`);
    }

    // Extract cookies from the response
    const cookies = await context.cookies();
    const sessionCookie = cookies.find(c => c.name === "gm_session");
    
    if (!sessionCookie) {
      throw new Error("No session cookie found after test-login");
    }

    console.log("✅ Test authentication session created successfully");
    console.log(`📝 Session cookie: ${sessionCookie.value.substring(0, 20)}...`);

    // Store session cookie for use in tests
    await context.addCookies([sessionCookie]);

    // Save context state for reuse
    await context.storageState({ path: "tests/auth-state.json" });

  } catch (error) {
    console.error("❌ Global setup failed:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
