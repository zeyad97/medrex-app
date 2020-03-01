import React from 'react';
import './App.css';
import Home from "./Components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignInSide from "./Components/SignInSide";
import MedicalRecords from "./Components/MedicalRecords";

function App() {
  return (<Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <SignInSide />
        </Route>
        <Route exact path="/medical-records">
          <MedicalRecords />
        </Route>
        <Route exact path="patient">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>)
  ;
}

export default App;