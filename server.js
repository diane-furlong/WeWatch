//dotenv for hiding api key
require ("dotenv").config()
const fetch = require("node-fetch");
const convert = require("xml-js");

const express = require("express"); //express
const mongoose = require("mongoose"); //server
const bodyParser = require("body-parser"); //express
const passport = require("passport");
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const users = require("./routes/api/users"); //routes-express 
const app = express(); //express


// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// Bodyparser middleware- parse body params and attach them to req.body
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({ 
    secret: 'schfifty five', 
    resave: false ,
    saveUninitialized: false
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport config
// require("./config/passport")(passport);

//Routes
app.use("/api/users", users);

// DB Config
const db = process.env.MONGODB_URI || 'mongodb://localhost/wewatch5000'; //server
// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
    }

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
const port = process.env.PORT || 3001; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running (Hurray!) on port ${port} !`));

