const express = require("express");
const User = require("../models/User");
const UserSession = require("../models/UserSession");

const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const sessionController = require("../Controllers/SessionController");

// receive registration data as JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// 'router' is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests.
const router = express.Router();

const { getDB } = require("../db/conn");

// Search by course code
// Takes school (ex: berkeley, deanza), subject (ex: POLI, MATH), and course ID (ex: 14, 15)
router.get("/:school/:subject/:courseId/", async (req, res) => {
    const db = getDB();
    const courses = await db
        .collection(req.params.school + "courses")
        .find({
            course: (
                req.params["subject"] +
                " " +
                req.params["courseId"]
            ).toUpperCase(),
        })
        .toArray();
    res.send(courses);
});

router.get("/test2", async (req, res) => {
    const db = getDB();
    const test = await db.collection("TestCollection2").find().toArray();
    res.json(test);
});

module.exports = router;
