const sequelize = require("../config/db");
const { Department, Student } = require("../models");

// 1. Create a Department and attach multiple Students at once
const createDepartmentWithStudents = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { name, students } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      await t.rollback();
      return res.status(400).json({ error: "Department name is required" });
    }

    if (!Array.isArray(students) || students.length === 0) {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "At least one student is required in the students array" });
    }

    const department = await Department.create(
      {
        name: name.trim(),
        Students: students,
      },
      {
        include: [Student],
        transaction: t,
      }
    );

    await t.commit();

    return res.status(201).json({
      message: "Department and students created successfully",
      department,
    });
  } catch (error) {
    await t.rollback();

    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      return res.status(400).json({
        error: error.errors?.[0]?.message || error.message,
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

// 2. Fetch all Departments with all their Students (One-to-Many Read)
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [
        {
          model: Student,
        },
      ],
    });

    return res.status(200).json({ departments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDepartmentWithStudents,
  getAllDepartments,
};
