const express = require("express");
const User = require("../models/User");
const UserSession = require("../models/UserSession");

const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const sessionController = require("../Controllers/SessionController");
const schoolController = require("../Controllers/SchoolController");

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

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// testing route to see user accounts
router.get("/users", async (req, res) => { 
    let db = await getDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
})

router.post("/sign-up", async (req, res, next) => {
    await sessionController.signUp(req, res, next);
});

router.post("/log-in", async function(req, res, next) { 
  await sessionController.login(req, res, next);
})

router.post("/isLoggedIn", async function(req, res, next) { 
  await sessionController.isLoggedIn(req, res, next);
})

router.post("/logout", async function(req, res, next) { 
    await sessionController.logout(req, res, next);
})

// Search by course code
// Takes school (ex: berkeley, deanza), subject (ex: POLI, MATH), and course ID (ex: 14, 15)
router.get("/:school/:subject/:courseId/", async (req, res, next) => {
    await schoolController.getCourse(req, res, next);
});

// Search by professor
// Takes school (ex: berkeley, deanza) and professor (ex: Michael%20Jordan)
router.get("/:school/:prof/", async (req, res, next) => {
    await schoolController.getProf(req, res, next);
});

module.exports = router;
