import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {Button} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default (props) => {
    const classes = useStyles();
    const [isSelected, setSelected] = React.useState([]);
    const [openSnack, setSnack] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info')

    const handleChange = (event,id) => {
        let newSelected = isSelected.slice(0);
        if (newSelected.includes(id)){
            const index = newSelected.indexOf(id);
            if (index > -1){
                newSelected.splice(index, 1);
            }
        }else
        {
            newSelected.push(id);
        }
        setSelected(newSelected);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnack(false);
    }
    console.log(props.doctors.mrn)


    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(isSelected);
        let i;
        try{
        for(i=0; i<isSelected.length; i++){
            let doctorToRevoke = isSelected[i];
            console.log(doctorToRevoke);
            setSnack(true);
            setMessage("Revoking access. Kindly wait.")
                const revokeDoctor = await axios.post(process.env.REACT_APP_NGROK_HTTP + 'revokeAccess',
                    {
                        $class: "org.medrex.basic.revokeAccess",
                        record: "resource:org.medrex.basic.healthRecord#"+ props.doctors.mrn,
                        trusted: "resource:org.medrex.basic.doctor#"+doctorToRevoke,
                        transactionId: "",
                        timestamp: new Date()
                    },
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                        }
                    } );}
                setSeverity('success');
                setSnack(true);
                setMessage("Revoked access");
            }catch(error){
                console.log(error);
                setSnack(false);
                setSnack(true);
                setMessage("There seems to be an error.")
            }
        }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Doctors</FormLabel>
                    <FormGroup>
                        {props.doctors.trustedDocs.map((doctor,countValue)=> {
                            const isChecked = isSelected.includes(doctor.id);
                                return(
                                countValue === 0 ?
                                    <FormControlLabel
                                        control={<Checkbox checked={isChecked}
                                                           onChange={(event) => handleChange(event,doctor.id)}
                                                           name={doctor.name} />}
                                        label={doctor.name} disabled={true}
                                    />:
                                    <FormControlLabel
                                        control={<Checkbox checked={isChecked}
                                                           onChange={(event) => handleChange(event,doctor.id)}
                                                           name={doctor.name} />}
                                        label={doctor.name}
                                    />
                            )
                        }
                        )}
                    </FormGroup>
                    <FormHelperText>You cannot revoke access from owner</FormHelperText>
                    <Button color="secondary" variant='contained' type="submit">
                        Revoke Access
                    </Button>
                </FormControl>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                          open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>

            </form>
        </div>
    );
}
