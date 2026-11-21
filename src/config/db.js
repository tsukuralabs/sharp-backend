require("dotenv").config();
const { Sequelize } = require("sequelize");

const database = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePwd = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, databaseUser, databasePwd, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
});

module.exports = sequelize;
