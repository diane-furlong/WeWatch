import React, { useState, useEffect } from 'react'
//need to import API request to get the Platforms
//import API from "./"
import './Platform.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Platform = () => {

    //1. API Request to display platforms/networks: https://api.watchmode.com/v1/networks/?apiKey={apiKey}. how to choose only 5 most popular ones? choose only ones in US:  "origin_country": "US" (a prop in the networks search)
    //2. User checks boxes of platforms they use
    //3. Get networks, which is every chosen platform, and enter them into API request to retreive shows on that network for the next page
    //4. Route to the next page

    //const [allNetworks, setAllNetworks] = useState([])
    const [networks] = useState([])

    // //1. need API request to display (top 5?) networks
    // useEffect(() => {
    //     API.getAllNetworks()
    //         .then(res => setAllNetworks(res.data))
    //         .catch(err => console.log(err))
    // }, [])


    //checking/unchecking box
    const handleInputChange = (event) => {
        const target = event.target
        if(target.checked) {
            console.log("checked")
            networks.push(target.value)
            console.log(networks)
        } else {
            console.log("not checked")
        }
    }

    //submit button
    const handleSubmit = () => {
        console.log("submitted "+networks)
        //3. add API request to GET the shows for the networks selected
        // CODE HERE
        //4. route to next page
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
