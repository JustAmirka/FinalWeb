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
                newUser.password = newUser.encryptPassword(password);
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
exports.update = async (req, res) => {

    if (!req.body.newEmail || !req.body.newUsername ) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Data to update can not be empty!"})
        return
    }

    //const email = req.params.email;
    const query = req.body.oldEmail;

    //await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    await User.findOneAndUpdate({email: query}, {email:req.body.newEmail,
        username:req.body.newUsername
    }).then(data => {
        console.log(data)
        if (!data) {
            //res.status(404).send({message: `User not found.`});
            res.status(404).render('results', {mydata: `User not found.`})
        }else{
            //res.send({ message: "User updated successfully." })
            res.status(200).render('results', {mydata: "User updated successfully."})
        }
    }).catch(err => {
        //res.status(500).send({message: err.message});
        res.status(500).render('results', {mydata: err.message})
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {

    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    let useremail=req.body.email
    await User.deleteOne({email: useremail}).then(data => {
        //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        //console.log(data)
        if (data.deletedCount===0) {
            //res.status(404).send({ message: `User not found.`});
            res.status(404).render('results', {mydata: "User not found"})

        } else {
            //res.send({message: "User deleted successfully!"});

            res.status(200).render('results', {mydata: "user "+useremail+" deleted succesfully!"})
        }
    }).catch(err => {
        //res.status(500).send({ message: err.message });
        res.status(500).render('results', {mydata: err.message})
    });
};
