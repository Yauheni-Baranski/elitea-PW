import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work shows Client Work page', async ({ page }) => {
  test.setTimeout(60_000);

  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Best-effort cookie/consent handling (site may show different variants by region).
  const consentButton = page
    .getByRole('button', { name: /accept all|accept|agree|i understand|got it/i })
    .first();
  if (await consentButton.isVisible({ timeout: 2000 }).catch(() => false)) {
    await consentButton.click();
  }

  const servicesLink = page.getByRole('link', { name: 'Services' }).first();
  await servicesLink.hover();

  await page.getByRole('link', { name: /Explore Our Client Work/i }).click();

  await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
});
