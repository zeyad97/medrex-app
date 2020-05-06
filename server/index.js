const express = require("express");
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google").Strategy;
const keys = require('../config')

//user
let user = {};

passport.serializeUser((user, cb) =>{
    cb(null,user);
});

passport.deserializeUser((user, cb) =>{
    cb(null,user);
});



//facebook strategy
passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackUrl: "auth/facebook/callback"
},
(accessToken,refreshToken,profile, cb) => {
    console.log(JSON.stringify(profile))
    user = { ...profile}
    return cb(null,profile)
}

))

const app = express();
app.use(cors());
app.use(passport.initialize());

app.get("/auth/facebook",passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
        passport.authenticate(("facebook"),
        (req,res) => {
            res.redirect("/profile");
        }));


const PORT = 5000;
app.listen(PORT);