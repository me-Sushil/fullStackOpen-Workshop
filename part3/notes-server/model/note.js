const mongoose = require("mongoose");
require("dotenv").config();
const config = require("../utils/config");
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Connected to the mongoDB");
  })
  .catch((error) => {
    console.log(error.message, "Error while connectiong to the Mongodb");
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
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
