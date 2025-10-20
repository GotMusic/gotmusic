import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    // Set e2e-bypass cookie before using the page
    await page.context().addCookies([
      {
        name: 'e2e-bypass',
        value: '1',
        url: baseURL ?? 'http://127.0.0.1:4123',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
    ]);
    await use(page);
  },
});

export { expect } from '@playwright/test';
