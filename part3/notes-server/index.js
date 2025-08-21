// const http = require('http')//it import the http package,  no need to install it's build in package
const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

app.get("/", (request, response) => {
  response.send("<h2>Hello World!</h2>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
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
  const newNote = {
    content: data.content,
    important: data.important || false ,
    id : String(notes.length + 1)
  }
  notes.push(newNote);
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
