import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['list'],
    ['./utils/custom-reporter.ts']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://app.env9.proposify.link',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    // Use only Chromium browser
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
  },
  // Single project configuration instead of multiple browsers
  outputDir: 'test-results/',
};

export default config;