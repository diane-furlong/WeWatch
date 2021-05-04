import axios from "axios"


export default {
    //GET all users
    getUsers: function() {
        return axios.get("/api/users/")
    },

    //POST user information at signup
    postUser: function(signUpData) {
        return axios.post("/api/users/register", signUpData)
    },

    //POST user information at login
    postLogin: function(loginData) {
        return axios.post("/api/users/login", loginData)
    },

    //GET login info
    getLogin: function(loginData) {
        return axios.get("/api/users/login", loginData)
    },

    //GET user information
    getUser: function(networks) {
        return axios.get("/api/users/networks", networks)
    },

    //POST networks chosen by the user
    postNetworks:function(token, networks) {
        return axios.post("/api/users/networks/", networks)
    },

    //GET networks chosen by the user
    getNetworks: function(id) {
        return axios.get("/api/users/networks/" + id)
    },

    //PUT shows selected by user into user's myShows
    postShow: function(id, showData) {
        return axios.put("/api/users/" + id + "/shows", showData)
    },

    //GET shows that the user is watching
    getShows: function(id) {
        return axios.get("/api/users/" + id + "/shows")

    }
}