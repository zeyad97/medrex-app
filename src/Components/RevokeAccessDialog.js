//Used to display medical records in a dialog box
//General Component

import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import RevokeCheckBoxes from "./RevokeCheckBoxes";



function VerySimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    console.log(props);

        if(props.selectedRecord.patient.trustedDocs.length === 0){
            return(<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <Paper variant="outlined" elevation={3} >
                    <DialogTitle id="simple-dialog-title">
                        Revoking Access List
                    </DialogTitle>
                    <DialogContent>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item>
                                <Alert severity="info">There are no doctors that you've given access to</Alert>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Paper>
            </Dialog>)
        }
        else{
            return(<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    <Paper variant="outlined" elevation={3} >
                        <DialogTitle id="simple-dialog-title">
                            Revoking Access List
                        </DialogTitle>
                        <DialogContent>
                            <Alert severity="info">Select the doctors you want to revoke access from</Alert>
                            <Grid container justify='center' alignItems='center'>
                                <Grid item>
                                    <RevokeCheckBoxes doctors={props.selectedRecord.patient} view={props.open}/>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Paper>
                </Dialog>

            )
        }

}


export default function RevokeAccessDialog(props) {
    const [open, setOpen] = React.useState(false);

    console.log(props);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };


    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                View Doctors
            </Button>
            <VerySimpleDialog selectedRecord={props} open={open} onClose={handleClose} />
        </div>
    );
}
