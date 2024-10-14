module.exports = {
    testEnvironment: 'jsdom', // Needed for React components
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use Babel for JS/JSX
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/" // Allow axios to be transformed
    ],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
    },
  };
  