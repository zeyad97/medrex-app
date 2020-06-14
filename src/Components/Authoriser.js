import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Intro from "./Intro";

const Authoriser = () => {
    const { loading, user } = useAuth0();
    const { isAuthenticated, logout } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }


return(
        <div>
            {/*<Form loading={loading} user={user} isAuth={isAuthenticated} myLogout={logout}/>*/}
            <Intro loading={loading} user={user} isAuth={isAuthenticated} myLogout={logout}/>
        </div>
    )

};

export default Authoriser;
