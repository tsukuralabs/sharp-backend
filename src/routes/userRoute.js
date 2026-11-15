const express = require('express');

const userRouter = express.Router();


// Home route
userRouter.post("/users", (req, res) => {
  res.send('A new user has been added');
});

userRouter.get("/users", (req, res) => {
  res.send('Here is the list of all the users');
});

module.exports = userRouter;
