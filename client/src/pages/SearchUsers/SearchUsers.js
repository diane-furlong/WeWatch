// import React, { useState, useEffect }  from 'react'
// import usersAPI from '../../utils/usersAPI'

// const SearchUsers = () => {
    
//     const [searchVal, setSearchVal] = useState({})
//     const [result, setResult] = useState(false)
//     const [resultQueue, setResultQueue] = useState()


//     useEffect(() => {
//         if(!search){
//             return
//         }

//         usersAPI.getUser
//     })

//     const handleInputChange = event => {
//         setSearchVal(event.target.value)
//     }

    

//     // using token to find user's db id
//     let usertoken = localStorage.getItem("token")
//     usertoken = usertoken.split(" ")
//     let usertokenArray = []
//     for(let i =0; i < usertoken.length; i++){
//         usertokenArray.push(usertoken[i])
//         if(i != usertoken.length-1){
//             usertokenArray.push(" ");
//         }
//     }
//     const id = usertokenArray[2] 
//     console.log(id)


//     return (
//         <>
//         <h2>Search for friends by email address:</h2>
//             <form>
//                 <input
//                     // value=
//                     handleInputChange={handleInputChange}
//                     name="term"
//                     list="term"
//                     type="text"
//                     className="form-control"
//                     placeholder="Type in a friend's email address to begin"
//                     id="term"
//                 />
//                 <input className="searchVal" onChange={event => setSearchVal(event.target.value)}></input>
//                 <button onClick={search}>Search</button>
//             </form>
//             {/* <ul className="list-group search-results">
//                 <li className="list-group-item">
//                     <h2>{props.title}</h2>
//                     <a href={props.url}>{props.url}</a>
//                 </li>
//             </ul> */}
//             <ul>

//                 { result !== false ? <li onChange={event => console.log(event)}>Name: {result}  
//                 <br/>Email address: {resultQueue}

//                 <button className="addBtn">Add</button></li> : null }
//             </ul>
//          </>
//     )
// }

// export default SearchUsers