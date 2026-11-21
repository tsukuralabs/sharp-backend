
require("dotenv").config();

const app = require("./app");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");

        await sequelize.sync();
        console.log("Database synced successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
        await sequelize.close();
        process.exit(1);
    }
};

startServer();