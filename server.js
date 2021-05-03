//dotenv for hiding api key
require ("dotenv").config()
const fetch = require("node-fetch");
const convert = require("xml-js");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet")
const passport = require("passport");

const users = require("./routes/api/users");
// const routes = require("./routes");
const app = express();


// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(helmet())

// DB Config
const db = require("./config/keys2").mongoURI;
// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport midleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", users); // no srue if this needs to be deleted below may be the correct path


const port = process.env.PORT || 3001; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running (Hurray!) on port ${port} !`));

