// const http = require('http')//it import the http package,  no need to install it's build in package
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
require("dotenv").config();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

let notes = [];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

app.get("/", (request, response) => {
  response.send("<h2>Hello World!</h2>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => response.json(result));
});

app.get("/api/notes/:noteid", (request, response) => {
  const nid = request.params.noteid;
  const responseid = notes.find((note) => note.id === nid);
  if (responseid) {
    response.json(responseid);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:noteid", (request, response) => {
  const nid = request.params.noteid;
  notes = notes.filter((note) => note.id !== nid);
  response.status(204).end();
});

app.post("/api/notes/", (request, response) => {
  const data = request.body;

  if (!data.content) {
    return response.status(404).json({
      error: "content is missing",
    });
  }

  const newNote = {
    content: data.content,
    important: data.important || false,
    id: String(notes.length + 1),
  };
  notes.push(newNote);
  response.json(newNote);
});

// app.post("/api/notes/",(request, response)=>{
//     const data = request.body;
//     data.id= String(notes.length+1);
//     notes.push(data);
//     response.json(notes);
// })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);
