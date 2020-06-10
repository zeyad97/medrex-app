//used to display EMRs of a particular patient after a doctor searches for a patient
//doctor only component

import React, {useEffect, useState } from 'react';
import Form from "./Form";
import PersistentLeftDrawer from "./PersistentLeftDrawer";
import {CircularProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


export default function Intro(props) {
    const [testForm, loadForm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async function fetchData(myValue){
        try {
            const docData = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + myValue,
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });
            let dataToAdd = docData.data
            setLoading(true);
        }catch (error) {
            try {
                const patData = await axios.get(process.env.REACT_APP_NGROK_HTTP +'patient/' + myValue,
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                        }
                    })
                let dataToAdd = patData.data;
                setLoading(true);
            } catch (error) {
                loadForm(true);
                setLoading(true);
            }
        }
    }

    const classes = useStyles();

    useEffect( () => {
        fetchData(props.user.sub.substring(9, 25));
    }, [props.user.sub.substring(9, 25)]);

    if(loading){return (
        testForm ? <div>
                    <Form loading={props.loading} user={props.user}
                          isAuth={props.isAuthenticated} myLogout={props.logout}/>
                </div>
                :
        <PersistentLeftDrawer someGuy={props.user}/>
    );
}
    else{
    return(
        <div>
            <Grid container alignItems='center' justify='center'>
                <Grid item xs={12}>
                    <Backdrop className={classes.backdrop} open={!loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Grid>
            </Grid>

        </div>
    ) }
}
