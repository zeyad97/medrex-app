//Auth0 component which i used to get the login and log out functionalites
//General Component

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Authoriser from "./Authoriser";
import LandingPage from "./LandingPage";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <LandingPage loginValue={loginWithRedirect}/>
            )}
            {isAuthenticated && (<span><Authoriser /></span>)}
        </div>
    );
};

export default NavBar;
