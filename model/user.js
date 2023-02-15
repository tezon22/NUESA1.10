const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema({
    /* username: {
         type: String,
         required: true,
         //unique: true
     },
     password: {
         type: String,
         required: true
     },*/
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

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
module.exports = User;