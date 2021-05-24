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
    removeShow: function(req, res) {
        db.User.findByIdAndUpdate({ _id: req.params.id }, {$pull: {myShows: req.body.myShows}})
        .then(res => console.log(res))
    },
    replaceShow: function(req, res) {
        db.User.findByIdAndUpdate({ _id: req.params.id }, {myShows: req.body.myShows})
        .then(dbUser => res.json(dbUser))
    },
    allPlatforms: function(req, res) {
        db.User.findById(req.params.id)
        .then(dbUser => console.log(dbUser))
    },
    removePlatform: function(req, res) {
        db.User.findByIdAndUpdate({ _id: req.params.id }, {$pull: {platforms: req.body.platforms}})
        .then(res=>console.log(res))
    },
    replacePlatforms: function(req, res) {
        db.User.findByIdAndUpdate({ _id: req.params.id }, {platforms: req.body.platforms})
        .then(dbUser => res.json(dbUser))
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
    replaceFollowing: function(req, res) {
        db.User.findByIdAndUpdate({ _id: req.params.id }, {following: req.body.following})
        .then(dbUser => res.json(dbUser))
    },
    addFollower: function(req, res) {
        db.User.findOneAndUpdate({_id: req.params.id}, {$push: {followers: req.body.followers}})
        .then(dbUser => res.json(dbUser))
    },
    allFollowing: function(req, res) {
        db.User.findById({ _id: req.params.id})
        .then(dbUser => res.json(dbUser.following))
    },
    allFollowers: function(req, res) {
        db.User.findById({ _id: req.params.id})
        .then(dbUser => res.json(dbUser.followers))
    },
    replaceFollowers: function(req, res) {
        db.User.findByIdAndUpdate({ _id: req.params.id }, {followers: req.body.followers})
        .then(dbUser => res.json(dbUser))
    },
    unfollow: function(req, res) {
        db.User.findOneAndUpdate({ _id: req.params.id }, {$pull: {following: req.body.following}})
        .then(res=>console.log(res))
    },
    unfollower: function(req, res) {
        db.User.findOneAndUpdate({ _id: req.params.id }, {$pull: {followers: req.body.followers}})
        .then(res=>console.log(res))
    }
}