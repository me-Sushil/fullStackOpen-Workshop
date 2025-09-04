const bcrypt = require("bcrypt");
const User = require("../model/user");
const loginRouter = require("express").Router();

loginRouter.post("/", (request, response)=>{
    const {username, password} = request.body;

    response.status(200).send("test success");
});

module.exports = loginRouter;