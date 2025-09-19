const bcrypt = require("bcrypt");
const User = require("../model/user");
const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  console.log(user, " user ");

  const isPasswordValid =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  console.log(isPasswordValid, "is password right");

  if (!(isPasswordValid && user)) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SEKRET, {expiresIn:300000});
  console.log("token", token);
  response.status(200).json({token:token, username:user.username, name:user.name});
});

module.exports = loginRouter;
