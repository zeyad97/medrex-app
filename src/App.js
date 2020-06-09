// src/App.js

import React from "react";
import NavBar from "./Components/NavBar";
import {Router, Route, Switch, BrowserRouter} from "react-router-dom";
import history from "./utils/history";
import PrivateRoute from "./Components/PrivateRoute";
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Authoriser from "./Components/Authoriser";
import PersistentLeftDrawer from "./Components/PersistentLeftDrawer";


function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter history={history}>
                    <header>
                        <NavBar />
                    </header>
                    <Switch>
                        <Route path="/" exact />
                        <Route path="/login" component={NavBar} />
                        {/*<Route path="/dashboard" component={PersistentLeftDrawer}/>*/}
                        <Route
                            path='/dashboard'
                            render={(props) => <PersistentLeftDrawer {...props} participant={this.state} />}
                        />
                        <PrivateRoute path="/authoriser" component={Authoriser} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
