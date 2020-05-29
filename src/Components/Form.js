import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import { useAuth0 } from "../react-auth0-spa";




export default function Form() {


//user data retrieval
    const { loading, user } = useAuth0();
// form data
    const [ cnic, setCnic ] = useState('');
    const [ firstName, setFname ] = useState('');
    const [ lastName, setLname ] = useState('');
    const [ dateOfBirth, setDateOfBirth ] = useState(new Date());
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('');
    const [type, setType] = useState('');

    let handleSubmit;
    handleSubmit = event => {
        event.preventDefault();
        alert(`User Created!
         Name: ${firstName} ${lastName}
         DoB: ${dateOfBirth}
         Email: ${email}
         Sex: ${sex}
         Type: ${type}`);
    }

    if (!(loading || !user)) {
        return (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
                            <Grid item>
                                <img src={user.picture} alt="Profile"/>
                            </Grid>
                            <Typography>Welcome {user.name}</Typography>
                            <Divider/>
                            <Grid item>
                                <Typography>
                                    We require certain details that we weren't able to gather. Kindly provide us with
                                    the following details
                                </Typography>
                                <Divider/>
                            </Grid>
                            <Grid item>
                                <TextField required id="outlined" inputMode='numeric' label="CNIC Number"
                                           helperText="Enter your Computerized National Identity Card Number"
                                           variant="outlined" value={cnic} onChange={(e) => setCnic(e.target.value)}/>
                            </Grid>
                            <Grid item>
                                <TextField required id="outlined" inputMode='text' label="First Name" variant="outlined"
                                           value={JSON.parse(JSON.stringify(user.given_name))} onChange={(e) => setFname(e.target.value)}/>
                            </Grid>
                            <Grid item>
                                <TextField required id="outlined" inputMode='text' label="Last Name" variant="outlined"
                                           value={JSON.parse(JSON.stringify(user.family_name))} onChange={(e) => setLname(e.target.value)}/>
                            </Grid>
                            <Grid item>
                                <TextField required id="outlined" inputMode="email" label="Email"
                                           variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </Grid>
                            <Grid item>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker disableFuture openTo="year" format="MM/dd/yyyy" label="Date of birth" views={["year", "month", "date"]} value={dateOfBirth} onChange={setDateOfBirth}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Sex</FormLabel>
                                    <RadioGroup row aria-label="sex" name="sex1" value={sex}
                                                onChange={(e) => setSex(e.target.value)}>
                                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl component="fieldset1">
                                    <FormLabel component="legend1">Participant Type</FormLabel>
                                    <RadioGroup row aria-label="type" name="type1" value={type}
                                                onChange={(e) => setType(e.target.value)}>
                                        <FormControlLabel value="doctor" control={<Radio/>} label="Doctor"/>
                                        <FormControlLabel value="patient" control={<Radio/>} label="Patient"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button input type="submit" value="Submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    } else {
        return <div>Loading...</div>;
    }
}
