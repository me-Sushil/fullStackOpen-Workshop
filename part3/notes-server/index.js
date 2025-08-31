// const http = require('http')//it import the http package,  no need to install it's build in package
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
require("dotenv").config();
const Note = require("./controllers/notes");
const config = require("./utils/config");
const logger = require("./utils/logger");

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
};

app.use(requestLogger);


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
  // const responseid = notes.find((note) => note.id === nid);
  // if (responseid) {
  //   response.json(responseid);
  // } else {
  //   response.status(404).end();
  // }
});

app.delete("/api/notes/:noteid", (request, response, next) => {
  const nid = request.params.noteid;
  Note.findByIdAndDelete(nid)
    .then((result) => response.status(204).end())
    .catch((error) => {
      next(error);
    });
  // notes = notes.filter((note) => note.id !== nid);
  // response.status(204).end();
});

// app.post("/api/notes/", (request, response) => {
//   const data = request.body;

//   if (!data.content) {
//     return response.status(404).json({
//       error: "content is missing",
//     });
//   }

//   const newNote = {
//     content: data.content,
//     important: data.important || false,
//     id: String(notes.length + 1),
//   };
//   notes.push(newNote);
//   response.json(newNote);
// });

app.post("/api/notes/", (request, response, next) => {
  const { content, important } = request.body;

  if (!content) {
    return response.status(400).json({
      error: "number or name is missing",
    });
  }

  Note.findOne({ content: content })
    .then((isExist) => {
      if (isExist) {
        return response.status(400).json({ error: "content must be unique" });
      }
    })
    .catch((error) => {
      next(error);// will handle error middleware
    });

  const note = new Note({
    content: content,
    important: important || false,
  });

  note
    .save()
    .then((result) => {
      response.json(result);
      console.log("note saved!");
      // mongoose.connection.close();
    })
    .catch((error) => {
      next(error);
    });
});

const errorhandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    // Invalid ObjectId format (e.g., malformed MongoDB _id)
    return response.status(400).send({ error: "malformatted id" });

  } else if (error.name === "ValidationError") {
    // Mongoose schema validation failed (invalid or missing data)
    return response.status(400).json({ error: error.message });

  } else if (error.name === "MongoServerError" && error.code === 11000) {
    // Unique constraint violation (duplicate value for a field marked as unique)
    return response.status(400).json({ error: "Duplicate field value" });
  }

  next(error);
};

app.use(errorhandler);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(config.PORT);
console.log(`Server running on port ${config.PORT}`);
