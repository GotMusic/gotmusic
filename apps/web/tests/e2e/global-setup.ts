// Minimal, robust global setup for CI/local.
import { request, expect } from '@playwright/test';

export default async function globalSetup() {
  // Canonical base URL; CI should set this already
  const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:4123';

  // Wait for readiness without trailing slash to avoid 308
  const ctx = await request.newContext({ baseURL });
  for (let i = 0; i < 60; i++) {
    try {
      const res = await ctx.get('/api/readiness'); // no trailing slash
      if (res.ok()) {
        await ctx.dispose();
        return;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  await ctx.dispose();
  throw new Error('Readiness probe failed: /api/readiness did not return 200 within 60s');
}
