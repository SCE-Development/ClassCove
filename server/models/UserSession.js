const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSession = mongoose.model(
    "UserSession", new Schema({
    UserId: { type: String, required: true},
    session: { type: String, required: true}
    })
);

module.exports = UserSession;