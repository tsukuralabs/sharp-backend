const { DataTypes } = require("sequelize");
// why import it --> bcz we have to add the model to our sequelize db
const sequelize = require("../config/db");

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name is required",
      },
      notEmpty: {
        msg: "Name cannot be empty",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Email already exists",
    },
    validate: {
      notNull: {
        msg: "Email is required",
      },
      notEmpty: {
        msg: "Email cannot be empty",
      },
      isEmail: {
        msg: "Please provide a valid email address",
      },
    },
  },
});

module.exports = User;
