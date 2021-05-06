import React, {useState, useEffect} from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Platform from './pages/Platform/Platform';
import Watching from './pages/Watching/Watching';
import Connecting from './pages/Connecting/Connecting'
import Friend from './pages/Connecting/Friend'
import FriendsList from './pages/Connecting/FriendsList'
import Footer from './components/Footer/Footer'
import axios from 'axios'
import UserContext from './context/userContext'
import SearchUsers from './pages/SearchUsers/SearchUsers'

// require('dotenv').config()

function App() {

  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
    });
    useEffect(() => {
    const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if(token === null){
    // localStorage.setItem("auth-token", "");
    token = "";
    }
    const tokenResponse = await axios.post('http://localhost:3000/api/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
    if (tokenResponse.data) {
    const userRes = await axios.get("http://localhost:3000/api/users/", {
    headers: { "x-auth-token": token },
    });
    setUserData({
    token,
    user: userRes.data,
    });
    }
    }
    checkLoggedIn();
    }, []);

  return (
    <Router>
      
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/register">
        <Register />
          </Route>
        <Route exact path="/login">
        <Login />
        </Route>
        <Route exact path="/Platform">
          <Platform/>
        </Route>  
        <Route exact path="/Watching">
          <Watching/>
        </Route>
        <Route exact path="/Connecting">
          <Connecting/>
        </Route>
        <Route exact path="/Friend">
          <Friend/>
        </Route>
        <Route exact path="/FriendsList">
          <FriendsList/>
        </Route>
        <Route exact path="/SearchUsers">
          <SearchUsers/>
        </Route>
      </Switch>
      <Footer />
      </UserContext.Provider>
    </div>
    </Router >
  );
}

export default App;
