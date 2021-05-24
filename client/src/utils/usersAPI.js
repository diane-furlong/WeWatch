import axios from "axios"


export default {
    //GET all users
    getUsers: function() {
        return axios.get("/api/users")
    },

    //POST user information at signup
    postUser: function(signUpData) {
        return axios.post("/api/users/register", signUpData)
    },

    //POST user information at login
    postLogin: function(loginData) {
        return axios.post("/api/users/login", loginData)
    },

    //GET- check if token is valid
    validToken: function() {
        return axios.get("/api/users/tokenIsValid")
    },

    //GET login info
    getLogin: function(loginData) {
        return axios.get("/api/users/login", loginData)
    },

    //GET user information by ID
    getUser: function(id) {
        return axios.get("/api/users/" + id)
    },

    //GET user information by email
    getUserbyEmail: function(email) {
        return axios.get(`/api/users/email/${email}`)
    },

    //PUT platforms chosen by the user
    postPlatforms:function(id, platforms) {
        return axios.post(`/api/users/${id}/platforms`, platforms)
    },

    //GET platforms chosen by the user
    getPlatforms: function(id) {
        return axios.get(`/api/users/${id}`)
    },

    //GET all platforms in user's db
    getAllPlatforms: function(id) {
        return axios.get(`/api/platforms/${id}`)
    },

    //PUT shows selected by user into user's myShows
    putShow: function(id, myShows) {
        return axios.put(`/api/users/${id}`, myShows)
    },

    postShow: function(id, myShows) {
        return axios.post(`/api/users/myshows/${id}`, myShows)
    },

    //GET shows that the user is watching
    getShows: function(id) {
        return axios.get(`/api/users/${id}`)
    },

    //PUT new followee to follower's db
    putFollowing: function(id, result) {
        return axios.put(`/api/users/following/${id}`, result)
    },

    //GET all followee's from user's db
    getFollowing: function(id) {
        return axios.get(`/api/users/following/${id}`)
    },

    //GET all followers from user's db
    getFollowers: function(id) {
        return axios.get(`/api/users/followers/${id}`)
    },

    //PUT new follower to followee's db
    putFollower: function(id, followerID) {
        return axios.put(`/api/users/addfollower/${id}`, followerID)
    },

    //DELETE a show from user's db
    removeShow: function(id, myShows) {
        return axios.put(`/api/users/myshows/${id}`, myShows)
    },

    //DELETE a platforms from user's db
    removePlatform: function(id, platforms) {
        return axios.put(`/api/users/platforms/${id}`, platforms)
    },

    //DELETE someone from "following"
    unfollowing: function(id, result) {
        return axios.put(`/api/users/unfollow/${id}`, result)
    },

    //DELETE someone from "followers"
    unfollower: function(id, result) {
        return axios.put(`/api/users/unfollower/${id}`, result)
    }
}