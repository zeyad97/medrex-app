// src/App.js

import React from "react";
import NavBar from "./Components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./Components/Authoriser";
import history from "./utils/history";
import PrivateRoute from "./Components/PrivateRoute";




function App() {
    return (
        <div className="App">
            <Router history={history}>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact />
                    <PrivateRoute path="/profile" component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
