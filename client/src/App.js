import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './components/Login/Login';


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
      </Switch>
    </div>
    </Router >
  );
}

export default App;
