const Note = require("../model/note");
const noteRouter = require("express").Router();

noteRouter.get("/", async (request, response, next) => {
  try {
    const result = await Note.find({}); //find without any paramiter to gett all
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
    const { content, important } = request.body;

    if (!content) {
      return response.status(400).json({
        error: "content is missing",
      });
    }

    const isExist = await Note.findOne({ content: content });

    if (isExist) {
      return response.status(400).json({ error: "content must be unique" });
    }

    // Move note creation inside the then block
    const note = new Note({
      content: content,
      important: important || false,
    });

    const result = await note.save();

    if (result) {
      response.status(201).json(result);
      console.log("note saved!");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = noteRouter;
