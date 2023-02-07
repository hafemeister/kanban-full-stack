// jest.config.js
const nextJest = require("next/jest")

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],

    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ["node_modules", "<rootDir>/"],

    // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
    // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
    // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
    // For example:
    moduleNameMapper: {
        "@/(.*)$": "<rootDir>/src/$1",
        // force lodash esm modules to run with cjs version during tests
        "^lodash-es$": "lodash",
    },
    testEnvironment: "jest-environment-jsdom",

    // solves the difficult mock failures by ensuring the test files are transformed properly
    // reference: https://github.com/vercel/next.js/issues/32539#issuecomment-1022559369
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"],
    },
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    coverageDirectory: "coverage",
    verbose: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
