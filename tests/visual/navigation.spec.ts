import { expect, test } from "@playwright/test";

test("navigation remains accessible on small screens", async ({ page }, testInfo) => {
  const viewportWidth = testInfo.project.use.viewport?.width ?? 0;
  test.skip(viewportWidth > 520, "This scenario covers mobile navigation only.");

  await page.goto("/music");

  const navigation = page.getByRole("navigation", { name: "Основная навигация" });
  const musicLink = page.getByRole("link", { name: "Музыка" });
  const themeToggle = page.getByRole("button", { name: "Переключить тему" });

  await expect(navigation).toBeVisible();
  await expect(musicLink).toHaveAttribute("aria-current", "page");
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(viewportWidth);

  await musicLink.focus();
  await expect(musicLink).toHaveCSS("outline-style", "solid");
  await themeToggle.focus();
  await expect(themeToggle).toHaveCSS("outline-style", "solid");
});
