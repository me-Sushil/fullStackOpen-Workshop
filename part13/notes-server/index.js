require("dotenv").config();
const { Sequelize, DataTypes, Model } = require("sequelize");
const express = require("express");
const app = express();
app.use(express.json()); // request from user through url come in string
//  that is why this code need to us for convert into object

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
);

Note.sync();

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll();
    console.log(JSON.stringify(notes, null, 2), "this is note");

  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  console.log(req.body);
  // whenn create is use we directly create and save, we cant modify in middle
  const note = await Note.create(req.body);
  res.json(note);

  // when we use build, we can modify in middle, we need to save this after modify
  //   const note = Note.build(req.body)
  // note.important = true
  // await note.save()
});

app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    console.log(note.toJSON(), "this is note");
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
