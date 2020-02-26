import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from "styled-components";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {
    faFileMedicalAlt,
    faNotesMedical,
    faUser,
    faUserMd
} from '@fortawesome/free-solid-svg-icons';

const CustomSearch = styled(TextField)`
  width: 100%;
`;

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 100px;
`;

const CustomFont = styled.section`
  font-size: 1.5em;
  height: 100%;
`;


export default function DoctorView() {

    return(
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Looking for a patient?
                        </Typography>
                        <CustomSearch
                            id="input-with-icon-textfield"
                            label="Enter valid ID or name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid container justify="space-around" spacing={4} style={{marginTop: 20}}>
                <Grid item md={4} xs={12}>
                    <Card >
                        <CardContent>
                            <Grid container direction="row" justify="space-evenly">
                                <Grid item xs={6}><CustomIcon icon={faUser} /></Grid>
                                <Grid item xs={6}><CustomFont>Registered Patients</CustomFont></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card >
                        <CardContent>
                            <Grid container direction="row">
                                <Grid item xs={6}><CustomIcon icon={faUserMd} /></Grid>
                                <Grid item xs={6}><CustomFont>Registered Doctors</CustomFont></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container justify="space-around" spacing={4} style={{marginTop: 20}}>
                <Grid item md={4} xs={12}>
                    <Card >
                        <CardContent>
                            <Grid container direction="row">
                                <Grid item xs={6}><CustomIcon icon={faNotesMedical} /></Grid>
                                <Grid item xs={6}><CustomFont>Number of Transactions</CustomFont></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card >
                        <CardContent>
                            <Grid container direction="row">
                                <Grid item xs={6}><CustomIcon icon={faFileMedicalAlt} /></Grid>
                                <Grid item xs={6}><CustomFont>Number of Medical Records</CustomFont></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}