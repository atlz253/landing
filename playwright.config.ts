import { defineConfig } from "@playwright/test";

const desktopViewport = { width: 1440, height: 900 };
const mobileViewport = { width: 390, height: 844 };

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["html", { open: "never" }], ["list"]],
  snapshotPathTemplate:
    "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
  use: {
    baseURL: "http://127.0.0.1:4321",
    colorScheme: "light",
    locale: "ru-RU",
    timezoneId: "Europe/Moscow",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium-desktop", use: { browserName: "chromium", viewport: desktopViewport } },
    { name: "chromium-mobile", use: { browserName: "chromium", viewport: mobileViewport } },
    { name: "firefox-desktop", use: { browserName: "firefox", viewport: desktopViewport } },
    { name: "firefox-mobile", use: { browserName: "firefox", viewport: mobileViewport } },
    { name: "webkit-desktop", use: { browserName: "webkit", viewport: desktopViewport } },
    { name: "webkit-mobile", use: { browserName: "webkit", viewport: mobileViewport } },
    {
      name: "chromium-desktop-dark",
      use: { browserName: "chromium", colorScheme: "dark", viewport: desktopViewport },
    },
    {
      name: "chromium-mobile-dark",
      use: { browserName: "chromium", colorScheme: "dark", viewport: mobileViewport },
    },
    {
      name: "firefox-desktop-dark",
      use: { browserName: "firefox", colorScheme: "dark", viewport: desktopViewport },
    },
    {
      name: "firefox-mobile-dark",
      use: { browserName: "firefox", colorScheme: "dark", viewport: mobileViewport },
    },
    {
      name: "webkit-desktop-dark",
      use: { browserName: "webkit", colorScheme: "dark", viewport: desktopViewport },
    },
    {
      name: "webkit-mobile-dark",
      use: { browserName: "webkit", colorScheme: "dark", viewport: mobileViewport },
    },
  ],
  webServer: {
    command: "npm run build && npm run preview -- --host 127.0.0.1",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
  },
});
