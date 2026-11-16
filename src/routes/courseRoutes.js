const express = require("express");
const booksRouter = express.Router();

// courses dummy data
const courses = [
  { id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },
  { id: 2, name: "Backend", description: "Node.js, Express, MongoDB" },
];

// GET courses
booksRouter.get("/courses", (req, res) => {
  try {
    const courseNames = courses.map(({ name }) => name);

    console.log("dataaaa: ", courseNames);

    return res.status(200).json({
      success: true,
      message: `Courses: ${courseNames.join(", ")}`,
      data: courseNames,
    });
  } catch (err) {
    console.log("Error fetching courses:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET courses/;id
booksRouter.get("/courses/:courseId", (req, res) => {
  try {
    const courseId = Number(req.params.courseId);

    console.log("courseId:", courseId);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = courses.find(({ id }) => id === courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Course: ${course.name}, Description: ${course.description}`,
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


module.exports = booksRouter;