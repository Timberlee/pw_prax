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

test('Check that all hyperlinks are working; print each to console', async({page}) => {
  await page.goto('http://localhost:3000');
  const links = page.getByRole("link");
  const allLinks = await links.all()
  const linksData = await Promise.all(
    allLinks.map(async (link) => ({
      text: await link.textContent(),
      href: await link.getAttribute('href'),
      id: await link.getAttribute('id'),
      class: await link.getAttribute('class')
    }))
  );


  linksData.forEach((link, i) => {
    console.log(`${i+1}. ${link.text}`);
    console.log(link.href + "\n");
    // TODO: figure out the proper syntax here
    const response = page.request.get(link.href)
  });
})