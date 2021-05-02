import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Platform from './pages/Platform/Platform'
import Watching from './pages/Watching/Watching'
import { Provider } from 'react-redux';
import store from './store'
// import { Container } from '@material-ui/core';
import useStyles from './styles';
import Connecting from './pages/Connecting/Connecting'
import Friend from './pages/Connecting/Friend'
import FriendsList from './pages/Connecting/FriendsList'
import Footer from './components/Footer/Footer'

require('dotenv').config()



function App() {
  const classes = useStyles();

  return (

    <Provider store={store}>
    <Router>
      
    <div className="App">
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
      </Switch>
      <Footer />
    </div>
    </Router>
    </Provider>
  );
}

export default App;
