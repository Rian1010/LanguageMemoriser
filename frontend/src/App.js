
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './Navbar.js';
import KoreanUserList from './KoreanUserList';
import CovidData from './CovidData';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <KoreanUserList />
          </Route>
          <Route exact path="/covid-19-data">
            <Navbar />
            <CovidData />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

