const { response } = require("../app");
const Note = require("../model/note");
const noteRouter = require("express").Router();
const User = require("../model/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

noteRouter.get("/", async (request, response, next) => {
  try {
    const result = await Note.find({}).populate("user", {
      username: 1,
      name: 1,
    }); //find without any paramiter to gett all
    response.json(result); // use json to send json format
  } catch (error) {
    next(error);
  }
});

noteRouter.get("/:noteid", async (request, response, next) => {
  const nid = request.params.noteid;
  try {
    const result = await Note.findById(nid);
    response.json(result);
  } catch (error) {
    next(error);
  }
});

noteRouter.delete("/:noteid", async (request, response, next) => {
  const nid = request.params.noteid;
  try {
    const deletedNote = await Note.findByIdAndDelete(nid);

    if (!deletedNote) {
      return response.status(404).json({ error: "note not found" });
    }

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

noteRouter.post("/", async (request, response, next) => {
  try {
    const authorization = request.get("authorization");
    console.log(authorization, "this is token from request");

    const authoArr = authorization && authorization.split(" ");

    const decodedToken = jwt.verify(authoArr[1], config.SEKRET);
    console.log(decodedToken, "this is decoded token");
    if (!decodedToken) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const { content, important } = request.body;

    const user = await User.findById(decodedToken.id);
    console.log(user, " get by decoded token");

    if (!user) {
      return response
        .status(400)
        .json({ error: "userId missing or not valid" });
    }

    const isExist = await Note.findOne({ content });

    if (isExist) {
      return response.status(400).json({ error: "content must be unique" });
    }

    // Move note creation inside the then block
    const note = new Note({
      content: content,
      important: important || false,
      user: user.id,
    });

    const result = await note.save();
    user.notes = user.notes.concat(result.id);
    await user.save();

    if (result) {
      response.status(201).json(result);
      console.log("note saved!");
    }
  } catch (error) {
    next(error);
  }
});

noteRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  const newNote = request.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, newNote, {
      new: true,
      runValidators: true,
      context: "query", // return updated doc, validate schema
    });

    if (!updatedNote) {
      return response.status(400).json({ error: "note not exist" });
    }
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = noteRouter;
