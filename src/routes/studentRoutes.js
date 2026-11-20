const express = require("express");
const studentController = require('../controllers/studentControllers');
const studentRouter = express.Router();

// const students = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
// ];

studentRouter.post("/students/add", studentController.addEntries);

studentRouter.patch("/students/update/:id", studentController.updateStudents);

studentRouter.get("/students/:id", studentController.getStudentById);

studentRouter.delete("/students/delete/:id", studentController.deleteStudent);

// studentRouter.get("/students", (req, res) => {
//   try {
//     const studentNames = students.map(({ name }) => name);

//     return res.status(200).json({
//       success: true,
//       message: `Students: ${studentNames.join(", ")}`,
//       data: studentNames,
//     });
//   } catch (err) {
//     console.log("Error fetching student:", err);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server error",
//     });
//   }
// });

// studentRouter.get("/students/:studentId", (req, res) => {
//   try {
//     const studentId = Number(req.params.studentId);

//     if (!Number.isInteger(studentId) || studentId <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid student ID",
//       });
//     }

//     const student = students.find(({ id }) => id === studentId);

//     // Check if student exists
//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Student: ${student.name}`,
//       data: student,
//     });
//   } catch (err) {
//     console.log("Error fetching student by id:", err);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });


module.exports = studentRouter;

