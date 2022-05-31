require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const Category = require("./models/category");
var MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");

swaggerDocument = require('./swagger.json');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const  User = require("./models/user");
const  LocalStrategy = require("passport-local");

const methodOverride = require('method-override')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');


const app = express();
require("./config/passport");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const dbConfig = require('./config/db.js');
// mongodb configuration
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride('_method'))
// admin route
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: 'hello',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        }),
        //session expires after 3 hours
        cookie: { maxAge: 60 * 1000 * 60 * 3 },
    })
);



app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

app.get("/profile", function(req, res){
    if(req.isAuthenticated()){
        res.render("profile")
    }else{
        res.redirect("/signin")
    }
});
// global variables across routes
app.use(async (req, res, next) => {
    try {
        res.locals.login = req.isAuthenticated();
        res.locals.session = req.session;
        res.locals.currentUser = req.user;
        const categories = await Category.find({}).sort({ title: 1 }).exec();
        res.locals.categories = categories;
        next();
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});
app.get('/auth/google',passport.authenticate('google',{

    scope:['profile','email']
}));

app.get('/auth/google/home',
    passport.authenticate('google', { failureRedirect: '/user/signin' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/user/profile');
    });
//

app.get("/logout",function (req, res){
    req.logout()
    res.redirect("/")
})
// add breadcrumbs
get_breadcrumbs = function (url) {
    var rtn = [{ name: "Home", url: "/" }],
        acc = "", // accumulative url
        arr = url.substring(1).split("/");

    for (i = 0; i < arr.length; i++) {
        acc = i !== arr.length - 1 ? acc + "/" + arr[i] : null;
        rtn[i + 1] = {
            name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
            url: acc,
        };
    }
    return rtn;
};
app.use(function (req, res, next) {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);
    next();
});

//routes config
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/user");
const pagesRouter = require("./routes/pages");
app.use("/products", productsRouter);
app.use("/user", usersRouter);
app.use("/pages", pagesRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});







app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
