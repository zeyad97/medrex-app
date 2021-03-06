//EMR maker form in a dialog box
//Doctor Component

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import {Divider} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
const axios = require('axios');

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [form,setValues] = React.useState(
        {type:'',bt:'',bp:'',hr:'',rr:'',
            hist:'',meds:'',allerg:'',shist:'',
        ass:'',plan:'',extra:'',labs:''});
    const [openSnack, setSnack] = useState(false);
    const [severity, setSeverity] = React.useState("info");
    const [message, setMessage] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnack(false);
    }

    function randomNumber() {
        return new Date().valueOf();
    }


    console.log(props);
    const handleSubmit = async(event) => {
        setSnack(true);
        setMessage("Submitting Form kindly wait.")
        event.preventDefault();
        const myDate = new Date();
        let y = randomNumber().toString();
        try{
            const addRecordReq = await axios.post(process.env.REACT_APP_NGROK_HTTP + "/healthRecord", {
                    $class: "org.medrex.basic.healthRecord",
                    mrn: y,
                    owner: "resource:org.medrex.basic.patient#"+ props.patientMy[0].patId,
                    maker: "resource:org.medrex.basic.doctor#"+ props.doctorMy.doctor.dId,
                    date: myDate,
                    history: form.hist,
                    meds: form.meds,
                    allergies: form.allerg,
                    shist: form.shist,
                    bt: form.bt,
                    bp: form.bp,
                    hr: form.hr,
                    rr: form.rr,
                    extra: form.extra,
                    labs: form.labs,
                    assessment: form.ass,
                    plan: form.plan,
                    type: form.type,
                    trustedDocs: [],
                    requestDocs: []
                },
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                } )
            console.log(addRecordReq);
            setSnack(false);
            setSeverity('success');
            setSnack(true);
            setMessage('EMR '+y+' has been added.');
        }
        catch(error){
            setSnack(false);
            setSeverity('error');
            setSnack(true);
            setMessage('EMR has not been added.'+error.status);
        }
        setOpen(false);
    }

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    console.log(severity);
    console.log(message);
    console.log(openSnack);
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                + Add a Record
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Medical Record Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kindly fill the following form and submit it to add a new record.
                    </DialogContentText>
                        <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <h3>Record Type</h3>
                            </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <RadioGroup row aria-label="gender" name="type" value={form.type} onChange={updateField}>
                                            <FormControlLabel value="OPD" control={<Radio />} label="OutPatient Department" />
                                            <FormControlLabel value="IPD" control={<Radio />} label="InPatient Department" />
                                            <FormControlLabel value="Emergency" control={<Radio />} label="Emergency" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <h3>Vitals</h3>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField required value={form.bt} onChange={updateField} name="bt"
                                               label="Body Temp." id="filled-required" variant="outlined"/>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField required value={form.bp} onChange={updateField} name="bp"
                                               id="filled-required" label="Blood Pres." variant="outlined"/>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField required value={form.hr} onChange={updateField} name="hr"
                                               id="filled-required"
                                               label="Heart Rate" variant="outlined"/>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField required value={form.rr} onChange={updateField} name="rr" id="filled-required"
                                               label="Resp. Rate" variant="outlined"/>
                                </Grid>
                            <Divider/>
                                <Grid item xs={12}>
                                    <h3>History</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required id="filled-multiline-static" label="Medical History"
                                        value={form.hist} onChange={updateField} name="hist"
                                        multiline rows={4} variant="outlined"/>
                                </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required id="filled-multiline-static" label="Medications"
                                    value={form.meds} onChange={updateField} name="meds"
                                    multiline rows={4} variant="outlined"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required id="filled-multiline-static" label="Allergies"
                                    value={form.allerg} onChange={updateField} name="allerg"
                                    multiline rows={4} variant="outlined"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required id="filled-multiline-static" label="Social History"
                                    value={form.shist} onChange={updateField} name="shist"
                                    multiline rows={4} variant="outlined"/>
                            </Grid>
                            <Divider/>
                            <Grid item xs={12}>
                                <h3>Summary</h3>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required id="filled-multiline-static" label="Final Assessment"
                                    value={form.ass} onChange={updateField} name="ass"
                                    multiline rows={4} variant="outlined"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required id="filled-multiline-static" label="Plan of Action"
                                    multiline rows={4} value={form.plan} onChange={updateField} name="plan"
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required id="filled-multiline-static" label="Extra Notes"
                                    multiline rows={4} value={form.extra} onChange={updateField} name="extra"
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required id="filled-multiline-static" label="Labs Prescribed"
                                    multiline rows={4} value={form.labs} onChange={updateField} name="labs"
                                    variant="outlined"/>
                            </Grid>
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color="secondary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant='contained' type="submit">
                        Submit record
                    </Button>
                    {/*<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}}*/}
                    {/*          open={openSnack} autoHideDuration={6000} onClose={handleSnack}>*/}
                    {/*    <Alert onClose={handleSnack} severity={severity}>*/}
                    {/*        {message}*/}
                    {/*    </Alert>*/}
                    {/*</Snackbar>*/}
                </DialogActions>
                </form>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                      open={openSnack} autoHideDuration={6000} onClose={handleSnack}>
                <Alert onClose={handleSnack} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
