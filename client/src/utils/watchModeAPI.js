import axios from "axios"

const BASEURL = "https://api.watchmode.com/v1/"
const APIkey = process.env.REACT_APP_API_KEY

console.log(APIkey)


export default {
    //GET shows from a specific platform to display in search on Watching.js
    getShows: function() {
        return axios.get(BASEURL+"networks/?"+APIkey)
    }
}
