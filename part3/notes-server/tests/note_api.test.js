const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Note = require("../model/note");
const app = require("../app");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../model/user");

const api = supertest(app);

describe("when there is initially some notes saved", () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    let noteObject = helper.initialNotes.map((note) => new Note(note));
    let promiseArray = noteObject.map((note) => note.save());
    await Promise.all(promiseArray);
  });

  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    assert.strictEqual(response.body.length, 2);
    //   assert.strictEqual(response.body.length, initialNotes.length)
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((e) => e.content);
    assert.strictEqual(contents.includes("HTML is easy"), true);
  });

  describe("addition of a new note", () => {
    test("a valid note can be added ", async () => {
      const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
      };

      await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/notes");

      const contents = response.body.map((r) => r.content);

      assert.strictEqual(response.body.length, helper.initialNotes.length + 1);

      assert(contents.includes("async/await simplifies making async calls"));
    });

    test("note without content is not added", async () => {
      const newNote = {
        important: true,
      };

      await api.post("/api/notes").send(newNote).expect(400);

      const response = await api.get("/api/notes");

      assert.strictEqual(response.body.length, helper.initialNotes.length);
    });
  });

  describe("viewing a specific note", () => {
    test("a specific note can be viewed", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test("a note can be deleted", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAtEnd = await helper.notesInDb();

      const contents = notesAtEnd.map((n) => n.content);
      assert(!contents.includes(noteToDelete.content));

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
    });
  });
});
describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});
