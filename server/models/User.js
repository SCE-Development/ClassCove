const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        courses: { type: Array, required: true, unique: false },
    })
);

module.exports = User;
