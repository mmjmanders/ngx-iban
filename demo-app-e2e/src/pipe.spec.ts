import { test, expect } from '@playwright/test';

test.describe('IbanPipe', () => {
  test('should convert GB82WEST12345698765432 to GB82 WEST 1234 5698 7654 32', async ({
    page,
  }) => {
    await page.goto('/demo');
    await page.locator('#ibanForPipe').fill('GB82WEST12345698765432');
    await expect(page.locator('.text-monospace')).toContainText(
      'GB82 WEST 1234 5698 7654 32'
    );
  });
});
