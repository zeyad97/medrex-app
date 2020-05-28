import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Divider } from "@material-ui/core";
import Profile from "./Profile";


export default function Form() {

return(
    <form>
        <Grid container spacing={2}>
            <Grid item sm={12}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
                    <Grid item>
                        <Typography>
                            We require certain details that we weren't able to gather. Kindly provide us with the following details
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="CNIC" variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="First Name" variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Last Name"  variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Sex"  variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Date of Birth"  variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField required id="outlined-required" label="Email"  variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <Profile/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </form>
);
}
