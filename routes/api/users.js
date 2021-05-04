const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys2 = require("../../config/keys2");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const DB = require("../../models");
const usersController = require("../../controllers/usersController")



router.post("/networks", (req, res) => {

    // find the currently loggedin user through req.user
    DB.User.findOneAndUpdate({ _id: req.userId }, req.body).then(user => {
        res.send("POST request")

    })
})



// // const routes = (app) => {
// //     app.route('/?')
// //     .get((req, res) => 
// //     res.send('GET request success'))
// // }


// //GET user by ID
// router.get("/:id", (req, res) => {
//     DB.User.find({}).then(dbUser => {
//         return res.json(dbUser)
//     })
// })


// const routes = (app) => {
//     app.route('/?')
//     .get((req, res) => 
//     res.send('GET request success'))
// }

// //POST to user's shows
// router.post("/:id/shows", (req, res) => {
//     req.json()
// })

// router.get("/:id/shows", (req, res) => {
//     DB.User.find({id}).then(data => {
//         return res.json(data)
//     })
// })


//matches with '/api/users'
router.route("/")
.get(usersController.findAll)
.post(usersController.create)

//matches with '/api/users/:id'
router.route("/:id")
.get(usersController.findById)
.put(usersController.update)

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    DB.User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new DB.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    DB.User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email is not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys2.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Sorry, Password incorrect" });
            }
        });
    });
});

module.exports = router;