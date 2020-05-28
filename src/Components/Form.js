import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Divider } from "@material-ui/core";
import { useAuth0 } from "../react-auth0-spa";
import Profile from "./Profile";



export default function Form() {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

return(
    <form>
        <Grid container spacing={2}>
            <Grid item sm={12}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
                    <Grid item>
                        <img src={user.picture} alt="Profile" />
                    </Grid>
                    <Typography>Welcome {user.name}</Typography>
                    <Divider/>
                    <Grid item>
                        <Typography>
                            We require certain details that we weren't able to gather. Kindly provide us with the following details
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="CNIC Number" helperText="Enter your Computerized National Identity Card Number" variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="First Name"  variant="outlined" defaultValue={JSON.parse(JSON.stringify(user.given_name))}/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Last Name" variant="outlined" defaultValue={JSON.parse(JSON.stringify(user.family_name))}/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Sex"  variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Date of Birth"  variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Email"  variant="outlined" defaultValue={JSON.parse(JSON.stringify(user.email))}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
</form>
);
}
