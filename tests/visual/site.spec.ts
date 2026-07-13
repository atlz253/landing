import { expect, test, type Page } from "@playwright/test";

const FIXED_DATE = "2026-07-13T12:00:00.000Z";

const pages = [
  { path: "/", name: "home" },
  { path: "/music", name: "music-list" },
  { path: "/music/%D0%BE%D1%82%D1%87%D0%B5%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D1%80%D1%82-%D0%B6%D0%B7-2026", name: "music-detail" },
  { path: "/portfolio/tests", name: "portfolio-detail" },
  { path: "/404", name: "not-found" },
] as const;

async function preparePage(page: Page) {
  await page.addInitScript((fixedDate) => {
    const OriginalDate = Date;

    class FixedDate extends OriginalDate {
      constructor(value?: string | number) {
        super(value ?? fixedDate);
      }

      static now() {
        return new OriginalDate(fixedDate).getTime();
      }
    }

    Object.setPrototypeOf(FixedDate, OriginalDate);
    window.Date = FixedDate as DateConstructor;
  }, FIXED_DATE);

  await page.route(/https:\/\/(mc\.yandex\.ru|(?:www\.)?vk\.com|vkvideo\.ru|runtime\.video\.cloud\.yandex\.net)\//, (route) => route.abort());
}

async function waitForVisualStability(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }

      footer small {
        display: none !important;
      }
    `,
  });
  await page.locator("img").evaluateAll((images) => {
    for (const image of images) {
      (image as HTMLImageElement).loading = "eager";
    }
  });
  await page.evaluate(async () => {
    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => window.setTimeout(resolve, 2_000)),
    ]);
  });
  // Responsive images can change the full-page height after their first layout pass.
  await page.waitForTimeout(3_000);
  await expect(page.locator("body")).toBeVisible();
}

for (const item of pages) {
  test(`visual regression: ${item.name}`, async ({ page }) => {
    await preparePage(page);
    await page.goto(item.path, { waitUntil: "domcontentloaded" });
    await waitForVisualStability(page);

    await expect(page).toHaveScreenshot(`${item.name}.png`, {
      animations: "disabled",
      caret: "hide",
      fullPage: true,
      scale: "css",
    });
  });
}
