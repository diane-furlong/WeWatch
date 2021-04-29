import React, { useState, useEffect } from 'react'
import './Connecting.css'
import SearchField from "react-search-field";
import ReactDOM from "react-dom";


<SearchField
  placeholder="Search..."
//   onChange={onChange}
  searchText="This is initial search text"
  classNames="test-class"
/>




// function App() {
//     const [searchTerm, setSearchTerm] = React.useState("");
//     const [searchResults, setSearchResults] = React.useState([]);
//     const handleChange = event => {
//        setSearchTerm(event.target.value);
//     };
//     React.useEffect(() => {
//        const results = people.filter(person =>
//          person.toLowerCase().includes(searchTerm)
//        );
//        setSearchResults(results);
//     }, [searchTerm]);
   
//     return (
//         <div className="App">
//             <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={handleChange}
//             />
//             <ul>
//                 {searchResults.map(item => (
//                 <li>{item}</li>
//             ))}
//             </ul>
//         </div>
//     );
// }


// //Saving Friends once you find them
// const Connecting = () => {
//     const [email] = useState([])

// }

const Connecting = () => {
//     const [name, email] = useStoreContext();
  
//     const getFriends = () => {
//       dispatch({ type: LOADING });
//       dispatch({ type: UPDATE_FAVORITES });
//     };
  
//     const removeFromFriends = id => {
//       dispatch({
//         type: REMOVE_FRIEND,
//         _id: id
//       });
//     };
  
//     useEffect(() => {
//       getFriends();
//     }, []);
  
    return (
        <SearchField/>
//       <div className="container mb-5 mt-5">
//         <h1 className="text-center">Here's All of Your Friends</h1>
//         {state.friends.length ? (
//           <List>
//             <h3 className="mb-5 mt-5">Click on a post to view in detail</h3>
//             {state.friends.map(post => (
//               <ListItem key={post._id}>
//                 <Link to={"/posts/" + post._id}>
//                   <strong>
//                     {post.title} by {post.author}
//                   </strong>
//                 </Link>
//                 <DeleteBtn onClick={() => removeFromFriends(post._id)} />
//               </ListItem>
//             ))}
//           </List>
//         ) : (
//           <h3>You haven't added any friends yet!</h3>
//         )}
//         <div className="mt-5">
//           <Link to="home">Back to home</Link>
//         </div>
//       </div>
    );
  };
  
export default Connecting;