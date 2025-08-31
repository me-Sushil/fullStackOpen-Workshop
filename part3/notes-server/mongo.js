const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./utils/config");

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URI);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
})

note.save().then(result => {
  mongoose.connection.close();
});
