import { test, expect } from '@playwright/test';

test('smoke test', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Expect a title "to contain" a substring.
  const myComponentCount = await page.locator('_react=MyComponent').count()
  expect(myComponentCount).toEqual(1)
});
