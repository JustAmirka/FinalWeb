const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');





passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    "local.signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                if (user) {
                    return done(null, false, { message: "Email already exists" });
                }
                if (password != req.body.password2) {
                    return done(null, false, { message: "Passwords must match" });
                }
                const newUser = await new User();
                newUser.email = email;
                newUser.password = bcrypt.hashSync(password);
                newUser.username = req.body.name;
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                console.log(error);
                return done(error);
            }
        }
    )
);

passport.use(
    "local.signin",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: false,
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: "User doesn't exist" });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: "Wrong password" });
                }
                return done(null, user);
            } catch (error) {
                console.log(error);
                return done(error);
            }
        }
    )
);
exports.authGoogle = async (req, res) => {
    console.log("asd")
    passport.authenticate('google', {scope: ["profile"]})
};
