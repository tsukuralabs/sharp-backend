const validator = require("validator");

const validateAddBusData = (req) => {
  const { bus_number, operator_name } = req.body;

  if (!bus_number || !validator.isAlphanumeric(bus_number.replace(/[-\s]/g, ""))) {
    throw new Error("Bus number is not valid");
  } else if (!operator_name || !validator.isLength(operator_name, { min: 2, max: 100 })) {
    throw new Error("Operator name is not valid");
  }
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
  validateAddBusData
//   allowedEditBus,
};