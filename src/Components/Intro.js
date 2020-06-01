import React from 'react';
import Home from "./Dashboard";
import Form from "./Form";
const axios = require('axios');


class Intro extends React.Component {

    constructor() {
        super();
        this.state = {
            exists: false,
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


    async componentDidMount() {
        const url = 'http://9b941af4a781.ngrok.io/';
        this.setState({Id: this.props.user.sub.substring(9, 25)})
        try {
            const responseDoctor = await axios.get(url + this.props.user.sub.substring(9, 25));
            this.setState({exists: true});
        } catch (error) {
            console.log("Not a doctor")
            try {
                const responsePatient = await axios.get('http://9b941af4a781.ngrok.io/api/patient/' + this.props.user.sub.substring(9, 25))
                this.setState({exists: true});
            } catch (error) {
                console.log("Not a patient, create a new record");
            }
        }
    }

    render() {
        if (this.state.exists) {
            return (
            <div>
                <Home person={this.state}  />
            </div>
        )
        }
        else{
            return(
                <div>
                    <Form user={this.state} handlerOne={this.handleBloodGroupChange} handlerTwo={this.handleDateChange}
                          handlerThree={this.handleRadioTextChange}/>
                </div>
            )
        }
    }

};

export default Intro;
