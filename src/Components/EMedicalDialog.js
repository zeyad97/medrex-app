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
    const [severity, setSeverity] = React.useState("info");
    const [message, setMessage] = React.useState("");
    let x = false;

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
            if(myRecord.verified === 'true'){
                x = true;
            }
            setMyRec(fetchRecord.data);
        }catch(error){
            setSeverity("error");
            setMessage('Error'+error.status+'has occurred')
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
                    { x ? <VerifiedUserIcon/>:<div></div> }
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
                        { x ? <VerifiedUserIcon/>:<div></div> }
                        Medical Record Number {myRecord.mrn}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container direction='row' justify="center" spacing={1}>
                            <Grid container item>
                                <Grid item xs={12}>
                                    <Typography variant='h5' style={{backgroundColor:'#0B3948',color:'#FFFFFF'}}>
                                        Vitals</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <h3>Body Temperature</h3>
                                    {/*<Typography variant="body1" gutterBottom>{myRecord.bt}</Typography>*/}
                                    <Typography variant="body1" gutterBottom>{myRecord.bt}</Typography>
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
                                    <Typography variant='h5' style={{backgroundColor:'#0B3948',color:'#FFFFFF'}}>
                                        History</Typography>
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
