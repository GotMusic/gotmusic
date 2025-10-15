import path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("Admin Uploads Page", () => {
  test("should render the uploads page", async ({ page }) => {
    // Navigate to admin uploads page
    await page.goto("/admin/uploads");

    // Check for page heading
    const heading = page.getByTestId("upload-heading");
    await expect(heading).toBeVisible();

    // Check for file input
    const fileInput = page.getByTestId("file-input");
    await expect(fileInput).toBeVisible();
  });

  test("should enable upload button after file selection", async ({ page }) => {
    await page.goto("/admin/uploads");

    // Find the upload button - should be disabled initially
    const uploadButton = page.getByTestId("upload-button");
    await expect(uploadButton).toBeDisabled();

    // Find the file input
    const fileInput = page.getByTestId("file-input");

    // Create a test file path (use a fixture or create one)
    // For smoke tests, we'll use any file - create a temporary test file
    const testFilePath = path.join(process.cwd(), "tests", "fixtures", "test-audio.mp3");

    // Set a file on the input
    // Note: This may need adjustment based on actual file handling
    // For now, we'll check if the button becomes enabled after interaction
    await fileInput.setInputFiles({
      name: "test-audio.mp3",
      mimeType: "audio/mpeg",
      buffer: Buffer.from("fake audio content"),
    });

    // Verify upload button is now enabled
    await expect(uploadButton).toBeEnabled();
  });

  test("should show reset button", async ({ page }) => {
    await page.goto("/admin/uploads");

    // Check for reset button
    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeVisible();
  });
});
