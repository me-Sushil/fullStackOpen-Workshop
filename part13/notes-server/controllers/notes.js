const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");
const { Note } = require("../models");
const { User } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  let important = {
    [Op.in]: [true, false],
  };
  if (req.query.important) {
    important = req.query.important === "true";
  }

  // const notes = await Note.findAll();
  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username"],
    },
    where: {
      important: important,
    },
  });
  res.json(notes);
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const note = await Note.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    // const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};
router.get("/:id", noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id);
  if (req.note) {
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id);
  if (req.note) {
    await req.note.destroy();
  }
  res.status(204).end();
});

router.put("/:id", noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id);
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save();
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
