const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const noteRouter = require("./controllers/notes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(middleware.requestLogger);

app.use("/api/notes", noteRouter);

app.use(middleware.errorhandler);

app.use(middleware.unknownEndpoint);

module.exports = app;