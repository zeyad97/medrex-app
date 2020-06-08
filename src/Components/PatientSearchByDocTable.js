//used to display EMRs of a particular patient after a doctor searches for a patient
//doctor only component

import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {Button} from "@material-ui/core";
import EMedicalDialog from "./EMedicalDialog";
import Skeleton from "@material-ui/lab/Skeleton";
const axios = require('axios');

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function PatientSearchByDocTable(props) {
    const classes = useStyles();
    const [records,setRecords]= useState([]);
    const [loading, setLoading] = React.useState(true);

    console.log(props.patientDetails);

    useEffect(async () => {
        console.log("in useEffect");
            const emrData = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'queries/returnRecordsOfPatient', {
                params: {
                    patientObject: 'resource:org.medrex.basic.patient#' + props.patientDetails[0].patId
                },
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY
                }
            });
            let arr0 = [];
            let i,j;
            const dataToCheck = emrData.data;
            for(i=0; i<dataToCheck.length; i++){
                const obj = {mrn:'', recType:'', createdDate:'',createdBy:'', trustedDocs:[], canView:false}
                obj.mrn = dataToCheck[i].mrn;
                obj.recType = dataToCheck[i].type;
                obj.createdDate = dataToCheck[i].date;
                let makerID = dataToCheck[i].maker.substring(33,dataToCheck[i].maker.length);
                const maker = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + makerID
                    + "?filter={\"fields\": [ \"fName\", \"lName\"]}",
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                          }
                    });
                let makerName = maker.data.fName + ' ' + maker.data.lName;
                obj.createdBy = makerName;
                const objOne = {name:makerName, id:makerID};
                obj.trustedDocs.push(objOne);
                for(j=0; j<dataToCheck[i].trustedDocs.length; j++){
                    const objDoc = {name:'', id:''};
                    let docID = dataToCheck[i].trustedDocs[j].substring(33,dataToCheck[i].trustedDocs[j].length);
                    objDoc.id = docID;
                    const docReq = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + docID
                        + "?filter={\"fields\": [ \"fName\", \"lName\"]}",
                        {
                            headers: {
                                'x-api-key': process.env.REACT_APP_API_KEY
                              }
                        });
                    let docName = docReq.data.fName + ' ' + docReq.data.lName;
                    objDoc.name = docName;
                    obj.trustedDocs.push(objDoc);
                }
                console.log(obj);
                arr0.push(obj);
                console.log(arr0);
                let k;
                for(k=0; k<obj.trustedDocs.length; k++){
                    let myCheck = obj.trustedDocs[k].id;
                    if(myCheck === props.doctorDetails.doctor.Id){
                        obj.canView = true;
                        break;
                    }
                    else{
                        continue;
                    }
                }

            }
            setRecords(arr0);
            setLoading(false);
            }, []);

    const requestAccess= async(mrNumber) =>{
        try{
            const accessReq = await axios.post(process.env.REACT_APP_NGROK_HTTP + "/requestAccess",
                {
                    "$class": "org.medrex.basic.requestAccess",
                    "record": "resource:org.medrex.basic.healthRecord#"+mrNumber,
                    "requestingDoc": "resource:org.medrex.basic.doctor#"+props.doctorDetails.doctor.Id,
                    "transactionId": "",
                    "timestamp": "2020-06-07T09:23:06.917Z"
                },
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                      }
                })
            console.log("Request sent!")
        }
        catch(error){
            console.log(error);
        }
    }

    console.log(records);

    return (
        loading?
            <div>
                <Skeleton variant="text" />
                <Skeleton variant="rect"/>
            </div>:
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">MRN</TableCell>
                        <TableCell align="center">Record Type</TableCell>
                        <TableCell align="center">Date Created</TableCell>
                        <TableCell align="center">Created By</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map((record) => (
                        <TableRow key={record.mrn}>
                            <TableCell align="center">{record.mrn}</TableCell>
                            <TableCell align="center">{record.recType}</TableCell>
                            <TableCell align="center">{record.createdDate}</TableCell>
                            <TableCell align="center">{record.createdBy}</TableCell>
                            {record.canView?
                            <TableCell align='center'><EMedicalDialog patientRecord={record} /></TableCell>:
                                <TableCell align='center'>
                                    <Button color='secondary'
                                onClick={()=>requestAccess(record.mrn)}>Request Access</Button>
                                </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
