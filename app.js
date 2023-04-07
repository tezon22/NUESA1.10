require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
//const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const findOrCreate = require("mongoose-findorcreate");
//const { request } = require("http");
const PORT = 3000;

//ROUTES
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/postRouter");
const commentRoutes = require("./routes/commentRouter");
const resetRoutes = require("./routes/resetPasswordRouter");


const app = express();

//MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "Thisisourlittlesecret",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


//ROUTES
app.use("", userRoutes);
app.use("", postRoutes);
app.use("/posts", commentRoutes);
app.use("", resetRoutes);

//Unhandled routes
app.all("*", (req,res) => {
    res.status(404).send("Sorry, the requested route was not found");
});


//MONGODB CONNECTION
mongoose.set("strictQuery", true);
const url = "mongodb://127.0.0.1:27017/userDB";
const connect = mongoose.connect(url, {useNewUrlParser: true});
connect
.then(() => {
    console.log("connected to db succesfully");
})
.catch((err) => {
    console.log(err.message);
});

/*const userSchema = new mongoose.Schema({
    /* username: {
         type: String,
         required: true,
         //unique: true
     },
     password: {
         type: String,
         required: true
     },
     admin: {
         type: Boolean,
         default: false
     },
     googleId: {
         type: String
     }
 }, {
     timestamps: true
});
 
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
 
const User = new mongoose.model("User", userSchema);*/

//CONFIGURATION
//passport.use(User.createStrategy());


/*passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});*/


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/nuesa",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
   function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


//ROUTES
/*app.get("/", (req, res,) => {
    res.send("Users needed")
});

app.get("/auth/google", (req,res) => {
    passport.authenticate("google", {scope: ["profile"]});
});

//correct the callback
app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("google auth");
});

app.get("/logout", (req, res) => {
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
});

app.post("/register", (req, res) => {
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
    })
});

app.post("/login", (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if(err) {
           res.json({ err: err });
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
    });
    /*passport.authenticate("local", (err, user, info) => {
        if(err){
            return next(err);
        }
        if(!user){
            res.json({error: info.message})
            res.redirect("/register")
        }
        
        req.login(user, (err) => {
            if(err) { return next(err);}
            //return res.redirect("/register");
        });
    })(req, res, next);
});*/


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});