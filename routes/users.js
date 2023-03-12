const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("../models/user")

const router = express.Router();
router.use(bodyParser.json());


router.get("/", (req, res) => {
    res.send("Users needed")
});

router.get("/auth/google", (req,res) => {
    passport.authenticate("google", {scope: ["profile"]});
});

//correct the callback
router.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("google auth");
});

router.get("/logout", (req, res) => {
    if(req.isAuthenticated){
        req.logout((err) => {
            if(err){
                res.statusCode = 500;
                res.json({err: err});
            }else{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //res.send("AUTHENTICATED");
                res.json({success: true, status: "Logout Successful"});
            }
        });
    }else{
        const err = new Error("You must be logged in");
        err.statusCode = 403;
        res.json({err: err});
    }
});

router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.register(new User({username: username}), password, (err, user) => {
        if(err){
            res.statusCode = 500;
            res.json({err: err});
            req.send("try again");
            //res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, () => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //res.send("AUTHENTICATED");
                res.json({success: true, status: "Registration Successful"});
            });
        }
    });
});

router.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if(err) {
           res.json({ err: err });
        }else {
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, status: "You are successfully logged in" });
              //res.send("AUTHENTICATED USER SIGNED IN");
              //res.redirect("/secrets");
            });
        }
    });
});

module.exports = router;