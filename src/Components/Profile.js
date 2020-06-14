//future profile maker
import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },

}));

export default function Profile(props) {
    const classes = useStyles();
    console.log(props.pic);


    return (
        <div>
            <Grid container direction='column' justify='center' alignContent='center' alignItems='center' spacing={2}>
                    <Grid container  justify='center' alignContent='center' alignItems='center'
                          item xs={12} spacing={0}>
                        <Avatar alt={props.user.fName} src={props.pic} className={classes.large} />
                    </Grid>
                    <Grid container justify='center' alignContent='center' alignItems='center'
                          item xs={12} spacing={0}>
                        <Typography variant="h4" gutterBottom>{props.user.fName} {props.user.lName}</Typography>
                    </Grid>
                </Grid>
            <Grid container justify='center' alignContent='center' alignItems='center' spacing={4}>
                <Grid item xs={12} container  justify='center' alignContent='center' alignItems='center'>
                    <Typography variant="subtitle2" gutterBottom>
                        Your Medrex ID is: {props.user.pId}{props.user.dId}
                    </Typography>
                </Grid>
            </Grid>
                <Grid container direction='row' spacing={5}>
                    <Grid container item xs={6} justify='flex-end' alignContent='flex-end' alignItems='flex-end'>
                        <Typography variant="h6" gutterBottom>CNIC Number:</Typography>
                    </Grid>
                    <Grid container item xs={6} justify='flex-start' alignContent='flex-start' alignItems='flex-start'>
                        <Typography variant="h6" gutterBottom>{props.user.cnic}</Typography>
                    </Grid>
                    <Grid container item xs={6} justify='flex-end' alignContent='flex-end' alignItems='flex-end'>
                        <Typography variant="h6" gutterBottom>Email:</Typography>
                    </Grid>
                    <Grid container item xs={6} justify='flex-start' alignContent='flex-start' alignItems='flex-start'>
                        <Typography variant="h6" gutterBottom>{props.user.email}</Typography>
                    </Grid>
                    <Grid container item xs={6} justify='flex-end' alignContent='flex-end' alignItems='flex-end'>
                        <Typography variant="h6" gutterBottom>Sex:</Typography>
                    </Grid>
                    <Grid container item xs={6} justify='flex-start' alignContent='flex-start' alignItems='flex-start'>
                        <Typography variant="h6" gutterBottom>{props.user.sex}</Typography>
                    </Grid>
                    <Grid container item xs={6} justify='flex-end' alignContent='flex-end' alignItems='flex-end'>
                        <Typography variant="h6" gutterBottom>Date of Birth:</Typography>
                    </Grid>
                    <Grid container item xs={6} justify='flex-start' alignContent='flex-start' alignItems='flex-start'>
                        <Typography variant="h6" gutterBottom>{props.user.dob.substring(0,10)}</Typography>
                    </Grid>
                    {props.user.type === 'patient'?
                        <div>
                            <Grid container item xs={6} justify='flex-end' alignContent='flex-end' alignItems='flex-end'>
                                <Typography variant="h6" gutterBottom>Blood Group:</Typography>
                            </Grid>
                            <Grid container item xs={6} justify='flex-start' alignContent='flex-start' alignItems='flex-start'>
                                <Typography variant="h6" gutterBottom>{props.user.bloodGroup}</Typography>
                            </Grid>
                            <Grid container item xs={6} justify='flex-end' alignContent='flex-end' alignItems='flex-end'>
                                <Typography variant="h6" gutterBottom>Address:</Typography>
                            </Grid>
                            <Grid container item xs={6} justify='flex-start' alignContent='flex-start' alignItems='flex-start'>
                                <Typography variant="h6" gutterBottom>{props.user.address}</Typography>
                            </Grid>
                        </div>
                        :
                        <div></div>}
                </Grid>
        </div>
    );
}
