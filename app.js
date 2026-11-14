// const http = require("http");
const express = require('express');

const app = express();

// const routes = require('./routes');

// routes.testFunction();
// const server = http.createServer(routes.handler)

let port = 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}! Ready to handle requests.`);
});
