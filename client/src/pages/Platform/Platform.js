import React, { useState } from 'react'
//import user API to POST platforms to the current user
import usersAPI from "../../utils/usersAPI"
import './Platform.css'
import background from "../../img/platform.png"
const _ = require('lodash');

const Platform = () => {

    const [networks] = useState([])
    const [existingPlatform, setExistingPlatform] = useState(false)
    const [nonexistingPlatform, setNonexistingPlatform] = useState(false)

    //using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken?.split(" ")
    let usertokenArray = []
    if(usertoken){
        for(let i =0; i < usertoken.length; i++){
            usertokenArray.push(usertoken[i])
            if(i !== usertoken.length-1){
                usertokenArray.push(" ");
            }
        }
    }
    const id = usertokenArray[2]

    //checking/unchecking box
    const handleInputChange = (event) => {
        const target = event.target
        const targetPlatform = target.value
        if(target.checked) {
            networks.push(targetPlatform)
        } else if (!target.checked) {
            let removed = _.remove(networks, function(e) {
                return e === targetPlatform               
            })
            console.log("removed "+ removed)
        }
    }

    //submit button
    async function handleSubmit(event){
        event.preventDefault()
        //2. check that platform is not already in user's db
        const userInfo = await usersAPI.getUser(id)
        const userPlatforms = userInfo.data.platforms
        const userShows = userInfo.data.myShows
        mergeArrays()

        
        //make sure the new platform being added is unique
        function mergeArrays(){
            const arr=[userPlatforms, networks]
            let jointArray=[]
            arr.forEach(array => {
                jointArray = [ ...jointArray, ...array]
            })
            const newSet= [...new Set([...jointArray])]
            console.log(newSet)
            //3. add API request to PUT the selected platforms to the users API
            usersAPI.postPlatforms(id, {platforms: newSet})
            //4. route to next page
            if(userShows.length === 0){
                window.location.href='/Watching'
            } else {
                window.location.href='/Profile'
            }
        }
    }

   


    return (
        <div className="platform-image" style={{ 
            backgroundImage: `url(${background})` 
          }}>

        <div className="form-check">
            <h1 className="platform-text">Let's Get Started!</h1>
            <h2 className="platform-text">What platforms do you use?</h2>
            <ul>
                <li>
                    <input className="form-check-input" type="checkbox" value="Netflix" id="check1" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check1">Netflix</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="Peacock" id="check2" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check2">Peacock</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="Hulu" id="check3" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check3">Hulu</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="HBO Max" id="check4" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check4">HBO Max</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="Amazon Prime Video" id="check5" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check5">Amazon Prime Video</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="Disney+" id="check6" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check6">Disney+</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="Apple TV Plus" id="check7" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check7">Apple TV Plus</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="Paramount Plus" id="check8" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check8">Paramount Plus</label>
                </li>
            </ul>
            <button className="submitPlatform" onClick={event => handleSubmit(event)}>Submit</button>
        </div>
        </div>
    )
}

export default Platform