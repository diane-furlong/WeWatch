import axios from "axios"

const BASEURL = "https://api.watchmode.com/"
const APIkey = process.env.REACT_APP_API_KEY

export default {
    //GET shows from a specific platform to display in search on Watching.js
    getShows: function() {
        return axios.get(BASEURL+"networks/?"+APIkey)
    }
}

// export function LoginPost(LoginData) {
//     return axios.post("/api/login", LoginData )
// }

// export default {getPlatforms, LoginPost}



// export default {
//     //GET platforms to display on Platforms.js
//     getPlatforms: function() {
//         return axios.get()
//     },
    
//     // LoginPost: function(LoginData) => {
//     //     return axios.post("/api/login", LoginData )
//     // }

// }
