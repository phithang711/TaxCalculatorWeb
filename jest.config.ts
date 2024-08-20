export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^~(.*)$': '<rootDir>/src$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
  },
  setupFiles: ['<rootDir>/src/setupTests.ts'],
}
