import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Platform from './pages/Platform/Platform'
import Watching from './pages/Watching/Watching'


function App() {
  return (
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
      </Switch>
    </div>
    </Router >
  );
}

export default App;
