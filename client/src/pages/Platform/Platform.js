import React from 'react'
import $ from jQuery
//need to import API request to get the Platforms
//import API from "./"

const Platform = () => {
    
    //submit button
    $(".submitPlatform").click(function() {
        
    })

    return (
        <div>
            <h1>Let's Get Started!</h1>
            <h2>What platforms do you use?</h2>
            <ul>
                <li>
                    <input type="checkbox" aria-label="Checkbox for following text input"/> Netflix{/*This is where to call API req to get platforms. Map over all platforms and display first 5?*/}
                </li>
            </ul>
            <a className="btn btn-dark submitPlatform" role="button" href="/Watching">Submit</a> 
        </div>
    )
}

export default Platform
