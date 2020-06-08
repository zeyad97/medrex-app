// src/App.js

import React from "react";
import NavBar from "./Components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import PrivateRoute from "./Components/PrivateRoute";
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Authoriser from "./Components/Authoriser";


function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router history={history}>
                    <header>
                        <NavBar />
                    </header>
                    <Switch>
                        <Route path="/" exact />
                        <PrivateRoute path="/authoriser" component={Authoriser} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
