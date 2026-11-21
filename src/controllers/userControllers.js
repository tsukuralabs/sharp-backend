const User = require("../models/userModel");
const { errResponse, sendResponse } = require("../utils/commonResponse");

// GET: All users
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    return sendResponse(res, users);
  } catch (error) {
    console.log(error.message);
    return errResponse(res, "Failed to fetch users", 500);
  }
};

// POST: Add user
const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return errResponse(res, "All fields are required", 400);
    }

    if (!email.includes("@")) {
      return errResponse(res, "Invalid email", 400);
    }

    const newUser = await User.create({ name, email });

    console.log(`User ${name} added successfully`);

    return sendResponse(res, newUser, 201);
  } catch (error) {
    console.log(error.message);
    return errResponse(res, "Failed to add user", 500);
  }
};

module.exports = { getAllUser, addUser };
