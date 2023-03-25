const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This will help us connect to the database
const { getDB } = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

router.get("/test", async (req, res) => {
    const db = getDB();
    const test = await db.collection("TestCollection").find().toArray();
    res.json(test);
});

router.get("/test2", async (req, res) => {
    const db = getDB();
    const test = await db.collection("TestCollection2").find().toArray();
    res.json(test);
});

module.exports = router;
