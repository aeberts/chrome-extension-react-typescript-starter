/**
 * @jest-environment jsdom
 */
import '../../../__tests__/setup/setupServiceWorkerTests';
import chrome from '../../../__mocks__/chromeMock';

// We need to load the background script after the chrome mock is set up
// This is typically done by importing the module or requiring it
const loadBackgroundScript = () => {
  // Since background.js is in the public folder and not part of the TypeScript build,
  // we need to use the actual file path relative to where tests run
  jest.isolateModules(() => {
    // Using require to dynamically load the script in the test environment
    require('../../../public/background.js');
  });
};

describe('Background Service Worker', () => {
  
beforeEach(() => {
  // Reset chrome mock before each test
  chrome.runtime.sendMessage.flush();
  
  // Reset console mocks
  jest.clearAllMocks(); // This will clear all mocks, including console.log
  
  // Or specifically:
  // (console.log as jest.Mock).mockClear();
});

  test('creates context menu on install', () => {
    // Load the background script
    loadBackgroundScript();
    
    // Trigger the onInstalled event
    chrome.runtime.onInstalled.dispatch({});
    
    // Verify context menu was created with expected options
    expect(chrome.contextMenus.create.calledOnce).toBe(true);
    expect(chrome.contextMenus.create.firstCall.args[0]).toEqual({
      id: "exampleContextMenu",
      title: "Context Menu",
      contexts: ["selection"],
    });
  });

  test('handles context menu click with selected text', () => {
    // Mock the Date.now() function to return a consistent value for testing
    const mockDateNow = 1234567890;
    jest.spyOn(Date, 'now').mockImplementation(() => mockDateNow);
    
    // Load the background script
    loadBackgroundScript();
    
    // Set up test data
    const selectedText = "This is selected text";
    const info = {
      menuItemId: "exampleContextMenu",
      selectionText: selectedText
    };
    const tab = { id: 123 };
    
    // Trigger the onClicked event
    chrome.contextMenus.onClicked.dispatch(info, tab);
    
    // Verify behavior
    expect(console.log).toHaveBeenCalledWith(
      mockDateNow,
      "Selected text: ",
      selectedText
    );
  });

  test('does not log for other context menu items', () => {
    // Load the background script
    loadBackgroundScript();
    
    // Set up test data for a different menu item
    const info = {
      menuItemId: "someOtherMenu",
      selectionText: "Some text"
    };
    const tab = { id: 123 };
    
    // Trigger the onClicked event
    chrome.contextMenus.onClicked.dispatch(info, tab);
    
    // Verify console.log was not called
    expect(console.log).not.toHaveBeenCalled();
  });
});