
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { getDB } = require("../db/conn"); 

// Search by course code
// Takes school (ex: berkeley, deanza), subject (ex: POLI, MATH), and course ID (ex: 14, 15) 
async function getCourse(req, res, next) { 
    const db = await getDB();
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
}

async function getProf(req, res, next) { 
    const db = await getDB();
    const courses = await db
        .collection(req.params.school + "courses")
        .find({
            prof: req.params["prof"],
        })
        .toArray();
    res.send(courses);
}

module.exports = {getCourse, getProf}