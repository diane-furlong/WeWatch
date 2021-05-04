import React, { useState }  from 'react'
import usersAPI from '../../utils/usersAPI'
// import watchModeAPI from '../../utils/watchModeAPI'
import axios from "axios"
import './Watching.css'
import background from "../../img/watching.png"

const Watching = () => {

    // const [platforms, setPlatforms] = useState({})
    const [searchVal, setSearchVal] = useState({})
    const [result, setResult] = useState(false)
    const [resultQueue, setResultQueue] = useState()
    const [myShows] = useState([])

    //using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken.split(" ")
    let usertokenArray = []
    for(let i =0; i < usertoken.length; i++){
        usertokenArray.push(usertoken[i])
        if(i != usertoken.length-1){
            usertokenArray.push(" ");
        }
    }
    const id = usertokenArray[2] 
    console.log(id)
    


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

            setResultQueue(res.data.plot_overview)

            
            // return result, resultQueue
        })
        // .then(console.log(resultQueue, result))
    }

    const addingShow = (event) => {
        event.preventDefault()
        myShows.push(resultQueue)
        console.log(myShows)
         //2. PUT myShows to the user's profile in the database- need to figure out how to add on instead of overwrite. make myShows an array of objects with id and title?
        usersAPI.putShow(id, {myShows: result})
        .then(console.log(`done`))
        //3. route to next page- which is newsfeed?
        // window.location.href='/Newsfeed'
       
    }

    return (
        <div
        className="watching-image" style={{ 
            backgroundImage: `url(${background})` 
          }}
        >
        <h2 className="watching-text">What are you currently watching?</h2>
            <form>
                <input className="watching-search" onChange={event => setSearchVal(event.target.value)}></input>
                <button onClick={test} className="watching-search watching-search-btn">Search</button>
            </form>
            <ul className="watching-results">

                { result !== false ? <li onChange={event => console.log(event)}>Title: {result}  
                <br/>Description: {resultQueue}

                <button className="addBtn" onClick={addingShow}>Add</button></li> : null }
            </ul>
         </div>
    )
}

export default Watching
