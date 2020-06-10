import React, {useEffect, useState} from "react";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";
import DialogForm from "./EMRMakerByDocForm";
import PatientSearchByDocTable from "./PatientSearchByDocTable";


export default function DocAccessTable(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }));

    const classes = useStyles();

    String.prototype.getInitials = function(glue){
        if (typeof glue == "undefined") {
            var glue = true;
        }

        var initials = this.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);

        if (glue) {
            return initials.join('');
        }

        return  initials;
    };

    String.prototype.capitalize = function(){
        return this.toLowerCase().replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
    };


    return (
        <div>
            <h1>Patient Profile</h1>
            <Grid container direction="row" justify="center" spacing={2}>
                <Grid item xs={6}>
                    <Grid container direction="row" alignItems="flex-end" spacing={2}>
                        <Grid item xs={6}>
                            <Avatar className={classes.orange}  children={props.record[0].patName.getInitials()}/>
                        </Grid>
                        <Grid item xs={6} justify='flex-end'>
                            <DialogForm patientMy={props.record} doctorMy={props.doctor}/>
                        </Grid>
                        <Grid item xs={12} direction='column'>
                            <h3>{props.record[0].patName}</h3>
                            <h4>Patient ID: <h5>{props.record[0].patId}</h5></h4>
                            <h4>Sex:<h5>{props.record[0].patSex}</h5></h4>
                            <h4>Date of Birth:<h5>{props.record[0].patAge.substring(0,10)}</h5></h4>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <PatientSearchByDocTable patientDetails={props.record} doctorDetails={props.doctor}/>
                </Grid>
            </Grid>
        </div>
    );
}


