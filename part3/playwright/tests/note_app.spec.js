const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2025"
      )
    ).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await page.getByRole("button", { name: "Login Toggle" }).click();
    await page.getByLabel("username").fill("Sushil1");
    await page.getByLabel("password").fill("Sushil1");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("Sushil BK logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Login Toggle" }).click();
      await page.getByLabel("username").fill("Sushil1");
      await page.getByLabel("password").fill("Sushil1");
      await page.getByRole("button", { name: "login" }).click();
    });
    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByRole("textbox").fill("this is test content");
      await page.getByRole("button", { name: "save" }).click();
      await expect(page.getByText("this is test content")).toBeVisible();
    });
  });
});
