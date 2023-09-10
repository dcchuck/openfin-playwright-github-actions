import { test } from '../fixtures';
import { expect } from '@playwright/test';

test('smoke test', async ({ appWindow }) => {
  // await appWindow.goto('http://localhost:5173');

  // Expect a title "to contain" a substring.
  const myComponentCount = await appWindow.locator('_react=MyComponent').count()
  expect(myComponentCount).toEqual(1)
});
