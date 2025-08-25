const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to the mongoDB");
  })
  .catch((error) => {
    console.log(error, "Error while connectiong to the Mongodb");
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
