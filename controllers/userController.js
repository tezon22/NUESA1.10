const User = require("../model/user");
const passport = require("passport");

exports.register = (req, res) => {
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
                res.json({success: true, message: "Registration Successful"});
                //res.redirect("/secrets");
            })
        }
    });
}

exports.login = (req, res, next) => {
    /*const user = {
        username: req.body.username,
        password: req.body.password
    };

    req.login(user, function (err) {
        if(err) {
            res.statusCode = 500;
           res.json({ err: err.message});
           //res.redirect("/register");
        }else {
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, message: "You are successfully logged in" });
              //res.send("AUTHENTICATED USER SIGNED IN");
              //res.redirect("/secrets");
            });
        }
    });*/
    passport.authenticate("local", (err, user, info) => {
        if(err){
            res.statusCode = 500;
            res.json({ err: err.message});
            return next(err);
        }
        if(!user){
            res.statusCode = 404;
            res.json({status: false, error: info.message})
            //res.redirect("/register")
        }
        
        req.login(user, (err) => {
            if(err) { return next(err);}
            res.json({status: true, message: "Login successful"})
            //return res.redirect("/register");
        });
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logOut((err) => {
        if(err){
            res.statusCode = 500;
            res.json({err: err});
        }else{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            //res.send("AUTHENTICATED");
            res.json({success: true, message: "Logout Successful"});
        }
    });
}

exports.googleLogin = (req, res) => {
    passport.authenticate("google", {scope: ["profile"]});
}

exports.googleLoginHome = (req, res) => {
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
       //Successful authentication, redirect home.
       res.send("google auth");
    }
}