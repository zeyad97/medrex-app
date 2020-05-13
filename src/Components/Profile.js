// src/components/Profile.js

import React  from "react";
import { useAuth0 } from "../react-auth0-spa";
import Typography from '@material-ui/core/Typography';

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Typography>
            <h2>{user.name}</h2>
        </Typography>
    );
};

export default Profile;
