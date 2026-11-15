const express = require('express');

const userRouter = express.Router();


userRouter.post("/users", (req, res) => {
  res.send('A new user has been added');
});

userRouter.get("/users", (req, res) => {
  res.send('Here is the list of all the users');
});

userRouter.get("/users/:username", (req, res) => {

  const username = req.params.username;

  const role = req.query.role;

  res.send(`Welcome ${username}, your role is ${role}`);

});

module.exports = userRouter;
