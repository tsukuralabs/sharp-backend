const db = require("../config/db");
const {
  validateStudent,
  allowedEditStudents,
} = require("../helpers/validation");

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

module.exports = {
  addEntries,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
