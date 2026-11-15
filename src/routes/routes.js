const express = require('express');

const { userMiddleware } = require('../middlewares/middleware');
const userRouter = express.Router();


// Home route
userRouter.get("/", (req, res) => {
  res.send('<h1>Welcome to the Home Page!</h1><p><a href="/welcome">Go to Welcome Route</a></p>');
});

userRouter.get("/welcome", userMiddleware, (req, res) => {

  const user = req.user;

  console.log('user detailssssss:', user);

  res.send(`<h1>Welcome, ${user.name}!</h1>`);

});

module.exports = userRouter;
