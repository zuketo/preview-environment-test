// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'web-service',
      testMatch: '**/web-service.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'static-site',
      testMatch: '**/static-site.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'worker',
      testMatch: '**/worker.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.START_SERVER ? {
    command: process.env.START_COMMAND || 'npm run dev',
    port: parseInt(process.env.PORT || '3000'),
    reuseExistingServer: !process.env.CI,
  } : undefined,
});
