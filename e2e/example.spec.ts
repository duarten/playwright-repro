import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("/")
});

test('get started link', async ({ page }) => {
  await page.getByRole('link', { name: 'Remix Docs' }).click();
  await expect(page).toHaveURL(/.*127.0.0.1:3000/);
});
