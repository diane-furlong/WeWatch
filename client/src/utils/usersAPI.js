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
    putPlatforms:function(id, platforms) {
        return axios.put(`/api/users/${id}/platforms`, platforms)
    },

    //GET platforms chosen by the user
    getPlatforms: function(id) {
        return axios.get(`/api/users/${id}`)
    },

    //PUT shows selected by user into user's myShows
    putShow: function(id, myShows) {
        return axios.put(`/api/users/${id}`, myShows)
    },

    //GET shows that the user is watching
    getShows: function(id) {
        return axios.get(`/api/users/${id}`)
    },

    //PUT new friend
    putFollowing: function(id, result) {
        return axios.put(`api/users/addfollowing/${id}`, result)
    }
}