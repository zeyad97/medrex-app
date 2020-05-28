// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Form from "./Form"

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {isAuthenticated && (
                <span>
        <Link to="/">{Form()}</Link>&nbsp;
                    <Link to="/profile">{Profile()}</Link>
      </span>
            )}
        </div>
    );
};

export default NavBar;
