import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
    Grid,
    Typography,
    Divider,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    CircularProgress
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import Home from "./Home";
const axios = require('axios');



class Form extends React.Component {
    constructor() {
        super();
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
            address: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleRadioTextChange = this.handleRadioTextChange.bind(this);
        this.handleBloodGroupChange = this.handleBloodGroupChange.bind(this);
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

    async componentWillMount() {
        const url = 'http://9b941af4a781.ngrok.io/';
        try {
            const responseDoctor = await axios.get(url + this.props.user.sub.substring(9, 25));
            this.setState({present: true});
        } catch (error) {
            console.log("Not a doctor")
            try {
                const responsePatient = await axios.get('http://9b941af4a781.ngrok.io/api/patient/' +
                    this.props.user.sub.substring(9, 25))
                this.setState({present: true});
            } catch (error) {
                console.log("Not a patient, create a new record");
            }

    }}

    componentDidMount() {
        this.setState({Id: this.props.user.sub.substring(9, 25)})
        this.setState({fName: this.props.user.given_name});
        this.setState({lName: this.props.user.family_name});
        this.setState({email: this.props.user.email});
    }

    handleSubmit = async event => {
        console.log(this.state)
        if (this.props.state.type === 'patient') {
            try {
                const createPatient = await axios.post('http://9b941af4a781.ngrok.io/api/patient',
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
                    });
                const response = await axios.get('http://9b941af4a781.ngrok.io/api/patient/' + this.props.user.sub.substring(9, 25))
                console.log(response)
                console.log("patient created")

            } catch (error) {
                console.log("catch of createPatient")
                console.error(error)
            }
        } else {
            try {
                const createDoctor = await axios.post('http://9b941af4a781.ngrok.io/api/doctor',
                    {
                        dId: this.state.Id,
                        cnic: this.state.cnic,
                        fName: this.state.fName,
                        lName: this.state.lName,
                        sex: this.state.sex,
                        dob: this.state.dateOfBirth,
                        email: this.state.email
                    });
                const response = await axios.get('http://9b941af4a781.ngrok.io/api/doctor/' + this.props.user.sub.substring(9, 25))
                console.log(response)
                console.log("doc created")
            } catch (error) {
                console.error(error)
                console.log("catch of createDoc")
            }
        }
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

        if(this.state.type != 'patient' ){
            bloodGroupForm = <div></div>;
            addressForm = <div></div>;
        }
        if(!this.state.present){
            if (!(this.props.loading) || !(this.props.user)) {
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
                                                views={["year", "month", "date"]}
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
                return(
                <div>
                    <CircularProgress/>
                </div>)
            }
        }
        else{
            return(
                <div>
                    <Home/>
                </div>
            )
        }
        }

};

export default Form;