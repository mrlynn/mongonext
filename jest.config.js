module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx}',
    '!src/tests/setup.js',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
}; 