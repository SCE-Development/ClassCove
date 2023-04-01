// Configures path to retrieve 'PORT' from .env file
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT;

// Retrieves express() and connectDB() functions
const express = require("express");
const { connectDB } = require("./db/conn");

// Creates the express application and sets app to use dependencies
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require("./routes/router"));

// Connects to Mongo
connectDB();

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});

// authentication 
const path = require("path");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// make app use authentication from passportJS
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// use local strategy: authentication with username and password
passport.use(
    new LocalStrategy(async(username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        };
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
)

// these functions let users stay logged in on every page 
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    };
});
