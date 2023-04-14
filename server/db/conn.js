// Import 'mongoose' module
const mongoose = require("mongoose");

// Configure path to .env file
require("dotenv").config({ path: "./config.env" });

const url = `${process.env.DB_URI}/ClassCove`;

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Confirm connection to the database
async function connectDB() {
    try {
        await db.once("open", () => {
            console.log("Successfully connected to MongoDB.");
        });
    } catch (err) {
        console.error(err);
    }
}

// Return the database connection object
async function getDB() {
    await connectDB();
    return db;
}

// Export functions
module.exports = {
    connectDB,
    getDB,
};
