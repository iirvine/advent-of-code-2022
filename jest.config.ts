import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "<rootDir>packages/*/src/**/__tests__/**/*.test.ts"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}

export default jestConfig