import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: "node",
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}

export default jestConfig



