import React, { useState }  from 'react'
import usersAPI from '../../utils/usersAPI'
// import watchModeAPI from '../../utils/watchModeAPI'
import axios from "axios"
import './Watching.css'

const Watching = () => {

    // const [networks, setNetworks] = useState({})
    const [searchVal, setSearchVal] = useState({})
    const [result, setResult] = useState(false)
    const [resultQueue, setResultQueue] = useState()
    const [myShows] = useState([])

    //1. GET request from users API to import networks array from Platform.js
    // const getShows = (id) => {
    //     //get networks stored in user's id
    //     usersAPI.getNetworks(id)
    //     // V code for testing to see what the response needs to be V
    //     .then(res => console.log(res[0].data.title))
    //     // V actual code V
    //     //.then(res => setNetworks(res.data))
    // } 

    //2. Enter selected networks into API request to retreive shows on that network
    //3. Display shows from each network. dropdown list? search only? Start typing and it brings up results right away?
    

    const test = (event) => {
        event.preventDefault()
        let titleID
        const BASEURL = "https://api.watchmode.com/v1/"
        const APIkey = process.env.REACT_APP_API_KEY
        return axios.get(BASEURL+"search/?apiKey="+APIkey+"&search_field=name&search_value="+searchVal)
        .then(res => titleID = res.data.title_results[0].id)
        .then(res => { 
            return axios.get(BASEURL+"title/"+titleID+"/details/?apiKey="+APIkey)
        })
        .then(res => {
            // console.log(res.data.title)
            setResult(res.data.title)
            setResultQueue(res.data)
            
            // return result, resultQueue
        })
        // .then(console.log(resultQueue, result))
    }

    const addingShow = (event) => {
        event.preventDefault()
        myShows.push(resultQueue)
        console.log(myShows)
         //PUSH myShows to the user's profile in the database
        //  usersAPI.postShow(myShows)
       
    }

    return (
        <>
        <h2>What are you currently watching?</h2>
            <form>
                <input className="searchVal" onChange={event => setSearchVal(event.target.value)}></input>
                <button onClick={test}>Search</button>
            </form>
            <ul>
                { result != false ? <li onChange={event => console.log(event)}>Title: {result}  
                {/* <br/>Description: {resultQueue.plot_overview} */}
                <button className="addBtn" onClick={addingShow}>Add</button></li> : null }
            </ul>
         </>
    )
}

export default Watching
