const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const Note = require("./controllers/notes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(middleware.requestLogger);

app.get("/info", (request, response) => {//we use send to normal data and html form response
  response.send("<h2>Hello World!</h2>");
});

app.get("/api/notes", (request, response, next) => {
  Note.find({})//find without any paramiter to gett all 
    .then((result) => response.json(result))// use json to send json format
    .catch((error) => {
      next(error);
    });
});

app.get("/api/notes/:noteid", (request, response, next) => {
  const nid = request.params.noteid;
  Note.findById(nid)
    .then((result) => response.json(result))
    .catch((error) => next(error));
});

app.delete("/api/notes/:noteid", (request, response, next) => {
  const nid = request.params.noteid;
  Note.findByIdAndDelete(nid)
    .then((result) => response.status(204).end())
    .catch((error) => {
      next(error);
    });
});


app.post("/api/notes/", (request, response, next) => {
  const { content, important } = request.body;

  if (!content) {
    return response.status(400).json({
      error: "content is missing",
    });
  }

  Note.findOne({ content: content })
    .then((isExist) => {
      if (isExist) {
        return response.status(400).json({ error: "content must be unique" });
      }
      
      // Move note creation inside the then block
      const note = new Note({
        content: content,
        important: important || false,
      });

      return note.save();
    })
    .then((result) => {
      if (result) {
        response.json(result);
        console.log("note saved!");
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.use(middleware.errorhandler);

app.use(middleware.unknownEndpoint);

module.exports = app;