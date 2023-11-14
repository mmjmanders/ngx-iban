import { test, expect } from '@playwright/test';

test.describe('IbanDirective', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo');
  });

  test.describe('Template-driven form', () => {
    test('should yield valid for NL42TEST0519098218', async ({ page }) => {
      const iban = page.locator('#iban1');
      await iban.fill('NL42TEST0519098218');
      await expect(iban).toHaveClass(/ng-valid/);
    });

    test('should yield invalid for NL42TEST0519098218', async ({ page }) => {
      const iban = page.locator('#iban1');
      await iban.fill('NL42TEST0519098219');
      await expect(iban).toHaveClass(/ng-invalid/);
    });

    test('should yield invalid for NL42TEST0519098218 when country is DE', async ({
      page,
    }) => {
      await page.locator('#iso1').selectOption('DE');
      const iban = page.locator('#iban1');
      await iban.fill('NL42TEST0519098218');
      await expect(iban).toHaveClass(/ng-invalid/);
    });
  });

  test.describe('Reactive form', () => {
    test('should yield valid for NL42TEST0519098218', async ({ page }) => {
      const iban = page.locator('#iban2');
      await iban.fill('NL42TEST0519098218');
      await expect(iban).toHaveClass(/ng-valid/);
    });

    test('should yield invalid for NL42TEST0519098218', async ({ page }) => {
      const iban = page.locator('#iban2');
      await iban.fill('NL42TEST0519098219');
      await expect(iban).toHaveClass(/ng-invalid/);
    });

    test('should yield invalid for NL42TEST0519098218 when country is DE', async ({
      page,
    }) => {
      await page.locator('#iso2').selectOption('DE');
      const iban = page.locator('#iban2');
      await iban.fill('NL42TEST0519098218');
      await expect(iban).toHaveClass(/ng-invalid/);
    });
  });
});
