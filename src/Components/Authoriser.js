import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Form from './Form';

const Authoriser = () => {
    const { loading, user } = useAuth0();


    if (loading || !user) {
        return <div>Loading...</div>;
    }


return(
        <div>
            <Form loading={loading} user={user}/>
        </div>
    )

};

export default Authoriser;
