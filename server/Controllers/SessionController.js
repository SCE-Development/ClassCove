const express = require("express");
const User = require("../models/User");
const UserSession = require("../models/UserSession");

const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { getDB } = require("../db/conn"); 

async function signUp(req, res, next) { 
    // define user schema
    await mongoose.connect('mongodb://localhost:27017/ClassCove');
    await console.log(req.body); 
    console.log('signup')

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const user = new User({
        username: req.body.username,
        password: hashedPassword
        });

        const result = await user.save();

    } catch(err) {
        return next(err);
    };
}
 
async function login(req, res, next) { 
    await mongoose.connect('mongodb://localhost:27017/ClassCove');
    let db = await getDB(); 

    console.log("body name: " + req.body.username); 

    let userData = await db.collection("users").findOne({ 
      username: req.body.username
    })
    
    if (!userData) { 
        res.send("no user with that login"); 
        console.log("not logging in")
        return;
    }

    // user successfully logged in
    if (await bcrypt.compare(req.body.password, userData.password)) { 
        console.log('logged in');

        let cookieValue = await bcrypt.hash("keyword", 10); 
        console.log("user id: " + userData._id);
        res.cookie("loginToken", cookieValue).send({ user: userData, cookie: cookieValue, success: true });

        let session = new UserSession({ 
          UserId: userData._id,
          session: cookieValue
        })

        await session.save();
    } else { 
        res.send( {user: false, success: false} )
        console.log("wrong pw");
    }
}

async function isLoggedIn(req, res, next) { 
    let db = await getDB();
    await mongoose.connect('mongodb://localhost:27017/ClassCove');
  
    if (UserSession.exists({session: req.body.session})) {
      console.log(req.body.session);
  
      let session = await db.collection("usersessions").findOne({session: req.body.session}); 
      let sessionID = session.UserId;
  
      let user = await User.findById(sessionID); 
    
      console.log(sessionID);
      console.log("user: " + user.username);
  
      res.send({success: true, userName: user.username});
      return;
    }
    
    res.send({success: false}); 
}

module.exports = {signUp, login, isLoggedIn};