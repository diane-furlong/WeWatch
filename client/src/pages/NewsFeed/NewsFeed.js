import React, { useState } from 'react'
import usersAPI from '../../utils/usersAPI'
import './NewsFeed.css'

const NewsFeed = () => {

    const [following, setFollowing] = useState()
    const [followingResults, setFollowingResults] = useState([])

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

        //get ids of all users that this person is following
        const test = () => {
            usersAPI.getFollowing(id)
            .then(res => setFollowing(res.data))
        }
        
        //get what each followee is watching
        let resultArray=[]
        const test2 = () => {
            for (let i=0; i<following.length; i++){
                usersAPI.getUser(following[i])
                .then(res => resultArray.push([res.data]))
            }
            setFollowingResults(resultArray)
            console.log(followingResults)
        }

    return (
        <div className="all">
            {/* <p>{followingResults.name} is watching {followingResults.}</p> */}
            <button onClick={test}>test</button>
            <button onClick={test2}>test2</button>
        </div>
    )
}

export default NewsFeed
