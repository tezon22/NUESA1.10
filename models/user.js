const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
module.exports = mongoose.model("user", userSchema);