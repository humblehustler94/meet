// jest.config.cjs

module.exports = {
  projects: [
    // --- PROJECT 1: For React component tests ---
    {
      displayName: 'dom',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['<rootDir>/src/**/*.test.js?(x)'],
      // ADD THIS LINE to explicitly ignore the E2E test
      testPathIgnorePatterns: ['<rootDir>/src/__tests__/EndToEnd.test.js'],
      setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    },

    // --- PROJECT 2: For End-to-End (Puppeteer) tests ---
    {
      displayName: 'node',
      testEnvironment: 'node',
      // This pattern is correct, it only targets the E2E test
      testMatch: ['<rootDir>/src/__tests__/EndToEnd.test.js'],
    },
  ],
};