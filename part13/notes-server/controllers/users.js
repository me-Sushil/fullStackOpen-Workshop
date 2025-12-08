const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");
const { User } = require("../models");
const { Note } = require("../models");
const { Team } = require("../models");

router.get("/", async (req, res) => {
  // const users = await User.findAll()
  const users = await User.findAll({
    include: [
      {
        model: Note,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  // const user = await User.findByPk(req.params.id);
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Note,
    },
  });
  if (user) {
    // res.json(user);
    res.json({
      username: user.username,
      name: user.name,
      noteCount: user.notes.length,
    });
  } else {
    res.status(404).end();
  }
});
const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not permitted" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});
module.exports = router;
