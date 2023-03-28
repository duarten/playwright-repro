import { defineConfig, devices } from "@playwright/test"

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
    testDir: "./e2e",
    // Maximum time one test can run for.
    timeout: 60 * 1000,
    // Global timeout for the whole test run.
    globalTimeout: 5 * 60 * 1000,
    expect: {
        // Maximum time expect() should wait for the condition to be met.
        // For example in `await expect(locator).toHaveText();`
        timeout: 1000,
    },
    // Run tests in files in parallel.
    fullyParallel: true,
    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,
    // Reporter to use. See https://playwright.dev/docs/test-reporters.
    reporter: process.env.CI ? "github" : "html",
    // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
    use: {
        // Timeout for each navigation action.
        navigationTimeout: 5 * 1000,
        // Maximum time each action such as `click()` can take.
        actionTimeout: 5 * 1000,
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: "http://127.0.0.1:3000/",
        // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer.
        trace: "on-first-retry",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
    ],

    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: "playwright-results",

    // Run your local dev server before starting the tests.
    webServer: [
        {
            command: "pnpm run --filter my-remix-app dev",
            port: 3000,
            reuseExistingServer: true,
            timeout: 60 * 1000,
        },
    ]
})
