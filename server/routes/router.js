const express = require("express");

// 'router' is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests.
const router = express.Router();

// This will help us connect to the database
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

// Search by professor
// Takes school (ex: berkeley, deanza) and professor (ex: Michael%20Jordan)
router.get("/:school/:prof/", async (req, res) => {
    const db = getDB();
    const courses = await db
        .collection(req.params.school + "courses")
        .find({
            prof: req.params["prof"],
        })
        .toArray();
    res.send(courses);
});

module.exports = router;
