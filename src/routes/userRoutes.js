const express = require('express');
const userRouter = express.Router();

const {
  getAllUser,
  getUserById,
  addUser,
  deleteUser,
  updateUser
} = require('../controllers/userControllers');

userRouter.post("/users", addUser);
userRouter.get("/users", getAllUser);
userRouter.get("/users/:userId", getUserById);
userRouter.put("/users/:userId", updateUser);
userRouter.delete("/users/:userId", deleteUser);

module.exports = userRouter;

