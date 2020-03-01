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
import {Avatar, Button, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import PersonIcon from "@material-ui/core/SvgIcon";
import FileCopyIcon from "@material-ui/core/SvgIcon";

const CustomSearch = styled(TextField)`
  width: 100%;
`;

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 50px;
`;

const CustomFont = styled.section`
  font-size: 1.5em;
  height: 100%;
`;

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}


export default function DoctorView() {

    return(
        <Grid container spacing={2} m={2}>
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
            <Grid item md={3} xs={12}>
                <div>
                    <Card>
                        <CardContent>
                            <CustomIcon icon={faUser} />
                            Number
                            <CustomFont>Registered Patients</CustomFont>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item md={3} xs={12}>
                <div>
                    <Card>
                        <CardContent>
                            <CustomIcon icon={faUserMd} />
                            Number
                            <CustomFont>Registered Doctors</CustomFont>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item md={3} xs={12}>
                <div>
                    <Card>
                        <CardContent>
                            <CustomIcon icon={faFileMedicalAlt} />
                            Number
                            <CustomFont>Total Transactions</CustomFont>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item md={3} xs={12}>
                <div>
                    <Card>
                        <CardContent>
                            <CustomIcon icon={faNotesMedical} />
                            Number
                            <CustomFont>Total EMRs</CustomFont>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid container justify="space-evenly">
                <Grid item md={5} xs={12}>
                    <Card>
                        <CardContent>
                            <h3>Patients that trust you</h3>
                            <div>
                                <List>
                                    {generate(
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Patient Name" secondary="Access Granted: Jan 9, 2014"/>
                                            <ListItemSecondaryAction>
                                                <Button variant="contained" color="primary">
                                                    View Record
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>

                                    )}
                                </List>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={5} xs={12}>
                    <Card>
                        <CardContent>
                            <h3>Your medical files</h3>
                            <div>
                                <List>
                                    {generate(
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FileCopyIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Patient Name" secondary="EMR Number"/>
                                            <ListItemSecondaryAction>
                                                <Button variant="contained" color="primary">
                                                    View File
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )}
                                </List>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}