import React, { useEffect, useState} from 'react'
import usersAPI from '../../utils/usersAPI'


export default function DataDisplayer() {
    const [name, setName] = useState([])
    const [myShows, setMyShows] = useState([])
    const [platforms, setPlatforms] = useState()
    const [following, setFollowing] = useState()
    const [followers, setFollowers] = useState()
    const [done, setDone] = useState(false)
    
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

    useEffect(() => {
        const getData = async () => {
            const response = await usersAPI.getUser(id)
            setName(response.data.name)
            const response2 = await usersAPI.getUser(id)
            setMyShows(response2.data.myShows)
            const response3 = await usersAPI.getUser(id)
            setPlatforms(response3.data.platforms)
            const response4 = await usersAPI.getUser(id)
            setFollowing(response4.data.following)
            const response5 = await usersAPI.getUser(id)
            setFollowers(response5.data.followers)
            setDone(true)
        }

        getData()
    }, [])

    if(name) {
        return <div>
            <h3>Name:</h3><h4>{[name]}</h4>
            <h3>What I'm Watching:</h3><h4>{myShows}</h4>
            <h3>What Platforms I Have:</h3>{done == true ? <ul>{platforms.map(() => {
                <li>{platforms}</li>
            })}
            </ul>: null}
            {platforms}
            <h3>Following:</h3><h4>{following}</h4>
            <h3>Followers:</h3><h4>{followers}</h4>
        </div>
    } else {
        return null
    }
}
