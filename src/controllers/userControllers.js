
const { errResponse, sendResponse } = require('../utils/commonResponse');

let users = [];
let id = 1;

// GET: All users
const getAllUser = (req, res) => {
    return sendResponse(res, users, 200);
};

// POST: Add user
const addUser = (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            errResponse.statusCode = 400;
            errResponse.message = 'All fields are required';
            return errResponse(req, res);
        }

        if (!email.includes('@')) {
            errResponse.statusCode = 400;
            errResponse.message = 'Invalid email';
            return errResponse(req, res);
        }

        const user = { id: id++, name, email };

        users.push(user);

        return sendResponse(res, user, 201);

    } catch (error) {
        errResponse.statusCode = 500;
        errResponse.message = 'Internal server error';
        return errResponse(req, res);
    }
};

// GET: User by ID
const getUserById = (req, res) => {
    const user = users.find(u => u.id === Number(req.params.userId));

    if (!user) {
        errResponse.statusCode = 404;
        errResponse.message = 'User not found';
        return errResponse(req, res);
    }

    return sendResponse(res, user, 200);
};

module.exports = { getAllUser, addUser, getUserById };
