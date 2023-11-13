
import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/**/*.spec.ts"],

  moduleNameMapper: {
    "@controllers/(.*)$": ["<rootDir>src/controllers/$1"],
    "@core/(.*)$": ["<rootDir>src/core/$1"],
    "@domain/(.*)$": ["<rootDir>src/domain/$1"],
    "@infrastructures/(.*)$": ["<rootDir>src/infrastructures/$1"],
    "@repositories/(.*)$": ["<rootDir>src/repositories/$1"],
    "@routers/(.*)$": ["<rootDir>src/routers/$1"],
    "@services/(.*)$": ["<rootDir>src/services/$1"],
    "@utils/(.*)$": ["<rootDir>src/utils/$1"]
  }
};

export default config;
