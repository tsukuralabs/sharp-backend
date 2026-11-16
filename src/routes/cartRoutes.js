const express = require("express");
const cartRouter = express.Router();

const { getCartForUser, addProductToCart } = require('../controllers/cartControllers');

cartRouter.get("/cart/:userId", getCartForUser);

cartRouter.post("/cart/:userId", addProductToCart);

module.exports = cartRouter;
