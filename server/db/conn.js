const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });
const url = process.env.DB_URI;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

async function connectDB() {
    try {
        await client.connect();
        _db = client.db("ClassCove");
        console.log("Successfully connected to MongoDB.");
    } catch (err) {
        console.error(err);
    }
}

function getDB() {
    return _db;
}

module.exports = {
    connectDB,
    getDB,
};
