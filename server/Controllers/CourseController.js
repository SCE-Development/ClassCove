const { getDB } = require("../db/conn");

// Search by course code
// Takes school (ex: berkeley, deanza), subject (ex: POLI, MATH), and course ID (ex: 14, 15)
async function getCourses(req, res) {
    const db = await getDB();
    const courses = await db.collection(req.params.school).find().toArray();
    res.send(sortCourses(courses));
}

// Search by course code
// Takes school (ex: berkeley, deanza), subject (ex: POLI, MATH), and course ID (ex: 14, 15)
async function getByCode(req, res) {
    const db = await getDB();
    const courses = await db
        .collection(req.params.school)
        .find({
            "node.courseCodes.courseName": req.params.courseCode.toUpperCase(),
        })
        .toArray();
    res.send(sortCourses(courses));
}

async function getByProf(req, res) {
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

function sortCourses(courses) {
    let sortedCourses = courses;
    let i, key, j;
    for (i = 1; i < n; i++) {
        key = sortedCourses[i]["node"]["avgRating"];
        j = i - 1;

        while (j >= 0 && sortedCourses[j]["node"]["avgRating"] > key) {
            sortedCourses[j + 1]["node"]["avgRating"] =
                sortedCourses[j]["node"]["avgRating"];
            j = j - 1;
        }
        sortedCourses[j + 1]["node"]["avgRating"] = key;
    }
    return sortedCourses;
}

module.exports = { getCourses, getByCode, getByProf };
