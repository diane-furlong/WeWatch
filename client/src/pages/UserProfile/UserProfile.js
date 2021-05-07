import React, { useState } from 'react'
import usersAPI from '../../utils/usersAPI'
import './UserProfile.css'

const UserProfile = () => {

    const [userInfo, setUserInfo] = useState()
    const [name, setName] = useState()
    const [myShows, setMyShows] = useState()
    const [platforms, setPlatforms] = useState()
    const [following, setFollowing] = useState()
    const [followers, setFollowers] = useState()

    //using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken?.split(" ")
    let usertokenArray = []
    if(usertoken){
        for(let i =0; i < usertoken.length; i++){
            usertokenArray.push(usertoken[i])
            if(i != usertoken.length-1){
                usertokenArray.push(" ");
            }
        }
    }
    const id = usertokenArray[2]

    //GET request to display users info
    // usersAPI.getUser(id)
    // .then(res=> setUserInfo(res.data))
    // .then(console.log(userInfo))

    //get ids of all users that this person is following
    // usersAPI.getFollowing(id)
    // .then(res => setFollowing(res.data))
     

    return (
        <div className="all">
            <h2>Hi, {name}!</h2>
            <br/>
            <br/>
            <h4>My Shows: </h4>
            <br/>
            <h5>{myShows}</h5>
            <br/>
            <br/>
            <h4>My Platforms: </h4>
            <br/>
            <h5>{platforms}</h5>
            <br/>
            <br/>
            <h4>Following: </h4>
            <br/>
            <h5>{following}</h5>
            <br/>
            <br/>
            <h4>Followers: </h4>
            <br/>
            <h5>{followers}</h5>
        </div>
    )
}

export default UserProfile
