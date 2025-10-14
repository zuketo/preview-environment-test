const { test, expect } = require('@playwright/test');

test.describe('Web Service Tests', () => {
  test('homepage loads and displays preview test text', async ({ page }) => {
    await page.goto('/');
    const content = await page.textContent('#__next');
    expect(content).toBe('preview test');
  });

  test('homepage responds with correct status', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
  });

  test('static data file is accessible', async ({ request }) => {
    const response = await request.get('/data.json');
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.result).toBe(true);
  });

  test('404 page works correctly', async ({ page }) => {
    const response = await page.goto('/nonexistent-page');
    expect(response.status()).toBe(404);
  });
});
