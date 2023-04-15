const express = require("express");

// 'courseRouter' is an instance of the express courseRouter.
// We use it to define our routes.
// The courseRouter will be added as a middleware and will take control of requests.
const courseRouter = express.Router();

const { getDB } = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const courseController = require("../Controllers/CourseController");

// Search by school
// EX: localhost:6969/courses/berkeley
courseRouter.get("/courses/:school", async (req, res) => {
    const db = await getDB();
    const courses = await db.collection(req.params.school).find().toArray();
    res.send(courses);
});

// Search by professor
// Returns professor info and all courses taught by the professor
// EX: localhost:6969/courses/berkeley/professors/John%20Doe
courseRouter.get(
    "/courses/:school/professors/:firstName/:lastName/",
    async (req, res) => {
        await courseController.getByProf(req, res);
    }
);

// Search by course code
// Returns all professors that teach the course
// EX: localhost:6969/courses/berkeley/CS100
courseRouter.get("/courses/:school/:courseCode/", async (req, res) => {
    await courseController.getCourse(req, res);
});

module.exports = courseRouter;
