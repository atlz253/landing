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
    const fontFaces = [
      '400 16px "IBM Plex Sans"',
      '500 16px "IBM Plex Sans"',
      '600 16px "IBM Plex Sans"',
    ];

    await Promise.all(fontFaces.map((fontFace) => document.fonts.load(fontFace)));
    await document.fonts.ready;

    if (!fontFaces.every((fontFace) => document.fonts.check(fontFace))) {
      throw new Error("IBM Plex Sans did not load");
    }
  });

  await expect
    .poll(() =>
      page.locator("img").evaluateAll((images) =>
        images.every((image) => {
          const htmlImage = image as HTMLImageElement;

          return !htmlImage.getAttribute("src") || (htmlImage.complete && htmlImage.naturalWidth > 0);
        }),
      ),
    )
    .toBe(true);

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve());
        });
      }),
  );
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
