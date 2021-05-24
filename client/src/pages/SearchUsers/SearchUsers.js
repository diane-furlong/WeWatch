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
    async function addFriend(event) {
        event.preventDefault()
        const id2 = [result._id]
        const userInfo = await usersAPI.getUser(id)
        const userFollowing = userInfo.data.following
        mergeArrays()
        const userInfo2 = await usersAPI.getUser(id2)
        const user2Followers = userInfo2.data.followers
        mergeArrays2()

        //make sure the user being added is unique
        function mergeArrays(){
            const arr=[userFollowing, id2]
            let jointArray=[]
            arr.forEach(array => {
                jointArray = [ ...jointArray, ...array]
            })
            const newSet= [...new Set([...jointArray])]

            //3. add API request to PUT the selected followee to the users API
            usersAPI.postFollowing(id, {following: newSet})
            setAddedResult(true)
        }

        //make sure users id is unique to followee's followers list
        function mergeArrays2(){
            const arr=[user2Followers, [id]]
            let jointArray=[]
            arr.forEach(array => {
                jointArray = [ ...jointArray, ...array]
            })
            const newSet= [...new Set([...jointArray])]
            
            //add selected follower to followee's db
            usersAPI.postFollower(id2, {followers: newSet})
        }
    }

    const nextPage = () => {
        window.location.href="/Profile"
    }

    const searchAnother = () => {
        setAddedResult(false)
    }

    return (
        <div className="all">
        <h2 className="user-search-text">Search for friends by email address:</h2>
            <form>
                <input className="email-search" onChange={event => setSearchVal(event.target.value)} onClick={ result !== false && addedResult !== false ? searchAnother:null}></input>
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