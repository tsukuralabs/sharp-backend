const express = require("express");
const studentController = require('../controllers/studentControllers');
const studentRouter = express.Router();

studentRouter.post("/students", studentController.addEntries);

studentRouter.get("/students", studentController.getAllStudents);

studentRouter.put("/students/:id", studentController.updateStudent);

studentRouter.get("/students/:id", studentController.getStudentById);

studentRouter.delete("/students/delete/:id", studentController.deleteStudent);

studentRouter.post("/addingStudentWithCard", studentController.addingValuesToStudentsAndIdentityTable);

module.exports = studentRouter;

