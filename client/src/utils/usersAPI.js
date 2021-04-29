import axios from "axios"


export default {
    //POST user information at signup
    postUser: function(id) {
        return axios.post("/api/users/" + id)
    },

    //GET user information
    getUser: function(id) {
        return axios.get("/api/users/" + id)
    },

    //POST networks chosen by the user
    postNetworks:function(id) {
        return axios.post("/api/users/networks" + id)
    },

    //GET networks chosen by the user
    getNetworks: function(id) {
        return axios.get("/api/users/networks" + id)
    }
}