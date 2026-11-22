const express = require("express");
const {
  createDepartmentWithStudents,
  getAllDepartments,
} = require("../controllers/departmentControllers");

const router = express.Router();

router.post("/departments", createDepartmentWithStudents);
router.get("/departments", getAllDepartments);

module.exports = router;
