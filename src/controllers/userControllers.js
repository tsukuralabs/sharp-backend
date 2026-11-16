// getAllUser
const getAllUser = (req, res) => {
    res.send('Fetching all the users');
}
// addUser
const addUser = (req, res) => {
    res.send('Adding a new user');
}
// getUserById
const getUserById = (req, res) => {
    const userId = req.params.userId;

  res.send(`Fetching user with ID: ${userId}`);
}

module.exports = {
    getAllUser,
    addUser,
    getUserById
}