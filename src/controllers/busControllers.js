const db = require("../config/db");
const { validateAddBusData } = require("../helpers/validation");
const { errResponse, sendResponse } = require("../utils/commonResponse");

const getAllBus = (req, res) => {
  try {
    const getAllBusQuery = "SELECT * FROM Bus";

    db.execute(getAllBusQuery, (err, result) => {
      if (err) {
        console.log(err.message);
        return errResponse(res, "Failed to fetch buses", 500);
      }

      if (result.length === 0) {
        return sendResponse(res, []);
      }

      // console.log('bus result', res);
      return sendResponse(res, result);
    });
  } catch (error) {
    console.log(error.message);
    return errResponse(res, "Internal server error", 500);
  }
};

// Add Bus

const addBus = (req, res) => {
  try {
    // Validate bus data
    validateAddBusData(req);

    let { bus_number, operator_name, bus_type } = req.body;

    // Normalize input
    bus_number = bus_number.trim().toUpperCase();
    operator_name = operator_name.trim();
    bus_type = bus_type.trim();

    // Check if bus already exists
    const checkBusQuery = "SELECT bus_id FROM bus WHERE bus_number = ?";

    db.execute(checkBusQuery, [bus_number], (err, result) => {
      if (err) {
        console.log(err.message);
        return errResponse(res, "Failed to check bus", 500);
      }

      if (result.length > 0) {
        return errResponse(res, "Bus already exists", 409);
      }

      // Insert bus
      const addBusQuery = `
        INSERT INTO bus (bus_number, operator_name, bus_type)
        VALUES (?, ?, ?)
      `;

      db.execute(
        addBusQuery,
        [bus_number, operator_name, bus_type],
        (err, result) => {
          if (err) {
            console.log(err.message);

            if (err.code === "ER_DUP_ENTRY") {
              return errResponse(res, "Bus already exists", 409);
            }

            return errResponse(res, "Failed to add bus", 500);
          }

          console.log(`Bus ${bus_number} added successfully`);

          return sendResponse(
            res,
            {
              id: result.insertId,
              bus_number,
              operator_name,
              bus_type,
            },
            201,
          );
        },
      );
    });
  } catch (error) {
    console.log(error.message);
    return errResponse(res, error.message, 400);
  }
};

// Filter Buses using seat availability

const filterBus = (req, res) => {
  try {
    const { seats } = req.params;

    // Validate seats parameter
    if (!Number.isInteger(Number(seats)) || Number(seats) < 0) {
      return errResponse(res, "Invalid seat value", 400);
    }

    // SQL query
    const filterBusQuery = `
      SELECT *
      FROM Bus
      WHERE seats_available > ?
    `;

    db.execute(filterBusQuery, [Number(seats)], (err, result) => {
      if (err) {
        console.log(err.message);
        return errResponse(res, "Failed to filter buses", 500);
      }

      return sendResponse(res, result, 200);
    });
  } catch (error) {
    console.log(error.message);
    return errResponse(res, error.message, 400);
  }
};

module.exports = {
  addBus,
  getAllBus,
  filterBus,
};
