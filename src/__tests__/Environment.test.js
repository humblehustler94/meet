// src/__tests__/Environment.test.js

describe('Test Environment Setup', () => {

  test('should use jsdom in this test file', () => {
    // The 'document' object is only available in a browser-like
    // environment, which jsdom provides for our tests.
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

});