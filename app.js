// const http = require("http");
const express = require("express");

const mysql = require("mysql2");

const userRouter = require("./src/routes/userRoutes");
// const orderRouter = require('./src/routes/orderRoute');
// const categoriesRouter = require('./src/routes/categoriesRoute');
// const productRouter = require('./src/routes/productRoutes');
// const bookRouter = require('./src/routes/bookRoutes');
// const studentRouter = require('./src/routes/studentRoutes');
// const courseRouter = require('./src/routes/courseRoutes');
// const cartRouter = require('./src/routes/cartRoutes');

const loggingmiddleware = require("./src/middlewares/logging");

const path = require("path");

const app = express();

// creating an mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rohit@123",
  database: "test_db",
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("Connection has been created");

  const creationQuery = `
    CREATE TABLE Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE Buses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      busNumber VARCHAR(255) NOT NULL UNIQUE,
      totalSeats INT NOT NULL,
      availableSeats INT NOT NULL
    );

    CREATE TABLE Bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      seatNumber INT NOT NULL
    );

    CREATE TABLE Payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amountPaid DECIMAL(10, 2) NOT NULL,
      paymentStatus VARCHAR(50) NOT NULL
    );
    
  `;

  connection.query(creationQuery, (err, result) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    console.log('All tables created successfully');
  })

});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Serve Axios from node_modules
// app.use(
//   '/vendor/axios',
//   express.static(
//     path.join(__dirname, 'node_modules/axios/dist')
//   )
// );

app.use(express.static(path.join(__dirname, "public")));

app.use(loggingmiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Student & Course Portal API!");
});

app.use("/", userRouter);
// app.use('/', orderRouter);
// app.use('/', categoriesRouter);
// app.use('/', productRouter);
// app.use('/', bookRouter);
// app.use('/', studentRouter);
// app.use('/', courseRouter);
// app.use('/', cartRouter);

// app.all('/{*splat}', (req, res) => {
//   res.status(404).send('<h1>404 - Page Not Found</h1>');
// });

let port = 4000;
app.listen(port, () => {
  console.log(
    `Server is up and running on port ${port}! Ready to handle requests.`,
  );
});
