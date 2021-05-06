import React, { useState, useEffect }  from 'react'
import usersAPI from '../../utils/usersAPI'

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
    }

    const handleInputChange = event => {
        setSearchVal(event.target.value)
    }

  

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

    const addFriend = event => {
        event.preventDefault()
        console.log(result._id)
        usersAPI.putFollowing(id, {following: result._id})
        setAddedResult()
    }

    return (
        <>
        <h2>Search for friends by email address:</h2>
            <form>
                <input className="email-search" onChange={event => setSearchVal(event.target.value)}></input>
                <button onClick={search}>Search</button>
            </form>

            <ul>

                { result !== false ? <li onChange={event => console.log(event)}>Name: {result.name}  
                <br/>Email address: {result.email}

                <button className="addBtn" onClick={addFriend}>Add</button></li> : null }

                { result !== false && addedResult !== false ? <p>You now follow {result.name}!</p> : null }
            </ul>
         </>
    )
}

export default SearchUsers