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
import Chip from "@material-ui/core/Chip";
const axios = require('axios');


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [myRecord, setMyRec] = React.useState([]);
    let x = false;

    const handleClose = () => {
        onClose(selectedValue);
    };

    console.log(props.selectedRecord.mrn);

    useEffect(async () => {
        console.log("in useEffect EMedDialog");

            const fetchRecord = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'healthRecord/'
                + props.selectedRecord.mrn);
            console.log(fetchRecord.data);
            if(myRecord.verified === 'true'){
                x = true;
            }
            setMyRec(fetchRecord.data);

    }, []);

    console.log(myRecord);


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <Paper variant="outlined" elevation={3} >
            <DialogTitle id="simple-dialog-title">
                { x ? <VerifiedUserIcon/>:<div></div> }
                Medical Record Number {myRecord.mrn}
            </DialogTitle>
            <DialogContent>
                <Grid container direction='row' justify="center" spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='h5' style={{backgroundColor:'#0B3948',color:'#FFFFFF'}}>Vitals</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Body Temperature</h3>
                        {/*<Typography variant="body1" gutterBottom>{myRecord.bt}</Typography>*/}
                        <Chip label={myRecord.bt} variant="outlined"/>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Blood Pressure</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.bp}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Heart Rate</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.hr}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Respiratory Rate</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.rr}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' style={{backgroundColor:'#0B3948',color:'#FFFFFF'}}>&nbsp;&nbsp;History</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Medical History</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.history}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Medication History</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.meds}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Allergies</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.allergies}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Social History</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.history}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' style={{backgroundColor:'#0B3948',color:'#FFFFFF'}}>
                            &nbsp;&nbsp;
                            Summary</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Final Assessment</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.assessment}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Plan of Action</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.plan}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Extra Notes</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.extra}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Labs Prescribed</h3>
                        <Typography variant="body1" gutterBottom>{myRecord.labs}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            </Paper>
        </Dialog>
    );
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
