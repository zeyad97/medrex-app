import React, {Fragment} from 'react';
import Profile from "./Profile";
import Form from "./Form";
import { useAuth0 } from "../react-auth0-spa";

export default function Dashboard() {

    const { loading, user } = useAuth0();

    return(
        <Fragment>
            <Profile user={user} loading={loading} />
            <Form user={user} />
        </Fragment>
    );
}
