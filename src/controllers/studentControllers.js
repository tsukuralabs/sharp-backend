const db = require("../config/db");
const {
  validateStudent,
  allowedEditStudents,
} = require("../helpers/validation");
const { Student, IdentityCard, Course } = require("../models");

// POST /students
const addEntries = (req, res) => {
  const validationError = validateStudent(req);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { email, name, age } = req.body;
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const cleanAge = Number(age);

  console.log("cleanName", cleanName);
  console.log("name", name);

  const checkEmailQuery = "SELECT id FROM Students WHERE email = ? LIMIT 1";

  db.execute(checkEmailQuery, [cleanEmail], (checkErr, rows) => {
    if (checkErr) {
      console.log(checkErr.message);
      return res.status(500).json({ error: checkErr.message });
    }

    if (rows.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const insertQuery =
      "INSERT INTO Students (email, name, age) VALUES (?, ?, ?)";

    db.execute(
      insertQuery,
      [cleanEmail, cleanName, cleanAge],
      (insertErr, result) => {
        if (insertErr) {
          if (insertErr.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Email already exists" });
          }
          console.log(insertErr.message);
          return res.status(500).json({ error: insertErr.message });
        }

        console.log("Value has been inserted");
        return res.status(201).json({
          message: `Student ${cleanName} successfully added`,
          id: result.insertId,
        });
      },
    );
  });
};

// GET /students
const getAllStudents = (req, res) => {
  const getAllQuery = "SELECT * FROM Students";

  db.execute(getAllQuery, (err, results) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(results);
  });
};

// GET /students/:id
const getStudentById = (req, res) => {
  const { id } = req.params;

  const getQuery = "SELECT * FROM Students WHERE id = ?";

  db.execute(getQuery, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json(result[0]);
  });
};

// PUT /students/:id
const updateStudent = (req, res) => {
  const { id } = req.params;

  if (!allowedEditStudents(req)) {
    return res.status(400).json({
      error: "Invalid fields. Only name and email can be updated",
    });
  }

  const { name, email, age } = req.body;
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const cleanAge = Number(age);

  const checkEmailQuery =
    "SELECT id FROM Students WHERE email = ? AND id != ? LIMIT 1";

  db.execute(checkEmailQuery, [cleanEmail, id], (checkErr, rows) => {
    if (checkErr) {
      console.log(checkErr.message);
      return res.status(500).json({ error: checkErr.message });
    }

    if (rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Email already in use by another student" });
    }

    const updateQuery = "UPDATE Students SET name = ?, email = ? WHERE id = ?";

    db.execute(updateQuery, [cleanName, cleanEmail, id], (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.status(200).json({
        message: `Student ${cleanName} successfully updated`,
      });
    });
  });
};

// DELETE /students/:id
const deleteStudent = (req, res) => {
  const { id } = req.params;

  const deleteQuery = "DELETE FROM Students WHERE id = ?";

  db.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Student with ID ${id} successfully deleted`,
    });
  });
};

const addingValuesToStudentsAndIdentityTable = async (req, res) => {
  try {
    const studentData = req.body.student;
    // Supports both "identityCard" and "IdentityCard" in the JSON body
    const cardData = req.body.identityCard || req.body.IdentityCard;

    if (!studentData || !cardData) {
      return res.status(400).json({
        error: "Both 'student' and 'identityCard' objects are required",
      });
    }

    const student = await Student.create(studentData);
    const idCard = await IdentityCard.create({
      ...cardData,
      StudentId: student.id,
    });

    return res.status(201).json({
      student,
      idCard,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Enroll student in multiple courses
const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseIds } = req.body;

    // Find student
    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Find courses
    const courses = await Course.findAll({
      where: {
        id: courseIds,
      },
    });

    if (courses.length !== courseIds.length) {
      return res.status(404).json({
        message: "One or more courses not found",
      });
    }

    // Enroll student in courses
    await student.addCourses(courses);

    return res.status(200).json({
      message: "Student enrolled successfully",
      student,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all courses of a student
const getStudentCourses = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const courses = await student.getCourses();

    return res.status(200).json({
      student: student.name,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addEntries,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  addingValuesToStudentsAndIdentityTable,
  enrollStudent,
  getStudentCourses,
};
