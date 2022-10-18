/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/build'],
  /*setupFiles: [
    "./src/tests/setup.ts",
    "./src/tests/teardown.ts",
  ],*/
  globalSetup: "./src/tests/setup.ts",
  globalTeardown: "./src/tests/teardown.ts",
  //globalSetup: "./tests/globalSetup.ts",
  //globalTeardown: "./build/tests/_transpileTeardown.js",
  moduleFileExtensions: ["ts", "js", "json"],
};