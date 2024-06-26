module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@codingame/monaco-languageclient|vscode-languageserver-textdocument)/)"
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^monaco-editor$': '<rootDir>/src/__mocks__/monaco-editor.js', // Adjust as needed
  },
};
  