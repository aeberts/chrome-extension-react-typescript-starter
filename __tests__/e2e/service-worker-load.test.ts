import { test, expect, chromium, type BrowserContext, type Worker } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.join(__dirname, '../../dist'); // Ensure this path is correct relative to the test file

let context: BrowserContext;

test.beforeAll(async () => {
  // Launch browser with extension
  context = await chromium.launchPersistentContext('', {
    headless: false, // Run in headful mode for easier debugging
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
    ],
    // Consider adding a viewport if needed for UI tests later
    // viewport: { width: 1280, height: 720 },
  });
});

test.afterAll(async () => {
  await context.close();
});

test.describe('Extension Loading', () => {
  test('should load the service worker', async () => {
    let serviceWorker: Worker | undefined;

    try {
      console.log('Waiting for service worker...');
      // Wait specifically for the service worker event
      serviceWorker = await context.waitForEvent('serviceworker', {
        // Optional: Add a predicate if needed to be more specific,
        // e.g., predicate: (sw) => sw.url().includes(EXTENSION_ID),
        // but getting EXTENSION_ID is tricky in MV3 without opening a page.
        // For now, just wait for *any* service worker from the context.
        timeout: 15000 // Increased timeout slightly to 15s
      });

      // Log if found
      console.log(`Service worker found: ${serviceWorker?.url()}`);
      expect(serviceWorker).toBeDefined();
      // Optional: Check the URL if possible/needed
      // expect(serviceWorker.url()).toContain('background/service-worker.js');

    } catch (error) {
      console.error("Service worker not found within timeout.");
      // Log available workers on timeout
      const workers = context.serviceWorkers();
      console.log('Available service workers on timeout:', workers.map(sw => sw.url()));
      throw error; // Re-throw to fail the test
    }

    // Test succeeded if it didn't throw an error
    expect(true).toBe(true);

    // Optional: Add a check to ensure it's eventually running
    // This requires the SW to be active (e.g., via keep-alive or events)
    // await serviceWorker?.waitForFunction(() => self.registration.active);
    // console.log("Service worker registration is active.");
  });
});
