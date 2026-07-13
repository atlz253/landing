import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoAccessibilityViolations(page: Page, selector: string) {
  const results = await new AxeBuilder({ page }).include(selector).analyze();

  expect(results.violations).toEqual([]);
}

test("theme toggle updates and persists the selected theme", async ({ page }) => {
  await page.goto("/");

  const root = page.locator("html");
  const toggle = page.getByRole("button", { name: "Переключить тему" });
  const initialTheme = await root.getAttribute("data-theme");
  const nextTheme = initialTheme === "dark" ? "light" : "dark";

  await toggle.click();

  await expect(root).toHaveAttribute("data-theme", nextTheme);
  await expect(toggle).toHaveAttribute("aria-pressed", String(nextTheme === "dark"));
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("theme")))
    .toBe(nextTheme);
  await expectNoAccessibilityViolations(page, "header");
});

test("technology filter can be added and removed accessibly", async ({ page }) => {
  await page.goto("/");

  const select = page.locator("#technology-filter");
  const technology = (await select.locator("option").nth(1).textContent()) ?? "";
  await select.selectOption({ index: 1 });

  const removeButton = page.getByRole("button", {
    name: `Убрать фильтр «${technology}»`,
  });
  await expect(removeButton).toBeVisible();
  await removeButton.click();
  await expect(removeButton).toBeHidden();
  await expectNoAccessibilityViolations(page, "[data-technology-filter]");
});

test("lightbox supports keyboard navigation and closing", async ({ page }) => {
  await page.goto(
    "/music/%D0%BE%D1%82%D1%87%D0%B5%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D1%80%D1%82-%D0%B6%D0%B7-2025",
  );

  await page.locator("[data-lightbox-index='0']").click();

  const lightbox = page.getByRole("dialog", { name: "Просмотр фотографий" });
  await expect(lightbox).toBeVisible();
  await expect(lightbox.getByText("1 / 3")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(lightbox.getByText("2 / 3")).toBeVisible();
  await expectNoAccessibilityViolations(page, "[data-lightbox]");
  await page.keyboard.press("Escape");
  await expect(lightbox).not.toHaveAttribute("open", "");
});
