//future profile maker
import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


export default function Profile(props) {
    console.log(props);

    return (
        <div>
            <Grid container direction='row' justify="center" alignItems="center" spacing={2}>
                <Grid item xs={4}>
                    <img src={props.user.photoLink} style={{width:'40%',height:'40%'}}/>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h3" component="h2" align='center' gutterBottom>
                        {props.user.fName} {props.user.lName}
                    </Typography>
                    <Typography variant="subtitle1" align='center' gutterBottom>
                        Your Identity is: {props.user.Id}
                    </Typography>
                </Grid>

            <Grid container justify='center' alignItems='center' alignContent='center' spacing={3}>

                <Grid item xs={3}>
                    <Typography variant="h5" gutterBottom>
                        CNIC
                    </Typography>
                    <TextField
                        id="standard-read-only-input"
                        defaultValue={props.user.cnic}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5" gutterBottom>
                        CNIC
                    </Typography>
                    <TextField
                        id="standard-read-only-input"
                        defaultValue={props.user.cnic}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
            </Grid>
                {/*<Grid item xs={6}>*/}
                {/*    <TextField*/}
                {/*        id="standard-read-only-input"*/}
                {/*        label="Read Only"*/}
                {/*        defaultValue={props.user.cnic}*/}
                {/*        InputProps={{*/}
                {/*            readOnly: true,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12}>*/}
                {/*    <Typography variant="body2" align='center' gutterBottom>*/}
                {/*        {props.user.cnic}*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12}>*/}
                {/*    <Typography variant="caption" display="block" align='center' gutterBottom>*/}
                {/*        Date of Birth*/}
                {/*    </Typography>*/}
                {/*    <Typography variant="body2" align='center' gutterBottom>*/}
                {/*        {props.user.dob.substring(0,10)}*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12}>*/}
                {/*    <Typography variant="caption" display="block" align='center' gutterBottom>*/}
                {/*        Sex*/}
                {/*    </Typography>*/}
                {/*    <Typography variant="body2" align='center' gutterBottom>*/}
                {/*        {props.user.sex}*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12}>*/}
                {/*    <Typography variant="caption" display="block" align='center' gutterBottom>*/}
                {/*        Email*/}
                {/*    </Typography>*/}
                {/*    <Typography variant="body2" align='center' gutterBottom>*/}
                {/*        {props.user.email}*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
                {/*{props.user.type === 'patient'?*/}
                {/*<div>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Typography variant="caption" display="block" align='center' gutterBottom>*/}
                {/*            Blood Group*/}
                {/*        </Typography>*/}
                {/*        <Typography variant="body2" align='center' gutterBottom>*/}
                {/*            {props.user.bloodGroup}*/}
                {/*        </Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Typography variant="caption" display="block" align='center' gutterBottom>*/}
                {/*            Address*/}
                {/*        </Typography>*/}
                {/*        <Typography variant="body2" align='center' gutterBottom>*/}
                {/*            {props.user.address}*/}
                {/*        </Typography>*/}
                {/*    </Grid>*/}
                {/*</div>:<div/>}*/}
        </div>
    );
}
