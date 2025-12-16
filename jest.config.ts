import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;
