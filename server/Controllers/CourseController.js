const { getDB } = require("../db/conn");

// Search by course code
// Takes school (ex: berkeley, deanza), subject (ex: POLI, MATH), and course ID (ex: 14, 15)
async function getCourse(req, res, next) {
    const db = await getDB();
    const courses = await db
        .collection(req.params.school)
        .find({
            "node.courseCodes.courseName": req.params.courseCode.toUpperCase(),
        })
        .toArray();
    res.send(courses);
}

async function getByProf(req, res, next) {
    const db = await getDB();
    const courses = await db
        .collection(req.params.school)
        .find({
            "node.firstName": req.params.firstName,
            "node.lastName": req.params.lastName,
        })
        .toArray();
    res.send(courses);
}

module.exports = { getCourse, getByProf };
