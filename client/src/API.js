import axios from "axios"

const BASEURL = "https://api.watchmode.com/"
const APIkey = process.env.REACT_APP_API_KEY

export default {
    //GET platforms to display on Platforms.js
    getPlatforms: function() {
        return axios.get()
    }
}