const Student = require("./studentModels");
const IdentityCard = require("./identityCardModels");
const Department = require("./departmentModels");
const Course = require("./courseModels");

// One-to-One (Existing)
Student.hasOne(IdentityCard, { foreignKey: "StudentId", onDelete: "CASCADE" });
IdentityCard.belongsTo(Student, { foreignKey: "StudentId" });

// One-to-Many (One Department -> Many Students)
Department.hasMany(Student, {
  foreignKey: "DepartmentId",
  onDelete: "SET NULL",
});
Student.belongsTo(Department, {
  foreignKey: "DepartmentId",
});

// Many-to-Many
Student.belongsToMany(Course, {
  through: "StudentCourses",
});

Course.belongsToMany(Student, {
  through: "StudentCourses",
})


module.exports = {
  Student,
  IdentityCard,
  Department,
  Course,
};
