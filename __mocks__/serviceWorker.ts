// src/fixtures/mockServiceWorker.ts
// Mock minimal Service Worker API needed for tests
class MockServiceWorkerGlobalScope {
  // Add any service worker specific methods you need to mock
}

// Add proper type declaration before using it
declare global {
  var ServiceWorkerGlobalScope: typeof MockServiceWorkerGlobalScope;
}

// Now assign it to the global object
globalThis.ServiceWorkerGlobalScope = MockServiceWorkerGlobalScope;

export {};  // Make this a module to ensure declarations apply properly