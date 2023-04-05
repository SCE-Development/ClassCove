const express = require("express");

const app = express();
const sessionController = require("../Controllers/SessionController");

// receive registration data as JSON
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// 'userRouter' is an instance of the express userRouter.
// We use it to define our routes.
// The userRouter will be added as a middleware and will take control of requests.
const userRouter = express.Router();

const { getDB } = require("../db/conn");

// testing route to see user accounts
userRouter.get("/users", async (req, res) => {
    let db = await getDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
});

userRouter.post("/user/sign-up", async (req, res, next) => {
    await sessionController.signUp(req, res, next);
});

userRouter.post("/user/log-in", async function (req, res, next) {
    await sessionController.login(req, res, next);
});

userRouter.post("/user/isLoggedIn", async function (req, res, next) {
    await sessionController.isLoggedIn(req, res, next);
});

userRouter.post("/user/logout", async function (req, res, next) {
    await sessionController.logout(req, res, next);
});

userRouter.post("/user/addCourse", async (req, res) => {
    await sessionController.addCourse(req, res);
});

userRouter.post("/user/dropCourse", async (req, res) => {
    await sessionController.dropCourse(req, res);
});

module.exports = userRouter;
