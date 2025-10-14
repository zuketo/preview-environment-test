const { test, expect } = require('@playwright/test');

test('homepage contains preview test text', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const content = await page.textContent('#__next');
  expect(content).toBe('preview test');
});

test('static data returns boolean', async ({ request }) => {
  const response = await request.get('http://localhost:3000/data.json');
  const data = await response.json();
  expect(data.result).toBe(true);
});
