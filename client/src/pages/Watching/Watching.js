import React, { useState }  from 'react'
import usersAPI from '../../utils/usersAPI'
import watchModeAPI from '../../utils/watchModeAPI'

const Watching = () => {

    const [networks, setNetworks] = useState({})

    //1. GET request from users API to import networks array from Platform.js
    const getNetworks = (id) => {
        //get networks stored in user's id
        usersAPI.getNetworks(id)
        // V code for testing to see what the response needs to be V
        .then(res => console.log(res))
        // V actual code V
        //.then(res => setNetworks(res.data?))
    } 

    //2. Enter selected networks into API request to retreive shows on that network
    //3. Display shows from each network. dropdown list? search only? Start typing and it brings up results right away?
 
    const test = () => {
        watchModeAPI.getShows()
        .then(res => console.log(res))
    }

    return (
        <div>
            <button onClick={test}>Test</button>
        </div>
    )
}

export default Watching
