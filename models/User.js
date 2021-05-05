const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: true,
        validate: [({ length }) => length >= 6, "Password must be at least 6 characters."]
    },
    date: {
        type: Date,
        default: Date.now
    },
    platforms: [{
        type: String
    }],
    myShows: [{
        type: String
    }],
    following: [{
        type: mongoose.Schema.ObjectId, ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.ObjectId, ref: 'User'
    }]
});
module.exports = User = mongoose.model("users", UserSchema);