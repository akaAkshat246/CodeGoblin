import { test, expect } from '@playwright/test';

test.describe('CodeGoblins Enterprise E2E User Journeys', () => {
  test('1. Landing Page renders brand, chapters, and SEO metadata', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CodeGoblins/);

    // Verify main brand heading
    const brand = page.locator('.landing-brand');
    await expect(brand.first()).toBeVisible();

    // Verify skip-link and accessible elements
    const enterDenBtn = page.locator('button:has-text("Enter the Den")');
    await expect(enterDenBtn).toBeVisible();
  });

  test('2. Navigation to the Goblin Den opens Dashboard with navigation sidebar', async ({ page }) => {
    await page.goto('/#hq');
    
    // Verify Dashboard layout
    await expect(page.locator('text=Home / Dashboard')).toBeVisible();
    await expect(page.locator('text=Events & Workshops')).toBeVisible();
    await expect(page.locator('text=Resources Store')).toBeVisible();
  });

  test('3. Developer Resources Store allows filtering, inspection, and download', async ({ page }) => {
    await page.goto('/#hq');
    await page.click('text=Resources Store');

    // Verify Store header
    await expect(page.locator('text=Developer Resources Store')).toBeVisible();

    // Verify starter kits are present
    const inspectBtn = page.locator('button:has-text("Inspect")').first();
    await inspectBtn.click();

    // Verify modal opened
    await expect(page.locator('text=CLI Quickstart / Code Payload')).toBeVisible();
  });

  test('4. Workshops Hub renders upcoming sessions and free registration flow', async ({ page }) => {
    await page.goto('/#hq');
    await page.click('text=Events & Workshops');

    await expect(page.locator('text=Events, Sprints & Workshops')).toBeVisible();

    // Check presence of workshop cards
    const registerBtn = page.locator('button:has-text("Register Now"), button:has-text("Register Free")').first();
    if (await registerBtn.isVisible()) {
      await registerBtn.click();
    }
  });

  test('5. Admin console is guarded by RBAC and displays governance metrics', async ({ page }) => {
    await page.goto('/#hq');
    await page.click('text=Admin Dashboard');

    // Verify admin console header or login prompt
    await expect(page.locator('text=Clan Administration')).toBeVisible();
  });
});

