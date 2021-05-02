import axios from "axios"

const BASEURL = "https://api.watchmode.com/"
const APIkey = process.env.REACT_APP_API_KEY

const url = 'http://localhost:3000/posts';


// GET platforms to display on Platforms.js
export function getPlatforms() {
    return axios.get()

}

export function LoginPost(LoginData) {
    return axios.post("/api/login", LoginData )
}


export function RegisterPost(RegisterData) {
    return axios.post("/api/register", RegisterData)
}


export default {getPlatforms, LoginPost, RegisterPost}




// export default {
//     //GET platforms to display on Platforms.js
//     getPlatforms: function() {
//         return axios.get()
//     },
    
//     // LoginPost: function(LoginData) => {
//     //     return axios.post("/api/login", LoginData )
//     // }

// }
