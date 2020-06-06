import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import {Divider} from "@material-ui/core";
const axios = require('axios');

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [form,setValues] = React.useState(
        {bt:'',bp:'',hr:'',rr:'',
            hist:'',meds:'',allerg:'',shist:'',
        ass:'',plan:'',extra:'',labs:''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function randomNumber() {
        return new Date().valueOf();
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(form);
        const myDate = new Date();
        console.log(myDate);
        const url =  "http://eb9f85ab69f0.ngrok.io/api"
        var y = randomNumber();
        console.log(y);
        try{
            const addRecordReq = await axios.post(url + "/healthRecord", {
                $class: "org.medrex.basic.healthRecord",
                mrn: y,
                owner: "resource: org.medrex.basic.patient#"+ props.patientMy[0].patId,
                maker: "resource: org.medrex.basic.doctor#"+ props.doctorMy.Id,
                date: myDate,
                history: form.hist,
                meds: form.meds,
                allergies: form.meds,
                shist: form.shist,
                bt: form.bt,
                bp: form.bp,
                hr: form.hr,
                rr: form.rr,
                extra: form.extra,
                labs: form.extra,
                assessment: form.ass,
                plan: form.plan,
                type: form.type,
                trustedDocs: [],
                requestDocs: []
            } )
            console.log(addRecordReq);
        }catch(error){
            console.log(error)
        }
        setOpen(false);
    };

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Submit record
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
