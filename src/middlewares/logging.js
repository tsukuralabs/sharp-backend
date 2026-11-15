
const loggingmiddleware = (req, res, next) => {

    console.log(`${req.method} is made to ${req.url}`);
    next();
}

module.exports = loggingmiddleware;