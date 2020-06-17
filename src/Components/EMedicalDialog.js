//Used to display medical records in a dialog box
//General Component

import React, {useEffect} from 'react';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent, Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
const axios = require('axios');



function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [myRecord, setMyRec] = React.useState([]);

    const handleClose = () => {
        onClose(selectedValue);
    };

    console.log(props);

    async function fetchData(myValue){
        console.log("in useEffect EMedDialog");

        try{
            const fetchRecord = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'healthRecord/'
                + myValue,
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });
            console.log(fetchRecord.data);
            setMyRec(fetchRecord.data);
        }catch(error){
            console.log(error);
        }

    }

    useEffect( () => {
        fetchData(props.selectedRecord.mrn);
    }, [props.selectedRecord.mrn]);

    console.log(myRecord);

    if(myRecord.length === 0){
        return(<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <Paper variant="outlined" elevation={3} >
                <DialogTitle id="simple-dialog-title">
                    Medical Record Number {myRecord.mrn}
                </DialogTitle>
                <DialogContent>
                    <Grid container justify='center' alignItems='center'>
                        <Grid item>
                            <Alert severity="error">Record doesn't exist</Alert>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Paper>
        </Dialog>)
    }
    else{
        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <Paper variant="outlined" elevation={3} >
                    <DialogTitle id="simple-dialog-title">
                        Medical Record Number {myRecord.mrn}
                    </DialogTitle>
                    <DialogContent>
                        { myRecord.verified === "true" ? <VerifiedUserIcon/>:<div></div>}
                        <Grid container direction='row' justify="center" spacing={1}>
                            <Grid container item>
                                <Grid item xs={12}>
                                    <Typography variant='h6' gutterBottom={true}>
                                        Vitals</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Body Temperature</Typography>
                                    <p>{myRecord.bt}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Blood Pressure</Typography>
                                    <p>{myRecord.bp}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Heart Rate</Typography>
                                    <p>{myRecord.hr}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Respiratory Rate</Typography>
                                    <p>{myRecord.rr}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' gutterBottom={true}>
                                        History</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Medical History</Typography>
                                    <p>{myRecord.history}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Medication History</Typography>
                                    <p>{myRecord.meds}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Allergies</Typography>
                                    <p>{myRecord.allergies}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Social History</Typography>
                                    <p>{myRecord.shist}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' gutterBottom={true}>
                                        Summary</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Final Assessment</Typography>
                                    <p>{myRecord.assessment}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Plan of Action</Typography>
                                    <p>{myRecord.plan}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Extra Notes</Typography>
                                    <p>{myRecord.extra}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Labs Prescribed</Typography>
                                    <p>{myRecord.labs}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Paper>
            </Dialog>)
    }
}


export default function EMedicalDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };


    return (
        <div>
            <Button color="secondary" onClick={handleClickOpen}>
                View EMR
            </Button>
            <SimpleDialog selectedRecord={props.patientRecord} open={open} onClose={handleClose} />
        </div>
    );
}
