// src/components/Email.js

import React from 'react';
import emailjs from 'emailjs-com';

// this class is not being used anywhere, the function sendemail and the button have both been 
// copied into PatientView.js. This class is for reference purpose when properly integrating 
class email extends React.Component {
    
    sendEmail() {
    
        var template_params = {
            "patient_email": "ramlah.aziz2012@gmail.com",
            "doctor": "Ramlah"
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
            onClick={() => this.sendEmail()}
            >
                {'Send Request Access Email'}
            </button>
        );
    }
}