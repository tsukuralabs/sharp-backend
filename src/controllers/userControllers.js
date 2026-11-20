const db = require("../config/db");
const { errResponse, sendResponse } = require("../utils/commonResponse");

// GET: All users
const getAllUser = (req, res) => {
  try {
    const getAllUserQuery = "SELECT * FROM Users";

    db.execute(getAllUserQuery, (err, result) => {
      if (err) {
        console.log(err.message);
        return errResponse(res, "Failed to fetch users", 500);
      }

      if (result.length === 0) {
        return sendResponse(res, []);
      }

      return sendResponse(res, result);
    });
  } catch (error) {
    console.log(error.message);
    return errResponse(res, "Internal server error", 500);
  }
};

// POST: Add user

const addUser = (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return errResponse(res, "All fields are required", 400);
    }

    // Validate email
    if (!email.includes("@")) {
      return errResponse(res, "Invalid email", 400);
    }

    const addUserQuery = "INSERT INTO Users (name, email) VALUES (?, ?)";

    db.execute(addUserQuery, [name, email], (err, result) => {
      if (err) {
        console.log(err.message);
        return errResponse(res, "Failed to add user", 500);
      }

      console.log(`User ${name} added successfully`);

      return sendResponse(
        res,
        {
          id: result.insertId,
          name,
          email,
        },
        201,
      );
    });
  } catch (error) {
    console.log(error.message);
    return errResponse(res, "Internal server error", 500);
  }
};

// GET: User by ID
// const getUserById = (req, res) => {
//   const user = users.find((u) => u.id === Number(req.params.userId));

//   if (!user) {
//     errResponse.statusCode = 404;
//     errResponse.message = "User not found";
//     return errResponse(req, res);
//   }

//   return sendResponse(res, user, 200);
// };

module.exports = { getAllUser, addUser };
