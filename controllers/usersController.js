const User = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../config/passport.js");

const secretOrKey = require('../config/keys2')



module.exports = {
    create: function(req, res) {
        db.User.create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbUser => res.json(dbUser))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
    db.User.findById({ _id: req.params.id })
        .then(dbUser => dbUser.remove())
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    findAll: function(req, res) {
    db.User.find()
        .sort({ date: -1 })
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
    db.User.findById(req.params.id)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secretOrKey , { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

module.exports.signup = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    try{
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists." })

        if (password !== password2) return res.status(400).json({ message: "Passwords don't match." })

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name})

        const token = jwt.sign({ email: result.email, id: result._id }, secretOrKey, { expiresIn: "1h" })

        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }

}