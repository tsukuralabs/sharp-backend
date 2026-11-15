// const http = require("http");
const express = require('express');
const userRouter = require('./src/routes/userRoute');
const orderRouter = require('./src/routes/orderRoute');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to express server');
});

app.use('/', userRouter);
app.use('/', orderRouter);

// const routes = require('./routes');

// routes.testFunction();
// const server = http.createServer(routes.handler)

let port = 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}! Ready to handle requests.`);
});
