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
    let x = false;

    const handleClose = () => {
        onClose(selectedValue);
    };

    console.log(props);

    // async function fetchData(myValue){
    //     console.log("in useEffect EMedDialog");
    //
    //     try{
    //         const fetchRecord = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'healthRecord/'
    //             + myValue,
    //             {
    //                 headers: {
    //                     'x-api-key': process.env.REACT_APP_API_KEY
    //                 }
    //             });
    //         console.log(fetchRecord.data);
    //         if(myRecord.verified === 'true'){
    //             x = true;
    //         }
    //         setMyRec(fetchRecord.data);
    //     }catch(error){
    //     }
    //
    // }
    //
    // useEffect( () => {
    //     fetchData(props.selectedRecord.mrn);
    // }, [props.selectedRecord.mrn]);

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
                       <h1>Hello</h1>
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
