import React, { useState }  from 'react'
import usersAPI from '../../utils/usersAPI'
import './SearchUsers.css'

const SearchUsers = () => {
    
    const [searchVal, setSearchVal] = useState({})
    const [result, setResult] = useState(false)
    const [addedResult, setAddedResult] = useState(false)
    // const [checkErr, setErr] = useState(false)

    const search = event => {
        event.preventDefault()
        usersAPI.getUserbyEmail(searchVal)
        .then(res=> setResult(res.data[0]))
        .catch((err) => {
            console.log(err)
            window.alert("Email not recognized. Please search again.")
            window.location.href="/SearchUsers"
        })
    }

    // using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken.split(" ")
    let usertokenArray = []
    for(let i=0; i<usertoken.length; i++){
        usertokenArray.push(usertoken[i])
        if(i !== usertoken.length-1){
            usertokenArray.push(" ");
        }
    }
    const id = usertokenArray[2] 

    //submit button function
    const addFriend = event => {
        event.preventDefault()
        usersAPI.putFollowing(id, {following: result._id})
        setAddedResult()
        usersAPI.putFollower(result._id, {followers: id})
    }

    const nextPage = () => {
        window.location.href="/Profile"
    }

    return (
            <div className="all">
            <h2 className="user-search-text">Search for friends by email address:</h2>
                <form>
                    <input className="email-search" onChange={event => setSearchVal(event.target.value)}></input>
                    <button className="email-search-btn" onClick={search}>Search</button>
                </form>
                <ul className="friend-results">
                    { result !== false ? <li onChange={event => console.log(event)}>Name: {result.name}  
                    <br/>Email address: {result.email}

                    <button className="addBtn" onClick={addFriend}>Add</button></li> : null }

                    { result !== false && addedResult !== false ? <p>You now follow {result.name}! Search for another friend, or click "Begin" to go to your homepage.<br/><button className="begin-btn"onClick={nextPage}>Begin</button></p> : null }
                </ul>
                 {/* <div>
            {checkErr !== false ? <p className="err">This user does not exist. Please check the email you entered.</p> : null}
            </div> */}
            </div>
           

    )
}

export default SearchUsers