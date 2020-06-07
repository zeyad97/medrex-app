//Auth0 component which i used to get the login and log out functionalites
//General Component

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Authoriser from "./Authoriser";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
            {isAuthenticated && (<span><Authoriser /></span>)}
        </div>
    );
};

export default NavBar;
