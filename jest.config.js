module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^.+\\.(css|less)$': '<rootDir>/config/CSSStub.js',
  },
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/data/',
    '/tests/',
    '/helpers/',
    '/store/',
  ],
}
