import React, { Component } from 'react';
import { Card, CardContent,
    List, ListItemText, ListItemAvatar, ListItem, ListItemSecondaryAction, Avatar,
    Grid,
    Button,
    Box}
    from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import styled from "styled-components";

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const CustomButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
`;


export default class PatientView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patient: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/patient')
            .then(response => response.json())
            .then(patient => {this.setState({ patient });
                console.log(patient)
            });
    }

    render(){
        return (
            <Grid container justify="space-around" spacing={2}>
                {/*<Grid item md={12}>*/}
                {/*        <Grid container justify="space-evenly" alignItems="center">*/}
                {/*            <Grid item md={2}>*/}
                {/*                <Card>*/}
                {/*                    <CardContent>*/}
                {/*                        */}
                {/*                    </CardContent>*/}
                {/*                </Card>*/}
                {/*            </Grid>*/}
                {/*            <Grid item md={2}>*/}
                {/*                <Card>*/}
                {/*                    <CardContent>*/}
                {/*                        Patient ID: {patient.pId}*/}
                {/*                    </CardContent>*/}
                {/*                </Card>*/}
                {/*            </Grid>*/}
                {/*            <Grid item md={2}>*/}
                {/*                <Card>*/}
                {/*                    <CardContent>*/}
                {/*                        CNIC: {patient.CNIC}*/}
                {/*                    </CardContent>*/}
                {/*                </Card>*/}
                {/*            </Grid>*/}
                {/*        </Grid>)}*/}
                {/*</Grid>*/}
                <Grid item md={6} xs={12}>
                    <Card>
                        <CardContent>
                            <h3>List of Trusted Doctors</h3>
                            <div>
                                <List>
                                    {generate(
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Doctor Name" secondary="Last Accessed: Jan 9, 2014"/>
                                            <ListItemSecondaryAction>
                                                <Button variant="contained" color="secondary">
                                                    Revoke Access
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )}
                                </List>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Card>
                        <CardContent>
                            <h3>Pending Access Requests</h3>
                            <div>
                                <List>
                                    {generate(
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Doctor Name" secondary="Request Sent: Jan 9, 2014"/>
                                            <ListItemSecondaryAction>
                                                <Button variant="contained" color="primary">
                                                    Grant Access
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )}
                                </List>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Box m={2}>
                    <CustomButton variant="contained">View Your Electronic Medical Record</CustomButton>
                </Box>
            </Grid>
        );

    }
}