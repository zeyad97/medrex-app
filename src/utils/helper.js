import validator from 'validator';  
function validateForm(check, data) { 
    const {firstName,         lastName,         email,         company,         description     } = data;  
    let errors = {         hasError: false,         errorsObj: {}     }    
    let Validation =
        { firstName:
            { Validate:
                    [
                        { 
                            condition: !firstName.length, 
                            message: " Please Specify First Name", 
                        },
                        {
                            condition: /\d/.test(firstName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(firstName),
                            message: " First Name Can Not Contain Numbers Or Any Special Character . ",
                        }
                        ],
                             elem: "firstName"         },          lastName: {             Validate: [{                 condition: !lastName.length,                 message: " Please Specify Last Name",             }, {                 condition: /\d/.test(lastName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(lastName),                 message: " Last Name Can Not Contain Numbers Or Any Special Character . ",             }             ],             elem: "lastName"         },           email: {             Validate: [{                 condition: !validator.isEmail(email),                 message: " Please Provide A valid Email . ",             }],             elem: "email"         },           company: {             Validate: [{                 condition: company.length < 4,                 message: " Company Cannot Be Less Than 4 Characters . ",             }],             elem: "company"         },           description: {             Validate: [{                 condition: !description.length,                 message: " Please speciffy your current issue.",             }],             elem: "description"         },        }      if (check === "all") {         for (let i in Validation) {             let conArray = Validation[i].Validate;             errors.errorsObj[Validation[i].elem] = { message: [] }             for (let j = 0; j < conArray.length; j++) {                 if (conArray[j].condition) {                     errors.hasError = true                     errors.errorsObj[Validation[i].elem].message.push(conArray[j].message)                 }             }             if (!errors.errorsObj[Validation[i].elem].message.length) {                 delete errors.errorsObj[Validation[i].elem];             }         }     }      return Object.keys(errors).length > 1 ? errors : {         hasError: false     } 
}

export default validateForm ;
