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

// GET: Single user by ID (findByPk)
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return errResponse(res, "User not found", 404);
    }

    return sendResponse(res, user);
  } catch (error) {
    console.log(error.message);
    return errResponse(res, "Failed to fetch user", 500);
  }
};

// PUT: Update user by ID (Update)
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return errResponse(res, "User not found", 404);
    }

    await User.update(
      {
        name: name !== undefined ? name : user.name,
        email: email !== undefined ? email : user.email
      },
      { where: { id: userId } }
    );

    const updatedUser = await User.findByPk(userId);
    console.log(`User ${userId} updated successfully`);

    return sendResponse(res, updatedUser);
  } catch (error) {
    console.log(error.message);
    const validationMsg = error.errors?.[0]?.message;
    return errResponse(res, validationMsg || "Failed to update user", validationMsg ? 400 : 500);
  }
};

// DELETE: Remove user by ID (Delete)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedCount = await User.destroy({
      where: { id: userId }
    });

    if (deletedCount === 0) {
      return errResponse(res, "User not found", 404);
    }

    console.log(`User ${userId} deleted successfully`);
    return sendResponse(res, { message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return errResponse(res, "Failed to delete user", 500);
  }
};

module.exports = { getAllUser, addUser, getUserById, deleteUser, updateUser };