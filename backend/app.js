require("dotenv").config()
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const passport = require('passport')
const cors = require("cors");
const { connectMongoDB } = require('./connection');
const googleRouter = require('./controller/google-auth')
const facebookRouter = require('./controller/facebook-auth')
const githubRouter = require('./controller/github-auth')
const staticRouter = require('./routes/staticRoutes');
const ControlRouter = require('./routes/auth');
const app = express();

app.set("view engine", "ejs");
app.set("veiws", path.resolve("./views"));

//mongoDB connection
connectMongoDB(process.env.MONGODBURI)
    .then(
        console.log('MongoDB database is connected')
    )
    .catch(
        (error) => {
            console.log(`MongoDB error:`, error);
        }
    )

//middleware
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
})
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.use('/', staticRouter);
app.use('/', ControlRouter);
app.use('/', googleRouter);
app.use('/', facebookRouter);
app.use('/', githubRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})