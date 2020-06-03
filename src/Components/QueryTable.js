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
import emailjs from "emailjs-com";

class QueryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            loading: true,
        }
        this.click = this.click.bind(this);
    };

    async componentDidMount() {
        const url = 'http://d7f3cf026b7d.ngrok.io/api/';
        try{
            const response = await axios.get(url+ 'queries/getAccessRequestsForPatient', {
                params: {
                    patientObject: 'resource:org.medrex.basic.patient#'+ this.props.user.Id
                }
            });
            console.log(response);
            let queries=[];
            let queriesDoc=[];
            let queriesNumber = response.data.length;
            let i;
            for (i=0; i<queriesNumber; i++){
                let varZero = response.data[i].requestDocs;
                let varOne = response.data[i];
                let j,part,newPart;
                for (j=1; j<varZero.length; j++)
                {
                    let docReq = []
                    part = varZero[j];
                    newPart = part.substring(33,part.length);
                    queriesDoc.push(newPart);
                    let docCreate = varOne.maker;
                    let docCre = docCreate.substring(33,docCreate.length);
                    try{
                        const doc = await axios.get(url +'doctor/' + newPart);
                        const owner =  await axios.get(url+ 'doctor/' + docCre);
                        const docData = doc.data.fName;
                        const ownerData = owner.data.fName;
                        docReq.push(docData,ownerData);
                    }catch(error){
                        console.log(error);
                    }
                    console.log(varOne);
                    let medNumber = varOne.mrn;
                    let medType = varOne.type;
                    let assess = varOne.assessment;
                    docReq.push(medNumber,medType, assess);
                    const obj = {docID: newPart, docName: docReq[0], maker: docReq[1] , medicalNo:docReq[2], medicalType:docReq[3],
                        shortAssess:docReq[4]};
                    queries.push(obj);
                }

            }
            this.setState({requests: queries});
        }catch(error) {
            console.log(error)
        }
        this.setState({loading: false});
    }

    async click(var1) {
        console.log('clicked');
        const url = 'http://d7f3cf026b7d.ngrok.io/api/';
        let email;
        try {
            const response = await axios.post(url + 'giveAccess',
                {
                    "$class": "org.medrex.basic.giveAccess",
                    "record": "resource:org.medrex.basic.healthRecord#" + var1.medicalNo,
                    "trusted": "resource:org.medrex.basic.doctor#" + var1.docID,
                    "transactionId": "",
                    "timestamp": new Date()
                });
            try {
                const docRes = await axios.get(url + 'doctor/' + var1.docID)
                const docDataAdd = docRes.data;
                email = docDataAdd.email;

                var template_params = {
                    "doctor_email": email,
                    "mrn": var1.medicalNo,
                    "doctor_name": var1.docName,
                    "patient_name": this.props.user.fName
                }
                var service_id = "default_service";
                var template_id = "medrex_grant_access";
                // from emailjs website
                var user_id = "user_ST7dldKNwGvYdwcYMbwjg";
                emailjs.send(service_id, template_id, template_params, user_id)
                    .then(function (response) {
                        console.log("email works!")
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        console.log('FAILED...', error);
                    });
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <div>
                <h1>Pending Access Requests</h1>
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
                                        <TableCell align="center">Doctor</TableCell>
                                        <TableCell align="center">Created by</TableCell>
                                        <TableCell align="center">MRN</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">Assessment</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.requests.map((row) =>
                                        <TableRow key={row.docName}>
                                            <TableCell align="center">{row.docName}</TableCell>
                                            <TableCell align="center">{row.maker}</TableCell>
                                            <TableCell align="center">{row.medicalNo}</TableCell>
                                            <TableCell align="center">{row.medicalType}</TableCell>
                                            <TableCell align="center">{row.shortAssess}</TableCell>
                                            <TableCell align='center'>
                                                <Button  color='primary'
                                                         onClick={() => {this.click(row)}}>
                                                Grant Access
                                            </Button></TableCell>
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

export default QueryTable;
