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


    const stuff = () => {
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

    
        //GET requests to display user's info
        usersAPI.getUser(id)
        .then(res=> setName(res.data.name))
        usersAPI.getUser(id)
        .then(res=> setMyShows(res.data.myShows))

        usersAPI.getUser(id)
        .then(res=> setPlatforms(res.data.platforms))

        usersAPI.getUser(id)
        .then(res=> setFollowing(res.data.following))

        usersAPI.getUser(id)
        .then(res=> setFollowers(res.data.followers))
    }
    
     

    return (
        <div className="all">
            <button onClick={stuff}>click</button>
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
