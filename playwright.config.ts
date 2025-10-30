import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['html', { open: 'never' }]], // or 'on' to auto-open
  use: {
    baseURL: 'http://localhost', // fallback, overridden by apiContext
  },

});