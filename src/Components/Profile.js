//future profile maker

import React from "react";
const axios = require('axios');

// export default function Profile() {
//
//     return (
//         <Grid container justify="center" alignItems="center" spacing={1}>
//             <Grid item xs={4}>
//                 <Grid container justify="center" alignItems="center" spacing={2}>
//                     <Grid item med={3}>
//                         <Avatar
//                             alt="Remy Sharp"
//                             src="/static/images/avatar/1.jpg"
//                             className={classes.large}
//                         />
//                     </Grid>
//                     <Grid item med={7}>
//                         <Typography variant="h5" component="h2">
//                             Zeyad Ahmed
//                         </Typography>
//                     </Grid>
//                     <Grid med={4}>
//                         <Typography variant="h6" color="textSecondary">
//                             Patient
//                         </Typography>
//                         <Grid />
//                         <Typography variant="body2" component="p">
//                             well meaning and kindly.
//                             <br />
//                             {'"a benevolent smile"'}
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// }

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
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
    }

    async componentWillMount() {
        try {
            const responseDoctor = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'doctor/' + this.props.user.sub.substring(9, 25));
            this.setState({present: true});
            this.setState({Id: responseDoctor.data.dId});
            this.setState({cnic: responseDoctor.data.cnic});
            this.setState({fName: responseDoctor.data.fName});
            this.setState({lName: responseDoctor.data.lName});
            this.setState({email: responseDoctor.data.email});
            this.setState({sex: responseDoctor.data.sex});
            this.setState({dateOfBirth: responseDoctor.data.dob});
            this.setState({type: responseDoctor.data.type});
        } catch (error) {
            console.log("Not a doctor")
            try {
                const responsePatient = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'patient/' + this.props.user.sub.substring(9, 25))
                this.setState({present: true});
                this.setState({Id: responsePatient.data.pId});
                this.setState({cnic: responsePatient.data.cnic});
                this.setState({fName: responsePatient.data.fName});
                this.setState({lName: responsePatient.data.lName});
                this.setState({email: responsePatient.data.email});
                this.setState({sex: responsePatient.data.sex});
                this.setState({dateOfBirth: responsePatient.data.dob});
                this.setState({type: responsePatient.data.type});
                this.setState({bloodGroup: responsePatient.data.bloodGroup});
                this.setState({address: responsePatient.data.address});
            } catch (error) {
                console.log("Not a patient")
            }
        }
    }

    render() {

        if(this.state.present){

        }
        else{
            return(
                <div></div>
            )
        }
    }
}

export default Profile;

