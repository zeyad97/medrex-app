import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Authoriser from "./Profile";

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
