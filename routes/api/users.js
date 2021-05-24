const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const DB = require("../../models");
const usersController = require("../../controllers/usersController")

//matches with '/api/users'
router.route("/")
.get(usersController.findAll)
.post(usersController.create)

//matches with '/api/users/:id'
router.route("/:id")
.get(usersController.findById)
.put(usersController.updateShows)

//matches with '/api/users/myShows/:id'
router.route("/myshows/:id")
.put(usersController.removeShow)
.post(usersController.replaceShow)

//matches with '/api/users/:id/platforms'
router.route("/:id/platforms")
.get(usersController.findById)
.put(usersController.updatePlatforms)
.post(usersController.replacePlatforms)

//matches with '/api/users/platforms/:id'
router.route("/platforms/:id")
.put(usersController.removePlatform)
.get(usersController.allPlatforms)

//matches with '/api/users/email/:email'
router.route("/email/:email")
.get(usersController.findByEmail)

//matches with '/api/users/following/:id'
router.route("/following/:id")
.put(usersController.addFollowing)
.get(usersController.allFollowing)
.post(usersController.replaceFollowing)

//matches with '/api/users/followers/:id'
router.route("/followers/:id")
.get(usersController.allFollowers)

//matches with '/api/users/addfollower/:id'
router.route("/addfollower/:id")
.put(usersController.addFollower)
.post(usersController.replaceFollowers)

//matches with '/api/users/profile/:id'
router.route("/profile/:id")
.get(usersController.findById)

//matches with '/api/users/unfollow/:id'
router.route("/unfollow/:id")
.put(usersController.unfollow)

//matches with '/api/users/unfollower/:id'
router.route("/unfollower/:id")
.put(usersController.unfollower)

//--------------------------------------------------------------------

//vvvvvvvvvvvvvvvv-LOGIN AND SIGNUP LOGIC-vvvvvvvvvvvvvvvvv
// @route POST api/users/register
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
                    id: user._id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    process.env.REACT_APP_SECRETORKEY,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token + " " + user._id
                        });
                    }
                );
                const token = jwt.sign({ id: user._id }, 
                    process.env.JWT_SECRET
                    )
                res.json({
                    token,
                    user: {
                        id: user._id,
                        name: user.name
                    }
                })
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Sorry, Password incorrect" });
            }
        });
    });
});


// Check if token is valid
router.post("/tokenIsValid", (req, res) => {
    try {
        const token = req.header("x-auth-token");
    if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
        const user = User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;