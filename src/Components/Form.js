import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Divider, Select, MenuItem, InputLabel, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
const axios = require('axios');



class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            cnic: '',
            fName: '',
            lName: '',
            email: '',
            sex: '',
            dateOfBirth: '',
            type: '',
            bloodGroup: '',
            address: ''
        };
        this.handleCnicChange = this.handleCnicChange.bind(this);
        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleBloodGroupChange = this.handleBloodGroupChange.bind(this);
        this.handleAddressChange= this.handleAddressChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleCnicChange = e => {
        this.setState({ cnic: e.target.value });
    };

    handleFNameChange = e => {
        this.setState({ fName: e.target.value });
    };

    handleLNameChange = e => {
        this.setState({ lName: e.target.value });
    };

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    handleSexChange = e => {
        this.setState({ sex: e.target.value });
    };

    handleDateChange(date) {
        this.setState({dateOfBirth: date});
    };

    handleTypeChange = e => {
        this.setState({ type: e.target.value });
    };

    handleBloodGroupChange = e => {
        this.setState({ bloodGroup: e.target.value });
    };

    handleAddressChange = e => {
        this.setState({ address: e.target.value });
    };


    async componentDidMount() {
        try {
            const responseDoctor = await axios.get('https://be627ce3bb5f.ngrok.io/api/doctor/' + this.props.user.sub)
            const responsePatient = await axios.get('https://be627ce3bb5f.ngrok.io/api/patient/' + this.props.user.sub)
            console.log(responseDoctor)
            console.log(responsePatient)
        } catch (error) {
            console.error(error)
        }
    }

    handleSubmit = event => {
        alert(this.state.sex);
        event.preventDefault();
    };


    render() {


        if (!(this.props.loading) || !(this.props.user)) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
                                <Grid item>
                                    <img src={this.props.user.picture} alt="Profile"/>
                                </Grid>
                                <Grid item>
                                    <Typography>Welcome {this.props.user.name}</Typography>
                                    <Typography>Your identity code is {this.props.user.sub}</Typography>
                                    <Divider/>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        We require certain details that we weren't able to gather. Kindly provide us
                                        with
                                        the following details
                                    </Typography>
                                    <Divider/>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-name"
                                        label="CNIC"
                                        value={this.state.cnic}
                                        onChange={this.handleCnicChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-name"
                                        label="First Name"
                                        value={this.state.fName}
                                        onChange={this.handleFNameChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-name"
                                        label="Last Name"
                                        value={this.state.lName}
                                        onChange={this.handleLNameChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-name"
                                        label="Email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            disableFuture openTo="year"
                                            format="MM/dd/yyyy"
                                            label="Date of birth"
                                            views={["year", "month", "date"]}
                                            value={this.state.dateOfBirth}
                                            onChange={this.handleDateChange}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender1" value={this.state.sex} onChange={this.handleSexChange}>
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl component="fieldset1">
                                        <FormLabel component="legend1">Gender</FormLabel>
                                        <RadioGroup row aria-label="type" name="type1" value={this.state.type} onChange={this.handleTypeChange}>
                                            <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
                                            <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.bloodGroup}
                                        onChange={this.handleBloodGroupChange}
                                    >
                                        <MenuItem value={'A+'}>A+</MenuItem>
                                        <MenuItem value={'A-'}>A-</MenuItem>
                                        <MenuItem value={'B+'}>B+</MenuItem>
                                        <MenuItem value={'B-'}>B-</MenuItem>
                                        <MenuItem value={'AB+'}>AB+</MenuItem>
                                        <MenuItem value={'AB-'}>AB-</MenuItem>
                                        <MenuItem value={'O+'}>O+</MenuItem>
                                        <MenuItem value={'O-'}>O-</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Address"
                                        multiline
                                        rowsMax={4}
                                        value={this.state.address}
                                        onChange={this.handleAddressChange}
                                    />
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
            )
        } else {
            return <div>Loading...</div>;
        }
    }
};

export default Form;
