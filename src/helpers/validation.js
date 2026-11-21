const validator = require("validator");

const validateAddBusData = (req) => {
  const { bus_number, operator_name } = req.body;

  if (
    !bus_number ||
    !validator.isAlphanumeric(bus_number.replace(/[-\s]/g, ""))
  ) {
    throw new Error("Bus number is not valid");
  } else if (
    !operator_name ||
    !validator.isLength(operator_name, { min: 2, max: 100 })
  ) {
    throw new Error("Operator name is not valid");
  }
};

const validateStudent = (req) => {
  const { name, email, age } = req.body || {};

  // 1. Name validation
  if (
    typeof name !== "string" ||
    validator.isEmpty(name, { ignore_whitespace: true })
  ) {
    return "Valid student name is required";
  }
  if (!validator.isLength(name.trim(), { min: 1, max: 255 })) {
    return "Name cannot exceed 255 characters";
  }

  // 2. Email validation
  if (typeof email !== "string" || !validator.isEmail(email)) {
    return "Valid email address is required";
  }

  // 3. Age validation (validator requires strings, so convert age first)
  if (
    age === undefined ||
    age === null ||
    !validator.isInt(String(age), { min: 1, max: 150 })
  ) {
    return "Age must be an integer between 1 and 150";
  }

  return null;
};

const allowedEditStudents = (req) => {
  const allowedFields = ["name", "email"];

  const updates = Object.keys(req.body || {});

  const isValidField =
    updates.length > 0 &&
    updates.every((field) => allowedFields.includes(field));

  return isValidField;
};

// const allowedEditBus = (req) => {
//   const allowedFields = [
//     "bus_number",
//     "operator_name",
//     "bus_type",
//   ];

//   const updates = Object.keys(req.body);

//   const isValidField =
//     updates.length > 0 &&
//     updates.every((field) => allowedFields.includes(field));

//   return isValidField;
// };

module.exports = {
  validateAddBusData,
  //   allowedEditBus,
  validateStudent,
  allowedEditStudents,
};
