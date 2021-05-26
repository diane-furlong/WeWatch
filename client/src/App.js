import React, {useState, useEffect} from 'react';
import './App.css';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Platform from './pages/Platform/Platform';
import Watching from './pages/Watching/Watching';
import Footer from './components/Footer/Footer'
import axios from 'axios'
import UserContext from './context/userContext'
import SearchUsers from './pages/SearchUsers/SearchUsers'
import NewsFeed from './pages/NewsFeed/NewsFeed'
import UserProfile from './pages/UserProfile/UserProfile'
import GeneralProfile from './pages/UserProfile/GeneralProfile'
import Nav3 from './components/Nav/Nav3'



// require('dotenv').config()

function App() {

  const [ userData, setUserData ] = useState({
    token: undefined,
    user: undefined
    });
    useEffect(() => {
    const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if(token === null){
    token = "";
    }
    const tokenResponse = await axios.post('http://localhost:3000/api/users/tokenIsValid'||'http://wewatch5000.herokuapp.com/api/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
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
      <Nav3 />
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
        <Route exact path="/SearchUsers">
          <SearchUsers/>
        </Route>
        {/* <Route exact path="/Home">
          <NewsFeed/>
        </Route> */}
        <Route exact path="/Profile">
          <UserProfile/>
        </Route>
        <Route exact path="/Profile/:id">
          <GeneralProfile/>
        </Route>
      </Switch>
      <Footer />
      </UserContext.Provider>
    </div>
    </Router >
  );
}

export default App;
