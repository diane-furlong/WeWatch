import React, { useState, useEffect }  from 'react'
import usersAPI from '../../utils/usersAPI'
import './SearchUsers.css'
import background from "../../img/searchUsers2.png"

const SearchUsers = () => {
    
    const [searchVal, setSearchVal] = useState({})
    const [result, setResult] = useState(false)
    const [addedResult, setAddedResult] = useState(false)


    // useEffect(() => {
    //     if(!searchVal){
    //         return
    //     }

    const search = event => {
        event.preventDefault()
        usersAPI.getUserbyEmail(searchVal)
        .then(res=> setResult(res.data[0]))
        .catch((err) => {
            console.log(err)
            window.alert("Friend not found. Please search again.")
        })
    }

    // const handleInputChange = event => {
    //     setSearchVal(event.target.value)
    // }

    // using token to find user's db id
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

    //submit button function
    const addFriend = event => {
        event.preventDefault()
        console.log(result._id)
        usersAPI.putFollowing(id, {following: result._id})
        setAddedResult()
        usersAPI.putFollower(result._id, {followers: id})
    }

    const nextPage = () => {
        window.location.href="/home"
    }

    return (
        <div className="search-users-image" style={{ 
            backgroundImage: `url(${background})` 
          }}>
        <div className="all">
        <h2 className="user-search-text">Search for friends by email address:</h2>
            <form>
                <input className="email-search" onChange={event => setSearchVal(event.target.value)}></input>
                <button className="email-search-btn" onClick={search}>Search</button>
            </form>
            <ul className="friend-results">
                <span className="span">

                { result !== false ? <li onChange={event => console.log(event)}>Name: {result.name}  
                <br/>Email address: {result.email}

                <button className="addBtn" onClick={addFriend}>Add</button></li> : null }

                { result !== false && addedResult !== false ? <p>You now follow {result.name}! Search for another friend, or click "Begin" to go to your homepage.<br/><button className="begin-btn"onClick={nextPage}>Begin</button></p> : null }
                </span>
            </ul>
         </div>
         </div>
    )
}

export default SearchUsers