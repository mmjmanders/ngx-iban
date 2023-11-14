import { test, expect } from '@playwright/test';

test('show installation page', async ({ page }) => {
  await page.goto('/installation');

  await expect(page.locator('section')).toHaveCount(3);
});
