// This file will be used to setup the Jest environment

// Global setup
process.env.NODE_ENV = 'test';

// This is useful for mocks
global.console = {
  ...console,
  // Uncomment to ignore specific console methods during tests
  // log: jest.fn(),
  // error: jest.fn(),
  // warn: jest.fn(),
};

// Add any other global setup needed for tests
