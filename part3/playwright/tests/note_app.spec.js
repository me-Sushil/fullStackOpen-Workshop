const { test, expect, describe } = require("@playwright/test");

describe("Note app", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2025"
      )
    ).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "login" }).click();
    await page.getByRole("textbox").first().fill("Sushil");
    await page.getByRole("textbox").last().fill("Bishow");
    await page.getByRole("button", {name: "login"}).click();
    await expect(page.getByText("Sushil Bishow logged in")).toBeVisible();
  });
});
