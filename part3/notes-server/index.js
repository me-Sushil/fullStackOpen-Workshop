// const http = require('http')//it import the http package,  no need to install it's build in package
const express = require("express");
const app = express();
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger);



let notes = [
  { id: "1", 
    name: "Sushil Bishowkarma", 
    number: "9819909012",
    important: true,
 },
  { id: "2", 
    name: "Akash Tolange", 
    number: "9719093412",
    important: true,
},
  { id: "3", 
    name: "Niru magar", 
    number: "9813409018",
    important: true,
 },
  { id: "4", 
    name: "Muskan ....", 
    number: "9811909019",
    important: true,
 },
  { id: "5", 
    name: "Libina Rai", 
    number: "9719309011",
    important: true,
 },
  { id: "6", 
    name: "Sirisha .....", 
    number: "9714609014",
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

// app.post("/api/notes/", (request, response) => {
//   const data = request.body;

//   if(!data.content){
//     return response.status(404).json({
//         error: "content is missing"
//     }) 
//   }

//   const newNote = {
//     content: data.content,
//     important: data.important || false ,
//     id : String(notes.length + 1)
//   }
//   notes.push(newNote);
//   response.json(notes);
// });


app.post("/api/notes/",(request, response)=>{
    const data = request.body;
    data.id= String(notes.length+1);
    notes.push(data);
    response.json(notes);
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
