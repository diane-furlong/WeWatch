import React, { useState, useEffect } from 'react'
import './Connecting.css'
import SearchField from "react-search-field";
import ReactDOM from "react-dom";
import FilterResults from 'react-filter-search';

<SearchField
  placeholder="Search..."
  // onChange={onChange}
  searchText="This is initial search text"
  classNames="test-class"
/>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ''
    };
  }
  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => this.setState({ data: json }));
  }
  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };
  render() {
    const { data, value } = this.state;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <SearchResults
          value={value}
          data={data}
          renderResults={results => (
            <div>
              {results.map(el => (
                <div>
                  <span>{el.name}</span>
                  <span>{el.email}</span>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    );
  }
}
//Getting friends to populate from Search bar

// const FriendSearch = props => (
//     <>
//         <input type="search" onChange={e => props.saveSearchInput(e.target.value)} />
//         <button type="button" onClick={() => props.handleSearch()}>
//             Search
//         </button>
//     </>
// );

// const getFriends = props => {
//   return [' '];
// }

// const MovieList = props => (
//     <ul>
//         {props.foundMovies.map(thisMovie=><li>{thisMovie}</li>)}
//     </ul>
// );

// const App = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [foundMovies, setFoundMovies] = useState([]);

//   const friendSearch = ()=> {
//     if (searchInput == null) return;
//     const foundFriends = getFriends(searchInput);
//     // setFoundFriends(foundFriends);
//   }

//   return (
//     <div>
//   {/* //     <h1 id="title">My Friends</h1>
//   //     <FriendlistSearch saveSearchInput={setSearchInput} handleSearch={friendsSearch} />
//   //     <FriendList foundFriends={foundFriends} /> */}
//   //   </div>
//   )
// }


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