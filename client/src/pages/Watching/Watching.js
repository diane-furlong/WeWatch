import React, { useState }  from 'react'
import usersAPI from '../../utils/usersAPI'
// import watchModeAPI from '../../utils/watchModeAPI'
import axios from "axios"
import './Watching.css'


const Watching = () => {

    const [searchVal, setSearchVal] = useState({})
    const [result, setResult] = useState(false)
    const [resultQueue, setResultQueue] = useState()
    const [myShows] = useState([])
    const [addedResult, setAddedResult] = useState(false)

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

    //search button
    const search = (event) => {
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
            setResult(res.data.title)
            setResultQueue(res.data.plot_overview)
        }).catch((err) => {
            console.log(err)
            window.alert("Title not recognized. Please search again.")
        })
    }

    //submit button
    async function addingShow(event) {
        event.preventDefault()
        myShows.push(result)
        const userInfo = await usersAPI.getUser(id)
        const userShows = userInfo.data.myShows
        const userFollowing = userInfo.data.following
        mergeArrays()

        //make sure the show being added is unique
        function mergeArrays(){
            const arr=[userShows, myShows]
            let jointArray=[]
            arr.forEach(array => {
                jointArray = [ ...jointArray, ...array]
            })
            const newSet= [...new Set([...jointArray])]
            console.log(newSet)

            //3. add API request to PUT the selected platforms to the users API
            usersAPI.postShow(id, {myShows: newSet})
            setAddedResult(true)
        }
    }

    //route to next page when user is done
    async function nextPage() {
        const userInfo = await usersAPI.getUser(id)
        const userFollowing = userInfo.data.following
        if(userFollowing.length === 0){
            window.location.href="/SearchUsers"
        } else {
            window.location.href="/Profile"
        }
    }

    const searchAnother = () => {
        setAddedResult(false)
    }


    return (
        <div className="watchingAll">
        <h2 className="watching-text">What are you currently watching?</h2>
            <form>
                <input className="watching-search" onChange={event => setSearchVal(event.target.value)} onClick={ result !== false && addedResult !== false ? searchAnother:null}></input>
                <div className="container">
                    <div className='col-sm'>
                <button onClick={search} className="watching-search-btn">Search</button>
                    </div>
                </div>
            </form>
            <ul className="watching-results">
                { result !== false ? <li onChange={event => console.log(event)}>Title: {result}  
                <br/>Description: {resultQueue}

                <button className="addBtn" onClick={addingShow}>Add</button></li> : null }
                <br/>
                { result !== false && addedResult !== false ? <p className="add-text">{result} has been added to your watching list! Search for another title, or click "Next".<br/><button className="next-btn"onClick={nextPage}>Next</button></p> : null }
            </ul>
         </div>
    )
}

export default Watching
