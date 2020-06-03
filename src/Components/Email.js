import React from 'react';
import emailjs from 'emailjs-com';

// this class is not being used anywhere, the function sendemail and the button have both been 
// copied into PatientView.js. This class is for reference purpose when properly integrating 
class email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor_email:this.props.docId,
            mrn:this.props.m,
            doctor_name:this.props.docId,
            patient_name:this.props.docId
        }
    }

    sendGrantAccessEmail() {
    
        var template_params = {
            //"doctor_email":{this.state.doctor_email},
            //"mrn":{this.state.mrn},
            //"doctor_name":{this.state.mrn},
            //"patient_name":{this.state.mrn}
        }
            
        var service_id = "default_service";
        var template_id = "medrex_grant_access";
        // from emailjs website
        var user_id = "user_ST7dldKNwGvYdwcYMbwjg";
        emailjs.send(service_id, template_id, template_params, user_id)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    }
    
    sendRequestAccessEmail() {
    
        var template_params = {
            "patient_email":"",
            "mrn":"",
            "doctor_name":"",
            "patient_name":""
        }
            
        var service_id = "default_service";
        var template_id = "medrex_request_access";
        // from emailjs website
        var user_id = "user_ST7dldKNwGvYdwcYMbwjg";
        emailjs.send(service_id, template_id, template_params, user_id)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    }

    render() {
        return (
            <button 
            className= "sendemail"
            onClick={() => this.sendGrantAccessEmail()}
            >
                {'Send Request Access Email'}
            </button>
        );
    }
}