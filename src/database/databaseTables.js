
const createTables = async (connection) => {
    const queries = [
        `
        CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS Students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS Bus (
            id INT AUTO_INCREMENT PRIMARY KEY,
            busNumber VARCHAR(255) NOT NULL UNIQUE,
            totalSeats INT NOT NULL,
            availableSeats INT NOT NULL
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS Bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            seatNumber INT NOT NULL
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS Payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amountPaid DECIMAL(10, 2) NOT NULL,
            paymentStatus VARCHAR(50) NOT NULL
        )
        `
    ];

    try {
        for (const query of queries) {
            await connection.promise().query(query);
        }

        console.log("All database tables created successfully!");
    } catch (error) {
        console.error("Error creating database tables:", error);
        throw error;
    }
};

module.exports = createTables;
