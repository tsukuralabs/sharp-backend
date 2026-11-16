const express = require("express");
const cartRouter = express.Router();

cartRouter.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  res.send(`Fetching cart for user with ID: ${userId}`);
});

cartRouter.post("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  res.send(`Adding product to cart for user with ID: ${userId}`);
});

module.exports = cartRouter;
