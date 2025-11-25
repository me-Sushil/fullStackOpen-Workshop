const {
  test,
  expect,
  describe,
  beforeEach,
  request,
} = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Sushil BK",
        username: "Sushil1",
        password: "Sushil1",
      },
    });

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
    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "new note" }).click();
        await page.getByRole("textbox").fill("another note by playwright");
        await page.getByRole("button", { name: "save" }).click();
      });

      test("importance can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "false" }).click();
        await expect(page.getByText("true")).toBeVisible();
      });
    });
  });

  test.only("login fails with wrong password", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    await page.getByLabel("username").fill("mluukkai");
    await page.getByLabel("password").fill("wrong");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("wrong credentials")).toBeVisible();
  });
});
