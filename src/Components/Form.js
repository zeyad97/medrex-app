//Initial Component
//Patient and Doctor go through this

import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Divider, Select, MenuItem, InputLabel, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import PersistentLeftDrawer from "./PersistentLeftDrawer";
import Skeleton from "@material-ui/lab/Skeleton";
// import history from "../utils/history";
import { withRouter } from 'react-router-dom';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
const axios = require('axios');



class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            present: false,
            Id: '',
            cnic: '',
            fName: '',
            lName: '',
            email: '',
            sex: '',
            dateOfBirth: new Date(),
            type: '',
            bloodGroup: '',
            address: '',
            photoLink: '',
            formDone: false,
            severity:'info',
            message:'Form being processed. Kindly wait.',
            openSnack: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleRadioTextChange = this.handleRadioTextChange.bind(this);
        this.handleBloodGroupChange = this.handleBloodGroupChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleRadioTextChange = (name) => (e) => {
        this.setState({[name]: e.target.value})
    };

    handleBloodGroupChange = e => {
        this.setState({bloodGroup: e.target.value});
    };

    handleDateChange(date) {
        this.setState({dateOfBirth: date});
    };


    componentDidMount() {
        this.setState({Id: this.props.user.sub.substring(9, 25),fName: this.props.user.given_name,
            lName: this.props.user.family_name, photoLink: this.props.user.picture})
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({openSnack:true})
        if (this.state.type === 'patient') {
            try {
                const createPatient = await axios.post(process.env.REACT_APP_NGROK_HTTP + 'patient',
                    {
                        pId: this.state.Id,
                        cnic: this.state.cnic,
                        fName: this.state.fName,
                        lName: this.state.lName,
                        sex: this.state.sex,
                        dob: this.state.dateOfBirth,
                        email: this.state.email,
                        bloodGroup: this.state.bloodGroup,
                        address: this.state.address
                    },
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                          }
                    });
                console.log(createPatient.data.pId);
                if(createPatient.status === 200){
                    this.props.history.push('/dashboard');

                    this.setState({openSnack:false,formDone: true});
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const createDoctor = await axios.post(process.env.REACT_APP_NGROK_HTTP +'doctor',
                    {
                        dId: this.state.Id,
                        cnic: this.state.cnic,
                        fName: this.state.fName,
                        lName: this.state.lName,
                        sex: this.state.sex,
                        dob: this.state.dateOfBirth,
                        email: this.state.email
                    },
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                          }
                    });
                console.log(this.state);
                if(createDoctor.status === 200){
                    this.props.history.push('/dashboard');
                    this.setState({openSnack:false,formDone: true});
                }
                console.log(createDoctor.data.dId);
                console.log("doc created")
            } catch (error) {
                console.error(error)
                console.log("catch of createDoc")
            }
        }
    }
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({openSnack: false});
    }

    render() {
        let bloodGroupForm =
            <Grid item>
            <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.bloodGroup}
                onChange={this.handleBloodGroupChange}>
                <MenuItem value={'A+'}>A+</MenuItem>
                <MenuItem value={'A-'}>A-</MenuItem>
                <MenuItem value={'B+'}>B+</MenuItem>
                <MenuItem value={'B-'}>B-</MenuItem>
                <MenuItem value={'AB+'}>AB+</MenuItem>
                <MenuItem value={'AB-'}>AB-</MenuItem>
                <MenuItem value={'O+'}>O+</MenuItem>
                <MenuItem value={'O-'}>O-</MenuItem>
            </Select>
        </Grid>;

        let addressForm = <Grid item>
            <TextField
                id="standard-multiline-flexible"
                label="Address"
                multiline
                rowsMax={5}
                value={this.state.address}
                onChange={this.handleRadioTextChange('address')}
            />
        </Grid>;

        if(this.state.type !== 'patient' ){
            bloodGroupForm = <div></div>;
            addressForm = <div></div>;
        }
        if(!(this.props.loading) || !(this.props.user)){
            if (!(this.state.present)) {
                if(!(this.state.formDone)){
                    return (
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
                                        <Grid item>
                                            <img src={this.props.user.picture} alt="Profile"/>
                                        </Grid>
                                        <Grid>
                                            <Typography>Welcome {this.props.user.name}</Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography>Your identity code
                                                is {this.props.user.sub.substring(9, 25)}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                We require certain details that we weren't able to gather. Kindly provide us
                                                with the following details
                                            </Typography>
                                            <Divider/>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="outlined-name"
                                                label="CNIC"
                                                value={this.state.cnic}
                                                onChange={this.handleRadioTextChange("cnic")}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="outlined-name"
                                                label="First Name"
                                                value={this.state.fName}
                                                onChange={this.handleRadioTextChange('fName')}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="outlined-name"
                                                label="Last Name"
                                                value={this.state.lName}
                                                onChange={this.handleRadioTextChange('lName')}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="outlined-name"
                                                label="Email"
                                                value={this.state.email}
                                                onChange={this.handleRadioTextChange('email')}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    disableFuture openTo="year"
                                                    format="MM/dd/yyyy"
                                                    label="Date of birth"
                                                    views={["month", "date", "year"]}
                                                    value={this.state.dateOfBirth}
                                                    onChange={this.handleDateChange}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Gender</FormLabel>
                                                <RadioGroup row aria-label="gender" name="gender1" value={this.state.sex}
                                                            onChange={this.handleRadioTextChange('sex')}>
                                                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                                    <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl component="fieldset1">
                                                <FormLabel component="legend1">Gender</FormLabel>
                                                <RadioGroup row aria-label="type" name="type1" value={this.state.type}
                                                            onChange={this.handleRadioTextChange('type')}>
                                                    <FormControlLabel value="doctor" control={<Radio/>} label="Doctor"/>
                                                    <FormControlLabel value="patient" control={<Radio/>} label="Patient"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        {bloodGroupForm}
                                        {addressForm}
                                        <Grid item>
                                            <Button variant='contained' color='secondary' input
                                                    type="submit" value="Submit">
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                                      open={this.state.openSnack} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity={this.state.severity}>
                                    {this.state.message}
                                </Alert>
                            </Snackbar>
                        </form>
                    )
                }
                else{
                    return(
                        <div>

                        </div>
                    )
                }
            } else {
                return (<PersistentLeftDrawer participant={this.state}/>);
            }
        }
        else{
            return(
                <div>
                    <Skeleton variant="rect" width={210} height={118} />
                </div>
            )
        }
        }
};
export default withRouter(Form);
