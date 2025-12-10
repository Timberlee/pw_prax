import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000', {
    waitUntil: 'domcontentloaded',
  });
});

test('Page title should be "Hello Title"', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hello Title/);
});

test('Check element load timing using browser clock; should be between 2-4 seconds.', async ({ page }) => {
  // page.on('console', msg => console.log(msg.text()));
  const start = await page.evaluate(() => performance.now());

  await page.locator('#slowPara01').waitFor({ state: 'visible' });

  const end = await page.evaluate(() => performance.now());
  const elapsed = end - start;

  expect(elapsed).toBeGreaterThan(2000);
  expect(elapsed).toBeLessThan(4000);
});
