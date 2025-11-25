const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "Login Toggle" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};
const createNote = async (page, content) => {
  await page.getByRole("button", { name: "new note" }).click();
  await page.getByRole("textbox").fill(content);
  await page.getByRole("button", { name: "save" }).click();
};

export { loginWith, createNote };
