// call with         user={props.participant}
// like         <AccessibleEMRByDocTable /*user={props.participant}*/></AccessibleEMRByDocTable>
//component used to view accessible EMRs by the doctor using the system
//Doctor component


import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {Button} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import EMedicalDialog from "./EMedicalDialog";

class AccessibleEMRByDocTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            loading: true,
        }
        this.click = this.click.bind(this);
    };

    async componentDidMount() {
        try{
            const response = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'queries/returnRecordsAccessibleToDoctor', {
                params: {
                    doctorObject: 'resource:org.medrex.basic.doctor#'+ /*'1349197901937941'/*/ this.props.user.Id
                }
            });
            console.log('axios response:',response);
            let queries=[];
            let queriesNumber = response.data.length;
            let i;
            let OwnerID, makerID, objectString, objectString2, makerName, ownerName;

            for (i=0; i<queriesNumber; i++){

                let varOne = response.data[i];

                //get owner id
                objectString = varOne.owner;
                OwnerID = objectString.substring(34,objectString.length);
                //get maker id
                objectString2 = varOne.maker;
                makerID = objectString2.substring(33,objectString2.length);
                try{
                    const owner =  await axios.get(process.env.REACT_APP_NGROK_HTTP+ 'patient/' + OwnerID
                    + "?filter={\"fields\": [ \"fName\", \"lName\"]}");
                    const maker = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + makerID
                    + "?filter={\"fields\": [ \"fName\", \"lName\"]}");
                    ownerName = owner.data.fName + ' ' + owner.data.lName;
                    makerName = maker.data.fName + ' ' + maker.data.lName;
                } catch(error) {
                    console.log(error);
                }

                console.log(varOne);
                const obj = { owner: ownerName ,maker: makerName, date:varOne.date, mrn: varOne.mrn, medicalType: varOne.type,
                        shortAssess: varOne.assessment};
                queries.push(obj);

            }
            this.setState({requests: queries});
        } catch(error) {
            console.log(error)
        }
        this.setState({loading: false});
    }

    async click(var1) {
        console.log('clicked');
        try {

            try {

            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        console.log("THIS!!")
        console.log(this.state.requests);
        return(
            <div>
                <h1>My Accessible Medical Records</h1>
                {this.state.loading ?
                    <div>
                        <Skeleton variant="text" />
                        <Skeleton variant="rect" height={118}/>
                    </div> :
                    <div>
                        <TableContainer component={Paper}>
                            <Table style={{minWidth:'680'}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Patient</TableCell>
                                        <TableCell align="center">Created by</TableCell>
                                        <TableCell align="center">Created on</TableCell>
                                        <TableCell align="center">MRN</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">Assessment</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.requests.map((row) =>
                                        <TableRow key={row.mrn}>
                                            <TableCell align="center">{row.owner}</TableCell>
                                            <TableCell align="center">{row.maker}</TableCell>
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.mrn}</TableCell>
                                            <TableCell align="center">{row.medicalType}</TableCell>
                                            <TableCell align="center">{row.shortAssess}</TableCell>
                                            <TableCell align='center'><EMedicalDialog patientRecord={row}/></TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>}
            </div>
        )

        }
}

export default AccessibleEMRByDocTable;
