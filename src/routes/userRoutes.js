const express = require('express');
const userRouter = express.Router();

const { getAllUser, addUser, getUserById } = require('../controllers/userControllers');

userRouter.post("/users", addUser);

userRouter.get("/users", getAllUser);

userRouter.get("/users/:userId", getUserById);

module.exports = userRouter;
