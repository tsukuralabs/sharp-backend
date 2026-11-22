const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const IdentityCard = sequelize.define(
  "identityCard",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
    cardNo: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "identityCards",
    timestamps: true,
  },
);

module.exports = IdentityCard;
