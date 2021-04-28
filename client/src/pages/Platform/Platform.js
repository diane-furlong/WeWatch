import React, { useState, useEffect } from 'react'
//need to import API request to get the Platforms
//import API from "./"
import './Platform.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const _ = require('lodash');

const Platform = () => {

    //1. User checks boxes of platforms they use
    //2. Get networks, which is every chosen platform, and enter them into API request to retreive shows on that network for the next page (or do this on the next page?)
    //3. Route to the next page

    //const [allNetworks, setAllNetworks] = useState([])
    const [networks] = useState([])

    //checking/unchecking box
    const handleInputChange = (event) => {
        const target = event.target
        const targetPlatform = target.value
        if(target.checked) {
            console.log("checked")
            networks.push(targetPlatform)
            console.log(networks)
        } else if (!target.checked) {
            let removed = _.remove(networks, function(e) {
                return e === targetPlatform               
            })
            console.log("removed "+ removed)
            console.log(networks)
        }
    }

    //submit button
    const handleSubmit = () => {
        console.log("submitted "+networks)
        //2. add API request to GET the shows for the networks selected
        // CODE HERE
        //3. route to next page
        window.location.href='/Watching'
    }

    return (
        <div className="form-check">
            <h1>Let's Get Started!</h1>
            <h2>What platforms do you use?</h2>
            <ul>
                <li>
                    <input className="form-check-input" type="checkbox" value="Netflix" id="check1" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check1">Netflix</label>
                </li>
                <li>
                    <input className="form-check-input" type="checkbox" value="Peacock" id="check2" onChange={handleInputChange}/><label className="form-check-label" htmlFor="check2">Peacock</label>
                </li>
            </ul>
            <button className="btn btn-dark submitPlatform" onClick={event => handleSubmit(event)}>Submit</button>
        </div>
    )
}

export default Platform
