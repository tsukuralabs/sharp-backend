const userMiddleware = (req, res, next) => {
  try {
    req.user = {
      id: 1,
      name: "Rohit",
      role: "Visitor",
    };
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }

  next();
};

module.exports = {userMiddleware};
