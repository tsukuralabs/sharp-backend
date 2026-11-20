
const errResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        message,
        status: false,
    });
};

const sendResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        data,
        status: true,
    });
};

module.exports = { errResponse, sendResponse };

