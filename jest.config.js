module.exports = {
    setupFilesAfterEnv: ["./jest.setup.js"],
    moduleNameMapper: {
        "^@pages(.*)$": "<rootDir>/pages$1",
      },
      "testEnvironment": "jsdom"
  };