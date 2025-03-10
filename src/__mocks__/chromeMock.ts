// src/__mocks__/chromeMock.ts
import sinonChrome from 'sinon-chrome';

// Type assertion to handle incompatibilities
const chrome = sinonChrome as any;

// Make chrome available globally
(global as any).chrome = chrome;

// Reset all chrome API stubs before each test
beforeEach(() => {
  chrome.runtime.sendMessage.flush();
});

export default chrome;