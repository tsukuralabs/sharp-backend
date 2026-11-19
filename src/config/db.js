
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'Rohit@123',
    database: "test_db"
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Database connected successfully!");
});

module.exports = connection;
