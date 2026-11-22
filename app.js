const express = require("express");

const userRouter = require("./src/routes/userRoutes");
const studentRouter = require("./src/routes/studentRoutes");
const departmentRouter = require("./src/routes/departmentRoutes");
// const busRouter = require("./src/routes/busRoutes");

// models
require('./src/models');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

app.use("/", userRouter);
app.use("/", studentRouter);
app.use("/", departmentRouter)
// app.use("/", busRouter);

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

module.exports = app;