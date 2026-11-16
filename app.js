// const http = require("http");
const express = require('express');
const userRouter = require('./src/routes/userRoutes');
// const orderRouter = require('./src/routes/orderRoute');
// const categoriesRouter = require('./src/routes/categoriesRoute');
const productRouter = require('./src/routes/productRoutes');
// const bookRouter = require('./src/routes/bookRoutes');
// const studentRouter = require('./src/routes/studentRoutes');
// const courseRouter = require('./src/routes/courseRoutes');
const cartRouter = require('./src/routes/cartRoutes');

const loggingmiddleware = require('./src/middlewares/logging');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingmiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Student & Course Portal API!');
});

app.use('/', userRouter);
// app.use('/', orderRouter);
// app.use('/', categoriesRouter);
app.use('/', productRouter);
// app.use('/', bookRouter);
// app.use('/', studentRouter);
// app.use('/', courseRouter);
app.use('/', cartRouter);


app.all('/{*splat}', (req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

let port = 4000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}! Ready to handle requests.`);
});
