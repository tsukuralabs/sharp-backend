// const http = require("http");
const express = require('express');
const userRouter = require('./src/routes/userRoute');
const orderRouter = require('./src/routes/orderRoute');
const categoriesRouter = require('./src/routes/categoriesRoute');
const productRouter = require('./src/routes/productRoute');
const bookRouter = require('./src/routes/bookRoutes');

const loggingmiddleware = require('./src/middlewares/logging');

const app = express();

app.use(loggingmiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to express server');
});

app.use('/', userRouter);
app.use('/', orderRouter);
app.use('/', categoriesRouter);
app.use('/', productRouter);
app.use('/', bookRouter);

// const routes = require('./routes');

// routes.testFunction();
// const server = http.createServer(routes.handler)

app.all('/{*splat}', (req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

let port = 4000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}! Ready to handle requests.`);
});
