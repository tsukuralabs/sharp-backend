require("dotenv").config();

const app = require("./app");
const connection = require("./src/config/db");
const createTables = require("./src/database/databaseTables");

const PORT = process.env.PORT || 4000;

connection.connect(async (err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }

    console.log("Database connected successfully!");

    try {
        await createTables(connection);

        console.log("Database initialized successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);

        connection.end(() => {
            process.exit(1);
        });
    }
});