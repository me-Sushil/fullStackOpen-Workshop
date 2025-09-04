const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const noteRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = express();
const config = require("./utils/config");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));


mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Connected to the mongoDB");
  })
  .catch((error) => {
    console.log(error.message, "Error while connectiong to the Mongodb");
  });


app.use(middleware.requestLogger);

app.use("/api/notes", noteRouter);
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter);


app.use(middleware.errorhandler);

app.use(middleware.unknownEndpoint);

module.exports = app;