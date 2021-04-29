import axios from "axios"

const BASEURL = "https://api.watchmode.com/"
const APIkey = process.env.REACT_APP_API_KEY

export function getPlatforms() {
    return axios.get()
}

export function LoginPost(LoginData) {
    return axios.post("/api/login", LoginData )
}

export default {getPlatforms, LoginPost}



// export default {
//     //GET platforms to display on Platforms.js
//     getPlatforms: function() {
//         return axios.get()
//     },
    
//     // LoginPost: function(LoginData) => {
//     //     return axios.post("/api/login", LoginData )
//     // }

// }
