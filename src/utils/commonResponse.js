const errResponse = (req, res) => {
  let statusCode = errResponse.statusCode;
  let message = errResponse.message;

  return res.status(statusCode).json({
    message: message,
    status: false,
  });
};

const sendResponse = (res, data, statusCode) => {
  return res.status(statusCode).json({
    data: data,
    status: true,
  });
};

module.exports = { errResponse, sendResponse };
