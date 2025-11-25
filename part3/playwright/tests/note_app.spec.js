const {
  test,
  expect,
  describe,
  beforeEach,
  request,
} = require("@playwright/test");
const { createNote, loginWith } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Sushil BK",
        username: "Sushil1",
        password: "Sushil1",
      },
    });

    await page.goto("/");
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
    await loginWith(page, "Sushil1", "Sushil1");
    await expect(page.getByText("Sushil BK logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "Sushil1", "Sushil1");
    });
    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });
    describe("and several notes exist", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note", true);
        await createNote(page, "second note", true);
      });

      test("importance can be changed for one of the notes", async ({
        page,
      }) => {
        //  await page.pause();
        const otherNoteElement = page.getByText("second note");

        await otherNoteElement.getByRole("button", { name: "false" }).click();
        await expect(otherNoteElement.getByText("true")).toBeVisible();
      });
    });
  });

  // to run only one test with command :  npm test -- -g "login fails with wrong password"
  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "Sushil1", "wrong");

    await expect(page.getByText("wrong credentials")).toBeVisible();
  });
});
