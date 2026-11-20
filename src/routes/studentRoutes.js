const express = require("express");
const studentController = require('../controllers/studentControllers');
const studentRouter = express.Router();

studentRouter.post("/students/add", studentController.addEntries);

studentRouter.patch("/students/update/:id", studentController.updateStudents);

studentRouter.get("/students/:id", studentController.getStudentById);

studentRouter.delete("/students/delete/:id", studentController.deleteStudent);

module.exports = studentRouter;

