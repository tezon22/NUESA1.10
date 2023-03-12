require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const authenticate = require("./authenticate");
//const passportLocalMongoose = require("passport-local-mongoose");
//const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const findOrCreate = require("mongoose-findorcreate");
const PORT = 3000;
const userRouter = require("./routes/users")
const uploadRoute = require("./routes/uploadRoutes")

const app = express();

//INITIALIZE
app.use(logger("dev"));
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    name: "session-id",
    secret: "Thisisourlittlesecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("./users", userRouter);
app.use("/upload", uploadRoute)

//CONNECTIONS
mongoose.set('strictQuery', true);
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

//userSchema.plugin(passportLocalMongoose);
//userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

//CONFIGURATION
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


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
));*/



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
    }
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
                res.json({success: true, status: "Registration Successful"});
            })
        }
    })
});

app.post("/login", (req, res) => {
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
});*/


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});