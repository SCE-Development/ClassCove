// Import 'MongoClient' class
const { MongoClient } = require("mongodb");

// Configure path to .env file
require("dotenv").config({ path: "./config.env" });

const url = process.env.DB_URI;

// Create MongoClient
const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

// Connects and confirms connection to the database
async function connectDB() {
    try {
        _db = mongoClient.db("ClassCove");
        await mongoClient.connect();
        _db = mongoClient.db("ClassCove");
        console.log("Successfully connected to MongoDB.");
    } catch (err) {
        console.error(err);
    }
}

async function getDB() {
    await connectDB();
    return await _db;
}

// Export functions
module.exports = {
    connectDB,
    getDB,
};
