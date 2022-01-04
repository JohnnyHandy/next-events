module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/pages$1',
  },
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/data/"
  ]
}
