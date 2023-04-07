const User = require("../model/user");
const passport = require("passport");

exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;

    //Register a new user using the local strategy
    //Passportjs requires 3 objects, the first and second are the user details while the third is the callback function
    //if the user has another identifier, enclose them in an object paranthesis
    User.register(new User({username: username, firstName}), password, (err) => {
        if(err) {
            res.statusCode = 500;
            //res.send("try again");
            res.json({err: err.message});
        } 
        else{
            passport.authenticate("local")(req, res, () => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({success: true, message: "Registration Successful"});
                res.redirect("/login");
            })
        }
    });
}

exports.login = (req, res, next) => {
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

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({users});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        const user = await User.deleteMany();
        if (!user) {
          return res.status(404).send();
        }
        res.send("Users deleted");
    } catch (error) {
        res.status(500).send(error);
    }
}

/////////////////SPECIFIC USERS////////////////////////////////
exports.getUser = async (req, res) => {
    try {
        //Find the user by its given ID
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).send();
        }
        res.send({user});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        //Find and delete a user by its given ID
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).send();
        }
        res.send("User deleted");
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.promoteUser = async (req, res, next) => {
    try {
        const currentUser = req.user;
        const targetUser = await User.findById(req.params.userId);

        //check if the current user is a superuser
        if(currentUser.role !== "superuser") {
            return res.status(403).send("Only superusers can promote users");
        }

        //update the target user's role to an admin user
        targetUser.role = "admin";

        await targetUser.save();

        res.send("User promoted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}