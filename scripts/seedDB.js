const mongoose = require('mongoose')
const model = require('../models')

const db = process.env.REACT_APP_MONGOURI;
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    )

const userSeed = [
    {
        name: "Bob Smith",
        email:"test0@test.com",
        password:"password0",
        date: Date.now,
        platforms: "",
        myShows: "",
        following: [],
        followers: []
    },
    {
        name: "Sue Smith",
        email:"test1@test.com",
        password:"password1",
        date: Date.now,
        platforms: "",
        myShows: "",
        following: [],
        followers: []
    },
    {
        name: "Tom Smith",
        email:"test2@test.com",
        password:"password2",
        date: Date.now,
        platforms: "",
        myShows: "",
        following: [],
        followers: []
    },
    {
        name: "Sally Smith",
        email:"test3@test.com",
        password:"password3",
        date: Date.now,
        platforms: "",
        myShows: "",
        following: [],
        followers: []
    },
    {
        name: "Pedro Smith",
        email:"test4@test.com",
        password:"password4",
        date: Date.now,
        platforms: "",
        myShows: "",
        following: [],
        followers: []
    }
]

model.User.deleteMany({})
    .then(() => model.User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n+" records inserted")
        process.exit(0)
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })