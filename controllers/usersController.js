const db = require("../models");


module.exports = {
    create: function(req, res) {
        db.User.create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    updateShows: function(req, res) {
        db.User.findOneAndUpdate({ _id: req.params.id }, {$push: {myShows: req.body.myShows}})
          .then(dbUser => res.json(dbUser))
          .catch(err =>{ console.log(req.body.myShows) 
            return res.status(422).json(err)});
    },
    updatePlatforms: function(req, res) {
        db.User.findOneAndUpdate({ _id: req.params.id }, {$push: {platforms: req.body.platforms}})
          .then(dbUser => res.json(dbUser))
          .catch(err =>{ console.log(req.body.platforms) 
            return res.status(422).json(err)});
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
    findByEmail: function(req, res) {
        db.User.find({ 'email': req.params.email })
        .then(dbUser => res.json(dbUser))
        .catch(err =>{res.status(422).json(err)});
    },
    findById: function(req, res) {
        db.User.findById(req.params.id)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    addFollowing: function(req, res) {
        db.User.findOneAndUpdate({_id: req.params.id}, {$push: {following: req.body.following}})
        .then(dbUser => res.json(dbUser))
    },
    addFollower: function(req, res) {
        db.User.findOneAndUpdate({_id: req.params.id}, {$push: {followers: req.body.followers}})
        .then(dbUser => res.json(dbUser))
    },
    allFollowing: function(req, res) {
        db.User.findById({ _id: req.params.id})
        .then(dbUser => res.json(dbUser.following))
    }
}