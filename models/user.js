const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const passportLocalMongoose=require('passport-local-mongoose')
const { Schema } = mongoose;
const passport=require('passport')


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')


let userSchema = new mongoose.Schema({
    username: String,

    email: String,
    password: String,
    googleId: String
});
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (candidatePassword) {
    if (this.password != null) {
        return bcrypt.compareSync(candidatePassword, this.password);
    } else {
        return false;
    }
};
let userModel = new mongoose.model("User", userSchema);


passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
})





passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/home"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        userModel.findOrCreate({ username: profile.displayName, googleId: profile.id },
            function (err, user) {
                return cb(err, user);
            });
    }));


module.exports = userModel;
