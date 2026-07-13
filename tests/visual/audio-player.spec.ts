import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("audio player ranges support keyboard interaction", async ({ page, browserName }) => {
  await page.route(/https:\/\/runtime\.video\.cloud\.yandex\.net\//, (route) =>
    route.abort(),
  );
  await page.goto(
    "/music/%D0%BF%D1%83%D1%88%D0%B8%D1%81%D1%82%D1%8B%D0%B9-%D1%85%D0%B2%D0%BE%D1%81%D1%82-%D0%BB%D0%B8%D1%81%D0%B8%D1%86%D1%8B",
  );

  const volume = page.locator("[data-volume-range]");
  await expect(volume).toHaveAttribute("type", "range");
  await volume.focus();
  await volume.press("ArrowLeft");
  await expect(volume).toHaveValue("99");
  await expect(volume).toHaveAttribute("aria-valuetext", "Громкость 99%");

  const progress = page.locator("[data-progress]");
  await expect(progress).toHaveAttribute("type", "range");

  const accessibility = await new AxeBuilder({ page })
    .include("[data-audio-player]")
    .analyze();
  expect(accessibility.violations).toEqual([]);

  if (browserName !== "webkit") {
    await page.locator("[data-global-play-btn]").click();
    await expect(progress).toBeEnabled();
    await expect(progress).toHaveAttribute("aria-valuetext", /из/);
  }
});
