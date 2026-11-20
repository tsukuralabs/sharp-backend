// require("dotenv").config();

// const express = require("express");

// const userRouter = require("./src/routes/userRoutes");
// // const orderRouter = require("./src/routes/orderRoute");
// // const categoriesRouter = require("./src/routes/categoriesRoute");
// // const productRouter = require("./src/routes/productRoutes");
// // const bookRouter = require("./src/routes/bookRoutes");
// const studentRouter = require("./src/routes/studentRoutes");
// // const courseRouter = require("./src/routes/courseRoutes");
// // const cartRouter = require("./src/routes/cartRoutes");

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => {
//     res.send("Welcome to the Student & Course Portal API!");
// });

// app.use("/", userRouter);

// // app.use("/", orderRouter);
// // app.use("/", categoriesRouter);
// // app.use("/", productRouter);
// // app.use("/", bookRouter);
// app.use("/", studentRouter);
// // app.use("/", courseRouter);
// // app.use("/", cartRouter);

// // 404 handler
// app.use((req, res) => {
//     res.status(404).send("404 - Page Not Found");
// });

// // Start server
// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//     console.log(
//         `Server is up and running on port ${PORT}! Ready to handle requests.`
//     );
// });





const express = require("express");

const userRouter = require("./src/routes/userRoutes");
const studentRouter = require("./src/routes/studentRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

app.use("/", userRouter);
app.use("/", studentRouter);

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

module.exports = app;